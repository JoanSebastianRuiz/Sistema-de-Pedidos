import useLang from '../i18n/useLang';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const usePhoneValidation = ({ required } = {}) => {
    const { t } = useLang();

    return function (values) {
        const { phone, phoneCode } = values;

        if (required && !phone && !phoneCode) {
            return this.createError({
                path: 'phone',
                message: t('validations.required'),
            });
        }

        if (phone && !phoneCode) {
            return this.createError({
                path: 'phoneCode',
                message: t('validations.required'),
            });
        }

        if (!phone && phoneCode) {
            return this.createError({
                path: 'phone',
                message: t('validations.required'),
            });
        }

        if (phone && phoneCode) {
            try {
                const fullNumber = `+${phoneCode}${phone}`;
                const phoneNumber = parsePhoneNumberFromString(fullNumber);

                if (!phoneNumber?.isValid()) {
                    return this.createError({
                        path: 'phone',
                        message: t('validations.invalidPhone'),
                    });
                }
            } catch {
                return this.createError({
                    path: 'phone',
                    message: t('validations.invalidPhone'),
                });
            }
        }

        return true;
    };
};

export default usePhoneValidation;
