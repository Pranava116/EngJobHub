import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    let redirectPath = '/';
    if (user?.role === 'educator') redirectPath = '/educator';
    else if (user?.role === 'student') redirectPath = '/student';
    else if (user?.role === 'hr') redirectPath = '/hr';

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
