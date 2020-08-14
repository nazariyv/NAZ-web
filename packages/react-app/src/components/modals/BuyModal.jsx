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
import { ThemeProvider } from "@material-ui/core/styles";
import BigNumber from "bignumber.js";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";

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

export default ({ contract, web3, onModal, eth, setEth }) => {
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
                  "Value must be positive and greater than 0.000000000000000001"
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
