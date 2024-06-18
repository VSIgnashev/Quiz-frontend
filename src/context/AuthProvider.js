import { useState, createContext, React } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth, isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
