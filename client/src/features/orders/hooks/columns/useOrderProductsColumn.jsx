import useLang from '@/hooks/i18n/useLang';
import { useOrdersStore } from '@/store/orders.store';
import { Button } from '@mui/material';

const useOrderProductsColumn = () => {
    const { t } = useLang('orders');
    const { openOrderDetails } = useOrdersStore();

    const renderCell = ({ value }) => (
        <Button variant="outlined" size="small" onClick={() => openOrderDetails(value)}>
            {t('messages.viewDetails')}
        </Button>
    );

    return {
        field: 'orderDetails',
        headerName: 'products',
        minWidth: 150,
        renderCell,
    };
};

export default useOrderProductsColumn;
