import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface NameStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const NameStep: React.FC<NameStepProps> = ({ value, onChange, onNext }) => {
  const { t } = useTranslation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.length >= 2) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <div className="mb-8">
        <span className="text-white/50 text-sm">1/4</span>
      </div>

      <h2 className="text-white text-2xl md:text-3xl mb-12 flex items-center justify-center gap-2">
        <span role="img" aria-label="wave">👋</span>
        {t('contact.questions.name')}
      </h2>

      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('contact.placeholders.name')}
          className="w-full bg-transparent border-b-2 border-white/20 text-white text-3xl md:text-4xl py-4 px-2 text-center placeholder-white/40 focus:outline-none focus:border-white transition-all duration-300"
          autoFocus
        />
      </div>
    </motion.div>
  );
};

export default NameStep; 