import AuthGuard from '../auth/guards/AuthGuard';
import MainLayout from '@/layouts/MainLayout';
import OrdersPage from './pages/OrdersPage';

export const orderRoutes = [
    {
        element: <AuthGuard permissions={[]} />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: '/orders',
                        element: <OrdersPage />,
                    },
                ],
            },
        ],
    },
];
