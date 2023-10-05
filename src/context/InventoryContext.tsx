import React,{createContext} from "react";

import { Inventory } from "@/interfaces/Inventory";

type InventoryContextType = {
  selectedInventory: Inventory | undefined;
  setSelectedInventory: React.Dispatch<React.SetStateAction<Inventory | undefined>>;
  inventory: Inventory[] | undefined;
  setInventory: React.Dispatch<React.SetStateAction<Inventory[] | undefined>>;
};

const inventoryContextState = {
  selectedInventory: undefined,
  setSelectedInventory: () => {},
  inventory: undefined,
  setInventory: () => {},
};

export const InventoryContext =
  createContext<InventoryContextType>(inventoryContextState);