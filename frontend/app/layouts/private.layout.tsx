import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/app/hooks/use-auth';

export const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/sign-in" replace />
  );
};
