import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "../styles/theme";
import { CartContextProvider } from "../contexts/CartContext";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ProductsContextProvider } from "../contexts/ProductsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
