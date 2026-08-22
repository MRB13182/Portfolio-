import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, useScroll, useTransform } from 'motion/react';

export const LuxuryBackground: React.FC = () => {
  const { isDark } = useTheme();
  const { scrollY } = useScroll();

  // Gentle Parallax offsets for depth layers
  const yLayer1 = useTransform(scrollY, [0, 3000], [0, -120]);
  const yLayer2 = useTransform(scrollY, [0, 3000], [0, -220]);
  const yLayer3 = useTransform(scrollY, [0, 3000], [0, -80]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* LAYER 1: BASE CANVAS GRADIENT                                             */}
      {/* ========================================================================= */}
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#08060E] to-[#050505]" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAF9] via-[#E8FFF7] to-[#F7FAF9]" />
      )}

      {/* ========================================================================= */}
      {/* LAYER 2: 5 LARGE FLOATING ORGANIC BLOBS (Continuous Multi-Directional)    */}
      {/* ========================================================================= */}
      {isDark ? (
        /* DARK MODE: Black Mamba, Royal Purple (#7C3AED / #6D28D9), Luxury Gold (#D4AF37 / #FFD700) */
        <motion.div style={{ y: yLayer2 }} className="absolute inset-0">
          {/* Blob 1: Royal Purple Nebula - Top Right */}
          <motion.div
            animate={{
              x: [0, 60, -40, 20, 0],
              y: [0, -50, 40, -30, 0],
              scale: [1, 1.25, 0.95, 1.15, 1],
              opacity: [0.35, 0.55, 0.4, 0.5, 0.35],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[150px] bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]"
          />

          {/* Blob 2: Luxury Gold Halo - Center Left */}
          <motion.div
            animate={{
              x: [0, -50, 40, -20, 0],
              y: [0, 60, -40, 30, 0],
              scale: [1, 1.2, 0.9, 1.1, 1],
              opacity: [0.25, 0.42, 0.28, 0.38, 0.25],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-1/4 -left-44 w-[620px] h-[620px] rounded-full blur-[160px] bg-gradient-to-tr from-[#D4AF37] via-[#FFD700] to-[#B8860B]"
          />

          {/* Blob 3: Vibrant Amethyst Pulse - Bottom Right */}
          <motion.div
            animate={{
              x: [0, 45, -35, 50, 0],
              y: [0, 40, -60, 20, 0],
              scale: [0.95, 1.18, 1, 1.22, 0.95],
              opacity: [0.28, 0.48, 0.32, 0.44, 0.28],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className="absolute -bottom-36 right-1/4 w-[650px] h-[650px] rounded-full blur-[170px] bg-gradient-to-tl from-[#A855F7] via-[#7C3AED] to-[#3B0764]"
          />

          {/* Blob 4: Deep Obsidian Indigo Mist - Top Left */}
          <motion.div
            animate={{
              x: [0, 40, -50, 30, 0],
              y: [0, -40, 50, -20, 0],
              scale: [1.05, 0.9, 1.2, 1, 1.05],
              opacity: [0.2, 0.38, 0.22, 0.35, 0.2],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
            className="absolute -top-32 left-1/6 w-[580px] h-[580px] rounded-full blur-[150px] bg-gradient-to-r from-[#4C1D95] to-[#2E1065]"
          />

          {/* Blob 5: Warm Gold Micro-Center Glow */}
          <motion.div
            animate={{
              x: [0, -30, 35, -15, 0],
              y: [0, 30, -25, 40, 0],
              scale: [1, 1.3, 0.85, 1.15, 1],
              opacity: [0.15, 0.32, 0.18, 0.28, 0.15],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] bg-gradient-to-r from-[#D4AF37]/40 via-[#FFD700]/30 to-[#7C3AED]/30"
          />
        </motion.div>
      ) : (
        /* LIGHT MODE: Apple Titanium Emerald (#00C896, #7FFFD4, #D9FFF0, #00A57A) */
        <motion.div style={{ y: yLayer2 }} className="absolute inset-0">
          {/* Blob 1: Apple Emerald Orb - Top Left */}
          <motion.div
            animate={{
              x: [0, 50, -35, 25, 0],
              y: [0, -40, 45, -20, 0],
              scale: [1, 1.22, 0.95, 1.15, 1],
              opacity: [0.45, 0.7, 0.5, 0.65, 0.45],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-36 -left-36 w-[680px] h-[680px] rounded-full blur-[140px] bg-gradient-to-br from-[#00C896]/35 via-[#10B981]/30 to-[#34D399]/25"
          />

          {/* Blob 2: Mint & Aquamarine Reflection - Center Right */}
          <motion.div
            animate={{
              x: [0, -45, 35, -20, 0],
              y: [0, 55, -35, 25, 0],
              scale: [1.05, 0.9, 1.2, 1, 1.05],
              opacity: [0.4, 0.65, 0.42, 0.58, 0.4],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            className="absolute top-1/3 -right-40 w-[640px] h-[640px] rounded-full blur-[150px] bg-gradient-to-bl from-[#7FFFD4]/45 via-[#A7F3D0]/40 to-[#6EE7B7]/30"
          />

          {/* Blob 3: Deep Forest Emerald Ambient - Bottom Center */}
          <motion.div
            animate={{
              x: [0, 40, -45, 30, 0],
              y: [0, -35, 50, -15, 0],
              scale: [0.95, 1.18, 1, 1.2, 0.95],
              opacity: [0.35, 0.58, 0.38, 0.52, 0.35],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className="absolute -bottom-40 left-1/4 w-[660px] h-[660px] rounded-full blur-[160px] bg-gradient-to-tr from-[#00A57A]/30 via-[#059669]/25 to-[#00C896]/20"
          />

          {/* Blob 4: Soft Spring Titanium Mist - Top Right */}
          <motion.div
            animate={{
              x: [0, -35, 45, -25, 0],
              y: [0, 45, -30, 35, 0],
              scale: [1, 1.25, 0.9, 1.15, 1],
              opacity: [0.3, 0.52, 0.35, 0.48, 0.3],
            }}
            transition={{
              duration: 27,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4.5,
            }}
            className="absolute -top-28 right-1/6 w-[560px] h-[560px] rounded-full blur-[145px] bg-gradient-to-l from-[#D9FFF0]/60 via-[#A7F3D0]/40 to-[#00C896]/20"
          />

          {/* Blob 5: Pure Mint Core Light */}
          <motion.div
            animate={{
              x: [0, 30, -30, 20, 0],
              y: [0, -30, 35, -20, 0],
              scale: [1.1, 0.85, 1.25, 0.95, 1.1],
              opacity: [0.25, 0.45, 0.28, 0.4, 0.25],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[155px] bg-gradient-to-r from-[#7FFFD4]/30 via-[#6EE7B7]/25 to-[#00C896]/20"
          />
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* LAYER 3: SLOW AMBIENT GLOW PARTICLES (Breathing Auroral Star Nodes)       */}
      {/* ========================================================================= */}
      <motion.div style={{ y: yLayer1 }} className="absolute inset-0">
        {/* Glow Node A */}
        <motion.div
          animate={{
            opacity: [0.15, 0.65, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-[18%] left-[22%] w-3 h-3 rounded-full blur-[2px] ${
            isDark ? 'bg-[#FFD700] shadow-[0_0_25px_#FFD700]' : 'bg-[#00C896] shadow-[0_0_20px_#00C896]'
          }`}
        />

        {/* Glow Node B */}
        <motion.div
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.9, 1.5, 0.9],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className={`absolute top-[42%] right-[18%] w-3.5 h-3.5 rounded-full blur-[2px] ${
            isDark ? 'bg-[#A855F7] shadow-[0_0_30px_#A855F7]' : 'bg-[#7FFFD4] shadow-[0_0_25px_#00C896]'
          }`}
        />

        {/* Glow Node C */}
        <motion.div
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4.5 }}
          className={`absolute bottom-[28%] left-[14%] w-3 h-3 rounded-full blur-[2px] ${
            isDark ? 'bg-[#D4AF37] shadow-[0_0_25px_#D4AF37]' : 'bg-[#00A57A] shadow-[0_0_20px_#00A57A]'
          }`}
        />

        {/* Glow Node D */}
        <motion.div
          animate={{
            opacity: [0.2, 0.75, 0.2],
            scale: [0.85, 1.45, 0.85],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className={`absolute bottom-[16%] right-[28%] w-4 h-4 rounded-full blur-[3px] ${
            isDark ? 'bg-[#7C3AED] shadow-[0_0_35px_#7C3AED]' : 'bg-[#34D399] shadow-[0_0_25px_#34D399]'
          }`}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 4: MOVING GLASS LIGHT REFLECTIONS (Dynamic Specular Sheen Sweep)    */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 4,
        }}
        className="absolute inset-y-0 w-1/2 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          background: isDark
            ? 'linear-gradient(115deg, transparent 0%, rgba(212,175,55,0.04) 40%, rgba(255,255,255,0.12) 50%, rgba(124,58,237,0.06) 60%, transparent 100%)'
            : 'linear-gradient(115deg, transparent 0%, rgba(0,200,150,0.06) 40%, rgba(255,255,255,0.35) 50%, rgba(127,255,212,0.08) 60%, transparent 100%)',
          transform: 'skewX(-18deg)',
        }}
      />

      {/* ========================================================================= */}
      {/* LAYER 5: TACTILE ULTRA-FINE NOISE TEXTURE OVERLAY                         */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ========================================================================= */}
      {/* LAYER 6: LUXURY DEPTH OVERLAY (Cyber Matrix & Vignette)                  */}
      {/* ========================================================================= */}
      <motion.div style={{ y: yLayer3 }} className="absolute inset-0 pointer-events-none">
        {/* Subtle Cyber Grid Matrix */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(#D4AF37 1px, transparent 1px)'
              : 'radial-gradient(#00C896 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Outer Vignette for Cinema Depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.7) 100%)'
              : 'radial-gradient(ellipse at center, transparent 50%, rgba(247,250,249,0.6) 100%)',
          }}
        />
      </motion.div>
    </div>
  );
};
