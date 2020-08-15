import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import surfNaz from "../static/images/surfnaz.jpg";
import Container from "@material-ui/core/Container";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  MailruIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  ViberIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon,
  TwitterShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    width: "75%",
    height: "100%",
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0em 3em 0em 0em",
    marginBottom: "96px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em",
    },
  },
  paddingBot: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: "1em",
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
    "You can buy portions of profits of $NAZ's business by buying tokenized version of himself. You can read more about it here: naz.life";
  const classes = useStyles();
  const url = "naz.life";
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
            title="This guy used bonding curve to tokenize himself"
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
          <LinkedinShareButton
            url={url}
            title="This guy tokenized himself"
            summary="Persontal Token that deries its value from a Bonding Curve!"
            source={url}
          >
            <LinkedinIcon size={48} round={true} />
          </LinkedinShareButton>
          {/* <EmailShareButton url={url}>
            <EmailIcon
              size={48}
              round={true}
              subject="This guy tokenized himself"
              body={quote}
            />
          </EmailShareButton> */}
          <TelegramShareButton url={url} title="This guy tokenized himself">
            <TelegramIcon size={48} round={true} />
          </TelegramShareButton>
          {/* <MailruShareButton
            url={url}
            title="This guy tokenized himself"
            description={quote}
            imageUrl={media}
          >
            <MailruIcon size={48} round={true} />
          </MailruShareButton> */}
          <PinterestShareButton url={url} description={quote} media={media}>
            <PinterestIcon size={48} round={true} />
          </PinterestShareButton>
          <RedditShareButton url={url} title="This guy tokenized himself">
            <RedditIcon size={48} round={true} />
          </RedditShareButton>
          <TumblrShareButton
            url={url}
            title="This guy tokenized himself"
            caption={quote}
          >
            <TumblrIcon size={48} round={true} />
          </TumblrShareButton>
          <ViberShareButton url={url} title="This guy tokenized himself">
            <ViberIcon size={48} round={true} />
          </ViberShareButton>
          <VKShareButton
            url={url}
            title="этот парниша себя токенизировал"
            image={media}
            noVkLinks={true}
          >
            <VKIcon size={48} round={true} />
          </VKShareButton>
          <WhatsappShareButton url={url} title="This guy tokenized himself">
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
            borderRadius: "3em",
          }}
          src={surfNaz}
          alt="doodle human 'surfing' the NAZ bonding curve"
        />
      </Container>
    </Box>
  );
};
