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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-label={skill.name}>
        
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
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          id="skill-modal-content"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '32px',
          }}
          className={`relative w-full max-w-xl p-6 sm:p-8 border shadow-2xl z-10 overflow-hidden ${
            isDark
              ? 'bg-[#0A0A0A] border-[rgba(212,175,55,0.35)] text-[#FFFFFF] shadow-[0_0_80px_rgba(123,44,255,0.35)]'
              : 'bg-white/95 border-[rgba(18,214,160,0.3)] text-slate-800 shadow-[0_20px_60px_rgba(18,214,160,0.18)]'
          }`}
        >
          {/* Ambient Glow in Modal */}
          <div 
            style={{
              backgroundColor: skill.accentColor || (isDark ? '#7B2CFF' : '#12D6A0'),
            }}
            className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none" 
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            id="skill-modal-close-btn"
            aria-label="Close skill details"
            className={`absolute top-5 right-5 p-2 rounded-full border transition-all cursor-pointer hover:scale-105 ${
              isDark
                ? 'border-[rgba(212,175,55,0.3)] bg-[#0B0B0F] text-[#FFFFFF] hover:text-[#F5D06F] hover:border-[#D4AF37]'
                : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-[#12D6A0]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6 pr-10">
            {/* Tech Logo Frame */}
            <div 
              style={{
                borderRadius: '24px',
                borderColor: skill.accentColor 
                  ? `${skill.accentColor}40` 
                  : (isDark ? 'rgba(212,175,55,0.3)' : 'rgba(18,214,160,0.3)'),
              }}
              className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border shadow-lg ${
                isDark ? 'bg-[#121218]' : 'bg-slate-50'
              }`}
            >
              <TechLogo logo={skill.logo || skill.id} size={36} className="w-9 h-9" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-[#7B2CFF]/30 text-[#D4AF37] border-[#D4AF37]/30'
                    : 'bg-emerald-50 text-[#12D6A0] border-emerald-200'
                }`}>
                  {skill.category}
                </span>
                
                <span className={`text-xs font-semibold flex items-center gap-1 ${
                  isDark ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
                  Experience: {experienceValue}
                </span>
              </div>
              
              <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-[#FFFFFF]' : 'text-slate-900'
              }`}>
                {skill.name}
              </h3>
            </div>
          </div>

          {/* Proficiency Mastery Bar */}
          <div 
            style={{
              borderRadius: '24px',
            }}
            className={`mb-6 p-4 rounded-[24px] border ${
              isDark
                ? 'bg-[#0B0B0F]/90 border-[rgba(212,175,55,0.25)]'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-[#F5D06F]' : 'text-slate-700'
              }`}>
                <BarChart3 className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
                Technical Mastery Level
              </span>
              <span className={`text-base font-black font-mono ${
                isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'
              }`}>
                {skill.level}%
              </span>
            </div>
            
            <div className={`w-full h-3.5 rounded-full overflow-hidden p-0.5 border ${
              isDark
                ? 'bg-[#050505] border-[rgba(212,175,55,0.2)]'
                : 'bg-slate-200/70 border-slate-300'
            }`}>
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
                      ? 'bg-gradient-to-r from-[#7B2CFF] via-[#D4AF37] to-[#F5D06F]'
                      : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385]'
                    : ''
                }`}
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-6">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
              isDark ? 'text-[#F5D06F]' : 'text-slate-700'
            }`}>
              <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
              Architectural Overview &amp; Usage
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
            }`}>
              {skill.description}
            </p>
          </div>

          {/* Key Strengths / Highlights */}
          {highlights.length > 0 && (
            <div className="mb-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-[#F5D06F]' : 'text-slate-700'
              }`}>
                Core Strengths &amp; Implementations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center gap-2 text-xs font-medium p-2.5 rounded-2xl border ${
                      isDark
                        ? 'text-[#FFFFFF] bg-[#121218] border-[rgba(212,175,55,0.2)]'
                        : 'text-slate-700 bg-slate-50 border-slate-200'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                      isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                    }`} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Using This Skill */}
          {projectsList.length > 0 && (
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                isDark ? 'text-[#F5D06F]' : 'text-slate-700'
              }`}>
                <FolderGit2 className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
                Projects Powered by {skill.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {projectsList.map((proj, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                      isDark
                        ? 'bg-[#121218] border-[rgba(212,175,55,0.3)] text-[#F5D06F] shadow-[0_0_10px_rgba(212,175,55,0.1)]'
                        : 'bg-emerald-50 border-emerald-200 text-[#12D6A0] shadow-sm'
                    }`}
                  >
                    <Sparkles className={`w-3 h-3 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
                    <span>{proj}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className={`mt-8 pt-4 border-t flex justify-end ${
            isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
          }`}>
            <button
              onClick={onClose}
              id="skill-modal-done-btn"
              className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-r from-[#7B2CFF] to-[#D4AF37] text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385] text-slate-950 hover:shadow-[0_4px_20px_rgba(18,214,160,0.3)]'
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
