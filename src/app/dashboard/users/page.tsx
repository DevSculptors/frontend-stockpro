"use client";
import styles from "./style.module.scss";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { ModalContext } from "@/context/ModalContext";

import { UserContext } from "@/context/UserContext";

import { getAllUsersAPI } from "@/api/Users";

import { User } from "@/interfaces/User";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id_document",
    headerName: "Documento",
    width: 150,
    type: "string",
  },
  {
    field: "type_document",
    headerName: "T.Doc",
    width: 80,
    type: "string",
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 200,
    type: "string",
  },
  {
    field: "last_name",
    headerName: "Apellido",
    width: 200,
    type: "string",
  },
  {
    field: "phone",
    headerName: "Celular",
    width: 180,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    type: "string",
  },
  {
    field: "role",
    headerName: "Rol",
    width: 150,
    type: "string",
  },
  {
    field: "isActive",
    headerName: "Estado",
    width: 80,
    type: "boolean",
  },

];

function UserPage() {
  const { setOpen, setId } = useContext(ModalContext);

  const { setSelectedUser, setUsers, users } = useContext(UserContext);

  const { data, isLoading } = useQuery(["users"], getAllUsersAPI, {
    onSuccess: (data) => {
      setUsers(data);
    },
  });
  
  const rows =
  users?.map((user: User) => ({
    id: user.id,
    id_document: user.person.id_document,
    type_document: user.person.type_document,
    name: user.person.name,
    last_name: user.person.last_name,
    phone: user.person.phone,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  })) || [];

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
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#26A69A" size={150} />
        </div>
      ) : (
        <div>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Lista Usuarios</p>
          
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
          <DataTable
            slug="users"
            columns={columns}
            rows={rows}
            pagination={8}
            handleRow={(params) => handleRow(params)}
          />
        </div>
      )}
    </div>
  );
}
export default UserPage;
