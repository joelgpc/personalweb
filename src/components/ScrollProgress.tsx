import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 h-36 w-1 bg-gray-200 dark:bg-gray-700 rounded-full z-50"
      style={{
        originY: 0,
      }}
    >
      <motion.div
        className="w-full bg-gradient-to-b from-corporateBlue-400 to-corporateBlue-600 rounded-full shadow-progress"
        style={{ 
          scaleY,
          originY: 0,
          '--scroll': `${scrollYProgress.get() * 100}%`
        } as any}
      />
      <div className="absolute -right-2 top-0 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-corporateBlue-500 shadow-lg transform -translate-y-1/2" />
      <div className="absolute -right-2 bottom-0 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-corporateBlue-500 shadow-lg transform translate-y-1/2" />
    </motion.div>
  );
}