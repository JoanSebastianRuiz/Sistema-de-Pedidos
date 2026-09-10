import Page from '@/shared/layout/Page';
import ProductsTable from '../components/table/ProductsTable';

const ProductsPage = () => {
    const breadcrumbs = [
        {
            id: 'products',
            label: 'menu.products',
        },
    ];

    const components = [
        {
            id: 'productsTable',
            component: ProductsTable,
        },
    ];

    return (
        <Page>
            <Page.Header title="menu.products" breadcrumbs={breadcrumbs} />
            <Page.Content components={components} />
        </Page>
    );
};

export default ProductsPage;
