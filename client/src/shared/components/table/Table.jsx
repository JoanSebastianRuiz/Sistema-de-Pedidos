import { Grid } from '@mui/system';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Loading from '../Loading';
import useTableLocaleText from '@/hooks/table/useTableLocaleText';
import CustomToolbar from './components/CustomToolbar';
import TableCrudDrawer from './crud/TableCrudDrawer';
import TableCrudPage from './crud/TableCrudPage';
import ExportButton from './export/ExportButton';

const Table = ({
    data,
    columns,
    height = 400,
    loading,
    fileName,
    toolbarActions,
    disableExport = true,
    getDetailPanelContent,
}) => {
    const apiRef = useGridApiRef();
    const localeText = useTableLocaleText();
    if (loading) return <Loading />;

    return (
        <Grid sx={{ height }}>
            <DataGrid
                apiRef={apiRef}
                rows={data}
                columns={columns}
                localeText={localeText}
                getDetailPanelContent={getDetailPanelContent}
                slots={{
                    toolbar: CustomToolbar,
                }}
                slotProps={{
                    paper: {
                        elevation: 2,
                    },
                    toolbar: {
                        actions: (
                            <>
                                {toolbarActions}
                                {!disableExport && (
                                    <ExportButton apiRef={apiRef} fileName={fileName} />
                                )}
                            </>
                        ),
                    },
                }}
                showToolbar
                ignoreDiacritics
                hideFooterPagination
                disableRowSelectionOnClick
                disableMultipleRowSelection
            />
        </Grid>
    );
};

Table.CrudDrawer = TableCrudDrawer;
Table.CrudPage = TableCrudPage;

export default Table;
