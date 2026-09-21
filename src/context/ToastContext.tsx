import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (title: string, options?: { type?: ToastType; message?: string; duration?: number }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { isDark } = useTheme();

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, options?: { type?: ToastType; message?: string; duration?: number }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options?.duration || 4500;
    const newToast: Toast = {
      id,
      title,
      type: options?.type || 'info',
      message: options?.message,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-xl flex items-start gap-3 backdrop-blur-xl transition-colors ${
                isDark
                  ? 'bg-[#0B0B0F]/95 text-white border-[rgba(212,175,55,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                  : 'bg-white/95 text-slate-900 border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && (
                  <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'}`} />
                )}
                {toast.type === 'error' && (
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                )}
                {toast.type === 'info' && (
                  <Info className={`w-5 h-5 ${isDark ? 'text-[#F5D76E]' : 'text-[#00E5FF]'}`} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold leading-snug">{toast.title}</h4>
                {toast.message && (
                  <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-zinc-400 hover:text-zinc-200 transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
