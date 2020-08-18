import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
// import bondingCurve from "../static/images/bondingCurve.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    width: "85%",
    height: "100%",
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    maxHeight: "500px",
    padding: "16px",
  },
  moveRight: {
    textAlign: "right",
  },
  typography: {
    margin: "16px 0",
  },
  lastTypography: {
    marginTop: "16px",
    marginBottom: "128px",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.moveRight} gutterBottom variant="h1">
        WTF is this?
      </Typography>
      <Box>
        <Typography variant="h2">WARNING</Typography>
        <Typography variant="overline">
          THIS IS RISKY. IF YOU ARE A UNITED STATES OF AMERICA BASED BUYER,
          STOP. IF YOU BUY THIS TOKEN, YOU CONSENT TO BE LIABLE FOR ALL OF THE
          LEGAL RAMIFICATIONS OF THE PURCHASE AND BEYOND. DO NOT BUY! THIS
          TOKEN'S USE IS FOR YOU TO REDEEM IT IN THE FUTURE FOR MY SERVICES. DO
          NOT USE IT AS A VALUE STORE, DO NOT USE IT AS AN INVESTMENT, DO NOT
          USE IT AS A SPECULATION. I WILL REITERATE, IF YOU ARE UNITED STATES OF
          AMERICA BASED, DO NOT BUY! THIS IS ALPHA PRODUCT, BE WARNED. I AM NOT
          LIABLE FOR ANY LOSS OF YOUR ETH / $NAZ. BY BUYING, YOU CONSENT TO
          THIS.
        </Typography>
        <Typography variant="h4" className={classes.typography}>
          What do I do with this website?
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.typography}
        >
          You can buy my personal token here. Tokens are neat. $NAZ can be
          exchanged for (more to come soon)
          <br />
          - my time (14/08/2020 @ $200ph)
          <br />
          - get to hang out with me (subject to KYC)
          <br />
          - get to play DOTA 2 with me
          <br />
          - get featured / advertise stuff on my YouTube channel / Twitter
          <br />
          - get early access to my content
          <br />
          - access to a closed Telegram / Slack / Discord group, where we talk
          protocols and GPT-3
          <br />
          - Assess/test my future products before anyone else
          <br />
          - Code some crazy cool stuff with me
          <br />
          ...
        </Typography>
        <Typography variant="h4" className={classes.typography}>
          Anything else?
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.typography}
        >
          I believe in the future where there are no middlemen, no guards and no
          guardians. Our security, wellbeing, wealth are the concepts that have
          no meaning in that future. Protocols govern all, there is enough for
          everyone; jobs are the thing of the past. Personal tokens will play an
          essential role in such a future. You are your own company. You are the
          value that you have been trying to give to the world. It flows within
          and without.
        </Typography>
        <Typography variant="h4" className={classes.typography}>
          And you are?
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.typography}
        >
          My name is Nazariy. I love maths & coding, I have a small YouTube
          channel, and I am trying to figure out Twitter. I have had enough of
          corporate grinding (I am burning the bridges so that there is no going
          back) and resigned two months ago. Now I freelance and code in web3
          mostly. I am enjoying what I do immensely, although I am running on
          three days of no sleep due to this website. Let's keep it short and
          sweet.
        </Typography>
        <Typography variant="h4" className={classes.typography}>
          So how does this work?
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.typography}
        >
          If you decide to buy $NAZ, then that will increase its price. I have
          defined this to be the case in the code (in the smart contract, for
          the technical folk). I will drop in an interactive chart here in the
          future when I have a bit more time. And if you are wondering, this
          concept is called "Bonding Curve" in the blockchain lingo. The
          uniqueness of my personal token ($NAZ) is in the fact that the price
          of it will increase inevitably, the more supply there is. On top of
          that, it is fully collateralized. There is more ETH backing it up than
          the total supply of NAZ. It means I am more expensive than ETH.
        </Typography>
        <Typography variant="h4" className={classes.typography}>
          What is the total supply?
        </Typography>
        <Typography color="textSecondary" variant="body1">
          On the main page, just under the market capitalisation text, you can
          see the total number of issued $NAZ and the ETH that backs it up. My
          token is over-collateralised. I cannot mint it as I please, and its
          value is at the very least derived from the collateral backing it up.
          If I want my token, I have to buy it just like everyone else.
        </Typography>
        <Typography variant="h4" className={classes.typography}>
          Final words?
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.lastTypography}
        >
          Yes, glad you asked! ETH backs all $NAZ, and its price is
          mathematically determined. The more people buy it, the more expensive
          it gets. So act fast. I cannot and would not mint $NAZ without buying
          it for my own skin-in-the-game ETH. This avoids ridiculous
          "air-drops." that depress the price. Rest assured: $NAZ - is quality,
          it is not "meme" potential, although, it may be. So, the only real way
          I can get $NAZ is by you converting it for my services listed above. I
          think this is a great mechanism and ensures that our incentives are
          aligned.
          <br />
          <br />I have created this as part of an incubator I am in, to
          incentivise people to give me the feedback on my business idea (retail
          adoption of Ethereum)
        </Typography>
      </Box>
    </Box>
  );
};
