"use client";
import { Inventory } from "@/interfaces/Inventory";
import { getAllInventory } from "@/api/Inventory";
import {  useQuery } from "@tanstack/react-query";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { InventoryContext } from "@/context/InventoryContext";

import { formatDate, formatPrice } from "@/helpers/Utils";
import { useRouter } from "next/navigation";

import { BiSolidDetail } from "react-icons/bi";

import styles from "./style.module.scss";
function BuyPage() {
  const router = useRouter();

  const { setSelectedInventory, setInventory, inventory } =
    useContext(InventoryContext);

  const { isLoading } = useQuery(["inventory"], getAllInventory, {
    onSuccess: (data) => {
      setInventory(data);
    },
  });

  const columns: GridColDef[] = [
    {
      field: "date_purchase",
      headerName: "Fecha Compra",
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
      field: "email",
      headerName: "email",
      width: 200,
      type: "string",
    },
    {
      field: "provider",
      headerName: "Proveedor",
      width: 200,
      type: "string",
    },
    {
      field: "num_product",
      headerName: "# Productos",
      width: 150,
      type: "number",
    },
    {
      field: "total_price",
      headerName: "Total Compra",
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
    const findInventory = inventory?.find((inventory) => inventory.id === id);
    if (inventory){
      setSelectedInventory(findInventory);
    }
    router.push(`/dashboard/buys/${id}`);
  };

  
  const rows =
    inventory?.map((inventory: Inventory) => ({
      id: inventory.id,
      date_purchase: formatDate(inventory.date_purchase),
      user: inventory.user.username,
      email: inventory.user.email,
      provider: `${inventory.person.name} ${inventory.person.last_name}`,
      num_product: inventory.purchase_detail.length,
      total_price: formatPrice(inventory.total_price),
    })) || [];

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#1E9189" loading={isLoading} size={180} />
        </div>
      ) : (
        <div>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Lista de Compras</p>
            <div>
              <button
                className={styles.buttonCreate}
                onClick={() => {
                  router.push("/dashboard/buys/create");
                }}
              >
                Agregar Compra
              </button>
            </div>
          </div>
          <DataTable
            slug="inventory"
            pagination={10}
            columns={columns}
            rows={rows}
            handleRow={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default BuyPage;
