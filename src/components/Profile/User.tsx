"use client";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

import styles from "./styles.module.scss";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  activities?: { time: string; text: string }[];
  onClick?: () => void;
};

function UserSingle(props: Props) {
  let [tdKeyCounter, setTdKeyCounter] = useState(0);

  return (
    <div className={styles.single}>
      <div className={styles.view}>
        <div className={styles.info}>
          <div className={styles.topInfo}>
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            {/* <button className={styles.submitButton} onClick={props.onClick}>
              Actualizar
            </button> */}
          </div>
          <div className={styles.details}>
            {Object.entries(props.info).map((item, index) => (
              <div className={styles.item} key={`${tdKeyCounter++}- ${index}`}>
                <span className={styles.itemTitle}>{item[0]}</span>
                <span className={styles.itemValue}>{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
      </div>
      <div className={styles.activities}>
        <h2>Recomendaciones</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity, index) => (
              <li key={index}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserSingle;
