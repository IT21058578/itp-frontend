import React from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import { ReactComponent as Svg } from "../assect/svg/construction.svg";
// import { Link } from "react-router-dom";
const useStyles = makeStyles(
  () =>
    createStyles({
      MainDiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        flexDirection: "column",
        paddingTop: "80px",
      },
      Angor: { color: "#3C9061", textDecoration: "underline" },
      GoBack: {
        color: "#3C9061",
        fontFamily: "Poppins",
        fontSize: "30px",
        fontWeight: 700,
      },
    }),
  { withTheme: true }
);

export default function CultivationTracking() {
  const classes = useStyles();

  return (
    <div className={classes.MainDiv}>
      <div className={classes.GoBack}>Our Site is Under Construction</div>
      <Svg />
    </div>
  );
}
