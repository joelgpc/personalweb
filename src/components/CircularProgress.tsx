import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

export default function CircularProgress({
  value,
  size = 120,
  strokeWidth = 4,
  color = '#3B82F6',
  showValue = true,
  animated = true,
  className = ''
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setProgress(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(value);
    }
  }, [value, animated]);

  const circleVariants = {
    hidden: { strokeDashoffset: circumference },
    visible: { 
      strokeDashoffset: offset,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Progress circle */}
        <motion.circle
          ref={circleRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="drop-shadow-lg transition-colors duration-300"
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      )}
    </div>
  );
}