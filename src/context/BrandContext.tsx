import React, { createContext } from "react";

import { Brand } from "@/interfaces/Brand";


type BrandContextType = {
  selectedBrand: Brand | undefined;
  setSelectedBrand: React.Dispatch<React.SetStateAction<Brand | undefined>>;
  brands: Brand[] | undefined;
  setBrands: React.Dispatch<React.SetStateAction<Brand[] | undefined>>;
};

const brandContextState = {
  selectedBrand: undefined,
  setSelectedBrand: () => {},
  brands: undefined,
  setBrands: () => {},
};

export const BrandContext =
  createContext<BrandContextType>(brandContextState);
