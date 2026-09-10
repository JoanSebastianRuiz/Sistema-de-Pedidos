import useLang from '@/hooks/i18n/useLang';
import { Chip, useTheme } from '@mui/material';

const useOrderStatusColumn = () => {
    const { t } = useLang('orders');

    const theme = useTheme();
    const statusList = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];

    const statusColors = {
        pending: theme.palette.warning.main,
        confirmed: theme.palette.info.main,
        preparing: theme.palette.info.main,
        ready: theme.palette.success.main,
        delivered: theme.palette.success.main,
        cancelled: theme.palette.error.main,
    };

    const statusOptions = statusList.map((status) => ({
        value: status,
        label: t(`statusOptions.${status}`),
    }));

    const renderCell = ({ row }) => {
        const status = row.status;
        const color = statusColors[status] || theme.palette.text.primary;

        return <Chip label={t(`statusOptions.${status}`)} sx={{ backgroundColor: color }} />;
    };

    return {
        field: 'status',
        minWidth: 120,
        type: 'singleSelect',
        valueOptions: statusOptions,
        renderCell,
    };
};

export default useOrderStatusColumn;
