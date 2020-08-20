import React, { useCallback, useEffect, useState } from "react";
import { addresses, abis } from "@project/contracts";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import BigNumber from "bignumber.js";
import Fab from "@material-ui/core/Fab";
import ErrorIcon from "@material-ui/icons/Error";
import nazAva from "../static/images/nazz.JPG";
import SellModal from "./modals/SellModal";
import BuyModal from "./modals/BuyModal";
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress, Container } from "@material-ui/core";
// import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const bn = new BigNumber("1e18");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "black",
  },
  linearProgress: {
    display: "flex",
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "1rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "3rem",
    },
  },
  center: {
    margin: "1rem auto",
    display: "block",
  },
  surfStyle: {
    width: "100%",
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
  },
  warningButton: {
    marginTop: "32px",
    flexDirection: "column",
    maxWidth: "50%",
  },
  large: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    textAlign: "center",
    margin: "auto",
  },
  warning: {
    backgroundColor: "red",
  },
  flexEnd: {
    alignSelf: "flex-end",
  },
  error: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100px",
  },
  notOnMainnet: {
    padding: "1rem",
  },
  textAlignRight: {
    textAlign: "right",
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Stats = ({
  contract,
  addressPresent,
  fetchAll,
  ethP,
  reserveBalance,
  totalSupply,
  children,
  yourNaz,
  yourEth,
}) => {
  useEffect(() => {
    fetchAll();
    let timer = setTimeout(() => {
      fetchAll();
    }, 5000);
    return () => clearTimeout(timer);
  }, [fetchAll]);

  return (
    contract !== null &&
    addressPresent && (
      <>
        <Box flexBasis="0" flexGrow="1">
          <Typography variant="h5" color="textPrimary">
            # of $NAZ : {Number(totalSupply).toFixed(2)}{" "}
            <span role="img" aria-label="tree">
              🌲
            </span>
          </Typography>
          <Typography variant="h5" color="textPrimary">
            ETH price : ${Number(ethP).toFixed(2)}{" "}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            ETH collateral: {Number(reserveBalance).toFixed(2)}{" "}
          </Typography>
        </Box>
        <Box flexBasis="0" flexGrow="1">
          {children}
        </Box>
        <Box flexBasis="0" flexGrow="1" textAlign="right">
          <Typography variant="h5" color="textPrimary">
            Your $NAZ: {Number(yourNaz).toFixed(6)}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            Your ETH: {Number(yourEth).toFixed(6)}
          </Typography>
        </Box>
      </>
    )
  );
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default ({ web3, provider, isLoading, promptSetProvider }) => {
  const classes = useStyles();
  const [contract, setContract] = useState(null);
  const [eth, setEth] = useState("");
  const [naz, setNaz] = useState("");
  const [marketCap, setMarketCap] = useState(0);
  const [addressPresent, setAddressPresent] = useState(false);
  const [incorrectNetwork, setIncorrectNetwork] = useState(false);

  const [ethP, setEthP] = useState(0.0);
  const [totalSupply, setTotalSupply] = useState(0.0);
  const [reserveBalance, setReserveBalance] = useState(0.0);
  const [yourNaz, setYourNaz] = useState(0.0);
  const [yourEth, setYourEth] = useState(0.0);

  const checkIfAddressPresent = useCallback(() => {
    if (!web3) {
      return false;
    }
    if (!web3.currentProvider) {
      return false;
    }
    if (!web3.currentProvider.selectedAddress) {
      return false;
    }
    return true;
  }, [web3]);

  const initiateContract = useCallback(async () => {
    if (!web3) {
      return;
    }
    const contract = await new web3.eth.Contract(
      abis.nazToken,
      addresses.nazToken
    );
    setContract(contract);
  }, [web3]);

  useEffect(() => {
    if (web3 === null) {
      return;
    }
    if (
      web3.currentProvider.chainId !== "0x1" &&
      web3.currentProvider.chainId !== "1"
    ) {
      setIncorrectNetwork(true);
      return;
    }
    setIncorrectNetwork(false);
    const addr = checkIfAddressPresent();
    setAddressPresent(addr);
    initiateContract();
  }, [web3, initiateContract, checkIfAddressPresent]);

  const onModal = useCallback(async () => {
    if (contract === null) {
      initiateContract();
    }
    if (contract === null || web3 === null) {
      return;
    }
  }, [web3, contract, initiateContract]);

  const fetchEthPrice = useCallback(() => {
    if (!contract) {
      initiateContract();
      return;
    }
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      .then(function(response) {
        try {
          const data = response["data"];
          const ethereum = data["ethereum"];
          const usd = ethereum["usd"];
          setEthP(usd);
        } catch (e) {
          return;
        }
      })
      .catch(function(error) {});
  }, [initiateContract, contract]);

  const fetchYourEth = useCallback(async () => {
    if (!contract) {
      initiateContract();
      return;
    }
    if (!web3) {
      return;
    }
    try {
      const ethBalance = await web3.eth.getBalance(
        web3.currentProvider.selectedAddress
      );
      setYourEth(ethBalance / 1e18);
    } catch (e) {
      setYourEth(0.0);
    }
  }, [contract, initiateContract, web3]);

  const fetchYourNaz = useCallback(async () => {
    if (!contract) {
      initiateContract();
      return;
    }
    try {
      const yourNaz = await contract.methods
        .balanceOf(web3.currentProvider.selectedAddress)
        .call();
      setYourNaz(yourNaz / 1e18);
    } catch (e) {
      setYourNaz(0.0);
    }
  }, [contract, initiateContract, web3]);

  const fetchTotalSupply = useCallback(async () => {
    if (!contract) {
      initiateContract();
      return;
    }
    const totalSupply = await contract.methods.totalSupply().call();
    setTotalSupply((totalSupply / bn).toString());
  }, [setTotalSupply, contract, initiateContract]);

  const fetchReserveBalance = useCallback(async () => {
    if (!contract) {
      initiateContract();
      return;
    }
    const reserves = await contract.methods.reserveBalance().call();
    setReserveBalance((reserves / bn).toString());
  }, [setReserveBalance, contract, initiateContract]);

  const computeTotalValueOfETH = useCallback(() => {
    if (!reserveBalance || !ethP) {
      return;
    }
    setMarketCap(Number(reserveBalance) * Number(ethP));
  }, [reserveBalance, ethP, setMarketCap]);

  const fetchAll = useCallback(async () => {
    fetchEthPrice();
    fetchTotalSupply();
    fetchReserveBalance();
    computeTotalValueOfETH();
    fetchYourEth();
    fetchYourNaz();
  }, [
    fetchEthPrice,
    fetchTotalSupply,
    fetchReserveBalance,
    computeTotalValueOfETH,
    fetchYourEth,
    fetchYourNaz,
  ]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className={classes.root}>
        <Box>
          <Box className={classes.surfStyle}>
            <Typography variant="h1" color="textPrimary">
              <span role="img" aria-label="farmer">
                🧑‍🌾
              </span>{" "}
              Join $NAZ
            </Typography>
            <Typography variant="caption" color="textSecondary">
              This is the first of its kind personal token built with a linear
              bonding curve
            </Typography>
          </Box>
          <Box className={classes.textCenter}>
            <Typography variant="h3" color="textPrimary">
              $NAZ total value{" "}
              <span role="img" aria-label="watermelon">
                🍉
              </span>
            </Typography>
          </Box>
          <Box>
            <Box className={classes.linearProgress}>
              <Typography
                variant="h6"
                className={classes.flexEnd}
                color="textPrimary"
              >
                $0
              </Typography>
              {/* <TextGradient
                text="React Text Gradient"
                fromColor="#FFFF00"
                toColor="#FF8008"
                direction="right"
              /> */}
              <Typography variant="h2" color="textPrimary">
                ${Number(marketCap).toFixed(0)}
              </Typography>
              <Typography
                variant="h6"
                className={classes.flexEnd}
                color="textPrimary"
              >
                $100k
              </Typography>
            </Box>
            <Box>
              <BorderLinearProgress
                variant="determinate"
                value={
                  Number(marketCap) > 1000000
                    ? 100
                    : parseInt(Number(marketCap) / 1000.0)
                }
              />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="center"
          alignSelf="center"
          alignItems="center"
          // height={
          //   incorrectNetwork ||
          //   isLoading ||
          //   ((!provider || !web3) && !isLoading)
          //     ? "1200px"
          //     : "0px"
          // }
        >
          {incorrectNetwork && (
            <Box className={classes.notOnMainnet}>
              <Alert severity="error">
                You are not on the mainnet. Switch your network.
              </Alert>
            </Box>
          )}
          {isLoading && (
            <Container>
              <CircularProgress className={classes.center} />
            </Container>
          )}
          {(!provider || !web3) && !isLoading && (
            <Box className={classes.warningButton}>
              <Fab
                variant="extended"
                aria-label="connect your wallet"
                className={classes.warning}
                onClick={promptSetProvider}
              >
                <Box className={classes.error}>
                  <ErrorIcon className={classes.extendedIcon} />
                  <Typography>Connect</Typography>
                </Box>
              </Fab>
            </Box>
          )}
        </Box>
        {!incorrectNetwork && (
          <Box
            display="flex"
            justifyContent="space-around"
            flexWrap="wrap"
            flexGrow="1"
            paddingTop="3rem"
            marginBottom="64px"
          >
            <Stats
              contract={contract}
              initiateContract={initiateContract}
              marketCap={marketCap}
              setMarketCap={setMarketCap}
              addressPresent={addressPresent}
              fetchAll={fetchAll}
              ethP={ethP}
              reserveBalance={reserveBalance}
              totalSupply={totalSupply}
              yourNaz={yourNaz}
              yourEth={yourEth}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent="center"
              >
                <Avatar alt="Nazariy" src={nazAva} className={classes.large} />
                <Box display="flex" flexDirection="row" alignSelf="center">
                  <BuyModal
                    web3={web3}
                    eth={eth}
                    setEth={setEth}
                    onModal={onModal}
                    contract={contract}
                    fetchAll={fetchAll}
                  />
                  <SellModal
                    web3={web3}
                    naz={naz}
                    setNaz={setNaz}
                    onModal={onModal}
                    contract={contract}
                    fetchAll={fetchAll}
                  />
                </Box>
              </Box>
            </Stats>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
