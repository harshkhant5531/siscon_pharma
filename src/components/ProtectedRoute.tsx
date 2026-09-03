import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PageLoader from '@/components/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireManager?: boolean;
}

export const ProtectedRoute = ({ children, requireManager = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <PageLoader message="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireManager && user?.role !== 'manager') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
