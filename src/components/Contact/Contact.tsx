import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../SEO';
import ContactForm from './ContactForm/ContactForm';
import { ContactFormData } from '../../schemas/contactSchema';

const SuccessView = ({ name }: { name: string }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-2xl mx-auto">
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
              {t('contact.form.completion.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('contact.form.completion.message', { name })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState<ContactFormData | null>(null);

  const handleFormSuccess = (data: ContactFormData) => {
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  return (
    <>
      <SEO 
        title={`${t('contact.title')} - Joel Mercado`}
        description={t('contact.subtitle')}
      />
      
      <section 
        id="contact" 
        className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0284c7] to-[#0369a1] dark:from-[#38bdf8] dark:to-[#0284c7]">
            {t('contact.title')}
          </h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            {t('contact.subtitle')}
          </h2>
        </div>

        <div className="w-full max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSubmitted ? 'success' : 'form'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {isSubmitted && submittedData ? (
                <SuccessView name={submittedData.name} />
              ) : (
                <ContactForm onFormSuccess={handleFormSuccess} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Contact;