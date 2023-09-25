import Link  from 'next/link';
import Image from 'next/image';
import styles from "./style.module.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

import {BsFileBarGraph} from 'react-icons/bs';

type Props = {
  color: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
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
        <h1>{props.number}</h1>
        <Link href="/test" style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className={styles.chartInfo}>
        <div className={styles.chart}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
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
        <div className={styles.texts}>
          <span
            className={styles.percentage}
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className={styles.duration}>Este mes</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
