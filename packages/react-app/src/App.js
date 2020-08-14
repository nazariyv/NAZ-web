import React, { useEffect, useCallback } from "react";
import BuyNAZ from "./components/BuyNAZ";
import WhatIsThis from "./components/WhatIsThis";
import Share from "./components/Share";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TwitterIcon from "@material-ui/icons/Twitter";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { green, red } from "@material-ui/core/colors";
import Web3 from "web3";
import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import UniLogin from "@unilogin/provider";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import MewConnect from "@myetherwallet/mewconnect-web-client";
import Web3Modal from "web3modal";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CreateIcon from "@material-ui/icons/Create";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "4a5295521e87487ea515d984c82d3a80", // required
    },
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "pk_test_7FA3FE337CB778C2", // required. TODO: change for live
    },
  },
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
  authereum: {
    package: Authereum, // required
  },
  unilogin: {
    package: UniLogin, // required
  },
  burnerconnect: {
    package: BurnerConnectProvider, // required
    options: {
      defaultNetwork: "100", // TODO: ? what is this
    },
  },
  mewconnect: {
    package: MewConnect, // required
    options: {
      infuraId: "4a5295521e87487ea515d984c82d3a80", // required
    },
  },
};

const web3Modal = new Web3Modal({
  network: "ropsten", // optional. TODO: change to mainnet
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px",
  },
  topAutoM: {
    marginTop: "auto",
    flexDirection: "row",
    display: "flex",
    padding: "16px",
  },
  iAmReal: {
    display: "block",
  },
  paddingBot: {
    position: "fixed",
    left: 0,
    bottom: 0,
    paddingBottom: "32px",
    textAlign: "center",
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(8),
    },
  },
}));

const App = () => {
  const [contract, setContract] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [bottomNavValue, setBottomNavValue] = React.useState(0);

  const promptSetProvider = useCallback(async () => {
    const provider = await web3Modal.connect();
    setProvider(provider);

    const web3 = new Web3(provider);
    setWeb3(web3);
  }, []);

  useEffect(() => {
    (async () => {
      promptSetProvider();
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // TODO: internationalization
  return (
    <Box>
      <Box className={classes.iAmReal}>
        <AppBar position="sticky" color="black">
          <Tabs
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
          <BuyNAZ promptSetProvider={promptSetProvider} web3={web3} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WhatIsThis />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Share />
        </TabPanel>
      </Box>
      <Box className={classes.root}>
        <BottomNavigation
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(bottomNavValue);
          }}
          showLabels
          className={classes.paddingBot}
        >
          <Button disabled>Follow $NAZ:</Button>
          <BottomNavigationAction
            label="Twitter"
            icon={<TwitterIcon style={{ color: green[500], fontSize: 40 }} />}
            href="https://twitter.com/AlgorithmicBot"
            target="_blank"
          />
          <BottomNavigationAction
            label="YouTube"
            icon={<YouTubeIcon style={{ color: red[500], fontSize: 40 }} />}
            href="https://www.youtube.com/channel/UC7KZmVBDuvLd_jhkp66pbiw"
            target="_blank"
          />
          <BottomNavigationAction
            label="Medium"
            icon={<CreateIcon style={{ color: green[500], fontSize: 40 }} />}
            href="https://medium.com/@parzival.is.sweet"
            target="_blank"
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default App;
