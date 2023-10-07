"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogoutAPI } from "@/api/Auth";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";

function Logout() {
  const router = useRouter();

  const logout = LogoutAPI();
  
  useEffect(() => {
    logout;
    Cookies.remove("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user_id");
    router.push("/");
  }, [router, logout]);
  ToasterSucess("Cierre de sesión exitoso");

  return <div>Logout...</div>;
}

export default Logout;
