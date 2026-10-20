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
  Eye
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
      className="relative py-20 sm:py-24 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={16} duration={0.5}>
          <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border ${
              isDark
                ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
                : 'bg-slate-100 text-[#0891B2] border-slate-200'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Accreditations &amp; Verifications</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
              Professional{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-white via-[#22D3EE] to-[#8B5CF6]'
                  : 'bg-gradient-to-r from-slate-900 via-[#0891B2] to-[#7C3AED]'
              }`}>
                Certificates &amp; Credentials
              </span>
            </h2>
            
            <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
            }`}>
              Verified credentials and enterprise specializations certified by industry-leading cloud, software, and AI organizations.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean Glass Grid of Certificates (Tier B Standard Glass) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -35px 0px' }}
              transition={{ 
                duration: 0.45, 
                delay: Math.min(index * 0.08, 0.3),
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              whileHover={{ y: -4 }}
              id={`cert-card-${cert.id}`}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                isDark
                  ? 'bg-[#111722]/70 border-white/[0.08] hover:border-[#22D3EE]/35 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]'
                  : 'bg-white/85 border-slate-200/90 hover:border-[#0891B2]/40 shadow-[0_6px_20px_-6px_rgba(15,23,42,0.05)]'
              }`}
            >
              <div>
                {/* Certificate Thumbnail with Preview Trigger */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-slate-950/40"
                  onClick={() => handleCardClick(cert)}
                >
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    fallbackType="certificate"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-70 group-hover:opacity-45 transition-opacity" />

                  {/* Issuer Tag in Image */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/60 text-[#22D3EE] border border-white/10">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Hover view overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/15 shadow-md">
                      <Eye className="w-3.5 h-3.5 text-[#22D3EE]" /> View Credential
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  {/* Issuer info */}
                  <div className="flex items-center gap-2 mb-2">
                    <IssuerLogo issuer={cert.issuer} className="w-5 h-5 rounded-md shrink-0" />
                    <span className={`text-xs font-semibold ${
                      isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
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
                    className={`font-black text-base sm:text-lg tracking-tight mb-3 cursor-pointer line-clamp-2 transition-colors ${
                      isDark ? 'text-white group-hover:text-[#22D3EE]' : 'text-slate-900 group-hover:text-[#0891B2]'
                    }`}
                  >
                    {cert.title}
                  </h3>

                  {/* Skills / Key areas */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {cert.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-white/[0.04] border-white/[0.07] text-slate-300'
                              : 'bg-slate-100/90 border-slate-200 text-slate-700'
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
              <div className={`p-5 sm:p-6 pt-0 border-t ${
                isDark ? 'border-white/[0.06] pt-4' : 'border-slate-200/80 pt-4'
              }`}>
                <button
                  type="button"
                  onClick={() => handleCardClick(cert)}
                  id={`cert-view-btn-${cert.id}`}
                  className="w-full min-h-[40px] py-2 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black hover:opacity-95 cursor-pointer active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
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
