import { useAuthStore } from '@/store/auth.store';
import { Delete, Edit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import useLang from '../i18n/useLang';
import useFormattedColumns from '../table/useFormattedColumns';

const useActionsColumn = ({ onEdit, onDeleteRequest, permissions = {}, extraActions = [] }) => {
    const { t } = useLang();
    const { user } = useAuthStore();
    const role = user?.role;
    const userPermissions = permissions[role]?.filter((p) => p !== 'create') || [];

    if (userPermissions.length === 0 && extraActions.length === 0) {
        console.log('No permissions for actions column');
        return null;
    }

    const buttonConfigs = [
        ...extraActions,
        {
            id: 'update',
            icon: <Edit fontSize="small" />,
            color: 'primary.main',
            onClick: onEdit,
            permission: userPermissions.includes('update'),
        },
        {
            id: 'delete',
            icon: <Delete fontSize="small" color="error" />,
            color: 'error.main',
            onClick: onDeleteRequest,
            permission: userPermissions.includes('delete'),
        },
    ];

    const minWidth = buttonConfigs.filter((button) => !button.permission).length * 48;

    const column = {
        field: ' ',
        type: 'actions',
        minWidth,
        disableExport: true,
        getActions: ({ row }) =>
            buttonConfigs
                .map((button) => {
                    const hasPermission =
                        typeof button.permission === 'function'
                            ? button.permission(row)
                            : button.permission;

                    if (!hasPermission) {
                        return null;
                    }

                    return (
                        <GridActionsCellItem
                            key={button.id}
                            icon={
                                <Tooltip title={t(button.id)} arrow>
                                    {button.icon}
                                </Tooltip>
                            }
                            label={t(button.id)}
                            onClick={() => button.onClick(row)}
                            sx={{
                                color: button.color,
                            }}
                        />
                    );
                })
                .filter(Boolean),
    };

    const [actionsColum] = useFormattedColumns({
        columns: [column],
    });

    return actionsColum;
};

export default useActionsColumn;
