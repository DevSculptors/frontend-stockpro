import axios from "./config";

import { Inventory} from "@/interfaces/Inventory";
import Cookies from "js-cookie";

export const getAllInventory = async () => {
  const response = await axios.get<Inventory[]>("/inventory", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}