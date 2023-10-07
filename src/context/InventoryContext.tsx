import React,{createContext} from "react";

import { Inventory, ProductBuyInventory } from "@/interfaces/Inventory";
import { Product } from "@/interfaces/Product";

type InventoryContextType = {
  selectedInventory: Inventory | undefined;
  setSelectedInventory: React.Dispatch<React.SetStateAction<Inventory | undefined>>;
  
  inventory: Inventory[] | undefined;
  setInventory: React.Dispatch<React.SetStateAction<Inventory[] | undefined>>;

  productsBuy: ProductBuyInventory[] | undefined;
  setProductsBuy: React.Dispatch<React.SetStateAction<ProductBuyInventory[] | undefined>>;

  selectProductBuy: ProductBuyInventory | undefined;
  setSelectProductBuy: React.Dispatch<React.SetStateAction<ProductBuyInventory | undefined>>;

};

const inventoryContextState = {
  selectedInventory: undefined,
  setSelectedInventory: () => {},
  inventory: undefined,
  setInventory: () => {},

  productsBuy: undefined,
  setProductsBuy: () => {},

  selectProductBuy: undefined,
  setSelectProductBuy: () => {},
};

export const InventoryContext =
  createContext<InventoryContextType>(inventoryContextState);