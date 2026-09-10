import React from 'react';
import styled from '@emotion/styled';
import { Cancel, FilterList, Search, ViewColumn } from '@mui/icons-material';
import { Badge, Box, InputAdornment, TextField, Tooltip } from '@mui/material';
import {
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    QuickFilterTrigger,
    Toolbar,
    ToolbarButton,
} from '@mui/x-data-grid';
import useLang from '@/hooks/i18n/useLang';

const StyledQuickFilter = styled(QuickFilter)({
    display: 'grid',
    alignItems: 'center',
});

const StyledToolbarButton = styled(ToolbarButton)(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity']),
}));

const StyledTextField = styled(TextField)(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    opacity: ownerState.expanded ? 1 : 0,
    width: ownerState.expanded ? 200 : 'var(--trigger-width)',
    transition: theme.transitions.create(['width', 'opacity']),
    [theme.breakpoints.down('md')]: {
        width: ownerState.expanded ? 150 : 'var(--trigger-width)',
    },
}));

const CustomToolbar = ({ actions }) => {
    const { t } = useLang('table');

    return (
        <Toolbar
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
            }}
        >
            <Tooltip title={t('columns')}>
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <ViewColumn fontSize="small" />
                </ColumnsPanelTrigger>
            </Tooltip>

            <Tooltip title={t('filters')}>
                <FilterPanelTrigger
                    render={(props, state) => (
                        <ToolbarButton {...props} color="default">
                            <Badge
                                badgeContent={state.filterCount}
                                variant="dot"
                                slotProps={{
                                    badge: {
                                        'data-variant': 'filter-panel-trigger-badge',
                                    },
                                }}
                            >
                                <FilterList fontSize="small" />
                            </Badge>
                        </ToolbarButton>
                    )}
                />
            </Tooltip>

            {actions && <Box style={{ marginLeft: 'auto' }}>{actions}</Box>}

            <StyledQuickFilter>
                <QuickFilterTrigger
                    render={(triggerProps, state) => (
                        <Tooltip title={t('search')} enterDelay={0}>
                            <StyledToolbarButton
                                {...triggerProps}
                                ownerState={{
                                    expanded: state.expanded,
                                }}
                                color="default"
                                aria-disabled={state.expanded}
                            >
                                <Search fontSize="small" />
                            </StyledToolbarButton>
                        </Tooltip>
                    )}
                />

                <QuickFilterControl
                    render={({ ref, ...controlProps }, state) => (
                        <StyledTextField
                            {...controlProps}
                            ownerState={{
                                expanded: state.expanded,
                            }}
                            inputRef={ref}
                            aria-label="Search"
                            placeholder={`${t('search')}...`}
                            size="small"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search fontSize="small" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: state.value ? (
                                        <InputAdornment position="end">
                                            <QuickFilterClear
                                                edge="end"
                                                size="small"
                                                aria-label="Clear search"
                                                material={{
                                                    sx: {
                                                        marginRight: -0.75,
                                                    },
                                                }}
                                            >
                                                <Cancel fontSize="small" />
                                            </QuickFilterClear>
                                        </InputAdornment>
                                    ) : null,
                                    ...controlProps.slotProps?.input,
                                },
                                ...controlProps.slotProps,
                            }}
                        />
                    )}
                />
            </StyledQuickFilter>
        </Toolbar>
    );
};

export default CustomToolbar;
