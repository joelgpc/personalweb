import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isValid: boolean;
  isLastStep?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isValid,
  isLastStep = false
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-16">
      <div className="max-w-lg mx-auto">
        {/* Barra de progreso */}
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 w-8 rounded-full ${
                index + 1 === currentStep 
                  ? 'bg-[#0ea5e9]' 
                  : index + 1 < currentStep 
                    ? 'bg-[#0ea5e9]/80' 
                    : 'bg-gray-200 dark:bg-gray-700'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center justify-between gap-4">
          {currentStep > 1 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onPrevious}
              className="group px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                rounded-full transition-all duration-300 flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('form.navigation.back')}
            </motion.button>
          )}
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNext}
            disabled={!isValid}
            className={`
              group px-6 py-3 rounded-full ml-auto flex items-center gap-2
              ${isValid 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl active:shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}
              transition-all duration-300
            `}
          >
            <span>{isLastStep ? t('form.navigation.send') : t('form.navigation.next')}</span>
            {!isLastStep && (
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Texto de ayuda */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 dark:text-gray-400 text-sm text-center mt-4"
        >
          {t('form.navigation.pressEnter')}
        </motion.p>
      </div>
    </div>
  );
};

export default NavigationButtons; 