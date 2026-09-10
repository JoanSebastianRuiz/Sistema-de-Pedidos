import Page from '@/shared/layout/Page';
import OrdersTable from '../components/OrdersTable';

const OrdersPage = () => {
    const breadcrumbs = [
        {
            id: 'orders',
            label: 'menu.orders',
        },
    ];

    const components = [
        {
            id: 'ordersTable',
            component: OrdersTable,
        },
    ];

    return (
        <Page>
            <Page.Header title="menu.orders" breadcrumbs={breadcrumbs} />
            <Page.Content components={components} />
        </Page>
    );
};

export default OrdersPage;
