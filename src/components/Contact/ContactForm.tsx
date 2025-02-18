import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormInput from './FormInput';
import ContactButtons from './ContactButtons';
import ThankYou from './ThankYou';

interface ContactFormData {
  nombre: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const methods = useForm<ContactFormData>({
    mode: "onChange",
  });
  const { handleSubmit, formState: { isValid } } = methods;
  const { t } = useTranslation();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "https://auto.escala365.com/webhook-test/bf7ceb1e-d1c7-4cc7-bbf7-744464536adb",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(t("contact.errorMessage"));
      }

      setIsSubmitted(true); // Cambia a la pantalla de "Thank You"
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Para este ejemplo se asume un único paso (puedes integrar lógica de pasos si es necesario)
  const currentStep = 1;
  const isLastStep = true;

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {isSubmitted ? (
        <ThankYou />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormInput name="nombre" placeholderKey="name" />
              <FormInput name="email" type="email" placeholderKey="email" />
              <FormInput name="message" placeholderKey="message" />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <ContactButtons 
              currentStep={currentStep} 
              isLastStep={isLastStep} 
              isValid={isValid} 
              handlePrevStep={() => { /* Implementa lógica para el paso anterior si fuera necesario */ }} 
            />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default ContactForm; 