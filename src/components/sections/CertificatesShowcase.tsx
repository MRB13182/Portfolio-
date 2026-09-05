import React, { useState, useRef, useEffect } from 'react';
import { portfolioConfig } from '../../config/portfolio';
import { Certificate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { CertificateModal } from '../modals/CertificateModal';
import { IssuerLogo } from '../common/IssuerLogo';
import { SafeImage } from '../common/SafeImage';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Maximize2,
  Play,
  Pause,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface CertificatesShowcaseProps {
  onOpenCertificate?: (cert: Certificate) => void;
}

export const CertificatesShowcase: React.FC<CertificatesShowcaseProps> = ({
  onOpenCertificate
}) => {
  const { isDark } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // 6 verified certificates in exact specified order
  const certificates: Certificate[] = portfolioConfig.certificates && portfolioConfig.certificates.length > 0
    ? portfolioConfig.certificates
    : [];

  // Duplicate for seamless 60fps infinite marquee loop
  const marqueeItems = [...certificates, ...certificates];

  const handleCardClick = (cert: Certificate) => {
    setIsPaused(true);
    if (onOpenCertificate) {
      onOpenCertificate(cert);
    } else {
      setSelectedCert(cert);
    }
  };

  // Provider badge styles based on theme
  const getProviderBadgeStyle = (issuer: string) => {
    const norm = issuer.toLowerCase();
    if (norm.includes('google')) {
      return isDark 
        ? 'bg-[#4285F4]/15 text-[#8AB4F8] border-[#4285F4]/30' 
        : 'bg-[#4285F4]/10 text-[#1967D2] border-[#4285F4]/25';
    }
    if (norm.includes('ibm')) {
      return isDark 
        ? 'bg-[#0F62FE]/15 text-[#78A9FF] border-[#0F62FE]/30' 
        : 'bg-[#0F62FE]/10 text-[#0043CE] border-[#0F62FE]/25';
    }
    if (norm.includes('meta')) {
      return isDark 
        ? 'bg-[#0081FB]/15 text-[#60A5FA] border-[#0081FB]/30' 
        : 'bg-[#0081FB]/10 text-[#0064D2] border-[#0081FB]/25';
    }
    if (norm.includes('hubspot')) {
      return isDark 
        ? 'bg-[#FF7A59]/15 text-[#FFA182] border-[#FF7A59]/30' 
        : 'bg-[#FF7A59]/10 text-[#D84C23] border-[#FF7A59]/25';
    }
    if (norm.includes('semrush')) {
      return isDark 
        ? 'bg-[#FF642D]/15 text-[#FF8E66] border-[#FF642D]/30' 
        : 'bg-[#FF642D]/10 text-[#CC4614] border-[#FF642D]/25';
    }
    return isDark 
      ? 'bg-[#D4AF37]/15 text-[#FFD700] border-[#D4AF37]/30' 
      : 'bg-emerald-50 text-[#00A57A] border-emerald-200';
  };

  const isAnimationPaused = isPaused || isHovered || isTouching || selectedCert !== null;

  return (
    <section 
      id="certificates-section" 
      aria-label="Professional Certificates and Accreditations"
      className={`relative py-20 sm:py-28 overflow-hidden border-t ${
        isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
      }`}
    >
      {/* Ambient background aura */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-72 blur-3xl pointer-events-none rounded-full ${
        isDark
          ? 'opacity-25 bg-gradient-to-r from-[#7B2CFF] via-[#D4AF37] to-[#7B2CFF]'
          : 'opacity-15 bg-gradient-to-r from-[#12D6A0] via-[#8EF0D1] to-[#12D6A0]'
      }`} />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 ${
              isDark
                ? 'bg-[#7B2CFF]/20 text-[#F5D06F] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
                : 'bg-emerald-500/10 text-[#12D6A0] border border-[rgba(18,214,160,0.3)] shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
            }`}>
              <Award className={`w-3.5 h-3.5 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
              <span>Official Accreditations</span>
              <span className="font-mono text-[10px] opacity-80 font-semibold">(6 Verified Credentials)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2">
              Verified{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-white via-[#F5D06F] to-[#D4AF37]'
                  : 'bg-gradient-to-r from-slate-900 via-[#12D6A0] to-[#8EF0D1]'
              }`}>
                Certificates
              </span>
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
            }`}>
              Continuously moving showcase of verified credentials from Google, IBM, Meta, HubSpot, and Semrush. Hover or touch to inspect. Click any certificate to open fullscreen high-resolution view.
            </p>
          </div>

          {/* Quick Play/Pause & Live Info */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setIsPaused(prev => !prev)}
              title={isPaused ? 'Resume infinite scroll' : 'Pause infinite scroll'}
              aria-label={isPaused ? 'Resume infinite scroll' : 'Pause infinite scroll'}
              className={`px-4 py-2.5 rounded-2xl border transition-all cursor-pointer backdrop-blur-2xl flex items-center gap-2 text-xs font-semibold shadow-sm active:scale-95 ${
                !isPaused
                  ? isDark
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#F5D06F]'
                    : 'bg-emerald-50 border-[rgba(18,214,160,0.35)] text-[#0EB385]'
                  : isDark
                    ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.2)] text-[#A1A1AA]'
                    : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              {!isPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Infinite 60fps</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Paused</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee Track */}
      <div 
        className="relative w-full overflow-hidden py-4 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
      >
        {/* Soft edge gradient fades */}
        <div className={`hidden sm:block absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-r from-[#050505] to-transparent' 
            : 'bg-gradient-to-r from-[#F8FBFA] to-transparent'
        }`} />
        <div className={`hidden sm:block absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-l from-[#050505] to-transparent' 
            : 'bg-gradient-to-l from-[#F8FBFA] to-transparent'
        }`} />

        {/* Marquee Inner Track */}
        <div
          ref={marqueeRef}
          className={`animate-marquee gap-6 sm:gap-8 px-4 ${
            isAnimationPaused ? 'marquee-paused' : ''
          }`}
          style={{
            animationDuration: '32s',
          }}
        >
          {marqueeItems.map((cert, index) => {
            const originalIndex = index % certificates.length;

            return (
              <div
                key={`${cert.id || originalIndex}-${index}`}
                onClick={() => handleCardClick(cert)}
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${cert.title} by ${cert.issuer}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(cert);
                  }
                }}
                id={`marquee-certificate-card-${index + 1}`}
                className={`flex-shrink-0 w-[290px] sm:w-[360px] md:w-[390px] rounded-[32px] backdrop-blur-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group relative shadow-lg hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDark
                    ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.3)] ring-offset-black focus:ring-[#D4AF37] text-[#FFFFFF]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] hover:shadow-[0_16px_35px_rgba(18,214,160,0.18)] ring-offset-white focus:ring-[#12D6A0] text-slate-800 shadow-sm'
                }`}
              >
                {/* Certificate Preview Image Frame */}
                <div className={`relative w-full aspect-[4/3] overflow-hidden p-3.5 ${
                  isDark ? 'bg-[#0A0A0A]' : 'bg-slate-50'
                }`}>
                  <SafeImage
                    src={cert.image}
                    alt={`${cert.title} - ${cert.issuer} Certificate`}
                    fallbackType="certificate"
                    fallbackText={cert.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Provider Logo Floating Chip */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border shadow-sm ${
                      getProviderBadgeStyle(cert.issuer)
                    }`}>
                      <IssuerLogo issuer={cert.issuer} size={14} className="w-3.5 h-3.5" />
                      <span>{cert.issuer}</span>
                    </div>
                  </div>

                  {/* Verified Shield Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                      isDark
                        ? 'bg-black/75 text-[#34D399] border border-[#34D399]/40'
                        : 'bg-white/90 text-[#0EB385] border border-[rgba(18,214,160,0.3)]'
                    }`}>
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Hover Inspect Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-10">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ${
                      isDark
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black'
                        : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385] text-white'
                    }`}>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to Zoom & Inspect</span>
                    </span>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${
                      isDark ? 'text-[#D4AF37]' : 'text-[#0EB385]'
                    }`}>
                      {cert.category || 'Professional Certification'}
                    </span>
                    <h3 className={`text-base font-extrabold tracking-tight mb-2 line-clamp-2 leading-snug transition-colors ${
                      isDark ? 'text-[#FFFFFF] group-hover:text-[#F5D06F]' : 'text-slate-900 group-hover:text-[#12D6A0]'
                    }`}>
                      {cert.title}
                    </h3>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className={`pt-3 border-t flex items-center justify-between text-xs font-bold ${
                    isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-100'
                  }`}>
                    <span className={`font-mono text-[11px] ${
                      isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
                    }`}>
                      {cert.credentialId || `CRED-0${originalIndex + 1}`}
                    </span>

                    <div className={`inline-flex items-center gap-1 transition-colors ${
                      isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                    }`}>
                      <span>Full View</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Certificate Inspection Modal */}
      <CertificateModal
        certificate={selectedCert}
        allCertificates={certificates}
        onClose={() => {
          setSelectedCert(null);
          setIsPaused(false);
        }}
        onSelectCertificate={(c) => setSelectedCert(c)}
      />
    </section>
  );
};
