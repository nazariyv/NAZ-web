import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "auto",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography gutterBottom variant="h1">
        WTF is this?
      </Typography>
      <Typography variant="h4">What do I do with this website?</Typography>
      <Typography color="textSecondary" variant="body1">
        You can buy my crypto token (personal token in crypto lingo) in exchange
        for (more to come soon)
        <br />
        - share of the future profits of my businesses
        <br />
        - my time (currently @ $200ph)
        <br />
        - get to hangout with me (subject to KYC)
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
        - I am going to come up with
        <br />
        - Assess / test my future products before anyone else
        <br />
        and many many more
      </Typography>
      <Typography variant="h4">Anything else?</Typography>
      <Typography color="textSecondary" variant="body1">
        I belive in the future where there is no middlemen. Where there are no
        guards nor guardians. Our security, wellbeing, wealth are the concepts
        that have no meaning in that future. All is governed by protocols, there
        is enough for everyone, jobs are the thing of the past. Personal tokens
        will play an important role in such a future. You are your own company.
        You are the value that you have been trying to give to the world. Value
        can flow within and without.
      </Typography>
      <Typography variant="h4">And you are?</Typography>
      <Typography color="textSecondary" variant="bode1">
        My name is Nazariy. I love maths & coding, I have a small YouTube
        channel and I am trying to figure out the Twitter. I have had enough of
        corporate grinding (I am burning the bridges, so that there is no going
        back) and resigned 2 months ago. Now I freelance and code in web3
        mostly. Enjoying what I do immensely. Let's keep it short and sweet.
      </Typography>
      <Typography variant="h4">So how does this work?</Typography>
      <Typography color="textSecondary" variant="bode1">
        If you decide to buy $NAZ, then that will increase its price. I have
        defined this to be the case in the code (in smart contract, for the
        technical folk). Here is how it will look like: [HAVE YOUR IPAD DOODLE
        HERE] I will drop in an interactive chart here in the future when I have
        a bit more time. And if you are wondering, this concept is called
        "Bonding Curve" in the blockchain lingo. Uniqueness of my personal token
        ($NAZ) is in the fact that the price of it will increase inevitably the
        more supply there is.
      </Typography>
    </Box>
  );
};
