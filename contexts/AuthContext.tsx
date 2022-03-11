import { createContext, useState } from "react";
import { AuthContextProps, AuthContextType } from "./types";

const initial = {
  token: "",
  setToken: () => {},
};

const AuthContext = createContext<AuthContextType>(initial);

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useState(initial.token);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
