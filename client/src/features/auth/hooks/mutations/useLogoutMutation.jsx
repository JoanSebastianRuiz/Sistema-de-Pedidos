import { useMutation } from '@tanstack/react-query';

import { useSnackbarStore } from '@/store/snackbar.store';
import { logout } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import useLang from '@/hooks/i18n/useLang';
import { useAuthStore } from '@/store/auth.store';
import { queryClient } from '@/lib/react-query/queryClient';
import useErrorHandler from '@/hooks/errors/useErrorHandler';

export const useLogoutMutation = () => {
    const navigate = useNavigate();
    const handleError = useErrorHandler();
    const { t } = useLang('auth');
    const { setUser } = useAuthStore();
    const { showSnackbar } = useSnackbarStore();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear();
            setUser(null);
            navigate('/');
            showSnackbar({
                message: t('messages.logoutSuccess'),
                severity: 'success',
            });
        },
        onError: (error) => {
            handleError({
                error,
                namespace: 'users',
                fallbackMessage: t('messages.logoutError'),
            });
        },
    });
};
