import axios from "./config";

import { Inventory, InventoryCreate} from "@/interfaces/Inventory";
import Cookies from "js-cookie";

export const getAllInventory = async () => {
  const response = await axios.get<Inventory[]>("/inventory", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

export const getInventoryById = async (id: number) => {
  const response = await axios.get<Inventory>(`/inventory/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

export const createInventoryAPI = async (data: InventoryCreate) => {
  const response = await axios.post<Inventory>("/inventory", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}