import React, { useEffect, useCallback, useState } from "react";
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

const providerOptions = {
  // walletconnect: {
  //   package: WalletConnectProvider, // required
  //   options: {
  //     infuraId: "4a5295521e87487ea515d984c82d3a80", // required
  //   },
  // },
  // fortmatic: {
  //   package: Fortmatic, // required
  //   options: {
  //     key: "pk_test_7FA3FE337CB778C2", // required.
  //   },
  // },
  torus: {
    package: Torus, // required
    options: {
      // networkParams: {
      //   host: "https://localhost:8545", // optional
      //   chainId: 1337, // optional
      //   networkId: 1337, // optional
      // },
      // config: {
      //   buildEnv: "development", // optional
      // },
    },
  },
  // authereum: {
  //   package: Authereum, // required
  // },
  // unilogin: {
  //   package: UniLogin, // required
  // },
  // burnerconnect: {
  //   package: BurnerConnectProvider, // required
  //   options: {
  //     defaultNetwork: "100",
  //   },
  // },
  // mewconnect: {
  //   package: MewConnect, // required
  //   options: {
  //     infuraId: "4a5295521e87487ea515d984c82d3a80", // required
  //   },
  // },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true, // optional
  providerOptions, // required
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  fullWidthAppBar: {
    width: "100%",
  },
  stas: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "purple",
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
    padding: "1em",
  },
  noPad: {
    padding: "0px",
  },
}));

const App = () => {
  // const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [bottomNavValue] = useState(0);
  // const [darkState, setDarkState] = useState(true);

  const promptSetProvider = useCallback(async () => {
    const provider = await web3Modal.connect();
    setProvider(provider);
    const w3 = new Web3(provider);
    setWeb3(w3);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      if (!web3) {
        setIsLoading(true);
        try {
          promptSetProvider();
        } catch (e) {
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    })();
  }, [promptSetProvider, web3]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    // <ThemeProvider theme={darkTheme}>
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
            <Tab label="WTF?" {...a11yProps(1)} />
            <Tab label="SHARE" {...a11yProps(2)} />
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
          <Share />
        </TabPanel>
      </Box>
      <Box className={classes.paddingBot}>
        <BottomNavigation value={bottomNavValue}>
          <BottomNavigationAction
            // label="Twitter"
            icon={<TwitterIcon style={{ fontSize: 40, color: "grey" }} />}
            href="https://twitter.com/AlgorithmicBot"
            target="_blank"
            rel="noopener noreferrer"
          />
          <BottomNavigationAction
            // label="YouTube"
            icon={<YouTubeIcon style={{ fontSize: 40 }} />}
            href="https://www.youtube.com/channel/UC7KZmVBDuvLd_jhkp66pbiw"
            target="_blank"
            rel="noopener noreferrer"
          />
          <BottomNavigationAction
            // label="Medium"
            icon={<CreateIcon style={{ fontSize: 40 }} />}
            href="https://medium.com/@parzival.is.sweet"
            target="_blank"
            rel="noopener noreferrer"
          />
        </BottomNavigation>
      </Box>
    </Box>
    // </ThemeProvider>
  );
};

export default App;
