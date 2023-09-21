"use client";
import BarChartBox from "../components/Charts/BarChartBox/BarChartBox";
import BigChartBox from "../components/Charts/BigChartBox/BigChartBox";
import ChartBox from "../components/Charts/ChartBox/ChartBox";
import PieChartBox from "../components/Charts/PieChartBox/PieChartBox";
import TopBox from "../components/Charts/TopBox/TopBox";

import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "@/api/dataTest";

import styles from "./style.module.scss";

function Dashboard() {
  return (
    <div className={styles.home}>
      <div className={styles.box2}>
        <TopBox />
      </div>
      <div className={styles.box}>
      <ChartBox {...chartBoxUser} />
      </div>
      <div className={styles.box}>
      <ChartBox {...chartBoxProduct} />
      </div>
      <div className={styles.box4}>
        <PieChartBox />
      </div>
      <div className={styles.box}>
      <ChartBox {...chartBoxRevenue} />
      </div>
      <div className={styles.box}>
      <ChartBox {...chartBoxConversion} />
      </div>
      <div className={styles.box7}>
        <BigChartBox />
      </div>
      <div className={styles.box}>
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className={styles.box}>
        <BarChartBox {...barChartBoxRevenue} />
      </div>
  </div>
  );
}

export default Dashboard;
