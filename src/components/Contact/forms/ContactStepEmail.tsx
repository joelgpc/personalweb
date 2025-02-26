import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepBase } from './FormStepBase';
import { FormInput } from './FormInput';

export interface ContactStepEmailProps {
  value: string;
  error?: string | undefined;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean | undefined;
}

export const ContactStepEmail: React.FC<ContactStepEmailProps> = ({
  value,
  error,
  onChange,
  onNext,
  onBack,
  isSubmitting = false,
}) => {
  const { t } = useTranslation();

  return (
    <FormStepBase
      title={t('contact.form.steps.2.title')}
      description={t('contact.form.steps.2.description')}
      onNext={onNext}
      onBack={onBack}
      isSubmitting={isSubmitting}
    >
      <FormInput
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('contact.form.steps.2.placeholder')}
        error={error}
        autoFocus
        required
        aria-label={t('contact.form.steps.2.title')}
        data-testid="email-input"
        inputMode="email"
        autoComplete="email"
      />
    </FormStepBase>
  );
};