import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styles from "./style.module.scss";

type Props = {
  tittle: string;
  chartData: {
    name: string;
    value: number;
    color: string;
  }[];
};
const PieChartBox = (props:Props) => {

  return (
    <div className={styles.pieChartBox}>
      <h1>{props.tittle}</h1>
      <div className={styles.chart}>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={props.chartData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {props.chartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.options}>
        {props.chartData.map((item) => (
          <div className={styles.option} key={item.name}>
            <div className={styles.title}>
              <div className={styles.dot} style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
