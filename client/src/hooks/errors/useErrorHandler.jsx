import { useSnackbarStore } from '@/store/snackbar.store';
import useLang from '../i18n/useLang';

const useErrorHandler = () => {
    const { t, i18n } = useLang();
    const { showSnackbar } = useSnackbarStore();

    const getErrorMessage = ({ messageKey, namespace, fallbackMessage }) => {
        const key = `errors.${messageKey}`;

        if (i18n.exists(key, { ns: namespace })) {
            return t(key, { ns: namespace });
        }

        if (i18n.exists(key, { ns: 'common' })) {
            return t(key, { ns: 'common' });
        }

        return fallbackMessage;
    };

    const handleError = ({ error, namespace, fallbackMessage }) => {
        const message = error.response?.data?.message;
        const messageKey = Array.isArray(message) ? message[0] : message;
        const severity = error.response?.data?.severity || 'error';
        const errorMessage = getErrorMessage({ messageKey, namespace, fallbackMessage });

        showSnackbar({
            message: errorMessage,
            severity,
        });
    };

    return handleError;
};

export default useErrorHandler;
