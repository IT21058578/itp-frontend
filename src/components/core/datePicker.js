// App.js
import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
        height: "32px",
        width: "90px",
        color: "#B88080",
        // borderRadius: 8,
        position: "relative",
        // border: "1px solid #ced4da",
        fontSize: 16,
        // width: "auto",
        padding: "0px 0px 0px 9px",
      },
      "MuiOutlinedInput-root": {
        borderRadius: "8px !important",
      },
    },
    Para: {
      color: "#809FB8",
      letterSpacing: "0.26px",
      textAlign: "left",
      // marginTop: "10px",
    },
  })
);
function filterWeekends(date) {
  // Return false if Saturday or Sunday
  return date.getDay() === 0 || date.getDay() === 6;
}

function App(props) {
  const { label, value, handleDateChange } = props;
  const classes = useStyles();

  // const handleDateChangeDate1 = (date) => {
  //   console.log(date);
  //   setSelectedDate(date);
  // };

  return (
    <div className={classes.App}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.Para}>{label}</div>
        <KeyboardDatePicker
          style={{
            width: "162px",
            height: "32px",
          }}
          // keyboardIcon={<KeyboardArrowDownIcon />}
          className={classes.textField}
          margin="none"
          inputVariant="outlined"
          label=""
          format="MM/dd/yyyy"
          value={value}
          onChange={handleDateChange}
          orientation="portrait"
          shouldDisableDate={filterWeekends}
          // ToolbarComponent={(props) => <h1>{JSON.stringify(new Date()) }</h1>}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
