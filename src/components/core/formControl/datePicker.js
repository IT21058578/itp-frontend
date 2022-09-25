import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
const useStyles = makeStyles((prop) =>
  createStyles({
    App: {
      height: "72px",
    },
    textField: {
      "label + &": {
        color: "red",
        fontSize: "16px",
        fontWeight: 600,
      },
      "& .MuiInputBase-input": {
        height: "44px",
        width: "90px",
        color: "#000000",
        opacity: "0.9",
        borderRadius: "32px !important",
        position: "relative",
        // border: "1px solid #ced4da",
        fontSize: 16,
        // width: "auto",
        padding: "0px 0px 0px 22px",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "32px !important",
        display: "flex",
        justifyContent: "space-between",
      },
      "& .MuiButtonBase-root": {
        color: "#000000 !important",
        padding: "2px 1px 2px 4px",
      },
    },
    Para: {
      color: "#000000",
      letterSpacing: "0.26px",
      textAlign: "left",
      fontWeight: "600",
      textTransform: "capitalize",
      paddingLeft: "22px",
    },
  })
);
// function filterWeekends(date) {
//   // Return false if Saturday or Sunday
//   return date.getDay() === 0 || date.getDay() === 6;
// }
export default function DatePicker(props) {
  const classes = useStyles();

  const { name, label, value, onChange, disabled } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <div className={classes.App}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.Para}>{label}</div>
        <KeyboardDatePicker
          style={{
            maxWidth: "230px",
            height: "44px",
          }}
          // keyboardIcon={<KeyboardArrowDownIcon />}
          className={classes.textField}
          margin="none"
          inputVariant="outlined"
          label=""
          format="dd/MM/yyyy"
          value={value}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
          orientation="portrait"
          // shouldDisableDate={filterWeekends}
          name={name}
          disabled={disabled}
          // ToolbarComponent={(props) => <h1>{JSON.stringify(new Date()) }</h1>}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
