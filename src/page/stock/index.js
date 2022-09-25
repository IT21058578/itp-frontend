import * as React from "react";
import { makeStyles, ThemeProvider } from "@mui/styles";
import ResponsiveAppBar from "../../components/layout/navbar/navbar";
import { Container } from "@mui/system";
import BookingTab from "./stock";

const drawerWidth = 250;
const useStyles = makeStyles(
  {
    ListPrimary: {
      fontSize: "17px !important",
    },
  },
  { index: 1 }
);
export default function Booking() {
  const classes = useStyles();

  return (
    <>
      <ResponsiveAppBar />
      <br />
      <Container>
        <BookingTab />
      </Container>
    </>
  );
}
