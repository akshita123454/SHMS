import React from 'react';
import { Navigate } from 'react-router-dom';

// acceptedRoles: array of roles allowed for this route
const ProtectedRoute = ({ children, acceptedRoles }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!acceptedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
