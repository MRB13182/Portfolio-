import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const LuxuryBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500"
    >
      {/* Base Canvas */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? 'bg-[#080B12]' : 'bg-[#F8FAFC]'
        }`} 
      />

      {/* Refined Ambient Glows (Cyan #22D3EE & Violet #8B5CF6 Dark Glass Atmosphere) */}
      {isDark ? (
        <>
          {/* Cyan Glow - Top Right */}
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.11)_0%,rgba(139,92,246,0.05)_50%,transparent_70%)] blur-2xl pointer-events-none" />
          
          {/* Violet Glow - Center Left */}
          <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,rgba(34,211,238,0.04)_50%,transparent_70%)] blur-2xl pointer-events-none" />
          
          {/* Subtle Ambient - Bottom Center */}
          <div className="absolute -bottom-32 left-1/3 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,rgba(139,92,246,0.05)_50%,transparent_70%)] blur-2xl pointer-events-none" />
        </>
      ) : (
        <>
          {/* Light Mode Soft Mist */}
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.08)_0%,rgba(124,58,237,0.04)_50%,transparent_70%)] blur-2xl pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.07)_0%,rgba(8,145,178,0.03)_50%,transparent_70%)] blur-2xl pointer-events-none" />
        </>
      )}

      {/* Subtle Micro-Grid Overlay */}
      <div 
        className={`absolute inset-0 ${isDark ? 'opacity-[0.025]' : 'opacity-[0.020]'}`}
        style={{
          backgroundImage: isDark 
            ? 'radial-gradient(#22D3EE 1px, transparent 1px)' 
            : 'radial-gradient(#8B5CF6 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};
