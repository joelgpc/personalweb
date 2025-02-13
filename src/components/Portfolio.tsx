import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Suspense, forwardRef } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

interface ProjectMetrics {
  roi: string;
  timeline: string;
  growth?: string;
  efficiency?: string;
}

interface Project {
  title: string;
  category: string;
  description: string;
  metrics: ProjectMetrics;
  image?: string;
}

const projectImages = {
  'E-commerce Growth Strategy': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
  'Sales Team Restructuring': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80'
};

interface PortfolioContentProps {
    ref?: React.Ref<HTMLElement>;
  }
  
  const PortfolioContent = forwardRef<HTMLElement, PortfolioContentProps>((_, ref) => {
      const { t } = useTranslation();
    const [inViewRef, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });
  
    const projects = t('portfolio.projects', { returnObjects: true });
  
    if (!Array.isArray(projects)) {
      throw new Error('Failed to load portfolio projects');
    }
  
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
      id="portfolio"
      className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('portfolio.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {(projects as Project[]).map((project: Project, index: number) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={projectImages[project.title as keyof typeof projectImages]}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="transform group-hover:translate-y-0 group-hover:opacity-100 translate-y-4 opacity-0 transition-transform duration-300"
                >
                  <span className="text-sm font-medium text-white/80 bg-black/20 px-4 py-2 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-2 mb-1">{project.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                  <div className="flex gap-4 flex-wrap">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <span key={key} className="text-sm text-white bg-white/20 px-3 py-1 rounded-full">
                        {value}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <motion.button
                      className="bg-corporateBlue-500 hover:bg-corporateBlue-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('portfolio.viewDetails')} <ArrowUpRight className="w-4 h-4"/>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

PortfolioContent.displayName = 'PortfolioContent';

export const Portfolio: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <PortfolioContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Portfolio;
