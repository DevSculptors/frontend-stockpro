"use client";
import { ReactNode, useMemo, useState } from "react";
import styles from "./style.module.css";

import SideBar from "@/components/SideBar/SideBar";
import NavBar from "@/components/NavBar/NavBar";

import ModalBase from "@/app/components/Modal/Modal";

import CreateUserDialog from "./users/Dialogs/CreateUser/CreateUserDialog";

import EditUserDialog from "./users/Dialogs/EditUser/EditUserDialog";
import { ClientContext } from "@/context/ClientContext";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";

import { Client } from "@/interfaces/Client";
import { User } from "@/interfaces/User";

interface Props {
  children: ReactNode | ReactNode[];
}

function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clients, setClients] = useState<Client[] | undefined>([]);

  const [selectedUser, setSelectedUser] = useState<User>();
  const [users, setUsers] = useState<User[] | undefined>([]);

  const userContext = useMemo(
    () => ({
      selectedUser,
      setSelectedUser,
      users,
      setUsers,
    }),
    [selectedUser, users]
  );

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
        return <EditUserDialog />;

      default:
        break;
    }
  }

  return (
    <>
       <NavBar />
      <div className={styles.layout}>
        <UserContext.Provider value={userContext}>
          <ClientContext.Provider value={clientContext}>
            <ModalContext.Provider value={modalContext}>
              <ModalBase isOpen={open} id={id}>
                {SelectModal()}
              </ModalBase>
              <SideBar />
              <main className={styles.layout__main}>{children}</main>
            </ModalContext.Provider>
          </ClientContext.Provider>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default DashboardLayout;
