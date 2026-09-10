import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const modules = import.meta.glob('./locales/**/*.js', {
    eager: true,
});

const resources = {};

for (const path in modules) {
    const match = path.match(/\.\/locales\/(.*?)\/(.*?)\.js$/);

    if (!match) continue;

    const [, language, namespace] = match;

    if (!resources[language]) {
        resources[language] = {};
    }

    resources[language][namespace] = modules[path].default;
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,

        fallbackLng: 'es',

        defaultNS: 'common',

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
