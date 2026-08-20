import React from 'react';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ 
        duration: 0.35, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="w-full min-h-[calc(100vh-200px)] pt-24 pb-16"
    >
      {children}
    </motion.div>
  );
};
