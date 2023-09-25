"use client";
import { ReactNode, useMemo, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./style.module.scss";
import SideBar from "@/components/SideBar/SideBar";

const NavBarData = {
  logoHref: "/dashboard",
  settingsHref: "/dashboard/settings",
  notificationsHref: "/dashboard",
};


interface Props {
  children: ReactNode | ReactNode[];
}

function CashierLayout({ children }: Props) {
  return (
    <div className={styles.main}>
      <NavBar {...NavBarData} />
      {children}
    </div>
  );
}

export default CashierLayout;