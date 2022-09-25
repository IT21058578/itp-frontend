import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const BootstrapInput = styled(InputBase)(({ theme }, props) => ({
  "label + &": {
    marginTop: "24px",
    // color: 'red',
    fontSize: "18px",
    fontWeight: 400,
    color: "#809FB8",
    maxWidth: "210px",
  },
  "& .Mui-disabled": {
    // background: "red",
    WebkitTextFillColor: "#000000 !important",
    "::--webkit-text-fill-color": {
      color: "#000000 !important" /*Change the placeholder color*/,
      opacity: "1 !important" /*Change the opacity between 0 and 1*/,
    },
    "::-webkit-input-placeholder": {
      color: "#000000" /*Change the placeholder color*/,
      opacity: "1" /*Change the opacity between 0 and 1*/,
    },
  },

  "& .MuiInputBase-input": {
    "::-webkit-input-placeholder": {
      color: "#000000" /*Change the placeholder color*/,
      opacity: "1" /*Change the opacity between 0 and 1*/,
      fontWeight: "400",
    },
    "::--webkit-text-fill-color": {
      color: "#000000 !important" /*Change the placeholder color*/,
      opacity: "1 !important" /*Change the opacity between 0 and 1*/,
    },
    // -webkit-text-fill-color
    height: "44px",
    color: "#000000",
    // opacity: " 0.5",
    fontWeight: "500",
    borderRadius: "32px",
    position: "relative",
    // backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "2px solid rgba(0, 0, 0, 0.38)",
    fontSize: 16,
    // width: "230px",
    padding: "0px 0px 0px 24px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      //   borderColor: theme.palette.primary.main,
    },
  },
}));
export default function InputFeild(props) {
  const {
    defaultValue,
    id,
    // sx,
    label,
    // placeHolder,
    variant,
    value,
    onChange,
    name,
    type,
    pattern,
    error = null,
    disabled,
    maxWidth,
    required,
  } = props;

  return (
    <FormControl variant="standard">
      <InputLabel
        shrink
        htmlFor="bootstrap-input"
        style={{
          color: "#000000",
          fontSize: "18px",
          fontWeight: 500,
          minWidth: props.width ? props.width : "230px",
        }}
      >
        {/* {label} */}
      </InputLabel>
      <BootstrapInput
        defaultValue={defaultValue}
        id={id}
        // sx={sx}
        variant={variant}
        placeholder={label}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        disabled={disabled}
        required={required}
        inputProps={{ pattern } && { pattern: pattern }}
        {...(error && { error: true, helperText: error })}
        sx={{
          "& .MuiInputBase-input": {
            minWidth: maxWidth ? maxWidth : "210px !important",
          },
          "label + &": {
            maxWidth: maxWidth ? maxWidth : "210px !important",
          },
        }}
      />
    </FormControl>
  );
}
