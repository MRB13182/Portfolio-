import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { ScrollReveal } from '../common/ScrollReveal';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck
} from 'lucide-react';

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
    <section id="resume" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={16} duration={0.5}>
          <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border ${
              isDark
                ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
                : 'bg-slate-100 text-[#0891B2] border-slate-200'
            }`}>
              <FileText className="w-3.5 h-3.5" />
              <span>Curriculum Vitae &amp; Credentials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
              Professional{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-white via-[#22D3EE] to-[#8B5CF6]'
                  : 'bg-gradient-to-r from-slate-900 via-[#0891B2] to-[#7C3AED]'
              }`}>
                Resume &amp; Summary
              </span>
            </h2>
            
            <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
            }`}>
              A concise overview of verified software engineering experience, academic background, and technical leadership milestones.
            </p>
          </div>
        </ScrollReveal>

        {/* Content Grid: Left Information & Highlights, Right Resume Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-stretch">
          
          {/* Left Column: Resume Information & Actions */}
          <ScrollReveal direction="right" distance={20} duration={0.55} className="lg:col-span-7 flex flex-col">
            <div
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between h-full backdrop-blur-xl ${
                isDark
                  ? 'bg-[#111722]/80 border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] text-[#F8FAFC]'
                  : 'bg-white/85 border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-black text-xl sm:text-2xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {displayName} - Resume
                    </h3>
                    <p className={`text-xs font-mono ${isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'}`}>
                      {primaryTitle} &bull; ATS-Optimized Edition
                    </p>
                  </div>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
                }`}>
                  Structured for technical recruiters, engineering directors, and automated ATS screening engines. Details 5+ years of production experience scaling Next.js, React, Node.js, and cloud backend microservices.
                </p>

                {/* Key Resume Highlights */}
                <div className="space-y-3 mb-6">
                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-slate-50 border-slate-200/80'
                  }`}>
                    <Briefcase className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Experience: 5+ Years Delivering Enterprise Web Products
                      </h4>
                      <p className={`text-[11px] leading-relaxed mt-0.5 ${isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}`}>
                        Shipped 50+ modern client applications, high-concurrency microservices, and design systems.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-slate-50 border-slate-200/80'
                  }`}>
                    <GraduationCap className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Education: Bachelor of Science in Computer Science &amp; Engineering
                      </h4>
                      <p className={`text-[11px] leading-relaxed mt-0.5 ${isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}`}>
                        Focus on Distributed Algorithms, Database Systems, and Object-Oriented Architecture.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-slate-50 border-slate-200/80'
                  }`}>
                    <ShieldCheck className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                    <div>
                      <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Industry Certifications: Google, IBM, Meta, HubSpot Verified
                      </h4>
                      <p className={`text-[11px] leading-relaxed mt-0.5 ${isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}`}>
                        Continuous professional accreditation in cloud computing, modern frontend, and security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3.5">
                  <button
                    type="button"
                    onClick={handleDirectDownload}
                    id="resume-download-primary-btn"
                    className="min-h-[42px] px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black hover:opacity-95 active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenResumeDownload}
                    id="resume-customize-export-btn"
                    className={`min-h-[42px] px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <Eye className="w-4 h-4 text-[#22D3EE]" />
                    <span>Customize &amp; Print</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span>Resume content managed through Super Admin codebase</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Resume Preview Card */}
          <ScrollReveal direction="left" distance={20} duration={0.55} delay={0.1} className="lg:col-span-5 flex flex-col items-center justify-center">
            <div 
              onClick={onOpenResumeDownload}
              className={`w-full max-w-md p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.01] relative group backdrop-blur-xl ${
                isDark
                  ? 'bg-[#111722]/80 border-white/10 hover:border-[#22D3EE]/40 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]'
                  : 'bg-white/90 border-slate-200 hover:border-[#0891B2]/40 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)]'
              }`}
            >
              {/* Header Simulation */}
              <div className="flex items-start justify-between border-b border-white/[0.08] pb-3.5 mb-3.5">
                <div>
                  <h4 className={`text-base font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {displayName}
                  </h4>
                  <p className={`text-[10px] font-mono ${isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'}`}>
                    {primaryTitle}
                  </p>
                </div>
                <div className="px-2 py-0.5 rounded-md text-[9px] font-mono font-semibold bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                  PDF A4
                </div>
              </div>

              {/* Body snippet simulation */}
              <div className="space-y-3 text-[11px] leading-relaxed mb-5">
                <div>
                  <div className={`font-semibold uppercase tracking-wider text-[9px] mb-1 ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Executive Profile
                  </div>
                  <p className={isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}>
                    Full-Stack Engineer with specialization in Next.js 15, TypeScript, Node.js, and cloud systems...
                  </p>
                </div>

                <div>
                  <div className={`font-semibold uppercase tracking-wider text-[9px] mb-1 ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Core Technologies
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL'].map((t) => (
                      <span key={t} className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                        isDark ? 'bg-white/[0.04] text-slate-300 border border-white/5' : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className={`font-semibold uppercase tracking-wider text-[9px] mb-1 ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Recent Experience
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between font-semibold text-[10px]">
                      <span>Senior Full-Stack Engineer</span>
                      <span className="font-mono text-slate-400 text-[9px]">2023 - Present</span>
                    </div>
                    <p className={`text-[10px] mt-0.5 ${isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}`}>
                      Architected enterprise AI web platforms and reduced latency by 48%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full py-2.5 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2 bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25 group-hover:bg-[#22D3EE] group-hover:text-black transition-colors">
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
