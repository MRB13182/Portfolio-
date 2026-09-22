import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Lock, KeyRound, Eye, EyeOff, X, AlertCircle, ShieldCheck } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { signInWithPasskey } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter passcode');
      return;
    }

    setIsVerifying(true);
    setError(null);

    setTimeout(() => {
      setIsVerifying(false);
      const clean = passcode.trim().toLowerCase();
      if (clean === 'prtf.mrb182' || signInWithPasskey(passcode)) {
        showToast('Access Granted', { type: 'success' });
        onClose();
        navigate('/admin');
      } else {
        setError('Access Denied: Invalid Passcode');
      }
    }, 350);
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
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-md p-7 sm:p-8 rounded-[30px] border shadow-2xl z-10 backdrop-blur-2xl overflow-hidden ${
            isDark
              ? 'bg-[#121217]/90 border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.15)]'
              : 'bg-white/95 border-white/70 text-slate-900 shadow-[0_20px_45px_rgba(0,229,255,0.15)]'
          }`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-13 h-13 rounded-2xl flex items-center justify-center bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.25)] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Security Access</h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Enter authorized passcode to open management console
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <KeyRound className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
                }`} />
                <input
                  ref={inputRef}
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter passcode..."
                  className={`w-full pl-10 pr-10 py-3 rounded-2xl text-sm border outline-none transition-all ${
                    isDark
                      ? 'bg-[#15151E] border-white/15 text-white placeholder-slate-500 focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              disabled={isVerifying}
              className="w-full py-3.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black font-extrabold shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:opacity-95 active:scale-95 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isVerifying ? 'Verifying...' : 'Unlock Panel'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
