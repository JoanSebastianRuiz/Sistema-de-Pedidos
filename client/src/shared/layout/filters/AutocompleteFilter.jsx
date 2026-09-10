import { Autocomplete, TextField } from '@mui/material';

const AutocompleteFilter = ({ definition, value, setFilter }) => {
    const {
        label,
        placeholder,
        options = [],
        loading = false,
        getOptionLabel = (option) => option?.name ?? '',
        isOptionEqualToValue = (option, val) => option?.id === val?.id,
        props = {},
    } = definition;

    const key = definition.key || 'id';
    const formatKey = definition.formatKey || ((val) => Number(val));

    const onChange = (newValue) => {
        if (newValue) {
            setFilter(definition.name, formatKey(newValue?.[key]));
            return;
        }
        setFilter(definition.name, null);
    };

    const autocompleteValue = options.find((option) => option[key] === formatKey(value)) ?? null;

    return (
        <Autocomplete
            options={options}
            value={autocompleteValue}
            loading={loading}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} size="small" />
            )}
            {...props}
        />
    );
};

export default AutocompleteFilter;
