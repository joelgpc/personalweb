import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FormFeedback: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center text-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-5xl mb-6"
      >
        ✨
      </motion.div>
      <h2 className="text-3xl font-bold mb-4">
        {t('contact.feedback.title')}
      </h2>
      <p className="text-xl opacity-80">
        {t('contact.feedback.message')}
      </p>
    </motion.div>
  );
};

export default FormFeedback;