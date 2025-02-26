import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="flex justify-center mb-8">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <div
        key={index}
        className={`h-1 w-16 mx-1 rounded-full transition-all duration-300 ${
          index < currentStep 
            ? 'bg-[#0284c7] dark:bg-[#38bdf8]' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      />
    ))}
  </div>
);

interface ContactProps {
  onFormSuccess?: (data: {
    name: string;
    email: string;
    message: string;
    recaptchaToken?: string;
  }) => void;
}

const Contact: React.FC<ContactProps> = ({ onFormSuccess }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const formFields = {
    1: 'name',
    2: 'email',
    3: 'message'
  } as const;

  type EmailValidationResult = {
    isValid: boolean;
    errorKey: string | null;
  } | {
    isValid: false;
    errorKey: 'suggestDomain';
    suggestion: string;
  };

  const validateEmail = (email: string): EmailValidationResult => {
    if (!email) {
      return { isValid: false, errorKey: 'required' };
    }
    if (!email.includes('@')) {
      return { isValid: false, errorKey: 'missingAt' };
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, errorKey: 'invalid' };
    }
    // Validación adicional para dominios comunes mal escritos
    const commonMisspellings: Record<string, string> = {
      'gmail.co': 'gmail.com',
      'hotmail.co': 'hotmail.com',
      'yahoo.co': 'yahoo.com'
    } as const;

    const parts = email.split('@');
    const domain = parts[1];
    
    if (parts.length === 2 && domain && Object.keys(commonMisspellings).includes(domain)) {
      return {
        isValid: false,
        errorKey: 'suggestDomain',
        suggestion: commonMisspellings[domain]
      };
    }
    return { isValid: true, errorKey: null };
  };

  const validateField = (step: number, value: string): boolean => {
    switch (step) {
      case 1:
        if (value.length < 2) {
          setError(t('form.validation.name'));
          return false;
        }
        return true;
      case 2:
        const emailValidation = validateEmail(value);
        if (!emailValidation.isValid) {
          setError(t(`form.validation.email.${emailValidation.errorKey}`));
          return false;
        }
        return true;
      case 3:
        if (value.length < 10) {
          setError(t('form.validation.message'));
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentField = formFields[currentStep as keyof typeof formFields];
    const currentValue = formData[currentField];

    if (!validateField(currentStep, currentValue)) {
      setError(t(`form.validation.${currentField}`));
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      setError(null);
    } else {
      try {
        setIsSubmitting(true);
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Form submitted:', formData);
        onFormSuccess?.(formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setError(error instanceof Error ? error.message : t('form.error'));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentField = formFields[currentStep as keyof typeof formFields];
    const newValue = e.target.value;
    setFormData(prev => ({
      ...prev,
      [currentField]: newValue
    }));

    // Validación en tiempo real para el email
    if (currentStep === 2) {
      const emailValidation = validateEmail(newValue);
      if (emailValidation.errorKey) {
        setError(t(`form.validation.email.${emailValidation.errorKey}`));
      } else {
        setError(null);
      }
    }
  };

  const currentField = formFields[currentStep as keyof typeof formFields];
  const currentInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Usamos setTimeout para asegurar que el DOM se ha actualizado
    const timeoutId = setTimeout(() => {
      const input = document.querySelector(`#step-${currentField}-input`);
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.focus();
        currentInputRef.current = input;
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentStep, currentField]);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0284c7] to-[#0369a1] dark:from-[#38bdf8] dark:to-[#0284c7]">
            {t('contact.title')}
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            {t('contact.subtitle')}
          </h2>
        </div>
        
        <div className="w-full max-w-lg">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 transition-all duration-300">
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-[#0284c7] dark:bg-[#38bdf8] rounded-full flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('form.completion.title')}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {t('form.completion.message', { name: formData.name })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" 
      className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0284c7] to-[#0369a1] dark:from-[#38bdf8] dark:to-[#0284c7]">
          {t('contact.title')}
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-300">
          {t('contact.subtitle')}
        </h2>
      </div>

      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          <StepIndicator currentStep={currentStep} totalSteps={3} />
          
          <div className="relative space-y-6 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 transition-all duration-300">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {t(`form.steps.${currentStep}.title`)}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t(`form.steps.${currentStep}.description`)}
              </p>
            </div>

            {currentStep === 3 ? (
              <textarea
                id={`step-${currentField}-input`}
                value={formData[currentField]}
                onChange={handleInputChange}
                placeholder={t(`form.steps.${currentStep}.placeholder`)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0284c7] dark:focus:ring-[#38bdf8] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                aria-label={t(`form.steps.${currentStep}.title`)}
                rows={4}
                required
                ref={input => {
                  if (input) currentInputRef.current = input;
                }}
              />
            ) : (
              <input
                id={`step-${currentField}-input`}
                type={currentStep === 2 ? 'email' : 'text'}
                value={formData[currentField]}
                onChange={handleInputChange}
                placeholder={t(`form.steps.${currentStep}.placeholder`)}
                onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setError(t(`form.validation.${currentField}`));
                }}
                onInput={() => setError(null)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0284c7] dark:focus:ring-[#38bdf8] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                aria-label={t(`form.steps.${currentStep}.title`)}
                required
                ref={input => {
                  if (input) currentInputRef.current = input;
                }}
              />
            )}

            <div className="flex gap-4 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#0284c7] dark:text-[#38bdf8] border-2 border-[#0284c7] dark:border-[#38bdf8] hover:bg-[#0284c7] dark:hover:bg-[#38bdf8] hover:text-white rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {t('form.navigation.back')}
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#0284c7] dark:bg-[#38bdf8] hover:bg-[#0369a1] dark:hover:bg-[#0284c7] rounded-lg transition-all duration-300 disabled:opacity-50 ${
                  currentStep > 1 ? 'flex-1' : 'w-full'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t('form.navigation.sending')}
                  </div>
                ) : (
                  t(currentStep === 3 ? 'form.navigation.submit' : 'form.navigation.next')
                )}
              </button>
            </div>

            {error && (
              <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              {t('form.navigation.pressEnter')}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
