import { useNotificationContext } from "@/context/NotificationContext";
import axios, { AxiosRequestConfig } from "axios";

import { useRouter } from "next/navigation";

import { API_URL } from "@/api/config";

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
      console.log(formData);
      
      const { data } = await axios.post(`${API_URL}/${endpoint}`, formData, options);
      
      console.log(data);

      showNotification({
        open: true,
        msj: data.message,
        status: "success",
      });

      if (redirectRoute) {
        router.push(redirectRoute);
      }
    } catch (error: any) {
      showNotification({
        open: true,
        status: "error",
        msj: error.response.data.message as string,
      });
    }
  };
  return { authRouter };
}
