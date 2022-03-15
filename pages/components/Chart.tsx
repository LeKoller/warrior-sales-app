import { Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Chart,
  PieSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

import styles from "../../styles/Chart.module.css";
import { IOrder } from "../../types";

function PieChart(props: {orders: IOrder[]}) {
  const { orders } = props;
  
  const initialChartData = [
    { team: "Platinum", orders: 1 },
    { team: "Diamond", orders: 0 },
    { team: "Gold", orders: 0 },
  ];

  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    let sumPlatinum = 0;
    let sumDiamond = 0;
    let sumGold = 0;

    for (const order of orders) {
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

    if (sumDiamond || sumPlatinum || sumGold) {
      setChartData([
        { team: `Platinum (${sumPlatinum})`, orders: sumPlatinum },
        { team: `Diamond (${sumDiamond})`, orders: sumDiamond },
        { team: `Gold (${sumGold})`, orders: sumGold },
      ]);
    }
  }, [orders]);

  return (
    <Paper className={styles.paper}>
      <h1 className={styles.title}>Encomendas por equipe</h1>
      <div className={styles.container}>
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
