import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { SafeImage } from '../common/SafeImage';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Target,
  GraduationCap,
  Briefcase,
  MapPin,
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
    <section id="about" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono mb-3 border ${
            isDark
              ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
              : 'bg-slate-100 text-[#0891B2] border-slate-200'
          }`}>
            <span>Background &amp; Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
            About{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#22D3EE] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#0891B2] to-[#7C3AED]'
            }`}>
              Me &amp; Philosophy
            </span>
          </h2>
          <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}`}>
            Passionate full-stack software engineer dedicated to building high-performance web systems and intuitive digital products.
          </p>
        </div>

        {/* Member Profile Card + 4 Structured About Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-12 sm:mb-14">
          
          {/* Member Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-4 p-6 sm:p-7 rounded-2xl border flex flex-col justify-between relative backdrop-blur-xl ${
              isDark
                ? 'bg-[#111722]/80 border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] text-[#F8FAFC]'
                : 'bg-white/85 border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] text-slate-800'
            }`}
          >
            <div>
              {/* Member Profile Image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-5 border p-1 border-white/10">
                <SafeImage
                  src={profileImg}
                  alt={displayName}
                  fallbackType="profile"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>

              {/* Member Title & Role */}
              <div className="mb-1.5">
                <span className={`text-xs font-mono font-semibold uppercase tracking-wider block ${
                  isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
                }`}>
                  Executive Profile
                </span>
              </div>

              <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {displayName}
              </h3>
              <p className={`text-xs sm:text-sm font-semibold mb-3 ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
              }`}>
                {primaryTitle}
              </p>

              <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
              }`}>
                {profile?.bio || portfolioConfig.personal.bio}
              </p>

              <div className="space-y-2 pt-3.5 border-t border-white/[0.08] text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span className={isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                  <span className={isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}>Available for Senior Engineering Roles</span>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isDark ? 'border-white/[0.08]' : 'border-slate-200'
            }`}>
              <span className={isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}>
                Experience: 5+ Years
              </span>
              <span className={isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'}>
                Full-Stack Architecture
              </span>
            </div>
          </motion.div>

          {/* Right: 4 Dedicated Structured Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* 1. Personal Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-200 ${
                isDark
                  ? 'bg-[#111722]/70 border-white/[0.08] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Personal Introduction
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}`}>
                I am a passionate software craftsman based in {location}, dedicated to transforming complex challenges into elegant, intuitive, and performant web applications. I bridge the gap between creative visual design and scalable systems engineering.
              </p>
            </motion.div>

            {/* 2. Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-200 ${
                isDark
                  ? 'bg-[#111722]/70 border-white/[0.08] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/25">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Professional Summary
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}`}>
                With 5+ years of software delivery experience, I specialize in full-stack JavaScript/TypeScript environments (Next.js, React, Node.js, Express, PostgreSQL, Supabase). Shipped over 50+ enterprise SaaS platforms, client portals, and microservice APIs with 99.9% uptime.
              </p>
            </motion.div>

            {/* 3. Career Goals */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-200 ${
                isDark
                  ? 'bg-[#111722]/70 border-white/[0.08] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Career Goals
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}`}>
                To drive world-class digital engineering initiatives as a Principal Full-Stack Architect, contributing to high-impact products, mentoring emerging engineers, and architecting cutting-edge AI-assisted SaaS ecosystems.
              </p>
            </motion.div>

            {/* 4. Short Background */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-200 ${
                isDark
                  ? 'bg-[#111722]/70 border-white/[0.08] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]'
                  : 'bg-white/80 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/25">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h4 className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Short Background
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}`}>
                Graduated with a degree in Computer Science and Engineering. Early career focused on algorithmic problem solving and low-latency API design, progressing to senior full-stack development and modern design systems across international teams.
              </p>
            </motion.div>

          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-200 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#111722]/65 border-white/[0.08] hover:border-[#22D3EE]/35 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] text-[#F8FAFC]'
                    : 'bg-white/80 border-slate-200 hover:border-[#0891B2]/40 shadow-xs text-slate-800'
                }`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {p.title}
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A1AAB8]' : 'text-slate-600'}`}>
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
