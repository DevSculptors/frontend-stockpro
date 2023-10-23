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
import { useRouter } from "next/navigation";
import { BiSolidDetail } from "react-icons/bi";

function Sale() {
  const { setSelectedSale, setSales, sales } = useContext(SaleContext);
  const router = useRouter();

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
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
          <div className="flex flex-row items-center justify-center">
            <button
                type="button"
                onClick={() => handleRow(params.row.id)}
                className={styles.submitButton}
            >
              <BiSolidDetail /> Detalles
            </button>
          </div>
      ),
    },
  ];


  const handleRow = (id: string) => {
    const findSale = sales?.find((sale) => sale.id === id);
    if (sales){
      setSelectedSale(findSale);
    }
    router.push(`/dashboard/sales/${id}`);
  };


  const { data, isLoading } = useQuery(["sales"], getAllSalesAPI, {
    onSuccess: (data) => {
      setSales(data);
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

  return (
      <div className={styles.container}>
        {isLoading ? (
            <div className={styles.loading}>
              {/*<GridLoader color="#1E9189" loading={isLoading} size={180} />*/}
            </div>
        ) : (
            <div>
              <div className={styles.containerTittle}>
                <p className={styles.tittleList}>Lista de Ventas</p>
              </div>
              <DataTable
                  slug="sale"
                  pagination={10}
                  columns={columns}
                  rows={rows}
                  handleRow={() => {}}
              />
            </div>
        )}
      </div>
  )
}

export default Sale