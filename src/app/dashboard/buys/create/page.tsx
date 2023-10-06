"use client";
import React, { useContext, useState, ChangeEvent } from "react";
import { InventoryContext } from "@/context/InventoryContext";
import { useQuery } from "@tanstack/react-query";
import { createInventory } from "@/api/Inventory";
import { InventoryCreate } from "@/interfaces/Inventory";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import SearchBar from "@/components/SearchBar/SearchBar";
import { ProductContext } from "@/context/ProductContext";
import { getAllProductsAPI } from "@/api/Products";
import { ModalContext } from "@/context/ModalContext";

import styles from "./style.module.scss";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Product } from "@/interfaces/Product";

import { ClientContext } from "@/context/ClientContext";
import { getAllPersons } from "@/api/Clients";

const columns: GridColDef[] = [
  {
    field: "name_product",
    headerName: "Nomnre",
    width: 200,
    type: "string",
  },
  {
    field: "measure_unit",
    headerName: "Unidades",
    width: 100,
    type: "string",
  },
  {
    field: "is_active",
    headerName: "Activo",
    width: 180,
    type: "boolean",
  },
];

function CreateBuyInventory() {
  const { setOpen, setId } = useContext(ModalContext);
  const { setProductsBuy, productsBuy } = useContext(InventoryContext);

  const { clients, setClients } = useContext(ClientContext);

  const { data, isLoading } = useQuery(["client"], getAllPersons, {
    onSuccess: (data) => {
      setClients(data);
    },
  });

  const handleAddBuy = () => {
    if (setId) {
      setOpen(true);
      setId("addClient");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.containerTittle}>
          <p className={styles.tittleList}>Registrar Compra</p>
        </div>
        <div className="my-[10px] grid grid-cols-2 gap-4">
          <div className={`${styles.inputConainerTest} mr-8`}>
            <label htmlFor="date_purchase" className={styles.label}>
              Fecha de Compra
            </label>
            <input
              type="date"
              id="date_purchase"
              name="date_purchase"
              // value={selectedUser?.person.id_document}
              // onChange={handleChange}
              required
            />
          </div>
          <div className={`${styles.listBox} ml-8`}>
            <label htmlFor="person_id">Seleccione Proveedor</label>
            <select
              name="person_id"
              id="person_id"
              //  onChange={handleChange}
              //         value={updateProductValues.brand_id}
            >
              <option hidden>Seleccione el Proveedor</option>
              {clients?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} {type.last_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="my-[10px] grid grid-cols-2 gap-11 ">
          <button
            className={`${styles.buttonCreate} mr-8`}
            onClick={() => {
              if (setId) {
                setOpen(true);
                setId("addBuy");
              }
            }}
          >
            Agregar Producto
          </button>
          <button
            className={`${styles.submitButton} ml-8`}
            onClick={() => {
              if (setId) {
                setOpen(true);
                setId("addProduct");
              }
            }}
          >
            Registrar Nuevo Producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBuyInventory;
