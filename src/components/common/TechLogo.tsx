import React from 'react';

interface TechLogoProps {
  logo?: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({ 
  logo = '', 
  className = 'w-6 h-6', 
  size = 24 
}) => {
  const normalized = logo.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalized) {
    // ----------------------------------------
    // FRONTEND LOGOS
    // ----------------------------------------
    case 'html5':
    case 'html':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M4 3L5.5 20L12 21.8L18.5 20L20 3H4Z" fill="#E34F26" />
          <path d="M12 4.6V20.2L17.2 18.8L18.4 4.6H12Z" fill="#EF652A" />
          <path d="M12 7.8H8.2L8.5 10.9H12V7.8ZM12 13.9H9.9L9.7 11.9H8.6L8.9 15.9H12V13.9Z" fill="#ECECEC" />
          <path d="M12 17.6V15.7L12 15.6L14.3 15L14.5 13.2H12.4V11.2H15.8L15.4 15.6L12 16.6V17.6ZM12 7.8V9.8H15.8L16 7.8H12Z" fill="#FFFFFF" />
        </svg>
      );

    case 'css3':
    case 'css':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M4 3L5.5 20L12 21.8L18.5 20L20 3H4Z" fill="#1572B6" />
          <path d="M12 4.6V20.2L17.2 18.8L18.4 4.6H12Z" fill="#33A9DC" />
          <path d="M12 7.8H7.8L8.1 11H12V7.8ZM12 14.1H9.9L9.7 12H8.6L8.9 16.1H12V14.1Z" fill="#ECECEC" />
          <path d="M12 17.6V15.6L14.4 15L14.6 12.8H12V10.8H15.8L15.4 15.6L12 16.6V17.6ZM12 7.8V9.8H16L16.2 7.8H12Z" fill="#FFFFFF" />
        </svg>
      );

    case 'javascript':
    case 'js':
    case 'javascriptes6':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M6.5 17.5C6.9 18.3 7.8 19 9 19C10.5 19 11.5 18.1 11.5 16.4V10.5H9.7V16.3C9.7 17.1 9.3 17.4 8.7 17.4C8.2 17.4 7.8 17.1 7.6 16.5L6.5 17.5ZM13.8 17.2C14.3 18.2 15.5 19 17.1 19C19 19 20.2 18 20.2 16.4C20.2 14.8 19.1 14.2 17.7 13.6C16.6 13.1 15.8 12.8 15.8 12C15.8 11.3 16.4 10.7 17.3 10.7C18.1 10.7 18.7 11.1 19.1 11.9L20.5 11C19.8 9.7 18.7 9.1 17.3 9.1C15.5 9.1 14.2 10.3 14.2 11.9C14.2 13.4 15.2 14.1 16.6 14.7C17.7 15.2 18.6 15.6 18.6 16.5C18.6 17.3 17.9 17.9 16.9 17.9C15.9 17.9 15.2 17.3 14.7 16.4L13.8 17.2Z" fill="#000000" />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M5 10.5H11V12.2H8.9V18.5H7.1V12.2H5V10.5ZM12.5 16.7C12.9 17.7 14 18.5 15.6 18.5C17.4 18.5 18.5 17.5 18.5 16C18.5 14.5 17.5 13.9 16.1 13.3C15.1 12.9 14.4 12.6 14.4 11.9C14.4 11.2 14.9 10.7 15.8 10.7C16.6 10.7 17.1 11.1 17.5 11.8L18.8 10.9C18.2 9.8 17.2 9.2 15.8 9.2C14.1 9.2 12.9 10.3 12.9 11.8C12.9 13.2 13.8 13.9 15.1 14.4C16.2 14.9 17 15.3 17 16.1C17 16.8 16.3 17.3 15.4 17.3C14.5 17.3 13.8 16.8 13.4 16L12.5 16.7Z" fill="#FFFFFF" />
        </svg>
      );

    case 'react':
    case 'reactjs':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case 'nextjs':
    case 'next':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <circle cx="12" cy="12" r="10.5" fill="#000000" stroke="#404040" strokeWidth="1" />
          <path d="M8 8V16H9.8V11.2L15.3 18.2C15.8 17.8 16.2 17.4 16.6 16.9L10.4 8H8Z" fill="#FFFFFF" />
          <path d="M14.5 8H16.2V13.8L14.5 11.5V8Z" fill="#FFFFFF" />
        </svg>
      );

    case 'tailwind':
    case 'tailwindcss':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 6.5C9.5 6.5 8 7.75 7.5 10.25C8.5 8.75 9.75 8.25 11.25 8.75C12.1 9.03 12.7 9.64 13.37 10.32C14.45 11.41 15.7 12.67 18.5 12.67C21 12.67 22.5 11.42 23 8.92C22 10.42 20.75 10.92 19.25 10.42C18.4 10.14 17.8 9.53 17.13 8.85C16.05 7.76 14.8 6.5 12 6.5ZM5.5 12.67C3 12.67 1.5 13.92 1 16.42C2 14.92 3.25 14.42 4.75 14.92C5.6 15.2 6.2 15.81 6.87 16.49C7.95 17.58 9.2 18.84 12 18.84C14.5 18.84 16 17.59 16.5 15.09C15.5 16.59 14.25 17.09 12.75 16.59C11.9 16.31 11.3 15.7 10.63 15.02C9.55 13.93 8.3 12.67 5.5 12.67Z" fill="#06B6D4" />
        </svg>
      );

    case 'bootstrap':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <rect width="24" height="24" rx="5" fill="#7952B3" />
          <path d="M7 6H13C15 6 16.5 7 16.5 8.7C16.5 9.9 15.8 10.8 14.7 11.3C16.2 11.7 17.2 12.9 17.2 14.5C17.2 16.7 15.3 18 13 18H7V6ZM9.5 8.2V10.8H12.5C13.6 10.8 14.2 10.2 14.2 9.5C14.2 8.7 13.6 8.2 12.5 8.2H9.5ZM9.5 13.1V15.8H12.8C14.1 15.8 14.8 15.2 14.8 14.4C14.8 13.6 14.1 13.1 12.8 13.1H9.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'redux':
    case 'reduxtoolkit':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.43-.37-4.37-2.31-4.74-4.74h2.06c.32 1.3 1.38 2.36 2.68 2.68v2.06zm0-4.06c-.6-.23-1.07-.7-1.3-1.3H9.64c.29 1.15 1.21 2.07 2.36 2.36v-1.06zm2.74-2.87c-.32-1.3-1.38-2.36-2.68-2.68V5.26c2.43.37 4.37 2.31 4.74 4.74h-2.06z" fill="#764ABC" />
          <circle cx="12" cy="12" r="2.5" fill="#764ABC" />
        </svg>
      );

    case 'reactquery':
    case 'tanstack':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#FF4154" />
          <path d="M12 5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.5" fill="#FFD700" />
        </svg>
      );

    case 'framermotion':
    case 'framer':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M4 3H20V10H12L4 3Z" fill="#0055FF" />
          <path d="M4 10H12L20 17H4V10Z" fill="#0055FF" />
          <path d="M12 17L4 24V17H12Z" fill="#0055FF" />
        </svg>
      );

    case 'responsive':
    case 'responsivedesign':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="13" rx="2" />
          <path d="M8 21H16" />
          <path d="M12 17V21" />
          <rect x="15" y="10" width="6" height="9" rx="1" fill="#10B981" stroke="none" />
        </svg>
      );

    case 'a11y':
    case 'webaccessibility':
    case 'accessibility':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#0085FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2.5" fill="#0085FF" />
          <path d="M5 9L12 10.5L19 9" />
          <path d="M12 10.5V16" />
          <path d="M9 20L12 15.5L15 20" />
        </svg>
      );

    case 'seo':
    case 'seooptimization':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="#F59E0B" strokeWidth="2.2" />
          <path d="M15.5 15.5L21 21" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M8 12L10 9L12 11L14 8" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // ----------------------------------------
    // BACKEND LOGOS
    // ----------------------------------------
    case 'nodejs':
    case 'node':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2L21 7.2V17.6L12 22.8L3 17.6V7.2L12 2Z" fill="#339933" />
          <path d="M12 5.5L18.5 9.2V15.6L12 19.3L5.5 15.6V9.2L12 5.5Z" fill="#215732" />
          <path d="M12 7.5L16.5 10.1V14.7L12 17.3L7.5 14.7V10.1L12 7.5Z" fill="#6CC24A" />
        </svg>
      );

    case 'express':
    case 'expressjs':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#262626" stroke="#404040" strokeWidth="1" />
          <path d="M6 8H10V10H7.5V11.5H9.5V13H7.5V16H6V8ZM11 12.5L13.5 8H15L12.5 12L15.5 16H13.8L11.7 13.2L11 14.2V16H9.5V8H11V12.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'nestjs':
    case 'nest':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#E0234E" />
          <path d="M12 5L5 8.5V15.5L12 19L19 15.5V8.5L12 5Z" fill="#FF4D6D" />
          <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
        </svg>
      );

    case 'restapi':
    case 'rest':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#009688" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="6" rx="2" fill="#009688" fillOpacity="0.15" />
          <rect x="3" y="14" width="18" height="6" rx="2" fill="#009688" fillOpacity="0.15" />
          <circle cx="7" cy="7" r="1" fill="#009688" />
          <circle cx="7" cy="17" r="1" fill="#009688" />
          <path d="M17 7H14" />
          <path d="M17 17H12" />
        </svg>
      );

    case 'graphql':
    case 'gql':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="#E10098" strokeWidth="1.8" />
          <path d="M12 4.5L18.5 17.5H5.5L12 4.5Z" stroke="#E10098" strokeWidth="1.8" />
          <circle cx="12" cy="2" r="2" fill="#E10098" />
          <circle cx="20.66" cy="7" r="2" fill="#E10098" />
          <circle cx="20.66" cy="17" r="2" fill="#E10098" />
          <circle cx="12" cy="22" r="2" fill="#E10098" />
          <circle cx="3.34" cy="17" r="2" fill="#E10098" />
          <circle cx="3.34" cy="7" r="2" fill="#E10098" />
        </svg>
      );

    case 'auth':
    case 'authentication':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="10" rx="3" fill="#10B981" fillOpacity="0.15" />
          <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" />
          <circle cx="12" cy="16" r="1.5" fill="#10B981" />
        </svg>
      );

    case 'authorization':
    case 'rbac':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L4 5.5V11.5C4 16.5 7.5 21 12 22.5C16.5 21 20 16.5 20 11.5V5.5L12 2Z" fill="#6366F1" fillOpacity="0.15" />
          <path d="M9 12L11 14L15 10" />
        </svg>
      );

    case 'apidesign':
    case 'swagger':
    case 'openapi':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <rect width="24" height="24" rx="5" fill="#85EA2D" />
          <circle cx="12" cy="12" r="7" stroke="#000000" strokeWidth="2.2" />
          <circle cx="9.5" cy="10" r="1.2" fill="#000000" />
          <circle cx="14.5" cy="10" r="1.2" fill="#000000" />
          <path d="M9 14.5C10 16 14 16 15 14.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'serverarch':
    case 'serverarchitecture':
    case 'architecture':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="6" rx="1.5" fill="#3B82F6" fillOpacity="0.15" />
          <rect x="14" y="3" width="7" height="6" rx="1.5" fill="#3B82F6" fillOpacity="0.15" />
          <rect x="8.5" y="15" width="7" height="6" rx="1.5" fill="#3B82F6" fillOpacity="0.15" />
          <path d="M6.5 9V12H17.5V9" />
          <path d="M12 12V15" />
        </svg>
      );

    // ----------------------------------------
    // DATABASE LOGOS
    // ----------------------------------------
    case 'mongodb':
    case 'mongo':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2C12 2 6.5 7.5 6.5 13.5C6.5 17.5 9.5 21 12 22C14.5 21 17.5 17.5 17.5 13.5C17.5 7.5 12 2 12 2Z" fill="#47A248" />
          <path d="M12 2.5V21.5C14 20.5 16.5 17.2 16.5 13.5C16.5 8.5 12 2.5 12 2.5Z" fill="#3FA037" />
          <path d="M12 19V22.5" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case 'postgresql':
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#4169E1" />
          <path d="M16 8C14.5 6.5 11.5 6.5 9.5 8C8.5 9 8 10.5 8 12C8 14 9.5 16 11 17L12 15C11 14 10 13 10 12C10 11 10.5 10 11.5 9.5C12.5 9 14 9.5 14.5 10.5L16 8Z" fill="#FFFFFF" />
          <circle cx="10" cy="11" r="1" fill="#4169E1" />
        </svg>
      );

    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <circle cx="12" cy="12" r="10" fill="#00758F" />
          <path d="M6 14C8 10 13 8 18 10C16 12 14 15 11 16C9 16.5 7 15.5 6 14Z" fill="#F29111" />
          <circle cx="15.5" cy="11.5" r="1" fill="#FFFFFF" />
        </svg>
      );

    case 'redis':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#DC382D" />
          <path d="M2 12L12 17L22 12" stroke="#B81D13" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="#8C0F07" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
      );

    case 'prisma':
    case 'prismaorm':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M13.5 2.5L20.5 18L10.5 21.5L3.5 15.5L13.5 2.5Z" fill="#2D3748" />
          <path d="M13.5 2.5L10.5 21.5L3.5 15.5L13.5 2.5Z" fill="#16B364" />
          <path d="M13.5 2.5L20.5 18L10.5 21.5L13.5 2.5Z" fill="#0F766E" />
        </svg>
      );

    case 'dbdesign':
    case 'databasedesign':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="8" ry="3" fill="#8B5CF6" fillOpacity="0.2" />
          <path d="M4 5V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V5" />
          <path d="M4 12V19C4 20.66 7.58 22 12 22C16.42 22 20 20.66 20 19V12" />
        </svg>
      );

    // ----------------------------------------
    // CLOUD & DEVOPS LOGOS
    // ----------------------------------------
    case 'git':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M21.7 10.8L13.2 2.3C12.4 1.5 11.1 1.5 10.3 2.3L2.3 10.3C1.5 11.1 1.5 12.4 2.3 13.2L10.8 21.7C11.6 22.5 12.9 22.5 13.7 21.7L21.7 13.7C22.5 12.9 22.5 11.6 21.7 10.8Z" fill="#F05032" />
          <path d="M13.5 11.5V7.5M13.5 11.5C12.8 11.9 12 11.9 11.3 11.5L8.5 14.3C8.9 15 8.9 15.8 8.5 16.5C7.8 17.2 6.7 17.2 6 16.5C5.3 15.8 5.3 14.7 6 14C6.7 13.3 7.5 13.3 8.2 13.7L11 10.9V7.5M13.5 11.5C14.2 12.2 14.2 13.3 13.5 14C12.8 14.7 11.7 14.7 11 14" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="13.5" cy="6.5" r="1.5" fill="#FFFFFF" />
          <circle cx="6" cy="15.5" r="1.5" fill="#FFFFFF" />
          <circle cx="13.5" cy="14" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.52C9.34 21.61 9.52 21.3 9.52 21.03C9.52 20.79 9.51 19.99 9.51 19.14C6.73 19.74 6.14 17.8 6.14 17.8C5.68 16.64 5.03 16.33 5.03 16.33C4.12 15.71 5.1 15.72 5.1 15.72C6.1 15.79 6.63 16.76 6.63 16.76C7.52 18.29 8.97 17.85 9.54 17.59C9.63 16.94 9.89 16.5 10.17 16.25C7.95 16 5.62 15.14 5.62 11.31C5.62 10.22 6.01 9.32 6.65 8.62C6.55 8.37 6.21 7.36 6.75 5.99C6.75 5.99 7.59 5.72 9.5 7.02C10.3 6.8 11.15 6.69 12 6.69C12.85 6.69 13.7 6.8 14.5 7.02C16.41 5.72 17.25 5.99 17.25 5.99C17.79 7.36 17.45 8.37 17.35 8.62C17.99 9.32 18.38 10.22 18.38 11.31C18.38 15.15 16.04 16 13.81 16.24C14.17 16.55 14.49 17.17 14.49 18.12C14.49 19.48 14.48 20.58 14.48 20.91C14.48 21.18 14.66 21.5 15.17 21.4C19.14 20.07 22 16.33 22 11.917C22 6.484 17.522 2 12 2Z" fill="currentColor" />
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M22.5 11.5C21.5 11.5 20.5 12 20 13C19 12.5 18 12.5 17 13V12H14V9H17V6H14V3H11V6H8V9H5V12H2C1 14 1 17 3.5 19C7 21.5 15 21.5 19 18.5C21.5 16.5 22.5 14 22.5 11.5Z" fill="#2496ED" />
          <rect x="5.5" y="9.5" width="2" height="2" fill="#FFFFFF" />
          <rect x="8.5" y="9.5" width="2" height="2" fill="#FFFFFF" />
          <rect x="11.5" y="9.5" width="2" height="2" fill="#FFFFFF" />
          <rect x="8.5" y="6.5" width="2" height="2" fill="#FFFFFF" />
          <rect x="11.5" y="6.5" width="2" height="2" fill="#FFFFFF" />
          <rect x="11.5" y="3.5" width="2" height="2" fill="#FFFFFF" />
        </svg>
      );

    case 'cicd':
    case 'pipeline':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.5 7.5C20.5 9.5 20.5 12.5 18.5 14.5L14.5 18.5C12.5 20.5 9.5 20.5 7.5 18.5C5.5 16.5 5.5 13.5 7.5 11.5L11.5 7.5C13.5 5.5 16.5 5.5 18.5 7.5Z" />
          <circle cx="12" cy="12" r="2" fill="#22C55E" stroke="none" />
        </svg>
      );

    case 'aws':
    case 'amazon':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M7.5 10.5C6.5 10.5 5.5 11 5.5 12C5.5 13 6.5 13.5 7.5 13.5C8.5 13.5 9.5 13 9.5 12V10.5H7.5ZM11 14.5H9.5V13.8C9 14.5 8 14.8 7 14.8C5 14.8 3.8 13.5 3.8 11.8C3.8 10 5 8.8 7 8.8C8 8.8 9 9.1 9.5 9.7V9H11V14.5ZM12.5 9L13.8 14.5H15.2L16.2 10.5L17.2 14.5H18.6L20 9H18.5L17.7 12.8L16.7 9H15.7L14.7 12.8L14 9H12.5Z" fill="#FFFFFF" />
          <path d="M4 17.5C8.5 20.5 15.5 20.5 20 17.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18.5 16.5L20.5 17.8L18.8 19" fill="#FF9900" />
        </svg>
      );

    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 3L22 20.5H2L12 3Z" fill="currentColor" />
        </svg>
      );

    case 'netlify':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#00C7B7" />
          <path d="M12 6L6 12L12 18L18 12L12 6Z" fill="#05978B" />
        </svg>
      );

    case 'linux':
    case 'ubuntu':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <ellipse cx="12" cy="13" rx="7" ry="8" fill="#FCC624" />
          <circle cx="10" cy="10" r="1.2" fill="#000000" />
          <circle cx="14" cy="10" r="1.2" fill="#000000" />
          <path d="M10 13C11 14.5 13 14.5 14 13" stroke="#E65100" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="6" cy="17" rx="3" ry="1.5" fill="#E65100" />
          <ellipse cx="18" cy="17" rx="3" ry="1.5" fill="#E65100" />
        </svg>
      );

    // ----------------------------------------
    // UI/UX & DESIGN LOGOS
    // ----------------------------------------
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M8 2H12V7H8C6.62 7 5.5 5.88 5.5 4.5C5.5 3.12 6.62 2 8 2Z" fill="#F24E1E" />
          <path d="M12 2H16C17.38 2 18.5 3.12 18.5 4.5C18.5 5.88 17.38 7 16 7H12V2Z" fill="#FF7262" />
          <path d="M8 7H12V12H8C6.62 12 5.5 10.88 5.5 9.5C5.5 8.12 6.62 7 8 7Z" fill="#A259FF" />
          <path d="M12 7H16C17.38 7 18.5 8.12 18.5 9.5C18.5 10.88 17.38 12 16 12C14.62 12 13.5 10.88 13.5 9.5C13.5 9.5 13.5 9.5 13.5 9.5H12V7Z" fill="#1ABCFE" />
          <path d="M8 12H12V17C12 18.38 10.88 19.5 9.5 19.5C8.12 19.5 7 18.38 7 17C7 15.62 8.12 14.5 9.5 14.5H8V12Z" fill="#0ACF83" />
        </svg>
      );

    case 'uidesign':
    case 'ui':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#EC4899" fillOpacity="0.15" />
          <path d="M3 9H21" />
          <path d="M9 21V9" />
          <circle cx="6" cy="6" r="1" fill="#EC4899" />
        </svg>
      );

    case 'uxresearch':
    case 'ux':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" fill="#8B5CF6" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="#8B5CF6" />
        </svg>
      );

    case 'wireframe':
    case 'wireframing':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
          <rect x="6" y="6" width="12" height="4" rx="1" fill="#3B82F6" fillOpacity="0.2" />
          <rect x="6" y="13" width="5" height="5" rx="1" fill="#3B82F6" fillOpacity="0.2" />
          <rect x="13" y="13" width="5" height="5" rx="1" fill="#3B82F6" fillOpacity="0.2" />
        </svg>
      );

    case 'prototyping':
    case 'prototype':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="7" height="7" rx="1.5" fill="#10B981" fillOpacity="0.2" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" fill="#10B981" fillOpacity="0.2" />
          <path d="M11 7.5H16.5V13" />
          <path d="M15 11L16.5 13L18 11" />
        </svg>
      );

    case 'designsystem':
    case 'designsystems':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="2" fill="#F59E0B" fillOpacity="0.2" />
          <rect x="14" y="3" width="7" height="7" rx="2" fill="#F59E0B" fillOpacity="0.2" />
          <rect x="3" y="14" width="7" height="7" rx="2" fill="#F59E0B" fillOpacity="0.2" />
          <rect x="14" y="14" width="7" height="7" rx="2" fill="#F59E0B" fillOpacity="0.2" />
        </svg>
      );

    case 'visualdesign':
    case 'visual':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.1 22 14 21.1 14 20C14 19.5 13.8 19 13.5 18.6C13.2 18.2 13 17.7 13 17.2C13 16.1 13.9 15.2 15 15.2H17C19.76 15.2 22 12.96 22 10.2C22 5.67 17.52 2 12 2Z" fill="#D4AF37" />
          <circle cx="6.5" cy="11.5" r="1.5" fill="#FFFFFF" />
          <circle cx="9.5" cy="7.5" r="1.5" fill="#FFFFFF" />
          <circle cx="14.5" cy="7.5" r="1.5" fill="#FFFFFF" />
          <circle cx="17.5" cy="11.5" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="9" cy="9" r="2" />
          <path d="M15 15L9 9" />
        </svg>
      );
  }
};
