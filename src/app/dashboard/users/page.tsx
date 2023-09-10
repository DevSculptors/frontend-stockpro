"use client";
import { Table } from "@/components/Table";
import styles from "./style.module.css";
import { LuSearch } from "react-icons/lu";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { ModalContext } from "@/context/ModalContext";

import { UserContext } from "@/context/UserContext";

import { getAllUsersAPI } from "@/api/Users";

import { User } from "@/interfaces/User";

function UserPage() {
  const { setOpen, setId } = useContext(ModalContext);

  const { setSelectedUser, setUsers } = useContext(UserContext);

  const { data, isLoading } = useQuery(["users"], getAllUsersAPI, {
    onSuccess: (data) => {
      setUsers(data);
    },
  });

  const handleRow = (id: string) => {
    const user = data?.find((user) => user.id === id);

    if (user) {
      setSelectedUser(user);
    }

    if (setId) {
      setOpen(true);
      setId("editUser");
    }
  };

  return (
    <div className={styles.containerUser}>
      <div className={styles.containerTittle}>
        <p className={styles.tittleList}>Lista Usuarios</p>
        <div className={styles.divSearch}>
          <LuSearch className={styles.iconSearch} />
          <input
            type="text"
            placeholder="Buscar usuario"
            className={styles.inputSearch}
          />
        </div>
        <div>
          <button
            className={styles.buttonCreateUser}
            onClick={() => {
              if (setId) {
                setOpen(true);
                setId("addUser");
              }
            }}
          >
            Registrar Usuario
          </button>
        </div>
      </div>
      <Table
        name="users"
        columnNames={[
          "Documento",
          "Tipo Documento",
          "Nombre",
          "Apellido",
          "Email",
          "Celular",
          "Estado",
        ]}
      >
        {data?.map((user: User) => (
          <Table.Row
            key={user.id}
            indexRow={user.id}
            rowData={[
              user.person.id_document,
              user.person.type_document,
              user.person.name,
              user.person.last_name,
              user.email,
              user.person.phone,
              String(user.isActive),
            ]}
            handleRow={() => handleRow(user.id)}
          />
        ))}
      </Table>
    </div>
  );
}
export default UserPage;
