import { productService } from '../../services/products.service';
import { useUpdateStatusMutation } from '@/hooks/mutations/useUpdateStatusMutation';

export const useUpdateProductStatusMutation = () =>
    useUpdateStatusMutation({
        moduleName: 'products',
        service: productService,
    });
