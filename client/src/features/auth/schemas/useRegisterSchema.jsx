import useLang from '@/hooks/i18n/useLang';
import * as yup from 'yup';
import useConfirmPasswordSchema from './useConfirmPasswordSchema';

const useRegisterSchema = () => {
    const { t } = useLang();
    const confirmPasswordSchema = useConfirmPasswordSchema();
    return yup.object({
        name: yup.string().required(t('validations.required')),
        email: yup.string().email(t('validations.email')).required(t('validations.required')),
    }).concat(confirmPasswordSchema);
};

export default useRegisterSchema;
