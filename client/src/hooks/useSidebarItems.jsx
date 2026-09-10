import { Fastfood, Receipt } from '@mui/icons-material';
import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth.store';

const useSidebarItems = () => {
    const { user } = useAuthStore();
    const role = user?.role;

    const items = useMemo(
        () => [
            {
                id: 'orders',
                label: 'orders',
                icon: <Receipt />,
                path: '/orders',
            },
            {
                id: 'products',
                label: 'products',
                icon: <Fastfood />,
                path: '/products',
                roles: ['admin'],
            },
        ],
        []
    );

    const filterItems = (items) => {
        return items
            .filter((item) => !item.roles || item.roles.includes(role))
            .map((item) => ({
                ...item,
                children: item.children ? filterItems(item.children) : undefined,
            }));
    };

    return useMemo(() => filterItems(items), [items, role]);
};

export default useSidebarItems;
