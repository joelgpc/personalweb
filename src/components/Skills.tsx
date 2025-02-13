import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import CircularProgress from './CircularProgress';
import { useRef, CSSProperties, Suspense, memo, forwardRef } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import { categories } from '../data/skillsData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const SkillCard = memo(({ skill, inView, t }: {
  skill: { key: string; level: number };
  inView: boolean;
  t: (key: string) => string;
}) => (
  <motion.div
    variants={cardVariants}
    className="group relative bg-white dark:bg-gray-800 rounded-xl p-6
              shadow-md hover:shadow-xl transform hover:-translate-y-1
              transition-all duration-300 ease-in-out
              border border-transparent hover:border-blue-500/20"
    style={{ '--skill-level': `${skill.level}%` } as CSSProperties}
  >
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-24 h-24">
        <CircularProgress
          value={skill.level}
          size={96}
          strokeWidth={4}
          color="var(--color-blue-500)"
          showValue={false}
          animated={inView}
          className="transform transition-transform group-hover:scale-110 duration-300"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="font-bold text-gray-900 dark:text-white text-lg">
            {skill.level}%
          </span>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {t(`skills.items.${skill.key}.name`)}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t(`skills.items.${skill.key}.description`)}
        </p>
      </div>
    </div>
    
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </motion.div>
));

SkillCard.displayName = 'SkillCard';

const CategorySection = memo(({ category, inView, t }: {
  category: typeof categories[0];
  inView: boolean;
  t: (key: string) => string;
}) => (
  <div key={category.key} className="space-y-8">
    <div className="flex items-center gap-4">
      <span className="text-2xl" role="img" aria-label={t(category.title)}>
        {category.icon}
      </span>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t(category.title)}
      </h3>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.skills.map((skill) => (
        <SkillCard
          key={skill.key}
          skill={skill}
          inView={inView}
          t={t}
        />
      ))}
    </div>
  </div>
));

CategorySection.displayName = 'CategorySection';

const SkillsContent = forwardRef<HTMLElement, {}>((_, ref) => {
    const { t, ready } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [inViewRef, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });
  
    if (!ready) {
      return <LoadingSpinner />;
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
        id="skills"
        className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
        aria-labelledby="skills-title"
      >
        <div ref={containerRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 space-y-4"
          >
            <h2
              id="skills-title"
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r
                      from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
            >
              {t('skills.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('skills.subtitle')}
            </p>
          </motion.header>
  
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid gap-12"
          >
            {categories.map((category) => (
              <CategorySection
                key={category.key}
                category={category}
                inView={inView}
                t={t}
              />
            ))}
          </motion.div>
        </div>
      </section>
    );
  });
  
  SkillsContent.displayName = 'SkillsContent';

const Skills = memo(forwardRef<HTMLElement, {}>((_props, ref) => {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <SkillsContent ref={ref} />
        </Suspense>
      </ErrorBoundary>
    );
  }));

Skills.displayName = 'Skills';

export default Skills;
