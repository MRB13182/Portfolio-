import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export const LuxuryBackground: React.FC = () => {
  const { isDark } = useTheme();
  const { scrollY } = useScroll();

  // Gentle Parallax offsets for depth layers
  const yLayer1 = useTransform(scrollY, [0, 3000], [0, -120]);
  const yLayer2 = useTransform(scrollY, [0, 3000], [0, -220]);
  const yLayer3 = useTransform(scrollY, [0, 3000], [0, -80]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      {/* ========================================================================= */}
      {/* LAYER 1: BASE CANVAS GRADIENT                                             */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-b from-[#050505] via-[#08060E] to-[#050505]' 
            : 'bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]'
        }`} 
      />

      {/* ========================================================================= */}
      {/* LAYER 2: 5 LARGE FLOATING ORGANIC BLOBS (Continuous Multi-Directional)    */}
      {/* ========================================================================= */}
      <motion.div style={{ y: yLayer2 }} className="absolute inset-0">
        {isDark ? (
          <>
            {/* DARK MODE: Royal Purple (#7C3AED / #6D28D9), Luxury Gold (#D4AF37 / #FFD700) */}
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
          </>
        ) : (
          <>
            {/* LIGHT MODE: Apple Titanium Emerald Light (#00C896, #00A57A, Soft Titanium) */}
            {/* Blob 1: Vibrant Emerald Aura - Top Right */}
            <motion.div
              animate={{
                x: [0, 50, -30, 20, 0],
                y: [0, -40, 30, -20, 0],
                scale: [1, 1.15, 0.95, 1.1, 1],
                opacity: [0.3, 0.45, 0.35, 0.4, 0.3],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-40 -right-40 w-[650px] h-[650px] rounded-full blur-[140px] bg-gradient-to-br from-[#00C896]/30 via-[#34D399]/25 to-[#A7F3D0]/20"
            />

            {/* Blob 2: Apple Titanium Soft Mist - Center Left */}
            <motion.div
              animate={{
                x: [0, -40, 30, -15, 0],
                y: [0, 50, -30, 25, 0],
                scale: [1, 1.18, 0.92, 1.08, 1],
                opacity: [0.25, 0.4, 0.28, 0.35, 0.25],
              }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute top-1/4 -left-44 w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-tr from-[#00A57A]/20 via-[#6EE7B7]/25 to-[#E2E8F0]/30"
            />

            {/* Blob 3: Soft Mint Light Pulse - Bottom Right */}
            <motion.div
              animate={{
                x: [0, 40, -30, 40, 0],
                y: [0, 35, -50, 15, 0],
                scale: [0.95, 1.15, 1, 1.18, 0.95],
                opacity: [0.25, 0.38, 0.28, 0.35, 0.25],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3,
              }}
              className="absolute -bottom-36 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] bg-gradient-to-tl from-[#10B981]/20 via-[#00C896]/20 to-[#6EE7B7]/15"
            />

            {/* Blob 4: Titanium Cool Ambient Mist - Top Left */}
            <motion.div
              animate={{
                x: [0, 30, -40, 20, 0],
                y: [0, -30, 40, -15, 0],
                scale: [1.05, 0.92, 1.15, 1, 1.05],
                opacity: [0.2, 0.35, 0.22, 0.3, 0.2],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 5,
              }}
              className="absolute -top-32 left-1/6 w-[550px] h-[550px] rounded-full blur-[140px] bg-gradient-to-r from-[#CBD5E1]/40 to-[#00C896]/15"
            />

            {/* Blob 5: Center Luminous Emerald Radiance */}
            <motion.div
              animate={{
                x: [0, -25, 30, -10, 0],
                y: [0, 25, -20, 30, 0],
                scale: [1, 1.2, 0.9, 1.1, 1],
                opacity: [0.18, 0.3, 0.2, 0.28, 0.18],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[150px] bg-gradient-to-r from-[#00C896]/25 via-[#6EE7B7]/20 to-[#00A57A]/20"
            />
          </>
        )}
      </motion.div>

      {/* ========================================================================= */}
      {/* LAYER 3: SLOW AMBIENT GLOW PARTICLES (Breathing Auroral Star Nodes)       */}
      {/* ========================================================================= */}
      <motion.div style={{ y: yLayer1 }} className="absolute inset-0">
        {isDark ? (
          <>
            {/* Glow Node A */}
            <motion.div
              animate={{
                opacity: [0.15, 0.65, 0.15],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[18%] left-[22%] w-3 h-3 rounded-full blur-[2px] bg-[#FFD700] shadow-[0_0_25px_#FFD700]"
            />

            {/* Glow Node B */}
            <motion.div
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.9, 1.5, 0.9],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
              className="absolute top-[42%] right-[18%] w-3.5 h-3.5 rounded-full blur-[2px] bg-[#A855F7] shadow-[0_0_30px_#A855F7]"
            />

            {/* Glow Node C */}
            <motion.div
              animate={{
                opacity: [0.1, 0.7, 0.1],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4.5 }}
              className="absolute bottom-[28%] left-[14%] w-3 h-3 rounded-full blur-[2px] bg-[#D4AF37] shadow-[0_0_25px_#D4AF37]"
            />

            {/* Glow Node D */}
            <motion.div
              animate={{
                opacity: [0.2, 0.75, 0.2],
                scale: [0.85, 1.45, 0.85],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[16%] right-[28%] w-4 h-4 rounded-full blur-[3px] bg-[#7C3AED] shadow-[0_0_35px_#7C3AED]"
            />
          </>
        ) : (
          <>
            {/* Light Mode Nodes */}
            <motion.div
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[18%] left-[22%] w-3 h-3 rounded-full blur-[2px] bg-[#00C896] shadow-[0_0_20px_#00C896]"
            />

            <motion.div
              animate={{
                opacity: [0.25, 0.7, 0.25],
                scale: [0.9, 1.4, 0.9],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
              className="absolute top-[42%] right-[18%] w-3.5 h-3.5 rounded-full blur-[2px] bg-[#00A57A] shadow-[0_0_25px_#00A57A]"
            />

            <motion.div
              animate={{
                opacity: [0.15, 0.55, 0.15],
                scale: [0.7, 1.25, 0.7],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4.5 }}
              className="absolute bottom-[28%] left-[14%] w-3 h-3 rounded-full blur-[2px] bg-[#10B981] shadow-[0_0_20px_#10B981]"
            />

            <motion.div
              animate={{
                opacity: [0.2, 0.65, 0.2],
                scale: [0.85, 1.35, 0.85],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[16%] right-[28%] w-4 h-4 rounded-full blur-[3px] bg-[#34D399] shadow-[0_0_25px_#34D399]"
            />
          </>
        )}
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
        className="absolute inset-y-0 w-1/2 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          background: isDark
            ? 'linear-gradient(115deg, transparent 0%, rgba(212,175,55,0.04) 40%, rgba(255,255,255,0.12) 50%, rgba(124,58,237,0.06) 60%, transparent 100%)'
            : 'linear-gradient(115deg, transparent 0%, rgba(0,200,150,0.04) 40%, rgba(255,255,255,0.3) 50%, rgba(52,211,153,0.06) 60%, transparent 100%)',
          transform: 'skewX(-18deg)',
        }}
      />

      {/* ========================================================================= */}
      {/* LAYER 5: TACTILE ULTRA-FINE NOISE TEXTURE OVERLAY                         */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 mix-blend-overlay pointer-events-none ${
          isDark ? 'opacity-[0.045]' : 'opacity-[0.025]'
        }`}
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
          className={`absolute inset-0 ${isDark ? 'opacity-[0.04]' : 'opacity-[0.03]'}`}
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
              : 'radial-gradient(ellipse at center, transparent 50%, rgba(241,245,249,0.5) 100%)',
          }}
        />
      </motion.div>
    </div>
  );
};
