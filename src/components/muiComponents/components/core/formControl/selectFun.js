import React from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import { FormControl, Select, MenuItem, FormHelperText } from "@mui/material";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// import Moment from "react-moment";
import moment from "moment";

const useStyles = makeStyles(() =>
  createStyles({
    Para: {
      // color: "#809FB8",
      letterSpacing: "0.26px",
      textAlign: "left",
      fontFamily: "poppins",
      fontWeight: 400,
    },
    Select: {},
    root: {
      minWidth: (props) => (props.width ? props.width : "210px"),
      borderRadius: "32px !important",
      // color: "#809FB8 !important",
      height: "44px",
      backgroundColor: "#0000000 !important",
      border: "1px solid #7070701A !important",
      textTransform: "capitalize !important",
      color: "#000000 !important",
      textTransform: "capitalize !important",
    },
    root1: {
      minWidth: "100px",
      borderRadius: "32px !important",
      // color: "#809FB8 !important",
      height: "44px",
      backgroundColor: "#0000000 !important",
      border: "1px solid #7070701A !important",
      textTransform: "capitalize !important",
      // fontWeight: "600 !important",
      color: "#000000 !important",
    },
    input: {
      padding: "5px 14px !important",
      // color: "#809FB8",
      display: "flex !important",
      alignItems: "center",
    },
    placeholder: {
      textTransform: "capitalize",
      // fontWeight: "600",
      color: "#000000",
    },
    SRoot: {
      border: "1px solid red !important",
      width: "200px",
    },
    SRoots: {
      border: "1px solid red !important",
      width: "100px",
    },
    OptionsMenu: {
      textTransform: "capitalize !important",
      // fontWeight: "600 !important",
    },
  })
);
const usePlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    textTransform: "capitalize",
    // fontWeight: "600",
    color: "#000000",
  },
}));
const Placeholder = ({ children }) => {
  const classes = usePlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};
// console.log(value, "valuevalue");
export default function SelectFun(props) {
  const classes = useStyles(props);
  const {
    name,
    value = "",
    error = null,
    onChange,
    options,
    disabled,
    placeholder,
    paddingTop,
    addTextfeild,
    addTextfeildOff,
    editableText,
    placeholder1
  } = props;
  // console.log(disabled, "disabled");
  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
      style={{
        height: "70px",
        paddingTop: !paddingTop && "22px",
        display: "flex",
        width: "500px",
        flexDirection: "row",
      }}
    >
      {!editableText && (
        <Select
          name={name}
          value={value || ""}
          onChange={onChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          classes={{
            root: classes.SRoot,
            select: classes.Select,
            iconOutlined: classes.iconOutlined,
          }}
          className={classes.root1}
          input={<OutlinedInput classes={{ input: classes.input }} />}
          defaultValue={value}
          disabled={disabled}
          renderValue={
            value != ""
              ? value === 0
                ? () => <Placeholder>Unit</Placeholder>
                : value === 0
                ? () => <Placeholder>Unit</Placeholder>
                : null
              : () => <Placeholder>{placeholder1}</Placeholder>
          }
        >
          {value === 1 && <MenuItem value={value}>Unit</MenuItem>}
          {value === 0 && <MenuItem value={value}>Unit</MenuItem>}
          {value !== 0 && value !== 1 && disabled && (
            <MenuItem value={value}> {value} </MenuItem>
          )}

          {options &&
            options.map((item) => (
              <MenuItem
                key={item.id}
                value={item.humidity}
                className={classes.OptionsMenu}
                classes={{ root: classes.OptionsMenu }}
                onClick={addTextfeildOff}
              >
                {item.temperatureUnit}
              </MenuItem>
            ))}
          <MenuItem
            value={"new"}
            className={classes.OptionsMenu}
            classes={{ root: classes.OptionsMenu }}
            onClick={addTextfeild}
          >
            Add New
          </MenuItem>
        </Select>
      )}
      {!editableText && <div style={{ width: "26px" }}></div>}
      <Select
        name={name}
        value={value || ""}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        classes={{
          root: classes.SRoot,
          select: classes.Select,
          iconOutlined: classes.iconOutlined,
        }}
        className={classes.root}
        input={<OutlinedInput classes={{ input: classes.input }} />}
        defaultValue={value}
        disabled={disabled}
        renderValue={
          value != ""
            ? value === 1
              ? () => <Placeholder>Select Date</Placeholder>
              : value === 0
              ? () => <Placeholder>Select Date</Placeholder>
              : null
            : () => <Placeholder>{placeholder}</Placeholder>
        }
      >
        {value === 1 && <MenuItem value={value}>Select Date</MenuItem>}
        {value === 0 && <MenuItem value={value}>Select Date</MenuItem>}
        {value !== 0 && value !== 1 && disabled && (
          <MenuItem value={value}> {value} </MenuItem>
        )}

        {options &&
          options.map((item) => (
            <MenuItem
              key={item.id}
              value={item.humidity}
              className={classes.OptionsMenu}
              classes={{ root: classes.OptionsMenu }}
              onClick={addTextfeildOff}
            >
              {moment(item.date).format("YYYY-MM-DD")}
            </MenuItem>
          ))}
        <MenuItem
          value={"new"}
          className={classes.OptionsMenu}
          classes={{ root: classes.OptionsMenu }}
          onClick={addTextfeild}
        >
          Add New
        </MenuItem>
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
