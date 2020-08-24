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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import loading from "./static/sounds/ui_loading.wav";

const useStyles = makeStyles(() => ({
  root: {
    // backgroundColor: "black",
    // backgroundImage: `url(${BgColor})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "100% 0%",
    display: "flex",
    flexDirection: "column",
    width: "100vw",
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
  fullViewportHeight: {
    height: "100vh",
  },
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

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
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
          className={classes.fullViewportHeight}
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
