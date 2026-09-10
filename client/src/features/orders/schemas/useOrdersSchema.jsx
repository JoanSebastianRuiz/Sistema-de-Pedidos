import useLang from '@/hooks/i18n/useLang';
import * as yup from 'yup';

const useOrdersSchema = () => {
    const { t } = useLang();
    return yup.object({
        orderDetails: yup
            .array()
            .of(
                yup.object({
                    productId: yup.number().required(t('required')),
                    quantity: yup
                        .number()
                        .typeError(t('validations.number'))
                        .required(t('validations.required'))
                        .min(1, t('validations.invalid')),
                })
            )
            .test(
                'at-least-one',
                t('validations.atLeastOne'),
                (value) => value && value.length > 0
            ),
    });
};

export default useOrdersSchema;
