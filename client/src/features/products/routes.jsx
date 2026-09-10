import MainLayout from '@/layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import AuthGuard from '../auth/guards/AuthGuard';

export const productRoutes = [
    {
        element: <AuthGuard roles={['admin']} />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: '/products',
                        element: <ProductsPage />,
                    },
                ],
            },
        ],
    },
];
