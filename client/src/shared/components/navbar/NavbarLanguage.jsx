import useLang from '@/hooks/i18n/useLang';
import { Box, CardMedia, IconButton, Menu, MenuItem } from '@mui/material';
import { useMemo, useState } from 'react';

const NavbarLanguage = () => {
    const { t, language, changeLanguage } = useLang();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenLang = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorEl(null);
    };

    const handleChangeLang = (lang) => {
        changeLanguage(lang);
        handleCloseLang();
    };

    const flagImage = useMemo(() => {
        if (language.includes('en')) return '/static/img/flags/us.png';
        if (language.includes('es')) return '/static/img/flags/co.png';
        return '';
    });

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
            }}
        >
            <IconButton color="inherit" onClick={handleOpenLang}>
                <CardMedia
                    component="img"
                    image={flagImage}
                    alt={language}
                    sx={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseLang}>
                <MenuItem onClick={() => handleChangeLang('en')}>{t('languages.english')}</MenuItem>
                <MenuItem onClick={() => handleChangeLang('es')}>{t('languages.spanish')}</MenuItem>
            </Menu>
        </Box>
    );
};

export default NavbarLanguage;
