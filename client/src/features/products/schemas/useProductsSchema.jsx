import useLang from '@/hooks/i18n/useLang';
import * as yup from 'yup';

const useProductsSchema = () => {
    const { t } = useLang();

    return yup.object({
        name: yup
            .string()
            .required(t('validations.required'))
            .max(120, t('validations.maxLength', { max: 120 })),

        price: yup
            .number()
            .typeError(t('validations.number'))
            .required(t('validations.required'))
            .min(0, t('validations.min', { min: 0 })),
    });
};

export default useProductsSchema;
