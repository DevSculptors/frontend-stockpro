"use client";
import { Inventory } from "@/interfaces/Inventory";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { InventoryContext } from "@/context/InventoryContext";

import styles from "../style.module.scss";

import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { formatPrice, formatDate } from "@/helpers/Utils";

const columns: GridColDef[] = [
  {
    field: "name_product",
    headerName: "Producto",
    width: 200,
    type: "string",
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 150,
    type: "string",
  },
  {
    field: "category",
    headerName: "Categoria",
    width: 150,
    type: "string",
  },
  {
    field: "quantity",
    headerName: "Cantidad",
    width: 150,
    type: "number",
  },
  {
    field: "due_date",
    headerName: "Fecha de vencimiento",
    width: 250,
    type: "string",
  },
  {
    field: "purchase_unit_price",
    headerName: "Precio de compra",
    width: 200,
    type: "string",
  },
  {
    field: "sale_unit_price",
    headerName: "Precio de Venta",
    width: 200,
    type: "string",
  },
];


const ShowInventory = () => {
  const { selectedInventory } = useContext(InventoryContext);

  const router = useRouter();

  const date = selectedInventory?.date_purchase || "";
  const totalBuy = selectedInventory?.total_price || 0;

  const rows =
    selectedInventory?.purchase_detail.map((item) => ({
      id: item.product.id,
      name_product: item.product.name_product,
      brand: item.product.brand.name,
      category: item.product.category.name,
      quantity: item.quantity,
      due_date: formatDate(item.due_date),
      purchase_unit_price: formatPrice(Number(item.purchase_unit_price)),
      sale_unit_price: formatPrice(Number(item.sale_unit_price)),
    })) || [];

  const totalQuantity = rows.reduce((total, row) => total + row.quantity, 0);

  return (
    <div className={styles.container}>
      <div className={styles.containerTittle}>
        <p className={styles.tittleList}>Detalles de Compra</p>
        <div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={() => {
              router.push("/dashboard/buys");
            }}
          >
            <AiOutlineArrowLeft />
            Atras
          </button>
        </div>
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <div className={`${styles.inputConainerTest} mr-4`}>
          <h3 className={styles.label}>Fecha de Compra</h3>
          <p className={styles.text}>{formatDate(date)}</p>
        </div>
        <div className={`${styles.inputConainerTest} ml-4`}>
          <h3 className={styles.label}>Nombre del Proveedor</h3>
          <p className={styles.text}>
            {selectedInventory?.person.name +
              " " +
              selectedInventory?.person.last_name}
          </p>
        </div>
      </div>
      <div>
        <div>
          <DataTable
            slug="detailsBuys"
            pagination={5}
            columns={columns}
            rows={rows}
            handleRow={() => {}}
          />
        </div>
        <div className="my-[10px] grid grid-cols-2 gap-4">
          <div className={`${styles.inputConainerTest} mr-4`}>
            <h3 className={styles.label}>Total de la compra:</h3>
            <p className={styles.text}> {formatPrice(totalBuy)}</p>
          </div>
          <div className={`${styles.inputConainerTest} mr-4`}>
            <h3 className={styles.label}>Total de productos:</h3>
            <p className={styles.text}> {totalQuantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInventory;
