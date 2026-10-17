import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';

export const ScrollProgressBar: React.FC = () => {
  const { isDark } = useTheme();
  const { settings } = usePortfolioData();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Monitor window scroll progress
  const { scrollYProgress, scrollY } = useScroll();

  // Smooth, refined spring physics for a fluid luxury feel without jitter
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 38,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      // Reveal subtly once the user has initiated scroll (past 2px)
      setHasScrolled(latest > 2);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Luxury theme color palette
  const primary = settings?.primary_color || (isDark ? '#00E5FF' : '#00B8D4');
  const secondary = settings?.secondary_color || (isDark ? '#8B5CF6' : '#7C3AED');
  const accent = settings?.accent_color || (isDark ? '#D4AF37' : '#F59E0B');

  const gradientStyle = {
    background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 55%, ${accent} 95%, #FFFFFF 100%)`,
  };

  const glowStyle = {
    background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 60%, ${accent} 100%)`,
  };

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none"
    >
      {/* Hairline subtle track */}
      <div
        className={`relative w-full h-[2.5px] transition-opacity duration-300 ${
          hasScrolled ? 'opacity-100' : 'opacity-0'
        } ${
          isDark
            ? 'bg-white/[0.03] border-b border-white/[0.02]'
            : 'bg-black/[0.02] border-b border-black/[0.02]'
        }`}
      >
        {/* Ambient bloom aura underneath the progress bar */}
        <motion.div
          style={{
            scaleX,
            transformOrigin: '0% 50%',
            ...glowStyle,
          }}
          className={`absolute -top-[1px] left-0 right-0 h-[5px] blur-[3px] transition-opacity duration-300 ${
            isDark ? 'opacity-70' : 'opacity-40'
          }`}
        />

        {/* Sharp luxury progress bar with specular highlight */}
        <motion.div
          style={{
            scaleX,
            transformOrigin: '0% 50%',
            ...gradientStyle,
          }}
          className={`relative h-[2.5px] w-full transition-opacity duration-300 ${
            isDark
              ? 'shadow-[0_0_8px_rgba(0,229,255,0.4),0_0_15px_rgba(212,175,55,0.25)]'
              : 'shadow-[0_0_8px_rgba(0,184,212,0.35),0_0_12px_rgba(124,58,237,0.2)]'
          }`}
        />
      </div>
    </div>
  );
};
