import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();
  const loggedUser = localStorage.getItem('user');
  console.log("user",user,loggedUser);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;