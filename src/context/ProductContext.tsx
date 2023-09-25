import React, { createContext } from "react";

import { Product } from "@/interfaces/Product";


type ProductContextType = {
  selectedProduct: Product | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
};

const productContextState = {
  selectedProduct: undefined,
  setSelectedProduct: () => {},
  products: undefined,
  setProducts: () => {},
};

export const ProductContext =
  createContext<ProductContextType>(productContextState);
