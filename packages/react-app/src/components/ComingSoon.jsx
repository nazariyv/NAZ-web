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
        <Box className={classes.center}>
          <img alt="fire animation" src={loading} />
        </Box>
        <Typography color="textPrimary" variant="body2">
          <br />- smart contract to lock up my $NAZ (maybe even DAICO style)
          <br />
          - Listing my token on Uniswap
          <br /> - Internationalisation for bigger community
          <br /> - A DAO for KERNEL members. KERNEL has given me so much, I feel
          obliged to pay back to the community however I can. And so I pledged
          to give back 20% of all of the $NAZ redeem amounts to my lovely
          community of geniuses and kind and awesome people
          <br /> - New section here on the website where naz will host
          interactive jupyter notebooks that will supplement his{" "}
          <a href="https://medium.com/@parzival.is.sweet/ethereum-primitives-1-1-97c29d1d4ebf">
            Ethereum Primitives
          </a>{" "}
          series on Medium
        </Typography>
      </Box>
    </Box>
  );
};
