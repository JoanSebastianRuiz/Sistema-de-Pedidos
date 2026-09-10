import Table from '@/shared/components/table/Table';
import { useAuthStore } from '@/store/auth.store';
import { Cancel, Check, DoneAll, LocalShipping, SoupKitchen } from '@mui/icons-material';
import { useUpdateOrderStatusMutation } from '../hooks/mutations/useUpdateOrderStatusMutation';
import OrderDetailsDialog from './OrderDetailsDialog';

const OrdersTable = () => {
    const { user } = useAuthStore();
    const { mutateAsync } = useUpdateOrderStatusMutation();
    const role = user?.role;

    const updateStatus = (status) => async (row) => {
        await mutateAsync({ id: row.id, status });
    };

    const statusList = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];

    const extraActions = [
        {
            id: 'markAsConfirmed',
            icon: <Check fontSize="small" />,
            color: 'primary.main',
            onClick: updateStatus('confirmed'),
            permission: (row) => row.status === 'pending' && role === 'admin',
        },
        {
            id: 'markAsPreparing',
            icon: <SoupKitchen fontSize="small" />,
            color: 'primary.main',
            onClick: updateStatus('preparing'),
            permission: (row) => row.status === 'confirmed' && role === 'admin',
        },
        {
            id: 'markAsReady',
            icon: <DoneAll fontSize="small" />,
            color: 'primary.main',
            onClick: updateStatus('ready'),
            permission: (row) => row.status === 'preparing' && role === 'admin',
        },
        {
            id: 'markAsDelivered',
            icon: <LocalShipping fontSize="small" />,
            color: 'primary.main',
            onClick: updateStatus('delivered'),
            permission: (row) => row.status === 'ready' && role === 'admin',
        },
        {
            id: 'markAsCancelled',
            icon: <Cancel fontSize="small" />,
            color: 'error.main',
            onClick: updateStatus('cancelled'),
            permission: (row) => row.status === 'pending' && role === 'client',
        },
    ];

    return (
        <>
            <Table.CrudDrawer moduleName="orders" extraActions={extraActions} />
            <OrderDetailsDialog />
        </>
    );
};

export default OrdersTable;
