import { useMemo, useState } from 'react';
import { useField } from 'formik';
import { Icon } from '@iconify/react';

import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import useLang from '@/hooks/i18n/useLang';
import { useForm } from '@/shared/contexts/FormContext';

const FormikIcon = ({ name = 'icon', label, iconGroups = [] }) => {
    const { namespace } = useForm();
    const { t } = useLang(namespace);
    const [field, , helpers] = useField(name);

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredGroups = useMemo(() => {
        const value = search.trim().toLowerCase();

        return iconGroups
            .map((group) => {
                const icons = group.icons.filter((icon) => {
                    const label = t(`icons.${icon.id}`).toLowerCase();

                    return icon.id.toLowerCase().includes(value) || label.includes(value);
                });

                return {
                    ...group,
                    icons,
                };
            })
            .filter((group) => group.icons.length > 0);
    }, [search, t]);

    const selectedIcon = useMemo(() => {
        for (const group of iconGroups) {
            const found = group.icons.find((i) => i.id === field.value);
            if (found) return found;
        }
        return null;
    }, [field.value]);

    return (
        <>
            <TextField
                fullWidth
                label={t(name || label)}
                value={selectedIcon ? t(`icons.${selectedIcon.id}`) : ''}
                onClick={() => setOpen(true)}
                slotProps={{
                    input: {
                        readOnly: true,
                        startAdornment: selectedIcon && (
                            <InputAdornment position="start">
                                <Icon icon={selectedIcon.icon} width={22} />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {t('messages.selectIcon', { ns: 'common' })}
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('search', { ns: 'common' })}
                        sx={{ mb: 2 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {filteredGroups.map((group) => (
                        <Box key={group.id} sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    mb: 1,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    color: 'text.secondary',
                                }}
                            >
                                {t(`groups.${group.id}`)}
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
                                    gap: 1,
                                }}
                            >
                                {group.icons.map((icon) => {
                                    const selected = field.value === icon.id;

                                    return (
                                        <Tooltip key={icon.id} title={t(`icons.${icon.id}`)} arrow>
                                            <Box
                                                onClick={() => {
                                                    helpers.setValue(icon.id);
                                                    setOpen(false);
                                                }}
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    transition: '.15s',

                                                    bgcolor: selected
                                                        ? 'primary.main'
                                                        : 'transparent',

                                                    color: selected
                                                        ? 'primary.contrastText'
                                                        : 'text.primary',

                                                    '&:hover': {
                                                        bgcolor: selected
                                                            ? 'primary.dark'
                                                            : 'action.hover',
                                                    },
                                                }}
                                            >
                                                <Icon icon={icon.icon} width={28} />
                                            </Box>
                                        </Tooltip>
                                    );
                                })}
                            </Box>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormikIcon;
