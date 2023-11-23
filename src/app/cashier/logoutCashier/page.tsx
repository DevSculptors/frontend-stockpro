"use client";
import { useEffect, useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

function Logout() {

  const { setOpen, setId } = useContext(ModalContext);

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    if(setId){
      setOpen(true);
      setId("closeTurn");
    }
  }
  return <div>Logout...</div>;
}

export default Logout;
