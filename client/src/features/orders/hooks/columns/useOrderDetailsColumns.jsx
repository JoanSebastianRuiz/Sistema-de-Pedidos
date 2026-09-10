import useMoneyColumn from '@/hooks/table/columns/useMoneyColumn';
import useObjectColumn from '@/hooks/table/columns/useObjectColumn';
import useFormattedColumns from '@/hooks/table/useFormattedColumns';

const useOrderDetailsColumns = () => {
    const productColumn = useObjectColumn({ field: 'product' });
    const unitPriceColumn = useMoneyColumn({ field: 'unitPrice' });
    const subtotalColumn = useMoneyColumn({ field: 'subtotal' });

    const columns = [
        productColumn,
        { field: 'quantity', type: 'number', minWidth: 100 },
        unitPriceColumn,
        subtotalColumn,
    ];

    return useFormattedColumns({ columns, namespace: 'orders' });
};

export default useOrderDetailsColumns;
