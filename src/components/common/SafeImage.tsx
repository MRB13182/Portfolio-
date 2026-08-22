import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Code, ShieldCheck, Award, Layers, Globe, LucideIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'profile' | 'project' | 'certificate' | 'logo' | 'generic';
  fallbackText?: string;
  fallbackIcon?: LucideIcon;
  badge?: string;
  glowColor?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Visual asset',
  className = '',
  fallbackType = 'generic',
  fallbackText,
  fallbackIcon: CustomIcon,
  badge,
  glowColor,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  // If image loaded successfully or we are attempting to load
  if (!hasError && src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoading(false)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoading ? 'scale-105 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100'
          }`}
          {...props}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 dark:bg-[#050505]/70 backdrop-blur-md animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 dark:border-amber-500/30 dark:border-t-amber-400 animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // Graceful Luxury Fallback based on type & theme
  if (fallbackType === 'profile') {
    return (
      <div className={`relative overflow-hidden flex flex-col items-center justify-center ${className} ${
        isDark 
          ? 'bg-gradient-to-br from-[#050505] via-[#0D0D0D] to-[#050505] text-[#F8FAFC] border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(124,58,237,0.25)]' 
          : 'bg-gradient-to-br from-white via-[#F0FDF4] to-[#ECFDF5] text-slate-900 border border-[#00C896]/20 shadow-[0_15px_40px_rgba(0,200,150,0.15)]'
      }`}>
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#00C896_1px,transparent_1px)] dark:bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Silhouette / Luxury Avatar Vector */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
          <div className={`relative w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-105 ${
            isDark 
              ? 'bg-gradient-to-tr from-[#7C3AED] to-[#D4AF37] p-[2px] shadow-lg shadow-[#7C3AED]/40' 
              : 'bg-gradient-to-tr from-[#00C896] to-[#7FFFD4] p-[2px] shadow-lg shadow-[#00C896]/30'
          }`}>
            <div className="w-full h-full rounded-full bg-white dark:bg-[#050505] flex items-center justify-center overflow-hidden">
              <span className={`text-3xl font-black tracking-tighter ${
                isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#00C896] to-[#00A57A]'
              }`}>
                MR
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 dark:bg-[#D4AF37] border-2 border-white dark:border-black flex items-center justify-center shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-white dark:text-black" />
            </div>
          </div>
          
          <span className="font-bold text-lg tracking-tight mb-0.5">MD. Moshiur Rahman</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00A57A] dark:text-[#D4AF37]">
            Full Stack &amp; UI/UX
          </span>
          <span className="text-[11px] text-slate-500 dark:text-[#F8FAFC] mt-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0B0B0F] border border-slate-200 dark:border-[rgba(212,175,55,0.3)]">
            public/profile/profile.png
          </span>
        </div>
      </div>
    );
  }

  if (fallbackType === 'project') {
    return (
      <div className={`relative overflow-hidden flex flex-col items-center justify-between p-6 ${className} ${
        isDark 
          ? 'bg-gradient-to-br from-[#050505] via-[#0D0D0D] to-[#050505] border border-[#D4AF37]/25 text-[#F8FAFC] shadow-xl' 
          : 'bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border border-[#00C896]/20 text-slate-800 shadow-lg'
      }`}>
        <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full blur-2xl opacity-30 bg-[#00C896] dark:bg-[#7C3AED]" />
        <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full blur-2xl opacity-20 bg-[#7FFFD4] dark:bg-[#D4AF37]" />

        {/* Top Header */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          {badge && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00A57A] dark:bg-[#D4AF37]/15 dark:text-[#FFD700] border border-emerald-500/20 dark:border-[#D4AF37]/30">
              {badge}
            </span>
          )}
        </div>

        {/* Center UI Blueprint representation */}
        <div className="my-auto z-10 flex flex-col items-center text-center py-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-md ${
            isDark 
              ? 'bg-[#0B0B0F] border border-[#D4AF37]/30 text-[#D4AF37]' 
              : 'bg-emerald-100/70 border border-emerald-200 text-[#00A57A]'
          }`}>
            {CustomIcon ? <CustomIcon className="w-7 h-7" /> : <Layers className="w-7 h-7" />}
          </div>
          <p className="font-bold text-sm tracking-tight line-clamp-1">{fallbackText || alt}</p>
          <p className="text-[11px] text-slate-500 dark:text-[#F8FAFC] mt-1">High Performance System</p>
        </div>

        {/* Bottom indicator */}
        <div className="w-full z-10 flex items-center justify-between text-[11px] text-slate-400 dark:text-[#F8FAFC] font-mono">
          <span>&lt;Architect /&gt;</span>
          <span className="text-[10px] opacity-75">Click for details</span>
        </div>
      </div>
    );
  }

  if (fallbackType === 'certificate') {
    return (
      <div className={`relative overflow-hidden flex flex-col items-center justify-between p-6 ${className} ${
        isDark 
          ? 'bg-gradient-to-br from-[#050505] via-[#0D0D0D] to-[#050505] border border-[#D4AF37]/25 text-[#F8FAFC]' 
          : 'bg-gradient-to-br from-white via-amber-50/20 to-emerald-50/30 border border-emerald-500/20 text-slate-800'
      }`}>
        <div className="w-full flex items-center justify-between">
          <Award className="w-6 h-6 text-amber-500 dark:text-[#D4AF37]" />
          <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-[#FFD700]" />
        </div>
        
        <div className="text-center my-3">
          <div className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-[#FFD700] mb-1">
            Official Certification
          </div>
          <div className="font-bold text-sm line-clamp-2 px-2">
            {fallbackText || alt}
          </div>
        </div>

        <div className="w-full pt-3 border-t border-slate-200/50 dark:border-[rgba(212,175,55,0.2)] flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-[#F8FAFC]">
          <span>VERIFIED ID</span>
          <span className="text-emerald-600 dark:text-[#D4AF37]">AUTHENTIC</span>
        </div>
      </div>
    );
  }

  if (fallbackType === 'logo') {
    return (
      <div className={`relative overflow-hidden flex items-center justify-center ${className} ${
        isDark ? 'bg-[#050505] text-[#D4AF37]' : 'bg-emerald-50 text-[#00A57A]'
      }`}>
        <span className="font-black text-sm tracking-tighter">MR</span>
      </div>
    );
  }

  // Generic fallback
  return (
    <div className={`flex items-center justify-center p-4 ${className} ${
      isDark ? 'bg-[#0B0B0F] border border-[rgba(212,175,55,0.25)] text-[#F8FAFC]' : 'bg-slate-100 text-slate-700'
    }`}>
      <Code className="w-6 h-6 mr-2 opacity-60" />
      <span className="text-xs font-medium">{fallbackText || alt}</span>
    </div>
  );
};
