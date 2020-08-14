import React, { useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { ThemeProvider } from "@material-ui/core/styles";
import BigNumber from "bignumber.js";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

const SMALLEST_UNIT = 0.000000000000000001;
const BIGGEST_UNIT = 125000;
const bn = new BigNumber("1e18");

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
}));

// TODO: give a message that they should switch to mainnet if the network is different
export default ({ contract, web3, onModal, naz, setNaz }) => {
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
      if (nazAmount <= 0 || nazAmount >= BIGGEST_UNIT) {
        return 0;
      }
      const bnaz = new BigNumber("1e18")
        .times(nazAmount)
        .minus(1)
        .integerValue();
      if (bnaz <= SMALLEST_UNIT) {
        return 0;
      }
      // TODO: require that the refundAmount is not greater than the Total ETH supply in the contract
      const refundAmount = await contract.methods
        .getContinuousBurnRefund(bnaz.toString().toString())
        .call();
      setEstimatedEthTokens((refundAmount / bn).toString());
      setCrunchingEthEstimates(false);
    },
    [contract, setEstimatedEthTokens, setCrunchingEthEstimates]
  );
  const onSell = useCallback(async () => {
    if (!nazValid) {
      return;
    }
    if (!web3.currentProvider.selectedAddress) {
      return;
    }
    // TODO: Ethereum transaction lifecycle react component
    const receipt = await contract.methods
      .burn((naz * bn).toString())
      .send({ from: web3.currentProvider.selectedAddress });
  }, [contract, nazValid, web3, naz]);

  const handleOnChange = useCallback(
    (e) => {
      let val = null;
      try {
        val = Number(e.target.value);
      } catch (e) {
        setNazValid(false);
        return;
      }
      if (val >= BIGGEST_UNIT) {
        setNaz(100000);
        setNazValid(true);
        return;
      }
      setNaz(val);
      computeEstimatedEthTokens(val);
      if (val <= SMALLEST_UNIT) {
        setNazValid(false);
        return;
      } else {
        setNazValid(true);
      }
    },
    [setNazValid, computeEstimatedEthTokens, setNaz, naz]
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
                  "Value must be positive and greater than 0.000000000000000001"
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
              disabled={!nazValid}
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
