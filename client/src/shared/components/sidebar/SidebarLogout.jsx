import { useLogoutMutation } from '@/features/auth/hooks/mutations/useLogoutMutation';
import useLang from '@/hooks/i18n/useLang';
import { useSidebarStore } from '@/store/sidebar.store';
import { useTheme } from '@emotion/react';
import { Logout } from '@mui/icons-material';
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const SidebarLogout = () => {
    const theme = useTheme();
    const { t } = useLang();
    const { mutateAsync } = useLogoutMutation();
    const { toggleSidebar } = useSidebarStore();

    const handleLogout = async () => {
        await mutateAsync();
        toggleSidebar();
    };
    return (
        <Box
            sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <ListItemButton
                onClick={handleLogout}
                sx={{
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 40,
                        color: theme.palette.error.main,
                    }}
                >
                    <Logout />
                </ListItemIcon>

                <ListItemText
                    primary={t('logout')}
                    slotProps={{
                        primary: {
                            color: 'error',
                        },
                    }}
                />
            </ListItemButton>
        </Box>
    );
};

export default SidebarLogout;
