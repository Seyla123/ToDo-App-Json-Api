import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/use-auth-context';

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log("protected auth : ", user);
  const test = true
  console.log(test, user);
  return test ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;