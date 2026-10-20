import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { portfolioConfig, assets } from '../../config/portfolio';
import { 
  Menu, 
  X, 
  Sun, 
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { profile, settings } = usePortfolioData();
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

  // Close mobile menu on route change or Escape key
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const currentLogo = isDark 
    ? (settings?.dark_logo || profile?.logo_dark || assets.logo.dark)
    : (settings?.light_logo || profile?.logo_light || assets.logo.light);

  const websiteName = settings?.website_name || (profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : portfolioConfig.personal.name);

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
                ? 'w-[94%] max-w-4xl mt-3 py-2 px-5 sm:px-7 rounded-2xl bg-[#111722]/85 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] text-[#F8FAFC]'
                : 'w-[94%] max-w-4xl mt-3 py-2 px-5 sm:px-7 rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] text-slate-900'
              : isDark
                ? 'w-full max-w-6xl mt-2 py-4 px-6 sm:px-8 bg-transparent text-[#F8FAFC]'
                : 'w-full max-w-6xl mt-2 py-4 px-6 sm:px-8 bg-transparent text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            
            {/* Zone 1: Brand Wordmark (Single Text Element) */}
            <div className="flex items-center shrink-0">
              <Link
                to="/"
                id="navbar-brand-logo"
                className="flex items-center gap-2.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none rounded-xl"
              >
                {!logoImageError && currentLogo ? (
                  <img
                    src={currentLogo}
                    alt={websiteName}
                    onError={() => setLogoImageError(true)}
                    className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs tracking-wider bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black">
                    MR
                  </div>
                )}
                <span className="font-bold text-sm tracking-tight hidden sm:inline-block">
                  {profile?.first_name || portfolioConfig.personal.firstName}{' '}
                  <span className="text-[#22D3EE]">
                    {profile?.last_name || portfolioConfig.personal.lastName}
                  </span>
                </span>
              </Link>
            </div>

            {/* Zone 2: Navigation Links (Clean Single-Line, No Pills) */}
            <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-7 shrink-0">
              {navItems.map((item) => {
                const active = isItemActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    id={`nav-link-${item.name.toLowerCase()}`}
                    className={`relative py-1 text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none rounded-md px-1.5 ${
                      active
                        ? isDark
                          ? 'text-white font-bold'
                          : 'text-slate-950 font-bold'
                        : isDark
                          ? 'text-[#A1AAB8] hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.name}</span>

                    {/* Subtle animated hairline indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute -bottom-1 left-1.5 right-1.5 h-[2px] rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Theme Toggle & Mobile Menu Trigger */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={toggleTheme}
                id="navbar-theme-toggle-btn"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className={`min-h-[40px] min-w-[40px] p-2 rounded-xl transition-all duration-200 cursor-pointer border flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-[#22D3EE] hover:border-[#22D3EE]/40'
                    : 'bg-slate-100/80 border-slate-200 text-slate-700 hover:text-[#0891B2] hover:border-[#0891B2]/40'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-[#22D3EE]" /> : <Moon className="w-4 h-4 text-[#7C3AED]" />}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="navbar-mobile-menu-btn"
                aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
                aria-expanded={mobileMenuOpen}
                className={`md:hidden min-h-[40px] min-w-[40px] p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                  isDark
                    ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Backdrop for Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Glass Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`fixed inset-x-4 top-20 z-40 md:hidden p-5 rounded-2xl border shadow-2xl backdrop-blur-2xl ${
              isDark
                ? 'bg-[#111722]/95 border-white/10 text-white shadow-[0_16px_50px_rgba(0,0,0,0.8)]'
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.12)]'
            }`}
          >
            <div className="flex flex-col space-y-1 py-1">
              {navItems.map((item) => {
                const active = isItemActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    id={`mobile-nav-link-${item.name.toLowerCase()}`}
                    className={`min-h-[44px] px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-between focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                      active
                        ? isDark
                          ? 'bg-white/[0.06] text-[#22D3EE] font-bold border border-[#22D3EE]/30'
                          : 'bg-slate-100 text-[#0891B2] font-bold border border-cyan-200'
                        : isDark
                          ? 'text-[#A1AAB8] hover:text-white hover:bg-white/[0.03]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
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
