import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import loading from "../static/images/loading.png";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "75%",
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0rem 3rem 0rem 0rem",
    marginBottom: "96px",
  },
  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexGrow: 2,
    alignItems: "center",
    marginBottom: "3rem",
  },
  mb1: {
    marginBottom: "1rem",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box fontWeight="fontWeightBold" textAlign="left">
        <Typography color="textPrimary" variant="h1">
          Upcoming features
        </Typography>
        <Typography color="textPrimary" variant="body2">
          <br />- Integration with calendar API (e.g. Callendly) for you to be
          able to redeem your $NAZ for my time at going ETH price rate
          <br /> Simple explanation of how $NAZ token works and derives its
          price
          <br />
          - Listing my token on Uniswap
          <br />- Integration with Twitter for retweet payout incentives if you
          have $NAZ
          <br /> - Internationalisation for bigger community
          <br /> - A DAO for KERNEL members. KERNEL has given me so much, I feel
          obliged to pay back to the community however I can. And so I pledged
          to give back 20% of all of the $NAZ redeem amounts to my lovely
          community of geniuses and kind and awesome people
        </Typography>
      </Box>
      <Box className={classes.center}>
        <img alt="fire animation" src={loading} />
      </Box>
    </Box>
  );
};
