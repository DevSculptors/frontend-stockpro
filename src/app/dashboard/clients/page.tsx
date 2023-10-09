"use client";
import styles from "./style.module.scss";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import { ModalContext } from "@/context/ModalContext";
import { ClientContext } from "@/context/ClientContext";
import { getAllPersons } from "@/api/Clients";
import { Client } from "@/interfaces/Client";

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
];

function ClientPage() {
  const { setOpen, setId } = useContext(ModalContext);
  const { setSelectedClient, setClients, clients } = useContext(ClientContext);
  const { data, isLoading } = useQuery(["client"], getAllPersons, {
    onSuccess: (data) => {
      setClients(data);
    },
  });

  const rows =
    clients?.map((client: Client) => ({
      id: client.id,
      id_document: client.id_document,
      type_document: client.type_document,
      name: client.name,
      last_name: client.last_name,
      phone: client.phone,
    })) || [];

  const handleRow = (id: string) => {
    const client = clients?.find((client) => client.id === id);
    if (client) {
      setSelectedClient(client);
    }
    if (setId) {
      setOpen(true);
      setId("editClient");
    }
  };

  return (
    <div className={styles.containerClient}>
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#1E9189" loading={isLoading} size={180} />
        </div>
      ) : (
        <div>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Lista Clientes</p>
            <div>
              <button
                className={styles.buttonCreateClient}
                onClick={() => {
                  if (setId) {
                    setOpen(true);
                    setId("addClient");
                  }
                }}
              >
                Registrar Cliente
              </button>
            </div>
          </div>
          <DataTable
            slug="brands"
            columns={columns}
            rows={rows}
            pagination={10}
            handleRow={(params) => handleRow(params)}
          />
        </div>
      )}
    </div>
  );
}
export default ClientPage;
