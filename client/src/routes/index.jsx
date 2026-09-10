import { authRoutes } from '@/features/auth/routes';
import { orderRoutes } from '@/features/orders/routes';
import { productRoutes } from '@/features/products/routes';

const routes = [...authRoutes, ...orderRoutes, ...productRoutes];

export default routes;
