import useLang from '@/hooks/i18n/useLang';
import { useForm } from '@/shared/contexts/FormContext';
import { TextField } from '@mui/material';
import { Grid } from '@mui/system';
import { getIn, useFormikContext } from 'formik';
import FormikNumber from './FormikNumber';
import FormikPassword from './FormikPassword';
import FormikPattern from './FormikPattern';

const FormikField = ({
    name,
    label,
    containerSize = 12,
    type,
    startAdornment,
    endAdornment,
    rows,
    fullWidth = true,
    sx,
    ...props
}) => {
    const { namespace } = useForm();
    const formik = useFormikContext();
    const { t } = useLang(namespace);

    const value = getIn(formik.values, name);
    const touched = getIn(formik.touched, name);
    const error = getIn(formik.errors, name);

    return (
        <Grid size={containerSize}>
            <TextField
                fullWidth={fullWidth}
                label={t(label || name)}
                name={name}
                value={value ?? ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(touched && error)}
                helperText={touched && error ? error : ' '}
                type={type}
                rows={rows}
                multiline={Boolean(rows)}
                slotProps={{
                    input: {
                        startAdornment,
                        endAdornment,
                    },
                }}
                sx={sx}
                {...props}
            />
        </Grid>
    );
};

FormikField.Password = FormikPassword;
FormikField.Number = FormikNumber;
FormikField.Pattern = FormikPattern;

export default FormikField;
