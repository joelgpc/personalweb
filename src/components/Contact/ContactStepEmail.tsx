import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepBase } from './FormStepBase';
import { StepProps } from './types';

const ContactStepEmail: React.FC<StepProps> = ({
  value,
  onChange,
  onPrevious,
  currentStep,
  totalSteps,
  validate
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (inputValue: string) => {
    if (validate(inputValue)) {
      setError(null);
      onChange(inputValue);
    } else {
      setError(t('contact.errors.invalidEmail'));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value) {
      handleSubmit(value);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <span className="text-white/50 text-sm">
          {currentStep}/{totalSteps}
        </span>
      </div>
      
      <h2 className="text-white text-2xl md:text-3xl mb-12 flex items-center justify-center gap-2">
        📧 {t('contact.questions.email')}
      </h2>

      <FormStepBase
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={t('contact.placeholders.email')}
        fieldError={error}
        isValid={validate(value)}
      />
    </div>
  );
};

export default ContactStepEmail;