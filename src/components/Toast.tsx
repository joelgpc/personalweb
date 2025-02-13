import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-50 pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white px-6 py-3 rounded-lg shadow-lg border border-corporateBlue-200/50 dark:border-corporateBlue-700/30 backdrop-blur-lg flex items-center gap-3 min-w-[200px] max-w-[90vw] md:max-w-md overflow-hidden">
            {/* Fondo con gradiente sutil */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-corporateBlue-50/20 via-transparent to-corporateBlue-50/20 dark:from-corporateBlue-900/20 dark:via-transparent dark:to-corporateBlue-900/20"
              style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}
            />

            {/* Indicador de éxito */}
            <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-corporateBlue-400/20 to-corporateBlue-500/20 dark:from-corporateBlue-400/10 dark:to-corporateBlue-500/10 flex items-center justify-center">
              <motion.svg
                className="w-6 h-6 text-corporateBlue-500 dark:text-corporateBlue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </motion.svg>
            </div>

            <div className="relative flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {message}
              </p>
              
              {/* Barra de progreso con gradiente */}
              <div className="mt-1.5 h-1 rounded-full overflow-hidden bg-gradient-to-r from-gray-200/50 via-gray-200 to-gray-200/50 dark:from-gray-700/50 dark:via-gray-700 dark:to-gray-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-corporateBlue-400 via-corporateBlue-500 to-corporateBlue-400 dark:from-corporateBlue-500 dark:via-corporateBlue-400 dark:to-corporateBlue-500"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}