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
  Code,
  Layers,
  Cpu,
  Database
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
        { name: 'Cloud & Database', level: 90 },
      ];

  useEffect(() => {
    if (roles.length <= 1) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="relative min-h-[82vh] pt-24 pb-12 flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: CINEMATIC_EASE }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.45, ease: CINEMATIC_EASE }}
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border transition-all backdrop-blur-2xl ${
                isDark
                  ? 'bg-[#121217]/70 text-white border-white/10 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                  : 'bg-white/80 text-slate-800 border-slate-200/80 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]" />
              </span>
              <span className="tracking-wide text-xs">{availability}</span>
            </motion.div>

            {/* Greeting & Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-3">
              <span className={`block text-sm sm:text-base font-mono font-medium tracking-normal mb-1.5 ${
                isDark ? 'text-[#94A3B8]' : 'text-slate-500'
              }`}>
                Hello, I am
              </span>
              <span className={`block ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {displayName}
              </span>
            </h1>

            {/* Dynamic Title Switcher */}
            <div className="h-9 sm:h-11 flex items-center mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
                  className={`text-base sm:text-xl font-bold tracking-tight px-3.5 py-1 rounded-2xl backdrop-blur-2xl border ${
                    isDark
                      ? 'bg-[#121217]/80 border-white/10 text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#8B5CF6] shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-white/85 border-slate-200 text-transparent bg-clip-text bg-gradient-to-r from-[#0097A7] via-[#00E5FF] to-[#7C3AED] shadow-sm'
                  }`}
                >
                  {roles[roleIndex] || 'Full Stack Engineer'}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Short Introduction */}
            <p className={`text-sm sm:text-base max-w-xl leading-relaxed mb-6 font-normal ${
              isDark ? 'text-[#94A3B8]' : 'text-slate-600'
            }`}>
              {bioText}
            </p>

            {/* Main CTA Section - Moved slightly upward with ONLY "Get In Touch" button */}
            <div className="mb-8 w-full sm:w-auto">
              <Link
                to="/contact"
                id="hero-get-in-touch-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-300 shadow-lg cursor-pointer active:scale-95 bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:opacity-95 hover:shadow-[0_0_35px_rgba(0,229,255,0.5)]"
              >
                <Mail className="w-4 h-4 text-black shrink-0" />
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 text-black shrink-0 ml-1" />
              </Link>
            </div>

            {/* Featured Skills (2–4 only) & See More Skills Button */}
            <ScrollReveal direction="up" distance={15} duration={0.5} delay={0.2} className="w-full">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
                  }`}>
                    Featured Capabilities
                  </span>
                  
                  {/* See More Skills Button */}
                  <Link
                    to="/skills"
                    id="hero-see-more-skills-btn"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer group ${
                      isDark ? 'text-[#00E5FF] hover:text-white' : 'text-[#0097A7] hover:text-slate-900'
                    }`}
                  >
                    <span>See More Skills</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* 2-4 Glass Featured Skill Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {featuredSkills.slice(0, 4).map((skill: any, idx: number) => {
                    const levelNum = typeof skill.level === 'number' ? skill.level : 90;
                    return (
                      <div
                        key={skill.name || idx}
                        className={`p-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${
                          isDark
                            ? 'bg-[#121217]/60 border-white/10 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                            : 'bg-white/70 border-slate-200/80 hover:border-[#00E5FF] hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-[#00E5FF] shrink-0" />
                          <span className={`text-xs font-bold truncate ${
                            isDark ? 'text-white' : 'text-slate-800'
                          }`}>
                            {skill.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono block ${
                          isDark ? 'text-[#94A3B8]' : 'text-slate-500'
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

          {/* Right Column: Profile Image in Modern Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: CINEMATIC_EASE }}
            className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] flex items-center justify-center">
              
              {/* Outer Cyan & Violet Ambient Halo */}
              <div className="absolute inset-4 rounded-3xl blur-2xl opacity-40 bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-transparent pointer-events-none" />

              {/* Glassmorphism Profile Card */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className={`relative z-10 w-full h-full rounded-[28px] p-3 backdrop-blur-2xl transition-all duration-300 overflow-hidden shadow-2xl ${
                  isDark
                    ? 'bg-[#121217]/75 border border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.15)]'
                    : 'bg-white/85 border border-white/60 shadow-[0_20px_45px_rgba(0,229,255,0.15),0_4px_16px_rgba(0,0,0,0.04)]'
                }`}
              >
                <SafeImage
                  src={profileImg}
                  alt={displayName}
                  fallbackType="profile"
                  className="w-full h-full rounded-[22px] object-cover"
                />

                {/* Subtle verified pill badge */}
                <div className={`absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
                  isDark 
                    ? 'bg-[#0A0A0A]/85 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.25)]' 
                    : 'bg-white/90 text-[#0097A7] border border-slate-200 shadow-sm'
                }`}>
                  <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                  <span>Verified Architect</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
