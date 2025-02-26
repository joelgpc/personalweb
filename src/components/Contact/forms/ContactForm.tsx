import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useContactForm } from '../../../hooks/useContactForm';
import { RateLimitInfo } from '../../RateLimitInfo';
import { ContactFormData } from '../../../schemas/contactSchema';
import { ContactStepName } from './ContactStepName';
import { ContactStepEmail } from './ContactStepEmail';
import { ContactStepMessage } from './ContactStepMessage';

interface ContactFormProps {
  onFormSuccess: (data: ContactFormData) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onFormSuccess }) => {
  const {
    currentStep,
    formState,
    errors,
    isSubmitting,
    isBlocked,
    blockTimeRemaining,
    handleChange,
    handleSubmit,
    handleStepChange,
    handleRecaptchaChange,
  } = useContactForm({
    onSuccess: onFormSuccess,
  });

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactStepName
            value={formState.name}
            error={errors.step1}
            onChange={(value) => handleChange('name', value)}
            onNext={() => handleStepChange('next')}
            isSubmitting={isSubmitting}
          />
        );
      case 2:
        return (
          <ContactStepEmail
            value={formState.email}
            error={errors.step2}
            onChange={(value) => handleChange('email', value)}
            onNext={() => handleStepChange('next')}
            onBack={() => handleStepChange('prev')}
            isSubmitting={isSubmitting}
          />
        );
      case 3:
        return (
          <ContactStepMessage
            value={formState.message}
            error={errors.step3}
            onChange={(value) => handleChange('message', value)}
            onNext={handleSubmit}
            onBack={() => handleStepChange('prev')}
            isSubmitting={isSubmitting}
            onReCAPTCHAChange={handleRecaptchaChange}
            reCAPTCHAError={errors.recaptcha}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (currentStep === 3) {
          handleSubmit();
        } else {
          handleStepChange('next');
        }
      }}
      className="w-full max-w-2xl mx-auto space-y-8"
    >
      <AnimatePresence mode="wait">
        {isBlocked ? (
          <RateLimitInfo blockTimeRemaining={blockTimeRemaining} />
        ) : (
          renderCurrentStep()
        )}
      </AnimatePresence>
    </form>
  );
};