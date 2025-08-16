import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
        setUserRole(parsedUser.role);
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const { token, user: userData } = response.data; // Correctly destructure user object

      localStorage.setItem("jwt_token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      setUserRole(userData.role);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
  };

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, userRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
