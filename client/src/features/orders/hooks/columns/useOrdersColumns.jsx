import useMoneyColumn from '@/hooks/table/columns/useMoneyColumn';
import useObjectColumn from '@/hooks/table/columns/useObjectColumn';
import useFormattedColumns from '@/hooks/table/useFormattedColumns';
import useIsAdmin from '@/hooks/validations/useIsAdmin';
import useOrderStatusColumn from './useOrderStatusColumn';
import useOrderProductsColumn from './useOrderProductsColumn';

const useOrdersColumns = () => {
    const isSuperAdmin = useIsAdmin();
    const statusColumn = useOrderStatusColumn();
    const userColumn = useObjectColumn({ field: 'user' });
    const totalColumn = useMoneyColumn({ field: 'total' });
    const productsColumn = useOrderProductsColumn();

    const columns = [
        { field: 'id', minWidth: 60 },
        { field: 'date', type: 'date', minWidth: 120, valueGetter: (value) => new Date(value) },
        isSuperAdmin && userColumn,
        statusColumn,
        totalColumn,
        productsColumn,
    ];

    return useFormattedColumns({ columns, namespace: 'orders' });
};

export default useOrdersColumns;
