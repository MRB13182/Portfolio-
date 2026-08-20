import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Flame, 
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
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark 
              ? 'bg-[#6D28D9]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
              : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Philosophy &amp; Background</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Architecting Tomorrow's <br className="hidden sm:inline" />
            <span className={`text-transparent bg-clip-text ${
              isDark 
                ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
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
            className={`lg:col-span-7 p-8 sm:p-10 rounded-3xl backdrop-blur-xl border flex flex-col justify-between ${
              isDark
                ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] shadow-[0_15px_40px_rgba(0,0,0,0.9)]'
                : 'bg-white/80 border-[#00C896]/20 shadow-[0_15px_40px_rgba(0,200,150,0.08)]'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-[#6D28D9]/20 text-[#D4AF37] border border-[#6D28D9]/30' : 'bg-emerald-100 text-[#00A57A]'
                }`}>
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-white">About MD. Moshiur Rahman</h3>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA]">Full Stack Engineer &amp; Product Designer</p>
                </div>
              </div>

              <p className="text-slate-700 dark:text-[#A1A1AA] leading-relaxed text-base sm:text-lg mb-6">
                {portfolioConfig.personal.extendedBio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200/60 dark:border-zinc-800">
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#D4AF37] shrink-0" />
                  <span>Next.js 15 &amp; React 19 Pioneer</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#D4AF37] shrink-0" />
                  <span>Strict TypeScript &amp; Zod Schema</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#D4AF37] shrink-0" />
                  <span>Micro-Frontend &amp; Serverless APIs</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-[#D4AF37] shrink-0" />
                  <span>Design Systems in Figma &amp; Tailwind</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#A1A1AA]">
                <Globe2 className="w-4 h-4 text-[#00A57A] dark:text-[#D4AF37]" />
                <span>{portfolioConfig.personal.location}</span>
              </div>
              <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full ${
                isDark ? 'bg-[#0B0B0F] border border-[#D4AF37]/30 text-[#FFD700]' : 'bg-slate-100 text-[#00A57A]'
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
                className={`p-6 rounded-3xl backdrop-blur-xl border flex flex-col justify-between transition-all duration-300 ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_25px_rgba(109,40,217,0.25)]'
                    : 'bg-white/80 border-[#00C896]/20 hover:border-[#00C896]/50 shadow-[0_10px_30px_rgba(0,200,150,0.06)]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#A1A1AA]">
                    Metric
                  </span>
                  <TrendingUp className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
                </div>

                <div>
                  <div className={`text-4xl sm:text-5xl font-black tracking-tight mb-1 font-mono ${
                    isDark
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-[#00C896] to-[#00A57A]'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="font-bold text-sm text-slate-800 dark:text-white">
                    {stat.label}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-[#A1A1AA] mt-1 leading-snug">
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
                className={`p-7 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:shadow-xl ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(109,40,217,0.25)] text-white'
                    : 'bg-white/70 border-slate-200/80 hover:border-[#00C896]/40 text-slate-900'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                  isDark 
                    ? 'bg-[#6D28D9]/20 text-[#D4AF37] border border-[#6D28D9]/30 shadow-[0_0_15px_rgba(109,40,217,0.2)]' 
                    : 'bg-emerald-50 text-[#00A57A] border border-emerald-200 shadow-sm'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{p.title}</h4>
                <p className="text-sm text-slate-600 dark:text-[#A1A1AA] leading-relaxed">
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
