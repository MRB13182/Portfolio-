import React from 'react';
import { Skill } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { TechLogo } from '../common/TechLogo';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  FolderGit2,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillModalProps {
  skill: Skill | null;
  isOpen?: boolean;
  onClose: () => void;
  onSelectProject?: (projectName: string) => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
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
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" 
        role="dialog" 
        aria-modal="true" 
        aria-label={skill.name}
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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          id="skill-modal-content"
          className={`relative w-full max-w-xl p-6 sm:p-8 rounded-2xl border backdrop-blur-2xl shadow-2xl z-10 overflow-hidden ${
            isDark
              ? 'bg-[#111722]/95 border-white/10 text-[#F8FAFC] shadow-[0_16px_50px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 border-slate-200 shadow-2xl text-slate-800'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div 
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-tr from-[#22D3EE] to-[#8B5CF6]" 
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            id="skill-modal-close-btn"
            aria-label="Close skill details"
            className={`absolute top-4 right-4 z-20 p-2 rounded-xl border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
              isDark
                ? 'border-white/10 bg-[#080B12]/80 text-[#A1AAB8] hover:text-white hover:border-[#22D3EE]/40'
                : 'border-slate-200 bg-white/90 text-slate-600 hover:text-slate-900 hover:border-[#0891B2]/40'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6 pr-10">
            {/* Tech Logo Frame */}
            <div 
              className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <TechLogo logo={skill.logo || skill.id} size={32} className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/25'
                    : 'bg-cyan-50 text-[#0891B2] border-cyan-200'
                }`}>
                  {skill.category}
                </span>
                
                <span className={`text-xs font-mono flex items-center gap-1 ${
                  isDark ? 'text-[#A1AAB8]' : 'text-slate-500'
                }`}>
                  <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>{experienceValue}</span>
                </span>
              </div>
              
              <h3 className={`text-2xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {skill.name}
              </h3>
            </div>
          </div>

          {/* Proficiency Mastery Bar */}
          <div 
            className={`mb-6 p-4 rounded-xl border ${
              isDark
                ? 'bg-white/[0.02] border-white/[0.07]'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
              }`}>
                <BarChart3 className="w-4 h-4" />
                Technical Mastery
              </span>
              <span className={`text-sm font-mono font-bold tabular-nums ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {skill.level}%
              </span>
            </div>
            
            <div className={`w-full h-2 rounded-full overflow-hidden border ${
              isDark ? 'bg-[#080B12] border-white/10' : 'bg-slate-200 border-slate-300'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-6">
            <h4 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
              isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
            }`}>
              <Layers className="w-3.5 h-3.5" />
              Architectural Overview
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
            }`}>
              {skill.description}
            </p>
          </div>

          {/* Key Strengths / Highlights */}
          {highlights.length > 0 && (
            <div className="mb-6">
              <h4 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
              }`}>
                Core Strengths &amp; Implementations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border ${
                      isDark
                        ? 'text-[#F8FAFC] bg-white/[0.02] border-white/[0.06]'
                        : 'text-slate-700 bg-slate-50 border-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Using This Skill */}
          {projectsList.length > 0 && (
            <div className="mb-6">
              <h4 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
              }`}>
                <FolderGit2 className="w-3.5 h-3.5" />
                Featured In Projects
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {projectsList.map((proj, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-md border ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{proj}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className={`pt-4 border-t flex justify-end ${
            isDark ? 'border-white/[0.08]' : 'border-slate-200'
          }`}>
            <button
              onClick={onClose}
              id="skill-modal-done-btn"
              className="px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-extrabold hover:opacity-95 shadow-xs focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
            >
              Done
            </button>
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};
