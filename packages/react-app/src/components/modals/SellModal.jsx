import React, { useState, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import BigNumber from "bignumber.js";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Slippage from "../Slippage";

const SMALLEST_UNIT = 0.000000000000000001;
// * ACTUAL: 1.1579209e+77
const MAXUINT = new BigNumber(1.15e77);
const BIGGEST_UNIT = 1000;
const bn = new BigNumber("1e18");

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "1rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "black",
    // backgroundColor: theme.palette.background.paper,
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
    margin: "2rem",
  },
  somePadding: {
    padding: "1rem",
  },
  loadingTx: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  alignSelf: {
    alignSelf: "center",
    marginLeft: "1rem",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  slipAndSell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default ({ contract, web3, onModal, naz, setNaz, fetchAll }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nazValid, setNazValid] = useState(true);
  const [estimatedEthTokens, setEstimatedEthTokens] = useState(
    "(start typing the amount to get the estimate)"
  );
  const [crunchingEthEstimates, setCrunchingEthEstimates] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [txSucess, setTxSuccess] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [txSuccessOpen, setTxSuccessOpen] = useState(false);
  const [txFailureOpen, setTxFailureOpen] = useState(false);
  const [slippage, setSlippage] = useState("100");
  const [estimate, setEstimate] = useState("0");

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
      if (bnaz.isLessThanOrEqualTo(0) || bnaz.isGreaterThanOrEqualTo(MAXUINT)) {
        setNazValid(false);
        return 0;
      }

      setCrunchingEthEstimates(true);

      const balanceOfCaller = await contract.methods
        .balanceOf(web3.currentProvider.selectedAddress)
        .call();

      if (!balanceOfCaller) {
        setCrunchingEthEstimates(false);
        setEstimatedEthTokens("0 ETH");
        return;
      }

      if (bnaz.isGreaterThan(new BigNumber(balanceOfCaller))) {
        setCrunchingEthEstimates(false);
        setNazValid(false);
        setEstimatedEthTokens(
          `the amount exceeds your balance: ${(balanceOfCaller / bn)
            .toFixed(18)
            .toString()}`
        );
        return;
      }

      // * if the refundAmount is greater than the Total ETH supply in the contract
      // * it will throw the overflow error in the contract
      const refundAmount = await contract.methods
        .getContinuousBurnRefund(bnaz.toString())
        .call();

      setEstimate(refundAmount - 100);
      setEstimatedEthTokens(`${(refundAmount / bn).toString()} ETH`);
      setCrunchingEthEstimates(false);
    },
    [contract, web3]
  );

  const onSell = useCallback(async () => {
    if (!web3) {
      return;
    }
    if (!nazValid || !web3.currentProvider.selectedAddress) {
      return;
    }

    let correctNaz = new BigNumber(naz * bn).integerValue();

    setIsSelling(true);
    // to obtain the tx receipt, assign the below to a variable
    let receipt = "";
    try {
      receipt = await contract.methods
        .burn(correctNaz.toString(), slippage.toString(), estimate.toString())
        .send({ from: web3.currentProvider.selectedAddress });
    } catch (e) {
      setIsSelling(false);
    }
    if (receipt) {
      if ("blockHash" in receipt) {
        if ((receipt.blockHash !== "") | (receipt.blockHash != null)) {
          setTxSuccessOpen(true);
          setTxSuccess(true);
          setTxHash(`https://etherscan.io/tx/${receipt.transactionHash}`);
          setIsSelling(false);
          fetchAll();
          setEstimate(0);
          setEstimatedEthTokens("(start typing to get an estimate)");
          // computeEstimatedEthTokens();
          return;
        } else {
          computeEstimatedEthTokens(naz);
          setTxFailureOpen(true);
          setTxSuccess(false);
          setIsSelling(false);
        }
      } else {
        computeEstimatedEthTokens(naz);
        setTxFailureOpen(true);
        setTxSuccess(false);
        setIsSelling(false);
      }
    } else {
      computeEstimatedEthTokens(naz);
      setTxFailureOpen(true);
      setTxSuccess(false);
      setIsSelling(false);
    }
    computeEstimatedEthTokens(naz);
    setTxFailureOpen(true);
    setTxSuccess(false);
    setIsSelling(false);
  }, [
    computeEstimatedEthTokens,
    contract,
    nazValid,
    web3,
    naz,
    fetchAll,
    estimate,
    slippage,
    setEstimate,
  ]);

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

  const handleSlippageChange = (e) => {
    setSlippage(e.target.value);
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
    onModal();
  }, [setOpen, onModal]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Box>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<SentimentVeryDissatisfiedIcon />}
        size="large"
        disabled={!contract}
        onClick={handleOpen}
      >
        BURN
      </Button>
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
            <Typography
              variant="h4"
              id="transition-modal-title"
              color="textPrimary"
            >
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
                  estimatedEthTokens.startsWith("the amount") ? (
                    estimatedEthTokens
                  ) : (
                    "Value must be positive and greater than 0.000000000000000001 and less than 1000"
                  )
                ) : crunchingEthEstimates ? (
                  <Container>
                    <CircularProgress />
                  </Container>
                ) : (
                  <>{estimatedEthTokens}</>
                )
              }
              variant="outlined"
              className={classes.howMuchETH}
              value={naz}
              onChange={handleOnChange}
            />
            {!isSelling ? (
              <Box className={classes.slipAndSell}>
                <Slippage
                  slippage={slippage}
                  handleSlippageChange={handleSlippageChange}
                />
                <Fab
                  variant="extended"
                  color="secondary"
                  aria-label="sell naz"
                  className={classes.margin}
                  onClick={onSell}
                  disabled={!nazValid}
                >
                  Sell $NAZ
                </Fab>
              </Box>
            ) : (
              <Box className={classes.loadingTx}>
                <CircularProgress />
                <Box className={classes.alignSelf}>
                  <Typography variant="caption">
                    waiting for the tx to complete. sit tight
                  </Typography>
                </Box>
              </Box>
            )}
            {txSucess ? (
              <Collapse in={txSuccessOpen} className={classes.somePadding}>
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setTxSuccess(null);
                        setTxSuccessOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Here is the{" "}
                  <span>
                    <a href={txHash} rel="noopener noreferrer" target="_blank">
                      transaction
                    </a>
                  </span>
                </Alert>
              </Collapse>
            ) : (
              txSucess === false && (
                <Collapse in={txFailureOpen} className={classes.somePadding}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setTxSuccess(null);
                          setTxFailureOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Something went wrong. Try higher slippage
                  </Alert>
                </Collapse>
              )
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
