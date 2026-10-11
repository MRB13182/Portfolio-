import React, { useEffect, useRef, useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setError(null);
      window.setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter the administrator email and password.');
      return;
    }

    setIsVerifying(true);
    setError(null);
    const { error: signInError } = await signIn(email, password);
    setIsVerifying(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    showToast('Administrator identity verified', { type: 'success' });
    setPassword('');
    onClose();
    navigate('/admin');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-login-title"
          className={`relative w-full max-w-md p-7 sm:p-8 rounded-[30px] border shadow-2xl z-10 backdrop-blur-2xl overflow-hidden ${
            isDark
              ? 'bg-[#121217]/90 border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.15)]'
              : 'bg-white/95 border-white/70 text-slate-900 shadow-[0_20px_45px_rgba(0,229,255,0.15)]'
          }`}
        >
          <button type="button" onClick={onClose} aria-label="Close sign-in dialog" className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-13 h-13 rounded-2xl flex items-center justify-center bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.25)] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 id="admin-login-title" className="text-xl font-bold tracking-tight">Administrator Sign In</h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Sign in with an authorized Supabase Auth account
            </p>
          </div>

          {!isConfigured && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Supabase is not configured. Administrator sign-in is disabled; there is no local passcode fallback.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'}`} />
              <input
                ref={inputRef}
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setError(null); }}
                placeholder="Administrator email"
                required
                disabled={!isConfigured || isVerifying}
                className={`w-full pl-10 pr-4 py-3 rounded-2xl text-sm border outline-none transition-all ${
                  isDark ? 'bg-[#15151E] border-white/15 text-white placeholder-slate-500 focus:border-[#00E5FF]' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => { setPassword(event.target.value); setError(null); }}
                placeholder="Password"
                required
                disabled={!isConfigured || isVerifying}
                className={`w-full pl-10 pr-11 py-3 rounded-2xl text-sm border outline-none transition-all ${
                  isDark ? 'bg-[#15151E] border-white/15 text-white placeholder-slate-500 focus:border-[#00E5FF]' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
                }`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white cursor-pointer">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button type="submit" disabled={!isConfigured || isVerifying} className="w-full py-3.5 rounded-2xl text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:opacity-95 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              <Lock className="w-3.5 h-3.5" />
              <span>{isVerifying ? 'Verifying identity…' : 'Sign In Securely'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
