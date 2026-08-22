import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Project } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Globe2, 
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
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
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
              ? 'bg-[rgba(12,12,16,0.78)] border-[rgba(212,175,55,0.35)] text-[#F8FAFC] shadow-[0_0_60px_rgba(124,58,237,0.3)]'
              : 'bg-[rgba(255,255,255,0.85)] border-[#00C896]/25 text-slate-900 shadow-[0_25px_70px_rgba(0,200,150,0.2)]'
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
                : 'border-slate-200 bg-white/90 text-slate-600 hover:text-slate-900 hover:border-[#00C896]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
            
            {/* Top Project Banner / Hero Preview */}
            <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-slate-200/60 dark:border-[rgba(212,175,55,0.25)] shadow-lg">
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg font-medium text-[#00A57A] dark:text-[#D4AF37]">
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
                      : 'bg-[#00C896] hover:bg-[#00A57A] text-white'
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
                      : 'bg-white border-slate-200 text-slate-800 hover:border-[#00C896]'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>Source Repository</span>
                </a>
              )}
            </div>

            {/* In-depth Description */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-2.5">
                Overview &amp; Problem Solved
              </h4>
              <p className="text-sm sm:text-base text-slate-700 dark:text-[#F8FAFC] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                  Key Architectural Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                        isDark
                          ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]'
                          : 'bg-slate-50/80 border-slate-200/70 text-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Highlights */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-3 flex items-center gap-2">
                  <Workflow className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                  System Architecture Highlights
                </h4>
                <div className="flex flex-col gap-2">
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border font-mono text-xs ${
                        isDark 
                          ? 'bg-[#050505] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]' 
                          : 'bg-slate-100/70 border-slate-200 text-slate-700'
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-3">
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
          <div className="p-4 sm:p-6 border-t border-slate-200/60 dark:border-[rgba(212,175,55,0.2)] flex items-center justify-between bg-slate-50/50 dark:bg-[#050505]">
            <span className="text-xs text-slate-400 dark:text-[#F8FAFC] font-mono">
              Engineered by MD. Moshiur Rahman
            </span>
            <button
              onClick={onClose}
              id="project-modal-footer-close-btn"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#7C3AED]/40 text-[#F8FAFC] border border-[rgba(212,175,55,0.3)] hover:bg-[#7C3AED]/70'
                  : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
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
