import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ContactFormContainerProps {
    children: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    onSubmit: (e: React.FormEvent) => void;
    error?: string;
    isSubmitted: boolean;
}

export const ContactFormContainer: React.FC<ContactFormContainerProps> = ({
    children,
    currentStep,
    totalSteps,
    onSubmit,
    error,
    isSubmitted
}) => {
  const { t } = useTranslation();
  const [showError, setShowError] = useState(!!error);

  // Ocultar el error después de 5 segundos
  React.useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4 relative">
      {/* Contenedor principal */}
      <div className="w-full max-w-lg mx-auto">
        {isSubmitted ? (
          // Pantalla de "Thank You"
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold text-lightText dark:text-darkText">
              {t('contact.successTitle')}
            </div>
            <p className="mt-4 text-lg text-lightText/80 dark:text-darkText/80">
              {t('contact.successDescription')}
            </p>
          </div>
        ) : (
          // Formulario
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center space-y-8 bg-white dark:bg-gray-800/50
                     backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            aria-label={t('contact.formLabel')}
          >
            {/* Error Message */}
            <AnimatePresence>
              {showError && error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800
                           text-red-800 dark:text-red-200 px-4 py-3 rounded-lg"
                  role="alert"
                >
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    backgroundColor: i + 1 <= currentStep
                      ? 'rgb(59 130 246)'
                      : 'rgb(229 231 235)',
                    scale: i + 1 === currentStep ? 1.2 : 1
                  }}
                  className="w-2.5 h-2.5 rounded-full transition-colors dark:bg-gray-600"
                  role="progressbar"
                  aria-valuenow={currentStep}
                  aria-valuemin={1}
                  aria-valuemax={totalSteps}
                />
              ))}
            </div>

            {/* Form content */}
            <div className="w-full">
              {children}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {currentStep < totalSteps ? "Press Enter ↵" : ""}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};