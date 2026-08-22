import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioConfig } from '../config/portfolio';
import { 
  Sparkles, 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Award,
  Layers,
  TrendingUp,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

interface ExperiencePageProps {
  onOpenResumeDownload?: () => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onOpenResumeDownload }) => {
  const { isDark } = useTheme();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
          isDark 
            ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
            : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20 shadow-[0_4px_15px_rgba(0,200,150,0.1)]'
        }`}>
          <Briefcase className="w-4 h-4" />
          <span>Professional Timeline &amp; Track Record</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          Career{' '}
          <span className={`text-transparent bg-clip-text ${
            isDark 
              ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
              : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
          }`}>
            Experience
          </span>
        </h1>
        
        <p className="text-slate-600 dark:text-[#F8FAFC] max-w-2xl text-base sm:text-lg leading-relaxed mb-6">
          Over 5+ years of software engineering excellence, architectural design, cross-functional leadership, and delivering mission-critical applications.
        </p>

        {onOpenResumeDownload && (
          <button
            onClick={onOpenResumeDownload}
            id="experience-page-download-resume-btn"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer backdrop-blur-2xl ${
              isDark
                ? 'bg-[rgba(12,12,16,0.45)] text-[#D4AF37] border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[rgba(20,20,28,0.7)] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'bg-[rgba(255,255,255,0.45)] text-[#00A57A] border-[#00C896]/30 hover:border-[#00C896] hover:bg-white/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Download Full Resume (PDF)</span>
          </button>
        )}
      </div>

      {/* Animated Vertical Timeline Container */}
      <div className="relative">
        
        {/* Central Vertical Glowing Line */}
        <div className={`absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 rounded-full ${
          isDark 
            ? 'bg-gradient-to-b from-[#D4AF37] via-[#A855F7] to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)]' 
            : 'bg-gradient-to-b from-[#00C896] via-[#7FFFD4] to-transparent shadow-[0_0_15px_rgba(0,200,150,0.2)]'
        }`} />

        {/* Timeline Milestones */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {portfolioConfig.experience.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.id}
                className="relative flex flex-col sm:flex-row items-start"
              >
                {/* Milestone Node on Center Line */}
                <div className={`absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center p-1 border-2 transition-transform duration-300 hover:scale-125 ${
                  isDark 
                    ? 'bg-[#050505] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'bg-white border-[#00C896] text-[#00A57A] shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
                }`}>
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Card wrapper - Alternating left and right on desktop */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`pl-12 sm:pl-0 w-full sm:w-[calc(50%-2rem)] ${
                    isEven ? 'sm:mr-auto sm:pr-4' : 'sm:ml-auto sm:pl-4'
                  }`}
                >
                  <div className={`p-6 sm:p-7 rounded-3xl backdrop-blur-2xl border transition-all duration-300 hover:shadow-xl ${
                    isDark
                      ? 'bg-[rgba(12,12,16,0.45)] border-[rgba(212,175,55,0.22)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)] text-[#F8FAFC]'
                      : 'bg-[rgba(255,255,255,0.45)] border-slate-200/80 hover:border-[#00C896]/40 text-slate-900'
                  }`}>
                    
                    {/* Top Header: Duration & Position Type */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-[#F8FAFC]">
                        <Calendar className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                        <span>{item.duration}</span>
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isDark ? 'bg-[#7C3AED]/30 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-emerald-500/10 text-[#00A57A]'
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Position & Company */}
                    <h3 className="text-xl font-extrabold tracking-tight mb-1 text-slate-900 dark:text-[#F8FAFC]">
                      {item.position}
                    </h3>
                    <div className="text-sm font-semibold text-[#00A57A] dark:text-[#D4AF37] mb-4 flex items-center gap-2">
                      <span>{item.company}</span>
                      <span className="text-xs text-slate-400 dark:text-[#F8FAFC]">• {item.location}</span>
                    </div>

                    {/* Description / Responsibilities */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#F8FAFC] mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Key Responsibilities & Achievements */}
                    <div className="space-y-2 mb-5">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-[#F8FAFC]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Used */}
                    <div className="pt-3 border-t border-slate-100 dark:border-[rgba(212,175,55,0.25)] flex flex-wrap gap-1.5">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                            isDark
                              ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
