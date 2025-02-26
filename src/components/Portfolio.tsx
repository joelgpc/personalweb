import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

interface ProjectMetrics {
  roi: string;
  timeline: string;
  growth?: string;
  efficiency?: string;
  impact?: string;
  savings?: string;
  reduction?: string;
}

interface Project {
  title: string;
  category: string;
  description: string;
  metrics: ProjectMetrics;
}

const PortfolioContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { ref: inViewRef } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = t('portfolio.projects', { returnObjects: true });
        if (Array.isArray(projectsData)) {
          setProjects(projectsData as Project[]);
        } else {
          console.error('Portfolio projects data is not an array:', projectsData);
          setProjects([]);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [t, i18n.language]);

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  const categories = [...new Set(projects.map(project => project.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]" role="status">
        <LoadingSpinner />
        <span className="sr-only">{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <section
      ref={inViewRef}
      id="portfolio"
      className="relative py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 
            id="portfolio-heading"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {t('portfolio.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition-all ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            aria-pressed={!selectedCategory}
          >
            {t('portfolio.allCategories')}
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              aria-pressed={selectedCategory === category}
            >
              {t(`portfolio.categories.${category}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={`/images/portfolio/${project.category}.jpg`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/70 group-hover:to-black/30 transition-colors duration-300"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div 
                    className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={false}
                  >
                    <span className="text-sm font-medium text-white/90 bg-primary/30 backdrop-blur-sm px-4 py-2 rounded-full">
                      {t(`portfolio.categories.${project.category}`)}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-3 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <span 
                          key={key} 
                          className="text-sm text-white/90 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
                        >
                          {`${t(`portfolio.metrics.${key}`)}: ${value}`}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const Portfolio: React.FC = () => (
  <ErrorBoundary>
    <PortfolioContent />
  </ErrorBoundary>
);

export default Portfolio;
