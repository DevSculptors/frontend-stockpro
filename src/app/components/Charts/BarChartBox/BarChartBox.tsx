'use client'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import styles from "./style.module.scss";

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: { name: string }[];
};

const BarChartBox = (props: Props) => {
  return (
    <div className={styles.barChartBox}>
      <h1>{props.title}</h1>
      <div className={styles.chart}>
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{fill:"none"}}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'black' }} tickLine={false} /> 
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;