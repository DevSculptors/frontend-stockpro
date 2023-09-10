"use client";
import SideBar from "@/components/SideBar/SideBar";
import styles from "./style.module.css";
import NavBar from "@/components/NavBar/NavBar";
import { SidebarProvider } from "@/context/SidebarContext";
import { PersonProvider } from "@/context/PersonContext";
import { ModalContext } from "@/context/ModalContext";
import ModalBase from "@/app/components/Modal/Modal";
import CreateUserDialog from "./users/Dialogs/CreateUserDialog";
import { ReactNode, useMemo, useState } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  

  const modalContext = useMemo(
    () => ({
      open,
      setOpen,
      id,
      setId,
    }),
    [open, id]
  );

  function SelectModal() {
    switch (id) {
      case "addUser":
        return <CreateUserDialog />;
      default:
        break;
    }
  }

  return (
    <>
      <NavBar />
      <div className={styles.layout}>
        <SidebarProvider>
          <PersonProvider>
            <ModalContext.Provider value={modalContext}>
              <ModalBase isOpen={open} id={id}>
                {SelectModal()}
              </ModalBase>
              <SideBar />
              <main className={styles.layout__main}>{children}</main>
            </ModalContext.Provider>
          </PersonProvider>
        </SidebarProvider>
      </div>
    </>
  );
}

export default DashboardLayout;
