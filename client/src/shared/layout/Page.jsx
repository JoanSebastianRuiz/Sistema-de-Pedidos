import { Box } from '@mui/material';
import Loading from '../components/Loading';
import PageContent from './PageContent';
import PageHeader from './PageHeader';

const Page = ({ children, loading }) => {
    if (loading) {
        return <Loading />;
    }
    return (
        <Box component="main" sx={{ p: 3 }}>
            {children}
        </Box>
    );
};

Page.Header = PageHeader;
Page.Content = PageContent;

export default Page;
