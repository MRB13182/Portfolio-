import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { Certificate } from '../../types';
import { IssuerLogo } from '../common/IssuerLogo';
import { A4CertificateDocument } from '../common/A4CertificateDocument';
import { CertificateReaderModal } from '../modals/CertificateReaderModal';
import { ShieldCheck, Award, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const CertificatesShowcase: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCert, setSelectedCert] = useState<{ cert: Certificate; index: number } | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Exactly the 6 certificates
  const certificates = portfolioConfig.certificates.slice(0, 6);

  // Quadruple the items for a silky, seamless infinite loop without any blank gaps
  const loopedCertificates = [
    ...certificates,
    ...certificates,
    ...certificates,
    ...certificates
  ];

  return (
    <section 
      id="certificates-showcase" 
      className="relative py-14 sm:py-20 overflow-hidden select-none border-t border-slate-200/50 dark:border-[rgba(212,175,55,0.2)]"
    >
      {/* Ambient background subtle lighting */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 blur-3xl opacity-20 pointer-events-none rounded-full ${
        isDark ? 'bg-gradient-to-r from-[#7C3AED] via-[#D4AF37] to-[#7C3AED]' : 'bg-gradient-to-r from-[#00C896] via-[#7FFFD4] to-[#00C896]'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        {/* Minimal Luxury Pill Header */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
          isDark 
            ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
            : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/25'
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
        <p className="text-xs sm:text-sm text-slate-500 dark:text-[#F8FAFC] max-w-lg mx-auto">
          Verified industry credentials from Google, Meta, IBM, HubSpot, and Semrush.
        </p>
      </div>

      {/* Infinite Horizontal Carousel Container with Left/Right Soft Edge Fade */}
      <div 
        className="relative w-full overflow-hidden group py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Soft edge masking gradients for infinite Apple-style gallery feel */}
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
                onClick={() => setSelectedCert({ cert, index: originalIndex })}
                id={`cert-showcase-item-${originalIndex}`}
                role="button"
                tabIndex={0}
                aria-label={`View ${cert.title}`}
                className={`group/card relative w-[250px] sm:w-[285px] md:w-[310px] shrink-0 rounded-2xl sm:rounded-3xl backdrop-blur-xl border transition-all duration-300 cursor-pointer overflow-hidden p-3 sm:p-4 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.22)] hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:scale-[1.03]'
                    : 'bg-white/95 border-slate-200/90 hover:border-[#00C896] hover:shadow-[0_15px_35px_rgba(0,200,150,0.18)] hover:scale-[1.03]'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000
                }}
              >
                {/* Mini A4 Document Preview Thumbnail */}
                <div className="relative w-full rounded-xl overflow-hidden mb-3 shadow-md transition-transform duration-300 group-hover/card:scale-[1.01]">
                  <A4CertificateDocument 
                    certificate={cert} 
                    index={originalIndex}
                    isPreviewOnly={true}
                    className="shadow-sm pointer-events-none"
                  />

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                      isDark 
                        ? 'bg-[#FFD700] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                        : 'bg-[#00C896] text-white shadow-md'
                    }`}>
                      Click to Expand (A4)
                    </span>
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="flex items-center justify-between gap-2.5 pt-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-7 h-7 rounded-lg p-1 border shadow-xs shrink-0 flex items-center justify-center ${
                      isDark ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <IssuerLogo issuer={cert.issuer} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold tracking-tight truncate group-hover/card:text-[#00A57A] dark:group-hover/card:text-[#FFD700] transition-colors">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-[#F8FAFC] truncate block">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>

                  <div className={`p-1 rounded-full shrink-0 ${
                    isDark ? 'text-[#FFD700]' : 'text-[#00A57A]'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating A4 Certificate Reader Modal */}
      <CertificateReaderModal
        certificate={selectedCert?.cert || null}
        index={selectedCert?.index || 0}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
