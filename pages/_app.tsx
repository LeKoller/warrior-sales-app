import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "../styles/theme";
import { CartContextProvider } from "../contexts/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CartContextProvider>
  );
}

export default MyApp;
