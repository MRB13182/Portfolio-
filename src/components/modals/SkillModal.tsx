import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Skill } from '../../types';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Clock, 
  BarChart3, 
  FolderGit2,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillModalProps {
  skill: Skill | null;
  onClose: () => void;
  onSelectProject?: (projectName: string) => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose, onSelectProject }) => {
  const { isDark } = useTheme();

  React.useEffect(() => {
    if (!skill) return;
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
  }, [skill, onClose]);

  if (!skill) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          id="skill-modal-content"
          className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-8 backdrop-blur-3xl border shadow-2xl z-10 overflow-hidden ${
            isDark
              ? 'bg-[rgba(12,12,16,0.78)] border-[rgba(212,175,55,0.35)] text-[#F8FAFC] shadow-[0_0_60px_rgba(124,58,237,0.3)]'
              : 'bg-[rgba(255,255,255,0.85)] border-[#00C896]/25 text-slate-900 shadow-[0_20px_60px_rgba(0,200,150,0.18)]'
          }`}
        >
          {/* Ambient Glow in Modal */}
          <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-25 pointer-events-none ${
            isDark ? 'bg-[#7C3AED]' : 'bg-[#00C896]'
          }`} />

          {/* Close Button */}
          <button
            onClick={onClose}
            id="skill-modal-close-btn"
            aria-label="Close skill details"
            className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
              isDark 
                ? 'border-[rgba(212,175,55,0.3)] bg-[#0B0B0F] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37]' 
                : 'border-slate-200 bg-slate-100 text-slate-500 hover:text-slate-900 hover:border-[#00C896]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
              isDark
                ? 'bg-gradient-to-tr from-[#7C3AED] to-[#D4AF37] p-[1.5px]'
                : 'bg-gradient-to-tr from-[#00C896] to-[#7FFFD4] p-[1.5px]'
            }`}>
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#0B0B0F] flex items-center justify-center text-[#00A57A] dark:text-[#D4AF37]">
                <Cpu className="w-7 h-7" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isDark ? 'bg-[#7C3AED]/30 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-emerald-500/10 text-[#00A57A]'
                }`}>
                  {skill.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-[#F8FAFC] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {skill.experienceDuration} Exp
                </span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">{skill.name}</h3>
            </div>
          </div>

          {/* Proficiency Bar */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-100/70 dark:bg-[#0B0B0F] border border-slate-200/60 dark:border-[rgba(212,175,55,0.2)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#FFD700] flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#00A57A] dark:text-[#D4AF37]" />
                Proficiency Mastery
              </span>
              <span className="text-sm font-black font-mono text-[#00A57A] dark:text-[#FFD700]">
                {skill.level}%
              </span>
            </div>
            
            <div className="w-full h-3 bg-slate-200 dark:bg-[#050505] dark:border dark:border-[rgba(212,175,55,0.2)] rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  isDark
                    ? 'bg-gradient-to-r from-[#7C3AED] via-[#D4AF37] to-[#FFD700]'
                    : 'bg-gradient-to-r from-[#00A57A] to-[#00C896]'
                }`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-2">
              Architecture &amp; Usage
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-[#F8FAFC] leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Key Strengths / Highlights */}
          {skill.proficiencyHighlights && skill.proficiencyHighlights.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-2">
                Core Strengths &amp; Implementations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skill.proficiencyHighlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-[#F8FAFC] bg-slate-50 dark:bg-[#0B0B0F] p-2.5 rounded-xl border border-slate-200/50 dark:border-[rgba(212,175,55,0.2)]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-[#D4AF37] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Using This Skill */}
          {skill.projectsUsing && skill.projectsUsing.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-2 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                Projects Powered by {skill.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.projectsUsing.map((proj, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                      isDark
                        ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#FFD700]'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-[#00C896]'
                    }`}
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-[rgba(212,175,55,0.2)] flex justify-end">
            <button
              onClick={onClose}
              id="skill-modal-done-btn"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#D4AF37] text-black hover:bg-[#FFD700] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#00C896] text-white hover:bg-[#00A57A]'
              }`}
            >
              Close Skill Details
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
