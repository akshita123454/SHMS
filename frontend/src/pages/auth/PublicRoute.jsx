import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user) {
    // Redirect logged-in user to role-specific dashboard
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'doctor':
        return <Navigate to="/doctor" replace />;
      case 'reception':
        return <Navigate to="/reception" replace />;
      case 'emergency':
        return <Navigate to="/emergency" replace />;
      case 'patient':
        return <Navigate to="/patient" replace />;
      case 'developer':
       return <Navigate to="/developer" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return children; // If not logged in, show the component
};

export default PublicRoute;
