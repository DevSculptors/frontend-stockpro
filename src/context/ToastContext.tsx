import { createContext } from "react";

type UserContextType = {
  toast: string;
  setToast: (toast: string) => void;
  text: string;
  setText: (text: string) => void;
};

const ToastContextState = {
  toast: "",
  setToast: (toast: string) => {},
  text: "",
  setText: (text: string) => {},
};

const ToastContext = createContext<UserContextType>(ToastContextState);
