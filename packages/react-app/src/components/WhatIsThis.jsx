import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "64px",
    paddingLeft: "16px",
    paddingRight: "16px",
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
          naz, the creator of the $NAZ crew was a quant in London for 4 years.
          He got fed up with the 9-5 and quit. He self-taught himself maths and
          coding. $NAZ is a brand. It is the community. When you buy $NAZ, you
          become part of the family. We foster the philosophy of trust, giving
          first, caring and kindness. Everyone in the $NAZ band gets to build
          businesses together, gets to help one another (you need me to sit your
          cat?), yield farms that sweet yNAZ (you better get that $NAZ...) and
          hangs out together! Think about it as a family that you join and are
          unlikely leave ;)
        </Typography>
        <Typography variant="h4" color="textPrimary">
          What else can I do with $NAZ?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          $NAZ can be exchanged for (more to come soon)
          <br />
          - my time (14/08/2020 @ $200ph)
          <br />
          - get to hang out with me (subject to KYC)
          <br />
          - get to play DOTA 2 with me (Alex B., I will try LOL for you if you
          get some $NAZ)
          <br />
          - get featured / advertise stuff on my YouTube channel / Twitter
          <br />
          - get early access to my content
          <br />
          - access to a closed Telegram / Slack / Discord group, where we talk
          protocols and GPT-3
          <br />
          - assess/test my future products before anyone else
          <br />
          - code crazy cool projects with me
          <br />
        </Typography>
        <Typography variant="h4" color="textPrimary">
          Anything else?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          I believe in the future where there are no middlemen, no guards and no
          guardians. Our security, wellbeing, wealth are the concepts that have
          no meaning in that future. Protocols govern all, there is enough for
          everyone; jobs are the thing of the past. Personal tokens will play an
          essential role in such a future. You are your own company. You are the
          value that you have been trying to give to the world.
        </Typography>
        <Typography variant="h4" color="textPrimary">
          How does $NAZ work?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          If you decide to buy $NAZ, then that will increase its price. I have
          defined this to be the case in the code (in the smart contract, for
          the technical folk). I will drop in an interactive chart here in the
          future when I have more time. If you are wondering, this concept is
          called a "Bonding Curve". The uniqueness of our brand token $NAZ is in
          the fact that the price of it will increase inevitably, the more
          supply there is.{" "}
          <b>
            To those who say that this is a pyramid scheme, learn Solidity, and
            then read the source code{" "}
            <a
              href="https://etherscan.io/address/0x4BBBD966ea913545aD556045b7aF18f52A0aE91c"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </b>
          . On top of that, it is fully collateralized. There is more ETH
          backing it up than the total supply of $NAZ. It means the $NAZ band is
          more expensive than ETH. Traditional personal tokens are ERC20 tokens
          that have no intrinsic value, $NAZ fam token is overcollateralised
          with ETH. As we grow the $NAZ brand, we shall benefit from (i) ETH
          appreciation, (ii) $NAZ appreciation due to the widespread adoption.
          naz has no f*** interest in dumping his tokens on you when you buy in,
          that is not the intention. We are meant to grow this rockstar band
          together, it is easier to get to your destination with a team than
          solo. naz will ensure that $NAZ can only be joined by the qualifying
          people that share in these core principles and values
        </Typography>
        <Typography variant="h4" color="textPrimary">
          What is the price of 1 $NAZ right now?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
          Price = total number of $NAZ in the wild. Check the "BUY $NAZ" tab to
          see what this is
        </Typography>
        <Typography variant="h4" color="textPrimary">
          Final words?
        </Typography>
        <Typography color="textPrimary" variant="body1" className={classes.mb1}>
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
          adoption of Ethereum). You can inspect the contract{" "}
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
