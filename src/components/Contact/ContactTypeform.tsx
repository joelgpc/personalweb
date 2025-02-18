import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NavigationButtons from './NavigationButtons';
import ThankYou from './ThankYou';

interface FormData {
  name: string;
  email: string;
  role: string;
  message: string;
}

const ContactTypeform = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Función para obtener el icono según el paso
  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return '👋';
      case 2:
        return '📧';
      case 3:
        return '💼';
      case 4:
        return '💭';
      default:
        return '👋';
    }
  };

  // Función para obtener el tipo de input
  const getInputType = (stepNumber: number) => {
    switch (stepNumber) {
      case 2:
        return 'email';
      case 4:
        return 'textarea';
      default:
        return 'text';
    }
  };

  // Función para obtener el valor actual del paso
  const getStepValue = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.name;
      case 2:
        return formData.email;
      case 3:
        return formData.role;
      case 4:
        return formData.message;
      default:
        return '';
    }
  };

  // Función para manejar el cambio en los inputs
  const handleStepChange = (stepNumber: number, value: string) => {
    switch (stepNumber) {
      case 1:
        setFormData(prev => ({ ...prev, name: value }));
        break;
      case 2:
        setFormData(prev => ({ ...prev, email: value }));
        break;
      case 3:
        setFormData(prev => ({ ...prev, role: value }));
        break;
      case 4:
        setFormData(prev => ({ ...prev, message: value }));
        break;
    }
  };

  // Función para manejar las teclas
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isCurrentStepValid()) {
        handleNext();
      }
    }
  };

  const validateField = (field: keyof FormData, value: string): string | null => {
    switch (field) {
      case 'name':
        if (!value) return t('form.errors.name.required');
        if (value.length < 2) return t('form.errors.name.min');
        break;
      case 'email':
        if (!value) return t('form.errors.email.required');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('form.errors.email.invalid');
        break;
      case 'role':
        if (!value) return t('form.errors.role.required');
        break;
      case 'message':
        if (!value) return t('form.errors.message.required');
        if (value.length < 10) return t('form.errors.message.min');
        break;
    }
    return null;
  };

  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.length >= 2;
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 3:
        return formData.role.length > 0;
      case 4:
        return formData.message.length >= 10;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isCurrentStepValid()) {
      if (step < 4) {
        setStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://auto.escala365.com/webhook-test/bf7ceb1e-d1c7-4cc7-bbf7-744464536adb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(t('form.errors.submit'));
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mt-10">
      <AnimatePresence mode="wait" initial={false}>
        {isSubmitted ? (
          <ThankYou key="thank-you" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center space-y-12"
          >
            {/* Progress Steps */}
            <div className="w-full max-w-md">
              <div className="flex justify-between">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 w-full mx-1 rounded-full transition-all duration-300 ${
                      i === step 
                        ? 'bg-blue-500' 
                        : i < step 
                          ? 'bg-blue-200' 
                          : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                {step}/4
              </div>
            </div>

            {/* Question */}
            <div className="text-center">
              <span className="block text-5xl mb-8" role="img" aria-label="icon">
                {getStepIcon(step)}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t(`form.steps.${step}.title`)}
              </h2>
            </div>

            {/* Input */}
            <div className="w-full max-w-xl">
              <input
                type={getInputType(step)}
                value={getStepValue(step)}
                onChange={(e) => handleStepChange(step, e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t(`form.steps.${step}.placeholder`)}
                className="w-full bg-transparent text-3xl text-center border-b-2 border-gray-200 dark:border-gray-700 
                  text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 
                  focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none 
                  transition-all py-4"
                autoFocus
              />
            </div>

            {/* Navigation */}
            <div className="w-full max-w-xl">
              <NavigationButtons
                currentStep={step}
                totalSteps={4}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isValid={isCurrentStepValid()}
                isLastStep={step === 4}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactTypeform;