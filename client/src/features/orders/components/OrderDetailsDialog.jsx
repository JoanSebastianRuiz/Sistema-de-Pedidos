import Table from '@/shared/components/table/Table';
import { useOrdersStore } from '@/store/orders.store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import useOrderDetailsColumns from '../hooks/columns/useOrderDetailsColumns';
import useLang from '@/hooks/i18n/useLang';

const OrderDetailsDialog = () => {
    const columns = useOrderDetailsColumns();

    const { t } = useLang('orders');
    const { openOrderDetailsDialog, closeOrderDetails, selectedOrderDetails } = useOrdersStore();

    return (
        <Dialog open={openOrderDetailsDialog} onClose={closeOrderDetails} fullWidth maxWidth="sm">
            <DialogTitle>{t('products')}</DialogTitle>

            <DialogContent>
                <Table data={selectedOrderDetails} columns={columns} disableExport />
            </DialogContent>

            <DialogActions>
                <Button onClick={closeOrderDetails}>{t('close', { ns: 'common' })}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetailsDialog;
