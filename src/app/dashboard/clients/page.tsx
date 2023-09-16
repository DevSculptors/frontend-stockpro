"use client";
import { Table } from "@/components/Table";
import styles from "./style.module.css";
import { LuSearch } from "react-icons/lu";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import { ModalContext } from "@/context/ModalContext";
import { ClientContext } from "@/context/ClientContext";
import { getAllPersons } from "@/api/Clients";
import { Client } from "@/interfaces/Client";

import { ToasterDefault} from "@/helpers/useToaster";

function ClientPage() {
  const { setOpen, setId } = useContext(ModalContext);

  const { setSelectedClient, setClients } = useContext(ClientContext);

  const { data, isLoading } = useQuery(["client"], getAllPersons, {
    onSuccess: (data) => {
      setClients(data);
    },
    
  });

  const handleRow = (id: string) => {
    const client = data?.find((client) => client.id === id);

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
        <div className={styles.containerTittle}>
          <p className={styles.tittleList}>Lista Clientes</p>
          <div className={styles.divSearch}>
            <LuSearch className={styles.iconSearch} />
            <input
                type="text"
                placeholder="Buscar cliente"
                className={styles.inputSearch}
            />
          </div>
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
        <Table
            name="client"
            columnNames={[
              "Documento",
              "Tipo Documento",
              "Nombre",
              "Apellido",
              "Celular",
            ]}
        >
          {data?.map((client: Client) => (
              <Table.Row
                  key={client.id}
                  indexRow={client.id}
                  rowData={[
                    client.id_document,
                    client.type_document,
                    client.name,
                    client.last_name,
                    client.phone,
                  ]}
                  handleRow = {() => handleRow(client.id)}
              />
          ))}
        </Table>
      </div>
  );
}
export default ClientPage;