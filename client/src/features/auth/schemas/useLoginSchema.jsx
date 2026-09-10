import useLang from '@/hooks/i18n/useLang';
import * as yup from 'yup';

const useLoginSchema = () => {
    const { t } = useLang();
    return yup.object({
        email: yup.string().email(t('validations.email')).required(t('validations.required')),
        password: yup.string().required(t('validations.required')),
    });
};

export default useLoginSchema;
