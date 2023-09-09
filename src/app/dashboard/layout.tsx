"use client";
import { ReactNode } from "react";
import SideBar from "@/components/SideBar/SideBar";
import styles from "./style.module.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { PersonProvider } from "@/context/PersonContext";

interface Props {
  children: ReactNode | ReactNode[];
}

function DashboardLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <SidebarProvider>
        <PersonProvider>
          <SideBar />
          <main className={styles.layout__main}>{children}</main>
        </PersonProvider>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
