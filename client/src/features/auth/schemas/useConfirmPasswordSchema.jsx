import useLang from '@/hooks/i18n/useLang';
import * as yup from 'yup';

const useConfirmPasswordSchema = () => {
    const { t } = useLang();

    return yup.object({
        password: yup
            .string()
            .required(t('validations.required'))
            .min(8, t('validations.minLength', { min: 8 }))
            .notOneOf([yup.ref('currentPassword')], t('validations.passwordMustBeDifferent'))
            .matches(/[a-z]/, t('validations.passwordMustContainLowercase'))
            .matches(/[A-Z]/, t('validations.passwordMustContainUppercase'))
            .matches(/\d/, t('validations.passwordMustContainNumber'))
            .matches(
                /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
                t('validations.passwordMustContainSpecialCharacter')
            ),

        confirmPassword: yup
            .string()
            .required(t('validations.required'))
            .oneOf([yup.ref('password')], t('validations.passwordsMustMatch')),
    });
};

export default useConfirmPasswordSchema;
