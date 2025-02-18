import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SuccessMessageProps {
  onClose?: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }}
        exit={{ 
          scale: 0.8, 
          opacity: 0,
          transition: { duration: 0.2 }
        }}
        className="bg-white dark:bg-darkBackground/95 rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 400,
                damping: 20
              }
            }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#3272d2] to-[#3eb489] rounded-full flex items-center justify-center"
          >
            <span className="text-4xl" role="img" aria-label="success">
              ✨
            </span>
          </motion.div>

          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.3 }
            }}
            className="text-3xl font-bold mb-4 text-lightText dark:text-darkText"
          >
            {t('contact.successTitle')}
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.4 }
            }}
            className="text-lg text-lightText/80 dark:text-darkText/80 mb-8"
          >
            {t('contact.successMessage')}
          </motion.p>

          {onClose && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-[#3272d2] hover:bg-[#2861b8] text-white rounded-lg 
                       transition-colors duration-200 text-sm font-medium"
            >
              {t('common.close')}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};