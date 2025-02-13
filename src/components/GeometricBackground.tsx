import { motion } from 'framer-motion';
import { memo } from 'react';

const GeometricBackground = memo(() => {
  const particles = [...Array(6)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-corporateBlue-400/10 dark:bg-corporateBlue-400/5"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            delay: particle.id * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
});

GeometricBackground.displayName = 'GeometricBackground';

export default GeometricBackground;