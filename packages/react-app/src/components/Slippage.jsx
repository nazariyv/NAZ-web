import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5em",
  },
  rowRadio: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

export default ({ slippage, handleSlippageChange }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">Max slippage</FormLabel>
      <Typography variant="caption">
        If you don't know what this is, leave at 1%
      </Typography>
      <RadioGroup
        aria-label="slippage"
        name="1%"
        value={slippage}
        onChange={handleSlippageChange}
        className={classes.rowRadio}
      >
        <FormControlLabel value="100" control={<Radio />} label="1%" />
        <FormControlLabel value="500" control={<Radio />} label="5%" />
        <FormControlLabel value="1000" control={<Radio />} label="10%" />
      </RadioGroup>
    </FormControl>
  );
};
