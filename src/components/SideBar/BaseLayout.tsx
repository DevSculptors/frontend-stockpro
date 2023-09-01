import { ReactNode } from "react";
import SideBar from "./SideBar";

import styles from "./style.module.css";
interface Props {
  children: ReactNode | ReactNode[];
}

function BaseLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <SideBar />
      <main
      className={styles.layout__main}
      >{children}</main>
    </div>
  );
}

export default BaseLayout;
