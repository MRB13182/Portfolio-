import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { Certificate } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { 
  Award, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  X, 
  Sparkles, 
  Calendar,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CertificatesProps {
  onOpenCertificatesDownload: () => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ onOpenCertificatesDownload }) => {
  const { isDark } = useTheme();
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  React.useEffect(() => {
    if (!activeCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeCert]);

  const handleDownloadSingleCert = (cert: Certificate) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.3 },
      colors: isDark ? ['#D4AF37', '#6D28D9'] : ['#00C896', '#7FFFD4']
    });

    const element = document.createElement('a');
    const text = `OFFICIAL CERTIFICATE RECORD\n` +
      `====================================\n` +
      `Title: ${cert.title}\n` +
      `Issuer: ${cert.issuer}\n` +
      `Issue Date: ${cert.issueDate}\n` +
      `Credential ID: ${cert.credentialId}\n` +
      `Verification URL: ${cert.credentialUrl}\n` +
      `Recipient: ${portfolioConfig.personal.name}\n\n` +
      `Skills Verified:\n${cert.skills.join(', ')}\n\n` +
      `Description:\n${cert.description}\n` +
      `====================================`;

    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${cert.credentialId}_Certificate_Record.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="certificates" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Download All Trigger */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-16">
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isDark 
                ? 'bg-[#6D28D9]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
            }`}>
              <Award className="w-3.5 h-3.5" />
              <span>Official Credentials &amp; Certifications</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2">
              Verified Excellence &amp;{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark 
                  ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                  : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
              }`}>
                Accreditations
              </span>
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 max-w-xl text-sm sm:text-base">
              Professional accreditations from Meta, Google Cloud, Microsoft, Amazon Web Services, and Vercel.
            </p>
          </div>

          {/* Master "Download All Certificates (A4 PDF)" CTA */}
          <button
            onClick={onOpenCertificatesDownload}
            id="certs-download-collection-btn"
            className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all shadow-lg cursor-pointer shrink-0 hover:scale-102 active:scale-98 ${
              isDark
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'bg-[#00C896] hover:bg-[#00A57A] text-white shadow-[0_4px_20px_rgba(0,200,150,0.3)]'
            }`}
          >
            <FileDown className="w-4 h-4" />
            <span>Download All Certificates (A4 PDF)</span>
          </button>

        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioConfig.certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveCert(cert)}
              id={`cert-card-${cert.id}`}
              className={`group relative rounded-3xl backdrop-blur-xl border overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg ${
                isDark
                  ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(109,40,217,0.25)] text-white'
                  : 'bg-white/90 border-slate-200/80 hover:border-[#00C896]/50 hover:shadow-[0_15px_40px_rgba(0,200,150,0.12)] text-slate-900'
              }`}
            >
              {/* Top Certificate Image Preview */}
              <div className="relative w-full h-48 overflow-hidden bg-slate-50 dark:bg-zinc-900">
                <SafeImage
                  src={cert.image}
                  alt={cert.title}
                  fallbackType="certificate"
                  fallbackText={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Verified Badge */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-black/70 text-[#FFD700] border border-[#D4AF37]/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-[#D4AF37]" />
                  <span>Verified</span>
                </div>

                {/* Organization Logo Floating in Bottom-Left of Preview */}
                <div className="absolute bottom-3 left-3 z-10 w-9 h-9 rounded-xl p-1.5 backdrop-blur-md bg-white/90 dark:bg-[#050505]/90 border border-slate-200 dark:border-[rgba(212,175,55,0.3)] shadow-md flex items-center justify-center">
                  <img
                    src={cert.issuerLogo}
                    alt={cert.issuer}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-[#A1A1AA] mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                      <span>{cert.issueDate}</span>
                    </div>
                    <span className="font-semibold text-slate-400 dark:text-[#A1A1AA] text-[10px]">{cert.credentialId}</span>
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight mb-1 group-hover:text-emerald-600 dark:group-hover:text-[#FFD700] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-bold text-[#00A57A] dark:text-[#D4AF37] mb-3">
                    {cert.issuer}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-[#A1A1AA] line-clamp-2 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                {/* Skills tags & action */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skills.slice(0, 3).map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                          isDark ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-zinc-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-[#00A57A] dark:text-[#D4AF37]">
                    <span>View Credential Details</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Certificate Detailed Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              id="certificate-modal-container"
              className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 backdrop-blur-2xl border shadow-2xl z-10 overflow-hidden ${
                isDark
                  ? 'bg-[rgba(15,15,20,0.95)] border-[rgba(212,175,55,0.35)] shadow-[0_0_50px_rgba(109,40,217,0.3)] text-white'
                  : 'bg-white/95 border-[#00C896]/25 text-slate-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                id="cert-modal-close-btn"
                aria-label="Close certificate"
                className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                  isDark ? 'border-zinc-800 bg-[#0B0B0F] text-zinc-400 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Certificate Hero */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
                <SafeImage
                  src={activeCert.image}
                  alt={activeCert.title}
                  fallbackType="certificate"
                  fallbackText={activeCert.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Organization */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg p-0.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center">
                    <img src={activeCert.issuerLogo} alt={activeCert.issuer} className="w-full h-full object-contain" />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isDark ? 'bg-[#6D28D9]/30 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-emerald-500/10 text-[#00A57A]'
                  }`}>
                    {activeCert.issuer}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-[#A1A1AA]">
                    ID: {activeCert.credentialId}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight">{activeCert.title}</h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-[#A1A1AA] leading-relaxed mb-6">
                {activeCert.description}
              </p>

              {/* Verified Competencies */}
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#A1A1AA] mb-2.5">
                  Verified Engineering Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCert.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                        isDark ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-[#D4AF37]" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleDownloadSingleCert(activeCert)}
                  id="cert-modal-download-btn"
                  className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer ${
                    isDark ? 'bg-[#0B0B0F] border-zinc-700 text-zinc-200 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Text Record</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="cert-modal-verify-link"
                    className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      isDark ? 'bg-[#D4AF37] text-black hover:bg-[#FFD700] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#00C896] text-white hover:bg-[#00A57A]'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Verify Authenticity</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
