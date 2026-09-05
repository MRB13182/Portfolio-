import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const LuxuryBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500">
      {/* Base Canvas */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-[#050505]' 
            : 'bg-[#F8FBFA]'
        }`} 
      />

      {/* Luxury Ambient Glows (Pure CSS, GPU-accelerated, Zero JS overhead) */}
      {isDark ? (
        <>
          {/* Royal Purple Nebula - Top Right */}
          <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(123,44,255,0.22)_0%,rgba(157,78,221,0.12)_45%,transparent_70%)] blur-2xl" />
          
          {/* Luxury Gold Halo - Center Left */}
          <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,rgba(245,208,111,0.08)_45%,transparent_70%)] blur-2xl" />
          
          {/* Royal Purple Sub-Glow - Bottom Right */}
          <div className="absolute -bottom-24 right-1/4 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(123,44,255,0.18)_0%,rgba(76,29,149,0.1)_50%,transparent_70%)] blur-2xl" />

          {/* Center Subtle Gold Ambience */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,rgba(123,44,255,0.06)_50%,transparent_70%)] blur-3xl" />
        </>
      ) : (
        <>
          {/* Titanium Emerald Aura - Top Right */}
          <div className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(18,214,160,0.16)_0%,rgba(142,240,209,0.1)_45%,transparent_70%)] blur-2xl" />
          
          {/* Soft Mint Mist - Center Left */}
          <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(18,214,160,0.12)_0%,rgba(142,240,209,0.06)_45%,transparent_70%)] blur-2xl" />
          
          {/* Emerald Bottom Accent */}
          <div className="absolute -bottom-24 right-1/4 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(18,214,160,0.14)_0%,rgba(230,250,244,0.1)_50%,transparent_70%)] blur-2xl" />

          {/* Center Clean Radiance */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(18,214,160,0.08)_0%,rgba(142,240,209,0.04)_50%,transparent_70%)] blur-3xl" />
        </>
      )}

      {/* Tactile Micro-Grid Matrix Overlay */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-[0.035]' : 'opacity-[0.025]'}`}
        style={{
          backgroundImage: isDark 
            ? 'radial-gradient(#D4AF37 1px, transparent 1px)' 
            : 'radial-gradient(#12D6A0 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};

