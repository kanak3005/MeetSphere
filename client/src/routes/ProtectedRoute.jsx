import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader fullScreen />;

  // Login ke baad user wapas isi page par aaye, isliye `from` bhej rahe hain
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}