import React, { useState, useEffect, useRef } from 'react';
import { Certificate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { IssuerLogo } from '../common/IssuerLogo';
import { A4CertificateDocument } from '../common/A4CertificateDocument';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  ShieldCheck, 
  ExternalLink,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CertificateReaderModalProps {
  certificate: Certificate | null;
  index?: number;
  onClose: () => void;
}

export const CertificateReaderModal: React.FC<CertificateReaderModalProps> = ({
  certificate,
  index = 0,
  onClose
}) => {
  const { isDark } = useTheme();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom whenever a new certificate opens
  useEffect(() => {
    if (certificate) {
      setZoomLevel(1);
    }
  }, [certificate]);

  // Keyboard accessibility
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || (e.ctrlKey && e.key === '=')) {
        e.preventDefault();
        setZoomLevel(prev => Math.min(prev + 0.15, 2.2));
      } else if (e.key === '-' || (e.ctrlKey && e.key === '-')) {
        e.preventDefault();
        setZoomLevel(prev => Math.max(prev - 0.15, 0.65));
      } else if (e.key === '0' && e.ctrlKey) {
        e.preventDefault();
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.15, 2.2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.15, 0.65));
  };

  const handleFitWidth = () => {
    setZoomLevel(1);
  };

  return (
    <AnimatePresence>
      <div 
        id="certificate-reader-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Floating Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          id="certificate-reader-modal"
          className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl backdrop-blur-2xl border shadow-2xl z-10 overflow-hidden flex flex-col ${
            isDark
              ? 'bg-[rgba(15,15,20,0.96)] border-[rgba(212,175,55,0.35)] text-[#F8FAFC] shadow-[0_0_80px_rgba(124,58,237,0.35)]'
              : 'bg-white/95 border-[#00C896]/30 text-slate-900 shadow-[0_25px_80px_rgba(0,200,150,0.2)]'
          }`}
        >
          {/* Top Document Viewer Navigation & Controls Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-200/70 dark:border-[rgba(212,175,55,0.2)] flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-[#0B0B0F]/90 backdrop-blur-md shrink-0">
            
            {/* Left: Issuer & Document Identity */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-xl border shadow-sm shrink-0 ${
                isDark 
                  ? 'bg-[#121218] border-[#D4AF37]/35 shadow-[0_0_12px_rgba(212,175,55,0.15)]' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <IssuerLogo issuer={certificate.issuer} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xs sm:text-sm tracking-tight truncate">
                    {certificate.title}
                  </h3>
                  <div className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? 'bg-[#7C3AED]/20 text-[#FFD700] border border-[#D4AF37]/30' : 'bg-emerald-50 text-[#00A57A] border border-[#00C896]/30'
                  }`}>
                    <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-[#FFD700]" />
                    <span>Verified</span>
                  </div>
                  {certificate.category && (
                    <span className={`hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      isDark ? 'bg-[#121218] border-[rgba(212,175,55,0.3)] text-[#F8FAFC]' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {certificate.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-[#F8FAFC]">
                  <span>{certificate.issuer}</span>
                  <span>•</span>
                  <span>{certificate.issueDate}</span>
                  {certificate.theme && (
                    <>
                      <span>•</span>
                      <span className="hidden sm:inline text-[#00A57A] dark:text-[#D4AF37] font-semibold">{certificate.theme}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Modal Controls (Zoom In, Zoom Out, Fit Width, Close) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Zoom Controls Pill */}
              <div className={`flex items-center rounded-xl border p-1 ${
                isDark ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)]' : 'bg-white border-slate-200'
              }`}>
                <button
                  onClick={handleZoomOut}
                  id="cert-reader-zoom-out-btn"
                  title="Zoom Out"
                  aria-label="Zoom out certificate"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-[#121218] text-[#F8FAFC] hover:text-[#FFD700]' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <span className="px-2 text-[11px] font-mono font-bold text-slate-500 dark:text-[#F8FAFC] select-none">
                  {Math.round(zoomLevel * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  id="cert-reader-zoom-in-btn"
                  title="Zoom In"
                  aria-label="Zoom in certificate"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-[#121218] text-[#F8FAFC] hover:text-[#FFD700]' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <div className="w-[1px] h-4 bg-slate-200 dark:bg-[rgba(212,175,55,0.25)] mx-1" />

                <button
                  onClick={handleFitWidth}
                  id="cert-reader-fit-width-btn"
                  title="Fit Width / Reset (100%)"
                  aria-label="Fit width and reset zoom"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold ${
                    isDark ? 'hover:bg-[#121218] text-[#FFD700]' : 'hover:bg-slate-100 text-[#00A57A]'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Reset</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                id="cert-reader-close-btn"
                aria-label="Close certificate reader"
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDark 
                    ? 'border-[rgba(212,175,55,0.3)] bg-[#0B0B0F] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37]' 
                    : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-[#00C896]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Center: A4 Document Viewer Canvas with Interactive Zoom */}
          <div 
            ref={containerRef}
            className="flex-grow overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-100/60 dark:bg-[#050505] select-none min-h-[340px] sm:min-h-[460px]"
          >
            <div 
              style={{ 
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
              }}
              className="w-full max-w-2xl shrink-0 my-auto"
            >
              <A4CertificateDocument 
                certificate={certificate} 
                index={index}
                className="shadow-2xl"
              />
            </div>
          </div>

          {/* Bottom Accreditation Info Bar */}
          <div className="p-3 sm:p-4 border-t border-slate-200/70 dark:border-[rgba(212,175,55,0.2)] flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-50/90 dark:bg-[#0B0B0F]/90 text-xs shrink-0">
            
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-ping ${
                isDark ? 'bg-[#FFD700]' : 'bg-[#00C896]'
              }`} />
              <span className="font-mono text-slate-500 dark:text-[#F8FAFC] text-[11px]">
                Credential ID: <strong className="text-slate-800 dark:text-[#FFD700]">{certificate.credentialId}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="cert-reader-verify-online-link"
                className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono transition-colors hover:underline ${
                  isDark ? 'text-[#FFD700] hover:text-[#F8FAFC]' : 'text-[#00A57A] hover:text-[#007F60]'
                }`}
              >
                <span>Verify on {certificate.issuer}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
