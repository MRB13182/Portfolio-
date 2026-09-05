import React, { useState, useEffect } from 'react';
import { Sparkles, Code, ShieldCheck, Award, Layers, LucideIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
  const { isDark } = useTheme();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize path if given as Public/ or public/
  const normalizeSrc = (url?: string) => {
    if (!url) return '';
    let clean = url.trim();
    if (clean.startsWith('Public/')) clean = '/' + clean.slice(7);
    else if (clean.startsWith('public/')) clean = '/' + clean.slice(7);
    else if (clean.startsWith('/Public/')) clean = '/' + clean.slice(8);
    else if (clean.startsWith('/public/')) clean = '/' + clean.slice(8);
    return clean;
  };

  const [currentSrc, setCurrentSrc] = useState<string>(normalizeSrc(src));

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    setCurrentSrc(normalizeSrc(src));
  }, [src]);

  const handleImageError = () => {
    // Try alternate capitalization or alternative path before giving up
    if (currentSrc.includes('/certificate/Cer')) {
      setCurrentSrc(currentSrc.replace('/certificate/Cer', '/certificate/cer'));
    } else if (currentSrc.includes('/certificate/cer')) {
      setCurrentSrc(currentSrc.replace('/certificate/cer', '/certificates/Cer'));
    } else if (currentSrc.includes('/certificates/Cer')) {
      setCurrentSrc(currentSrc.replace('/certificates/Cer', '/certificates/cer'));
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  // If image loaded successfully or we are attempting to load
  if (!hasError && currentSrc) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={currentSrc}
          alt={alt}
          onError={handleImageError}
          onLoad={() => setIsLoading(false)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-contain transition-all duration-500 ${
            isLoading ? 'scale-105 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100'
          }`}
          {...props}
        />
        {isLoading && (
          <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-md animate-pulse ${
            isDark ? 'bg-[#050505]/70' : 'bg-white/70'
          }`}>
            <div className={`w-8 h-8 rounded-full border-2 animate-spin ${
              isDark ? 'border-amber-500/30 border-t-amber-400' : 'border-emerald-500/30 border-t-emerald-500'
            }`} />
          </div>
        )}
      </div>
    );
  }

  // Graceful Luxury Fallback based on type
  if (fallbackType === 'profile') {
    return (
      <div className={`relative overflow-hidden flex flex-col items-center justify-center ${className} ${
        isDark 
          ? 'bg-gradient-to-br from-[#050505] via-[#0D0D0D] to-[#050505] text-[#F8FAFC] border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(124,58,237,0.25)]'
          : 'bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 text-slate-900 border border-[#00C896]/30 shadow-[0_4px_30px_rgba(0,200,150,0.15)]'
      }`}>
        {/* Ambient Grid overlay */}
        <div className={`absolute inset-0 opacity-[0.07] ${
          isDark 
            ? 'bg-[radial-gradient(#D4AF37_1px,transparent_1px)]' 
            : 'bg-[radial-gradient(#00C896_1px,transparent_1px)]'
        } [background-size:16px_16px]`} />
        
        {/* Silhouette / Luxury Avatar Vector */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
          <div className={`relative w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-105 p-[2px] shadow-lg ${
            isDark
              ? 'bg-gradient-to-tr from-[#7C3AED] to-[#D4AF37] shadow-[#7C3AED]/40'
              : 'bg-gradient-to-tr from-[#00C896] to-[#34D399] shadow-[#00C896]/30'
          }`}>
            <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden ${
              isDark ? 'bg-[#050505]' : 'bg-white'
            }`}>
              <span className={`text-3xl font-black tracking-tighter text-transparent bg-clip-text ${
                isDark 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700]' 
                  : 'bg-gradient-to-r from-[#00A57A] to-[#00C896]'
              }`}>
                MR
              </span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-md ${
              isDark ? 'bg-[#D4AF37] border-black text-black' : 'bg-[#00C896] border-white text-white'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <span className="font-bold text-lg tracking-tight mb-0.5">MD. Moshiur Rahman</span>
          <span className={`text-xs font-semibold uppercase tracking-widest ${
            isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'
          }`}>
            Full Stack &amp; UI/UX
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
          : 'bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 text-slate-900 shadow-md'
      }`}>
        <div className={`absolute -right-10 -top-10 w-36 h-36 rounded-full blur-2xl ${
          isDark ? 'opacity-30 bg-[#7C3AED]' : 'opacity-20 bg-[#00C896]'
        }`} />
        <div className={`absolute -left-10 -bottom-10 w-36 h-36 rounded-full blur-2xl ${
          isDark ? 'opacity-20 bg-[#D4AF37]' : 'opacity-15 bg-[#34D399]'
        }`} />

        {/* Top Header */}
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          {badge && (
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
              isDark 
                ? 'bg-[#D4AF37]/15 text-[#FFD700] border-[#D4AF37]/30' 
                : 'bg-emerald-50 text-[#00A57A] border-emerald-200'
            }`}>
              {badge}
            </span>
          )}
        </div>

        {/* Center UI Blueprint representation */}
        <div className="my-auto z-10 flex flex-col items-center text-center py-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-md ${
            isDark 
              ? 'bg-[#0B0B0F] border border-[#D4AF37]/30 text-[#D4AF37]' 
              : 'bg-emerald-50 border border-[#00C896]/30 text-[#00A57A]'
          }`}>
            {CustomIcon ? <CustomIcon className="w-7 h-7" /> : <Layers className="w-7 h-7" />}
          </div>
          <p className="font-bold text-sm tracking-tight line-clamp-1">{fallbackText || alt}</p>
          <p className={`text-[11px] mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
            High Performance System
          </p>
        </div>

        {/* Bottom indicator */}
        <div className={`w-full z-10 flex items-center justify-between text-[11px] font-mono ${
          isDark ? 'text-[#A1A1AA]' : 'text-slate-400'
        }`}>
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
          : 'bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 text-slate-900'
      }`}>
        <div className="w-full flex items-center justify-between">
          <Award className={`w-6 h-6 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
          <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-[#FFD700]' : 'text-[#00C896]'}`} />
        </div>
        
        <div className="text-center my-3">
          <div className={`text-xs uppercase tracking-widest font-mono mb-1 ${
            isDark ? 'text-[#FFD700]' : 'text-[#00A57A]'
          }`}>
            Official Certification
          </div>
          <div className="font-bold text-sm line-clamp-2 px-2">
            {fallbackText || alt}
          </div>
        </div>

        <div className={`w-full pt-3 border-t flex items-center justify-between text-[10px] font-mono ${
          isDark 
            ? 'border-[rgba(212,175,55,0.2)] text-[#A1A1AA]' 
            : 'border-slate-200 text-slate-500'
        }`}>
          <span>VERIFIED ID</span>
          <span className={isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}>AUTHENTIC</span>
        </div>
      </div>
    );
  }

  if (fallbackType === 'logo') {
    return (
      <div className={`relative overflow-hidden flex items-center justify-center ${className} ${
        isDark ? 'bg-[#050505] text-[#D4AF37]' : 'bg-white text-[#00A57A]'
      }`}>
        <span className="font-black text-sm tracking-tighter">MR</span>
      </div>
    );
  }

  // Generic fallback
  return (
    <div className={`flex items-center justify-center p-4 ${className} ${
      isDark 
        ? 'bg-[#0B0B0F] border border-[rgba(212,175,55,0.25)] text-[#F8FAFC]' 
        : 'bg-white border border-slate-200 text-slate-700'
    }`}>
      <Code className="w-6 h-6 mr-2 opacity-60" />
      <span className="text-xs font-medium">{fallbackText || alt}</span>
    </div>
  );
};
