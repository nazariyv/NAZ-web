import React, { useCallback, useEffect } from "react";
import { addresses, abis } from "@project/contracts";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import BigNumber from "bignumber.js";
import { green, red } from "@material-ui/core/colors";
import nazAva from "../static/images/naz.jpg";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
  },
  linearProgress: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  surfStyle: {
    width: "100%",
    textAlign: "right",
  },
  avaAndButtons: {
    padding: "32px",
    flexDirection: "column",
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    padding: "16px",
  },
  button: {
    margin: "16px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  moveTextRight: {
    textAlign: "right",
  },
  moveTextLeft: {
    textAlign: "left",
  },
  howMuchETH: {
    margin: "32px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
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

const bn = new BigNumber("1e18");

const BuyModal = ({ contract, web3, onModal, eth, setEth }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ethValid, setEthValid] = React.useState(true);
  const [estimatedNazTokens, setEstimatedNazTokens] = React.useState(
    "Start typing the amount"
  );
  const [crunchingNazEstimates, setCrunchingNazEstimates] = React.useState(
    false
  );

  // TODO: rather than calling the smart contract to compute this
  // TODO: just write the js code that does this to avoid hitting the contract
  const computeEstimatedNazTokens = useCallback(
    async (deposit) => {
      if (deposit === 0) {
        return 0;
      }
      setCrunchingNazEstimates(true);
      const depositAmount = web3.utils.toWei(String(deposit), "ether");
      const rewardAmount = await contract.methods
        .getContinuousMintReward(depositAmount)
        .call();
      setEstimatedNazTokens((rewardAmount / bn).toString());
      setCrunchingNazEstimates(false);
    },
    [contract, web3]
  );

  const onBuy = useCallback(async () => {
    if (!ethValid) {
      return;
    }
    if (!web3.currentProvider.selectedAddress) {
      return;
    }
    // TODO: Ethereum transaction lifecycle react component
    await contract.methods.mint().send({
      from: web3.currentProvider.selectedAddress,
      value: web3.utils.toWei(String(eth), "ether"),
    });
    // console.log(receipt);
  }, [contract, eth, ethValid, web3]);

  const handleOnChange = useCallback(
    (e) => {
      let val = 21.21;
      try {
        val = Number(e.target.value);
      } catch (e) {
        setEthValid(false);
        return;
      }
      setEth(val);
      computeEstimatedNazTokens(val);
      if (val <= 0) {
        setEthValid(false);
        return;
      } else {
        setEthValid(true);
      }
    },
    [setEthValid, computeEstimatedNazTokens, setEth]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
    onModal();
  }, [setOpen, onModal]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AllInclusiveIcon />}
          size="large"
          disabled={!contract}
          onClick={handleOpen}
        >
          BUY
        </Button>
      </ThemeProvider>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title">
              How much ETH will you spend on $NAZ?
            </Typography>
            <Typography className={classes.moveTextRight} variant="caption">
              Make it rain
            </Typography>
            <Typography
              color="textSecondary"
              id="transition-modal-description"
              variant="body2"
              className={classes.moveTextLeft}
            >
              The pivot price is 1 $NAZ = 1 ETH.
              <br />
              As the number of $NAZ grows, so does the price per 1 $NAZ.
              <br />
              If the total supply is 1 $NAZ, then the next 1 $NAZ will cost 2
              ETH.
              <br />1 $NAZ after that will cost 3 ETH, and so on.
            </Typography>
            <TextField
              id="outlined-number"
              label="ETH"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              error={!ethValid}
              helperText={
                !ethValid ? (
                  "Value must be positive"
                ) : crunchingNazEstimates ? (
                  <CircularProgress />
                ) : (
                  `You will get: ${estimatedNazTokens} $NAZ`
                )
              }
              variant="outlined"
              className={classes.howMuchETH}
              value={eth}
              onChange={handleOnChange}
            />
            <Fab
              variant="extended"
              color="primary"
              aria-label="buy that naz"
              className={classes.margin}
              onClick={onBuy}
            >
              <AttachMoneyIcon className={classes.extendedIcon} />
              BUY THAT $NAZ
            </Fab>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

