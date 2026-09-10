import ProductsForm from '@/features/products/components/form/ProductsForm';
import { useProductsQuery } from '@/features/products/hooks/useProductsQuery';
import useProductsColumns from '@/features/products/hooks/useProductsColumns';
import useProductsSchema from '@/features/products/schemas/useProductsSchema';
import { productService } from '@/features/products/services/products.service';

const products = {
    useQuery: useProductsQuery,
    useColumns: useProductsColumns,
    useSchema: useProductsSchema,

    service: productService,
    form: ProductsForm,

    initialValues: {
        name: '',
        description: '',
        price: 0,
    },

    permissions: {
        admin: ['create', 'update', 'delete'],
    },

    transformers: {
        updateValues: (values) => {
            return {
                ...values,
                isActive: undefined,
            };
        },
    },
};

export default products;
