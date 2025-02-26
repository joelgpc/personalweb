import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import CircularProgress from './CircularProgress';
import { memo } from 'react';
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
    style={{ '--skill-level': `${skill.level}%` } as any}
    whileHover={{ scale: 1.02 }}
    role="article"
    aria-label={t(`skills.items.${skill.key}.name`)}
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
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={skill.level}
          aria-label={`${t(`skills.items.${skill.key}.name`)} - ${skill.level}%`}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="font-bold text-gray-900 dark:text-white text-lg" aria-hidden="true">
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
    
    <div 
      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      aria-hidden="true"
    />
  </motion.div>
));

SkillCard.displayName = 'SkillCard';

const CategorySection = memo(({ category, inView, t }: {
  category: typeof categories[0];
  inView: boolean;
  t: (key: string) => string;
}) => (
  <div className="space-y-8" role="region" aria-label={t(category.title)}>
    <div className="flex items-center gap-4">
      <span className="text-2xl" role="img" aria-hidden="true">
        {category.icon}
      </span>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t(category.title)}
      </h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.skills.map((skill) => (
        <SkillCard key={skill.key} skill={skill} inView={inView} t={t} />
      ))}
    </div>
  </div>
));

CategorySection.displayName = 'CategorySection';

const Skills = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative py-20 bg-gray-50 dark:bg-gray-900"
      id="skills"
    >
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {categories.map((category) => (
            <CategorySection
              key={category.key}
              category={category}
              inView={inView}
              t={t}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
