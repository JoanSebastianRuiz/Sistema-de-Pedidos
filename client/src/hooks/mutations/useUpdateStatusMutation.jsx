import { queryKeys } from '@/lib/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';
import { useSnackbarStore } from '@/store/snackbar.store';
import useErrorHandler from '@/hooks/errors/useErrorHandler';
import { queryClient } from '@/lib/react-query/queryClient';
import useLang from '../i18n/useLang';

export const useUpdateStatusMutation = ({ moduleName, service }) => {
    const { t } = useLang();
    const { showSnackbar } = useSnackbarStore();
    const handleError = useErrorHandler();

    return useMutation({
        mutationFn: service.updateStatus,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys[moduleName] });

            showSnackbar({
                message: t('messages.updateSuccess'),
                severity: 'success',
            });
        },

        onError: (error) => {
            handleError({
                error,
                namespace: moduleName,
                fallbackMessage: t('errors.updateError'),
            });
        },
    });
};
