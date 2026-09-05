import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal,
  Globe2,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { isDark } = useTheme();

  const principles = [
    {
      icon: Cpu,
      title: 'High-Performance Architecture',
      description: 'Engineering resilient, scalable Next.js and Node.js solutions with optimal latency, edge caching, and serverless compute.'
    },
    {
      icon: Layers,
      title: 'Apple-Grade UI/UX Precision',
      description: 'Designing intuitive, accessible design systems with 60fps micro-interactions, responsive fluidity, and pixel perfection.'
    },
    {
      icon: ShieldCheck,
      title: 'Type-Safe & Clean Code',
      description: 'Writing maintainable enterprise TypeScript with rigorous test coverage, clean design patterns, and zero compromise on stability.'
    }
  ];

  return (
    <section id="about" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark
              ? 'bg-[#7B2CFF]/20 text-[#F5D06F] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
              : 'bg-emerald-500/10 text-[#12D6A0] border border-[rgba(18,214,160,0.3)] shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Philosophy &amp; Background</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Architecting Tomorrow's <br className="hidden sm:inline" />
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#F5D06F] to-[#D4AF37]'
                : 'bg-gradient-to-r from-slate-900 via-[#12D6A0] to-[#8EF0D1]'
            }`}>
              Digital Masterpieces
            </span>
          </h2>
        </div>

        {/* Top Grid: Bio Card & Stats Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Main Story & Experience Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 p-8 sm:p-10 rounded-[32px] backdrop-blur-2xl border flex flex-col justify-between ${
              isDark
                ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.25)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#FFFFFF]'
                : 'bg-white/95 border-[rgba(18,214,160,0.25)] shadow-[0_16px_35px_rgba(18,214,160,0.08),0_4px_12px_rgba(0,0,0,0.03)] text-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                  isDark
                    ? 'bg-[#7B2CFF]/20 text-[#F5D06F] border-[#7B2CFF]/30'
                    : 'bg-emerald-50 text-[#12D6A0] border-[rgba(18,214,160,0.3)]'
                }`}>
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg leading-tight ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>
                    About MD. Moshiur Rahman
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                    Full Stack Engineer &amp; Product Designer
                  </p>
                </div>
              </div>

              <p className={`leading-relaxed text-base sm:text-lg mb-6 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-600'}`}>
                {portfolioConfig.personal.extendedBio}
              </p>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t ${
                isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
              }`}>
                <div className={`flex items-center gap-2.5 text-sm font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-700'}`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                  <span>Next.js 15 &amp; React 19 Pioneer</span>
                </div>
                <div className={`flex items-center gap-2.5 text-sm font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-700'}`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                  <span>Strict TypeScript &amp; Zod Schema</span>
                </div>
                <div className={`flex items-center gap-2.5 text-sm font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-700'}`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                  <span>Micro-Frontend &amp; Serverless APIs</span>
                </div>
                <div className={`flex items-center gap-2.5 text-sm font-medium ${isDark ? 'text-[#FFFFFF]' : 'text-slate-700'}`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                  <span>Design Systems in Figma &amp; Tailwind</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t flex items-center justify-between ${
              isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                <Globe2 className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
                <span>{portfolioConfig.personal.location}</span>
              </div>
              <span className={`text-xs font-bold font-mono px-3.5 py-1 rounded-full border ${
                isDark 
                  ? 'bg-[#0A0A0A] border-[#D4AF37]/35 text-[#F5D06F]' 
                  : 'bg-emerald-50 border-[rgba(18,214,160,0.35)] text-[#0EB385]'
              }`}>
                READY FOR HIRE
              </span>
            </div>
          </motion.div>

          {/* Right Side: Animated Statistics Matrix */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {portfolioConfig.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-[28px] backdrop-blur-2xl border flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_25px_rgba(123,44,255,0.25)]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] hover:shadow-[0_8px_25px_rgba(18,214,160,0.15)] shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
                  }`}>
                    Metric
                  </span>
                  <TrendingUp className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
                </div>

                <div>
                  <div className={`text-4xl sm:text-5xl font-black tracking-tight mb-1 font-mono text-transparent bg-clip-text ${
                    isDark
                      ? 'bg-gradient-to-r from-[#F5D06F] to-[#D4AF37]'
                      : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385]'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`font-bold text-sm ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>
                    {stat.label}
                  </div>
                  <p className={`text-[11px] mt-1 leading-snug ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Feature Cards: 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`p-7 rounded-[32px] backdrop-blur-2xl border transition-all duration-300 hover:shadow-xl ${
                  isDark
                    ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(123,44,255,0.25)] text-[#FFFFFF]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] hover:shadow-[0_8px_30px_rgba(18,214,160,0.12)] text-slate-800 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${
                  isDark
                    ? 'bg-[#7B2CFF]/20 text-[#F5D06F] border-[#7B2CFF]/30 shadow-[0_0_15px_rgba(123,44,255,0.2)]'
                    : 'bg-emerald-50 text-[#12D6A0] border-[rgba(18,214,160,0.3)] shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>
                  {p.title}
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-slate-600'}`}>
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
