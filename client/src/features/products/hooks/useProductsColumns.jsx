import useFormattedColumns from '@/hooks/table/useFormattedColumns';
import { useUpdateProductStatusMutation } from './mutations/useUpdateProductStatusMutation';
import useStatusColumn from '../../../hooks/table/columns/useStatusColumn';
import useTooltipColumn from '@/hooks/table/columns/useTooltipColumn';
import useMoneyColumn from '@/hooks/table/columns/useMoneyColumn';

const useProductsColumns = () => {
    const priceColumn = useMoneyColumn({ field: 'price' });
    const descriptionColumn = useTooltipColumn({ field: 'description' });
    const statusColumn = useStatusColumn({ useUpdateStatus: useUpdateProductStatusMutation });

    const columns = [statusColumn, { field: 'name' }, descriptionColumn, priceColumn];
    return useFormattedColumns({ columns, namespace: 'products' });
};

export default useProductsColumns;
