import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig, assets } from '../../config/portfolio';
import { 
  Menu, 
  X, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HiddenAdminTrigger } from '../common/HiddenAdminTrigger';

interface NavbarProps {
  onTriggerAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoImageError, setLogoImageError] = useState(false);

  // Final 5-item navigation order
  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  // Helper to check if route is active
  const isItemActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const currentLogo = isDark ? assets.logo.dark : assets.logo.light;

  return (
    <>
      <header
        id="main-navbar-wrapper"
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none transition-all duration-300"
      >
        <div
          id="glass-navbar"
          className={`pointer-events-auto transition-all duration-300 ${
            scrolled
              ? isDark
                ? 'w-[94%] max-w-4xl mt-3 py-2.5 px-5 sm:px-7 rounded-[24px] bg-[#0A0A0A]/85 backdrop-blur-2xl border border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,229,255,0.12)] text-[#F8FAFC]'
                : 'w-[94%] max-w-4xl mt-3 py-2.5 px-5 sm:px-7 rounded-[24px] bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_12px_35px_rgba(0,229,255,0.12),0_4px_16px_rgba(0,0,0,0.04)] text-slate-900'
              : isDark
                ? 'w-full max-w-6xl mt-2 py-4 px-6 sm:px-8 bg-transparent text-[#F8FAFC]'
                : 'w-full max-w-6xl mt-2 py-4 px-6 sm:px-8 bg-transparent text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            
            {/* Left: Brand Identity / Hidden Admin Trigger Option */}
            <div className="flex items-center">
              {onTriggerAdmin ? (
                <HiddenAdminTrigger onTrigger={onTriggerAdmin}>
                  <Link
                    to="/"
                    id="navbar-brand-logo"
                    className="flex items-center gap-2.5 group cursor-pointer"
                  >
                    {!logoImageError && currentLogo ? (
                      <img
                        src={currentLogo}
                        alt={portfolioConfig.personal.name}
                        onError={() => setLogoImageError(true)}
                        className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs tracking-wider bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black">
                        MR
                      </div>
                    )}
                    <span className="font-bold text-sm tracking-tight hidden sm:inline-block">
                      {portfolioConfig.personal.firstName}{' '}
                      <span className="text-[#00E5FF]">
                        {portfolioConfig.personal.lastName}
                      </span>
                    </span>
                  </Link>
                </HiddenAdminTrigger>
              ) : (
                <Link
                  to="/"
                  id="navbar-brand-logo"
                  className="flex items-center gap-2.5 group cursor-pointer"
                >
                  {!logoImageError && currentLogo ? (
                    <img
                      src={currentLogo}
                      alt={portfolioConfig.personal.name}
                      onError={() => setLogoImageError(true)}
                      className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs tracking-wider bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black">
                      MR
                    </div>
                  )}
                  <span className="font-bold text-sm tracking-tight hidden sm:inline-block">
                    {portfolioConfig.personal.firstName}{' '}
                    <span className="text-[#00E5FF]">
                      {portfolioConfig.personal.lastName}
                    </span>
                  </span>
                </Link>
              )}
            </div>

            {/* Center: Center-Aligned Clean Navigation Links */}
            <nav className="hidden md:flex items-center justify-center space-x-7 lg:space-x-8">
              {navItems.map((item) => {
                const active = isItemActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    id={`nav-link-${item.name.toLowerCase()}`}
                    className={`relative py-1 text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                      active
                        ? isDark
                          ? 'text-white font-bold'
                          : 'text-slate-950 font-bold'
                        : isDark
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.name}</span>

                    {/* Thin animated underline below active item */}
                    {active && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] shadow-[0_0_8px_rgba(0,229,255,0.7)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Theme Toggle & Mobile Menu Trigger */}
            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={toggleTheme}
                id="navbar-theme-toggle-btn"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40'
                    : 'bg-slate-100/80 border-slate-200 text-slate-700 hover:text-[#0097A7] hover:border-[#00E5FF]/40'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-[#00E5FF]" /> : <Moon className="w-4 h-4 text-violet-600" />}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="navbar-mobile-menu-btn"
                aria-label="Toggle navigation drawer"
                className={`md:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Glass Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-4 top-20 z-40 md:hidden p-6 rounded-[28px] border shadow-2xl backdrop-blur-2xl ${
              isDark
                ? 'bg-[#0A0A0A]/95 border-white/12 text-white shadow-[0_16px_50px_rgba(0,0,0,0.8)]'
                : 'bg-white/95 border-white/60 text-slate-900 shadow-[0_16px_40px_rgba(0,229,255,0.15)]'
            }`}
          >
            <div className="flex flex-col items-center space-y-4 py-2">
              {navItems.map((item) => {
                const active = isItemActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    id={`mobile-nav-link-${item.name.toLowerCase()}`}
                    className={`relative py-2 text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
                      active
                        ? isDark
                          ? 'text-[#00E5FF] font-bold'
                          : 'text-[#0097A7] font-bold'
                        : isDark
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && (
                      <div className="mx-auto mt-1 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
