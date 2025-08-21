import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Save the location they tried to access so we can send them back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
