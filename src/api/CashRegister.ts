import axios from "./config";

import { CashRegister, CreateCashRegister, OpenTurn, CloseTurn, UpdateCashRegister} from "@/interfaces/CashRegister";
import { SaleTurn } from "@/interfaces/Sale";
import Cookies from "js-cookie";

export const getAllCashRegisterAPI = async () => {
  const response = await axios.get<CashRegister[]>("/cashRegister", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}
export const getCashRegisterById = async (id: number) => {
  const response = await axios.get<CashRegister>(`/cashRegister/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

export const createCashRegisterAPI = async (cashRegister: CreateCashRegister) => {
  const response = await axios.post<CreateCashRegister>("/cashRegister", cashRegister, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}
export const updateCashRegisterAPI = async (cashRegister: UpdateCashRegister) => {
  const response = await axios.put<UpdateCashRegister>("/cashRegister", cashRegister, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

export const openTurnAPI = async (openTurn: OpenTurn) => {
  const response = await axios.post<OpenTurn>(`/cashRegister/${openTurn.id_cash}`, openTurn, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}
export const closeTurnAPI = async (closeTurn: CloseTurn) => {
  const response = await axios.put<CloseTurn>(`/cashRegister/${closeTurn.id_cash}`, closeTurn, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}
export const getSalesAPI = async (id_turn: string) => {
  const response = await axios.get<SaleTurn[]>(`/cashRegister/turn/sales/${id_turn}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  console.log("data"+response.data);
  return response.data;
}