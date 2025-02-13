import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

interface MinimalParticlesProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  scrollEffect?: boolean;
  density?: number;
  className?: string;
}

interface ParticleStyleProps {
  left: string;
  top: string;
  width: number;
  height: number;
  backgroundColor: string;
  opacity: number | MotionValue<number>;
}

export default function MinimalParticles({
  count = 30,
  color = "currentColor",
  minSize = 1,
  maxSize = 2,
  scrollEffect = true,
  density = 1,
  className = ''
}: MinimalParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollYProgress } = useScroll();
  
  const particleOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 0.6, 0.3]
  );

  const generateParticles = () => {
    const cellSize = 50 / density;
    const cols = Math.ceil(100 / cellSize);
    const rows = Math.ceil(100 / cellSize);
    const particlesCount = Math.min(count, cols * rows);

    return Array.from({ length: particlesCount }, (_, i) => {
      const col = Math.floor(i % cols);
      const row = Math.floor(i / cols);
      
      const baseX = (col * cellSize) + (cellSize / 2);
      const baseY = (row * cellSize) + (cellSize / 2);
      
      // Add some randomness within the cell
      const offsetX = (Math.random() - 0.5) * cellSize * 0.8;
      const offsetY = (Math.random() - 0.5) * cellSize * 0.8;

      return {
        id: i,
        x: baseX + offsetX,
        y: baseY + offsetY,
        size: Math.random() * (maxSize - minSize) + minSize,
        opacity: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 5
      };
    });
  };

  useEffect(() => {
    setParticles(generateParticles());
  }, [count, density]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="relative w-full h-full">
        {particles.map((particle, index) => {
          const isConnected = index < particles.length - 1;
          const nextParticle = particles[index + 1];

          const particleStyle: ParticleStyleProps = {
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: scrollEffect ? particleOpacity : particle.opacity
          };

          return (
            <div key={particle.id}>
              <motion.div
                className="absolute rounded-full"
                style={particleStyle}
                animate={{
                  opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
                }}
                transition={{
                  duration: 3,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {isConnected && (
                <motion.div
                  className="absolute left-0 top-0 w-full h-full pointer-events-none"
                  initial={false}
                  animate={{
                    opacity: scrollEffect 
                      ? [particleOpacity.get() * 0.3, particleOpacity.get() * 0.6, particleOpacity.get() * 0.3]
                      : [particle.opacity * 0.3, particle.opacity * 0.6, particle.opacity * 0.3]
                  }}
                  transition={{
                    duration: 3,
                    delay: particle.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-full h-full">
                    <line
                      x1={`${particle.x}%`}
                      y1={`${particle.y}%`}
                      x2={`${nextParticle.x}%`}
                      y2={`${nextParticle.y}%`}
                      stroke={color}
                      strokeWidth={0.2}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
              transparent 0%, 
              transparent 70%, 
              ${color === 'currentColor' ? 'rgba(0,0,0,0.03)' : `${color}05`} 100%
            )`
          }}
        />
      </div>
    </div>
  );
}