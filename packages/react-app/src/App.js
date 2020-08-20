import React, { useCallback, useState } from "react";
import BuyNAZ from "./components/BuyNAZ";
import WhatIsThis from "./components/WhatIsThis";
import Share from "./components/Share";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TwitterIcon from "@material-ui/icons/Twitter";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Web3 from "web3";
import Torus from "@toruslabs/torus-embed";
import Web3Modal from "web3modal";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CreateIcon from "@material-ui/icons/Create";
import ComingSoon from "./components/ComingSoon";
import TelegramIcon from "@material-ui/icons/Telegram";
import BgColor from "./static/images/cool-background4.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${BgColor})`,
    height: "100vh",
    /* Center and scale the image nicely */
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  fullWidthAppBar: {
    width: "100%",
  },
  alignItems: {
    alignItems: "center",
  },
  paddingBot: {
    position: "fixed",
    left: 0,
    bottom: 0,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70px",
    backgroundColor: theme.palette.background.paper,
  },
  arrangeIcons: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem",
  },
  noPad: {
    padding: "0px",
  },
  displayBlock: {
    display: "block",
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
      // config: {
      //   buildEnv: "development", // optional
      // },
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const App = () => {
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [bottomNavValue] = useState(0);

  const promptSetProvider = useCallback(async () => {
    setIsLoading(true);
    const provider = await web3Modal.connect();
    setProvider(provider);
    const w3 = new Web3(provider);
    setWeb3(w3);
    setIsLoading(false);
  }, []);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.fullWidthAppBar}>
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
          >
            <Tab label="Buy $NAZ" {...a11yProps(0)} />
            <Tab label="What is $NAZ?" {...a11yProps(1)} />
            <Tab label="Coming Soon..." {...a11yProps(2)} />
            <Tab label="SHARE" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
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
      </Box>
      <Box className={classes.paddingBot}>
        <Box className={classes.displayBlock}>
          <BottomNavigation value={bottomNavValue}>
            <BottomNavigationAction
              icon={
                <TelegramIcon style={{ fontSize: "3rem", color: "grey" }} />
              }
              href="https://t.me/nazbondsurf"
              target="_blank"
              rel="noopener noreferrer"
            />
            <BottomNavigationAction
              icon={<TwitterIcon style={{ fontSize: "3rem", color: "grey" }} />}
              href="https://twitter.com/AlgorithmicBot"
              target="_blank"
              rel="noopener noreferrer"
            />
            <BottomNavigationAction
              icon={<YouTubeIcon style={{ fontSize: "3rem", color: "grey" }} />}
              href="https://www.youtube.com/channel/UC7KZmVBDuvLd_jhkp66pbiw"
              target="_blank"
              rel="noopener noreferrer"
            />
            <BottomNavigationAction
              icon={<CreateIcon style={{ fontSize: "3rem", color: "grey" }} />}
              href="https://medium.com/@parzival.is.sweet"
              target="_blank"
              rel="noopener noreferrer"
            />
          </BottomNavigation>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
