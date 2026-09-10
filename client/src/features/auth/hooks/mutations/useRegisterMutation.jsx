import { useMutation } from '@tanstack/react-query';

import useLang from '@/hooks/i18n/useLang';
import { useSnackbarStore } from '@/store/snackbar.store';
import { register } from '../../services/auth.service';
import useErrorHandler from '@/hooks/errors/useErrorHandler';
import { useNavigate } from 'react-router-dom';

export const useRegisterMutation = () => {
    const navigate = useNavigate();
    const handleError = useErrorHandler();
    const { t } = useLang('auth');
    const { showSnackbar } = useSnackbarStore();

    return useMutation({
        mutationFn: register,

        onSuccess: () => {
            showSnackbar({
                message: t('messages.registerSuccess'),
                severity: 'success',
            });

            setTimeout(() => {
                navigate('/');
            }, 1000);
        },

        onError: (error) => {
            handleError({
                error,
                namespace: 'auth',
                fallbackMessage: t('messages.registerError'),
            });
        },
    });
};
