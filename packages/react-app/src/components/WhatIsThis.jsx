import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

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
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography gutterBottom variant="h1">
        WTF is this?
      </Typography>
      <Typography variant="body1">
        You can buy my crypto token in exchange for: - share of the future
        profits of my businesses - my time - get to hangout with me (subject to
        KYC) - get to play DOTA 2 with me - get featured / advertise stuff on my
        YouTube channel / Twitter - get early access to my content - access to a
        closed Telegram / Slack / Discord group, where we talk protocols and
        GPT-3 - I am going to come up with cooler usecases, I promise
      </Typography>
      <Typography variant="body1">
        I belive in the future where there is no middlemen. Where there are no
        guards nor guardians. Our security, wellbeing, wealth are the concepts
        that have no meaning in that future. All is governed by protocols, there
        is enough for everyone, jobs are the thing of the past. Personal tokens
        will play an important role in such a future. You are your own company.
        You are the value that you have been trying to give to the world. Value
        can flow within and without.
      </Typography>
      <Divider variant="middle" />
      <Typography variant="bode1">
        My name is Nazariy. I love maths & coding, I have a small YouTube
        channel and I am trying to figure out the Twitter. I have had enough of
        corporate grinding (I am burning the bridges, so that there is no going
        back) and resigned 2 months ago. Now I freelance and code in web3
        mostly. Enjoying what I do immensely. Let's keep it short and sweet.
      </Typography>
      <Typography variant="bode1">
        If you decide to buy $NAZ, then that will increase its price. I have
        defined this to be the case in the code (in smart contract, for the
        technical folk). Here is how it will look like: [HAVE YOUR IPAD DOODLE
        HERE] I will drop in an interactive chart here in the future when I have
        a bit more time. And if you are wondering, this concept is called
        "Bonding Curve" in the blockchain lingo. Uniqueness of my personal token
        ($NAZ) is in the fact that the price of it will increase inevitably the
        more supply there is.
      </Typography>
      <Typography variant="bode1">
        You will be entitled to the following if you buy myself ($NAZ): - - - -
        -
      </Typography>
    </Box>
  );
};
