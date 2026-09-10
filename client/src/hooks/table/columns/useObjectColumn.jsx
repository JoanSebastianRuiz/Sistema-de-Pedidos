const useObjectColumn = ({ field, label, valueField = 'name', formatValueField }) => {
    return {
        field,
        label,
        valueGetter: (value) => {
            return formatValueField ? formatValueField(value?.[valueField]) : value?.[valueField];
        },
    };
};

export default useObjectColumn;
