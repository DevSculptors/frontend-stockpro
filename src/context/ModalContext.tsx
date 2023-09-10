import React, {createContext} from "react";

type ModalContextType = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id?: string,
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const userContextState = {
  open: false,
  setOpen: () => {}
}

export const ModalContext = createContext<ModalContextType>(userContextState)