import React from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import { ReactComponent as Svg } from "../assect/svg/404.svg";
import { Link } from "react-router-dom";
const useStyles = makeStyles(
  () =>
    createStyles({
      MainDiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        flexDirection: "column",
      },
      Angor: { color: "#3C9061", textDecoration: "underline" },
      GoBack: {
        color: "#000000",
        fontFamily: "Poppins",
        fontSize: "30px",
        fontWeight: 400,
      },
    }),
  { withTheme: true }
);

export default function CultivationTracking() {
  const classes = useStyles();

  return (
    <div className={classes.MainDiv}>
      <Svg />
      <div className={classes.GoBack}>
        Go back to home?{" "}
        <Link to="/" className={classes.Angor}>
          Home
        </Link>
      </div>
    </div>
  );
}
