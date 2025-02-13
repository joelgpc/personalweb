import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  description?: string;
  className?: string;
  showValue?: boolean;
  height?: number;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  label,
  description,
  className = "",
  showValue = true,
  height = 4,
  animated = true
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: barRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, value / 100, value / 100]
  );

  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    [0, 0, 1]
  );

  return (
    <div 
      ref={barRef}
      className={`relative space-y-2 ${className}`}
    >
      {(label || showValue) && (
        <motion.div 
          className="flex justify-between items-center text-sm"
          style={{ opacity: animated ? labelOpacity : 1 }}
        >
          {label && (
            <span className="font-medium text-lightText-secondary dark:text-darkText-secondary">
              {label}
            </span>
          )}
          {showValue && (
            <span className="font-semibold text-lightText dark:text-darkText">
              {value}%
            </span>
          )}
        </motion.div>
      )}
      
      <div 
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative"
        style={{ height }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-corporateBlue-500 to-corporateBlue-600 dark:from-corporateBlue-400 dark:to-corporateBlue-500"
          style={{
            width: '100%',
            scaleX: animated ? scaleX : value / 100,
            transformOrigin: 'left'
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 dark:from-white/5 dark:to-white/10" />
        </motion.div>
        
        {/* Shine effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }}
        >
          <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12" />
        </motion.div>
      </div>
      
      {description && (
        <motion.p 
          className="text-xs text-lightText-secondary dark:text-darkText-secondary mt-1"
          style={{ opacity: animated ? labelOpacity : 1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}