import { TimePicker } from '@mui/x-date-pickers';
import { useField, useFormikContext } from 'formik';
import dayjs from 'dayjs';
import { Grid } from '@mui/system';
import useLang from '@/hooks/i18n/useLang';
import { useEffect } from 'react';

const FormikTimePicker = ({ name, label, size = 12 }) => {
    const { t } = useLang();
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    return (
        <Grid size={size}>
            <TimePicker
                label={label}
                value={field.value ? dayjs(field.value, 'HH:mm') : null}
                onChange={(value) => setFieldValue(name, value ? dayjs(value).format('HH:mm') : '')}
                ampm={false}
                slotProps={{
                    textField: {
                        error: meta.touched && Boolean(meta.error),
                        helperText: meta.touched ? meta.error : '',
                        size: 'small',
                        fullWidth: true,
                    },
                }}
                localeText={{
                    okButtonLabel: t('ok'),
                    cancelButtonLabel: t('cancel'),
                }}
            />
        </Grid>
    );
};

export default FormikTimePicker;
