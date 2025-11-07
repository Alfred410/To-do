import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ProtectedRoute() {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
