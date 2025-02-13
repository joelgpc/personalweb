import { motion, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, memo } from 'react';
import GeometricBackground from './GeometricBackground';

const GradientBackground = memo(() => (
  <motion.div
    className="absolute inset-0"
    animate={{
      background: [
        'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.03) 0%, transparent 50%)',
        'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 50%)',
        'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.03) 0%, transparent 50%)'
      ]
    }}
    transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
    aria-hidden="true"
  />
));

GradientBackground.displayName = 'GradientBackground';

const AnimatedBackground = memo(() => (
  <div className="absolute inset-0 z-0">
    <div 
      className="absolute inset-0 animate-gradientFlow bg-[linear-gradient(120deg,_rgba(100,116,139,0.08)_25%,_transparent_50%,_rgba(99,102,241,0.08)_75%)] bg-[length:400%_400%] dark:opacity-20" 
      aria-hidden="true"
    />
    <GeometricBackground />
    <GradientBackground />
  </div>
));

AnimatedBackground.displayName = 'AnimatedBackground';

const HeroComponent = memo(() => {
  const { t } = useTranslation();
  const ctaControls = useAnimation();
  const inactivityTimer = useRef<number>();

  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      inactivityTimer.current = window.setTimeout(() => {
        ctaControls.start({
          scale: [1, 1.05, 1],
          transition: { duration: 1, repeat: 2, repeatType: "reverse" }
        });
      }, 3000);
    };

    window.addEventListener('mousemove', resetInactivityTimer);
    resetInactivityTimer();

    return () => {
      window.removeEventListener('mousemove', resetInactivityTimer);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [ctaControls]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label={t('hero.title')}
    >
      <AnimatedBackground />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 
              className="relative text-7xl md:text-9xl font-sans font-bold mb-8 leading-[1.1] bg-white/20 dark:bg-darkBackground/30 backdrop-blur-lg rounded-3xl border border-corporateBlue-200/30 dark:border-corporateBlue-500/20 p-8 shadow-2xl text-lightText dark:text-darkText"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              {t('hero.title')}
              <span 
                className="block text-4xl md:text-6xl font-light mt-6 bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-400 dark:from-corporateBlue-400 dark:to-corporateBlue-300 bg-clip-text text-transparent"
                style={{ letterSpacing: '0.02em' }}
              >
                {t('hero.subtitle')}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.a
              href="https://www.linkedin.com/in/joelmercadob/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('hero.linkedinButton')}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#006699',
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-[#0077B5] text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 shadow-sm transition-all duration-300 w-full md:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:ring-offset-2 dark:focus:ring-offset-gray-900 group hover:shadow-md"
            >
              <svg 
                className="w-6 h-6"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="text-lg font-medium">
                {t('hero.linkedinButton')}
              </span>
            </motion.a>

            <motion.a
              href="#portfolio"
              animate={ctaControls}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-white/90 dark:bg-darkBackground/50 text-corporateBlue-600 dark:text-corporateBlue-400 px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 w-full md:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-corporateBlue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:bg-corporateBlue-50/30 dark:hover:bg-corporateBlue-900/20"
              aria-label={t('hero.viewPortfolioButton')}
            >
              <span>{t('hero.viewPortfolioButton')}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              
              <div
                className="absolute inset-0 bg-gradient-to-r from-corporateBlue-100/0 via-corporateBlue-50/10 to-corporateBlue-100/0 dark:from-corporateBlue-900/0 dark:via-corporateBlue-800/5 dark:to-corporateBlue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-md text-corporateBlue-600 dark:text-corporateBlue-400 z-50"
      >
        {t('accessibility.skipToMain')}
      </a>
    </section>
  );
});

HeroComponent.displayName = 'Hero';

export default HeroComponent;
