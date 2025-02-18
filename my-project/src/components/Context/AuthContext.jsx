import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider  = ({ children }) => {
  const [isLoggedIn,setIsLoggedIn] = useState(() => {
    // Check localStorage when the component mounts
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthProvider;