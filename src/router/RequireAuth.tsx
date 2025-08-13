import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { enqueueSnackbar } from "notistack";
interface RequireAuthProps {
  allowedRoles?: string[];
}

export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { user } = useAuth();


  const hasRequiredRole = allowedRoles ? user?.role && allowedRoles.includes(user.role) : true;

  if (!hasRequiredRole) {
    enqueueSnackbar('You do not have permission to access this page', { variant: 'error' });
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
