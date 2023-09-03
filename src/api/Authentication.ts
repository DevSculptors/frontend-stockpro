import axios from "axios";

import { LoginUser } from "@/interfaces/User";

import { API_URL } from "./config";

// Mirar porque no sirve :c
const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  withCredentials: true,
});

export const loginRequest = async (user: LoginUser) => {
  console.log("Login Request");
  const response = await axios.post(`${API_URL}/login`, user);
  return response.data;
};

export const logoutRequest = async () => {
  const response = await axios.post("/logout");
  return response.data;
};
