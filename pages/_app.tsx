import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "../styles/theme";
import { CartContextProvider } from "../contexts/CartContext";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import { OrdersContextProvider } from "../contexts/OrdersContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProductsContextProvider>
        <OrdersContextProvider>
          <CartContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CartContextProvider>
        </OrdersContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
