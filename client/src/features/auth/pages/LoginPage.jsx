import FormikForm from '@/shared/components/form/FormikForm';
import { useLoginMutation } from '../hooks/mutations/useLoginMutation';
import useLoginSchema from '../schemas/useLoginSchema';
import FormikField from '@/shared/components/form/FormikField';
import FormikButton from '@/shared/components/form/FormikButton';
import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useLang from '@/hooks/i18n/useLang';
import { Grid } from '@mui/system';

const LoginPage = () => {
    const validationSchema = useLoginSchema();
    const { t } = useLang('auth');
    const { mutateAsync } = useLoginMutation();

    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (values, { setFieldValue }) => {
        try {
            await mutateAsync(values);
        } catch (error) {
            resetCaptcha(setFieldValue);
        }
    };



    return (
        <FormikForm
            namespace="auth"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <FormikField name="email" />

            <FormikField.Password name="password" />

            <Grid
                size={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: -2,
                }}
            >
                <Link
                    component={NavLink}
                    to="/register"
                    underline="hover"
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                    }}
                >
                    {t('register')}
                </Link>
            </Grid>

            <FormikButton labelKey="login" />
        </FormikForm>
    );
};

export default LoginPage;
