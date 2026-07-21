import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// adminOnly=true restricts route to admin role users
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { userInfo } = useAuth();

  if (!userInfo) return <Navigate to="/login" />;
  if (adminOnly && userInfo.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
