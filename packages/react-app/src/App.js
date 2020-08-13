import React, { useEffect } from "react";
// import logo from "./ethereumLogo.png";
// import { Contract } from "@ethersproject/contracts";
// import { getDefaultProvider } from "@ethersproject/providers";
// import { gql } from "apollo-boost";
// import { useQuery } from "@apollo/react-hooks";
import { addresses, abis } from "@project/contracts";
import "./App.css";
import BuyNAZ from "./components/BuyNAZ";
import WhatIsThis from "./components/WhatIsThis";

import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TwitterIcon from "@material-ui/icons/Twitter";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { green, red } from "@material-ui/core/colors";
// import RestoreIcon from "@material-ui/icons/Restore";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import Web3 from "web3";
import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import UniLogin from "@unilogin/provider";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Portis from "@portis/web3";
import MewConnect from "@myetherwallet/mewconnect-web-client";
import Web3Modal from "web3modal";
// import DcentProvider from "dcent-provider";
import Button from "@material-ui/core/Button";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

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
  portis: {
    package: Portis, // required
    options: {
      id: "f88f7a22-440b-49b1-a945-4202d595d517", // required. TODO: this is mainnet
    },
  },
  mewconnect: {
    package: MewConnect, // required
    options: {
      infuraId: "4a5295521e87487ea515d984c82d3a80", // required
    },
  },
  // dcentwallet: {
  //   package: DcentProvider, // required
  //   options: {
  //     rpcUrl: "INSERT_RPC_URL" // required
  //   }
  // }
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const App = () => {
  const [contract, setContract] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [bottomNavValue, setBottomNavValue] = React.useState(0);

  useEffect(() => {
    (async () => {
      const provider = await web3Modal.connect();
      setProvider(provider);

      const web3 = new Web3(provider);
      setWeb3(web3);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // TODO: internationalization
  return (
    <React.Fragment className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Buy $NAZ" {...a11yProps(0)} />
          <Tab label="WTF FAQ" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BuyNAZ />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WhatIsThis />
      </TabPanel>

      <>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            startIcon={<AllInclusiveIcon />}
            size="large"
          >
            BUY
          </Button>
        </ThemeProvider>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<SentimentVeryDissatisfiedIcon />}
          size="large"
        >
          SELL
        </Button>
      </>

      <React.Fragment>
        <BottomNavigation
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(bottomNavValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Twitter"
            icon={<TwitterIcon style={{ color: green[500], fontSize: 40 }} />}
          />
        </BottomNavigation>
      </React.Fragment>
    </React.Fragment>
  );
};

export default App;
