import React from 'react';
import { motion, useScroll } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="scroll-progress">
      <motion.div
        className="scroll-progress-bar origin-top h-full"
        style={{ scaleY: scrollYProgress }}
      />
    </div>
  );
};

export default ScrollProgress;
