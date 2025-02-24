import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // fallback language is explicitly set here
    debug: false, // Deshabilitar logs en producción
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: true,
      bindI18n: 'loaded languageChanged',
      bindI18nStore: 'added removed',
    },
    supportedLngs: ['en', 'es-ES'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;