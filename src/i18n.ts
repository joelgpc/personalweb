import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const isDevelopment = import.meta.env.DEV;

const i18nConfig = {
  fallbackLng: 'es',
  supportedLngs: ['es', 'en'],
  load: 'languageOnly',
  defaultNS: 'translations',
  ns: ['translations'],
  debug: isDevelopment,
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: '/locales/{{lng}}/translations.json',
  },
  detection: {
    order: ['localStorage', 'navigator'],
    lookupFromPathIndex: 0,
    caches: ['localStorage'],
  },
  react: {
    useSuspense: true,
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
  },
  partialBundledLanguages: true,
  preload: ['es', 'en']
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig)
  .catch((error) => {
    console.error('Error initializing i18n:', error);
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  if (isDevelopment) {
    console.log('Language changed:', lng, {
      loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces(),
      hasLoadedNamespace: i18n.hasLoadedNamespace('translations'),
    });
  }
});

if (isDevelopment) {
  i18n.on('initialized', () => {
    console.log('i18n initialized:', {
      language: i18n.language,
      languages: i18n.languages,
      loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces(),
    });
  });

  i18n.on('loaded', (loaded) => {
    console.log('i18n loaded:', loaded);
  });
}

export default i18n;