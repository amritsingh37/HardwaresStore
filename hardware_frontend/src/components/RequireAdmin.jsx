import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem("shiva_token");
  const role = localStorage.getItem("shiva_role");

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}
