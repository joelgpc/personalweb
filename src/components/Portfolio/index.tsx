import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PortfolioGrid from './PortfolioGrid';

export const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('sections.portfolio.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('sections.portfolio.description')}
          </p>
        </motion.div>

        <PortfolioGrid />
      </div>
    </section>
  );
}; 