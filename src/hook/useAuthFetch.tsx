import { useNotificationContext } from "@/context/NotificationContext";
import { AxiosRequestConfig } from "axios";

import axios from '@/api/config'

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

interface AuthFetchProps {
  endpoint: string;
  redirectRoute?: string;
  formData: any;
  options?: AxiosRequestConfig;
}


export function useAuthFetch() {
  const { showNotification } = useNotificationContext();
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
      
      showNotification({
        open: true,
        msj: data.message,
        status: "success",
      });

      if (redirectRoute) {
        router.push(redirectRoute);
      }
    } catch (error: any) {
      console.log(error);
      showNotification({
        open: true,
        status: "error",
        msj: error.response.data.message as string,
      });
    }
  };
  return { authRouter };
}
