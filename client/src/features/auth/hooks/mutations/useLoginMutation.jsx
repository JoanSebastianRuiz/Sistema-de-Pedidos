import { useMutation } from '@tanstack/react-query';

import useLang from '@/hooks/i18n/useLang';
import { useAuthStore } from '@/store/auth.store';
import { useSnackbarStore } from '@/store/snackbar.store';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import useErrorHandler from '@/hooks/errors/useErrorHandler';

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const handleError = useErrorHandler();
    const { t } = useLang('auth');
    const { showSnackbar } = useSnackbarStore();
    const { setUser } = useAuthStore();

    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            setUser(data.user);

            const name = data.user.name;
            showSnackbar({
                message: t('messages.welcome', { name }),
                severity: 'success',
            });
            const initialRoute = 'orders';
            navigate(initialRoute);
        },

        onError: (error) => {
            handleError({
                error,
                namespace: 'users',
                fallbackMessage: t('messages.loginError'),
            });
        },
    });
};
