import { AxiosRequestConfig } from "axios";

import axios from "@/api/config";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { ToasterSucess, ToasterError } from "../helpers/useToaster";

interface AuthFetchProps {
  endpoint: string;
  redirectRoute?: string;
  formData: any;
  options?: AxiosRequestConfig;
}

export function useAuthFetch() {
  const router = useRouter();

  const authRouter = async ({
    endpoint,
    redirectRoute,
    formData,
    options,
  }: AuthFetchProps) => {
  
    try {
      const { data } = await axios.post(`${endpoint}`, formData, options);

      Cookies.set("token", data.token, {
        path: "/",
        expires: 1,
      });

      console.log("data", data);
      

      // Guardar datos del usuario en el sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(data.userFound));
      sessionStorage.setItem("user_id", data.userFound.id);
      sessionStorage.setItem("username", data.userFound.username);
      sessionStorage.setItem("role", data.userFound.roleUser);

      ToasterSucess("Inicio de sesión exitoso");

      if (redirectRoute) {
        router.push(redirectRoute);
      }
    } catch (error: any) {
      ToasterError(error.response.data.message);
    }
  };
  return { authRouter };
}
