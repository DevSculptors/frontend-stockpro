"use client";
import { CashRegister } from "@/interfaces/CashRegister";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { CashRegisterContext } from "@/context/CashRegisterContext";

import styles from "../style.module.scss";

import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { formatPrice, formatTimeDate } from "@/helpers/Utils";

const columns: GridColDef[] = [
  {
    field: "date_time_start",
    headerName: "Fecha Inicio",
    width: 200,
    type: "string",
  },
  {
    field: "base_cash",
    headerName: "Efectivo Base",
    width: 150,
    type: "string",
  },
  {
    field: "date_time_end",
    headerName: "Fecha Fin",
    width: 200,
    type: "string",
  },
  {
    field: "final_cash",
    headerName: "Efectivo Final",
    width: 150,
    type: "string",
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
    type: "string",
  },
];


const ShowCashRegister = () => {
  
  const { selectedCashRegister } = useContext(CashRegisterContext);

  const router = useRouter();

  const name = selectedCashRegister?.name || "";
  const location = selectedCashRegister?.location || "";

  const rows =
    selectedCashRegister?.turns?.map((item) => ({
      id: item.id,
      date_time_start: formatTimeDate(String(item.date_time_start)),
      base_cash: formatPrice(Number(item.base_cash)),
      date_time_end: formatTimeDate(String(item.date_time_end)),
      final_cash: formatPrice(Number(item.final_cash)),
      username: item.user.username,
    })) || [];

  return (
    <div className={styles.container}>
      <div className={styles.containerTittle}>
        <p className={styles.tittleList}>Detalles de Caja Registradora</p>
        <div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={() => {
              router.push("/dashboard/cashRegister");
            }}
          >
            <AiOutlineArrowLeft />
            Atras
          </button>
        </div>
      </div>
      <div className="my-[10px] grid grid-cols-2 gap-4">
        <div className={`${styles.inputConainerTest} mr-4`}>
          <h3 className={styles.label}>Nombre</h3>
          <p className={styles.text}>{name}</p>
        </div>
        <div className={`${styles.inputConainerTest} ml-4`}>
          <h3 className={styles.label}>Locación</h3>
          <p className={styles.text}>
            {location}
          </p>
        </div>
      </div>
      <div>
        <div>
          {selectedCashRegister?.turns && selectedCashRegister?.turns.length >0 ?(
              <DataTable
                  slug="detailsCashRegister"
                  pagination={5}
                  columns={columns}
                  rows={rows}
                  handleRow={() => {}}
              />
          ): null
          }
        </div>
      </div>
    </div>
  );
};

export default ShowCashRegister;
