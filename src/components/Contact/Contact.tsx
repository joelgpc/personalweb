import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContactTypeform from './ContactTypeform';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <div className="flex-1 flex flex-col justify-center py-20 md:pt-40">
        {/* Header Section */}
        <div className="container mx-auto px-4 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Talk
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help you make it happen.
            </h2>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-4 mt-10 md:mt-16">
          <div className="max-w-3xl mx-auto">
            <ContactTypeform />
          </div>
        </div>
      </div>
    </section>
  );
}; 