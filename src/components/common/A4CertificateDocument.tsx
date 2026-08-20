import React, { useState, useEffect } from 'react';
import { Certificate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { IssuerLogo } from './IssuerLogo';
import { ShieldCheck, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio';
import { getCertificateCandidateUrls } from '../../utils/certificateAssets';

interface A4CertificateDocumentProps {
  certificate: Certificate;
  index?: number;
  className?: string;
  isPreviewOnly?: boolean;
}

export const A4CertificateDocument: React.FC<A4CertificateDocumentProps> = ({
  certificate,
  index = 0,
  className = '',
  isPreviewOnly = false
}) => {
  const { isDark } = useTheme();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0);
  const [allFailed, setAllFailed] = useState<boolean>(false);

  const candidateUrls = getCertificateCandidateUrls(index);

  useEffect(() => {
    setImageLoaded(false);
    setCurrentSrcIndex(0);
    setAllFailed(false);
  }, [certificate, index]);

  const handleImageError = () => {
    if (currentSrcIndex < candidateUrls.length - 1) {
      setCurrentSrcIndex(prev => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const currentImageSrc = candidateUrls[currentSrcIndex] || certificate.image;

  return (
    <div 
      className={`relative w-full aspect-[297/210] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 select-none ${
        isDark 
          ? 'bg-[#08080C] text-white border border-[rgba(212,175,55,0.35)] shadow-[0_0_50px_rgba(109,40,217,0.25)]' 
          : 'bg-[#FCFDFD] text-slate-900 border border-[rgba(0,200,150,0.3)] shadow-[0_20px_50px_rgba(0,200,150,0.12)]'
      } ${className}`}
    >
      {/* 1. Real Image Layer (if successfully loaded) */}
      {!allFailed && currentImageSrc && (
        <img
          src={currentImageSrc}
          alt={certificate.title}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onLoad={(e) => {
            const img = e.currentTarget;
            // Ensure image has real non-zero dimensions
            if (img.naturalWidth > 10 && img.naturalHeight > 10) {
              setImageLoaded(true);
            } else {
              handleImageError();
            }
          }}
          onError={handleImageError}
        />
      )}

      {/* 2. Luxury Vector A4 Certificate Design (Fallback / Base Layer) */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-9 z-10">
        
        {/* Ornamental Decorative Corner Accents */}
        <div className={`absolute inset-2 sm:inset-3.5 border-2 rounded-lg pointer-events-none ${
          isDark ? 'border-[#D4AF37]/35' : 'border-[#00C896]/35'
        }`} />
        <div className={`absolute inset-3 sm:inset-5 border border-dashed rounded pointer-events-none ${
          isDark ? 'border-[#D4AF37]/20' : 'border-[#00C896]/20'
        }`} />

        {/* Ambient Subtle Luxury Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
          <Award className="w-72 h-72 text-[#D4AF37] dark:text-[#FFD700]" />
        </div>

        {/* Certificate Header */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className={`p-2 sm:p-2.5 rounded-xl border shadow-md backdrop-blur-md ${
              isDark 
                ? 'bg-[#121218]/90 border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                : 'bg-white/95 border-[#00C896]/30 shadow-sm'
            }`}>
              <IssuerLogo issuer={certificate.issuer} className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <span className="block text-[8px] sm:text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-[#A1A1AA]">
                Official Accreditation
              </span>
              <span className="font-extrabold text-[11px] sm:text-sm tracking-tight text-[#00A57A] dark:text-[#FFD700]">
                {certificate.issuer}
              </span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${
            isDark
              ? 'bg-[#000000]/80 text-[#FFD700] border border-[#D4AF37]/40 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
              : 'bg-emerald-50 text-[#00A57A] border border-[#00C896]/30'
          }`}>
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#00A57A] dark:text-[#FFD700]" />
            <span>Verified Credential</span>
          </div>
        </div>

        {/* Certificate Centerpiece: Recipient & Award Title */}
        <div className="relative z-10 text-center my-auto py-1 sm:py-2">
          <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-[#A1A1AA] mb-1">
            This is proudly presented to
          </p>

          <h3 className={`text-base sm:text-2xl md:text-3xl font-black tracking-tight mb-1 sm:mb-2 ${
            isDark 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37]' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#00A57A] to-slate-900'
          }`}>
            {portfolioConfig.personal.name}
          </h3>

          <p className="text-[8.5px] sm:text-xs text-slate-500 dark:text-[#A1A1AA] max-w-md mx-auto mb-1.5 sm:mb-2.5 line-clamp-1">
            for successfully meeting the rigorous curriculum &amp; certification criteria for
          </p>

          {/* Award Title Box */}
          <div className={`inline-block px-3.5 sm:px-5 py-1 sm:py-2 rounded-xl border backdrop-blur-md ${
            isDark 
              ? 'bg-[#15151E]/90 border-[#D4AF37]/40 text-white shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
              : 'bg-white/90 border-[#00C896]/30 text-slate-900 shadow-sm'
          }`}>
            <span className="font-extrabold text-[10px] sm:text-base md:text-lg tracking-tight block">
              {certificate.title}
            </span>
          </div>
        </div>

        {/* Certificate Footer Metadata */}
        <div className="relative z-10 flex items-end justify-between pt-2 border-t border-slate-200/50 dark:border-zinc-800/80">
          
          {/* Issue Date & ID */}
          <div className="text-left font-mono">
            <span className="block text-[7.5px] sm:text-[9.5px] text-slate-400 dark:text-[#A1A1AA]">
              Issued: <strong className="text-slate-700 dark:text-zinc-200">{certificate.issueDate}</strong>
            </span>
            <span className="block text-[7px] sm:text-[9px] text-slate-400 dark:text-zinc-500 truncate max-w-[120px] sm:max-w-none">
              ID: {certificate.credentialId}
            </span>
          </div>

          {/* Official Gold / Emerald Embossed Seal */}
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border shadow-lg ${
              isDark
                ? 'bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#8C6D1F] border-[#FFF8DC] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-gradient-to-br from-[#00C896] to-[#007F60] border-white text-white shadow-[0_4px_12px_rgba(0,200,150,0.3)]'
            }`}>
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            
            {!isPreviewOnly && (
              <div className="hidden sm:block text-left text-[8px] font-mono leading-tight text-slate-400 dark:text-[#A1A1AA]">
                <span className="block font-bold text-[#00A57A] dark:text-[#FFD700]">AUTHENTIC</span>
                <span>SECURITY ENCRYPTED</span>
              </div>
            )}
          </div>

          {/* Verification Signature / Authority */}
          <div className="text-right">
            <span className="font-serif italic text-[9px] sm:text-xs text-[#00A57A] dark:text-[#D4AF37] block">
              {certificate.issuer} Global Authority
            </span>
            <span className="text-[7.5px] sm:text-[9.5px] uppercase font-mono tracking-wider text-slate-400 dark:text-[#A1A1AA]">
              Authorized Verification
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
