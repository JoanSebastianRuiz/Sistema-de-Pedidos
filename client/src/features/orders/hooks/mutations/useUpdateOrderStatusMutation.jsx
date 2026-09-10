import useErrorHandler from '@/hooks/errors/useErrorHandler';
import useLang from '@/hooks/i18n/useLang';
import { queryClient } from '@/lib/react-query/queryClient';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { useSnackbarStore } from '@/store/snackbar.store';
import { useMutation } from '@tanstack/react-query';
import { orderService } from '../../services/orders.service';

export const useUpdateOrderStatusMutation = () => {
    const { t } = useLang();
    const { showSnackbar } = useSnackbarStore();
    const handleError = useErrorHandler();

    return useMutation({
        mutationFn: orderService.updateStatus,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.orders });

            showSnackbar({
                message: t('messages.updateSuccess'),
                severity: 'success',
            });
        },

        onError: (error) => {
            handleError({
                error,
                namespace: 'orders',
                fallbackMessage: t('errors.updateError'),
            });
        },
    });
};
