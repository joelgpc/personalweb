import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { StepProps } from './types';

const ContactStepName: React.FC<StepProps> = ({
  value,
  onChange,
  currentStep,
  totalSteps,
  validate,
  isLoading
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (error && validate(newValue)) {
      setError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      if (!validate(value)) {
        setError(t('contact.errors.invalidName'));
        return;
      }
      onChange(value);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <span className="text-white/50 text-sm">
          {currentStep}/{totalSteps}
        </span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-white text-2xl md:text-3xl flex items-center justify-center gap-2">
          <span className="text-3xl">👋</span>
          {t('contact.questions.name')}
        </h2>
      </motion.div>

      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t('contact.placeholders.name')}
          className={`
            w-full
            bg-transparent
            border-b-2
            ${error ? 'border-red-400' : 'border-white/20'}
            text-white
            text-3xl md:text-4xl
            py-4
            px-2
            text-center
            placeholder-white/40
            focus:outline-none
            focus:border-white
            transition-all
            duration-300
          `}
          autoFocus
          disabled={isLoading}
        />
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-0 right-0 text-sm text-red-400 text-center"
          >
            {error}
          </motion.p>
        )}

        {validate(value) && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400"
          >
            ✓
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactStepName;