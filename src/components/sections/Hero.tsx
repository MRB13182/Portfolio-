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
                  ? 'bg-[rgba(12,12,16,0.45)] text-[#F8FAFC] border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'bg-emerald-500/10 text-slate-800 border-emerald-500/25 shadow-[0_2px_12px_rgba(0,200,150,0.15)]'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-[#FFD700]' : 'bg-[#00C896]'
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isDark ? 'bg-[#D4AF37]' : 'bg-[#00A57A]'
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
                isDark ? 'text-[#F8FAFC] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]' : 'text-slate-900'
              }`}>
                {portfolioConfig.personal.name}
              </span>
            </h1>

            {/* Dynamic Animated Role Switcher */}
            <div className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden">
              <span className={`font-mono text-sm sm:text-base mr-3 font-semibold ${
                isDark ? 'text-[#F8FAFC]/80' : 'text-slate-600'
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
                    className={`text-lg sm:text-2xl font-bold tracking-tight px-3.5 py-1 rounded-xl backdrop-blur-2xl text-transparent bg-clip-text ${
                      isDark
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#A855F7] bg-[rgba(12,12,16,0.45)] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(124,58,237,0.25)]'
                        : 'bg-gradient-to-r from-[#00A57A] via-[#00C896] to-[#10B981] bg-white/85 border border-[#00C896]/30 shadow-[0_4px_16px_rgba(0,200,150,0.18)]'
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
                className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer group active:scale-95 ${
                  isDark
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                    : 'bg-gradient-to-r from-[#00C896] to-[#00A57A] text-white hover:shadow-[0_4px_25px_rgba(0,200,150,0.4)]'
                }`}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={onOpenContact}
                id="hero-contact-me-btn"
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 border cursor-pointer backdrop-blur-2xl active:scale-95 ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.45)] hover:bg-[rgba(20,20,28,0.7)] text-[#F8FAFC] border-[#D4AF37]/35 hover:border-[#D4AF37]'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-[#00C896] shadow-sm'
                }`}
              >
                <Mail className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
                <span>Get In Touch</span>
              </button>

              <button
                onClick={onOpenResumeDownload}
                id="hero-download-cv-btn"
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 border cursor-pointer backdrop-blur-2xl ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.45)] text-[#F8FAFC] hover:text-[#FFD700] border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37]'
                    : 'bg-white/80 text-slate-700 hover:text-[#00A57A] border-slate-200 hover:border-[#00C896] shadow-sm'
                }`}
              >
                <FileText className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
                <span>Download CV</span>
              </button>
            </div>

            {/* Quick Tech Highlights Badge Row */}
            <div className={`mt-10 pt-6 border-t w-full flex flex-wrap items-center gap-6 text-xs font-medium ${
              isDark ? 'border-[rgba(212,175,55,0.25)] text-[#F8FAFC]' : 'border-slate-200 text-slate-600'
            }`}>
              <span className={`font-mono uppercase tracking-wider text-[11px] font-bold ${
                isDark ? 'text-[#FFD700]' : 'text-[#00A57A]'
              }`}>
                Core Stack:
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#FFD700]' : 'bg-[#00C896]'}`} /> Next.js 15
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#A855F7]' : 'bg-[#10B981]'}`} /> TypeScript
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#D4AF37]' : 'bg-[#34D399]'}`} /> Tailwind CSS
                </span>
                <span className="flex items-center gap-1.5 transition-colors">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#7C3AED]' : 'bg-[#00A57A]'}`} /> UI/UX Architecture
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Luxury Profile Container with Orbital Rings */}
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
                  isDark ? 'border-[#D4AF37]/25' : 'border-[#00C896]/25'
                }`}
              />

              {/* Inner Pulsing Gradient Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className={`absolute inset-6 rounded-full border border-dotted transition-colors ${
                  isDark ? 'border-[#7C3AED]/40' : 'border-[#34D399]/40'
                }`}
              />

              {/* Glowing Background Radial */}
              <div className={`absolute inset-10 rounded-full blur-3xl transition-colors ${
                isDark 
                  ? 'opacity-40 bg-gradient-to-tr from-[#7C3AED] to-[#D4AF37]' 
                  : 'opacity-30 bg-gradient-to-tr from-[#00C896] to-[#7FFFD4]'
              }`} />

              {/* Main Profile Card / Image Wrapper */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`relative z-10 w-[260px] sm:w-[310px] h-[320px] sm:h-[370px] rounded-3xl p-3 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-2xl ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.45)] border border-[#D4AF37]/30 shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
                    : 'bg-white/90 border border-[#00C896]/25 shadow-[0_16px_35px_rgba(0,200,150,0.15)]'
                }`}
              >
                <SafeImage
                  src={portfolioConfig.assets.profileImage}
                  alt={portfolioConfig.personal.name}
                  fallbackType="profile"
                  className="w-full h-full rounded-2xl"
                />

                {/* Top Corner Badge */}
                <div className={`absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
                  isDark 
                    ? 'bg-black/60 text-white border border-[#D4AF37]/30' 
                    : 'bg-white/80 text-slate-900 border border-[#00C896]/30 shadow-sm'
                }`}>
                  <Sparkles className={`w-3 h-3 ${isDark ? 'text-[#FFD700]' : 'text-[#00A57A]'}`} />
                  <span>Pro Architect</span>
                </div>
              </motion.div>

              {/* Floating Badge 1: 5+ Years Experience (Top Right) */}
              <motion.div
                animate={{ y: [-4, 6, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-3 right-0 sm:-right-4 z-20 px-3.5 py-2.5 rounded-2xl backdrop-blur-2xl border shadow-xl flex items-center gap-3 ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.5)] border-[#D4AF37]/35 text-[#F8FAFC] shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
                    : 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_8px_20px_rgba(0,200,150,0.15)]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-[#7C3AED]/25 text-[#D4AF37]' : 'bg-emerald-50 text-[#00A57A]'
                }`}>
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-black tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
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
                className={`absolute -bottom-4 left-0 sm:-left-6 z-20 px-3.5 py-2.5 rounded-2xl backdrop-blur-2xl border shadow-xl flex items-center gap-3 ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.5)] border-[#D4AF37]/35 text-[#F8FAFC] shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
                    : 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_8px_20px_rgba(0,200,150,0.15)]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-[#D4AF37]/20 text-[#FFD700]' : 'bg-emerald-50 text-[#00A57A]'
                }`}>
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-black tracking-tight ${isDark ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
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
