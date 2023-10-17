import React,{createContext} from "react";

import { Sale, ProductDetailSale} from "@/interfaces/Sale";


type SaleContextType = {
  selectedSale: Sale | undefined;
  setSelectedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;

  sales: Sale[] | undefined;
  setSales: React.Dispatch<React.SetStateAction<Sale[] | undefined>>;

  productsSale: ProductDetailSale[] | undefined;
  setProductsSale: React.Dispatch<React.SetStateAction<ProductDetailSale[] | undefined>>;

  selectProductSale: ProductDetailSale | undefined;
  setSelectProductSale: React.Dispatch<React.SetStateAction<ProductDetailSale | undefined>>;
};

const saleContextState = {
  selectedSale: undefined,
  setSelectedSale: () => {},
  sales: undefined,
  setSales: () => {},
  productsSale: undefined,
  setProductsSale: () => {},
  selectProductSale: undefined,
  setSelectProductSale: () => {},
};

export const SaleContext =
  createContext<SaleContextType>(saleContextState);