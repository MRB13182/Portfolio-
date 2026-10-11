import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, LogOut, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminSecurityPage: React.FC = () => {
  const { isDark } = useTheme();
  const { user, session, isAdmin, isConfigured, signOut } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      showToast('Session signed out', { type: 'info' });
      navigate('/', { replace: true });
    } catch {
      showToast('Sign-out could not be confirmed. Please retry.', { type: 'error' });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
        isDark
          ? 'bg-gradient-to-br from-[#0B0B0F] via-[#050505] to-[#121008] border-[rgba(212,175,55,0.25)]'
          : 'bg-gradient-to-br from-white via-slate-50 to-cyan-50/40 border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                isDark ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30' : 'bg-cyan-50 text-[#0097A7] border-[#00E5FF]/30'
              }`}>Access Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Security &amp; Session</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Administrator access is managed by Supabase Auth and database-side authorization. Local passcodes are not supported.
            </p>
          </div>
          <button type="button" onClick={handleLogout} className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-5 ${
        isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
      }`}>
        <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
          <Shield className="w-4 h-4" /> Verified Session
        </h2>
        <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
          isAdmin ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-amber-500/30 bg-amber-500/10 text-amber-500'
        }`}>
          <span className="flex items-center gap-2 text-xs">
            {isAdmin ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            Authorization Status
          </span>
          <span className="font-bold text-xs">{isAdmin ? 'Authorized administrator' : 'Not authorized'}</span>
        </div>
        <div className={`p-3.5 rounded-xl border space-y-2 text-xs font-mono ${
          isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex flex-wrap justify-between gap-2">
            <span className="opacity-60">Supabase Auth:</span>
            <span>{isConfigured ? 'Configured' : 'Not configured'}</span>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <span className="opacity-60">Identity:</span>
            <span>{user?.email || 'No verified user'}</span>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <span className="opacity-60">Access token:</span>
            <span>{session ? 'Managed by Supabase Auth' : 'No active session'}</span>
          </div>
        </div>
        <p className={`text-[11px] leading-relaxed flex gap-2 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
          Administrator access is only granted when the database authorization function confirms the signed-in identity. If the reviewed migration has not been deployed, access fails closed.
        </p>
      </div>
    </div>
  );
};
