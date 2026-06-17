import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ⏳ Wait until auth state loads
  if (loading) {
    return null; // or a spinner
  }

  // 🔒 If not logged in → redirect
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
