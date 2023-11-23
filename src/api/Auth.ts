import axios from "./config";

import { User, CreateUser, RegisterUser } from "@/interfaces/User";

export const LoginAPI = async (username: string, password: string) => {
  const response = await axios.post<RegisterUser>("/login", {
    username,
    password,
  });

  return response.data;
}

export const LogoutAPI = async () => {
  const response = await axios.get("/logout");
  return response.data;
}