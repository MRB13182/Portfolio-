import React, { useState } from 'react';
import { portfolioConfig } from '../../config/portfolio';
import { Certificate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { CertificateModal } from '../modals/CertificateModal';
import { IssuerLogo } from '../common/IssuerLogo';
import { SafeImage } from '../common/SafeImage';
import { ScrollReveal } from '../common/ScrollReveal';
import { 
  Award, 
  ExternalLink, 
  Eye, 
  Sparkles,
  CheckCircle2,
  Calendar,
  Grid,
  Sliders
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

  const certificates: Certificate[] = portfolioConfig.certificates && portfolioConfig.certificates.length > 0
    ? portfolioConfig.certificates
    : [];

  const handleCardClick = (cert: Certificate) => {
    if (onOpenCertificate) {
      onOpenCertificate(cert);
    } else {
      setSelectedCert(cert);
    }
  };

  return (
    <section 
      id="certificates" 
      aria-label="Professional Certificates and Accreditations"
      className="relative py-24 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 blur-3xl pointer-events-none rounded-full ${
        isDark
          ? 'opacity-20 bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#00E5FF]'
          : 'opacity-10 bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#00E5FF]'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={18} duration={0.55}>
          <div className="flex flex-col items-center text-center mb-14">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isDark
                ? 'bg-[#8B5CF6]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                : 'bg-cyan-500/10 text-[#0097A7] border border-[#00E5FF]/30 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Accreditations &amp; Verifications</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Professional{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-white via-[#00E5FF] to-[#8B5CF6]'
                  : 'bg-gradient-to-r from-slate-900 via-[#00E5FF] to-[#8B5CF6]'
              }`}>
                Certificates &amp; Credentials
              </span>
            </h2>
            
            <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#94A3B8]' : 'text-slate-600'
            }`}>
              Verified credentials and enterprise specializations certified by industry-leading cloud, software, and AI organizations.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean Glass Grid of Certificates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -35px 0px', amount: 0.15 }}
              transition={{ 
                duration: 0.55, 
                delay: Math.min(index * 0.08, 0.35),
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              whileHover={{ y: -6 }}
              id={`cert-card-${cert.id}`}
              className={`rounded-[28px] backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl ${
                isDark
                  ? 'bg-[#121217]/70 border-white/12 hover:border-[#00E5FF]/60 hover:shadow-[0_12px_35px_rgba(0,229,255,0.18)]'
                  : 'bg-white/85 border-white/60 hover:border-[#00E5FF] hover:shadow-[0_12px_30px_rgba(0,229,255,0.1)]'
              }`}
            >
              <div>
                {/* Certificate Thumbnail with Preview Trigger */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black/40"
                  onClick={() => handleCardClick(cert)}
                >
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    fallbackType="certificate"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                  {/* Issuer Badge Tag in Image */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/65 text-[#00E5FF] border border-[#00E5FF]/30">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Hover view overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#00E5FF]" /> View Certificate
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Issuer info */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <IssuerLogo issuer={cert.issuer} className="w-6 h-6 rounded-lg shrink-0" />
                    <span className={`text-xs font-semibold ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                    }`}>
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] ml-auto font-mono text-slate-400">
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h3 
                    onClick={() => handleCardClick(cert)}
                    className={`font-black text-lg tracking-tight mb-3 cursor-pointer line-clamp-2 transition-colors ${
                      isDark ? 'text-white group-hover:text-[#00E5FF]' : 'text-slate-900 group-hover:text-[#0097A7]'
                    }`}
                  >
                    {cert.title}
                  </h3>

                  {/* Skills / Key areas */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-white/5 border-white/10 text-slate-300'
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* View Button */}
              <div className={`p-6 pt-0 border-t ${
                isDark ? 'border-white/10 pt-4' : 'border-slate-200/80 pt-4'
              }`}>
                <button
                  onClick={() => handleCardClick(cert)}
                  id={`cert-view-btn-${cert.id}`}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black font-extrabold shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:opacity-95 cursor-pointer active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};
