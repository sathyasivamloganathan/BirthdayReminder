import React from 'react'
import { useAuth } from '../../context/auth'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Unauthorized from '../Unauthorized/Unauthorized';

const ProtectedRoute = () => {
  const {auth, loading} = useAuth();
  const navigate = useNavigate();
  if (loading) return null;
  return auth?.token ? <Outlet /> : <Navigate to="/unauthorized" />;
}

export default ProtectedRoute;
