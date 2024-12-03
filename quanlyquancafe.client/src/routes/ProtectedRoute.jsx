import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from '../constants/UserRole';



const ProtectedRoute = ({ children, requiredRoles }) => {
//   const userRole = localStorage.getItem('userRole'); 
const userRole = UserRole[localStorage.getItem(UserRole.ADMIN)];

  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;