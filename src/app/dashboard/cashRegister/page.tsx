"use client";
import styles from "./style.module.scss";
import React, { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { ModalContext } from "@/context/ModalContext";

import { CashRegisterContext } from "@/context/CashRegisterContext";

import { getAllCashRegisterAPI } from "@/api/CashRegister";

import { CashRegister } from "@/interfaces/CashRegister";

import { GridLoader } from "react-spinners";
import DataTable from "@/components/DataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { BiSolidDetail } from "react-icons/bi";
import { useRouter } from "next/navigation";

function CashRegisterPage() {
  const { setOpen, setId } = useContext(ModalContext);

  const { setSelectedCashRegister, setCashRegisters, cashRegisters } = useContext(CashRegisterContext);
  const router = useRouter();

  const { data, isLoading } = useQuery(["cashRegister"], getAllCashRegisterAPI, {
    onSuccess: (data) => {
      setCashRegisters(data);
    },
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      type: "string",
    },
    {
      field: "location",
      headerName: "Locación",
      width: 300,
      type: "string",
    },
    {
      field: "turns_length",
      headerName: "# de Turnos",
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
                onClick={() => handleDetails(params.row.id)}
                className={styles.submitButton}
            >
              <BiSolidDetail /> Detalles
            </button>
          </div>
      ),
    },
  ];

  const handleDetails = (id: string) => {
    const findCashRegister = cashRegisters?.find((cashRegister) => cashRegister.id === id);
    if (cashRegisters){
      setSelectedCashRegister(findCashRegister);
    }
    router.push(`/dashboard/cashRegister/${id}`);
  };

  const rows =
  cashRegisters?.map((cashRegister: CashRegister) => ({
    id: cashRegister.id,
    name: cashRegister.name,
    location: cashRegister.location,
    turns_length: cashRegister.turns?.length || 0,
  })) || [];


  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <GridLoader color="#26A69A" size={150} />
        </div>
      ) : (
        <div>
          <div className={styles.containerTittle}>
            <p className={styles.tittleList}>Lista de Cajas Registradoras</p>
          
            <div>
              <button
                className={styles.buttonCreate}
                onClick={() => {
                  if (setId) {
                    setOpen(true);
                    setId("addCashRegister");
                  }
                }}
              >
                Crear caja registradora
              </button>
            </div>
          </div>
          <DataTable
            slug="cashRegister"
            columns={columns}
            rows={rows}
            pagination={10}
            handleRow={() =>{}}
          />
        </div>
      )}
    </div>
  );
}
export default CashRegisterPage;
