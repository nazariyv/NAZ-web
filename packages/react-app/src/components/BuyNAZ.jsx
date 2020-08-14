import React, { useCallback, useEffect } from "react";
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
import nazAva from "../static/images/nazz.JPG";
import SellModal from "./modals/SellModal";
import BuyModal from "./modals/BuyModal";

const bn = new BigNumber("1e18");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    paddingBottom: "3em",
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  linearProgress: {
    display: "flex",
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
  },
  surfStyle: {
    width: "100%",
    textAlign: "right",
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
    padding: "32px",
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
  promptSetProvider,
  marketCap,
  setMarketCap,
}) => {
  const [ethP, setEthP] = React.useState(0);
  const [totalSupply, setTotalSupply] = React.useState(0);
  const [reserveBalance, setReserveBalance] = React.useState(0);

  const fetchEthPrice = useCallback(() => {
    if (!contract) {
      initiateContract();
      promptSetProvider();
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
  }, [initiateContract, promptSetProvider, contract]);

  const fetchTotalSupply = useCallback(async () => {
    if (!contract) {
      initiateContract();
      promptSetProvider();
      return;
    }
    const totalSupply = await contract.methods.totalSupply().call();
    setTotalSupply((totalSupply / bn).toString());
  }, [setTotalSupply, contract, initiateContract, promptSetProvider]);

  const fetchReserveBalance = useCallback(async () => {
    if (!contract) {
      initiateContract();
      promptSetProvider();
      return;
    }
    const reserves = await contract.methods.reserveBalance().call();
    setReserveBalance((reserves / bn).toString());
  }, [setReserveBalance, contract, initiateContract, promptSetProvider]);

  const computeTotalValueOfSupply = useCallback(() => {
    if (!totalSupply || !ethP) {
      return;
    }
    setMarketCap(Number(totalSupply) * Number(ethP));
  }, [totalSupply, ethP, setMarketCap]);

  useEffect(() => {
    fetchEthPrice();
    fetchTotalSupply();
    fetchReserveBalance();
    computeTotalValueOfSupply();
    const timer = setTimeout(() => {
      fetchEthPrice();
      fetchTotalSupply();
      fetchReserveBalance();
      computeTotalValueOfSupply();
    }, 5000);
    return () => clearTimeout(timer);
  }, [
    computeTotalValueOfSupply,
    fetchEthPrice,
    fetchReserveBalance,
    fetchTotalSupply,
  ]);

  return contract !== null ? (
    <>
      <Typography variant="h5">Ethereum price: ${ethP}</Typography>
      <Typography variant="h5">ETH Reserve: {reserveBalance}</Typography>
      <Typography variant="h5">$NAZ Total Supply: {totalSupply}</Typography>
      <Typography variant="h5">
        Total $NAZ Capitalisation: ${marketCap}
      </Typography>
    </>
  ) : (
    <CircularProgress />
  );
};

export default ({ promptSetProvider, web3 }) => {
  const classes = useStyles();
  const [contract, setContract] = React.useState(null);
  const [eth, setEth] = React.useState(21.21);
  const [naz, setNaz] = React.useState(1.0);
  const [marketCap, setMarketCap] = React.useState(0);

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
    initiateContract();
  }, [web3, initiateContract]);

  const onModal = useCallback(async () => {
    if (contract === null) {
      promptSetProvider();
      initiateContract();
    }
    if (contract === null || web3 === null) {
      return;
    }
  }, [web3, contract, promptSetProvider, initiateContract]);

  return (
    <Box className={classes.root}>
      <Box>
        <Box className={classes.surfStyle}>
          <Typography variant="h1">Surf $NAZ bonding curve</Typography>
          <Typography variant="overline">
            This is the first of its kind Personal Token built with a Bonding
            Curve
          </Typography>
        </Box>
        <Box className={classes.textCenter}>
          <Typography variant="h2">
            $NAZ market capitalisation (total value)
          </Typography>
        </Box>
        <Box>
          <Box className={classes.linearProgress}>
            <Typography variant="h2">$0</Typography>
            <Typography variant="h2">$1m</Typography>
          </Box>
          <Box>
            <BorderLinearProgress
              variant="determinate"
              value={
                marketCap > 1000000
                  ? 100
                  : parseInt(Number(marketCap / 1000000))
              }
            />
          </Box>
        </Box>
      </Box>
      <Box className={classes.stats}>
        <Stats
          contract={contract}
          initiateContract={initiateContract}
          promptSetProvider={promptSetProvider}
          marketCap={marketCap}
          setMarketCap={setMarketCap}
        />
      </Box>
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
    </Box>
  );
};
