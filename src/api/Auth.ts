import axios from "./config";

import { User, CreateUser, RegisterUser } from "@/interfaces/User";
import Cookies from "js-cookie";

export const LoginAPI = async (username: string, password: string) => {
  const response = await axios.post<RegisterUser>("/login", {
    username,
    password,
  });

  return response.data;
}