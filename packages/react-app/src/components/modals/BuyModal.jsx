import React, { useCallback, useState } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import BigNumber from "bignumber.js";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import InputAdornment from "@material-ui/core/InputAdornment";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Slippage from "../Slippage";

const bn = new BigNumber("1e18");

const MAXUINT = new BigNumber(1.15e77);
const SMALLEST_UNIT = 0.000000000000000001;
const BIGGEST_UNIT = 1000;

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
  loadingTx: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  alignSelf: {
    alignSelf: "center",
    marginLeft: "1em",
  },
  howMuchETH: {
    margin: "16px",
  },
  somePadding: {
    padding: "1em",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  slipAndBuy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default ({ contract, web3, onModal, eth, setEth, fetchAll }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ethValid, setEthValid] = useState(true);
  const [estimatedNazTokens, setEstimatedNazTokens] = useState(
    "(start typing to get the estimate)"
  );
  const [crunchingNazEstimates, setCrunchingNazEstimates] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [txSucess, setTxSuccess] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [txSuccessOpen, setTxSuccessOpen] = useState(false);
  const [txFailureOpen, setTxFailureOpen] = useState(false);
  const [slippage, setSlippage] = useState("100");
  const [estimate, setEstimate] = useState("0");

  const computeEstimatedNazTokens = useCallback(
    async (deposit) => {
      deposit = Number(deposit);
      if (deposit <= 0 || deposit >= BIGGEST_UNIT) {
        setEthValid(false);
        return 0;
      }

      const beth = bn
        .multipliedBy(deposit)
        .minus(1)
        .integerValue();
      if (beth.isLessThanOrEqualTo(0) || beth.isGreaterThan(MAXUINT)) {
        setEthValid(false);
        return 0;
      }

      setCrunchingNazEstimates(true);
      const depositAmount = beth.toString();
      const rewardAmount = await contract.methods
        .getContinuousMintReward(depositAmount)
        .call();
      // do: batch state update
      setEstimate((rewardAmount - 100).toString());
      setEstimatedNazTokens(`${(rewardAmount / bn).toString()} $NAZ`);
      setCrunchingNazEstimates(false);
    },
    [contract]
  );

  const onBuy = useCallback(async () => {
    if (!web3) {
      return;
    }
    if (!ethValid || !web3.currentProvider.selectedAddress) {
      return;
    }

    setIsBuying(true);
    let receipt = "";
    try {
      receipt = await contract.methods.mint(slippage, estimate).send({
        from: web3.currentProvider.selectedAddress,
        value: web3.utils.toWei(String(eth), "ether"),
      });
      if (receipt) {
        if ("blockHash" in receipt) {
          if ((receipt.blockHash !== "") | (receipt.blockHash != null)) {
            setTxSuccessOpen(true);
            setTxSuccess(true);
            setTxHash(`https://etherscan.io/tx/${receipt.transactionHash}`);
            setIsBuying(false);
            fetchAll();
            setEstimate(0);
            setEstimatedNazTokens("(start typing to get an estimate)");
            // computeEstimatedNazTokens();
            return;
          } else {
            computeEstimatedNazTokens(eth);
            setTxFailureOpen(true);
            setTxSuccess(false);
            setIsBuying(false);
          }
        } else {
          computeEstimatedNazTokens(eth);
          setTxFailureOpen(true);
          setTxSuccess(false);
          setIsBuying(false);
        }
      } else {
        computeEstimatedNazTokens(eth);
        setTxFailureOpen(true);
        setTxSuccess(false);
        setIsBuying(false);
      }
    } catch (e) {
      computeEstimatedNazTokens(eth);
      setTxFailureOpen(true);
      setTxSuccess(false);
      setIsBuying(false);
    }
    computeEstimatedNazTokens(eth);
    setTxFailureOpen(true);
    setTxSuccess(false);
    setIsBuying(false);
  }, [
    computeEstimatedNazTokens,
    contract,
    eth,
    ethValid,
    web3,
    fetchAll,
    estimate,
    slippage,
    setEstimate,
  ]);

  const handleOnChange = useCallback(
    (e) => {
      let howMuchEth = e.target.value;
      setEth(howMuchEth);

      try {
        howMuchEth = Number(howMuchEth);
        if (howMuchEth <= SMALLEST_UNIT || howMuchEth >= BIGGEST_UNIT) {
          setEthValid(false);
          return;
        }
        setEthValid(true);
      } catch (e) {
        setEthValid(false);
        return;
      }

      computeEstimatedNazTokens(Number(howMuchEth));
    },
    [setEthValid, computeEstimatedNazTokens, setEth]
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
              The pivot price is 1 $NAZ = 1 ETH
              <br />
              As the number of $NAZ grows, so does the price per 1 $NAZ
              <br />
              If the total supply is 1 $NAZ, then the next 1 $NAZ will cost 2
              ETH
              <br />1 $NAZ after that will cost 3 ETH, and so on
            </Typography>
            <TextField
              id="outlined-number"
              label="ETH"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ETH</InputAdornment>
                ),
              }}
              error={!ethValid}
              helperText={
                !ethValid ? (
                  "Value must be greater than 0.000000000000000001 and less than 1000"
                ) : crunchingNazEstimates ? (
                  <Container>
                    <CircularProgress />
                  </Container>
                ) : (
                  <>{estimatedNazTokens}</>
                )
              }
              variant="outlined"
              className={classes.howMuchETH}
              value={eth}
              onChange={handleOnChange}
            />
            {!isBuying ? (
              <Box className={classes.slipAndBuy}>
                <Slippage
                  slippage={slippage}
                  handleSlippageChange={handleSlippageChange}
                />
                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="buy the naz personal token"
                  className={classes.margin}
                  onClick={onBuy}
                  disabled={!ethValid}
                >
                  BUY THAT $NAZ
                </Fab>
              </Box>
            ) : (
              <Container>
                <Box className={classes.loadingTx}>
                  <CircularProgress />
                  <Box className={classes.alignSelf}>
                    <Typography variant="caption">
                      waiting for the tx to complete. sit tight
                    </Typography>
                  </Box>
                </Box>
              </Container>
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
                    Something went wrong. Perhaps someone tried to front run
                    you. Try with higer slippage
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
