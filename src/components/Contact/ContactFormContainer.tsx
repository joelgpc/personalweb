import { motion, useIsPresent } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimationErrorBoundary } from '../AnimationErrorBoundary';

interface ContactFormContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  isSubmitting: boolean;
  isLastStep: boolean;
  onSubmit: (event: React.FormEvent) => void; // Add onSubmit prop
}
export const ContactFormContainer = ({
  children,
  currentStep,
  totalSteps,
  onNextStep,
  onPrevStep,
  isSubmitting,
  isLastStep,
  onSubmit
}: ContactFormContainerProps) => {
  const { t } = useTranslation();
  const isPresent = useIsPresent();

  useEffect(() => {
    return () => {
      // Cleanup animations when component unmounts
      const cleanup = async () => {
        if (!isPresent) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      };
      cleanup();
    };
  }, [isPresent]);

  return (
    <AnimationErrorBoundary
      fallback={
        <div className="relative w-full overflow-hidden opacity-80">
          <div className="relative w-full bg-white/5 dark:bg-darkBackground/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 md:p-12 shadow-xl">
            {children}
          </div>
        </div>
      }
    >
      <div className="relative w-full overflow-hidden">
        <motion.form
          className="relative w-full max-w-2xl mx-auto bg-white/5 dark:bg-darkBackground/10 backdrop-blur-md rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl"
          layout
          initial={false}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          exit={{
            opacity: 0,
            x: -50,
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          onSubmit={onSubmit}
        >
      {/* Honeypot field */}
      <input
        type="text"
        name="_honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        onChange={() => {}} // Empty handler to avoid React warnings
      />
      {/* Progress indicators */}
      {/* Progress indicators */}
      <div className="absolute top-0 left-0 right-0 -mt-6 flex justify-center items-center gap-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            className={`relative w-4 h-4 rounded-full shadow-lg ${
              index + 1 === currentStep
                ? 'bg-gradient-to-r from-[#3272d2] to-[#3eb489] ring-4 ring-blue-200 dark:ring-blue-900'
                : index + 1 < currentStep
                ? 'bg-green-500 dark:bg-green-400'
                : 'bg-lightText/10 dark:bg-darkText/10'
            }`}
            initial={false}
            layout
            animate={{
              scale: index + 1 === currentStep ? 1.2 : 1,
              opacity: index + 1 <= currentStep ? 1 : 0.5,
            }}
            transition={{
              layout: { duration: 0.3 },
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 },
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {index + 1 < currentStep && (
              <motion.svg
                className="absolute inset-0 w-full h-full text-white"
                viewBox="0 0 24 24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <path
                  fill="currentColor"
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                />
              </motion.svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Form content */}
      <motion.div
        className="relative min-h-[400px] flex flex-col justify-center items-center px-4 sm:px-6 mt-8"
        layout
        transition={{
          layout: { duration: 0.3 },
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div className="relative z-10 w-full max-w-lg mx-auto">
          {children}
        </div>
      </motion.div>

      {/* Navigation buttons with improved layout */}
      <div className="relative flex flex-col sm:flex-row justify-center w-full gap-4 sm:gap-6 mt-12">
        {currentStep > 1 && (
          <motion.button
            type="button"
            onClick={onPrevStep}
            className="group relative bg-transparent text-lightText dark:text-darkText rounded-xl px-6 sm:px-8 py-3 font-medium
              border-2 border-lightText/20 dark:border-darkText/20
              hover:bg-white/10 dark:hover:bg-darkBackground/10 hover:border-[#3272d2]/50
              shadow-lg backdrop-blur-sm
              w-full sm:w-auto text-base"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            layout
            whileHover={{ scale: 1.02, x: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              layout: { duration: 0.2 },
              scale: { duration: 0.1 }
            }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('contact.prevButton')}
            </span>
          </motion.button>
        )}

        <motion.button
          type={isLastStep ? "submit" : "button"}
          onClick={isLastStep ? undefined : onNextStep}
          disabled={isSubmitting}
          className={`group relative
            bg-gradient-to-r from-[#3272d2] to-[#3eb489]
            text-white font-bold px-6 sm:px-8 py-3 rounded-xl
            shadow-lg backdrop-blur-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            w-full sm:w-auto text-base
            flex items-center justify-center gap-2
            overflow-hidden
          `}
          layout
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 20px rgba(50,114,210,0.3)',
            background: 'linear-gradient(to right, #2861c1, #35a077)'
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            layout: { duration: 0.3 },
            scale: { duration: 0.2 },
            boxShadow: { duration: 0.2 },
            background: { duration: 0.3 }
          }}
        >
          <div className="relative flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                <span>{t('contact.sending')}</span>
              </>
            ) : (
              <>
                <span>{isLastStep ? t('contact.submitButton') : t('contact.nextButton')}</span>
                {!isLastStep && (
                  <svg
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </>
            )}
          </div>
        </motion.button>
      </div>
         </motion.form>
       </div>
     </AnimationErrorBoundary>
   );
 };