import FormikForm from '@/shared/components/form/FormikForm';
import FormikField from '@/shared/components/form/FormikField';
import FormikButton from '@/shared/components/form/FormikButton';
import useRegisterSchema from '../schemas/useRegisterSchema';
import { Typography } from '@mui/material';
import useLang from '@/hooks/i18n/useLang';
import { useRegisterMutation } from '../hooks/mutations/useRegisterMutation';
import PasswordRequirements from '@/features/auth/components/PasswordRequirements';

const RegisterPage = () => {
    const validationSchema = useRegisterSchema();
    const { t } = useLang('auth');
    const { mutateAsync } = useRegisterMutation();

    const initialValues = {
        email: '',
    };

    const onSubmit = async (values) => {
        await mutateAsync(values);
    };

    return (
        <FormikForm
            namespace="auth"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Typography textAlign="justify" variant="subtitle1">
                {t('messages.register')}
            </Typography>

            <FormikField name="name" />
            <FormikField name="email" />

            <FormikField.Password name="password" sx={{ maxWidth: 400, mb: -1 }} />
            <PasswordRequirements />
            <FormikField.Password name="confirmPassword" sx={{ maxWidth: 400 }} />

            <FormikButton label={t('register')} namespace="auth" />
        </FormikForm>
    );
};

export default RegisterPage;
