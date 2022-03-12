import { Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Chart,
  PieSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

import theme from "../../styles/theme";
import { createStyles, makeStyles } from "@mui/styles";
import { OrdersContext } from "../../contexts/OrdersContext";

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
  const initialChartData = [
    { team: "Platinum", orders: 1 },
    { team: "Diamond", orders: 1 },
    { team: "Gold", orders: 1 },
  ];

  const { orders } = useContext(OrdersContext);
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    let sumPlatinum = 0;
    let sumDiamond = 0;
    let sumGold = 0;

    for (const order of orders) {
      console.log(order.team.name);

      switch (order.team.name) {
        case "Team Platinum":
          sumPlatinum++;
          break;
        case "Team Diamond":
          sumDiamond++;
          break;
        case "Team Gold":
          sumGold++;
          break;
        default:
          break;
      }
    }

    if (sumDiamond && sumPlatinum && sumGold) {
      setChartData([
        { team: `Platinum (${sumPlatinum})`, orders: sumPlatinum },
        { team: `Diamond (${sumDiamond})`, orders: sumDiamond },
        { team: `Gold (${sumGold})`, orders: sumGold },
      ]);
    }
  }, [orders]);

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
