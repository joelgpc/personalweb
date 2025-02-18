import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { StepProps } from './types';

const ContactStepRole: React.FC<StepProps> = ({
  value,
  onChange,
  onPrevious,
  currentStep,
  totalSteps
}) => {
  const { t } = useTranslation();
  const roles = [
    { id: 'developer', icon: '👨‍💻' },
    { id: 'designer', icon: '🎨' },
    { id: 'manager', icon: '📊' },
    { id: 'other', icon: '🤔' }
  ];

  return (
    <div className="text-center">
      <div className="mb-8">
        <span className="text-white/50 text-sm">
          {currentStep}/{totalSteps}
        </span>
      </div>
      
      <h2 className="text-white text-2xl md:text-3xl mb-12 flex items-center justify-center gap-2">
        💼 {t('contact.questions.role')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
        {roles.map((role) => (
          <motion.button
            key={role.id}
            onClick={() => onChange(role.id)}
            className={`p-4 rounded-lg text-white text-lg ${
              value === role.id 
                ? 'bg-white/20 border-2 border-white' 
                : 'bg-white/10 hover:bg-white/15'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl mr-2">{role.icon}</span>
            {t(`contact.roles.${role.id}`)}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ContactStepRole; 