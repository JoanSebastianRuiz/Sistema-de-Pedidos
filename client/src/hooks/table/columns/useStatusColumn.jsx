import useLang from '@/hooks/i18n/useLang';
import StatusSwitch from '@/shared/components/StatusSwitch';

const useStatusColumn = ({ useUpdateStatus }) => {
    const { t } = useLang();
    const { mutateAsync, isPending } = useUpdateStatus();

    const handleStatusChange = async (id, isActive) => {
        await mutateAsync({
            id,
            isActive: !isActive,
        });
    };

    const statusValueFormatter = (value) => {
        return value ? t('active') : t('inactive');
    };

    const statusRenderCell = ({ row }) => (
        <StatusSwitch
            checked={row.isActive}
            onChange={() => handleStatusChange(row.id, row.isActive)}
            disabled={isPending}
        />
    );

    return {
        field: 'isActive',
        headerName: 'Estado',
        type: 'singleSelect',
        valueOptions: [
            { value: true, label: t('active') },
            { value: false, label: t('inactive') },
        ],
        valueFormatter: statusValueFormatter,
        renderCell: statusRenderCell,
    };
};

export default useStatusColumn;
