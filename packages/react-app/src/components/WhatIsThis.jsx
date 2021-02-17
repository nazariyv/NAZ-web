import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "64px",
    padding: "0 32px",
  },
  moveRight: {
    textAlign: "right",
  },
  mb1: {
    marginBottom: "1rem",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography gutterBottom variant="h1" color="textPrimary">
          What is $NAZ?
        </Typography>
      </Box>
      <Box fontWeight="fontWeightBold">
        <Typography variant="body1" className={classes.mb1} color="textPrimary">
          naz, the creator of the $NAZ personal token worked as a<br />{" "}
          <span>
            <Typography variant="h6">quantitative developer</Typography>
          </span>{" "}
          for some time, that means you should know computer science and
          mathematics well
          <br />
          In practice that usually means you are good in one, but bad in the
          other, or as often is the case you are: "jack of all trades"
        </Typography>
        <Typography variant="h4" color="textPrimary">
          Why $NAZ?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          $NAZ is the <Typography variant="h6">COMMUNITY</Typography> first and
          foremost
          <br />
          I want to build meaningful relationships with people who are in $NAZ
          <br />
          You do not have to buy $NAZ to join, just click the Telegram icon
          below
          <br />
        </Typography>

        <Typography variant="h4" color="textPrimary">
          How does $NAZ work?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          If you decide to buy $NAZ, then that will increase its price <br />
          Price of $NAZ = total supply of $NAZ
          <br />
          EXAMPLE
          <br />
          Total supply of $NAZ = 0<br />
          1. Buy 1 $NAZ for 1 ETH
          <br />
          Total supply of $NAZ becomes = 1 $NAZ
          <br />
          2. Buy 1 $NAZ for 2 ETH
          <br />
          Total supply of $NAZ becomes = 2 $NAZ
          <br />
          and so on
          <br />
          currently, there are about 6.5 NAZ in total supply, that means that 1
          + 2 + 3 + 4 + 5 + 6 + 0.5 * 7 =~ 24 ETH had to be paid to acquire this
          many $NAZ
        </Typography>
        <Typography variant="h4" color="textPrimary">
          Why such HARD MATHS, Why SUCH MUCH!?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          We need to incentivise people to hold $NAZ. If you join $NAZ, it is
          not for speculation, it is for building the community together, so
          that everyone in it will benefit intellectually, emotionally and
          financially. This is not some wishy washy new age philosophy, this is
          the fact
        </Typography>
        <Typography variant="h4" color="textPrimary">
          Final words?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          Yes, glad you asked! There are a couple of changes incoming to $NAZ
          <br />
          1. I will lock up my $NAZ in a smart contract so that new people to
          our community know I am not going to "dump" my $NAZ on them
          <br />
          2. I will think about how to make the buying process cheaper and
          easier
          <br />
          3. Create a "less-hard" loyalty token for those who own $NAZ to (i)
          incentivise holding $NAZ, (ii) use it for governance. As mentioned
          earlier, this is a community first and foremost, and so on I want
          everyone to be involved in developing $NAZ. That includes building
          businesses together, deciding where our profits / revenues should go,
          and so on.
          <br />
          <br />
          P.S. You can inspect the contract{" "}
          <a
            href="https://etherscan.io/address/0x4BBBD966ea913545aD556045b7aF18f52A0aE91c"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          . If you want to contribute to this website, then the source code is{" "}
          <a
            href="https://github.com/nazariyv/NAZ-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </Typography>
        <Box>
          <Typography variant="h2" color="error">
            WARNING
          </Typography>
          <Typography variant="overline" color="error">
            THIS IS RISKY. IF YOU ARE A UNITED STATES OF AMERICA BASED BUYER,
            STOP. IF YOU BUY THIS TOKEN, YOU CONSENT TO BE LIABLE FOR ALL OF THE
            LEGAL RAMIFICATIONS OF THE PURCHASE AND BEYOND. DO NOT BUY! THIS
            TOKEN'S USE IS FOR YOU TO REDEEM IT IN THE FUTURE FOR MY SERVICES.
            DO NOT USE IT AS A VALUE STORE, DO NOT USE IT AS AN INVESTMENT, DO
            NOT USE IT AS A SPECULATION. I WILL REITERATE, IF YOU ARE UNITED
            STATES OF AMERICA BASED, DO NOT BUY! THIS IS ALPHA PRODUCT, BE
            WARNED. I AM NOT LIABLE FOR ANY LOSS OF YOUR ETH / $NAZ. BY BUYING,
            YOU CONSENT TO THIS.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