const SellModal = ({ contract, web3, onModal, naz, setNaz }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nazValid, setNazValid] = React.useState(true);
  const [estimatedEthTokens, setEstimatedEthTokens] = React.useState(
    "Start typing the amount"
  );
  const [crunchingEthEstimates, setCrunchingEthEstimates] = React.useState(
    false
  );

  // TODO: rather than calling the smart contract to compute this
  // TODO: just write the js code that does this to avoid hitting the contract
  const computeEstimatedEthTokens = useCallback(
    async (nazAmount) => {
      if (nazAmount <= 0) {
        return 0;
      }
      const bnaz = new BigNumber("1e18") * nazAmount;
      // TODO: require that the refundAmount is not greater than the Total ETH supply in the contract
      const refundAmount = await contract.methods
        .getContinuousBurnRefund(bnaz.toString())
        .call();
      setEstimatedEthTokens((refundAmount / bn).toString());
      setCrunchingEthEstimates(false);
    },
    [contract]
  );

  const onSell = useCallback(async () => {
    if (!nazValid) {
      return;
    }
    if (!web3.currentProvider.selectedAddress) {
      return;
    }
    // TODO: Ethereum transaction lifecycle react component
    // await contract.methods.mint().send({
    //   from: web3.currentProvider.selectedAddress,
    //   value: web3.utils.toWei(String(eth), "ether"),
    // });
    // console.log(receipt);
  }, [contract, nazValid, web3]);

  const handleOnChange = useCallback(
    (e) => {
      let val = 1.0;
      try {
        val = Number(e.target.value);
      } catch (e) {
        setNaz(false);
        return;
      }
      setNaz(val);
      computeEstimatedEthTokens(val);
      if (val <= 0) {
        setNazValid(false);
        return;
      } else {
        setNazValid(true);
      }
    },
    [setNazValid, computeEstimatedEthTokens, setNaz]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
    onModal();
  }, [setOpen, onModal]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<SentimentVeryDissatisfiedIcon />}
          size="large"
          disabled={!contract}
          onClick={handleOpen}
        >
          SELL
        </Button>
      </ThemeProvider>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title">
              How much $NAZ will you sell?
            </Typography>
            <Typography className={classes.moveTextRight} variant="caption">
              Don't make it rain
            </Typography>
            <TextField
              id="outlined-number"
              label="NAZ"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              error={!nazValid}
              helperText={
                !nazValid ? (
                  "Value must be positive"
                ) : crunchingEthEstimates ? (
                  <CircularProgress />
                ) : (
                  `You will get: ${estimatedEthTokens} ETH`
                )
              }
              variant="outlined"
              className={classes.howMuchETH}
              value={naz}
              onChange={handleOnChange}
            />
            <Fab
              variant="extended"
              color="secondary"
              aria-label="sell naz"
              className={classes.margin}
              onClick={onSell}
            >
              <AttachMoneyIcon className={classes.extendedIcon} />
              Sell $NAZ
            </Fab>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ({ promptSetProvider, web3 }) => {
  const classes = useStyles();
  const [contract, setContract] = React.useState(null);
  const [eth, setEth] = React.useState(21.21);
  const [naz, setNaz] = React.useState(1.0);

  const initiateContract = useCallback(async () => {
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
      <Box className={classes.surfStyle}>
        <Typography gutterBottom variant="h1">
          Surf my bonding curve
        </Typography>
      </Box>
      <>
        <Box className={classes.row}>
          <Box className={classes.linearProgress}>
            <Typography variant="h2">$0</Typography>
            <Typography variant="h2">$1m</Typography>
          </Box>
          <Box>
            <BorderLinearProgress variant="determinate" value={33} />
          </Box>
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
      </>
    </Box>
  );
};
