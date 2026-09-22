import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { HiddenAdminTrigger } from '../common/HiddenAdminTrigger';

interface FooterProps {
  onTriggerAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerAdmin }) => {
  const { isDark } = useTheme();

  return (
    <footer className="relative py-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {onTriggerAdmin ? (
          <HiddenAdminTrigger
            onTrigger={onTriggerAdmin}
            className="inline-block cursor-default"
          >
            <p className={`text-xs font-mono tracking-wider select-none ${
              isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'
            }`}>
              &copy; 2026 Portfolio
            </p>
          </HiddenAdminTrigger>
        ) : (
          <p className={`text-xs font-mono tracking-wider select-none ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            &copy; 2026 Portfolio
          </p>
        )}
      </div>
    </footer>
  );
};
