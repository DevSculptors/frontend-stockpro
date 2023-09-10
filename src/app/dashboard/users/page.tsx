"use client";
import { Table } from "@/components/Table";
import styles from "./style.module.css";
import { LuSearch } from "react-icons/lu";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { ModalContext } from "@/context/ModalContext";

import { getAllUsersAPI } from "@/api/Users";

import { User } from "@/interfaces/User";


  const EditUser = () => {
      if (setId) {
      setOpen(true);
      setId("editUser");
      console.log(id, "id modal", open, "open modal");}
  };

function User() {
  const { open, setOpen, id, setId } = useContext(ModalContext);

  const { data, isLoading, error } = useQuery(["users"], getAllUsersAPI);


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
          "#",
          "Documento",
          "Nombre",
          "Username",
          "Celular",
          "Estado",
        ]}
      >

        {data?.map((user: User) => (
          <Table.Row
          key={user.id}
            indexRow={user.id}
            rowData={[
              user.id,
              user.person.id_document,
              user.person.name,
              user.username,
              user.person.phone,
              String(user.isActive),
            ]}
              functionEdit={EditUser}
          />
        ))}

      </Table>
    </div>
  );
}
export default User;
