import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FormStepBaseProps {
  title: string;
  description?: string | undefined;
  children: ReactNode;
  onBack?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
  isLastStep?: boolean | undefined;
  isSubmitting?: boolean | undefined;
  showBackButton?: boolean | undefined;
}

export const FormStepBase: React.FC<FormStepBaseProps> = ({
  title,
  description,
  children,
  onBack,
  onNext,
  isLastStep = false,
  isSubmitting = false,
  showBackButton = true,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        )}
      </div>

      <div className="space-y-6">
        {children}
      </div>

      <div className="flex gap-4 pt-6">
        {showBackButton && onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#0284c7] dark:text-[#38bdf8] border-2 border-[#0284c7] dark:border-[#38bdf8] hover:bg-[#0284c7] dark:hover:bg-[#38bdf8] hover:text-white rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {t('contact.form.navigation.back')}
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#0284c7] dark:bg-[#38bdf8] hover:bg-[#0369a1] dark:hover:bg-[#0284c7] rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t('contact.form.navigation.sending')}
              </div>
            ) : (
              t(isLastStep ? 'contact.form.navigation.submit' : 'contact.form.navigation.next')
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};