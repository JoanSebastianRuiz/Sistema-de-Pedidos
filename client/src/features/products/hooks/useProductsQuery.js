import { queryKeys } from '@/lib/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/products.service';

export const useProductsQuery = () => {
    return useQuery({
        queryKey: queryKeys.products,
        queryFn: productService.getAll,
    });
};
