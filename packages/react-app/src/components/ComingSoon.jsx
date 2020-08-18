import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import loading from "../static/images/loading.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    width: "75%",
    height: "75vh",
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0em 3em 0em 0em",
    marginBottom: "96px",
  },
  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexGrow: 2,
    alignItems: "center",
    marginBottom: "3em",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h1">Coming Soon</Typography>
        <Typography variant="body1">
          - Integration with calendar API (e.g. Callendly) for you to be able to
          redeem your $NAZ for my time at going ETH price rate
          <br />
          - Listing my token on Uniswap
          <br />- Integration with Twitter for retweet payout incentives if you
          have $NAZ
          <br /> - Internationalisation for bigger community
          <br /> - Dark theme? (let me know on Twitter if you care about this at
          all)
        </Typography>
      </Box>
      <Box className={classes.center}>
        <img alt="fire animation" src={loading} />
      </Box>
    </Box>
  );
};
