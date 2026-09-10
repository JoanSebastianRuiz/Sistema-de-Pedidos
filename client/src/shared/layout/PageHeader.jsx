import { useState } from 'react';

import {
    Badge,
    Button,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';

import { FilterList } from '@mui/icons-material';
import CustomBreadcrumbs from './CustomBreadcrumbs';
import useLang from '@/hooks/i18n/useLang';
import FiltersDrawer from './filters/FiltersDrawer';
import { useFilters } from '@/hooks/filters/useFilters';

const PageHeader = ({ title, namespace, breadcrumbs, filterDefinitions }) => {
    const { t, i18n } = useLang(namespace);
    const { filters, setFilter, resetFilters } = useFilters(filterDefinitions);
    const [openFilters, setOpenFilters] = useState(false);

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const hasFilters = Array.isArray(filterDefinitions) && filterDefinitions.length > 0;

    const activeFiltersCount = Object.values(filters).filter((value) => {
        return (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            (!Array.isArray(value) || value.length > 0)
        );
    }).length;

    return (
        <>
            <Grid container direction="column" spacing={2} sx={{ mb: 3 }}>
                <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                    <Typography variant="h4">
                        {i18n.exists(title, { ns: namespace }) ? t(title) : title}
                    </Typography>

                    {hasFilters && (
                        <Badge
                            color="primary"
                            badgeContent={activeFiltersCount}
                            invisible={activeFiltersCount === 0}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '& .MuiBadge-badge': {
                                    top: 6,
                                    right: 6,
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <Tooltip title={t('filters')} arrow>
                                <IconButton
                                    color="primary"
                                    onClick={() => setOpenFilters(true)}
                                    size="large"
                                >
                                    <FilterList />
                                </IconButton>
                            </Tooltip>
                        </Badge>
                    )}
                </Grid>

                <Grid>
                    <Divider />
                </Grid>

                <Grid>
                    <CustomBreadcrumbs
                        maxItems={isDownSm ? 3 : 4}
                        breadcrumbs={breadcrumbs}
                        namespace={namespace}
                    />
                </Grid>
            </Grid>

            {hasFilters && (
                <FiltersDrawer
                    open={openFilters}
                    setOpen={setOpenFilters}
                    filters={filters}
                    setFilter={setFilter}
                    resetFilters={resetFilters}
                    definitions={filterDefinitions}
                />
            )}
        </>
    );
};

export default PageHeader;
