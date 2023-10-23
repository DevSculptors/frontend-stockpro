"use client";
import { Sale } from "@/interfaces/Sale";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { SaleContext } from "@/context/SaleContext";

import styles from "../styles.module.scss";

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
    field: "unit_price",
    headerName: "Precio de venta",
    width: 200,
    type: "string",
  },
];


const ShowSale = () => {
  
  const { selectedSale } = useContext(SaleContext);

  const router = useRouter();

  const date = selectedSale?.date_sale || "";
  const totalSale = selectedSale?.price_sale || 0;

  const rows =
    selectedSale?.oders.map((item) => ({
      id: item.product.id,
      name_product: item.product.name_product,
      brand: item.product.brand.name,
      category: item.product.category.name,
      amount_product: item.amount_product,
      unit_price: formatPrice(Number(item.price)),
    })) || [];

  const totalQuantity = rows.reduce((total, row) => total + Number(row.amount_product), 0);


  return (
    <div className={styles.container}>
      <div className={styles.containerTittle}>
        <p className={styles.tittleList}>Detalles de Venta</p>
        <div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={() => {
              router.push("/dashboard/sales");
            }}
          >
            <AiOutlineArrowLeft />
            Atras
          </button>
        </div>
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <div className={`${styles.inputConainerTest} mr-4`}>
          <h3 className={styles.label}>Fecha de Venta</h3>
          <p className={styles.text}>{formatDate(date)}</p>
        </div>
        <div className={`${styles.inputConainerTest} ml-4`}>
          <h3 className={styles.label}>Nombre del cliente</h3>
          <p className={styles.text}>
            {selectedSale?.person.name +
              " " +
              selectedSale?.person.last_name}
          </p>
        </div>
      </div>
      <div>
        <div>
          <DataTable
            slug="detailsSales"
            pagination={5}
            columns={columns}
            rows={rows}
            handleRow={() => {}}
          />
        </div>
        <div className="my-[10px] grid grid-cols-2 gap-4">
          <div className={`${styles.inputConainerTest} mr-4`}>
            <h3 className={styles.label}>Total de la venta:</h3>
            <p className={styles.text}> {formatPrice(totalSale)}</p>
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

export default ShowSale;
