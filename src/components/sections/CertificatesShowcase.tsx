import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { IssuerLogo } from '../common/IssuerLogo';
import { A4CertificateDocument } from '../common/A4CertificateDocument';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CertificatesShowcase: React.FC = () => {
  const { isDark } = useTheme();
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Exactly the 6 accredited certificates
  const certificates = portfolioConfig.certificates.slice(0, 6);

  // Quadruple the items for an infinite loop with no gaps
  const loopedCertificates = [
    ...certificates,
    ...certificates,
    ...certificates,
    ...certificates,
  ];

  return (
    <section 
      id="certificates-showcase" 
      className="relative py-14 sm:py-20 overflow-hidden select-none"
    >
      {/* Ambient background subtle aura */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 blur-3xl opacity-25 pointer-events-none rounded-full ${
        isDark ? 'bg-gradient-to-r from-[#7C3AED] via-[#D4AF37] to-[#7C3AED]' : 'bg-gradient-to-r from-[#00C896] via-[#7FFFD4] to-[#00C896]'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center relative z-10">
        {/* Minimal Luxury Pill Header */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
          isDark 
            ? 'bg-[rgba(124,58,237,0.15)] text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
            : 'bg-[rgba(0,200,150,0.12)] text-[#00A57A] border border-[#00C896]/25'
        }`}>
          <Award className="w-3.5 h-3.5" />
          <span>Accredited Credentials</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
          Certifications &amp;{' '}
          <span className={`text-transparent bg-clip-text ${
            isDark 
              ? 'bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37]' 
              : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
          }`}>
            Professional Honors
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#F8FAFC] max-w-lg mx-auto">
          Verified industry credentials from Google, Meta, IBM, HubSpot, and Semrush.
        </p>
      </div>

      {/* Infinite Horizontal Moving Carousel with Hover/Touch Pause */}
      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Soft edge masking gradients for infinite gallery feel */}
        <div className={`absolute top-0 left-0 bottom-0 w-12 sm:w-28 z-20 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent' 
            : 'bg-gradient-to-r from-[#F7FAF9] via-[#F7FAF9]/70 to-transparent'
        }`} />
        <div className={`absolute top-0 right-0 bottom-0 w-12 sm:w-28 z-20 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-l from-[#050505] via-[#050505]/70 to-transparent' 
            : 'bg-gradient-to-l from-[#F7FAF9] via-[#F7FAF9]/70 to-transparent'
        }`} />

        {/* Continuous 60fps moving ribbon */}
        <div 
          className="flex items-center gap-4 sm:gap-6 w-max animate-marquee"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform'
          }}
        >
          {loopedCertificates.map((cert, loopIndex) => {
            const originalIndex = loopIndex % certificates.length;
            
            return (
              <div
                key={`${cert.id}-${loopIndex}`}
                id={`cert-showcase-item-${loopIndex}`}
                className={`relative w-[260px] sm:w-[290px] md:w-[320px] shrink-0 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border transition-all duration-300 overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.45)] border-[rgba(212,175,55,0.22)] shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-[#F8FAFC]'
                    : 'bg-[rgba(255,255,255,0.45)] border-[rgba(0,200,150,0.25)] shadow-[0_10px_35px_rgba(0,200,150,0.1)] text-slate-900'
                }`}
              >
                {/* Visual A4 Document Rendering in Card */}
                <div className="relative w-full rounded-xl overflow-hidden mb-3 shadow-md">
                  <A4CertificateDocument 
                    certificate={cert} 
                    index={originalIndex}
                    isPreviewOnly={true}
                    className="shadow-sm pointer-events-none"
                  />
                </div>

                {/* Card Info Footer */}
                <div className="flex items-center justify-between gap-2.5 pt-1.5 border-t border-slate-200/40 dark:border-[rgba(212,175,55,0.15)]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-7 h-7 rounded-lg p-1 border shadow-xs shrink-0 flex items-center justify-center ${
                      isDark ? 'bg-[rgba(15,15,20,0.8)] border-[rgba(212,175,55,0.25)]' : 'bg-white/80 border-slate-200'
                    }`}>
                      <IssuerLogo issuer={cert.issuer} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold tracking-tight truncate">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-[#F8FAFC] truncate block">
                        {cert.issuer} • {cert.issueDate}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                    isDark 
                      ? 'bg-[rgba(212,175,55,0.15)] text-[#FFD700] border-[rgba(212,175,55,0.3)]' 
                      : 'bg-emerald-500/10 text-[#00A57A] border-emerald-500/20'
                  }`}>
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
