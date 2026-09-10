import useLang from '@/hooks/i18n/useLang';
import { useForm } from '@/shared/contexts/FormContext';
import { Autocomplete, TextField } from '@mui/material';
import { Grid } from '@mui/system';
import { getIn, useFormikContext } from 'formik';

const BaseFormikAutocomplete = ({
    name,
    label,
    options = [],
    containerSize = 12,
    getOptionLabel = (option) => option?.name || '',
    isOptionEqualToValue,
    disabled = false,
    renderOption,
    getOptionKey,
    renderValue,
    disableClearable,
    changeKey = 'id',
    groupBy,
    multiple = false,
    ...props
}) => {
    const { namespace } = useForm();
    const { t } = useLang(namespace);
    const formik = useFormikContext();

    const fieldValue = getIn(formik.values, name);

    const value = multiple
        ? options.filter((option) => (fieldValue ?? []).includes(option[changeKey]))
        : options.find((option) => option[changeKey] === fieldValue) || null;

    const isOptionEqualToValueFn = isOptionEqualToValue
        ? isOptionEqualToValue
        : (option, value) => option[changeKey] === value?.[changeKey];

    return (
        <Grid size={containerSize}>
            <Autocomplete
                multiple={multiple}
                options={options}
                value={value}
                disabled={disabled}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValueFn}
                onChange={(_, newValue) => {
                    if (multiple) {
                        formik.setFieldValue(
                            name,
                            newValue.map((item) => item[changeKey])
                        );
                    } else {
                        formik.setFieldValue(name, newValue?.[changeKey] ?? '');
                    }
                }}
                onBlur={() => formik.setFieldTouched(name, true)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t(label || name)}
                        error={Boolean(getIn(formik.touched, name) && getIn(formik.errors, name))}
                        helperText={
                            getIn(formik.touched, name) && getIn(formik.errors, name)
                                ? getIn(formik.errors, name)
                                : ' '
                        }
                    />
                )}
                renderValue={renderValue}
                renderOption={renderOption}
                getOptionKey={getOptionKey}
                disableClearable={disableClearable}
                groupBy={groupBy}
                {...props}
            />
        </Grid>
    );
};

const FormikAutocomplete = (props) => <BaseFormikAutocomplete {...props} />;

FormikAutocomplete.Multiple = (props) => <BaseFormikAutocomplete multiple {...props} />;

export default FormikAutocomplete;
