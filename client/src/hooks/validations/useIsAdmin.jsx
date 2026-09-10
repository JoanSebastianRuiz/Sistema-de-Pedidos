import { useAuthStore } from '@/store/auth.store';

const useIsAdmin = () => {
    const { user } = useAuthStore();
    return user.role === 'admin';
};

export default useIsAdmin;
