import { useAuthStore } from '@/store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthMeQuery } from '../hooks/useAuthMeQuery';

const AuthGuard = ({ roles = [] } = {}) => {
    const { user } = useAuthStore();
    const { data, isError, isLoading } = useAuthMeQuery();

    const role = user?.role;

    const hasPermission = roles.length === 0 || roles.includes(role);

    if (isLoading) {
        return null;
    }

    if (isError || !data) {
        return <Navigate to="/" replace />;
    }

    if (!hasPermission) {
        return <Navigate to="/orders" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
