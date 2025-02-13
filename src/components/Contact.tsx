import React, { forwardRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useToast } from '../contexts/ToastContext';
import { z } from 'zod';
import { AnimationErrorBoundary } from './AnimationErrorBoundary';
import { ContactFormContainer } from './Contact/ContactFormContainer';
import { ContactStepName } from './Contact/ContactStepName';
import { ContactStepEmail } from './Contact/ContactStepEmail';
import { ContactStepMessage } from './Contact/ContactStepMessage';
import { ContactFormData, contactFormSchema } from './Contact/types';

interface ContactProps {
  ref?: React.Ref<HTMLElement>;
}

export const Contact = forwardRef<HTMLElement, ContactProps>((_, ref) => {
      const { showToast } = useToast();
      const { t } = useTranslation(); // Initialize useTranslation
      const [currentStep, setCurrentStep] = useState(1);
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        _honeypot: ''
      });
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
      const totalSteps = 3;
      const [isSubmitting, setIsSubmitting] = useState(false);

      // Validar campo individual
      const validateField = (field: keyof ContactFormData, value: string) => {
        try {
          contactFormSchema.shape[field].parse(value);
          setFieldErrors(prev => ({...prev, [field]: ''}));
          return true;
        } catch (error) {
          if (error instanceof z.ZodError) {
            setFieldErrors(prev => ({...prev, [field]: error.errors[0].message}));
          }
          return false;
        }
      };

      // Manejar cambios en campos con validación
      const handleInputChange = (field: keyof ContactFormData, value: string) => {
        setFormData(prevData => ({...prevData, [field]: value}));
        validateField(field, value);
      };

     const handleSubmit = useCallback(async (e?: React.FormEvent) => {
       if (e) {
         e.preventDefault();
       }
       
       if (isSubmitting) return;

       // Validar todo el formulario antes de enviar
       try {
         const result = contactFormSchema.parse(formData);
         if (result._honeypot) {
           console.log('Spam detectado');
           return;
         }
       } catch (error) {
         if (error instanceof z.ZodError) {
           showToast(error.errors[0].message);
           return;
         }
       }
       
       setIsSubmitting(true);
       
       // Crear un controlador de tiempo de espera
       const timeoutPromise = new Promise((_, reject) => {
         setTimeout(() => reject(new Error('Tiempo de espera agotado')), 10000);
       });
       
       try {
         // Competir entre la solicitud fetch y el tiempo de espera
         const response = await Promise.race([
           fetch('https://auto.escala365.com/webhook-test/bf7ceb1e-d1c7-4cc7-bbf7-744464536adb', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
             },
             body: JSON.stringify(formData)
           }),
           timeoutPromise
         ]) as Response;

         let responseData;
         const contentType = response.headers.get('content-type');
         if (contentType && contentType.includes('application/json')) {
           responseData = await response.json();
         } else {
           responseData = await response.text();
         }
         
         if (response.ok) {
           setIsSubmitted(true);
           showToast(t('contact.messageSuccess'));
           // Limpiar el formulario después del éxito
           setFormData({
             name: '',
             email: '',
             message: '',
             _honeypot: '' // Campo anti-spam
           });
         } else {
           const errorMessage = typeof responseData === 'string' ? responseData : JSON.stringify(responseData);
           showToast(`${t('contact.errorMessage')}: ${errorMessage}`);
         }
       } catch (error) {
         console.error('Error en el envío del formulario:', error);
         showToast(`${t('contact.errorMessage')}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
       } finally {
         setIsSubmitting(false);
       }
     }, [formData, showToast, t, isSubmitting, setFormData]);
    
      const { ref: inViewRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
      });
    
      const getCurrentField = () => {
        switch (currentStep) {
          case 1: return 'name';
          case 2: return 'email';
          case 3: return 'message';
          default: return 'name';
        }
      };

      const validateCurrentStep = () => {
        const field = getCurrentField();
        if (!formData[field] || formData[field].trim() === '') {
          setFieldErrors(prev => ({
            ...prev,
            [field]: t(`contact.errors.${field}Required`)
          }));
          return false;
        }
        return validateField(field, formData[field]);
      };

      const handleNext = () => {
        if (!validateCurrentStep()) return;
        
        if (currentStep < totalSteps) {
          setCurrentStep(prev => prev + 1);
          setFieldErrors({}); // Limpiar errores al avanzar
        }
      };
    
      const handlePrev = () => {
        if (currentStep > 1) {
          setCurrentStep(prev => prev - 1);
        }
      };
    

      return (
        <section
          ref={(node) => {
            inViewRef(node);
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          id="contact"
          className="relative py-32 bg-lightBackground dark:bg-darkBackground"
        >
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] flex flex-col justify-center">
            <AnimationErrorBoundary>
              <motion.div
                initial={false}
                animate={inView ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                  }
                } : {
                  opacity: 0,
                  y: 20,
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                className="relative text-center mb-20 z-10"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-lightText dark:text-darkText">
                  {t('contact.title')}
                </h2>
                <p className="text-xl text-lightText/80 dark:text-darkText/80 max-w-2xl mx-auto">
                  {t('contact.subtitle')}
                </p>
              </motion.div>
            </AnimationErrorBoundary>

            {/* Form Container */}
            <ContactFormContainer
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNextStep={handleNext}
              onPrevStep={handlePrev}
              isSubmitting={isSubmitting}
              isLastStep={currentStep === totalSteps}
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                if (!isSubmitting && currentStep === totalSteps) {
                  handleSubmit(e);
                } else if (!isSubmitting) {
                  handleNext();
                }
              }}
            >
              <AnimatePresence mode='wait'>
                  {currentStep === 1 && (
                    <ContactStepName
                      value={formData.name}
                      onChange={(value: string) => handleInputChange('name', value)}
                      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleNext()}
                      placeholder={t('contact.nameLabel')}
                      fieldError={fieldErrors.name} 
                    />
                  )}
    
                  {currentStep === 2 && (
                    <ContactStepEmail
                      value={formData.email}
                      onChange={(value: string) => handleInputChange('email', value)}
                      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleNext()}
                      placeholder={t('contact.emailLabel')}
                      fieldError={fieldErrors.email} 
                    />
                  )}
    
                  {currentStep === 3 && (
                    <ContactStepMessage
                      value={formData.message}
                      onChange={(value: string) => handleInputChange('message', value)}
                      onKeyDown={() => {}} // No necesitamos manejar el keyDown en el último paso
                      placeholder={t('contact.messageLabel')}
                      fieldError={fieldErrors.message} 
                    />
                  )}
                </AnimatePresence>
              </ContactFormContainer>
             {/* Mensaje de éxito mejorado */}
             <AnimationErrorBoundary>
               <AnimatePresence mode="wait">
                 {isSubmitted && (
                   <motion.div
                     key="success"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
                   >
                     <motion.div
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ 
                         scale: 1, 
                         opacity: 1,
                         transition: {
                           type: "spring",
                           stiffness: 300,
                           damping: 25
                         }
                       }}
                       exit={{ 
                         scale: 0.8, 
                         opacity: 0,
                         transition: { duration: 0.2 }
                       }}
                       className="bg-white dark:bg-darkBackground/95 rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
                     >
                       <div className="text-center">
                         <motion.div
                           initial={{ scale: 0 }}
                           animate={{
                             scale: 1,
                             transition: {
                               delay: 0.2,
                               type: "spring",
                               stiffness: 400,
                               damping: 20
                             }
                           }}
                           className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#3272d2] to-[#3eb489] rounded-full flex items-center justify-center"
                         >
                           <svg
                             className="w-8 h-8 text-white"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                           >
                             <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               strokeWidth={2}
                               d="M5 13l4 4L19 7"
                             />
                           </svg>
                         </motion.div>
                         <motion.h3
                           initial={{ y: 20, opacity: 0 }}
                           animate={{
                             y: 0,
                             opacity: 1,
                             transition: { delay: 0.3 }
                           }}
                           className="text-2xl font-bold mb-2 text-lightText dark:text-darkText"
                         >
                           {t('contact.successMessage')}
                         </motion.h3>
                         <motion.p
                           initial={{ y: 20, opacity: 0 }}
                           animate={{
                             y: 0,
                             opacity: 1,
                             transition: { delay: 0.4 }
                           }}
                           className="text-lightText/70 dark:text-darkText/70"
                         >
                           {t('contact.messageSuccess')}
                         </motion.p>
                       </div>
                     </motion.div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </AnimationErrorBoundary>
           </div>

           {/* Background overlay */}
           <div
             className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-lightBackground/20 dark:to-darkBackground/20 pointer-events-none"
             aria-hidden="true"
           />
         </section>
       );
     });

Contact.displayName = 'Contact';
