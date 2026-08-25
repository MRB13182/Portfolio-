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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
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
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          id="project-modal-container"
          className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl backdrop-blur-3xl border shadow-2xl z-10 overflow-hidden flex flex-col ${
            isDark
              ? 'bg-[rgba(12,12,16,0.88)] border-[rgba(212,175,55,0.35)] text-[#F8FAFC] shadow-[0_0_60px_rgba(124,58,237,0.3)]'
              : 'bg-white/95 border-[rgba(0,200,150,0.3)] text-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
          }`}
        >
          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            id="project-modal-close-btn"
            aria-label="Close project modal"
            className={`absolute top-5 right-5 z-30 p-2.5 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'border-[rgba(212,175,55,0.3)] bg-[#0B0B0F] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37]'
                : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-[#00C896]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
            
            {/* Top Project Banner / Hero Preview */}
            <div className={`relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden mb-8 border shadow-lg ${
              isDark ? 'border-[rgba(212,175,55,0.25)]' : 'border-slate-200'
            }`}>
              <SafeImage
                src={project.image}
                alt={project.title}
                fallbackType="project"
                fallbackText={project.title}
                badge={project.category}
                className="w-full h-full"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md ${
                  isDark
                    ? 'bg-[#050505]/85 text-[#FFD700] border border-[#D4AF37]/40'
                    : 'bg-white/90 text-[#00A57A] border border-[#00C896]/30'
                }`}>
                  {project.category}
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="mb-6">
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 ${
                isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
              }`}>
                {project.title}
              </h2>
              <p className={`text-base sm:text-lg font-medium ${
                isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'
              }`}>
                {project.tagline}
              </p>
            </div>

            {/* Action Direct Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="project-modal-live-link"
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-md ${
                    isDark
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:opacity-90 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-gradient-to-r from-[#00C896] to-[#00A57A] text-white hover:opacity-90 shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Platform</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="project-modal-github-link"
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 border transition-all ${
                    isDark
                      ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.3)] text-[#F8FAFC] hover:border-[#D4AF37] hover:text-[#FFD700]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#00C896] hover:text-[#00A57A]'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>Source Repository</span>
                </a>
              )}
            </div>

            {/* In-depth Description */}
            <div className="mb-8">
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                isDark ? 'text-[#FFD700]' : 'text-slate-700'
              }`}>
                Overview &amp; Problem Solved
              </h4>
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="mb-8">
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                  isDark ? 'text-[#FFD700]' : 'text-slate-700'
                }`}>
                  <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
                  Key Architectural Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                        isDark
                          ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#00C896]'
                      }`} />
                      <span className="text-xs sm:text-sm font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Highlights */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="mb-8">
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                  isDark ? 'text-[#FFD700]' : 'text-slate-700'
                }`}>
                  <Workflow className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
                  System Architecture Highlights
                </h4>
                <div className="flex flex-col gap-2">
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border font-mono text-xs ${
                        isDark
                          ? 'bg-[#050505] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]'
                          : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      &gt; {arch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark ? 'text-[#FFD700]' : 'text-slate-700'
              }`}>
                Technologies &amp; Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                      isDark
                        ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.3)] text-[#FFD700]'
                        : 'bg-emerald-50 border-emerald-200 text-[#00A57A]'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className={`p-4 sm:p-6 border-t flex items-center justify-between ${
            isDark
              ? 'border-[rgba(212,175,55,0.2)] bg-[#050505]'
              : 'border-slate-200 bg-slate-50'
          }`}>
            <span className={`text-xs font-mono ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
              Engineered by MD. Moshiur Rahman
            </span>
            <button
              onClick={onClose}
              id="project-modal-footer-close-btn"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#7C3AED]/40 text-[#F8FAFC] border border-[rgba(212,175,55,0.3)] hover:bg-[#7C3AED]/70'
                  : 'bg-emerald-100 text-[#00A57A] border border-emerald-200 hover:bg-emerald-200'
              }`}
            >
              Close Preview
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
