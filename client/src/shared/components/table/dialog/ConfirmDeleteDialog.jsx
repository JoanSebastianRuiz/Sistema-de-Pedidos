import ConfirmDialog from '../../dialog/ConfirmDialog';

const ConfirmDeleteDialog = ({ open, actions }) => {
    const { onDeleteConfirm, onDeleteCancel } = actions;

    return (
        <ConfirmDialog
            open={open}
            translationKeys={{
                title: 'confirmDelete.title',
                content: 'confirmDelete.content',
                confirm: 'delete',
            }}
            confirmColor="error"
            onCancel={onDeleteCancel}
            onConfirm={onDeleteConfirm}
        />
    );
};

export default ConfirmDeleteDialog;
