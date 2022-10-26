import React from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
const useStyles = makeStyles((prop) =>
  createStyles({
    Chip: {
      // color: "#red !important",
      // backgroundColor: (props) =>
      //   props.background ? props.background : "blue",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "94px",
      height: "28px",
      fontWeight: "600",
    },
  })
);
export default function Chips({ data, prop, background }) {
  const classes = useStyles(prop);
  console.log(background, "backgroundColor");
  return (
    <div style={{ backgroundColor: background }} className={classes.Chip}>
      {data}
    </div>
  );
}
