import React, { createContext } from "react";

import { Client } from "@/interfaces/Client";


type ClientContextType = {
  selectedClient: Client | undefined;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
  clients: Client[] | undefined;
  setClients: React.Dispatch<React.SetStateAction<Client[] | undefined>>;
};

const clientContextState = {
  selectedClient: undefined,
  setSelectedClient: () => {},
  clients: undefined,
  setClients: () => {},
};

export const ClientContext =
  createContext<ClientContextType>(clientContextState);
