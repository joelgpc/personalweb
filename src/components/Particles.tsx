import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color?: string;
  shape?: 'circle' | 'square' | 'star';
}

interface ParticlesProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  scrollEffect?: boolean;
  localEffect?: boolean;
  shapes?: ('circle' | 'square' | 'star')[];
  intensity?: number;
  area?: {
    x: [number, number];
    y: [number, number];
  };
  colors?: string[];
}

interface ParticleStyle {
  left: `${number}%`;
  top: `${number}%`;
  backgroundColor: string;
  opacity: number | MotionValue<number>;
  scale: 1 | MotionValue<number>;
  transform?: string;
}

export default function Particles({ 
  count = 20, 
  color = 'currentColor',
  minSize = 1,
  maxSize = 3,
  scrollEffect = true,
  localEffect = false,
  shapes = ['circle'],
  intensity = 1,
  area,
  colors
}: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const particleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.2, 0.8]
  );

  const particleOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.7, 0.3]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!localEffect) return;
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [localEffect]);

  const generateParticles = () => {
    return Array.from({ length: count }, (_, i) => {
      const x = area ? 
        Math.random() * (area.x[1] - area.x[0]) + area.x[0] :
        Math.random() * 100;
      
      const y = area ?
        Math.random() * (area.y[1] - area.y[0]) + area.y[0] :
        Math.random() * 100;

      return {
        id: i,
        x,
        y,
        tx: (Math.random() - 0.5) * 50 * intensity,
        ty: (Math.random() - 0.5) * 50 * intensity,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors ? colors[Math.floor(Math.random() * colors.length)] : undefined,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      };
    });
  };

  useEffect(() => {
    setParticles(generateParticles());
    const interval = setInterval(() => setParticles(generateParticles()), 5000);
    return () => clearInterval(interval);
  }, [count, minSize, maxSize, area, colors, shapes, intensity]);

  const renderShape = (shape: 'circle' | 'square' | 'star', size: number) => {
    switch (shape) {
      case 'square':
        return (
          <motion.div
            style={{
              width: size,
              height: size,
              borderRadius: '2px',
              rotate: Math.random() * 360
            }}
          />
        );
      case 'star':
        return (
          <motion.svg
            width={size * 2}
            height={size * 2}
            viewBox="0 0 24 24"
            style={{ transform: `rotate(${Math.random() * 360}deg)` }}
          >
            <path
              d="M12 1L15.09 7.94L22.46 8.62L17.23 14.12L18.82 21.41L12 17.77L5.18 21.41L6.77 14.12L1.54 8.62L8.91 7.94L12 1Z"
              fill="currentColor"
            />
          </motion.svg>
        );
      default:
        return (
          <motion.div
            style={{
              width: size,
              height: size,
              borderRadius: '50%'
            }}
          />
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const particleStyle: ParticleStyle = {
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          backgroundColor: particle.color || color,
          opacity: scrollEffect ? particleOpacity : particle.opacity,
          scale: scrollEffect ? particleScale : 1,
        };

        if (localEffect) {
          const dx = mousePosition.x - (particle.x * window.innerWidth / 100);
          const dy = mousePosition.y - (particle.y * window.innerHeight / 100);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 15;
            particleStyle.transform = `translate(${dx / distance * force}px, ${dy / distance * force}px)`;
          }
        }

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={particleStyle}
            animate={{
              x: [0, particle.tx, 0],
              y: [0, particle.ty, 0],
              opacity: [0, particle.opacity, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {renderShape(particle.shape || 'circle', particle.size)}
          </motion.div>
        );
      })}
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            transparent 0%, 
            transparent 50%, 
            ${color === 'currentColor' ? 'rgba(0,0,0,0.05)' : `${color}0d`} 100%
          )`
        }}
      />
    </div>
  );
}