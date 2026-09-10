import OrdersForm from '@/features/orders/components/OrdersForm';
import useOrdersColumns from '@/features/orders/hooks/columns/useOrdersColumns';
import useOrdersQuery from '@/features/orders/hooks/useOrdersQuery';
import useOrdersSchema from '@/features/orders/schemas/useOrdersSchema';
import { orderService } from '@/features/orders/services/orders.service';

const orders = {
    useQuery: useOrdersQuery,
    useColumns: useOrdersColumns,
    useSchema: useOrdersSchema,

    service: orderService,
    form: OrdersForm,

    initialValues: {
        orderDetails: [],
    },

    permissions: {
        client: ['create'],
    },

    transformers: {
        normalizeValues: (values) => {
            const normalizedValues = {
                orderDetails: values.orderDetails.map((detail) => ({
                    productId: detail.productId,
                    quantity: detail.quantity,
                })),
            };
            return normalizedValues;
        },
    },
};

export default orders;
