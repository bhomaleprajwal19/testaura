import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // 🚫 If not logged in, redirect to login
    return <Navigate to="/" />;
  }

  // ✅ If logged in, render the child component
  return children;
};

export default ProtectedRoute;
