import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Skill } from '../../types';
import { TechLogo } from '../common/TechLogo';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  FolderGit2,
  Layers,
  ArrowUpRight
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

  const experienceValue = skill.experience || skill.experienceDuration || '4+ Years';
  const projectsList = skill.projects || skill.projectsUsing || [];
  const highlights = skill.proficiencyHighlights || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window - Glass Prism Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          id="skill-modal-content"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '28px',
          }}
          className={`relative w-full max-w-xl p-6 sm:p-8 border shadow-2xl z-10 overflow-hidden ${
            isDark
              ? 'bg-[rgba(12,12,16,0.85)] border-[rgba(212,175,55,0.35)] text-[#F8FAFC] shadow-[0_0_60px_rgba(124,58,237,0.35)]'
              : 'bg-[rgba(255,255,255,0.92)] border-[#00C896]/30 text-slate-900 shadow-[0_20px_60px_rgba(0,200,150,0.2)]'
          }`}
        >
          {/* Ambient Glow in Modal */}
          <div 
            style={{
              backgroundColor: skill.accentColor || (isDark ? '#7C3AED' : '#00C896'),
            }}
            className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none" 
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            id="skill-modal-close-btn"
            aria-label="Close skill details"
            className={`absolute top-5 right-5 p-2 rounded-full border transition-all cursor-pointer ${
              isDark 
                ? 'border-[rgba(212,175,55,0.3)] bg-[#0B0B0F] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37] hover:scale-105' 
                : 'border-slate-200 bg-slate-100 text-slate-500 hover:text-slate-900 hover:border-[#00C896] hover:scale-105'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6 pr-10">
            {/* Tech Logo Frame */}
            <div 
              style={{
                borderRadius: '20px',
                borderColor: skill.accentColor ? `${skill.accentColor}40` : (isDark ? 'rgba(212,175,55,0.3)' : 'rgba(0,200,150,0.3)'),
              }}
              className={`w-16 h-16 rounded-[20px] flex items-center justify-center shrink-0 border shadow-lg ${
                isDark
                  ? 'bg-[#121218]'
                  : 'bg-white'
              }`}
            >
              <TechLogo logo={skill.logo || skill.id} size={36} className="w-9 h-9" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isDark 
                    ? 'bg-[#7C3AED]/30 text-[#D4AF37] border-[#D4AF37]/30' 
                    : 'bg-emerald-500/10 text-[#00A57A] border-[#00C896]/30'
                }`}>
                  {skill.category}
                </span>
                
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500 dark:text-[#D4AF37]" />
                  Experience: {experienceValue}
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {skill.name}
              </h3>
            </div>
          </div>

          {/* Proficiency Mastery Bar */}
          <div 
            style={{
              borderRadius: '20px',
            }}
            className="mb-6 p-4 rounded-[20px] bg-slate-100/70 dark:bg-[#0B0B0F]/90 border border-slate-200/60 dark:border-[rgba(212,175,55,0.25)]"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#FFD700] flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#00A57A] dark:text-[#D4AF37]" />
                Technical Mastery Level
              </span>
              <span className="text-base font-black font-mono text-[#00A57A] dark:text-[#FFD700]">
                {skill.level}%
              </span>
            </div>
            
            <div className="w-full h-3.5 bg-slate-200 dark:bg-[#050505] dark:border dark:border-[rgba(212,175,55,0.2)] rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  backgroundColor: skill.accentColor || undefined,
                }}
                className={`h-full rounded-full ${
                  !skill.accentColor
                    ? isDark
                      ? 'bg-gradient-to-r from-[#7C3AED] via-[#D4AF37] to-[#FFD700]'
                      : 'bg-gradient-to-r from-[#00A57A] to-[#00C896]'
                    : ''
                }`}
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
              Architectural Overview &amp; Usage
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-[#F8FAFC] leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Key Strengths / Highlights */}
          {highlights.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-2">
                Core Strengths &amp; Implementations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-[#F8FAFC] bg-slate-50 dark:bg-[#121218] p-2.5 rounded-xl border border-slate-200/60 dark:border-[rgba(212,175,55,0.2)]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-[#D4AF37] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Using This Skill */}
          {projectsList.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-2.5 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                Projects Powered by {skill.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {projectsList.map((proj, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#121218] border-[rgba(212,175,55,0.3)] text-[#FFD700] shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                        : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-emerald-500 dark:text-[#D4AF37]" />
                    <span>{proj}</span>
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
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  : 'bg-[#00C896] text-white hover:shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
              }`}
            >
              Done
            </button>
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};
