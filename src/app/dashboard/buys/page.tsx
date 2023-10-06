"use client";
import { Inventory } from "@/interfaces/Inventory";
import { getAllInventory } from "@/api/Inventory";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useContext } from "react";
import { InventoryContext } from "@/context/InventoryContext";

import { formatDate } from "@/helpers/Utils";
import { useRouter } from "next/navigation";


import styles from "./style.module.scss";

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
    field: "num_product",
    headerName: "# Productos",
    width: 150,
    type: "number",
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 150,
    renderCell: () => (
      <div>
        <button
          className={styles.buttonCreate}
        >
          Ver detalles
        </button>
      </div>
    ),
  },
];

function BuyPage() {

  const router = useRouter();
 
  const { setSelectedInventory, setInventory, inventory } =
    useContext(InventoryContext);

  const { isLoading } = useQuery(["inventory"], getAllInventory, {
    onSuccess: (data) => {
      setInventory(data);
    },
  });
  

  const rows =
    inventory?.map((inventory: Inventory) => ({
      id: inventory.id,
      date_purchase: formatDate(inventory.date_purchase),
      user: inventory.user.username,
      num_product: inventory.purchase_detail.length,
    })) || [];

  const handleRow = (row: any) => {
    console.log(row);
    // const invent = inventory?.find((inventory) => inventory.id === row.id);
    // if (invent) {
    //   setSelectedInventory(invent);
    // }

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
            handleRow={(row) => handleRow(row)}
          />
        </div>
      )}
    </div>
  );
}

export default BuyPage;
