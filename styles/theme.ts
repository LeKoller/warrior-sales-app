import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    common: {
      black: "#19192B",
      white: "#ffffff",
    },
    primary: {
      main: "#1254BF",
      light: "#628FD9",
      dark: "#0288D1",
      contrastText: "#212121",
    },
    secondary: {
      main: "#607D8B", // omitting light and dark will calculate from main
      contrastText: "#757575",
    },
    grey: {
      "500": "#bcbcbc",
      "700": "#79797a",
      "800": "#59595a",
    },
    info: {
      main: "#1bb2f1",
    },
    success: {
      main: "#00d589",
    },
    error: {
      main: "#832838",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;
