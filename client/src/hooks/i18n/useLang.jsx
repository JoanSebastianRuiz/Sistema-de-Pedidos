import { useTranslation } from 'react-i18next';

const useLang = (namespace = 'common') => {
    const { t, i18n } = useTranslation(namespace);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return {
        t,
        i18n,
        language: i18n.language,
        changeLanguage,
    };
};

export default useLang;
