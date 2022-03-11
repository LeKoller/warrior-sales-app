import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar";
import ProductsTable from "./components/ProductsTable";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const Home: NextPage = () => {
  const [isConnectedWithBackend, setIsConnectedWithBackend] = useState(true);
  const [isDatabaseEmpty, setIsDatabaseEmpty] = useState(false);
  const [seedingSucceeded, setSeedingSucceeded] = useState(false);

  const homeURL = "https://localhost:7098/api/home";

  const requestHome = async () => {
    try {
      const response = await axios({
        method: "get",
        url: homeURL,
      });

      if (response.status === 204) {
        setIsDatabaseEmpty(true);
        const seedRes = await axios({
          method: "post",
          url: homeURL + "/seed",
        });

        if (seedRes.status) {
          setSeedingSucceeded(true);
        }
      }
    } catch {
      setIsConnectedWithBackend(false);
    }
  };

  const handleCloseDatabaseEmptyWarning = () => {
    setIsDatabaseEmpty(false);
  };

  const handleCloseSeedingSucceededWarning = () => {
    setSeedingSucceeded(false);
  };

  useEffect(() => {
    requestHome();
  }, []);

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
        <ProductsTable />
      </main>

      <Snackbar
        open={!isConnectedWithBackend}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
        >
          <AlertTitle>Não foi possível se comunicar com o servidor</AlertTitle>
          Pode ser que ele não esteja ligado em sua máquina ou algo tenha dado errado.
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
