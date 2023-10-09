import React,{createContext} from "react";

import { Sale, ProductBuySale} from "@/interfaces/Sale";
import { Product } from "@/interfaces/Product";


type SaleContextType = {
  selectedSale: Sale | undefined;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;

  sales: Sale[] | undefined;
  setSales: React.Dispatch<React.SetStateAction<Sale[] | undefined>>;
};

const saleContextState = {
  selectedSale: undefined,
  setSelectedSale: () => {},
  sales: undefined,
  setSales: () => {},
  productsBuy: undefined,
  setProductsBuy: () => {},
};

export const SaleContext =
  createContext<SaleContextType>(saleContextState);