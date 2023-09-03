import Image from "next/image";
import styles from "./login.module.css";

export default function LogoLogin({width=200, height=200}: IProps) {

  return (
    <div className={styles.logo}>
      <Image src="/logo.jpeg"
       alt="logo" width={width} height={height}/>
    </div>
  );
}

interface IProps {
  width?: number;
  height?: number;

}