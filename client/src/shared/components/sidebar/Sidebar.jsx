import { Box, Collapse, Drawer, List, useTheme } from '@mui/material';

import useSidebarItems from '@/hooks/useSidebarItems';
import { useSidebarStore } from '@/store/sidebar.store';
import { useMediaQuery } from '@mui/system';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SIDEBAR_WIDTH } from '../../utils/constants';
import SidebarItem from './SidebarItem';
import SidebarLogout from './SidebarLogout';

const Sidebar = () => {
    const theme = useTheme();
    const location = useLocation();
    const items = useSidebarItems();
    const isUpLg = useMediaQuery(theme.breakpoints.up('lg'));

    const { open, toggleSidebar } = useSidebarStore();
    const [openMenus, setOpenMenus] = useState({});

    const handleClose = () => {
        toggleSidebar();
    };

    const handleToggle = (key) => {
        setOpenMenus((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const isRouteActive = (item) => {
        if (item.path && location.pathname === item.path) {
            return true;
        }

        return false;
    };

    const handleItemClick = (item, hasChildren) => () => {
        if (hasChildren) {
            handleToggle(item.label);
        } else {
            handleClose();
        }
    };

    const renderMenuItems = (items, level = 0) => {
        return items.map((item) => {
            const hasChildren = !!item.children?.length;

            const isOpen = openMenus[item.label];

            const isActive = isRouteActive(item);

            return (
                <Box key={item.id}>
                    <SidebarItem
                        item={item}
                        level={level}
                        isOpen={isOpen}
                        isActive={isActive}
                        hasChildren={hasChildren}
                        onClick={handleItemClick(item, hasChildren)}
                    />

                    {hasChildren && (
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <List disablePadding>{renderMenuItems(item.children, level + 1)}</List>
                        </Collapse>
                    )}
                </Box>
            );
        });
    };

    if (isUpLg) {
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 64,
                    width: SIDEBAR_WIDTH,
                    bottom: 0,
                    zIndex: 1200,
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        py: 1,
                    }}
                >
                    <List>{renderMenuItems(items)}</List>
                </Box>

                <SidebarLogout />
            </Box>
        );
    }

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={handleClose}
            variant="temporary"
            sx={{
                '& .MuiDrawer-paper': {
                    width: SIDEBAR_WIDTH,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    py: 2,
                }}
            >
                <List>{renderMenuItems(items)}</List>
            </Box>

            <SidebarLogout />
        </Drawer>
    );
};

export default Sidebar;
