"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogoutAPI } from "@/api/Auth";
import { ToasterSucess, ToasterError } from "@/helpers/useToaster";
import { ModalContext } from "@/context/ModalContext";

function Logout() {
  const router = useRouter();
  const logout = LogoutAPI();

  const { setOpen, setId } = useContext(ModalContext);

  useEffect(() => {
    {/*if(setId){
      setOpen(true);
      setId("closeTurn");
    }*/}
    Cookies.remove("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("modalShown");
    sessionStorage.removeItem("id_turn");
    sessionStorage.removeItem("id_cash");
    logout;
    router.push("/");
    ToasterSucess("Cierre de sesión exitoso");
  }, [router, logout]);

  return <div>Logout...</div>;
}

export default Logout;
