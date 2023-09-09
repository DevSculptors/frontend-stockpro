'use client'
import {Table} from "@/components/Table";
import styles from "./style.module.css";
import { LuSearch } from "react-icons/lu";
import React, { useState } from 'react';
import AddUser from "./AddUsers/addUser"
import EditUser from "./editUser/editUser";

export function Users() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModalEdit = () => {

    };
  return (
      <div className={styles.containerUser}>
      <div className={styles.containerTittle}>
        <p className={styles.tittleList} >
            Lista Usuarios
        </p>
          <div className={styles.divSearch}>
              <LuSearch className={styles.iconSearch} />
              <input
                  type="text"
                  placeholder="Buscar usuario"
                  className={styles.inputSearch}
              />
          </div>
          <AddUser/>
      </div>
      <Table
          name="users"
          columnNames = {['#','Documento','Nombre','Username','Celular','Estado']}
      >
          <Table.Row
              indexRow="1"
              rowData = {['1','12345','Sebastian','sebas10','345678','Activo']}
              functionEdit={openModalEdit}
          />
          <Table.Row
              indexRow="2"
              rowData = {['2','12345','Sebastian','sebas10','345678','Activo']}
              functionEdit={EditUser}
          />
      </Table>
      </div>
  );
}
