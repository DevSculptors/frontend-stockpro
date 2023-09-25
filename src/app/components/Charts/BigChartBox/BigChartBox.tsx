import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./style.module.scss";

type Props = {
  title: string;
  dataKey: string;
  color1: string;
  color2: string;
  color3: string;
  chartData: { name: string }[];
};

const BigChartBox = (props:Props) => {
  return (
    <div className={styles.bigChartBox}>
      <h1>{props.title}</h1>
      <div className={styles.chart}>
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={props.chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="electronic"
              stackId="1"
              stroke={props.color1}
              fill={props.color1}
            />
            <Area
              type="monotone"
              dataKey="clothes"
              stackId="1"
              stroke={props.color2}
              fill={props.color2}
            />
            <Area
              type="monotone"
              dataKey="books"
              stackId="1"
              stroke={props.color3}
              fill={props.color3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;