"use client"
import React, { useState, useContext } from "react";
import { SaleContext } from "@/context/SaleContext";
import { useQuery } from "@tanstack/react-query";
import { getAllSalesAPI } from "@/api/Sale";
import styles from "./styles.module.scss";
import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { getUnitLabel, formatPrice, formatDate} from "@/helpers/Utils";
import { Sale } from "@/interfaces/Sale";


const columns: GridColDef[] = [
  {
    field: "date_sale",
    headerName: "Fecha",
    width: 200,
    type: "string",
  },
  {
    field: "user",
    headerName: "Usuario",
    width: 200,
    type: "string",
  },
  {
    field: "price_sale",
    headerName: "Precio Venta",
    width: 180,
    type: "string",
  },
  {
    field: "num_product",
    headerName: "# Productos",
    width: 150,
    type: "number",
  },
];
const handleButtonClick = () => {
  //Ver detalle compra
};

function Sale() {
  const { setSelectedSale, setSales, sales } = useContext(SaleContext);

  const { data, isLoading } = useQuery(["sales"], getAllSalesAPI, {
    onSuccess: (data) => {
      setSales(data);
      console.log(data[0])
    },
  });

  const rows =
      sales?.map((sale: Sale) => ({
        id: sale.id,
        date_sale: formatDate(sale.date_sale),
        user: sale.user.username,
        price_sale: formatPrice(sale.price_sale),
        num_product: sale.oders.length || 0,
      })) || [];

  const handleRow = (row: any) => {
    console.log(row);
  };

  return (
      <div className={styles.container}>
        {isLoading ? (
            <div className={styles.loading}>
              <GridLoader color="#1E9189" loading={isLoading} size={180} />
            </div>
        ) : (
            <div>
              <div className={styles.containerTittle}>
                <p className={styles.tittleList}>Lista de Ventas</p>
                <div>
                  <button
                      className={styles.buttonCreate}
                  >
                    Agregar
                  </button>
                </div>
              </div>
              <DataTable
                  slug="sale"
                  pagination={10}
                  columns={columns}
                  rows={rows}
                  handleRow={(row) => handleRow(row)}
              />
            </div>
        )}
      </div>
  )
}

export default Sale