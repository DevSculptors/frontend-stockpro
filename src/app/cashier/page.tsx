"use client"
import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import User from "./user/page";

function Cashier() {
  const { setOpen, setId } = useContext(ModalContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalShown = sessionStorage.getItem('modalShown');
    if(!modalShown && setId){
        setOpen(true);
        setId("openTurn");
        setShowModal(true);
        sessionStorage.setItem('modalShown', 'true');
    }
  }, [])

  return (
    <User/>
  )
}
export default Cashier