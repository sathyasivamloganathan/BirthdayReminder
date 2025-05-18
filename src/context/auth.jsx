// auth-context.js
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setAuth({
          user: parsed.user,
          token: parsed.jwt_token,
        });
      } catch (err) {
        console.error("Failed to parse auth data", err);
      }
    }
    setLoading(false);
  }, []);

  // Update Axios headers when token changes
  useEffect(() => {
    if (auth && auth.token) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: auth.user, jwt_token: auth.token })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      localStorage.removeItem("auth");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
