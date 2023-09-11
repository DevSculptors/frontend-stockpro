import { createContext } from "react";
import { User } from "@/interfaces/User";

type UserContextType = {
  selectedUser: User | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  users: User[] | undefined;
  setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
};

const userContextState = {
  selectedUser: undefined,
  setSelectedUser: () => {},
  users: undefined,
  setUsers: () => {},
};

export const UserContext = createContext<UserContextType>(userContextState);
