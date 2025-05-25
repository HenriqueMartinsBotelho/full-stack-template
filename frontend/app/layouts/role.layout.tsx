import { Navigate, Outlet } from 'react-router-dom';

import { useUser } from '@/app/hooks/use-user';

type Props = {
  allowedRoles: string[];
};

export function RequireRoleLayout({ allowedRoles }: Props) {
  const { user } = useUser();

  const hasAccess = user?.roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
