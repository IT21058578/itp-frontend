import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    body1: {
      fontWeight: 300,
      fontFamily: "Poppins",
    },
  },
  palette: {
    primary: {
      main: "#0078D8",
      secondary: "#2B88D8",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF9149",
    },
  },
});

export default theme;
