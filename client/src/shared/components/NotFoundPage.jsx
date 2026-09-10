import { useAuthStore } from '@/store/auth.store';
import { Navigate } from 'react-router-dom';

const NotFountPage = () => {
    const { user } = useAuthStore();
    const initialRoute = user?.role?.initialRoute;
    /* if (initialRoute) {
        return <Navigate to={initialRoute} replace />;
    }
    return <Navigate to="/" replace />; */
};

export default NotFountPage;
