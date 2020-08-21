import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0.5rem",
  },
  rowRadio: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  label: {
    color: "#fff",
  },
}));

export default ({ slippage, handleSlippageChange }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel>Max slippage</FormLabel>
      <Typography variant="caption" color="textPrimary">
        If you don't know what this is, leave at 1%
      </Typography>
      <RadioGroup
        aria-label="slippage"
        name="slippage"
        value={slippage}
        onChange={handleSlippageChange}
        className={classes.rowRadio}
        color="textPrimary"
      >
        <FormControlLabel
          value="100"
          classes={{
            label: classes.label,
          }}
          control={<Radio />}
          label="1%"
        />
        <FormControlLabel
          value="500"
          classes={{
            label: classes.label,
          }}
          color="textPrimary"
          control={<Radio />}
          label="5%"
        />
        <FormControlLabel
          value="1000"
          classes={{
            label: classes.label,
          }}
          color="textPrimary"
          control={<Radio />}
          label="10%"
        />
      </RadioGroup>
    </FormControl>
  );
};
