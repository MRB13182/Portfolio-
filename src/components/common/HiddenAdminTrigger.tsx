import React, { useState, useRef, useEffect } from 'react';

interface HiddenAdminTriggerProps {
  children?: React.ReactNode;
  onTrigger: () => void;
  className?: string;
  holdDurationMs?: number;
}

export const HiddenAdminTrigger: React.FC<HiddenAdminTriggerProps> = ({
  children,
  onTrigger,
  className = '',
  holdDurationMs = 3000,
}) => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = () => {
    setIsPressing(true);
    setProgress(0);
    startTimeRef.current = Date.now();

    // Update progress indicator every 40ms
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / holdDurationMs) * 100);
      setProgress(pct);
    }, 40);

    // Trigger when hold duration reached
    timerRef.current = window.setTimeout(() => {
      clearHold();
      onTrigger();
    }, holdDurationMs);
  };

  const clearHold = () => {
    setIsPressing(false);
    setProgress(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearHold();
    };
  }, []);

  return (
    <div
      onMouseDown={startHold}
      onMouseUp={clearHold}
      onMouseLeave={clearHold}
      onTouchStart={startHold}
      onTouchEnd={clearHold}
      onTouchCancel={clearHold}
      className={`relative select-none ${className}`}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {children}

      {/* Subtle radial or bar fill during long press */}
      {isPressing && (
        <span
          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] rounded-full transition-all duration-75 pointer-events-none shadow-[0_0_10px_rgba(0,229,255,0.8)]"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};
