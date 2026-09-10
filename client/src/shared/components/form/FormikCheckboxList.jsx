import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormikContext } from 'formik';

const FormikCheckboxList = ({
    name,
    label,
    options,
    labelKey = 'name',
    groupLabelKey = 'label',
    groupOptionsKey = 'options',
}) => {
    const { values, setFieldValue, touched, errors } = useFormikContext();

    const selectedValues = values[name] || [];

    const handleChange = (id) => {
        const exists = selectedValues.includes(id);

        setFieldValue(
            name,
            exists ? selectedValues.filter((item) => item !== id) : [...selectedValues, id]
        );
    };

    const renderNode = (node, level = 0) => {
        const children = node[groupOptionsKey];

        if (Array.isArray(children) && children.length > 0) {
            return (
                <Accordion
                    key={`${node[groupLabelKey]}-${level}`}
                    disableGutters
                    elevation={0}
                    sx={{
                        ml: level * 2,
                        mb: 1,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        '&:before': {
                            display: 'none',
                        },
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={level === 0 ? 'subtitle2' : 'body2'} fontWeight="bold">
                            {node[groupLabelKey]}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <FormGroup>
                            {children.map((child) => renderNode(child, level + 1))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            );
        }

        return (
            <FormControlLabel
                key={node.id}
                control={
                    <Checkbox
                        checked={selectedValues.includes(node.id)}
                        onChange={() => handleChange(node.id)}
                    />
                }
                label={node[labelKey]}
                sx={{
                    ml: level * 2,
                    display: 'flex',
                }}
            />
        );
    };

    return (
        <FormControl fullWidth error={touched[name] && Boolean(errors[name])}>
            {label && (
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {label}
                </Typography>
            )}

            <Box>{options.map((option) => renderNode(option))}</Box>

            {touched[name] && errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}
        </FormControl>
    );
};

export default FormikCheckboxList;
