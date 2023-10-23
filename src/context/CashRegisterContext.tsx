import React,{createContext} from "react";

import { CashRegister} from "@/interfaces/CashRegister";


type CashRegisterContextType = {
  selectedCashRegister: CashRegister | undefined;
  setSelectedCashRegister: React.Dispatch<React.SetStateAction<CashRegister | undefined>>;

  cashRegisters: CashRegister[] | undefined;
  setCashRegisters: React.Dispatch<React.SetStateAction<CashRegister[] | undefined>>;
};

const cashRegisterContextState = {
  selectedCashRegister: undefined,
  setSelectedCashRegister: () => {},
  cashRegisters: undefined,
  setCashRegisters: () => {},
};

export const CashRegisterContext =
  createContext<CashRegisterContextType>(cashRegisterContextState);