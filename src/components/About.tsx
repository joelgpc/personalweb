import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, Suspense, forwardRef } from 'react';
import MinimalParticles from './MinimalParticles';
import ScrollProgress from './ScrollProgress';
import AnimatedDivider from './AnimatedDivider';
import ProgressBar from './ProgressBar';
import PulsingBorder from './PulsingBorder';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const AboutContent = forwardRef<HTMLElement, {}>((_props, ref) => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
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
      id="about"
      className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-500"
      aria-labelledby="about-title"
    >
      <ScrollProgress />

      <MinimalParticles
        count={40}
        color="var(--primary-color, rgb(59 130 246))"
        scrollEffect={true}
        density={1.5}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="text-center mb-20"
        >
          <motion.h2
            id="about-title"
            className="text-4xl md:text-5xl font-bold mb-6 font-serif bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-700 dark:from-corporateBlue-400 dark:to-corporateBlue-600 bg-clip-text text-transparent"
            style={{ opacity }}
          >
            {t('about.title')}
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.highlightsText')}
          </p>
          <AnimatedDivider
            style="line"
            color="var(--primary-color, rgb(59 130 246))"
            className="my-8"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="relative md:sticky md:top-32"
          >
            <PulsingBorder className="mx-auto max-w-md rounded-2xl overflow-hidden shadow-xl">
              <motion.img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"
                alt={t('about.title')}
                className="w-full h-auto aspect-square object-cover relative transition-transform duration-500 hover:scale-105 rounded-2xl"
                loading="lazy"
                style={{ filter: 'brightness(1.05)' }}
              />
            </PulsingBorder>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-12 text-gray-900 dark:text-white"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-700 dark:from-corporateBlue-400 dark:to-corporateBlue-600 bg-clip-text text-transparent">
                {t('about.summaryTitle')}
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {t('about.summaryText')}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-700 dark:from-corporateBlue-400 dark:to-corporateBlue-600 bg-clip-text text-transparent">
                {t('about.educationTitle')}
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                {t('about.educationText')}
              </p>
              <ProgressBar
                value={Number(t('about.educationProgress'))}
                label={t('about.educationTitle')}
                animated={true}
                height={6}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-700 dark:from-corporateBlue-400 dark:to-corporateBlue-600 bg-clip-text text-transparent">
                {t('about.achievementsTitle')}
              </h3>
              <p className="text-lg italic text-gray-600 dark:text-gray-300">
                {t('about.achievementsIntro')}
              </p>
              <ul className="space-y-6 mt-8">
                {Array.isArray(t('about.achievementsList', { returnObjects: true })) ? (
                  (t('about.achievementsList', { returnObjects: true }) as string[]).map((achievement: string, index: number) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-4 group"
                      variants={itemVariants}
                      custom={index}
                    >
                      <div className="relative flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-corporateBlue-500 dark:bg-corporateBlue-400 rounded-full group-hover:scale-125 transition-transform"/>
                        <div className="absolute -inset-2 bg-corporateBlue-500/20 dark:bg-corporateBlue-400/20 rounded-full animate-pulse"/>
                      </div>
                      <span className="flex-1 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        {achievement}
                      </span>
                    </motion.li>
                  ))
                ) : (
                  <li>
                    <p className="text-red-500">Error loading achievements list.</p>
                  </li>
                )}
              </ul>
              <ProgressBar
                value={Number(t('about.achievementsProgress'))}
                label={t('about.achievementsTitle')}
                animated={true}
                height={6}
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="mt-20 text-center"
        >
          <motion.button
            className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-700 rounded-full hover:from-corporateBlue-600 hover:to-corporateBlue-800 transition-all duration-500 shadow-lg hover:shadow-xl relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
              {isHovered ? t('about.ctaPortfolio') : t('hero.viewPortfolioButton')}
            </span>
            <motion.svg
              className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          </motion.button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            {t('about.ctaPortfolioDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  );
});
  
export const About = forwardRef<HTMLElement>((_, ref) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AboutContent ref={ref} />
      </Suspense>
    </ErrorBoundary>
  );
});

export default About;
