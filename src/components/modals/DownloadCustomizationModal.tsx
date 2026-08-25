import React, { useState } from 'react';
import { portfolioConfig } from '../../config/portfolio';
import { PdfThemeMode, PdfDownloadType } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { ResumePdfTemplate } from '../pdf/ResumePdfTemplate';
import { CertificatesPdfTemplate } from '../pdf/CertificatesPdfTemplate';
import { generateA4Pdf, triggerDirectPrint } from '../../utils/pdfGenerator';
import { 
  X, 
  Download, 
  Printer, 
  Eye, 
  Check, 
  FileText, 
  Award, 
  Sun, 
  Moon, 
  Loader2, 
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
  const { isDark } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<PdfThemeMode>(isDark ? 'dark' : 'light');
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
        colors: selectedTheme === 'dark' ? ['#D4AF37', '#7C3AED', '#FFD700'] : ['#00C896', '#7FFFD4', '#00A57A']
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
          className={`fixed inset-0 backdrop-blur-md cursor-pointer ${
            isDark ? 'bg-black/80' : 'bg-black/40'
          }`}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          id="download-customization-popup"
          className={`relative w-full max-w-2xl rounded-3xl backdrop-blur-3xl border shadow-2xl z-10 overflow-hidden ${
            isDark
              ? 'bg-[rgba(12,12,16,0.88)] border-[#D4AF37]/30 text-[#F8FAFC] shadow-[0_0_80px_rgba(0,0,0,0.95)]'
              : 'bg-white/95 border-[rgba(0,200,150,0.3)] text-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
          }`}
        >
          {/* Ambient Glow */}
          <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'opacity-25 bg-[#7C3AED]' : 'opacity-15 bg-[#00C896]'
          }`} />

          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={isGenerating}
            id="download-modal-close-btn"
            aria-label="Close style selection popup"
            className={`absolute top-5 right-5 z-20 p-2 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'border-[rgba(212,175,55,0.3)] bg-[#0B0B0F] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37]'
                : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-[#00C896]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            
            {/* Header */}
            <div className="mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'bg-[#7C3AED]/30 text-[#D4AF37]' : 'bg-emerald-500/10 text-[#00A57A]'
              }`}>
                {isResume ? <FileText className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                <span>{modalTitle} • A4 Standard</span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Choose Your Download Style
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-600'}`}>
                Select your preferred designer aesthetic for the printable 210mm × 297mm A4 document.
              </p>
            </div>

            {/* Style Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              
              {/* Option 1: Dark Mode PDF (Black Mamba • Purple • Gold) */}
              <div
                onClick={() => setSelectedTheme('dark')}
                id="style-option-dark"
                className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTheme === 'dark'
                    ? isDark
                      ? 'border-[#D4AF37] bg-[#7C3AED]/15 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                      : 'border-slate-900 bg-slate-900 text-white shadow-md'
                    : isDark
                      ? 'border-[rgba(212,175,55,0.25)] bg-[#0B0B0F] hover:border-[#D4AF37]/50'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedTheme === 'dark' && !isDark ? 'bg-purple-900/60 text-[#FFD700]' : 'bg-[#7C3AED]/30 text-[#D4AF37]'
                    }`}>
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`font-extrabold text-sm leading-tight ${
                        selectedTheme === 'dark' && !isDark ? 'text-white' : isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
                      }`}>
                        Dark {isResume ? 'Resume' : 'Certificates'}
                      </div>
                      <div className={`text-xs font-medium ${
                        selectedTheme === 'dark' && !isDark ? 'text-[#FFD700]' : 'text-[#D4AF37]'
                      }`}>
                        Black Mamba • Purple • Gold
                      </div>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                    selectedTheme === 'dark'
                      ? 'bg-[#D4AF37] text-black shadow-sm'
                      : isDark ? 'text-[#F8FAFC]/60 bg-[#050505]' : 'text-slate-600 bg-slate-200'
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

              {/* Option 2: Light Mode PDF (Apple Titanium Emerald Light) */}
              <div
                onClick={() => setSelectedTheme('light')}
                id="style-option-light"
                className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTheme === 'light'
                    ? isDark
                      ? 'border-[#00C896] bg-emerald-500/10 shadow-[0_0_20px_rgba(0,200,150,0.2)]'
                      : 'border-[#00C896] bg-emerald-50 shadow-sm'
                    : isDark
                      ? 'border-[rgba(212,175,55,0.25)] bg-[#0B0B0F] hover:border-[#D4AF37]/50'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`font-extrabold text-sm leading-tight ${
                        isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
                      }`}>
                        Light {isResume ? 'Resume' : 'Certificates'}
                      </div>
                      <div className="text-xs text-emerald-500 font-medium">
                        Apple Titanium Emerald
                      </div>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                    selectedTheme === 'light'
                      ? 'bg-[#00C896] text-white shadow-sm'
                      : isDark ? 'text-[#F8FAFC]/60 bg-[#050505]' : 'text-slate-600 bg-slate-200'
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

            </div>

            {/* Action Bar */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t ${
              isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
            }`}>
              
              {/* Secondary Buttons: Live Preview & Direct Print */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  id="preview-toggle-btn"
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-1 sm:flex-initial ${
                    isDark
                      ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37]'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-[#00A57A] hover:border-[#00C896]'
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
                    isDark
                      ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] hover:border-[#D4AF37] hover:text-[#FFD700]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#00C896] hover:text-[#00A57A]'
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
                  className={`mt-6 pt-4 border-t ${
                    isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className={`font-bold flex items-center gap-1.5 ${
                      isDark ? 'text-[#F8FAFC]' : 'text-slate-800'
                    }`}>
                      <Eye className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
                      Real-time A4 Pixel-Perfect Preview ({Math.round(previewZoom * 100)}%)
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreviewZoom(Math.max(0.4, previewZoom - 0.1))}
                        className={`p-1 rounded border ${
                          isDark
                            ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] hover:text-[#FFD700]'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPreviewZoom(Math.min(1.0, previewZoom + 0.1))}
                        className={`p-1 rounded border ${
                          isDark
                            ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] hover:text-[#FFD700]'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scaled Preview Canvas Viewport */}
                  <div className={`w-full h-96 overflow-auto rounded-2xl border p-4 flex justify-center items-start shadow-inner ${
                    isDark ? 'border-[rgba(212,175,55,0.25)] bg-[#050505]' : 'border-slate-200 bg-slate-100'
                  }`}>
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

          {/* Hidden Offscreen Render Engine Container */}
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
