import Image from "next/image";
import styles from "./login.module.scss";

export default function LogoLogin({ width = 800, height = 800 }: IProps) {
  return (
    <div className={styles.logo}>
      <Image
        src="/logo.jpeg"
        alt="logo"
        style={{ width: "auto", height: "auto" }}
        width={width}
        height={height}
        priority={true}
      />
    </div>
  );
}

interface IProps {
  width?: number;
  height?: number;
}
