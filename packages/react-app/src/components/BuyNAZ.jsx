import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  linearProgress: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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

export default () => {
  const classes = useStyles();

  return (
    <React.Fragment className={classes.root}>
      <Typography variant="h1">Surf my bonding curve</Typography>
      <>
        <Box className={classes.row}>
          <Box className={classes.linearProgress}>
            <Typography variant="h2">$0</Typography>
            <Typography variant="h2">$100m</Typography>
          </Box>
          <Box>
            <BorderLinearProgress variant="determinate" value={33} />
          </Box>
        </Box>

        <>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
              startIcon={<AllInclusiveIcon />}
              size="large"
            >
              BUY
            </Button>
          </ThemeProvider>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<SentimentVeryDissatisfiedIcon />}
            size="large"
          >
            SELL
          </Button>
        </>
      </>
    </React.Fragment>
  );
};
