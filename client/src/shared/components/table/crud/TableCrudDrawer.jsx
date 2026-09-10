import useLang from '@/hooks/i18n/useLang';
import { AddCircle } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import FormDrawer from './FormDrawer';
import ConfirmDeleteDialog from '../dialog/ConfirmDeleteDialog';
import Table from '../Table';
import useCrudDrawer from '@/hooks/crud/useCrudDrawer';
import { useAuthStore } from '@/store/auth.store';

const TableCrudDrawer = ({ moduleName, extraActions, ...props }) => {
    const {
        data,
        columns,
        form,
        loading,
        titles,
        namespace,
        state,
        actions,
        initialValues,
        permissions = {},
        mutations,
        validationSchema,
        transformers,
    } = useCrudDrawer({ moduleName, extraActions });

    const { user } = useAuthStore();
    const { t } = useLang(namespace);
    const { onCreate } = actions;

    const role = user?.role;
    const userPermissions = permissions[role] || [];

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

            <FormDrawer
                state={state}
                form={form}
                titles={titles}
                namespace={namespace}
                initialValues={initialValues}
                actions={actions}
                mutations={mutations}
                validationSchema={validationSchema}
                transformers={transformers}
            />

            <ConfirmDeleteDialog open={state.confirmDelete.open} actions={actions} />
        </>
    );
};

export default TableCrudDrawer;
