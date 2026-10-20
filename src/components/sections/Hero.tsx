import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { SafeImage } from '../common/SafeImage';
import { ScrollReveal } from '../common/ScrollReveal';
import { 
  ArrowRight, 
  Mail, 
  Sparkles,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CINEMATIC_EASE = [0.21, 0.47, 0.32, 0.98];

export const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const { profile, skills } = usePortfolioData();
  const [roleIndex, setRoleIndex] = useState(0);

  const displayName = profile?.name || portfolioConfig.personal.name;
  const roles = (profile?.titles && profile.titles.length > 0) 
    ? profile.titles 
    : portfolioConfig.personal.titles;
  const bioText = profile?.bio || portfolioConfig.personal.bio;
  const profileImg = profile?.profile_image || portfolioConfig.assets.profileImage;
  const availability = profile?.availability_status || portfolioConfig.personal.availabilityStatus;

  // Curate 2–4 top featured skills
  const featuredSkills = (skills && skills.length >= 4)
    ? skills.slice(0, 4)
    : [
        { name: 'Full-Stack Architecture', level: 96 },
        { name: 'Next.js & React', level: 95 },
        { name: 'TypeScript & Node.js', level: 92 },
        { name: 'Cloud & System Design', level: 90 },
      ];

  useEffect(() => {
    if (roles.length <= 1) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="relative min-h-[85vh] pt-24 sm:pt-28 pb-14 sm:pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Indicator (Subtle Clean Surface, Accessible) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: CINEMATIC_EASE }}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium mb-6 border transition-all ${
                isDark
                  ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
                  : 'bg-slate-100/90 text-[#0891B2] border-slate-200'
              }`}
            >
              <span className="tracking-wide text-xs font-mono">{availability}</span>
            </motion.div>

            {/* Greeting & Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4 text-balance">
              <span className={`block text-xs sm:text-sm font-mono uppercase tracking-widest mb-2 font-medium ${
                isDark ? 'text-[#A1AAB8]' : 'text-slate-500'
              }`}>
                Hello, I am
              </span>
              <span className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {displayName}
              </span>
            </h1>

            {/* Dynamic Role Switcher (Smooth & Layout-Stable) */}
            <div className="h-10 sm:h-12 flex items-center mb-5 overflow-hidden w-full max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.28, ease: CINEMATIC_EASE }}
                  className={`text-base sm:text-xl font-bold tracking-tight px-3 py-1 rounded-xl border ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10 text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-slate-100 to-[#8B5CF6]'
                      : 'bg-slate-100/80 border-slate-200 text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#7C3AED]'
                  }`}
                >
                  {roles[roleIndex] || 'Full Stack Engineer'}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Biography */}
            <p className={`text-sm sm:text-base max-w-xl leading-relaxed mb-8 font-normal ${
              isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
            }`}>
              {bioText}
            </p>

            {/* Dual CTA Placement (Primary + Secondary) */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              {/* Primary Action: Get In Touch */}
              <Link
                to="/contact"
                id="hero-get-in-touch-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-extrabold hover:opacity-95 shadow-md shadow-cyan-500/10 focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
              >
                <Mail className="w-4 h-4 text-black shrink-0" />
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 text-black shrink-0" />
              </Link>

              {/* Secondary Action: Explore Projects */}
              <Link
                to="/projects"
                id="hero-explore-projects-btn"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                }`}
              >
                <Layers className="w-4 h-4 text-[#22D3EE]" />
                <span>Explore Work</span>
              </Link>
            </div>

            {/* Featured Capabilities Matrix (2–4 Top Competencies) */}
            <ScrollReveal direction="up" distance={15} duration={0.45} delay={0.15} className="w-full">
              <div className="w-full">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                    isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
                  }`}>
                    Core Competencies
                  </span>
                  
                  <Link
                    to="/skills"
                    id="hero-see-more-skills-btn"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-md ${
                      isDark ? 'text-[#22D3EE] hover:text-white' : 'text-[#0891B2] hover:text-slate-900'
                    }`}
                  >
                    <span>Full Skills Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* 2-4 Subtle Surface Skill Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {featuredSkills.slice(0, 4).map((skill: any, idx: number) => {
                    const levelNum = typeof skill.level === 'number' ? skill.level : 90;
                    return (
                      <div
                        key={`${skill.id || skill.name || 'skill'}-${idx}`}
                        className={`p-3 rounded-xl border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 ${
                          isDark
                            ? 'bg-[#111722]/60 border-white/[0.07] hover:border-[#22D3EE]/30'
                            : 'bg-white/70 border-slate-200 hover:border-[#0891B2]/40 shadow-xs'
                        }`}
                      >
                        <div className="mb-1">
                          <span className={`text-xs font-semibold truncate block ${
                            isDark ? 'text-white' : 'text-slate-800'
                          }`}>
                            {skill.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono tabular-nums block ${
                          isDark ? 'text-[#A1AAB8]' : 'text-slate-500'
                        }`}>
                          Proficiency {levelNum}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

          </motion.div>

          {/* Right Column: Profile Image in Refined Primary Glass Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: CINEMATIC_EASE }}
            className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] flex items-center justify-center">
              
              {/* Refined Ambient Rim Light */}
              <div 
                aria-hidden="true"
                className="absolute inset-3 rounded-2xl blur-xl opacity-25 bg-gradient-to-tr from-[#22D3EE] via-[#8B5CF6] to-transparent pointer-events-none" 
              />

              {/* Primary Glass Profile Card */}
              <div 
                className={`relative z-10 w-full h-full rounded-2xl p-2.5 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                  isDark
                    ? 'bg-[#111722]/80 border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)]'
                    : 'bg-white/85 border border-slate-200/90 shadow-[0_16px_35px_-10px_rgba(15,23,42,0.08)]'
                }`}
              >
                <SafeImage
                  src={profileImg}
                  alt={displayName}
                  fallbackType="profile"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
