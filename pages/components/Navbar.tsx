import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";

import logo from "../../assets/logo.svg";
import styles from "../../styles/Home.module.css";
import theme from "../../styles/theme";
import { Button } from "@mui/material";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      font: theme.typography.fontFamily,
      color: theme.palette.grey[800],
      fontWeight: 500,
      fontSize: "36px",
    },
    titleSpan: {
      color: theme.palette.grey[700],
      fontWeight: 300,
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      width: "173px",
      height: "48px",
      boxSizing: "border-box",
      textTransform: "capitalize",
      fontWeight: 300,
      letterSpacing: ".06rem"
    },
  })
);

function Navbar() {
  const classes = useStyles();

  return (
    <nav className={styles.nav}>
      <div>
        <Image src={logo} alt="wa-project logo" />
      </div>
      <div>
        <h1 className={classes.title}>
          WarriorSales<span className={classes.titleSpan}>API</span>
        </h1>
      </div>
      <div>
        <Button className={classes.button} variant="contained">authenticate</Button>
      </div>
    </nav>
  );
}

export default Navbar;
