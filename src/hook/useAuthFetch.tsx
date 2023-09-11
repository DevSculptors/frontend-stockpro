import { AxiosRequestConfig } from "axios";

import axios from "@/api/config";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { toast } from "sonner";

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
    console.log("useAuthFetch Login");

    try {
      const { data } = await axios.post(`${endpoint}`, formData, options);

      Cookies.set("token", data.token, {
        expires: 1,
      });

      // Nuevo Toast uwu
      toast.success("Bienvenido");

      if (redirectRoute) {
        router.push(redirectRoute);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return { authRouter };
}
