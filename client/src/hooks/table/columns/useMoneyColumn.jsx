const useMoneyColumn = ({ field }) => {
    const valueFormatter = (value) => {
        if (typeof value !== 'number') {
            return '';
        }
        return `$${value.toLocaleString()}`;
    };

    return {
        field,
        valueFormatter,
    };
};

export default useMoneyColumn;
