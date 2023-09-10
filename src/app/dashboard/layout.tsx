"use client";
import { ReactNode, useMemo, useState } from "react";
import styles from "./style.module.css";

import SideBar from "@/components/SideBar/SideBar";
import NavBar from "@/components/NavBar/NavBar";

import CreateUserDialog from "./users/Dialogs/CreateUser/CreateUser";

import ModalBase from "@/app/components/Modal/Modal";
import { ClientContext } from "@/context/ClientContext";
import { ModalContext } from "@/context/ModalContext";

import { Client } from "@/interfaces/Client";

interface Props {
  children: ReactNode | ReactNode[];
}

function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clients, setClients] = useState<Client[] | undefined>([]);

  const clientContext = useMemo(
    () => ({
      selectedClient,
      setSelectedClient,
      clients,
      setClients,
    }),
    [selectedClient, clients]
  );

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
      case "editUser":
        return <CreateUserDialog />;
      default:
        break;
    }
  }

  return (
    <>
      <NavBar />
      <div className={styles.layout}>
        <ClientContext.Provider value={clientContext}>
          <ModalContext.Provider value={modalContext}>
            <ModalBase isOpen={open} id={id}>
              {SelectModal()}
            </ModalBase>
            <SideBar />
            <main className={styles.layout__main}>{children}</main>
          </ModalContext.Provider>
        </ClientContext.Provider>
      </div>
    </>
  );
}

export default DashboardLayout;
