import { motion } from 'framer-motion';

interface PulsingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  color?: string;
}

export default function PulsingBorder({
  children,
  className = "",
  borderWidth = 2,
  duration = 3,
  color = "var(--primary-color, rgb(59 130 246))"
}: PulsingBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-0.5 rounded-full opacity-75"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}66)`,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-full blur-xl"
        style={{
          background: `linear-gradient(90deg, ${color}33, ${color}11)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: duration / 2
        }}
      />
      
      {/* Border container */}
      <div 
        className="relative rounded-full overflow-hidden"
        style={{ padding: borderWidth }}
      >
        {/* Gradient border */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}66, ${color})`,
            opacity: 0.8
          }}
        />
        
        {/* Content container */}
        <div className="relative rounded-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}