import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { Shield } from 'lucide-react';

interface FooterProps {
  onTriggerAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerAdmin }) => {
  const { isDark } = useTheme();
  const { settings, footerSettings } = usePortfolioData();

  // Dynamic values with fallback matching user specification
  const copyrightText = settings?.copyright_text || footerSettings?.copyright_text || '© 2026 MR Portfolio';
  const centerText = settings?.footer_text || footerSettings?.banner_text || 'All Rights Reserved.';

  return (
    <footer
      id="main-footer"
      className={`relative w-full border-t backdrop-blur-2xl transition-colors duration-300 z-20 ${
        isDark
          ? 'bg-[#08080C]/85 border-white/10 text-slate-400'
          : 'bg-white/80 border-slate-200/90 text-slate-500 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono">
          
          {/* Left Side: Copyright */}
          <div className="flex items-center text-center sm:text-left">
            <span
              id="footer-copyright-text"
              className={`tracking-wide font-medium transition-colors ${
                isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {copyrightText}
            </span>
          </div>

          {/* Center: All Rights Reserved */}
          <div className="flex items-center justify-center text-center">
            <span className="hidden sm:inline-block text-slate-600/40 dark:text-white/20 mr-4 font-light">
              |
            </span>
            <span
              id="footer-center-text"
              className={`tracking-wider font-normal ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {centerText}
            </span>
            <span className="hidden sm:inline-block text-slate-600/40 dark:text-white/20 ml-4 font-light">
              |
            </span>
          </div>

          {/* Right Side: Small Glassmorphism Admin Icon */}
          <div className="flex items-center justify-center sm:justify-end">
            <button
              type="button"
              id="footer-admin-icon-btn"
              onClick={onTriggerAdmin}
              title="Admin Portal Access"
              aria-label="Admin Portal"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-xl transition-all duration-300 text-xs font-mono cursor-pointer active:scale-95 group shadow-sm ${
                isDark
                  ? 'bg-white/5 border-white/10 text-slate-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'bg-white/80 border-slate-200/90 text-slate-600 hover:text-[#0097A7] hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/10 hover:shadow-[0_2px_10px_rgba(0,229,255,0.15)]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 text-[#00E5FF]" />
              <span className="text-[11px] font-medium tracking-wide">Admin</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
