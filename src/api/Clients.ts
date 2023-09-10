import axios from "./config";

import { Client, CreateClient } from "@/interfaces/Client";
import Cookies from "js-cookie";


export const getAllPersons = async () => {
  
  const response = await axios.get<Client[]>("/person",{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}


