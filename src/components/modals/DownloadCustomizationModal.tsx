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
        ? `MD_Moshiur_Rahman_Resume_${selectedTheme === 'light' ? 'Light' : 'Dark'}.pdf`
        : `MD_Moshiur_Rahman_Certificates_${selectedTheme === 'light' ? 'Light' : 'Dark'}.pdf`;

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
        colors: ['#22D3EE', '#8B5CF6', '#06B6D4']
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
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Download Document"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isGenerating && onClose()}
          className={`fixed inset-0 backdrop-blur-md cursor-pointer ${
            isDark ? 'bg-black/75' : 'bg-black/40'
          }`}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          id="download-customization-popup"
          className={`relative w-full max-w-2xl rounded-2xl backdrop-blur-2xl border shadow-2xl z-10 overflow-hidden ${
            isDark
              ? 'bg-[#111722]/95 border-white/10 text-[#F8FAFC] shadow-[0_16px_50px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 border-slate-200 shadow-2xl text-slate-800'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={isGenerating}
            id="download-modal-close-btn"
            aria-label="Close style selection popup"
            className={`absolute top-4 right-4 z-20 p-2 rounded-xl border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
              isDark
                ? 'border-white/10 bg-[#080B12]/80 text-[#A1AAB8] hover:text-white hover:border-[#22D3EE]/40'
                : 'border-slate-200 bg-white/90 text-slate-600 hover:text-slate-900 hover:border-[#0891B2]/40'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-8">
            
            {/* Header */}
            <div className="mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider mb-2 border ${
                isDark ? 'bg-white/[0.04] text-[#22D3EE] border-white/10' : 'bg-slate-100 text-[#0891B2] border-slate-200'
              }`}>
                {isResume ? <FileText className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                <span>{modalTitle} · A4 Standard</span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Choose Document Theme
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}`}>
                Select your preferred designer aesthetic for the printable 210mm × 297mm A4 document.
              </p>
            </div>

            {/* Style Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              
              {/* Option 1: Dark Mode PDF */}
              <div
                onClick={() => setSelectedTheme('dark')}
                id="style-option-dark"
                className={`group relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTheme === 'dark'
                    ? isDark
                      ? 'border-[#22D3EE] bg-[#22D3EE]/10 shadow-sm'
                      : 'border-slate-900 bg-slate-900 text-white shadow-md'
                    : isDark
                      ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      selectedTheme === 'dark' && !isDark ? 'bg-white/10 text-[#22D3EE]' : 'bg-[#22D3EE]/15 text-[#22D3EE]'
                    }`}>
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-bold text-sm leading-tight ${
                        selectedTheme === 'dark' && !isDark ? 'text-white' : isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Dark Edition
                      </div>
                      <div className={`text-xs font-mono mt-0.5 ${
                        selectedTheme === 'dark' && !isDark ? 'text-cyan-200' : 'text-[#22D3EE]'
                      }`}>
                        Cyan &amp; Violet Contrast
                      </div>
                    </div>
                  </div>

                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                    selectedTheme === 'dark'
                      ? 'bg-[#22D3EE] text-black'
                      : isDark ? 'text-white/40 bg-white/[0.04]' : 'text-slate-500 bg-slate-200'
                  }`}>
                    {selectedTheme === 'dark' ? (
                      <>
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Active</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Option 2: Light Mode PDF */}
              <div
                onClick={() => setSelectedTheme('light')}
                id="style-option-light"
                className={`group relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTheme === 'light'
                    ? isDark
                      ? 'border-[#22D3EE] bg-[#22D3EE]/10 shadow-sm'
                      : 'border-[#0891B2] bg-cyan-50 shadow-sm'
                    : isDark
                      ? 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-[#0891B2] flex items-center justify-center shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-bold text-sm leading-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Light Edition
                      </div>
                      <div className="text-xs text-[#0891B2] font-mono mt-0.5">
                        Clean Paper Print
                      </div>
                    </div>
                  </div>

                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                    selectedTheme === 'light'
                      ? 'bg-[#0891B2] text-white'
                      : isDark ? 'text-white/40 bg-white/[0.04]' : 'text-slate-500 bg-slate-200'
                  }`}>
                    {selectedTheme === 'light' ? (
                      <>
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Active</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t ${
              isDark ? 'border-white/[0.08]' : 'border-slate-200'
            }`}>
              
              {/* Secondary Buttons: Live Preview & Direct Print */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  id="preview-toggle-btn"
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-1 sm:flex-initial focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-white hover:border-[#22D3EE]/40'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
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
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-white hover:border-[#22D3EE]/40'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
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
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-extrabold hover:opacity-95 active:scale-95 shadow-md shadow-cyan-500/10 focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{progressStatus || 'Generating Document...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download {selectedTheme === 'light' ? 'Light' : 'Dark'} A4 PDF</span>
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
                    isDark ? 'border-white/[0.08]' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className={`font-semibold flex items-center gap-1.5 ${
                      isDark ? 'text-white' : 'text-slate-800'
                    }`}>
                      <Eye className="w-4 h-4 text-[#22D3EE]" />
                      Real-time A4 Pixel-Perfect Preview ({Math.round(previewZoom * 100)}%)
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreviewZoom(Math.max(0.4, previewZoom - 0.1))}
                        className={`p-1.5 rounded-lg border ${
                          isDark
                            ? 'bg-white/[0.04] border-white/10 text-white hover:border-[#22D3EE]/40'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPreviewZoom(Math.min(1.0, previewZoom + 0.1))}
                        className={`p-1.5 rounded-lg border ${
                          isDark
                            ? 'bg-white/[0.04] border-white/10 text-white hover:border-[#22D3EE]/40'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Scaled Preview Canvas Viewport */}
                  <div className={`w-full h-96 overflow-auto rounded-xl border p-4 flex justify-center items-start shadow-inner ${
                    isDark ? 'border-white/10 bg-[#080B12]' : 'border-slate-200 bg-slate-100'
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
