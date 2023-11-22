"use client";
import { useEffect, useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

function Withdrawl() {

  const { setOpen, setId } = useContext(ModalContext);

  useEffect(() => {
    handleDialog();
  }, []);

  const handleDialog = () => {
    if(setId){
      setOpen(true);
      setId("addWithdrawl");
    }
  }
  return <div>Retiro...</div>;
}

export default Withdrawl;
