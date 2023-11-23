import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";


import { FaCircleUser } from "react-icons/fa6";

type Props = {
  color: string;
  title: string;
  dataKey: string;
  number: number | string;
  text: string;
};

const ClientBox = (props: Props) => {
  return (
    <div className={styles.chartBox}>
      <div className={styles.boxInfo}>
        <div className={styles.title}>
          <FaCircleUser size={20} color={props.color} />
          <span>{props.title}</span>
        </div>
        <h3 className={styles.centerText}>{props.number}</h3>
      </div>
      <div className={styles.chartInfo}>
      <div className={styles.chart}>
        <h1>Mejor Cliente:</h1>
        <h3>{props.text}</h3>
      </div>
      </div>
    </div>
  );
};

export default ClientBox;
