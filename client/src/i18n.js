import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Loads translations from files
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next) // Initializes with React
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Debug mode for development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;
