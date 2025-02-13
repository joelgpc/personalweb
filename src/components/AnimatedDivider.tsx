import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedDividerProps {
  className?: string;
  color?: string;
  style?: 'line' | 'dots' | 'wave';
}

export default function AnimatedDivider({ 
  className = "", 
  color = "currentColor",
  style = "line" 
}: AnimatedDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const progress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const renderDivider = () => {
    switch (style) {
      case 'dots':
        return (
          <div className="flex justify-center items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: color,
                  scale: useTransform(progress, [i/5, (i+1)/5], [0, 1]),
                  opacity
                }}
              />
            ))}
          </div>
        );
      
      case 'wave':
        return (
          <motion.div className="w-full h-8 relative overflow-hidden">
            <svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <motion.path
                d="M0,0 C300,60 900,-60 1200,0 L1200,60 L0,60 Z"
                fill={color}
                style={{
                  opacity: useTransform(progress, [0, 1], [0, 0.1]),
                  pathLength: progress
                }}
              />
            </svg>
          </motion.div>
        );
      
      default: // line
        return (
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              className="h-0.5 rounded-full"
              style={{
                backgroundColor: color,
                width: useTransform(progress, [0, 1], ["0%", "40%"]),
                opacity
              }}
            />
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: color,
                scale: useTransform(progress, [0.4, 0.6], [0, 1]),
                opacity
              }}
            />
            <motion.div
              className="h-0.5 rounded-full"
              style={{
                backgroundColor: color,
                width: useTransform(progress, [0, 1], ["0%", "40%"]),
                opacity
              }}
            />
          </div>
        );
    }
  };

  return (
    <div 
      ref={ref}
      className={`w-full py-4 overflow-hidden ${className}`}
    >
      {renderDivider()}
    </div>
  );
}