import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

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
  VKIcon,
  WhatsappIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingBottom: "32px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },
  paddingBot: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(8),
    },
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h1" className={classes.center}>
        SHARE Like There Is No Tomorrow
      </Typography>
      <BottomNavigation className={classes.paddingBot}>
        <Button disabled>Or Share $NAZ:</Button>
        <EmailShareButton url="naz.life">
          <EmailIcon size={48} round={true} />
        </EmailShareButton>
        <FacebookShareButton url="naz.life">
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url="naz.life">
          <LinkedinIcon size={48} round={true} />
        </LinkedinShareButton>
        <MailruShareButton url="naz.life">
          <MailruIcon size={48} round={true} />
        </MailruShareButton>
        <PinterestShareButton url="naz.life">
          <PinterestIcon size={48} round={true} />
        </PinterestShareButton>
        <RedditShareButton url="naz.life">
          <RedditIcon size={48} round={true} />
        </RedditShareButton>
        <TelegramShareButton url="naz.life">
          <TelegramIcon size={48} round={true} />
        </TelegramShareButton>
        <TumblrShareButton url="naz.life">
          <TumblrIcon size={48} round={true} />
        </TumblrShareButton>
        <ViberShareButton url="naz.life">
          <ViberIcon size={48} round={true} />
        </ViberShareButton>
        <VKShareButton url="naz.life">
          <VKIcon size={48} round={true} />
        </VKShareButton>
        <WhatsappShareButton url="naz.life">
          <WhatsappIcon size={48} round={true} />
        </WhatsappShareButton>
      </BottomNavigation>
    </Box>
  );
};
