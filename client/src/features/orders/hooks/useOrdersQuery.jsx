import { queryKeys } from '@/lib/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '../services/orders.service';

export const useOrdersQuery = () => {
    return useQuery({
        queryKey: queryKeys.orders,
        queryFn: orderService.getAll,
    });
};

export default useOrdersQuery;
