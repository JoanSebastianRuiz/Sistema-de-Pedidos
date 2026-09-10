import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useSidebarStore } from '@/store/sidebar.store';
import { useTheme } from '@emotion/react';
import { Menu } from '@mui/icons-material';
import { Box, CardMedia, IconButton } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import NavbarLanguage from './NavbarLanguage';
import NavbarUser from './NavbarUser';

const Navbar = () => {
    const theme = useTheme();
    const isUpLg = useMediaQuery(theme.breakpoints.up('lg'));
    const { toggleSidebar } = useSidebarStore();
    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{ backgroundColor: theme.palette.primary.main }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {!isUpLg && (
                        <IconButton color="inherit" onClick={toggleSidebar}>
                            <Menu />
                        </IconButton>
                    )}

                    <CardMedia
                        component="img"
                        src="/static/img/logo/logo.svg"
                        alt="Logo"
                        sx={{ height: 32, width: 'auto' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <NavbarUser />
                    <NavbarLanguage />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
