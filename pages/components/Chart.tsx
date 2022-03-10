import { Paper } from "@mui/material";
import React from "react";
import {
  Chart,
  PieSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

import theme from "../../styles/theme";
import { createStyles, makeStyles } from "@mui/styles";

const chartData = [
  { team: "Platinum", orders: 1 },
  { team: "Diamond", orders: 1 },
  { team: "Gold", orders: 1 },
];

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "0 16px",
    },
    title: {
      font: theme.typography.fontFamily,
      color: theme.palette.grey[800],
      fontWeight: 400,
      fontSize: "24px",
      marginLeft: "16px",
    },
  })
);

function PieChart() {
  const classes = useStyles();

  return (
    <Paper style={{ width: "40%" }}>
      <h1 className={classes.title}>Encomendas por equipe</h1>
      <div className={classes.container}>
        <Chart data={chartData}>
          <PieSeries valueField="orders" argumentField="team" />
          <Legend />
          <Animation />
        </Chart>
      </div>
    </Paper>
  );
}

export default PieChart;
