import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Key,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  LogOut,
  Save,
  RotateCcw,
} from 'lucide-react';

export const AdminSecurityPage: React.FC = () => {
  const { isDark } = useTheme();
  const { isPasskeyAuthed, signOut } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [customPasscodeActive, setCustomPasscodeActive] = useState(false);

  useEffect(() => {
    const custom = localStorage.getItem('portfolio_admin_custom_passcode');
    setCustomPasscodeActive(!!custom);
  }, []);

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const activePasscode = localStorage.getItem('portfolio_admin_custom_passcode') || 'prtf.mrb182';

    if (currentPasscode !== activePasscode) {
      showToast('Current passcode is incorrect', { type: 'error' });
      return;
    }

    if (newPasscode.length < 6) {
      showToast('New passcode must be at least 6 characters', { type: 'error' });
      return;
    }

    if (newPasscode !== confirmPasscode) {
      showToast('Passcodes do not match', { type: 'error' });
      return;
    }

    localStorage.setItem('portfolio_admin_custom_passcode', newPasscode);
    setCustomPasscodeActive(true);
    setCurrentPasscode('');
    setNewPasscode('');
    setConfirmPasscode('');
    showToast('Admin Passcode updated successfully!', { type: 'success' });
  };

  const handleResetPasscode = () => {
    if (!window.confirm('Reset passcode to the default "prtf.mrb182"?')) return;
    localStorage.removeItem('portfolio_admin_custom_passcode');
    setCustomPasscodeActive(false);
    showToast('Passcode reset to default', { type: 'info' });
  };

  const handleLogout = async () => {
    await signOut();
    showToast('Admin session terminated', { type: 'info' });
    navigate('/');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
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
              }`}>
                Access Control
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Security & Passcode</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Manage your confidential admin passcode, active session status, and security protocols.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Console & Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Passcode Protection Form */}
        <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-5 ${
          isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Key className="w-4 h-4" /> Change Admin Passcode
            </h2>
            {customPasscodeActive && (
              <button
                type="button"
                onClick={handleResetPasscode}
                className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Default
              </button>
            )}
          </div>

          <form onSubmit={handleChangePasscode} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Current Passcode
              </label>
              <input
                type="password"
                value={currentPasscode}
                onChange={(e) => setCurrentPasscode(e.target.value)}
                placeholder="Enter current passcode"
                className={`w-full px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                New Passcode (Min. 6 chars)
              </label>
              <input
                type="password"
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                placeholder="Enter new secret passcode"
                className={`w-full px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Confirm New Passcode
              </label>
              <input
                type="password"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                placeholder="Repeat new secret passcode"
                className={`w-full px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                Update Passcode
              </button>
            </div>
          </form>
        </div>

        {/* Session & Gate Status */}
        <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
          isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
        }`}>
          <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
            <Shield className="w-4 h-4" /> Active Session Details
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Session Status</span>
              </div>
              <span className="font-bold">Authenticated</span>
            </div>

            <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-2">
              <div className="flex justify-between">
                <span className="opacity-60">Security Gate:</span>
                <span className="text-white">Hidden Footer Admin Icon</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Passcode Protection:</span>
                <span className="text-[#00E5FF]">
                  {customPasscodeActive ? 'Custom User Passcode' : 'Default Security Gate'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Session Storage:</span>
                <span className="text-white">Encrypted Local Key</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-300 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold font-mono">
              <AlertTriangle className="w-3.5 h-3.5" /> Security Best Practice
            </div>
            <p className="opacity-80 text-[11px] leading-relaxed">
              Always lock the console when finishing CMS administrative tasks on shared devices.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
