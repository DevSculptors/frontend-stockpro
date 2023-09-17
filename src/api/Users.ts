import axios from "./config";

import { User, CreateUser, RegisterUser, UpdateUser } from "@/interfaces/User";
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
  return response.data;
};

export const getUserByIdAPI = async (id: string) => {
  const response = await axios.get<User>(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

export const updateUserAPI = async (user : UpdateUser) => {
  const response = await axios.put<UpdateUser>(
      `/users/${user.id}`,
      user,{
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
  });
  return response.data;
}
