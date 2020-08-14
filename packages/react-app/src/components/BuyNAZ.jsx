import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
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
    height: "100%",
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
    height: "100%",
    flexGrow: 1,
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
            <Typography variant="h2">$100m</Typography>
          </Box>
          <Box>
            <BorderLinearProgress variant="determinate" value={33} />
          </Box>
        </Box>

        <Box className={classes.avaAndButtons}>
          <Avatar alt="Remy Sharp" src="./ethereumLogo.png" />
          <Box className={classes.buttonGroup}>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
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
          </Box>
        </Box>
      </>
    </Box>
  );
};
