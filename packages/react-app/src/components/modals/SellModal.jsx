import React, { useState, useCallback } from "react";
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
import InputAdornment from "@material-ui/core/InputAdornment";

const SMALLEST_UNIT = 0.000000000000000001;
// * ACTUAL: 1.1579209e+77
const MAXUINT = new BigNumber(1.15e77);
const BIGGEST_UNIT = 1000;
const bn = new BigNumber("1e18");

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const useStyles = makeStyles((theme) => ({
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

export default ({ contract, web3, onModal, naz, setNaz }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nazValid, setNazValid] = useState(true);
  const [estimatedEthTokens, setEstimatedEthTokens] = useState(
    "start typing the amount to get the estimate..."
  );
  const [crunchingEthEstimates, setCrunchingEthEstimates] = useState(false);

  const computeEstimatedEthTokens = useCallback(
    async (nazAmount) => {
      nazAmount = Number(nazAmount);
      if (nazAmount <= 0 || nazAmount >= BIGGEST_UNIT) {
        setNazValid(false);
        return 0;
      }

      const bnaz = bn
        .multipliedBy(nazAmount)
        .minus(1)
        .integerValue();
      if (bnaz <= 0 || bnaz >= MAXUINT) {
        setNazValid(false);
        return 0;
      }

      setCrunchingEthEstimates(true);
      // * if the refundAmount is greater than the Total ETH supply in the contract
      // * it will throw the overflow error in the contract
      const refundAmount = await contract.methods
        .getContinuousBurnRefund(bnaz.toFixed(18).toString())
        .call();

      setEstimatedEthTokens((refundAmount / bn).toFixed(18).toString());
      setCrunchingEthEstimates(false);
    },
    [contract]
  );

  const onSell = useCallback(async () => {
    if (!nazValid || !web3.currentProvider.selectedAddress) {
      return;
    }

    // TODO: Ethereum transaction lifecycle react component
    // to obtain the tx receipt, assign the below to a variable
    await contract.methods
      .burn(naz)
      .send({ from: web3.currentProvider.selectedAddress });
  }, [contract, nazValid, web3, naz]);

  const handleOnChange = useCallback(
    (e) => {
      let val = e.target.value;
      setNaz(val);

      try {
        val = Number(val);
        if (val <= SMALLEST_UNIT || val >= BIGGEST_UNIT) {
          setNazValid(false);
          return;
        } else {
          setNazValid(true);
        }
      } catch (e) {
        setNazValid(false);
        return;
      }

      computeEstimatedEthTokens(val);
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$NAZ</InputAdornment>
                ),
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
