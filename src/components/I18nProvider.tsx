import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(!i18n.isInitialized);

  useEffect(() => {
    const handleLoaded = () => {
      setIsLoading(false);
    };

    if (i18n.isInitialized) {
      handleLoaded();
    } else {
      i18n.on('initialized', handleLoaded);
    }

    return () => {
      i18n.off('initialized', handleLoaded);
    };
  }, [i18n]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoadingSpinner />
        <p className="mt-4 text-sm text-gray-600">
          Cargando...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}; 