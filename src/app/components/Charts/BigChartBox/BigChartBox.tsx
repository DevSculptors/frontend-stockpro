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
  colors: string[];
  chartData: { name: string }[];
};

const BigChartBox = (props: Props) => {

  const dataKeys = Object.keys(props.chartData[0]).filter((key) => key !== 'name');
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
            {dataKeys.map((key, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={props.colors[index]}
                fill={props.colors[index]}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
