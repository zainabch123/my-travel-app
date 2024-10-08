import JsonWebTokenError from "jsonwebtoken/lib/JsonWebTokenError";
import { useEffect, useState, createContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
   

    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
      if (location.state?.from?.pathname) {
        navigate(location.state.from.pathname || "/");
      }
    }

  }, [location.state?.from?.pathname, navigate]);

  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login")
  };

  const value = {
    user,
    token,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
