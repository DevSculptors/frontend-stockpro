import { useEffect, createContext, useContext, useState } from "react";

// @ts-ignore
import { loginRequest,logoutRequest } from "@/api/Authentication";

import { LoginUser } from "@/interfaces/User";

const AuthContext = createContext<{
  user: any;
  errors: string[];
  isAuthenticated: boolean;
  signIn: (user:LoginUser) => Promise<void>;
}
>({
  user: null,
  errors: [],
  isAuthenticated: false,
  signIn: async (user:LoginUser) => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const signIn = async (user: LoginUser) => {
    console.log("Method SignIn from AuthContext");
    try{ 
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);

    }catch(error){
      console.log(error);
      // setErrors(error.response.data );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        isAuthenticated,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
