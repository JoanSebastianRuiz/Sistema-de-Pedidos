import useLang from '../i18n/useLang';

const useFormattedColumns = ({ columns, namespace }) => {
    const { t } = useLang(namespace);
    return columns.filter(Boolean).map((column) => {
        return {
            ...column,
            headerName: t(column.headerName || column.field),
        };
    });
};

export default useFormattedColumns;
