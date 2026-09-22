import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { SafeImage } from '../common/SafeImage';
import { AdminTrigger } from '../common/AdminTrigger';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Target,
  GraduationCap,
  Briefcase,
  Compass,
  MapPin,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { isDark } = useTheme();
  const { profile } = usePortfolioData();

  const displayName = profile?.name || portfolioConfig.personal.name;
  const primaryTitle = (profile?.titles && profile.titles[0]) || portfolioConfig.personal.titles[0];
  const profileImg = profile?.profile_image || portfolioConfig.assets.profileImage;
  const location = profile?.location || portfolioConfig.personal.location;

  const principles = [
    {
      icon: Cpu,
      title: 'High-Performance Architecture',
      description: 'Engineering resilient, scalable full-stack applications with optimal latency, edge caching, and serverless compute.'
    },
    {
      icon: Layers,
      title: 'Modern Glass UI/UX Precision',
      description: 'Crafting intuitive, accessible interfaces with blurred glass layers, smooth micro-interactions, and pixel perfection.'
    },
    {
      icon: ShieldCheck,
      title: 'Type-Safe & Maintainable Code',
      description: 'Writing maintainable enterprise TypeScript, clean design patterns, and robust database architectures.'
    }
  ];

  return (
    <section id="about" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark
              ? 'bg-[#8B5CF6]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
              : 'bg-cyan-500/10 text-[#0097A7] border border-[#00E5FF]/30 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Background &amp; Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            About{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#00E5FF] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#00E5FF] to-[#8B5CF6]'
            }`}>
              Me &amp; Philosophy
            </span>
          </h2>
          <p className={`max-w-2xl text-base sm:text-lg ${isDark ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
            Passionate full-stack software engineer dedicated to building high-performance web systems and intuitive digital products.
          </p>
        </div>

        {/* Member / Profile Card + 4 Structured About Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Member / Profile Card with Tastefully Integrated Minimal Admin Icon */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-4 p-6 sm:p-8 rounded-[32px] backdrop-blur-2xl border flex flex-col justify-between relative shadow-xl ${
              isDark
                ? 'bg-[#121217]/75 border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-[#F8FAFC]'
                : 'bg-white/85 border-white/60 shadow-[0_12px_35px_rgba(0,229,255,0.08)] text-slate-800'
            }`}
          >
            {/* Tastefully Integrated Minimal Admin Icon (Displayed ONLY here once) */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <span className={`text-[10px] font-mono tracking-widest uppercase opacity-40 ${
                isDark ? 'text-[#94A3B8]' : 'text-slate-400'
              }`}>
                SEC
              </span>
              <AdminTrigger />
            </div>

            <div>
              {/* Member Profile Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden mb-6 border p-1"
                style={{
                  borderColor: isDark ? 'rgba(0,229,255,0.3)' : 'rgba(0,229,255,0.4)',
                  boxShadow: isDark ? '0 0 20px rgba(0,229,255,0.2)' : '0 4px 15px rgba(0,229,255,0.15)'
                }}
              >
                <SafeImage
                  src={profileImg}
                  alt={displayName}
                  fallbackType="profile"
                  className="w-full h-full rounded-[20px] object-cover"
                />
              </div>

              {/* Member Title & Role */}
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
                }`}>
                  Official Member Profile
                </span>
              </div>

              <h3 className={`text-2xl font-black tracking-tight mb-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {displayName}
              </h3>
              <p className={`text-sm font-semibold mb-4 ${
                isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
              }`}>
                {primaryTitle}
              </p>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isDark ? 'text-[#94A3B8]' : 'text-slate-600'
              }`}>
                {profile?.bio || portfolioConfig.personal.bio}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                  <span className={isDark ? 'text-[#94A3B8]' : 'text-slate-600'}>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                  <span className={isDark ? 'text-[#94A3B8]' : 'text-slate-600'}>Status: Available &amp; Verified</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-5 border-t flex items-center justify-between ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <span className={`text-[11px] font-mono ${isDark ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
                Portfolio ID: #MR-2026
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                PRO ARCHITECT
              </span>
            </div>
          </motion.div>

          {/* Right: 4 Dedicated Structured Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Personal Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-6 sm:p-7 rounded-[28px] backdrop-blur-2xl border transition-all duration-300 ${
                isDark
                  ? 'bg-[#121217]/70 border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-white/60 shadow-[0_8px_25px_rgba(0,229,255,0.06)]'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Personal Introduction
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
                I am a passionate software craftsman based in {location}, dedicated to transforming complex challenges into elegant, intuitive, and performant web applications. I bridge the gap between creative visual design and scalable systems engineering.
              </p>
            </motion.div>

            {/* 2. Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-6 sm:p-7 rounded-[28px] backdrop-blur-2xl border transition-all duration-300 ${
                isDark
                  ? 'bg-[#121217]/70 border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-white/60 shadow-[0_8px_25px_rgba(0,229,255,0.06)]'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Professional Summary
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
                With 5+ years of software delivery experience, I specialize in full-stack JavaScript/TypeScript environments (Next.js, React, Node.js, Express, PostgreSQL, Supabase). Shipped over 50+ enterprise SaaS platforms, client portals, and microservice APIs with 99.9% uptime.
              </p>
            </motion.div>

            {/* 3. Career Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`p-6 sm:p-7 rounded-[28px] backdrop-blur-2xl border transition-all duration-300 ${
                isDark
                  ? 'bg-[#121217]/70 border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-white/60 shadow-[0_8px_25px_rgba(0,229,255,0.06)]'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Career Goals
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
                To drive world-class digital engineering initiatives as a Principal Full-Stack Architect, contributing to high-impact products, mentoring emerging engineers, and architecting cutting-edge AI-assisted SaaS ecosystems.
              </p>
            </motion.div>

            {/* 4. Short Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`p-6 sm:p-7 rounded-[28px] backdrop-blur-2xl border transition-all duration-300 ${
                isDark
                  ? 'bg-[#121217]/70 border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-white/60 shadow-[0_8px_25px_rgba(0,229,255,0.06)]'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Short Background
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
                Graduated with a degree in Computer Science and Engineering. Early career focused on algorithmic problem solving and low-latency API design, progressing to senior full-stack development and modern design systems across international teams.
              </p>
            </motion.div>

          </div>
        </div>

        {/* 3 Core Pillars */}
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
                className={`p-7 rounded-[30px] backdrop-blur-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#121217]/60 border-white/10 hover:border-[#00E5FF]/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] text-[#F8FAFC]'
                    : 'bg-white/75 border-white/60 hover:border-[#00E5FF] hover:shadow-[0_8px_25px_rgba(0,229,255,0.1)] text-slate-800'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className={`font-bold text-base sm:text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {p.title}
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-slate-600'}`}>
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
