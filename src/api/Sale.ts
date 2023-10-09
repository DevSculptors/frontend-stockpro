import axios from "./config";

import { Sale, SaleCreate} from "@/interfaces/Sale";
import Cookies from "js-cookie";

export const getAllSalesAPI = async () => {
  const response = await axios.get<Sale[]>("/sales", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}
export const getSaleById = async (id: number) => {
  const response = await axios.get<Sale>(`/sales/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

export const createSaleAPI = async (data: SaleCreate) => {
  const response = await axios.post<Sale>("/sales", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}