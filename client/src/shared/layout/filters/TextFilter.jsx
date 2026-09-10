import { TextField } from '@mui/material';

const TextFilter = ({ definition, value, setFilter }) => {
    const onChange = (newValue) => {
        setFilter(definition.name, newValue);
    };
    return (
        <TextField
            fullWidth
            size={definition.size ?? 'small'}
            label={definition.label}
            placeholder={definition.placeholder}
            value={value ?? ''}
            onChange={(event) => onChange(event.target.value)}
            {...definition.props}
        />
    );
};

export default TextFilter;
