import crudRegistry from '@/crud/crudRegistry';
import { useState } from 'react';
import useActionsColumn from './UseActionsColumn';
import { useCrudMutations } from './useCrudMutations';

const useCrudDrawer = ({ moduleName, extraActions = [] }) => {
    const config = crudRegistry[moduleName];
    const crudMutations = useCrudMutations(config.service, moduleName);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        row: null,
    });

    const { useQuery, useColumns, useSchema } = config;

    const validationSchema = useSchema();
    const queryResult = useQuery();
    const data = queryResult.data || [];
    const deleteMutation = crudMutations.delete;

    const onCreate = () => {
        setSelected(null);
        setOpen(true);
    };

    const onEdit = (row) => {
        setSelected(row);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setSelected(null);
    };

    const onAfterSubmit = () => {
        onClose();
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

    const actionsColumn = useActionsColumn({
        onEdit,
        onDeleteRequest,
        permissions: config.permissions,
        extraActions,
    });

    const columns = actionsColumn ? [...baseColumns, actionsColumn] : baseColumns;

    return {
        data,
        columns,
        validationSchema,
        form: config.form,
        namespace: moduleName,
        titles: {
            create: 'messages.create',
            update: 'messages.update',
        },
        loading: queryResult.isLoading,
        initialValues: config.initialValues,
        mutations: crudMutations,
        transformers: config.transformers,
        permissions: config.permissions,

        state: {
            open,
            selected,
            confirmDelete,
        },

        actions: {
            onCreate,
            onClose,
            onDeleteConfirm,
            onDeleteCancel,
            onAfterSubmit,
        },
    };
};

export default useCrudDrawer;
