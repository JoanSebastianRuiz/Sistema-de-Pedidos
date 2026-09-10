import useLang from '@/hooks/i18n/useLang';
import { Person } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarUser = () => {
    const navigate = useNavigate();
    const { t } = useLang('auth');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenLang = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (route) => {
        navigate(route);
        handleClose();
    };

    const menuItems = [
        { label: t('updatePassword'), route: '/update-password' },
        { label: t('updatePersonalInformation'), route: '/update-personal-information' },
        { label: t('updateContactInformation'), route: '/update-contact-information' },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
            }}
        >
            <IconButton color="inherit" onClick={handleOpenLang}>
                <Person />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {menuItems.map((item) => (
                    <MenuItem key={item.route} onClick={() => handleClick(item.route)}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default NavbarUser;
