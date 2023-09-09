'use client'
import { ReactNode } from "react";
import SideBar from "@/components/SideBar/SideBar";
import styles from "./style.module.css";
import NavBar from "@/components/NavBar/NavBar";
import { SidebarProvider } from "@/context/SidebarContext";



interface Props {
  children: ReactNode | ReactNode[];
}

function DashboardLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <SidebarProvider>
        <SideBar />
        <main className={styles.layout__main}>
            <NavBar />
            {children}
        </main>

      </SidebarProvider>


    </div>
  );
}

export default DashboardLayout;
