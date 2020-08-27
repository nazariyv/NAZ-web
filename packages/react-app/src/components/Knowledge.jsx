import React from "react";
// import Helmet from "react-helmet";
import EmbeddedGist from "./EmbedGist";
import {
  makeStyles,
  // createMuiTheme,
  // ThemeProvider,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // width: "100vw",
    // height: "100vh",
    zIndex: "5",
    // position: "relatice",
    minHeight: "100%",
    margin: "16px",
  },
}));

export default () => {
  const classes = useStyles();
  //   useEffect(() => {
  //     const script = document.createElement("script");

  //     script.src =
  //       "https://gist.github.com/nazariyv/6a0ee89f7e96e7b5d879c27fc84d9eaf.js";
  //     script.async = true;

  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);
  //     const useEffect();

  return (
    <Box className={classes.root}>
      <EmbeddedGist
        gist="nazariyv/44fa7cca7829a0d95607499d869e0e90"
        file="merkle-patricia-trie.ipynb"
      />
    </Box>
  );
};
