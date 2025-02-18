import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ThankYou: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-8"
      >
        <span role="img" aria-label="sparkles" className="text-7xl">✨</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-white text-4xl font-bold mb-4"
      >
        {t('feedback.title')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-white/80 text-xl"
      >
        {t('feedback.message')}
      </motion.p>
    </motion.div>
  );
};

export default ThankYou; 