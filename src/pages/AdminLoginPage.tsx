import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, Lock, KeyRound, Eye, EyeOff, AlertCircle, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const { isDark } = useTheme();
  const { signIn, signInWithPasskey, isConfigured } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'passkey' | 'supabase'>('passkey');
  const [email, setEmail] = useState('borshonsweb@gmail.com');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter your authorized security key');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const ok = signInWithPasskey(passcode);
      if (ok) {
        showToast('Authorized via Security Passkey', { type: 'success' });
        navigate('/admin');
      } else {
        setError('Invalid security passkey. Access unauthorized.');
      }
    }, 400);
  };

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message || 'Supabase authentication failed');
      } else {
        showToast('Logged into Supabase Admin Console', { type: 'success' });
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full max-w-md p-8 sm:p-10 rounded-[32px] backdrop-blur-2xl border transition-all duration-300 shadow-2xl relative overflow-hidden ${
          isDark
            ? 'bg-[#0A0A0A]/95 border-[#D4AF37]/35 text-[#FFFFFF] shadow-[0_0_40px_rgba(212,175,55,0.15)]'
            : 'bg-white/90 border-[#00E5FF]/35 text-slate-900 shadow-[0_15px_40px_rgba(0,229,255,0.15)]'
        }`}
      >
        {/* Subtle Ambient Refraction */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-[#D4AF37]/15' : 'bg-[#00E5FF]/20'
          }`}
        />

        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`inline-flex items-center gap-2 text-xs font-semibold mb-8 transition-colors cursor-pointer ${
            isDark ? 'text-[#A1A1AA] hover:text-[#F5D76E]' : 'text-slate-500 hover:text-[#00C8A8]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </button>

        {/* Shield Security Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border backdrop-blur-xl shadow-lg relative ${
              isDark
                ? 'bg-[#050505] border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                : 'bg-white border-[#00E5FF]/40 text-[#00C8A8] shadow-[0_0_20px_rgba(0,229,255,0.25)]'
            }`}
          >
            {/* Minimal Luxury Shield SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                d="M12 2.75L4.5 5.75V11.25C4.5 16.5 7.7 20.65 12 22C16.3 20.65 19.5 16.5 19.5 11.25V5.75L12 2.75Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8.75C11.17 8.75 10.5 9.42 10.5 10.25C10.5 10.84 10.84 11.35 11.33 11.59L11 14H13L12.67 11.59C13.16 11.35 13.5 10.84 13.5 10.25C13.5 9.42 12.83 8.75 12 8.75Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          <span
            className={`text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-full border mb-2 ${
              isDark
                ? 'bg-[#050505] border-[#D4AF37]/30 text-[#D4AF37]'
                : 'bg-emerald-50/70 border-[#00E5FF]/30 text-[#00C8A8]'
            }`}
          >
            SECURE ACCESS GATEWAY
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">Admin Authentication</h2>
          <p className={`text-xs mt-1 max-w-xs ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
            Access your executive portfolio control dashboard & Supabase data services.
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex rounded-xl p-1 bg-black/20 border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => { setMode('passkey'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'passkey'
                ? isDark
                  ? 'bg-[#D4AF37] text-black shadow-sm'
                  : 'bg-[#00E5FF] text-slate-950 shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Security Passkey
          </button>
          <button
            type="button"
            onClick={() => { setMode('supabase'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'supabase'
                ? isDark
                  ? 'bg-[#D4AF37] text-black shadow-sm'
                  : 'bg-[#00E5FF] text-slate-950 shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Supabase Auth
          </button>
        </div>

        {mode === 'passkey' ? (
          <form onSubmit={handlePasscodeLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-passcode"
                className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
                }`}
              >
                Security Key / Passcode
              </label>
              <div className="relative">
                <div
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="admin-passcode"
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter admin passcode (e.g. prtf.mrb182)"
                  className={`w-full pl-10 pr-10 py-3 rounded-2xl text-xs sm:text-sm border outline-none transition-all ${
                    isDark
                      ? 'bg-[#050505] border-[rgba(212,175,55,0.3)] text-white placeholder-white/30 focus:border-[#D4AF37]'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isDark
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black hover:opacity-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-95 shadow-[0_4px_20px_rgba(0,229,255,0.3)]'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Authenticate with Passkey'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSupabaseLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-2xl text-xs border outline-none ${
                    isDark ? 'bg-[#050505] border-white/10' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-80">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs border outline-none ${
                    isDark ? 'bg-[#050505] border-white/10' : 'bg-white border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isDark
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black hover:opacity-95'
                  : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-95'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Verifying with Supabase...' : 'Sign In via Supabase'}</span>
            </button>
          </form>
        )}

        {/* Footer Security Advisory */}
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <p className={`text-[10px] font-mono leading-relaxed ${isDark ? 'text-[#71717A]' : 'text-slate-400'}`}>
            Connected to Supabase Project <code className="opacity-90">egpwwzkwwxsrctzyhpnv</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
