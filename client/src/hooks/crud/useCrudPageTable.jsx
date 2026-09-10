import crudRegistry from '@/crud/crudRegistry';
import { useState } from 'react';
import useActionsColumn from './UseActionsColumn';
import { useCrudMutations } from './useCrudMutations';
import { useNavigate } from 'react-router-dom';

const useCrudPageTable = ({ moduleName, extraActions = [] }) => {
    const navigate = useNavigate();
    const config = crudRegistry[moduleName];
    const crudMutations = useCrudMutations(config.service, moduleName);

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        row: null,
    });

    const { useQuery, useColumns, useSchema } = config;

    const queryResult = useQuery();
    const data = queryResult.data || [];
    const deleteMutation = crudMutations.delete;

    const onCreate = () => {
        navigate(config.routes.create);
    };

    const onEdit = (row) => {
        navigate(config.routes.update(row.id));
    };

    const onDeleteRequest = (row) => {
        setConfirmDelete({
            open: true,
            row,
        });
    };

    const onDeleteConfirm = async () => {
        if (confirmDelete.row) {
            await deleteMutation.mutateAsync(confirmDelete.row.id);
        }

        setConfirmDelete({
            open: false,
            row: null,
        });
    };

    const onDeleteCancel = () => {
        setConfirmDelete({
            open: false,
            row: null,
        });
    };

    const baseColumns = useColumns({ onEdit });
    const permissions = {
        create: config.permissions?.CREATE.key,
        update: config.permissions?.UPDATE.key,
        delete: config.permissions?.DELETE.key,
    };

    const actionsColumn = useActionsColumn({
        onEdit,
        onDeleteRequest,
        permissions,
        extraActions,
    });

    const columns = actionsColumn ? [...baseColumns, actionsColumn] : baseColumns;

    return {
        data,
        columns,
        namespace: moduleName,
        titles: {
            create: 'messages.create',
            update: 'messages.update',
        },
        loading: queryResult.isLoading,
        permissions,

        state: {
            confirmDelete,
        },

        actions: {
            onCreate,
            onDeleteConfirm,
            onDeleteCancel,
        },
    };
};

export default useCrudPageTable;
