import { useState } from 'react';

import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import { FileDownload, PictureAsPdf, TableView, Description } from '@mui/icons-material';

import useLang from '@/hooks/i18n/useLang';
import useCsvExport from '@/hooks/export/useCsvExport';
import useExcelExport from '@/hooks/export/useExcelExport';
import usePdfExport from '@/hooks/export/usePdfExport';

import {
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnDefinitionsSelector,
} from '@mui/x-data-grid';
import { useSnackbarStore } from '@/store/snackbar.store';

const ExportButton = ({ apiRef, fileName = 'export' }) => {
    const { t } = useLang();
    const { showSnackbar } = useSnackbarStore();

    const [anchorEl, setAnchorEl] = useState(null);

    const getExportConfig = () => {
        if (!apiRef?.current) {
            return {
                columns: [],
                rows: [],
                data: [],
            };
        }

        const columns = gridVisibleColumnDefinitionsSelector(apiRef).filter(
            (column) => !column.disableExport
        );

        const rowIds = gridFilteredSortedRowIdsSelector(apiRef);

        const rows = rowIds.map((id) => apiRef.current.getRow(id));

        const data = rows.map((row) => {
            const rowData = {};

            columns.forEach((column) => {
                const params = apiRef.current.getCellParams(row.id, column.field);

                rowData[column.headerName || column.field] =
                    params.formattedValue ?? params.value ?? '';
            });

            return rowData;
        });

        return {
            columns,
            rows,
            data,
        };
    };

    const pdfExport = usePdfExport();
    const csvExport = useCsvExport();
    const excelExport = useExcelExport();

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const afterExport = () => {
        handleClose();
        showSnackbar({
            message: t('messages.exportedSuccessfully'),
            severity: 'success',
        });
    };

    const handleCsvExport = () => {
        const exportConfig = getExportConfig();

        csvExport({
            data: exportConfig.data,
            fileName,
        });

        afterExport();
    };

    const handleExcelExport = () => {
        const exportConfig = getExportConfig();

        excelExport({
            data: exportConfig.data,
            fileName,
        });

        afterExport();
    };

    const handlePdfExport = () => {
        try {
            const exportConfig = getExportConfig();

            pdfExport({
                apiRef,
                columns: exportConfig.columns,
                rows: exportConfig.rows,
                fileName,
            });

            afterExport();
        } catch (error) {
            showSnackbar({
                message: t('errors.exportError'),
                severity: 'error',
            });
        }
    };

    const menuItems = [
        {
            label: 'Excel (.xlsx)',
            icon: <TableView fontSize="small" />,
            onClick: handleExcelExport,
        },
        {
            label: 'CSV (.csv)',
            icon: <Description fontSize="small" />,
            onClick: handleCsvExport,
        },
        {
            label: 'PDF (.pdf)',
            icon: <PictureAsPdf fontSize="small" />,
            onClick: handlePdfExport,
        },
    ];

    return (
        <>
            <Tooltip title={t('export')}>
                <IconButton onClick={handleOpen}>
                    <FileDownload color="primary" />
                </IconButton>
            </Tooltip>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {menuItems.map((item) => (
                    <MenuItem key={item.label} onClick={item.onClick}>
                        <ListItemIcon>{item.icon}</ListItemIcon>

                        <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ExportButton;
