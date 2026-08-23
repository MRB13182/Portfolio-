import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Certificate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Calendar,
  Sparkles,
  Download
} from 'lucide-react';
import { IssuerLogo } from '../common/IssuerLogo';

interface CertificateModalProps {
  certificate: Certificate | null;
  allCertificates?: Certificate[];
  onClose: () => void;
  onSelectCertificate?: (cert: Certificate) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  allCertificates = [],
  onClose,
  onSelectCertificate,
}) => {
  const { isDark } = useTheme();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Current index in certificates list for navigation
  const currentIndex = certificate && allCertificates.length > 0
    ? allCertificates.findIndex(c => c.image === certificate.image || c.id === certificate.id)
    : -1;

  const hasNext = currentIndex !== -1 && currentIndex < allCertificates.length - 1;
  const hasPrev = currentIndex > 0;

  const goToNext = useCallback(() => {
    if (hasNext && onSelectCertificate && allCertificates[currentIndex + 1]) {
      onSelectCertificate(allCertificates[currentIndex + 1]);
    }
  }, [hasNext, onSelectCertificate, allCertificates, currentIndex]);

  const goToPrev = useCallback(() => {
    if (hasPrev && onSelectCertificate && allCertificates[currentIndex - 1]) {
      onSelectCertificate(allCertificates[currentIndex - 1]);
    }
  }, [hasPrev, onSelectCertificate, allCertificates, currentIndex]);

  // Reset zoom & pan when certificate changes
  useEffect(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [certificate]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
      } else if (e.key === '-') {
        setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
      } else if (e.key === '0') {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToNext, goToPrev]);

  if (!certificate) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.3, 0.7);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Mouse Drag Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomLevel > 1) return; // allow pinch/zoom instead of swipe when zoomed
    if (e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      // Check horizontal swipe with minimum threshold
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && deltaTime < 400) {
        if (deltaX < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="certificate-preview-modal"
        ref={modalContainerRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Content Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full max-w-5xl max-h-[94vh] rounded-3xl backdrop-blur-3xl border shadow-2xl z-10 overflow-hidden flex flex-col ${
            isDark
              ? 'bg-[rgba(12,12,16,0.92)] border-[rgba(212,175,55,0.35)] text-[#F8FAFC] shadow-[0_0_90px_rgba(0,0,0,0.95)]'
              : 'bg-[rgba(255,255,255,0.94)] border-[#00C896]/35 text-slate-900 shadow-[0_25px_75px_rgba(0,200,150,0.22)]'
          }`}
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 border-b border-slate-200/50 dark:border-[rgba(212,175,55,0.25)] shrink-0 gap-2">
            
            {/* Title & Issuer Info */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="hidden sm:flex shrink-0">
                <IssuerLogo issuer={certificate.issuer || 'Google'} className="w-7 h-7" size={28} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-base font-extrabold truncate text-slate-900 dark:text-[#F8FAFC]">
                    {certificate.title}
                  </h3>
                  <span className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono ${
                    isDark ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}>
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-[#CBD5E1] truncate font-medium">
                  <span>{certificate.issuer || 'Accredited Authority'}</span>
                  {certificate.category && (
                    <>
                      <span>•</span>
                      <span>{certificate.category}</span>
                    </>
                  )}
                  {allCertificates.length > 0 && currentIndex !== -1 && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-[#00A57A] dark:text-[#D4AF37] font-bold">
                        {currentIndex + 1} of {allCertificates.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Zoom Controls, Navigation, Fullscreen & Close */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Prev Certificate (if list provided) */}
              {allCertificates.length > 1 && (
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={!hasPrev}
                  title="Previous Certificate (Left Arrow / Swipe Right)"
                  id="cert-modal-prev-btn"
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-[rgba(20,20,28,0.7)] text-[#F8FAFC] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#00C896]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Next Certificate (if list provided) */}
              {allCertificates.length > 1 && (
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={!hasNext}
                  title="Next Certificate (Right Arrow / Swipe Left)"
                  id="cert-modal-next-btn"
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-[rgba(20,20,28,0.7)] text-[#F8FAFC] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#00C896]'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {/* Zoom Out */}
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.7}
                title="Zoom Out (-)"
                id="cert-modal-zoom-out"
                className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer disabled:opacity-30 ${
                  isDark
                    ? 'bg-[rgba(20,20,28,0.7)] text-[#F8FAFC] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#00C896]'
                }`}
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Zoom Reset */}
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset Zoom (0)"
                id="cert-modal-zoom-reset"
                className={`hidden xs:inline-block px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[rgba(20,20,28,0.7)] text-[#D4AF37] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]'
                    : 'bg-white text-[#00A57A] border-slate-200 hover:border-[#00C896]'
                }`}
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              {/* Zoom In */}
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                title="Zoom In (+)"
                id="cert-modal-zoom-in"
                className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer disabled:opacity-30 ${
                  isDark
                    ? 'bg-[rgba(20,20,28,0.7)] text-[#F8FAFC] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#00C896]'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Open Image in New Tab */}
              <a
                href={certificate.image}
                target="_blank"
                rel="noreferrer"
                title="Open full image in high resolution"
                id="cert-modal-open-tab"
                className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer hidden sm:flex items-center justify-center ${
                  isDark
                    ? 'bg-[rgba(20,20,28,0.7)] text-[#F8FAFC] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#00C896]'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                title="Close (Esc)"
                id="cert-modal-close-btn"
                className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ml-1 ${
                  isDark
                    ? 'bg-[rgba(212,175,55,0.18)] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border-[rgba(212,175,55,0.4)]'
                    : 'bg-emerald-50 text-[#00A57A] hover:bg-[#00C896] hover:text-white border-emerald-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Image Viewer Area */}
          <div 
            className="relative flex-1 overflow-auto p-3 sm:p-6 md:p-8 flex items-center justify-center min-h-[320px] max-h-[calc(94vh-130px)] select-none bg-black/10 dark:bg-black/30"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            {/* Previous Navigation Overlay on Hover for Left Edge */}
            {hasPrev && (
              <button
                onClick={goToPrev}
                title="Previous Certificate"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md transition-all shadow-xl hidden md:flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Navigation Overlay on Hover for Right Edge */}
            {hasNext && (
              <button
                onClick={goToNext}
                title="Next Certificate"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md transition-all shadow-xl hidden md:flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Crisp Certificate High-Resolution Image Container */}
            <div 
              className="relative transition-transform duration-100 ease-out flex items-center justify-center max-w-full max-h-full"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
              }}
            >
              <img
                src={certificate.image}
                alt={certificate.title}
                className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-slate-200/50 dark:border-white/10 pointer-events-none"
                loading="eager"
                decoding="sync"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/certificates/')) {
                    target.src = `/certificates/${certificate.image.split('/').pop()}`;
                  }
                }}
              />
            </div>
          </div>

          {/* Bottom Info Bar with Credential ID & Skills */}
          <div className="px-4 sm:px-6 py-2.5 bg-slate-50/80 dark:bg-[#0E0E14]/90 border-t border-slate-200/50 dark:border-[rgba(212,175,55,0.2)] flex flex-wrap items-center justify-between gap-2 text-xs font-medium shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Verified Credential</span>
              </span>
              {certificate.issueDate && (
                <span className="text-slate-500 dark:text-[#CBD5E1] hidden sm:inline">
                  Issued: {certificate.issueDate}
                </span>
              )}
              {certificate.credentialId && (
                <span className="font-mono text-slate-500 dark:text-[#CBD5E1] hidden md:inline">
                  ID: {certificate.credentialId}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono hidden xs:inline">
                Swipe on mobile • Arrows on desktop
              </span>
              <a
                href={certificate.image}
                download={`${certificate.title.replace(/\s+/g, '_')}.png`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                  isDark 
                    ? 'bg-[rgba(212,175,55,0.12)] text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black' 
                    : 'bg-white text-[#00A57A] border-slate-200 hover:border-[#00C896]'
                }`}
              >
                <Download className="w-3 h-3" />
                <span>Save Image</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
