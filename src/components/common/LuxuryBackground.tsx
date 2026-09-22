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
            ? 'bg-[#0A0A0A]' 
            : 'bg-[#F8FAFC]'
        }`} 
      />

      {/* Luxury Ambient Glows (Cyan #00E5FF & Violet #8B5CF6 Glassmorphic Atmosphere) */}
      {isDark ? (
        <>
          {/* Electric Cyan Nebula - Top Right */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.16)_0%,rgba(139,92,246,0.08)_45%,transparent_70%)] blur-3xl pointer-events-none" />
          
          {/* Deep Violet Halo - Center Left */}
          <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,rgba(0,229,255,0.06)_45%,transparent_70%)] blur-3xl pointer-events-none" />
          
          {/* Cyan Sub-Glow - Bottom Right */}
          <div className="absolute -bottom-24 right-1/4 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.14)_0%,rgba(139,92,246,0.08)_50%,transparent_70%)] blur-3xl pointer-events-none" />

          {/* Center Subtle Ambience */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,rgba(0,229,255,0.04)_50%,transparent_70%)] blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          {/* Soft Cyan Mist - Top Right */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.14)_0%,rgba(139,92,246,0.07)_45%,transparent_70%)] blur-3xl pointer-events-none" />
          
          {/* Soft Violet Mist - Center Left */}
          <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,rgba(0,229,255,0.05)_45%,transparent_70%)] blur-3xl pointer-events-none" />
          
          {/* Clean Cyan Accent - Bottom */}
          <div className="absolute -bottom-24 right-1/4 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.1)_0%,rgba(139,92,246,0.06)_50%,transparent_70%)] blur-3xl pointer-events-none" />

          {/* Center Clean Radiance */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.06)_0%,rgba(139,92,246,0.04)_50%,transparent_70%)] blur-3xl pointer-events-none" />
        </>
      )}

      {/* Tactile Micro-Grid Matrix Overlay */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-[0.035]' : 'opacity-[0.025]'}`}
        style={{
          backgroundImage: isDark 
            ? 'radial-gradient(#00E5FF 1px, transparent 1px)' 
            : 'radial-gradient(#8B5CF6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};

