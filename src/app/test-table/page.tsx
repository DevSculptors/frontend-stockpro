"use client";
import { Table } from "@/components/Table";
import styles from "./style.module.scss";
import { LuSearch } from "react-icons/lu";
import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";

import { useQuery } from "@tanstack/react-query";
import { ModalContext } from "@/context/ModalContext";
import { ClientContext } from "@/context/ClientContext";
import { getAllPersons } from "@/api/Clients";
import { Client } from "@/interfaces/Client";

import { GridLoader } from "react-spinners";


function ClientPage() {
  const { setOpen, setId } = useContext(ModalContext);
  const { setSelectedClient, setClients, clients } = useContext(ClientContext);
  const { data, isLoading } = useQuery(["client"], getAllPersons, {
    onSuccess: (data) => {
      setClients(data);
    },
  });

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

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = clients?.slice(itemOffset, endOffset);

  const size = data ? data.length : clients ? clients.length : 0;

  const pageCount = Math.ceil(size / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % size;

    setItemOffset(newOffset);
  };

  return (
    <div className={styles.containerClient}>
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#1E9189" 

          loading={isLoading}
          size={180} />
        </div>
      ) : (
        <div>
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

          <div>
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
              {currentItems?.map((client: Client) => (
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
                  handleRow={() => handleRow(client.id)}
                />
              ))}
            </Table>
            <ReactPaginate
              breakLabel="..."
              nextLabel="Siguiente >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="< Anterior"
              renderOnZeroPageCount={null}
              containerClassName={styles.pagination}
              pageLinkClassName={styles.page_num}
              previousClassName={styles.page_num}
              nextClassName={styles.page_num}
              activeClassName={styles.active}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default ClientPage;
