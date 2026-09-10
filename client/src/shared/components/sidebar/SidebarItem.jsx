import { Badge, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import useLang from '@/hooks/i18n/useLang';

const SidebarItem = ({ item, level, isActive, onClick, hasChildren, isOpen }) => {
    const theme = useTheme();
    const { t } = useLang();
    return (
        <ListItemButton
            component={item.path ? Link : 'button'}
            to={item.path || undefined}
            onClick={onClick}
            sx={{
                pl: 2 + level * 2,
                pr: 2,
                mb: 0.5,
                width: '100%',

                display: 'flex',
                alignItems: 'center',

                backgroundColor: isActive ? theme.palette.action.selected : 'transparent',

                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
            }}
        >
            {item.icon && (
                <ListItemIcon
                    sx={{
                        minWidth: 36,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: theme.palette.text.primary,
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                </ListItemIcon>
            )}

            <ListItemText
                primary={t(`menu.${item.label}`)}
                sx={{
                    m: 0,
                }}
            />

            {item.count && !hasChildren && (
                <Badge
                    color="primary"
                    badgeContent={item.count}
                    invisible={item.count === 0}
                    slotProps={{
                        badge: {
                            sx: {
                                width: 25,
                                height: 25,
                                borderRadius: '100%',
                            },
                        },
                    }}
                />
            )}

            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
    );
};

export default SidebarItem;
