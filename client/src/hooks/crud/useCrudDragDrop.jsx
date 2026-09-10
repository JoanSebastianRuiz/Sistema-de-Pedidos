import crudRegistry from '@/crud/crudRegistry';
import { useState } from 'react';
import { useCrudMutations } from './useCrudMutations';
import { Delete, Edit } from '@mui/icons-material';
import DragDropItemActions from '@/shared/components/dragDrop/DragDropItemActions';

const useCrudDragDrop = ({ id, moduleName, extraItemActions = [] }) => {
    const config = crudRegistry[moduleName];
    const crudMutations = useCrudMutations(config.service, moduleName);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        row: null,
    });

    const { useQuery, useQueryById, useSchema } = config;
    const { getItemsById } = config.transformers || {};

    const validationSchema = useSchema();
    const queryResult = id ? useQueryById({ id }) : useQuery();
    const data = id && getItemsById ? getItemsById(queryResult.data) : queryResult.data;
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

    const permissions = {
        create: config.permissions?.CREATE.key,
        update: config.permissions?.UPDATE.key,
        delete: config.permissions?.DELETE.key,
    };

    const itemActions = [
        ...extraItemActions,
        {
            id: 'update',
            icon: <Edit fontSize="small" />,
            color: 'primary.main',
            onClick: onEdit,
            permission: permissions?.update,
        },
        {
            id: 'delete',
            icon: <Delete fontSize="small" color="error" />,
            color: 'error.main',
            onClick: onDeleteRequest,
            permission: permissions?.delete,
        },
    ];

    return {
        data,
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
        permissions,
        slots: {
            ...(config.slots || {}),
            itemActions: DragDropItemActions,
        },
        slotProps: {
            ...(config.slotProps || {}),
            itemActions: { actions: itemActions },
        },

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

export default useCrudDragDrop;
