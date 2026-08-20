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
  ArrowRight
} from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-[#050505]/85 backdrop-blur-2xl border-b border-[#D4AF37]/20 shadow-[0_10px_35px_rgba(0,0,0,0.9)] py-3'
              : 'bg-white/80 backdrop-blur-xl border-b border-[#00C896]/15 shadow-[0_10px_30px_rgba(0,200,150,0.06)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            id="nav-brand-link"
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-tr from-[#6D28D9] via-[#0D0D0D] to-[#D4AF37] p-[1.5px] shadow-[0_0_20px_rgba(109,40,217,0.35)]'
                : 'bg-gradient-to-tr from-[#00C896] via-white to-[#7FFFD4] p-[1.5px] shadow-[0_4px_15px_rgba(0,200,150,0.25)]'
            }`}>
              <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#0A0A0A] flex items-center justify-center overflow-hidden p-1 relative">
                <img
                  src={isDark ? assets.logo.dark : assets.logo.light}
                  alt={`${portfolioConfig.personal.name} Logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Gracefully fallback to monogram if image is unavailable
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <span 
                  style={{ display: 'none' }}
                  className={`font-black text-base tracking-tighter items-center justify-center w-full h-full ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'
                  }`}
                >
                  MR
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className={`font-bold text-sm sm:text-base tracking-tight leading-tight flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {portfolioConfig.personal.name}
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isDark ? 'bg-[#D4AF37]' : 'bg-[#00C896]'
                }`} />
              </span>
              <span className={`text-[11px] font-medium tracking-wide ${
                isDark ? 'text-[#D4AF37]/90' : 'text-[#00A57A]'
              }`}>
                {portfolioConfig.personal.titles[0]}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links: Home, Skills, Projects, Experience */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 bg-white/40 dark:bg-[rgba(15,15,20,0.85)] border-slate-200/60 dark:border-[#D4AF37]/20 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? 'text-white bg-[#6D28D9]/40 border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'text-[#00A57A] bg-emerald-500/10 border border-[#00C896]/30 shadow-[0_2px_10px_rgba(0,200,150,0.15)]'
                      : isDark
                        ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              aria-label="Toggle luxury theme"
              title={isDark ? "Switch to Apple Titanium Emerald Light" : "Switch to Black Mamba Luxury Edition"}
              className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-white/80 border-[#00C896]/20 text-[#00A57A] hover:bg-slate-50 hover:border-[#00C896]/40 shadow-sm'
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 transition-transform duration-500 rotate-0 hover:rotate-90 text-[#FFD700]" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-500 rotate-0 hover:-rotate-45 text-[#00A57A]" />
              )}
            </button>

            {/* Get In Touch Contact Modal Trigger */}
            <button
              onClick={onOpenContact}
              id="navbar-contact-btn"
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                isDark
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:opacity-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'bg-[#00C896] hover:bg-[#00A57A] text-white shadow-[0_4px_15px_rgba(0,200,150,0.35)]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
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
                isDark ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/30 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
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
            ? 'bg-[#050505]/95 border-l border-[#D4AF37]/25 text-white shadow-[0_0_50px_rgba(0,0,0,0.9)]'
            : 'bg-white border-l border-[#00C896]/20 text-slate-900'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center p-1 relative overflow-hidden ${
                isDark ? 'bg-[#18181b] border border-[#D4AF37]/30' : 'bg-emerald-50 border border-emerald-200'
              }`}>
                <img
                  src={isDark ? assets.logo.dark : assets.logo.light}
                  alt={`${portfolioConfig.personal.name} Logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <span 
                  style={{ display: 'none' }}
                  className={`font-black text-xs items-center justify-center w-full h-full ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'
                  }`}
                >
                  MR
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{portfolioConfig.personal.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  {portfolioConfig.personal.titles[0]}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="mobile-drawer-close-btn"
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
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
                        ? 'bg-[#6D28D9]/30 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
                      : isDark
                        ? 'text-zinc-300 hover:bg-zinc-900/80 hover:text-white'
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
        <div className="pt-6 border-t border-slate-200/60 dark:border-zinc-800 flex flex-col gap-2.5">
          <button
            onClick={onOpenResumeDownload}
            id="mobile-drawer-resume-btn"
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isDark
                ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/30 text-white hover:border-[#D4AF37]'
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
