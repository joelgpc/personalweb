import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepBase } from './FormStepBase';
import { FormInput } from './FormInput';
import ReCAPTCHA from 'react-google-recaptcha';

export interface ContactStepMessageProps {
  value: string;
  error?: string | undefined;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean | undefined;
  onReCAPTCHAChange?: ((token: string | null) => void) | undefined;
  reCAPTCHAError?: string | undefined;
}

export const ContactStepMessage: React.FC<ContactStepMessageProps> = ({
  value,
  error,
  onChange,
  onBack,
  onNext,
  isSubmitting = false,
  onReCAPTCHAChange,
  reCAPTCHAError,
}) => {
  const { t } = useTranslation();
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  return (
    <FormStepBase
      title={t('contact.form.steps.3.title')}
      description={t('contact.form.steps.3.description')}
      onNext={onNext}
      onBack={onBack}
      isLastStep
      isSubmitting={isSubmitting}
    >
      <div className="space-y-6">
        <FormInput
          multiline
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('contact.form.steps.3.placeholder')}
          error={error}
          autoFocus
          required
          aria-label={t('contact.form.steps.3.title')}
          data-testid="message-input"
        />

        {RECAPTCHA_SITE_KEY && (
          <div className="flex flex-col items-center space-y-4">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={onReCAPTCHAChange}
              theme="dark"
              data-testid="recaptcha"
            />
            {reCAPTCHAError && (
              <p 
                className="text-sm text-red-600 dark:text-red-400"
                role="alert"
                data-testid="recaptcha-error"
              >
                {reCAPTCHAError}
              </p>
            )}
          </div>
        )}

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          {t('contact.form.security.disclaimer')}
        </p>
      </div>
    </FormStepBase>
  );
};