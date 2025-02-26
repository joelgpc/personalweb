import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepBase } from './FormStepBase';
import { FormInput } from './FormInput';

export interface ContactStepNameProps {
  value: string;
  error?: string | undefined;
  onChange: (value: string) => void;
  onNext: () => void;
  isSubmitting?: boolean | undefined;
}

export const ContactStepName: React.FC<ContactStepNameProps> = ({
  value,
  error,
  onChange,
  onNext,
  isSubmitting = false,
}) => {
  const { t } = useTranslation();

  return (
    <FormStepBase
      title={t('contact.form.steps.1.title')}
      description={t('contact.form.steps.1.description')}
      onNext={onNext}
      showBackButton={false}
      isSubmitting={isSubmitting}
    >
      <FormInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('contact.form.steps.1.placeholder')}
        error={error}
        autoFocus
        required
        aria-label={t('contact.form.steps.1.title')}
        data-testid="name-input"
      />
    </FormStepBase>
  );
};