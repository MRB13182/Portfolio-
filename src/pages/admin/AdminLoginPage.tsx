import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { LuxuryBackground } from '../../components/common/LuxuryBackground';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { isDark } = useTheme();
  const { signIn, isAdmin, isConfigured } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('borshonsweb@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const destination = (location.state as any)?.from?.pathname || '/admin';

  useEffect(() => {
    if (isAdmin) {
      navigate(destination, { replace: true });
    }
  }, [isAdmin, navigate, destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError('Please provide both administrator email and password.');
      return;
    }

    if (!isConfigured) {
      setError('Supabase is not configured yet. Set VITE_SUPABASE_ANON_KEY in your environment.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError(authError.message || 'Authentication failed. Please verify administrator credentials.');
      } else {
        showToast('Authenticated successfully. Welcome back!', { type: 'success' });
        navigate(destination, { replace: true });
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-center items-center p-4 transition-colors duration-300 ${
        isDark ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <LuxuryBackground />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-xs font-mono transition-colors opacity-70 hover:opacity-100 ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-8 sm:p-10 rounded-[32px] border backdrop-blur-2xl shadow-2xl ${
            isDark
              ? 'bg-[#121217]/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
              : 'bg-white/95 border-slate-200/80 shadow-[0_20px_50px_rgba(0,229,255,0.12)]'
          }`}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_25px_rgba(0,229,255,0.2)] mb-4">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Admin Portal Login</h1>
            <p className={`text-xs mt-1.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Server-verified Supabase session required to access CMS
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 opacity-80">
                Administrator Email
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm border outline-none font-mono transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white placeholder-zinc-500 focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 opacity-80">
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
                  }`}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className={`w-full pl-10 pr-10 py-3 rounded-2xl text-xs sm:text-sm border outline-none font-mono transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white placeholder-zinc-500 focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black font-extrabold shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:opacity-95 active:scale-95 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'Verifying with Supabase Auth...' : 'Log In to Admin Console'}</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className={`text-[11px] font-mono ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
              Secured with Supabase Row Level Security &amp; JWT Verification
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
