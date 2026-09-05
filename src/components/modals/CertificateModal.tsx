import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Certificate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  ExternalLink,
  Download,
  Maximize2
} from 'lucide-react';
import { IssuerLogo } from '../common/IssuerLogo';
import { SafeImage } from '../common/SafeImage';

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
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Touch & Pinch Zoom tracking
  const initialTouchDistanceRef = useRef<number | null>(null);
  const initialZoomRef = useRef<number>(1);
  const lastTapRef = useRef<number>(0);
  const touchStartPosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Current index in certificates list for navigation
  const currentIndex = certificate && allCertificates.length > 0
    ? allCertificates.findIndex(c => c.image === certificate.image || c.id === certificate.id || c.title === certificate.title)
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

  const normalizeSrc = (url?: string) => {
    if (!url) return '';
    let clean = url.trim();
    if (clean.startsWith('Public/')) clean = '/' + clean.slice(7);
    else if (clean.startsWith('public/')) clean = '/' + clean.slice(7);
    else if (clean.startsWith('/Public/')) clean = '/' + clean.slice(8);
    else if (clean.startsWith('/public/')) clean = '/' + clean.slice(8);
    return clean;
  };

  const [modalImgSrc, setModalImgSrc] = useState<string>(normalizeSrc(certificate?.image));

  useEffect(() => {
    setModalImgSrc(normalizeSrc(certificate?.image));
  }, [certificate]);

  const handleModalImgError = () => {
    if (modalImgSrc.includes('/certificate/Cer')) {
      setModalImgSrc(modalImgSrc.replace('/certificate/Cer', '/certificate/cer'));
    } else if (modalImgSrc.includes('/certificate/cer')) {
      setModalImgSrc(modalImgSrc.replace('/certificate/cer', '/certificates/Cer'));
    } else if (modalImgSrc.includes('/certificates/Cer')) {
      setModalImgSrc(modalImgSrc.replace('/certificates/Cer', '/certificates/cer'));
    }
  };

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(prev => Math.min(prev + 0.3, 3.5));
      } else if (e.key === '-') {
        setZoomLevel(prev => Math.max(prev - 0.3, 0.7));
      } else if (e.key === '0') {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose, goToNext, goToPrev]);

  if (!certificate) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.35, 0.7);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse Drag Panning when zoomed
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

  // Mobile Touch & Pinch Zoom
  const getTouchDistance = (touches: React.TouchList): number => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture start
      initialTouchDistanceRef.current = getTouchDistance(e.touches);
      initialZoomRef.current = zoomLevel;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;
      
      // Double tap to zoom toggle
      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        setZoomLevel(prev => (prev > 1 ? 1 : 2));
        setPosition({ x: 0, y: 0 });
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
        touchStartPosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: now
        };
        if (zoomLevel > 1) {
          dragStartRef.current = {
            x: e.touches[0].clientX - position.x,
            y: e.touches[0].clientY - position.y
          };
          setIsDragging(true);
        }
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialTouchDistanceRef.current !== null) {
      // Active pinch zoom
      const currentDistance = getTouchDistance(e.touches);
      const scaleDelta = currentDistance / initialTouchDistanceRef.current;
      const newZoom = Math.min(Math.max(initialZoomRef.current * scaleDelta, 0.7), 3.5);
      setZoomLevel(newZoom);
    } else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      // Pan zoomed image
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    initialTouchDistanceRef.current = null;
    setIsDragging(false);

    // Swipe navigation when not zoomed
    if (zoomLevel <= 1 && e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartPosRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartPosRef.current.y;
      const deltaTime = Date.now() - touchStartPosRef.current.time;

      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4 && deltaTime < 400) {
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
        id="certificate-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={certificate.title}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      >
        {/* Dark Backdrop Blur with tap-outside to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className={`relative z-10 w-full max-w-5xl max-h-[94vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border backdrop-blur-3xl ${
            isDark
              ? 'bg-[#0A0A0A] border-[rgba(212,175,55,0.3)] text-[#FFFFFF] shadow-[0_0_80px_rgba(123,44,255,0.35)]'
              : 'bg-white/95 border-[rgba(18,214,160,0.3)] text-slate-800 shadow-[0_20px_60px_rgba(18,214,160,0.18)]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar Header */}
          <div className={`flex items-center justify-between px-4 sm:px-6 py-3.5 border-b backdrop-blur-md z-20 ${
            isDark ? 'border-zinc-800 bg-[#0A0A0A]/95' : 'border-slate-200 bg-white/90'
          }`}>
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <div className={`p-1.5 rounded-2xl border flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'
              }`}>
                <IssuerLogo issuer={certificate.issuer} size={20} className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'
                  }`}>
                    {certificate.issuer}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#0EB385]'
                  }`}>
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <h3 className={`text-sm sm:text-base font-extrabold truncate ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {certificate.title}
                </h3>
              </div>
            </div>

            {/* Top Right Action Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Zoom Controls */}
              <div className={`hidden sm:flex items-center gap-1 border rounded-2xl p-1 ${
                isDark ? 'bg-zinc-900/90 border-zinc-700/60' : 'bg-slate-100 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                    isDark ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className={`text-[11px] font-mono font-bold px-1 ${
                  isDark ? 'text-zinc-300' : 'text-slate-700'
                }`}>
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                    isDark ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    title="Reset Zoom (0)"
                    aria-label="Reset Zoom"
                    className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                      isDark ? 'text-[#F5D06F] hover:bg-zinc-800' : 'text-[#12D6A0] hover:bg-slate-200'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Open raw image in new tab */}
              <a
                href={certificate.image}
                target="_blank"
                rel="noreferrer"
                title="Open Original Image in New Tab"
                aria-label="Open Original Image"
                className={`p-2 rounded-2xl border transition-colors flex items-center justify-center ${
                  isDark
                    ? 'bg-zinc-900/90 border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                id="certificate-modal-close-btn"
                title="Close (Esc)"
                aria-label="Close Certificate Modal"
                className={`p-2 rounded-2xl border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-700 hover:bg-red-500/80 text-zinc-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 hover:bg-red-500 hover:text-white text-slate-700'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Certificate Stage Area */}
          <div 
            className="relative flex-1 min-h-[320px] sm:min-h-[460px] md:min-h-[520px] max-h-[70vh] overflow-hidden flex items-center justify-center bg-black/90 cursor-grab active:cursor-grabbing p-4 sm:p-6"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Ambient Backlight */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 bg-[#D4AF37]/10 blur-3xl rounded-full" />
            </div>

            {/* Navigation Left Arrow */}
            {hasPrev && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                title="Previous (Left Arrow)"
                aria-label="Previous Certificate"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-black/70 hover:bg-[#D4AF37] hover:text-black border border-white/20 text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Navigation Right Arrow */}
            {hasNext && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                title="Next (Right Arrow)"
                aria-label="Next Certificate"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-black/70 hover:bg-[#D4AF37] hover:text-black border border-white/20 text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* High-Resolution Centered Certificate Image */}
            <div
              className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-75 select-none"
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
            >
              {modalImgSrc ? (
                <img
                  src={modalImgSrc}
                  alt={`${certificate.title} - ${certificate.issuer} Accreditation`}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  className="max-w-full max-h-[62vh] object-contain rounded-xl shadow-2xl border border-white/10"
                  onError={handleModalImgError}
                />
              ) : null}
            </div>

            {/* Pinch zoom tip on mobile */}
            <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[10px] font-mono text-zinc-300 backdrop-blur-md pointer-events-none">
              Pinch to zoom • Double tap • Swipe
            </div>
          </div>

          {/* Modal Footer with metadata details */}
          <div className={`px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            isDark ? 'border-zinc-800/80 bg-[#0A0A0A]' : 'border-slate-200 bg-white'
          }`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-mono px-2 py-0.5 rounded-lg border ${
                isDark ? 'bg-zinc-900 text-[#F5D06F] border-zinc-700' : 'bg-emerald-50 text-[#12D6A0] border-emerald-200 font-bold'
              }`}>
                {certificate.credentialId || 'AUTHENTIC-ID'}
              </span>
              <span className={isDark ? 'text-zinc-400' : 'text-slate-600'}>
                {certificate.category || 'Professional Certification'}
              </span>
              {certificate.issueDate && (
                <span className={isDark ? 'text-zinc-500' : 'text-slate-400'}>• {certificate.issueDate}</span>
              )}
            </div>

            {certificate.skills && certificate.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.slice(0, 3).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-xl border ${
                      isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
