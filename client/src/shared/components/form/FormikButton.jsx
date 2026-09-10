import useLang from '@/hooks/i18n/useLang';
import { Button } from '@mui/material';
import { Grid } from '@mui/system';
import { useFormikContext } from 'formik';

const FormikButton = ({
    size = 12,
    label,
    labelKey,
    sx,
    namespace,
    fullWidth = true,
    disabled,
}) => {
    const formik = useFormikContext();
    const { t } = useLang(namespace);

    const disabledState = typeof disabled === 'function' ? disabled(formik) : disabled;

    const buttonLabel = labelKey ? t(labelKey) : label;

    return (
        <Grid size={size}>
            <Button
                type="submit"
                variant="contained"
                loading={formik.isSubmitting}
                sx={sx}
                fullWidth={fullWidth}
                disabled={disabledState}
            >
                {buttonLabel}
            </Button>
        </Grid>
    );
};

export default FormikButton;
