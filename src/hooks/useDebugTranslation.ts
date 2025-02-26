import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useDebugTranslation = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log('Current language:', i18n.language);
    console.log('Available namespaces:', i18n.options.ns);
    if (i18n.reportNamespaces) {
      console.log('Loaded namespaces:', i18n.reportNamespaces.getUsedNamespaces());
    }
  }, [i18n.language]);

  return { t, i18n };
}; 