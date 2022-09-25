import * as React from "react";
import { makeStyles, ThemeProvider } from "@mui/styles";
import ResponsiveAppBar from "../components/layout/navbar/navbar";

const drawerWidth = 250;
const useStyles = makeStyles(
  {
    ListPrimary: {
      fontSize: "17px !important",
    },
  },
  { index: 1 }
);
export default function Home() {
  const classes = useStyles();

  return (
    <>
      <ResponsiveAppBar />
    </>
  );
}
