import React from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import { FormControl, Select, MenuItem, FormHelperText } from "@mui/material";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(() =>
  createStyles({
    Para: {
      color: "#809FB8",
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
      // fontWeight: "600 !important",
      color: "#000000 !important",
      textTransform: "capitalize !important",
    },
    input: {
      padding: "5px 14px !important",
      color: "#000000",
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
export default function Selects(props) {
  const classes = useStyles(props);
  const {
    name,
    label,
    value = "",
    error = null,
    onChange,
    options,
    disabled,
    placeholder,
    paddingTop,
    width,
    required,
  } = props;
  // console.log(disabled, "disabled");
  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
      style={{
        height: "70px",
        paddingTop: !paddingTop && "22px",
        // width: width,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      {/* <div className={classes.Para}>{label}</div> */}
      {/* {!value && <p>{value}</p>}vasddlue */}
      {/* {value} */}
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
        required={required}
        renderValue={
          value != ""
            ? value === 1
              ? () => <Placeholder>'yes</Placeholder>
              : value === false
              ? () => <Placeholder>'no</Placeholder>
              : null
            : () => (
                <Placeholder>
                  {value === false ? "No" : placeholder}
                </Placeholder>
              )
        }
      >
        {value === 1 && <MenuItem value={value}>Yes</MenuItem>}
        {/* {value === 1 && <MenuItem value={value}>Yes</MenuItem>} */}
        {value === 0 && <MenuItem value={value}>No</MenuItem>}
        {/* {value !== (0||false )&& value !== (1||true) && (
          <MenuItem value={value}> {value} </MenuItem>
        )} */}

        {options &&
          options.map((item) => (
            <MenuItem
              key={item.id}
              value={
                item.id === true
                  ? item.name
                  : item.id === false
                  ? item.name
                  : item.id
              }
              className={classes.OptionsMenu}
              classes={{ root: classes.OptionsMenu }}
            >
              {item.name}
            </MenuItem>
          ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
