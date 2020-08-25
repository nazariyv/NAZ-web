import React, { useCallback, useState, useMemo } from "react";
import BuyNAZ from "./components/BuyNAZ";
import WhatIsThis from "./components/WhatIsThis";
import Share from "./components/Share";
import PropTypes from "prop-types";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TwitterIcon from "@material-ui/icons/Twitter";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Web3 from "web3";
import Torus from "@toruslabs/torus-embed";
import Web3Modal from "web3modal";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CreateIcon from "@material-ui/icons/Create";
import ComingSoon from "./components/ComingSoon";
import TelegramIcon from "@material-ui/icons/Telegram";
// import BgColor from "./static/images/cool-background2.svg";
import CSSBaseline from "@material-ui/core/CssBaseline";
import CSSApp from "./App.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import loading from "./static/sounds/ui_loading.wav";
import Sky from "react-sky";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness7Icon from "@material-ui/icons/Brightness7";

const useStyles = makeStyles(() => ({
  root: {
    // backgroundColor: "black",
    // backgroundImage: `url(${BgColor})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "100% 0%",
    display: "flex",
    flexDirection: "column",
    // width: "100vw",
    // height: "100vh",
    zIndex: "5",
  },
  bgback: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "black",
  },
  navigation: {
    position: "fixed",
    left: 0,
    bottom: 0,
    textAlign: "center",
    display: "flex",
    // backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  // fullViewportHeight: {
  //   height: "100vh",
  // },
  botnav: {
    minWidth: "60px",
  },
}));

const providerOptions = {
  torus: {
    package: Torus,
    options: {
      networkParams: {
        chainId: 1,
        networkId: 1,
      },
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const App = () => {
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const connectAudio = new Audio(loading);
  const playSound = useCallback((audioFile) => {
    try {
      audioFile.play();
    } catch (e) {}
  }, []);

  const promptSetProvider = useCallback(async () => {
    playSound(connectAudio);
    setIsLoading(true);
    const provider = await web3Modal.connect();
    setProvider(provider);
    const w3 = new Web3(provider);
    setWeb3(w3);
    setIsLoading(false);
  }, [connectAudio, playSound]);

  const prefersDarkMode = useMediaQuery("prefers-color-scheme: dark");

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  // const [currTheme, setCurrTheme] = useState("dark");
  // const toggleTheme = useCallback(() => {
  //   setCurrTheme(currTheme === "dark" ? "light" : "dark");
  // }, [currTheme]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Sky
          images={{
            /* FORMAT AS FOLLOWS */
            0: "https://image.flaticon.com/icons/svg/124/124574.svg",
            1: "https://image.flaticon.com/icons/svg/124/124570.svg",
            2: "https://image.flaticon.com/icons/svg/124/124567.svg",
            3: "https://image.flaticon.com/icons/svg/124/124560.svg",
            4: "https://image.flaticon.com/icons/svg/124/124559.svg",
            5: "https://image.flaticon.com/icons/svg/124/124582.svg",
            6: "https://image.flaticon.com/icons/svg/124/124558.svg",
            7: "https://image.flaticon.com/icons/svg/124/124588.svg",
            8: "https://image.flaticon.com/icons/svg/124/124542.svg",
            9: "https://image.flaticon.com/icons/svg/124/124569.svg",
            10: "https://image.flaticon.com/icons/svg/124/124573.svg",
            11: "https://image.flaticon.com/icons/svg/124/124586.svg",
            12: "https://image.flaticon.com/icons/svg/124/124548.svg",
            13: "https://image.flaticon.com/icons/svg/124/124555.svg",
            // 0: "https://linkToYourImage0" /* You can pass as many images as you want */,
            // 1: "https://linkToYourImage1",
          }}
          how={
            21
          } /* Pass the number of images Sky will render chosing randomly */
          time={120} /* time of animation */
          size={"69px"} /* size of the rendered images */
          background={theme.palette.background.default}
          // background={"palettedvioletred"} /* color of background */
        />
        <AppBar
          position="sticky"
          color="default"
          className={classes.alignItems}
        >
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="naz token bar"
            // className={classes.root}
          >
            <Tab label="Buy $NAZ" {...a11yProps(0)} />
            <Tab label="What is $NAZ?" {...a11yProps(1)} />
            <Tab label="Coming Soon..." {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel
          value={value}
          index={0}
          // className={classes.fullViewportHeight}
        >
          <BuyNAZ
            promptSetProvider={promptSetProvider}
            web3={web3}
            provider={provider}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WhatIsThis />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ComingSoon />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Share />
        </TabPanel>
        <Box className={classes.navigation}>
          <BottomNavigationAction
            classes={{
              root: classes.botnav,
            }}
            icon={<TelegramIcon style={{ fontSize: "3rem" }} />}
            href="https://t.me/nazbondsurf"
            target="_blank"
            rel="noopener noreferrer"
          />
          <BottomNavigationAction
            classes={{
              root: classes.botnav,
            }}
            icon={<TwitterIcon style={{ fontSize: "3rem" }} />}
            href="https://twitter.com/AlgorithmicBot"
            target="_blank"
            rel="noopener noreferrer"
          />
          <BottomNavigationAction
            classes={{
              root: classes.botnav,
            }}
            icon={<YouTubeIcon style={{ fontSize: "3rem" }} />}
            href="https://www.youtube.com/channel/UC7KZmVBDuvLd_jhkp66pbiw"
            target="_blank"
            rel="noopener noreferrer"
          />
          <BottomNavigationAction
            classes={{
              root: classes.botnav,
            }}
            icon={<CreateIcon style={{ fontSize: "3rem" }} />}
            href="https://medium.com/@parzival.is.sweet"
            target="_blank"
            rel="noopener noreferrer"
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
