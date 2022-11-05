import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    alignItems: "center",
    justifyContent: "center",
    color: "#3C9061",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: (props) => (props.width ? props.width : "310px"),

    height: (props) => (props.height ? props.height : "78px"),
    lineHeight: (props) => props.lineHeight && props.lineHeight,
    background: "#FFFFFF",
    borderRadius: "20px",
    cursor: "pointer !important",
    border: "1px solid #3C9061",
    margin: "30px 10px 0 0px !important",
    fontSize: "1.8rem",
    fontWeight: "500",
    "&:hover": {
      color: "#fff",
      background: "#3C9061 0% 0% no-repeat padding-box",
    },
  },
  label: {
    textTransform: "none",
  },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, width, disabled, ...other } =
    props;
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
        // width: width ? width : "",
      }}
      disabled={disabled}
    >
      {text}
    </MuiButton>
  );
}
