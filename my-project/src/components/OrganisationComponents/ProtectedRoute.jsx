import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // If user is not logged in, redirect to Sign In page
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  // If user is logged in, render the protected component
  return children;
};

export default ProtectedRoute;
