import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { Certificate } from '../../types';
import { CertificateModal } from '../modals/CertificateModal';
import { IssuerLogo } from '../common/IssuerLogo';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  Maximize2,
  LayoutGrid,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CertificatesShowcaseProps {
  onOpenCertificate?: (cert: Certificate) => void;
}

export const CertificatesShowcase: React.FC<CertificatesShowcaseProps> = ({
  onOpenCertificate
}) => {
  const { isDark } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // Certificates list directly from portfolioConfig (loaded dynamically from detected assets)
  const certificates: Certificate[] = portfolioConfig.certificates && portfolioConfig.certificates.length > 0
    ? portfolioConfig.certificates
    : [];

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(certificates.map(c => c.category || 'General').filter(Boolean)))];

  // Filtered certificates based on category tab
  const filteredCertificates = selectedCategory === 'All'
    ? certificates
    : certificates.filter(c => c.category === selectedCategory);

  // Repeat for continuous seamless infinite ribbon loop in carousel mode
  const loopItems = [
    ...filteredCertificates,
    ...filteredCertificates,
    ...filteredCertificates,
  ];

  const handleCardClick = (cert: Certificate) => {
    if (onOpenCertificate) {
      onOpenCertificate(cert);
    } else {
      setSelectedCert(cert);
    }
  };

  const handleScrollPrev = () => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="certificates-section" 
      className="relative py-16 sm:py-24 overflow-hidden select-none"
    >
      {/* Ambient background aura */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-48 blur-3xl opacity-20 pointer-events-none rounded-full ${
        isDark ? 'bg-gradient-to-r from-[#7C3AED] via-[#D4AF37] to-[#7C3AED]' : 'bg-gradient-to-r from-[#00C896] via-[#7FFFD4] to-[#00C896]'
      }`} />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 ${
              isDark 
                ? 'bg-[rgba(124,58,237,0.18)] text-[#D4AF37] border border-[#D4AF37]/35 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                : 'bg-[rgba(0,200,150,0.12)] text-[#00A57A] border border-[#00C896]/30'
            }`}>
              <Award className="w-3.5 h-3.5 text-[#D4AF37] dark:text-[#FFD700]" />
              <span>Official Accreditations</span>
              <span className="font-mono text-[10px] opacity-75 font-semibold">({certificates.length} Verified)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2">
              Verified{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark 
                  ? 'bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37]' 
                  : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
              }`}>
                Certificates &amp; Credentials
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] max-w-2xl leading-relaxed">
              Industry-recognized technical certifications in full stack engineering, system architecture, UI/UX design, and cloud cybersecurity. Click any card to inspect full high-resolution credentials.
            </p>
          </div>

          {/* View Mode & Gallery Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className={`p-1 rounded-2xl border flex items-center gap-1 backdrop-blur-2xl ${
              isDark ? 'bg-[rgba(12,12,16,0.6)] border-[rgba(212,175,55,0.25)]' : 'bg-white/80 border-slate-200 shadow-sm'
            }`}>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                id="cert-view-carousel-btn"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'carousel'
                    ? isDark
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                      : 'bg-[#00C896] text-white shadow-md'
                    : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Flow</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                id="cert-view-grid-btn"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? isDark
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                      : 'bg-[#00C896] text-white shadow-md'
                    : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Gallery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (When in Grid Mode or for interactive filtering) */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? isDark
                      ? 'bg-[#D4AF37]/20 text-[#FFD700] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-[#00C896]/15 text-[#00A57A] border-[#00C896] shadow-sm'
                    : isDark
                      ? 'bg-[rgba(12,12,16,0.45)] text-slate-400 border-[rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 hover:text-[#F8FAFC]'
                      : 'bg-white/60 text-slate-600 border-slate-200 hover:border-[#00C896]/40 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===================== VIEW MODE 1: CONTINUOUS CAROUSEL ===================== */}
      {viewMode === 'carousel' && (
        <div 
          className="relative w-full overflow-hidden py-4 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Edge masking gradients for smooth continuous aesthetic */}
          <div className={`absolute top-0 left-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none ${
            isDark 
              ? 'bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent' 
              : 'bg-gradient-to-r from-[#F7FAF9] via-[#F7FAF9]/80 to-transparent'
          }`} />
          <div className={`absolute top-0 right-0 bottom-0 w-12 sm:w-32 z-20 pointer-events-none ${
            isDark 
              ? 'bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent' 
              : 'bg-gradient-to-l from-[#F7FAF9] via-[#F7FAF9]/80 to-transparent'
          }`} />

          {/* Carousel Arrow Controls */}
          <button
            type="button"
            onClick={handleScrollPrev}
            title="Previous Certificates"
            id="cert-carousel-prev-btn"
            className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border shadow-2xl backdrop-blur-2xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
              isDark
                ? 'bg-[rgba(12,12,16,0.85)] border-[rgba(212,175,55,0.4)] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
                : 'bg-white/95 border-[#00C896]/40 text-[#00A57A] hover:bg-[#00C896] hover:text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleScrollNext}
            title="Next Certificates"
            id="cert-carousel-next-btn"
            className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border shadow-2xl backdrop-blur-2xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
              isDark
                ? 'bg-[rgba(12,12,16,0.85)] border-[rgba(212,175,55,0.4)] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
                : 'bg-white/95 border-[#00C896]/40 text-[#00A57A] hover:bg-[#00C896] hover:text-white'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Continuous Infinite 60fps Track */}
          <div 
            ref={carouselTrackRef}
            className="flex items-stretch gap-5 sm:gap-7 w-max animate-marquee"
            style={{
              animationPlayState: isHovered ? 'paused' : 'running',
              willChange: 'transform'
            }}
          >
            {loopItems.map((cert, loopIndex) => {
              return (
                <div
                  key={`${cert.image}-${loopIndex}`}
                  onClick={() => handleCardClick(cert)}
                  id={`cert-card-${loopIndex}`}
                  className={`group/card relative w-[290px] sm:w-[340px] md:w-[370px] shrink-0 rounded-3xl backdrop-blur-2xl border transition-all duration-300 overflow-hidden p-4 sm:p-5 flex flex-col justify-between cursor-pointer hover:-translate-y-2 hover:shadow-2xl ${
                    isDark
                      ? 'bg-[rgba(12,12,16,0.6)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.22)] text-[#F8FAFC]'
                      : 'bg-[rgba(255,255,255,0.7)] border-slate-200/80 hover:border-[#00C896] hover:shadow-[0_15px_40px_rgba(0,200,150,0.18)] text-slate-900'
                  }`}
                >
                  {/* Real Certificate Image Frame - Sharp, Visible & Primary Focus */}
                  <div className="relative w-full aspect-[1.44/1] rounded-2xl overflow-hidden mb-4 bg-slate-950/20 dark:bg-black/60 border border-slate-200/70 dark:border-white/10 shadow-inner flex items-center justify-center">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover/card:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('/certificates/')) {
                          target.src = `/certificates/${cert.image.split('/').pop()}`;
                        }
                      }}
                    />

                    {/* Verified Seal Icon in corner */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <div className={`p-1 rounded-full shadow-lg backdrop-blur-md ${
                        isDark ? 'bg-black/70 text-[#FFD700] border border-[#D4AF37]/40' : 'bg-white/90 text-[#00A57A] border border-emerald-200'
                      }`}>
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Hover Overlay with Preview Icon - Only shows on Hover or Active Touch */}
                    <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-250 flex items-center justify-center gap-2 text-white text-xs font-bold pointer-events-none">
                      <div className="px-3.5 py-2 rounded-xl bg-black/75 border border-white/20 shadow-xl flex items-center gap-2 text-white">
                        <Maximize2 className="w-4 h-4 text-[#D4AF37] dark:text-[#FFD700]" />
                        <span>View Certificate</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Metadata Area: Title, Issuer, Verified Status */}
                  <div className="space-y-2 pt-1 border-t border-slate-200/50 dark:border-white/10">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-extrabold tracking-tight leading-snug text-slate-900 dark:text-[#F8FAFC] group-hover/card:text-[#00A57A] dark:group-hover/card:text-[#D4AF37] transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      {/* Issuer Name & Brand */}
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-[#CBD5E1] font-semibold truncate">
                        <IssuerLogo issuer={cert.issuer || 'Google'} className="w-4 h-4" size={16} />
                        <span className="truncate">{cert.issuer || 'Accredited Issuer'}</span>
                      </div>

                      {/* Verified Badge */}
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono shrink-0 ${
                        isDark 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================== VIEW MODE 2: CURATED GALLERY GRID ===================== */}
      {viewMode === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => handleCardClick(cert)}
                id={`cert-grid-card-${index}`}
                className={`group/card relative rounded-3xl backdrop-blur-2xl border transition-all duration-300 overflow-hidden p-5 flex flex-col justify-between cursor-pointer hover:-translate-y-2 hover:shadow-2xl ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.6)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.22)] text-[#F8FAFC]'
                    : 'bg-[rgba(255,255,255,0.7)] border-slate-200/80 hover:border-[#00C896] hover:shadow-[0_15px_40px_rgba(0,200,150,0.18)] text-slate-900'
                }`}
              >
                {/* Real Certificate Image Frame */}
                <div className="relative w-full aspect-[1.44/1] rounded-2xl overflow-hidden mb-4 bg-slate-950/20 dark:bg-black/60 border border-slate-200/70 dark:border-white/10 shadow-inner flex items-center justify-center">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover/card:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/certificates/')) {
                        target.src = `/certificates/${cert.image.split('/').pop()}`;
                      }
                    }}
                  />

                  {/* Corner Verified Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <div className={`p-1 rounded-full shadow-lg backdrop-blur-md ${
                      isDark ? 'bg-black/70 text-[#FFD700] border border-[#D4AF37]/40' : 'bg-white/90 text-[#00A57A] border border-emerald-200'
                    }`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-250 flex items-center justify-center gap-2 text-white text-xs font-bold pointer-events-none">
                    <div className="px-3.5 py-2 rounded-xl bg-black/75 border border-white/20 shadow-xl flex items-center gap-2 text-white">
                      <Maximize2 className="w-4 h-4 text-[#D4AF37] dark:text-[#FFD700]" />
                      <span>View Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="space-y-2 pt-1 border-t border-slate-200/50 dark:border-white/10">
                  <h4 className="text-base font-extrabold tracking-tight leading-snug text-slate-900 dark:text-[#F8FAFC] group-hover/card:text-[#00A57A] dark:group-hover/card:text-[#D4AF37] transition-colors line-clamp-2">
                    {cert.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-[#CBD5E1] font-semibold truncate">
                      <IssuerLogo issuer={cert.issuer || 'Google'} className="w-4 h-4" size={16} />
                      <span className="truncate">{cert.issuer || 'Accredited Issuer'}</span>
                    </div>

                    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono ${
                      isDark 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Fullscreen Preview Modal with Swipe & Zoom */}
      {!onOpenCertificate && (
        <CertificateModal
          certificate={selectedCert}
          allCertificates={certificates}
          onClose={() => setSelectedCert(null)}
          onSelectCertificate={(cert) => setSelectedCert(cert)}
        />
      )}
    </section>
  );
};
