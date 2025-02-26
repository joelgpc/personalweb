import { motion } from 'framer-motion';

export const Logo = () => {
  return (
    <motion.div
      className="relative w-12 h-12"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-[#0284c7] dark:text-[#38bdf8]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base tecnológica - forma hexagonal moderna */}
        <motion.path
          d="M50 10L85 30V70L50 90L15 70V30L50 10Z"
          className="stroke-current"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* La J correctamente orientada */}
        <motion.path
          d="M55 30V55C55 62 50 65 45 65"
          className="stroke-current"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* La M estilizada */}
        <motion.path
          d="M25 65V35L35 50L45 35V65"
          className="stroke-current"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        {/* Elementos tecnológicos */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          {/* Líneas de conexión que sugieren tecnología/redes */}
          <line 
            x1="65" 
            y1="40" 
            x2="75" 
            y2="40" 
            className="stroke-current" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line 
            x1="70" 
            y1="50" 
            x2="80" 
            y2="50" 
            className="stroke-current" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line 
            x1="65" 
            y1="60" 
            x2="75" 
            y2="60" 
            className="stroke-current" 
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}; 