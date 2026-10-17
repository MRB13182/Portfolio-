import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const { settings, footerSettings } = usePortfolioData();

  // Dynamic values with fallback matching 10-footer-cms specifications
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

          {/* Center / Right: All Rights Reserved */}
          <div className="flex items-center justify-center text-center">
            <span
              id="footer-center-text"
              className={`tracking-wider font-normal ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {centerText}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
