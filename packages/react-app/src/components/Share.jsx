import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import surfNaz from "../static/images/surfnaz.jpg";
import Container from "@material-ui/core/Container";

import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  ViberShareButton,
  WhatsappShareButton,
  FacebookIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  ViberIcon,
  TwitterIcon,
  WhatsappIcon,
  TwitterShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "75%",
    height: "100%",
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0rem 3rem 0rem 0rem",
    marginBottom: "96px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
    },
  },
  paddingBot: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: "1rem",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(8),
    },
    imgBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    centerImg: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%",
    },
    // shares: {
    //   width: "100%",
    //   display: "flex",
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    //   flexWrap: "wrap",
    //   alignItems: "center",
    //   textAlign: "center",
    //   height: "100%",
    //   flexGrow: 1,
    //   "& > *": {
    //     margin: theme.spacing(1),
    //     width: theme.spacing(16),
    //     height: theme.spacing(8),
    //   },
    // },
  },
}));

export default () => {
  const quote =
    "A very unique personal token $NAZ built on top of a linear bonding curve. You can read more about it here: https://naz.life";
  const classes = useStyles();
  const url = "https://naz.life";
  const media =
    "https://gateway.pinata.cloud/ipfs/QmbbBfxmgky8xhtKEHYuMmQnNVi4uKZqmngKxWBTqiUg2A";
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h1" className={classes.center}>
          SHARE Like
        </Typography>
        <Typography variant="h1" className={classes.center}>
          There is No Tomorrow
        </Typography>
      </Box>
      <Container>
        <Box className={classes.paddingBot}>
          <TwitterShareButton
            url={url}
            title="This guy used linear bonding curve to tokenize himself. Fully collateralized $NAZ"
            via="AlgorithmicBot"
            hashtags={[
              "ethereum",
              "personaltokens",
              "blockchain",
              "bondingcurve",
              "erc20",
            ]}
          >
            <TwitterIcon size={48} round={true} />
          </TwitterShareButton>
          <FacebookShareButton url={url} quote={quote} hashtag="ethereum">
            <FacebookIcon size={48} round={true} />
          </FacebookShareButton>
          <TelegramShareButton
            url={url}
            title="This is the first of its kind personal token"
          >
            <TelegramIcon size={48} round={true} />
          </TelegramShareButton>
          <PinterestShareButton url={url} description={quote} media={media}>
            <PinterestIcon size={48} round={true} />
          </PinterestShareButton>
          <RedditShareButton
            url={url}
            title="This is the first of its kind personal token"
          >
            <RedditIcon size={48} round={true} />
          </RedditShareButton>
          <ViberShareButton
            url={url}
            title="This is the first of its kind personal token"
          >
            <ViberIcon size={48} round={true} />
          </ViberShareButton>
          <WhatsappShareButton
            url={url}
            title="This is the first of its kind personal token"
          >
            <WhatsappIcon size={48} round={true} />
          </WhatsappShareButton>
        </Box>
      </Container>
      <Container>
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "40%",
            borderRadius: "3rem",
          }}
          src={surfNaz}
          alt="doodle human 'surfing' the NAZ bonding curve"
        />
      </Container>
    </Box>
  );
};
