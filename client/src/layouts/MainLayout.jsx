import Footer from '@/shared/components/Footer';
import GlobalSnackbar from '@/shared/components/GlobalSnackbar';
import Navbar from '@/shared/components/navbar/Navbar';
import Sidebar from '@/shared/components/sidebar/Sidebar';
import { SIDEBAR_WIDTH } from '@/shared/utils/constants';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                }}
            >
                <Navbar />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        ml: { xs: 0, lg: `${SIDEBAR_WIDTH}px` },
                    }}
                >
                    <Outlet />
                </Box>

                <Footer />
                <GlobalSnackbar />
            </Box>
        </Box>
    );
};

export default MainLayout;
