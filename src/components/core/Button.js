import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(0.5),
    justifyContent: "center",
    color: "#4B0082",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: (props) => (props.height ? props.height : "46px"),
    // background: "#FFFFFF",
    borderRadius: "20px",
    cursor: "pointer !important",
    border: "1px solid #4B0082",
    margin: "30px 10px 0 0px !important",
    fontSize: "1rem",
    fontWeight: "500",
    // color: "#4B0082 !important",
    background: "#4B0082 0% 0% no-repeat padding-box",
    "&:hover": {
      color: "#fff",
      background: "#4B0082 0% 0% no-repeat padding-box",
    },
    textTransform: "capitalize",
  },
  label: {
    textTransform: "capitalize",
  },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, disabled, ...other } = props;
  const classes = useStyles(props);

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
      style={{
        backgroundColor: color,
        color: "#FFFFFF",
        textTransform: "capitalize",
      }}
      disabled={disabled}
    >
      {text}
    </MuiButton>
  );
}
