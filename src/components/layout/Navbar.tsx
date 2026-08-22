import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig, assets } from '../../config/portfolio';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Mail, 
  FileText,
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenResumeDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  onOpenResumeDownload 
}) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoImageError, setLogoImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Smooth trigger threshold for morphing
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Strict User Mandate: Navbar contains ONLY Home, Skills, Projects, Experience
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
  ];

  return (
    <>
      <header
        id="main-navbar-wrapper"
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none transition-all duration-300"
      >
        <motion.div
          id="morphing-navbar"
          layout
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 32,
            mass: 0.8
          }}
          className={`pointer-events-auto transition-colors duration-300 ${
            scrolled
              ? isDark
                ? 'w-[94%] sm:w-[90%] max-w-4xl mt-3 sm:mt-4 py-2 px-3 sm:px-4 rounded-2xl bg-[rgba(12,12,16,0.65)] backdrop-blur-2xl border border-[rgba(212,175,55,0.3)] shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(124,58,237,0.22)] ring-1 ring-white/5'
                : 'w-[94%] sm:w-[90%] max-w-4xl mt-3 sm:mt-4 py-2 px-3 sm:px-4 rounded-2xl bg-[rgba(255,255,255,0.65)] backdrop-blur-2xl border border-[#00C896]/30 shadow-[0_16px_35px_rgba(0,200,150,0.16)] ring-1 ring-slate-900/5'
              : isDark
                ? 'w-full max-w-7xl mt-0 pt-4 sm:pt-6 pb-2 px-4 sm:px-6 lg:px-8 rounded-b-3xl bg-[rgba(5,5,8,0.35)] backdrop-blur-xl border-b border-[#D4AF37]/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
                : 'w-full max-w-7xl mt-0 pt-4 sm:pt-6 pb-2 px-4 sm:px-6 lg:px-8 rounded-b-3xl bg-[rgba(255,255,255,0.35)] backdrop-blur-xl border-b border-[#00C896]/15 shadow-[0_10px_30px_rgba(0,200,150,0.06)]'
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Morphing Brand Identity (Logo + Name/Monogram + Role) */}
            <Link
              to="/"
              id="nav-brand-link"
              className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none shrink-0"
            >
              {/* Morphing Logo Frame */}
              <motion.div
                layout
                className={`relative rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                  scrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-10 h-10 sm:w-12 sm:h-12'
                } ${
                  isDark
                    ? 'bg-gradient-to-tr from-[#7C3AED] via-[#0D0D0D] to-[#D4AF37] p-[1.5px] shadow-[0_0_20px_rgba(124,58,237,0.35)]'
                    : 'bg-gradient-to-tr from-[#00C896] via-white to-[#7FFFD4] p-[1.5px] shadow-[0_4px_15px_rgba(0,200,150,0.25)]'
                }`}
              >
                <div className="w-full h-full rounded-[9px] bg-white dark:bg-[#0A0A0A] flex items-center justify-center overflow-hidden p-1 relative">
                  {!logoImageError ? (
                    <img
                      src={isDark ? assets.logo.dark : assets.logo.light}
                      alt={`${portfolioConfig.personal.name} Logo`}
                      className="w-full h-full object-contain"
                      onLoad={(e) => {
                        if (e.currentTarget.naturalWidth < 5) {
                          setLogoImageError(true);
                        }
                      }}
                      onError={() => setLogoImageError(true)}
                    />
                  ) : null}

                  {logoImageError && (
                    <span 
                      className={`font-black tracking-tighter flex items-center justify-center w-full h-full ${
                        scrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
                      } ${
                        isDark 
                          ? 'text-transparent bg-clip-text bg-gradient-to-tr from-[#FFD700] to-[#D4AF37]' 
                          : 'text-transparent bg-clip-text bg-gradient-to-tr from-[#00A57A] to-[#00C896]'
                      }`}
                    >
                      MR
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Brand Typography (Full Name/Title vs. Compact MR Monogram) */}
              <div className="flex flex-col min-w-0">
                <AnimatePresence mode="wait">
                  {scrolled ? (
                    <motion.div
                      key="scrolled-brand"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className={`font-black text-sm sm:text-base tracking-wider ${
                        isDark 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37]' 
                          : 'text-slate-900'
                      }`}>
                        MR
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        isDark ? 'bg-[#FFD700]' : 'bg-[#00C896]'
                      }`} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="full-brand"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-extrabold text-sm sm:text-base tracking-tight leading-tight truncate ${
                          isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
                        }`}>
                          {portfolioConfig.personal.name}
                        </span>
                        <span className={`hidden sm:inline-block w-1.5 h-1.5 rounded-full ${
                          isDark ? 'bg-[#D4AF37]' : 'bg-[#00C896]'
                        }`} />
                      </div>
                      <span className={`text-[11px] font-mono tracking-wider truncate uppercase ${
                        isDark ? 'text-[#D4AF37]/90' : 'text-[#00A57A]'
                      }`}>
                        {portfolioConfig.personal.titles[0]}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>

            {/* Center: Spatial Luxury Navigation Switchboard (Desktop) */}
            <nav 
              id="desktop-nav" 
              className={`hidden md:flex items-center transition-all duration-300 ${
                scrolled
                  ? 'gap-1 p-1 rounded-xl bg-slate-100/70 dark:bg-[#0B0B0F]/90 border border-slate-200/50 dark:border-[rgba(212,175,55,0.25)] shadow-inner'
                  : 'gap-1.5 lg:gap-2 px-3 py-1.5 rounded-2xl bg-white/40 dark:bg-[rgba(15,15,20,0.85)] border border-slate-200/60 dark:border-[#D4AF37]/20 backdrop-blur-md shadow-sm'
              }`}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    id={`nav-link-${link.name.toLowerCase()}`}
                    className={`relative font-semibold transition-all duration-200 cursor-pointer ${
                      scrolled 
                        ? 'px-3 py-1.5 text-xs rounded-lg' 
                        : 'px-4 py-2 text-xs lg:text-sm rounded-xl'
                    } ${
                      isActive
                        ? isDark
                          ? 'text-[#F8FAFC]'
                          : 'text-[#00A57A]'
                        : isDark
                          ? 'text-[#F8FAFC]/90 hover:text-[#F8FAFC] hover:bg-white/10'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-glow"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className={`absolute inset-0 rounded-lg sm:rounded-xl -z-10 ${
                          isDark
                            ? 'bg-[#7C3AED]/40 border border-[#D4AF37]/45 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                            : 'bg-emerald-500/10 border border-[#00C896]/35 shadow-[0_2px_10px_rgba(0,200,150,0.18)]'
                        }`}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Right: Desktop Action Suite */}
            <div className="hidden md:flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                id="theme-toggle-btn"
                aria-label="Toggle luxury theme"
                title={isDark ? "Switch to Apple Titanium Emerald Light" : "Switch to Black Mamba Luxury Edition"}
                className={`transition-all duration-300 cursor-pointer border ${
                  scrolled ? 'p-2 rounded-lg' : 'p-2.5 rounded-xl'
                } ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-white/80 border-[#00C896]/20 text-[#00A57A] hover:bg-slate-50 hover:border-[#00C896]/40 shadow-sm'
                }`}
              >
                {isDark ? (
                  <Sun className={`${scrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} transition-transform duration-500 text-[#FFD700]` } />
                ) : (
                  <Moon className={`${scrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} transition-transform duration-500 text-[#00A57A]`} />
                )}
              </button>

              {/* Get In Touch Contact Modal Trigger */}
              <button
                onClick={onOpenContact}
                id="navbar-contact-btn"
                className={`font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                  scrolled ? 'px-3 py-2 text-xs rounded-lg' : 'px-4 py-2.5 text-xs lg:text-sm rounded-xl'
                } ${
                  isDark
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:opacity-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-[#00C896] hover:bg-[#00A57A] text-white shadow-[0_4px_15px_rgba(0,200,150,0.35)]'
                }`}
              >
                <Mail className={scrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                <span>Get In Touch</span>
              </button>
            </div>

            {/* Mobile Right Controls */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={toggleTheme}
                id="mobile-theme-toggle-btn"
                aria-label="Toggle theme"
                className={`p-2 rounded-xl border transition-colors ${
                  isDark ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/40 text-[#D4AF37]' : 'bg-white border-slate-200 text-[#00A57A]'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-[#FFD700]" /> : <Moon className="w-4 h-4 text-[#00A57A]" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                id="mobile-menu-open-btn"
                aria-label="Open navigation drawer"
                className={`p-2 rounded-xl border transition-colors ${
                  isDark ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/30 text-[#F8FAFC]' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Slide Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        onOpenContact={() => {
          setMobileMenuOpen(false);
          onOpenContact();
        }}
        onOpenResumeDownload={() => {
          setMobileMenuOpen(false);
          onOpenResumeDownload();
        }}
      />
    </>
  );
};

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; path: string }>;
  onOpenContact: () => void;
  onOpenResumeDownload: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navLinks,
  onOpenContact,
  onOpenResumeDownload,
}) => {
  const { isDark } = useTheme();
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        id="mobile-slide-drawer"
        className={`relative w-4/5 max-w-sm h-full flex flex-col justify-between p-6 overflow-y-auto transition-transform duration-300 shadow-2xl backdrop-blur-2xl ${
          isDark
            ? 'bg-[rgba(12,12,16,0.85)] border-l border-[#D4AF37]/25 text-[#F8FAFC] shadow-[0_0_50px_rgba(0,0,0,0.9)]'
            : 'bg-white/85 border-l border-[#00C896]/20 text-slate-900'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-[rgba(212,175,55,0.25)]">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center p-1 relative overflow-hidden ${
                isDark ? 'bg-[#0B0B0F] border border-[#D4AF37]/30' : 'bg-emerald-50 border border-emerald-200'
              }`}>
                <span 
                  className={`font-black text-xs items-center justify-center w-full h-full flex ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'
                  }`}
                >
                  MR
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{portfolioConfig.personal.name}</h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-[#F8FAFC]">
                  {portfolioConfig.personal.titles[0]}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="mobile-drawer-close-btn"
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-[#F8FAFC] dark:hover:text-[#FFD700] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links: Home, Skills, Projects, Experience */}
          <nav className="mt-6 flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  id={`mobile-link-${link.name.toLowerCase()}`}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-[#7C3AED]/30 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
                      : isDark
                        ? 'text-[#F8FAFC] hover:bg-[#7C3AED]/20 hover:text-[#FFD700]'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions: Download Resume + Get In Touch */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-[rgba(212,175,55,0.25)] flex flex-col gap-2.5">
          <button
            onClick={onOpenResumeDownload}
            id="mobile-drawer-resume-btn"
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isDark
                ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/30 text-[#F8FAFC] hover:border-[#D4AF37]'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-[#00C896]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#00A57A] dark:text-[#D4AF37]" />
            <span>Download Resume</span>
          </button>

          <button
            onClick={onOpenContact}
            id="mobile-drawer-contact-btn"
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all ${
              isDark
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'bg-[#00C896] text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </button>
        </div>
      </div>
    </div>
  );
};

