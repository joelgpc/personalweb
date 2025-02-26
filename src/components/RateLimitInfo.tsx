import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface RateLimitInfoProps {
  blockTimeRemaining: number;
}

export const RateLimitInfo: React.FC<RateLimitInfoProps> = ({ blockTimeRemaining }) => {
  const { t } = useTranslation();
  
  const minutes = Math.floor(blockTimeRemaining / 60000);
  const seconds = Math.floor((blockTimeRemaining % 60000) / 1000);
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {t('contact.form.security.rateLimitExceeded')}
          </h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">
            {t('contact.form.security.tryAgainIn', { time: timeString })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};