import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { BsFileBarGraph } from "react-icons/bs";

type Props = {
  color: string;
  title: string;
  dataKey: string;
  number: number | string;
  chartData: object[];
};

const ChartBox = (props: Props) => {
  return (
    <div className={styles.chartBox}>
      <div className={styles.boxInfo}>
        <div className={styles.title}>
          <BsFileBarGraph size={20} color={props.color} />
          <span>{props.title}</span>
        </div>

        <h3 className={styles.centerText}>{props.number}</h3>
      </div>
      <div className={styles.chartInfo}>
        <div className={styles.chart}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData} margin={{ bottom: 20 }}>
              <Tooltip
                contentStyle={{
                  background: "transparent",
                  border: "none",
                  marginTop: "-10px",
                }}
                labelStyle={{ display: "none" }}
                position={{ y: -10 }}
              />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "black" }} />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
