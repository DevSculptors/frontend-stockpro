import React,{createContext} from "react";

import { Inventory } from "@/interfaces/Inventory";
import { Product } from "@/interfaces/Product";

type InventoryContextType = {
  selectedInventory: Inventory | undefined;
  setSelectedInventory: React.Dispatch<React.SetStateAction<Inventory | undefined>>;
  inventory: Inventory[] | undefined;
  setInventory: React.Dispatch<React.SetStateAction<Inventory[] | undefined>>;
  productsBuy: Product[] | undefined;
  setProductsBuy: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
};

const inventoryContextState = {
  selectedInventory: undefined,
  setSelectedInventory: () => {},
  inventory: undefined,
  setInventory: () => {},
  productsBuy: undefined,
  setProductsBuy: () => {},
};

export const InventoryContext =
  createContext<InventoryContextType>(inventoryContextState);