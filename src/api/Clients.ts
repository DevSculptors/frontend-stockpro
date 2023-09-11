import axios from "./config";

import { Client, CreateClient, UpdateClient } from "@/interfaces/Client";
import Cookies from "js-cookie";

export const getAllPersons = async () => {
  const response = await axios.get<Client[]>("/person", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
export const createClientAPI = async (client: CreateClient) => {
  const response = await axios.post<UpdateClient>("/person", client, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

export const getClientByIdAPI = async (id: string) => {
  const response = await axios.get<Client>(`/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
