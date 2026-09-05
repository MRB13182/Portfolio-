import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { SafeImage } from '../common/SafeImage';
import { 
  ArrowRight, 
  Mail, 
  Sparkles, 
  Code2, 
  Zap, 
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResumeDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenResumeDownload }) => {
  const { isDark } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = portfolioConfig.personal.titles;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="relative min-h-[90vh] pt-24 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border transition-all backdrop-blur-2xl ${
                isDark
                  ? 'bg-[rgba(10,10,10,0.7)] text-[#FFFFFF] border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
                  : 'bg-emerald-500/10 text-slate-800 border-[rgba(18,214,160,0.3)] shadow-[0_2px_14px_rgba(18,214,160,0.18)]'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-[#F5D06F]' : 'bg-[#12D6A0]'
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isDark ? 'bg-[#D4AF37]' : 'bg-[#0EB385]'
                }`} />
              </span>
              <span>{portfolioConfig.personal.availabilityStatus}</span>
            </motion.div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              <span className={`block text-lg sm:text-xl font-mono font-medium tracking-normal mb-2 ${
                isDark ? 'text-[#A1A1AA]' : 'text-slate-500'
              }`}>
                Hello, World! I am
              </span>
              <span className={`block font-black tracking-tight ${
                isDark ? 'text-[#FFFFFF] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]' : 'text-slate-900'
              }`}>
                {portfolioConfig.personal.name}
              </span>
            </h1>

            {/* Dynamic Animated Role Switcher */}
            <div className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden">
              <span className={`font-mono text-sm sm:text-base mr-3 font-semibold ${
                isDark ? 'text-[#FFFFFF]/80' : 'text-slate-600'
              }`}>
                const role =
              </span>
              <div className="relative h-full flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`text-lg sm:text-2xl font-bold tracking-tight px-4 py-1.5 rounded-2xl backdrop-blur-2xl text-transparent bg-clip-text ${
                      isDark
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5D06F] to-[#9D4EDD] bg-[rgba(10,10,10,0.7)] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(123,44,255,0.25)]'
                        : 'bg-gradient-to-r from-[#0EB385] via-[#12D6A0] to-[#8EF0D1] bg-white/90 border border-[rgba(18,214,160,0.3)] shadow-[0_4px_16px_rgba(18,214,160,0.18)]'
                    }`}
                  >
                    "{roles[roleIndex]}"
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bio Description */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-8 font-normal ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
            }`}>
              {portfolioConfig.personal.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to="/projects"
                id="hero-explore-projects-btn"
                className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer group active:scale-95 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5D06F] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                    : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385] text-white hover:shadow-[0_4px_25px_rgba(18,214,160,0.4)]'
                }`}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={onOpenContact}
                id="hero-contact-me-btn"
                className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 border cursor-pointer backdrop-blur-2xl active:scale-95 ${
                  isDark
                    ? 'bg-[rgba(10,10,10,0.7)] hover:bg-[rgba(17,17,17,0.9)] text-[#FFFFFF] border-[#D4AF37]/35 hover:border-[#D4AF37]'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] shadow-sm'
                }`}
              >
                <Mail className={`w-4 h-4 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                <span>Get In Touch</span>
              </button>

              <button
                onClick={onOpenResumeDownload}
                id="hero-download-cv-btn"
                className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 border cursor-pointer backdrop-blur-2xl ${
                  isDark
                    ? 'bg-[rgba(10,10,10,0.7)] text-[#FFFFFF] hover:text-[#F5D06F] border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37]'
                    : 'bg-white/90 text-slate-700 hover:text-[#12D6A0] border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] shadow-sm'
                }`}
              >
                <FileText className={`w-4 h-4 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                <span>Download CV</span>
              </button>
            </div>

            {/* Quick Tech Highlights Badge Row */}
            <div className={`mt-10 pt-6 border-t w-full flex flex-wrap items-center gap-6 text-xs font-medium ${
              isDark ? 'border-[rgba(212,175,55,0.25)] text-[#FFFFFF]' : 'border-slate-200 text-slate-600'
            }`}>
              <span className={`font-mono uppercase tracking-wider text-[11px] font-bold ${
                isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'
              }`}>
                Core Stack:
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#F5D06F]' : 'bg-[#12D6A0]'}`} /> Next.js 15
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#9D4EDD]' : 'bg-[#8EF0D1]'}`} /> TypeScript
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#D4AF37]' : 'bg-[#12D6A0]'}`} /> Tailwind CSS
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#7B2CFF]' : 'bg-[#0EB385]'}`} /> UI/UX Architecture
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Luxury Profile Container with Orbital Rings & Cyber Halo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Outer Luxury Animated Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-0 rounded-full border border-dashed transition-colors ${
                  isDark ? 'border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border-[rgba(18,214,160,0.3)] shadow-[0_0_25px_rgba(18,214,160,0.15)]'
                }`}
              />

              {/* Inner Pulsing Gradient Ring (Cyber Halo Neon) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-6 rounded-full border border-dotted transition-colors ${
                  isDark ? 'border-[#7B2CFF]/50 shadow-[0_0_25px_rgba(123,44,255,0.3)]' : 'border-[#8EF0D1]/50 shadow-[0_0_20px_rgba(142,240,209,0.25)]'
                }`}
              />

              {/* Glowing Background Radial */}
              <div className={`absolute inset-10 rounded-full blur-3xl transition-colors ${
                isDark 
                  ? 'opacity-45 bg-gradient-to-tr from-[#7B2CFF] via-[#9D4EDD] to-[#D4AF37]' 
                  : 'opacity-35 bg-gradient-to-tr from-[#12D6A0] via-[#8EF0D1] to-[#E6FAF4]'
              }`} />

              {/* Main Profile Card / Image Wrapper */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`relative z-10 w-[260px] sm:w-[310px] h-[320px] sm:h-[370px] rounded-[32px] p-3 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-2xl ${
                  isDark
                    ? 'bg-[rgba(10,10,10,0.85)] border border-[#D4AF37]/35 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(123,44,255,0.25)]'
                    : 'bg-white/95 border border-[rgba(18,214,160,0.3)] shadow-[0_20px_45px_rgba(18,214,160,0.18),0_4px_16px_rgba(0,0,0,0.04)]'
                }`}
              >
                <SafeImage
                  src={portfolioConfig.assets.profileImage}
                  alt={portfolioConfig.personal.name}
                  fallbackType="profile"
                  className="w-full h-full rounded-[24px] object-cover"
                />

                {/* Top Corner Badge */}
                <div className={`absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
                  isDark 
                    ? 'bg-black/75 text-[#F5D06F] border border-[#D4AF37]/35 shadow-[0_0_12px_rgba(212,175,55,0.2)]' 
                    : 'bg-white/90 text-[#0EB385] border border-[rgba(18,214,160,0.35)] shadow-sm'
                }`}>
                  <Sparkles className={`w-3 h-3 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                  <span>Pro Architect</span>
                </div>
              </motion.div>

              {/* Floating Badge 1: 5+ Years Experience (Top Right) */}
              <motion.div
                animate={{ y: [-4, 6, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-3 right-0 sm:-right-4 z-20 px-4 py-2.5 rounded-[24px] backdrop-blur-2xl border shadow-xl flex items-center gap-3 ${
                  isDark
                    ? 'bg-[rgba(10,10,10,0.9)] border-[#D4AF37]/35 text-[#FFFFFF] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(123,44,255,0.15)]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] text-slate-900 shadow-[0_10px_25px_rgba(18,214,160,0.15)]'
                }`}
              >
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                  isDark ? 'bg-[#7B2CFF]/25 text-[#F5D06F]' : 'bg-emerald-50 text-[#12D6A0]'
                }`}>
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-black tracking-tight ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>
                    5+ Years
                  </div>
                  <div className={`text-[10px] font-medium ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                    Experience
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 2: 50+ Projects Shipped (Bottom Left) */}
              <motion.div
                animate={{ y: [6, -5, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`absolute -bottom-4 left-0 sm:-left-6 z-20 px-4 py-2.5 rounded-[24px] backdrop-blur-2xl border shadow-xl flex items-center gap-3 ${
                  isDark
                    ? 'bg-[rgba(10,10,10,0.9)] border-[#D4AF37]/35 text-[#FFFFFF] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] text-slate-900 shadow-[0_10px_25px_rgba(18,214,160,0.15)]'
                }`}
              >
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                  isDark ? 'bg-[#D4AF37]/20 text-[#F5D06F]' : 'bg-emerald-50 text-[#12D6A0]'
                }`}>
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-black tracking-tight ${isDark ? 'text-[#FFFFFF]' : 'text-slate-900'}`}>
                    50+ Projects
                  </div>
                  <div className={`text-[10px] font-medium ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                    Delivered Globally
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
