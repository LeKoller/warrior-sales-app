import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import logo from "../../assets/logo.svg";
import styles from "../../styles/Navbar.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

function Navbar() {
  const { setToken, token } = useContext(AuthContext);
  const authURL = "https://localhost:7098/api/home/auth";

  const simulateAuthentication = async () => {
    const response = await axios({
      method: "post",
      url: authURL,
    });

    setToken(response.data);
  };

  return (
    <nav className={styles.nav}>
      <div>
        <Image src={logo} alt="wa-project logo" />
      </div>
      <div>
        <h1 className={styles.title}>
          WarriorSales<span className={styles.titleSpan}>API</span>
        </h1>
      </div>
      <div className={styles.auth}>
        <CheckCircleOutlineIcon
          fontSize="large"
          color="primary"
          className={token ? styles.icon : styles.iconInvisible}
        />
        <Button
          className={styles.button}
          variant="contained"
          onClick={simulateAuthentication}
        >
          autenticar
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
