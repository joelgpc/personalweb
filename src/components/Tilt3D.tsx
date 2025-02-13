import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  scale?: number;
  intensity?: number;
  glareEnabled?: boolean;
  glareColor?: string;
  glarePosition?: "all" | "top" | "bottom";
}

export default function Tilt3D({
  children,
  className = "",
  perspective = 1000,
  scale = 1.05,
  intensity = 20,
  glareEnabled = true,
  glareColor = "rgba(255, 255, 255, 0.4)",
  glarePosition = "all"
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

  const glareX = useTransform(springX, [-0.5, 0.5], [-50, 50], {
    clamp: true,
  });
  const glareY = useTransform(springY, [-0.5, 0.5], [-50, 50], {
    clamp: true,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      x.set(normalizedX);
      y.set(normalizedY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  const renderGlare = () => {
    if (!glareEnabled) return null;

    const glareStyles = {
      position: 'absolute',
      width: '200%',
      height: '200%',
      background: `radial-gradient(circle at 50% 50%, ${glareColor}, transparent 50%)`,
      transform: `translate(${glareX}%, ${glareY}%)`,
      pointerEvents: 'none',
      mixBlendMode: 'overlay',
      opacity: 0.5,
    } as const;

    switch (glarePosition) {
      case "top":
        return <motion.div style={{ ...glareStyles, top: '-100%' }} />;
      case "bottom":
        return <motion.div style={{ ...glareStyles, bottom: '-100%' }} />;
      default:
        return <motion.div style={{ ...glareStyles, top: '-50%', left: '-50%' }} />;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {children}
        {renderGlare()}
      </motion.div>
    </motion.div>
  );
}