import useLang from '@/hooks/i18n/useLang';
import { AddCircle } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import ConfirmDeleteDialog from '../dialog/ConfirmDeleteDialog';
import Table from '../Table';
import useCrudPageTable from '@/hooks/crud/useCrudPageTable';
import { useAuthStore } from '@/store/auth.store';

const TableCrudPage = ({ moduleName, extraActions, ...props }) => {
    const { data, columns, loading, titles, namespace, state, actions, permissions } =
        useCrudPageTable({ moduleName, extraActions });

    const { user } = useAuthStore();
    const { t } = useLang(namespace);
    const { onCreate } = actions;

    const userPermissions = permissions[user?.role] || [];

    return (
        <>
            <Table
                data={data}
                columns={columns}
                loading={loading}
                toolbarActions={
                    userPermissions.includes('create') && (
                        <Tooltip title={t(titles.create)}>
                            <IconButton onClick={onCreate}>
                                <AddCircle color="primary" />
                            </IconButton>
                        </Tooltip>
                    )
                }
                fileName={t(`menu.${namespace}`, { ns: 'common' })}
                {...props}
            />

            <ConfirmDeleteDialog open={state.confirmDelete.open} actions={actions} />
        </>
    );
};

export default TableCrudPage;
