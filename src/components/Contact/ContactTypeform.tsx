import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NavigationButtons from './NavigationButtons';
import ThankYou from './ThankYou';

const ContactTypeform = () => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para obtener el icono según el paso
  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return '👋';
      case 2: return '📧';
      case 3: return '💼';
      case 4: return '💭';
      default: return '👋';
    }
  };

  const handleStepChange = (value: string) => {
    setError(null);
    const field = {
      1: 'name',
      2: 'email',
      3: 'role',
      4: 'message'
    }[step] as keyof typeof formData;

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (value: string): string | null => {
    switch (step) {
      case 1:
        return value.length < 2 ? t('form.errors.name') : null;
      case 2:
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? t('form.errors.email') : null;
      case 3:
        return value.length < 2 ? t('form.errors.role') : null;
      case 4:
        return value.length < 10 ? t('form.errors.message') : null;
      default:
        return null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !error && isCurrentStepValid()) {
      e.preventDefault();
      handleNext();
    }
  };

  const isCurrentStepValid = () => {
    const value = formData[{
      1: 'name',
      2: 'email',
      3: 'role',
      4: 'message'
    }[step] as keyof typeof formData];

    return !validateStep(value);
  };

  const handleNext = async () => {
    const currentValue = formData[{
      1: 'name',
      2: 'email',
      3: 'role',
      4: 'message'
    }[step] as keyof typeof formData];

    const error = validateStep(currentValue);
    if (error) {
      setError(error);
      return;
    }

    if (step === 4) {
      try {
        setIsSubmitting(true);
        setError(null);
        const response = await fetch('https://auto.escala365.com/webhook-test/bf7ceb1e-d1c7-4cc7-bbf7-744464536adb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error();
        setIsSubmitted(true);
      } catch (err) {
        setError(t('form.errors.submit'));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setError(null);
      setStep(prev => prev - 1);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {isSubmitted ? (
          <ThankYou />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center space-y-12"
          >
            {/* Progress Steps */}
            <div className="w-full max-w-md">
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 flex-1 ${
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
              <span className="block text-5xl mb-6" role="img" aria-label="icon">
                {getStepIcon(step)}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t(`form.steps.${step}.title`)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t(`form.steps.${step}.description`)}
              </p>
            </div>

            {/* Input */}
            <div className="w-full max-w-xl">
              {step === 4 ? (
                <textarea
                  value={formData.message}
                  onChange={(e) => handleStepChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (isCurrentStepValid()) handleNext();
                    }
                  }}
                  placeholder={t(`form.steps.${step}.placeholder`)}
                  className="w-full bg-transparent text-2xl text-center border-b-2 border-gray-200 dark:border-gray-700 
                    text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 
                    focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none 
                    transition-all py-4 min-h-[150px] resize-none"
                  autoFocus
                />
              ) : (
                <input
                  type={step === 2 ? 'email' : 'text'}
                  value={formData[{1:'name', 2:'email', 3:'role'}[step] as keyof typeof formData]}
                  onChange={(e) => handleStepChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t(`form.steps.${step}.placeholder`)}
                  className="w-full bg-transparent text-3xl text-center border-b-2 border-gray-200 dark:border-gray-700 
                    text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 
                    focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none 
                    transition-all py-4"
                  autoFocus
                />
              )}

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-red-500 dark:text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Navigation */}
            <NavigationButtons
              currentStep={step}
              totalSteps={4}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isValid={isCurrentStepValid()}
              isLastStep={step === 4}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactTypeform;