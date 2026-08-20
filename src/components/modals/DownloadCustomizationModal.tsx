import React, { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { PdfThemeMode, PdfDownloadType } from '../../types';
import { ResumePdfTemplate } from '../pdf/ResumePdfTemplate';
import { CertificatesPdfTemplate } from '../pdf/CertificatesPdfTemplate';
import { generateA4Pdf, triggerDirectPrint } from '../../utils/pdfGenerator';
import { 
  X, 
  Download, 
  Printer, 
  Eye, 
  Check, 
  Sparkles, 
  FileText, 
  Award, 
  Sun, 
  Moon, 
  Loader2, 
  ShieldCheck,
  CheckCircle2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface DownloadCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PdfDownloadType;
}

export const DownloadCustomizationModal: React.FC<DownloadCustomizationModalProps> = ({
  isOpen,
  onClose,
  type
}) => {
  const { isDark: isAppDark } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<PdfThemeMode>('light');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [previewZoom, setPreviewZoom] = useState(0.75);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isGenerating) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isGenerating]);

  const containerId = type === 'resume' 
    ? `resume-export-${selectedTheme}` 
    : `certificates-export-${selectedTheme}`;

  if (!isOpen) return null;

  const isResume = type === 'resume';
  const modalTitle = isResume ? 'Curriculum Vitae / Resume' : 'Official Certificates Collection';

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setProgressStatus('Initializing A4 layout engine...');

      const filename = isResume
        ? `MD_Moshiur_Rahman_Resume_${selectedTheme === 'light' ? 'Emerald_Light' : 'Black_Mamba_Dark'}.pdf`
        : `MD_Moshiur_Rahman_Certificates_${selectedTheme === 'light' ? 'Emerald_Light' : 'Black_Mamba_Dark'}.pdf`;

      // Allow DOM to settle
      await new Promise((resolve) => setTimeout(resolve, 150));

      await generateA4Pdf({
        filename,
        elementId: containerId,
        theme: selectedTheme,
        orientation: 'portrait',
        onProgress: (stage) => setProgressStatus(stage)
      });

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.4 },
        colors: selectedTheme === 'dark' ? ['#D4AF37', '#6D28D9', '#FFD700'] : ['#00C896', '#7FFFD4', '#00A57A']
      });

      setIsGenerating(false);
      setProgressStatus('');
      onClose();
    } catch (error) {
      console.error('PDF Generation Error:', error);
      setIsGenerating(false);
      setProgressStatus('Download fallback enabled: using print engine.');
      triggerDirectPrint(containerId);
    }
  };

  const handlePrint = () => {
    triggerDirectPrint(containerId);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isGenerating && onClose()}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          id="download-customization-popup"
          className={`relative w-full max-w-2xl rounded-3xl backdrop-blur-2xl border shadow-2xl z-10 overflow-hidden ${
            isAppDark
              ? 'bg-[#0D0D0D]/95 border-[#D4AF37]/30 text-white shadow-[0_0_80px_rgba(0,0,0,0.95)]'
              : 'bg-white/95 border-[#00C896]/25 text-slate-900 shadow-[0_25px_70px_rgba(0,200,150,0.2)]'
          }`}
        >
          {/* Ambient Glow */}
          <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-25 ${
            isAppDark ? 'bg-[#6D28D9]' : 'bg-[#00C896]'
          }`} />

          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={isGenerating}
            id="download-modal-close-btn"
            aria-label="Close style selection popup"
            className={`absolute top-5 right-5 z-20 p-2 rounded-full border transition-colors cursor-pointer ${
              isAppDark 
                ? 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-[#D4AF37]' 
                : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-[#00C896]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            
            {/* Header */}
            <div className="mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 ${
                isAppDark ? 'bg-[#6D28D9]/30 text-[#D4AF37]' : 'bg-emerald-500/10 text-[#00A57A]'
              }`}>
                {isResume ? <FileText className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                <span>{modalTitle} • A4 Standard</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Choose Your Download Style
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                Select your preferred designer aesthetic for the printable 210mm × 297mm A4 document.
              </p>
            </div>

            {/* Style Cards Grid - Compact, Mobile Friendly, No Oversized Paragraphs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              
              {/* Option 1: Light Mode PDF (Apple Titanium Emerald Light) */}
              <div
                onClick={() => setSelectedTheme('light')}
                id="style-option-light"
                className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTheme === 'light'
                    ? 'border-[#00C896] bg-emerald-500/10 shadow-[0_0_20px_rgba(0,200,150,0.2)]'
                    : isAppDark
                      ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                      : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                        Light {isResume ? 'Resume' : 'Certificates'}
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Apple Titanium Emerald
                      </div>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                    selectedTheme === 'light'
                      ? 'bg-[#00C896] text-white shadow-sm'
                      : 'text-slate-400 dark:text-zinc-500 bg-slate-200/50 dark:bg-zinc-800'
                  }`}>
                    {selectedTheme === 'light' ? (
                      <>
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Option 2: Dark Mode PDF (Black Mamba • Purple • Gold) */}
              <div
                onClick={() => setSelectedTheme('dark')}
                id="style-option-dark"
                className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTheme === 'dark'
                    ? 'border-[#D4AF37] bg-[#6D28D9]/15 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : isAppDark
                      ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                      : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#6D28D9]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                        Dark {isResume ? 'Resume' : 'Certificates'}
                      </div>
                      <div className="text-xs text-[#D4AF37] font-medium">
                        Black Mamba • Purple • Gold
                      </div>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                    selectedTheme === 'dark'
                      ? 'bg-[#D4AF37] text-black shadow-sm'
                      : 'text-slate-400 dark:text-zinc-500 bg-slate-200/50 dark:bg-zinc-800'
                  }`}>
                    {selectedTheme === 'dark' ? (
                      <>
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-zinc-800">
              
              {/* Secondary Buttons: Live Preview & Direct Print */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  id="preview-toggle-btn"
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-1 sm:flex-initial ${
                    isAppDark
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-[#D4AF37]'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#00C896]'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{isPreviewOpen ? 'Hide Preview' : 'Live A4 Preview'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  id="direct-print-btn"
                  title="Print or Save via Browser Print Dialog"
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isAppDark
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>

              {/* Primary Download Button */}
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleDownload}
                id="execute-pdf-download-btn"
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 ${
                  selectedTheme === 'dark'
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                    : 'bg-[#00C896] hover:bg-[#00A57A] text-white shadow-[0_4px_20px_rgba(0,200,150,0.3)]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{progressStatus || 'Generating Document...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download {selectedTheme === 'light' ? 'Emerald Light' : 'Black Mamba'} A4 PDF</span>
                  </>
                )}
              </button>

            </div>

            {/* Live Interactive A4 Preview Drawer */}
            <AnimatePresence>
              {isPreviewOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-4 border-t border-slate-200/60 dark:border-zinc-800"
                >
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-slate-600 dark:text-zinc-300">
                      <Eye className="w-4 h-4 text-emerald-500 dark:text-[#D4AF37]" />
                      Real-time A4 Pixel-Perfect Preview ({Math.round(previewZoom * 100)}%)
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreviewZoom(Math.max(0.4, previewZoom - 0.1))}
                        className="p-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPreviewZoom(Math.min(1.0, previewZoom + 0.1))}
                        className="p-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scaled Preview Canvas Viewport */}
                  <div className="w-full h-96 overflow-auto rounded-2xl border border-slate-300 dark:border-zinc-800 bg-slate-900/10 dark:bg-black/50 p-4 flex justify-center items-start shadow-inner">
                    <div 
                      style={{ 
                        transform: `scale(${previewZoom})`, 
                        transformOrigin: 'top center',
                        width: '794px',
                        height: '1123px',
                        marginBottom: `${(1123 * (previewZoom - 1))}px`
                      }}
                      className="shadow-2xl rounded-sm shrink-0"
                    >
                      {isResume ? (
                        <ResumePdfTemplate theme={selectedTheme} containerId={containerId} />
                      ) : (
                        <CertificatesPdfTemplate theme={selectedTheme} containerId={containerId} />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Hidden Offscreen Render Engine Container (Always active for instant html2canvas generation) */}
          <div 
            style={{ 
              position: 'fixed', 
              left: '-9999px', 
              top: '-9999px',
              width: '794px', 
              height: '1123px',
              overflow: 'hidden',
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          >
            {isResume ? (
              <ResumePdfTemplate theme={selectedTheme} containerId={containerId} />
            ) : (
              <CertificatesPdfTemplate theme={selectedTheme} containerId={containerId} />
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
