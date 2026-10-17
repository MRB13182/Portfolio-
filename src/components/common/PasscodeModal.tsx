import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Lock, Mail, Eye, EyeOff, X, AlertCircle, ShieldCheck } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { signIn, isConfigured } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('borshonsweb@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(null);
      setTimeout(() => passwordInputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError('Please provide both your administrator email and password.');
      return;
    }

    if (!isConfigured) {
      setError('Supabase is not configured. Please define VITE_SUPABASE_ANON_KEY in your environment.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const { error: authError } = await signIn(email, password);

      if (authError) {
        setError(authError.message || 'Authentication failed. Please verify your administrator credentials.');
      } else {
        showToast('Security Verified: Admin Access Granted', { type: 'success' });
        onClose();
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during authentication.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={`relative w-full max-w-md p-7 sm:p-8 rounded-[30px] border shadow-2xl z-10 backdrop-blur-2xl overflow-hidden ${
            isDark
              ? 'bg-[#121217]/95 border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,229,255,0.15)]'
              : 'bg-white/95 border-white/70 text-slate-900 shadow-[0_20px_45px_rgba(0,229,255,0.15)]'
          }`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-13 h-13 rounded-2xl flex items-center justify-center bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.25)] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Admin Portal Authentication</h3>
            <p className={`text-xs mt-1 max-w-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Server-verified Supabase credentials required for executive CMS access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5 opacity-80">
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
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border outline-none font-mono transition-all ${
                    isDark
                      ? 'bg-[#15151E] border-white/15 text-white placeholder-slate-500 focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5 opacity-80">
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
                  }`}
                />
                <input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs sm:text-sm border outline-none font-mono transition-all ${
                    isDark
                      ? 'bg-[#15151E] border-white/15 text-white placeholder-slate-500 focus:border-[#00E5FF]'
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
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black font-extrabold shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:opacity-95 active:scale-95 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isVerifying ? 'Verifying with Supabase...' : 'Authenticate & Unlock'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
