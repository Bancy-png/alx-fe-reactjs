import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = false; // replace with real auth check (e.g. context or state)

  return isAuthenticated ? children : <Navigate to="/login" />;
}
