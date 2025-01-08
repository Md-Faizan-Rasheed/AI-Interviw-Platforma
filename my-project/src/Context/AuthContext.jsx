// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Provide the AuthContext to your app
export const AuthProvider = ({ children }) => {
  // Check if user is already logged in (token exists in localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  
  // Logout function to clear token and update state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
