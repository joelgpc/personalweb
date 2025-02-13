import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <motion.div
        className="relative w-16 h-16"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 dark:border-t-blue-400"
          animate={{
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 dark:border-t-blue-300"
          animate={{
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-light text-blue-500 dark:text-blue-400">
            Cargando
          </span>
        </div>
      </motion.div>
    </div>
  );
}