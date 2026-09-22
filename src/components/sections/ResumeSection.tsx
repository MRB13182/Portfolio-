import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { ScrollReveal } from '../common/ScrollReveal';
import { 
  FileText, 
  Download, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  ShieldCheck,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

interface ResumeSectionProps {
  onOpenResumeDownload?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeDownload }) => {
  const { isDark } = useTheme();
  const { profile } = usePortfolioData();

  const displayName = profile?.name || portfolioConfig.personal.name;
  const primaryTitle = (profile?.titles && profile.titles[0]) || portfolioConfig.personal.titles[0];
  const resumeUrl = profile?.resume_url || portfolioConfig.personal.resumeUrl;

  const handleDirectDownload = () => {
    if (resumeUrl && resumeUrl.startsWith('http')) {
      window.open(resumeUrl, '_blank');
    } else if (onOpenResumeDownload) {
      onOpenResumeDownload();
    } else {
      window.print();
    }
  };

  return (
    <section id="resume" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={18} duration={0.55}>
          <div className="flex flex-col items-center text-center mb-14">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isDark
                ? 'bg-[#8B5CF6]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                : 'bg-cyan-500/10 text-[#0097A7] border border-[#00E5FF]/30 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
            }`}>
              <FileText className="w-3.5 h-3.5" />
              <span>Curriculum Vitae &amp; Credentials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Professional{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-white via-[#00E5FF] to-[#8B5CF6]'
                  : 'bg-gradient-to-r from-slate-900 via-[#00E5FF] to-[#8B5CF6]'
              }`}>
                Resume &amp; Summary
              </span>
            </h2>
            
            <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#94A3B8]' : 'text-slate-600'
            }`}>
              A concise overview of verified software engineering experience, academic background, and technical leadership milestones.
            </p>
          </div>
        </ScrollReveal>

        {/* Content Grid: Left Information & Highlights, Right Resume Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Resume Information & Actions */}
          <ScrollReveal direction="right" distance={25} duration={0.6} className="lg:col-span-7 flex flex-col">
            <div
              className={`p-7 sm:p-10 rounded-[32px] backdrop-blur-2xl border flex flex-col justify-between shadow-xl h-full ${
                isDark
                  ? 'bg-[#121217]/75 border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-[#F8FAFC]'
                  : 'bg-white/85 border-white/60 shadow-[0_12px_35px_rgba(0,229,255,0.08)] text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-black text-2xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {displayName} - Resume
                  </h3>
                  <p className={`text-xs font-mono ${isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'}`}>
                    {primaryTitle} &bull; ATS-Optimized Edition
                  </p>
                </div>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                isDark ? 'text-[#94A3B8]' : 'text-slate-600'
              }`}>
                Structured for technical recruiters, engineering directors, and automated ATS screening engines. Details 5+ years of production experience scaling Next.js, React, Node.js, and cloud backend microservices.
              </p>

              {/* Key Resume Highlights */}
              <div className="space-y-3.5 mb-8">
                <div className={`p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3.5 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <Briefcase className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Experience: 5+ Years Delivering Enterprise Web Products
                    </h4>
                    <p className={`text-[11px] leading-relaxed mt-0.5 ${isDark ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
                      Shipped 50+ modern client applications, high-concurrency microservices, and design systems.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3.5 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <GraduationCap className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Education: Bachelor of Science in Computer Science &amp; Engineering
                    </h4>
                    <p className={`text-[11px] leading-relaxed mt-0.5 ${isDark ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
                      Focus on Data Structures, Algorithms, Software Engineering, and Database Architecture.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3.5 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <ShieldCheck className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Industry Certifications: Google, IBM, Meta, HubSpot Verified
                    </h4>
                    <p className={`text-[11px] leading-relaxed mt-0.5 ${isDark ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
                      Continuous professional accreditation in cloud computing, modern frontend, and security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons & Admin Notice */}
            <div>
              <div className="flex flex-wrap items-center gap-3.5 mb-4">
                <button
                  onClick={handleDirectDownload}
                  id="resume-download-primary-btn"
                  className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black font-extrabold shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:opacity-95 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </button>

                <button
                  onClick={onOpenResumeDownload}
                  id="resume-customize-export-btn"
                  className={`px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border cursor-pointer backdrop-blur-xl transition-all ${
                    isDark
                      ? 'bg-[#121217] border-white/15 text-white hover:border-[#00E5FF]'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-[#00E5FF]'
                  }`}
                >
                  <Eye className="w-4 h-4 text-[#00E5FF]" />
                  <span>Customize &amp; Print</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Resume file manageable through the Admin Panel (Profile &amp; Documents)</span>
              </div>
            </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Resume Preview Card */}
          <ScrollReveal direction="left" distance={25} duration={0.6} delay={0.15} className="lg:col-span-5 flex flex-col items-center justify-center">
            <div 
              onClick={onOpenResumeDownload}
              className={`w-full max-w-md p-6 rounded-[28px] backdrop-blur-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl relative group ${
                isDark
                  ? 'bg-[#121217]/80 border-white/15 hover:border-[#00E5FF]/60 shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
                  : 'bg-white/90 border-white/70 hover:border-[#00E5FF] shadow-[0_12px_35px_rgba(0,229,255,0.12)]'
              }`}
            >
              {/* Top Resume Header Simulation */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <h4 className={`text-base font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {displayName}
                  </h4>
                  <p className={`text-[10px] font-mono ${isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'}`}>
                    {primaryTitle}
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[9px] font-bold font-mono bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                  PDF A4
                </div>
              </div>

              {/* Body snippet simulation */}
              <div className="space-y-3 text-[11px] leading-relaxed mb-6">
                <div>
                  <div className={`font-bold uppercase tracking-wider text-[9px] mb-1 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Executive Profile
                  </div>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Full-Stack Engineer with specialization in Next.js 15, TypeScript, Node.js, and Supabase cloud data architectures...
                  </p>
                </div>

                <div>
                  <div className={`font-bold uppercase tracking-wider text-[9px] mb-1 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Core Technologies
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL'].map((t) => (
                      <span key={t} className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                        isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className={`font-bold uppercase tracking-wider text-[9px] mb-1 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Recent Engagement
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between font-bold text-[10px]">
                      <span>Senior Full-Stack Developer</span>
                      <span className="font-mono text-slate-400 text-[9px]">2022 - Present</span>
                    </div>
                    <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Architected high-throughput client portal systems, cutting page loads by 42%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="w-full py-2.5 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                <Eye className="w-3.5 h-3.5" />
                <span>Click to Preview &amp; Print</span>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
