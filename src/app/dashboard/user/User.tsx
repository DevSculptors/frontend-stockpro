'use client'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./styles.module.scss";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
};

function UserSingle(props: Props) {
  
  return (
    <div className={styles.single}>
      <div className={styles.view}>
        <div className={styles.info}>
          <div className={styles.topInfo}>
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            <button className={styles.submitButton}>Actualizar</button>
          </div>
          <div className={styles.details}>
            {Object.entries(props.info).map((item) => (
              <div className={styles.item} key={item[0]}>
                <span className={styles.itemTitle}>{item[0]}</span>
                <span className={styles.itemValue}>{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line key={dataKey.name}
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSingle;
