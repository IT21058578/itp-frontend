import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: "4px",
    // color: 'red',
    fontSize: "1rem",
    fontWeight: 600,
  },
  "& .MuiInputBase-input": {
    "&:focus": {
      // borderColor: "red !important",
      borderColor: "#0078D8",
    },
    height: "46px",
    color: "#4B0082",
    borderRadius: "15px",
    position: "relative",
    // backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "0.5px solid #0078D8",
    fontSize: 16,
    width: "100%",
    padding: "0px 22px",
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
  },
}));
export default function InputFeild(props) {
  const {
    defaultValue,
    id,
    sx,
    label,
    placeholder,
    variant,
    value,
    onChange,
    name,
    type,
    pattern,
    error,
    autoFocus,
  } = props;
  // console.log(error, "detail");
  return (
    <FormControl variant="standard" sx={{ width: "100%", marginTop: "16px" }}>
      <label
        style={{
          color: "#00000",
          fontSize: "16px",
          fontWeight: 400,
          marginTop: "-16px",
        }}
      >
        {label}
      </label>
      <BootstrapInput
        required
        defaultValue={defaultValue}
        id={id}
        sx={sx}
        label={label}
        variant={variant}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        helperText="error"
        autoFocus={autoFocus}
        inputProps={{ pattern } && { pattern: pattern }}
        {...(error && { error: true, helperText: "error" })}
        style={{
          "& .MuiInputBase-input": {
            "&:focus": {
              borderColor: "#0078D8 !important",
            },
          },
        }}
      />
      {error && (
        <p
          style={{
            color: "red",
            opacity: "0.6",
            paddingLeft: "20px",
            margin: "2px 0px 0px",
          }}
        >
          {" "}
          {error}
        </p>
      )}
    </FormControl>
  );
}
