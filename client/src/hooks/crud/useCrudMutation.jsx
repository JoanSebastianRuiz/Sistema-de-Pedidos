import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query/queryClient';
import { useSnackbarStore } from '@/store/snackbar.store';
import useErrorHandler from '../errors/useErrorHandler';
import useLang from '../i18n/useLang';

export const useCrudMutation = ({ mutationFn, queryKey, action, namespace }) => {
    const handleError = useErrorHandler();
    const { t } = useLang();
    const { showSnackbar } = useSnackbarStore();

    const DEFAULT_MESSAGES = {
        create: {
            success: t('messages.createSuccess'),
            error: t('errors.createError'),
        },
        update: {
            success: t('messages.updateSuccess'),
            error: t('errors.updateError'),
        },
        delete: {
            success: t('messages.deleteSuccess'),
            error: t('errors.deleteError'),
        },
    };

    return useMutation({
        mutationFn,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });

            showSnackbar({
                message: DEFAULT_MESSAGES[action]?.success,
                severity: 'success',
            });
        },

        onError: (error) => {
            handleError({ error, namespace, fallbackMessage: DEFAULT_MESSAGES[action]?.error });
        },
    });
};
