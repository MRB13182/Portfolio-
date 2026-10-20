import React from 'react';
import { Project } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { SafeImage } from '../common/SafeImage';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { isDark } = useTheme();

  React.useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto" 
        role="dialog" 
        aria-modal="true" 
        aria-label={project.title}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`fixed inset-0 backdrop-blur-md transition-opacity cursor-pointer ${
            isDark ? 'bg-black/75' : 'bg-black/40'
          }`}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          id="project-modal-container"
          className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl backdrop-blur-2xl border shadow-2xl z-10 overflow-hidden flex flex-col ${
            isDark
              ? 'bg-[#111722]/95 border-white/10 text-[#F8FAFC] shadow-[0_16px_50px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 border-slate-200 shadow-2xl text-slate-800'
          }`}
        >
          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            id="project-modal-close-btn"
            aria-label="Close project modal"
            className={`absolute top-4 right-4 z-30 p-2 rounded-xl border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
              isDark
                ? 'border-white/10 bg-[#080B12]/80 text-[#A1AAB8] hover:text-white hover:border-[#22D3EE]/40'
                : 'border-slate-200 bg-white/90 text-slate-600 hover:text-slate-900 hover:border-[#0891B2]/40'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
            
            {/* Top Project Banner / Hero Preview */}
            <div className={`relative w-full h-56 sm:h-80 rounded-xl overflow-hidden mb-8 border ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <SafeImage
                src={project.image}
                alt={project.title}
                fallbackType="project"
                fallbackText={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/60 text-[#22D3EE] border border-white/10">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="mb-6">
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {project.title}
              </h2>
              <p className={`text-sm sm:text-base font-medium ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
              }`}>
                {project.tagline}
              </p>
            </div>

            {/* Action Direct Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="project-modal-live-link"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-extrabold hover:opacity-95 shadow-md shadow-cyan-500/10 focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                  <span>Launch Live Platform</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="project-modal-github-link"
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <Github className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Source Repository</span>
                </a>
              )}
            </div>

            {/* In-depth Description */}
            <div className="mb-8">
              <h4 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
              }`}>
                Overview &amp; Problem Solved
              </h4>
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="mb-8">
                <h4 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                  isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Architectural Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                        isDark
                          ? 'bg-white/[0.03] border-white/[0.07] text-[#F8FAFC]'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Highlights */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="mb-8">
                <h4 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                  isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
                }`}>
                  <Workflow className="w-3.5 h-3.5" />
                  System Architecture Highlights
                </h4>
                <div className="flex flex-col gap-2">
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border font-mono text-xs ${
                        isDark
                          ? 'bg-white/[0.02] border-white/[0.06] text-[#A1AAB8]'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      &gt; {arch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h4 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-3 ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
              }`}>
                Technologies &amp; Libraries
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-mono px-3 py-1 rounded-lg border ${
                      isDark
                        ? 'bg-white/[0.04] border-white/[0.07] text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className={`p-4 sm:p-5 border-t flex items-center justify-between text-xs font-mono ${
            isDark
              ? 'border-white/[0.08] bg-[#0E1420]/80 text-[#A1AAB8]'
              : 'border-slate-200 bg-slate-50 text-slate-500'
          }`}>
            <span>
              Engineered by MD. Moshiur Rahman
            </span>
            <button
              onClick={onClose}
              id="project-modal-footer-close-btn"
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
