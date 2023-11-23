"use client";
import { CashRegister } from "@/interfaces/CashRegister";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { CashRegisterContext } from "@/context/CashRegisterContext";

import styles from "../style.module.scss";

import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { formatPrice, formatTimeDate } from "@/helpers/Utils";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { getWithdrawalsCashRegister} from "@/api/CashRegister";
import { WithdrawalResponse } from "@/interfaces/CashRegister";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";

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

const columnsWithdrawal: GridColDef[] = [
  {
    field: "id_turn",
    headerName: "Id del Turno",
    width: 300,
    type: "string",
  },
  {
    field: "withdrawal_date",
    headerName: "Fecha de Retiro",
    width: 200,
    type: "string",
  },
  {
    field: "value",
    headerName: "Valor de Retiro",
    width: 200,
    type: "string",
  },
];

const ShowCashRegister = () => {
  
  const { selectedCashRegister } = useContext(CashRegisterContext);

  const router = useRouter();

  const name = selectedCashRegister?.name || "";
  const location = selectedCashRegister?.location || "";
  const [withdrawalsInfo, setWithdrawalsInfo] = useState<WithdrawalResponse[]>();

  useEffect(() => {
    getWithdrawalMutation.mutate(selectedCashRegister?.id.toString() || "");
  },[])
  const rows =
    selectedCashRegister?.turns?.map((item) => ({
      id: item.id,
      date_time_start: formatTimeDate(String(item.date_time_start)),
      base_cash: formatPrice(Number(item.base_cash)),
      date_time_end: formatTimeDate(String(item.date_time_end)),
      final_cash: formatPrice(Number(item.final_cash)),
      username: item.user.username,
    })) || [];

  const getWithdrawalMutation= useMutation({
    mutationFn: getWithdrawalsCashRegister,
    onSuccess: (result:any) => {
      if(result.length>0) {
        setWithdrawalsInfo(result);
      }
    },
    onError: (error: any) => {
      error.response.data.forEach((error: any) => {
        ToasterError(error.message);
      });
    },
  });
  const rowsWithdrawal =
      withdrawalsInfo?.map((data) => ({
        id: data.id,
        id_turn: data.id_turn,
        withdrawal_date: formatTimeDate(String(data.withdrawal_date)),
        value: formatPrice(Number(data.value)),
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
      {withdrawalsInfo && (
          <div>
            <div className={styles.containerTittle}>
              <p className={styles.tittleList}>Retiros de Caja Registradora</p>
            </div>
            <div>
              <div>
                <DataTable
                    slug="withdrawalsCashRegister"
                    pagination={5}
                    columns={columnsWithdrawal}
                    rows={rowsWithdrawal}
                    handleRow={() => {}}
                />
              </div>
            </div>
          </div>
      )
      }
    </div>
  );
};

export default ShowCashRegister;
