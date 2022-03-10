import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar";
import ProductsTable from "./components/ProductsTable";

const Home: NextPage = () => {
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
    </div>
  );
};

export default Home;
