import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  id?: string;
}

// Cinematic cubic bezier curve for a fluid, natural feel
const CINEMATIC_EASE = [0.21, 0.47, 0.32, 0.98];

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 20,
  scale = 1,
  once = true,
  amount = 0.12,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      id={id}
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        scale: scale !== 1 ? scale : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount,
        margin: '0px 0px -40px 0px',
      }}
      transition={{
        duration,
        delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  id?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};
