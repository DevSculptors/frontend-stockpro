"use client"
import React, { useContext, useEffect } from "react";
import { ModalContext } from "@/context/ModalContext";
import User from "./user/page";

function Cashier() {
  const { setOpen, setId } = useContext(ModalContext);
  useEffect(() => {
    if (setId) {
      setOpen(true);
      setId("openTurn");
    }
  }, [])
  return (
    <User/>
  )
}
export default Cashier