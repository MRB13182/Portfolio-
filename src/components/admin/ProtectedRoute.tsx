import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Shield } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border animate-pulse ${
          isDark 
            ? 'bg-[#0A0A0A] border-[#D4AF37]/40 text-[#D4AF37]' 
            : 'bg-white border-[#00E5FF]/40 text-[#00C8A8]'
        }`}>
          <Shield className="w-6 h-6 animate-spin" />
        </div>
        <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
          Verifying Security Authorization...
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
