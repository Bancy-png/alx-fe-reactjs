import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust the path if needed

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // useAuth must be called

  return isAuthenticated ? children : <Navigate to="/login" />;
}
