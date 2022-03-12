import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useCallback, useContext } from "react";
import { Snackbar, Alert, AlertTitle, Button } from "@mui/material";

import styles from "../styles/Home.module.css";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar";
import ProductsTable from "./components/ProductsTable";
import { ProductsContext } from "../contexts/ProductsContext";
import OrderBox from "./components/OrderBox";
import { OrdersContext } from "../contexts/OrdersContext";
import OrdersTable from "./components/OrdersTable";

const Home: NextPage = () => {
  const { item, setProducts } = useContext(ProductsContext);
  const { setOrders, setPagination } = useContext(OrdersContext);

  const [isConnectedWithBackend, setIsConnectedWithBackend] = useState(true);
  const [isDatabaseEmpty, setIsDatabaseEmpty] = useState(false);
  const [seedingSucceeded, setSeedingSucceeded] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const homeURL = "https://localhost:7098/api/home";
  const productsURL = "https://localhost:7098/api/products";
  const ordersURL = "https://localhost:7098/api/orders";

  const loadProducts = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: productsURL,
      });

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch {
      setIsConnectedWithBackend(false);
    }
  }, [setProducts, setIsConnectedWithBackend]);

  const loadOrders = useCallback(
    async (page: number = 1, results: number = 20) => {
      const url = `${ordersURL}?page=${page}&results=${results}`;

      try {
        const response = await axios({
          method: "get",
          url,
        });

        if (response.status === 200) {
          setOrders(response.data.orders);
          setPagination({
            pages: response.data.pages,
            currentPage: response.data.currentPage - 1,
            total: response.data.total,
          });
        }
      } catch {
        setIsConnectedWithBackend(false);
      }
    },
    [setOrders, setPagination, setIsConnectedWithBackend]
  );

  const seed = useCallback(async () => {
    const response = await axios({
      method: "post",
      url: homeURL + "/seed",
    });

    if (response.status === 200) {
      setSeedingSucceeded(true);
      loadProducts();
      loadOrders();
    }
  }, [loadProducts, loadOrders]);

  const requestHome = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: homeURL,
      });

      if (response.status === 204) {
        setIsDatabaseEmpty(true);
        seed();
      } else if (response.status === 200) {
        loadProducts();
        loadOrders();
      }
    } catch {
      setIsConnectedWithBackend(false);
    }
  }, [seed, loadProducts, loadOrders]);

  const handleCloseDatabaseEmptyWarning = () => {
    setIsDatabaseEmpty(false);
  };

  const handleCloseSeedingSucceededWarning = () => {
    setSeedingSucceeded(false);
  };

  const handleShowOrders = () => {
    loadOrders();
    setShowOrders(true);
  };

  useEffect(() => {
    requestHome();
  }, [requestHome]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Warrior Sales</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        <Chart />
        <div className={styles.productsSection}>
          {showOrders ? (
            <Button
              className={styles.switchButton}
              onClick={() => setShowOrders(false)}
            >
              ver Produtos
            </Button>
          ) : (
            <Button className={styles.switchButton} onClick={handleShowOrders}>
              ver Encomendas
            </Button>
          )}
          {showOrders ? (
            <OrdersTable loadOrders={loadOrders} />
          ) : (
            <ProductsTable />
          )}
          {item.id !== 0 && <OrderBox item={item} />}
        </div>
      </main>

      <Snackbar
        open={!isConnectedWithBackend}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled">
          <AlertTitle>Não foi possível se comunicar com o servidor</AlertTitle>
          Pode ser que ele não esteja ligado em sua máquina ou algo tenha dado
          errado.
        </Alert>
      </Snackbar>

      <Snackbar
        open={isDatabaseEmpty}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseDatabaseEmptyWarning}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={handleCloseDatabaseEmptyWarning}
        >
          <AlertTitle>O banco de dados está vazio</AlertTitle>
          Sem problemas, estamos cuidado disso.
        </Alert>
      </Snackbar>

      <Snackbar
        open={seedingSucceeded}
        onClose={handleCloseSeedingSucceededWarning}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleCloseSeedingSucceededWarning}
        >
          <AlertTitle>Base de dados populada!</AlertTitle>
          Não se esqueça de autenticar para efetuar as encomendas.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
