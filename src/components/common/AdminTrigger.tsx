import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface AdminTriggerProps {
  className?: string;
  onNavigate?: () => void;
}

export const AdminTrigger: React.FC<AdminTriggerProps> = ({ className = '', onNavigate }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Long press tracking
  const [isPressing, setIsPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const controls = useAnimation();

  const handleTriggerAction = useCallback(() => {
    // Clear any active timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setIsPressing(false);
    setPressProgress(0);

    // Subtle trigger animation before redirecting
    controls.start({
      scale: [1, 1.2, 0.95, 1],
      transition: { duration: 0.35, ease: 'easeOut' },
    });

    if (onNavigate) {
      onNavigate();
    } else {
      navigate('/admin/login');
    }
  }, [controls, navigate, onNavigate]);

  // Handle double click
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleTriggerAction();
  };

  // Handle single click (intentionally no action)
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // No action on single click as per specifications
  };

  // Start long press (2000ms duration)
  const startLongPress = () => {
    setIsPressing(true);
    startTimeRef.current = Date.now();
    setPressProgress(0);

    const DURATION = 2000;

    // Progress updates at 60fps
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      setPressProgress(progress);
    }, 25);

    timerRef.current = window.setTimeout(() => {
      handleTriggerAction();
    }, DURATION);
  };

  // Cancel long press if released early
  const cancelLongPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsPressing(false);
    setPressProgress(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <motion.button
        type="button"
        id="luxury-admin-portal-trigger"
        aria-label="Security verification emblem"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseDown={startLongPress}
        onMouseUp={cancelLongPress}
        onMouseLeave={cancelLongPress}
        onTouchStart={startLongPress}
        onTouchEnd={cancelLongPress}
        onTouchCancel={cancelLongPress}
        animate={controls}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
        whileTap={{
          scale: 0.94,
          transition: { duration: 0.15 },
        }}
        className={`group relative w-[28px] h-[28px] rounded-[9px] flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-md opacity-40 hover:opacity-100 focus:outline-none ${
          isDark
            ? 'bg-[#050505]/90 border border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#F5D76E]/80 hover:shadow-[0_0_15px_rgba(212,175,55,0.45)] hover:text-[#F5D76E]'
            : 'bg-white/80 border border-[#00E5FF]/35 text-[#00C8A8] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.45)] hover:text-[#00E5FF]'
        } ${isPressing ? 'opacity-100 scale-105' : ''}`}
      >
        {/* Subtle interior light reflection */}
        <div
          className={`absolute inset-0 rounded-[8px] pointer-events-none transition-opacity duration-300 ${
            isDark
              ? 'bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-[#F5D76E]/15 opacity-60 group-hover:opacity-100'
              : 'bg-gradient-to-tr from-[#00C8A8]/10 via-[rgba(255,255,255,0.15)] to-[#00E5FF]/20 opacity-70 group-hover:opacity-100'
          }`}
        />

        {/* Minimal Luxury Cyber-Security Shield Icon with Keyhole Lock Hole */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-[15px] h-[15px] transition-transform duration-300 relative z-10 ${
            isPressing ? 'scale-110' : ''
          }`}
        >
          {/* Shield Outline */}
          <path
            d="M12 2.75L4.5 5.75V11.25C4.5 16.5 7.7 20.65 12 22C16.3 20.65 19.5 16.5 19.5 11.25V5.75L12 2.75Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Precision Lock Keyhole */}
          <path
            d="M12 8.75C11.17 8.75 10.5 9.42 10.5 10.25C10.5 10.84 10.84 11.35 11.33 11.59L11 14H13L12.67 11.59C13.16 11.35 13.5 10.84 13.5 10.25C13.5 9.42 12.83 8.75 12 8.75Z"
            fill="currentColor"
          />
        </svg>

        {/* Circular Progress Ring for Long Press (2s feedback) */}
        {isPressing && (
          <svg
            className="absolute -inset-[2px] w-[32px] h-[32px] pointer-events-none -rotate-90 z-20"
            viewBox="0 0 32 32"
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke={isDark ? '#D4AF37' : '#00E5FF'}
              strokeWidth="1.5"
              strokeDasharray={88}
              strokeDashoffset={88 - 88 * pressProgress}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </svg>
        )}

        {/* Small pulse aura while charging long-press */}
        {isPressing && (
          <motion.div
            initial={{ opacity: 0.3, scale: 0.9 }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.25, 0.95] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute inset-0 rounded-[9px] pointer-events-none ${
              isDark ? 'bg-[#D4AF37]/25 blur-[6px]' : 'bg-[#00E5FF]/30 blur-[6px]'
            }`}
          />
        )}
      </motion.button>
    </div>
  );
};
