import axios from "./config";

import { User, CreateUser, RegisterUser } from "@/interfaces/User";
import Cookies from "js-cookie";

export const getAllUsersAPI = async () => {
  const response = await axios.get<User[]>("/users", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

export const createUserAPI = async (user: CreateUser) => {
  const response = await axios.post<RegisterUser>("/register", user);
  console.log(response.data);
  return response.data;
};
