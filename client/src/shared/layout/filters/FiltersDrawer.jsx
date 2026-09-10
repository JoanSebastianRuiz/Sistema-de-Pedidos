import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import FilterRenderer from './FilterRenderer';
import useLang from '@/hooks/i18n/useLang';
import { RestartAlt } from '@mui/icons-material';

const FiltersDrawer = ({ open, setOpen, definitions, filters, setFilter, resetFilters }) => {
    const { t } = useLang();

    const hasActiveFilters = Object.values(filters).some((value) => {
        return (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            (!Array.isArray(value) || value.length > 0)
        );
    });

    return (
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Box
                sx={{
                    width: {
                        xs: '100vw',
                        sm: 300,
                    },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 2, minHeight: 80 }}
                >
                    <Typography variant="h6">{t('filters')}</Typography>

                    {hasActiveFilters && (
                        <IconButton color="error" onClick={resetFilters}>
                            <Tooltip title={t('clear')} arrow>
                                <RestartAlt />
                            </Tooltip>
                        </IconButton>
                    )}
                </Stack>

                <Divider />

                <Box
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: 2,
                    }}
                >
                    <Stack spacing={2}>
                        {definitions.map((filter) => (
                            <FilterRenderer
                                key={filter.name}
                                definition={filter}
                                value={filters[filter.name]}
                                setFilter={setFilter}
                            />
                        ))}
                    </Stack>
                </Box>

                <Divider />

                <Box sx={{ p: 2 }}>
                    <Button fullWidth variant="contained" onClick={() => setOpen(false)}>
                        {t('apply')}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default FiltersDrawer;
