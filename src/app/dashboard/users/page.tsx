"use client";
import { Table } from "@/components/Table";
import styles from "./style.module.css";
import { LuSearch } from "react-icons/lu";
import React, { useState, useContext } from "react";
import EditUser from "./editUser/editUser";

import { ModalContext } from "@/context/ModalContext";

function User() {

  const { open, setOpen, id, setId } = useContext(ModalContext);

  const openModalEdit = () => {};

  const EditUser = () => {};

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

                // console.log(id, "id modal", open, "open modal");
              }
            }}
          >
            Registrar Cliente
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
        <Table.Row
          indexRow="1"
          rowData={["1", "12345", "Sebastian", "sebas10", "345678", "Activo"]}
          functionEdit={() => {
            if (setId) {
              setOpen(true);
              setId("editUser");
              console.log(id, "id modal", open, "open modal");
            }
          }}
        />
        <Table.Row
          indexRow="2"
          rowData={["2", "12345", "Sebastian", "sebas10", "345678", "Activo"]}
          functionEdit={EditUser}
        />
      </Table>
    </div>
  );
}
export default User;
