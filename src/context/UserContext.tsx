import { createContext } from "react";

type UserContextType = {
  user: string,
  setUser: (user: string) => void
  role: string,
  setRole: (role: string) => void,
  userId: number,
  setUserId: (id: number) => void,
  userDetails: any,
  setUserDetails: (props: any) => void
}

const userContextState = {
  user: '',
  setUser: () => {},
  role: '',
  setRole: () => {},
  userId: 0,
  setUserId: () => {},
  userDetails: undefined,
  setUserDetails: () => {},
}

const UserContext = createContext<UserContextType>(userContextState)

export default UserContext