import Table from '@/shared/components/table/Table';
import OrderDetailsDialog from './OrderDetailsDialog';
import { useAuthStore } from '@/store/auth.store';

const OrdersTable = () => {
    const { user } = useAuthStore();
    const role = user?.role;

    const extraActions = [
        {
            id: 'updateStatus',
            icon: <Edit fontSize="small" />,
            color: 'primary.main',
            onClick: onEdit,
            permission: role === 'admin',
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
