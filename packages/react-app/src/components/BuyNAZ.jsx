import React, { useCallback, useEffect, useState } from "react";
import { addresses, abis } from "@project/contracts";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import BigNumber from "bignumber.js";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import ErrorIcon from "@material-ui/icons/Error";
import nazAva from "../static/images/nazz.JPG";
import SellModal from "./modals/SellModal";
import BuyModal from "./modals/BuyModal";
import MuiAlert from "@material-ui/lab/Alert";

// TODO: give a message that they should switch to mainnet if the network is different
const bn = new BigNumber("1e18");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    width: "95%",
    height: "100%",
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0em 3em 0em 0em",
    marginBottom: "3em",
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  linearProgress: {
    display: "flex",
    justifyContent: "space-between",
  },
  typoraphyCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1em",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em",
    },
  },
  surfStyle: {
    width: "100%",
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    marginBottom: "3em",
  },
  button: {
    margin: "16px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
  },
  stats: {
    marginTop: "12px",
  },
  makeSmaller: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
  },
  avaAndButtons: {
    flexDirection: "column",
    height: "100%",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    padding: "1em",
  },
  warningButton: {
    padding: "3em",
    flexDirection: "column",
    height: "100%",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    maxWidth: "50%",
  },
  large: {
    width: theme.spacing(32),
    height: theme.spacing(32),
  },
  center: {
    display: "block",
    maxWidth: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  warning: {
    // width: theme.spacing(16),
    // height: theme.spacing(16),
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
    padding: "1em",
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

const Stats = ({
  contract,
  initiateContract,
  setMarketCap,
  addressPresent,
}) => {
  const classes = useStyles();
  const [ethP, setEthP] = useState(0.0);
  const [totalSupply, setTotalSupply] = useState(0.0);
  const [reserveBalance, setReserveBalance] = useState(0.0);

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

  const computeTotalValueOfSupply = useCallback(() => {
    if (!totalSupply || !ethP) {
      return;
    }
    setMarketCap(Number(totalSupply) * Number(ethP));
  }, [totalSupply, ethP, setMarketCap]);

  const fetchAll = useCallback(async () => {
    fetchEthPrice();
    fetchTotalSupply();
    fetchReserveBalance();
    computeTotalValueOfSupply();
  }, [
    fetchEthPrice,
    fetchTotalSupply,
    fetchReserveBalance,
    computeTotalValueOfSupply,
  ]);

  useEffect(() => {
    fetchAll();
    let timer = setTimeout(() => {
      fetchAll();
    }, 5000);
    return () => clearTimeout(timer);
  }, [fetchAll]);

  return contract !== null ? (
    addressPresent ? (
      <>
        <Typography variant="h5">
          Ethereum price: ${Number(ethP).toFixed(2)}
        </Typography>
        <Typography variant="h5">
          ETH Reserve: {Number(reserveBalance).toFixed(2)}
        </Typography>
        <Typography variant="h5">
          $NAZ Total Supply: {Number(totalSupply).toFixed(2)}
        </Typography>
      </>
    ) : (
      <Box className={classes.centerBox}>
        <CircularProgress />
        <Typography className={classes.typographyCenter} variant="caption">
          Connecting you to the blockchain...
        </Typography>
      </Box>
    )
  ) : (
    <CircularProgress className={classes.center} />
  );
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default ({ web3, provider, isLoading }) => {
  const classes = useStyles();
  const [contract, setContract] = useState(null);
  const [eth, setEth] = useState("");
  const [naz, setNaz] = useState("");
  const [marketCap, setMarketCap] = useState(0);
  const [addressPresent, setAddressPresent] = useState(false);
  const [incorrectNetwork, setIncorrectNetwork] = useState(false);

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
    // TODO: switch to 0x1 for prod
    if (web3.currentProvider.chainId !== "0x3") {
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

  return (
    <Box className={classes.root}>
      <Box>
        <Box className={classes.surfStyle}>
          <Typography
            variant="h1"
            component="h1"
            className={classes.makeSmaller}
          >
            Surf $NAZ bonding curve
          </Typography>
          <Typography variant="overline">
            This is the first of its kind Personal Token built with a Bonding
            Curve
          </Typography>
          <Typography variant="caption">Front running resistant</Typography>
        </Box>
        <Box className={classes.textCenter}>
          <Typography variant="h3">
            $NAZ market capitalisation (total value)
          </Typography>
        </Box>
        <Box>
          <Box className={classes.linearProgress}>
            <Typography variant="h6" className={classes.flexEnd}>
              $0
            </Typography>
            <Typography variant="h2">
              ${Number(marketCap).toFixed(0)}
            </Typography>
            <Typography variant="h6" className={classes.flexEnd}>
              $1m
            </Typography>
          </Box>
          <Box>
            <BorderLinearProgress
              variant="determinate"
              value={
                marketCap > 1000000
                  ? 100
                  : parseInt(Number(marketCap) / 1000000.0)
              }
            />
          </Box>
        </Box>
      </Box>
      <Box className={classes.stats}>
        <Stats
          contract={contract}
          initiateContract={initiateContract}
          marketCap={marketCap}
          setMarketCap={setMarketCap}
          addressPresent={addressPresent}
        />
      </Box>
      {incorrectNetwork && (
        <Box className={classes.notOnMainnet}>
          <Alert severity="error">
            You are not on the mainnet. Switch your network.
          </Alert>
        </Box>
      )}
      {(!provider || !web3) && !isLoading && (
        <Box className={classes.warningButton}>
          <Fab
            variant="extended"
            aria-label="connect your wallet"
            className={classes.warning}
            onClick={onModal}
          >
            <Box className={classes.error}>
              <ErrorIcon className={classes.extendedIcon} />
              Connect
            </Box>
          </Fab>
        </Box>
      )}
      {!incorrectNetwork && (
        <Box className={classes.avaAndButtons}>
          <Avatar alt="Nazariy" src={nazAva} className={classes.large} />
          <Box className={classes.buttonGroup}>
            <BuyModal
              web3={web3}
              eth={eth}
              setEth={setEth}
              onModal={onModal}
              contract={contract}
            />
            <SellModal
              web3={web3}
              naz={naz}
              setNaz={setNaz}
              onModal={onModal}
              contract={contract}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
