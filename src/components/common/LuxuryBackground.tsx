import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'motion/react';

export const LuxuryBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {isDark ? (
        /* Theme 2: Black Mamba + Royal Purple + Luxury Gold */
        <>
          {/* Deep Black Canvas */}
          <div className="absolute inset-0 bg-[#050505]" />

          {/* Luxury Purple Nebula Glow - Top Right */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.22, 0.32, 0.22],
              x: [0, 25, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full blur-[140px] bg-[#6D28D9]/40"
          />

          {/* Luxury Gold Halo - Center Left */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.26, 0.15],
              x: [0, -30, 0],
              y: [0, 35, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full blur-[150px] bg-[#D4AF37]/25"
          />

          {/* Deep Purple Ambient Base - Bottom Right */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.18, 0.28, 0.18],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#4C1D95]/30"
          />

          {/* Subtle Cyber Grid */}
          <div 
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        </>
      ) : (
        /* Theme 1: Apple Titanium Emerald Light */
        <>
          {/* Apple Off-White Canvas */}
          <div className="absolute inset-0 bg-[#F7FAF9]" />

          {/* Emerald Orb - Top Left */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.45, 0.65, 0.45],
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-28 -left-28 w-[600px] h-[600px] rounded-full blur-[130px] bg-[#00C896]/20"
          />

          {/* Mint & Aquamarine Glow - Center Right */}
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.35, 0.55, 0.35],
              x: [0, -25, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 -right-32 w-[550px] h-[550px] rounded-full blur-[140px] bg-[#7FFFD4]/30"
          />

          {/* Soft Slate/Teal Ambient - Bottom Left */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] bg-[#00A57A]/15"
          />

          {/* Apple Clean Dot Matrix */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(#00C896 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />
        </>
      )}
    </div>
  );
};
