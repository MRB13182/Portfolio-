import React from 'react';

interface IssuerLogoProps {
  issuer: 'Google' | 'HubSpot' | 'Semrush' | 'IBM' | 'Meta' | string;
  className?: string;
  size?: number;
}

export const IssuerLogo: React.FC<IssuerLogoProps> = ({ issuer, className = 'w-6 h-6', size }) => {
  const norm = issuer.toLowerCase().trim();

  if (norm.includes('google')) {
    return (
      <svg 
        viewBox="0 0 48 48" 
        className={className} 
        style={size ? { width: size, height: size } : undefined}
        aria-label="Google"
      >
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.55 10.78l7.98-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    );
  }

  if (norm.includes('hubspot')) {
    return (
      <svg 
        viewBox="0 0 512 512" 
        className={className} 
        style={size ? { width: size, height: size } : undefined}
        aria-label="HubSpot"
      >
        <path 
          fill="#FF7A59" 
          d="M380.9 220.4V165c13.9-7.7 23.3-22.5 23.3-39.6 0-25.1-20.4-45.5-45.5-45.5s-45.5 20.4-45.5 45.5c0 17.1 9.4 31.9 23.3 39.6v55.4c-20.9 9.3-37.4 26.8-45.3 48.7l-97.1-56.1V178c13.9-7.7 23.3-22.5 23.3-39.6 0-25.1-20.4-45.5-45.5-45.5s-45.5 20.4-45.5 45.5c0 17.1 9.4 31.9 23.3 39.6v75.1c-13.9 7.7-23.3 22.5-23.3 39.6 0 17.1 9.4 31.9 23.3 39.6v75.1c-13.9 7.7-23.3 22.5-23.3 39.6 0 25.1 20.4 45.5 45.5 45.5s45.5-20.4 45.5-45.5c0-17.1-9.4-31.9-23.3-39.6v-34.9l97.1-56.1c8.1 22 24.6 39.6 45.6 48.8v55.4c-13.9 7.7-23.3 22.5-23.3 39.6 0 25.1 20.4 45.5 45.5 45.5s45.5-20.4 45.5-45.5c0-17.1-9.4-31.9-23.3-39.6v-55.4c34.9-15.5 59.3-50.5 59.3-91.1 0-40.6-24.4-75.6-59.3-91.1zm-22.2-117.8c12.6 0 22.8 10.2 22.8 22.8s-10.2 22.8-22.8 22.8-22.8-10.2-22.8-22.8 10.2-22.8 22.8-22.8zm-185.6 35.6c0-12.6 10.2-22.8 22.8-22.8s22.8 10.2 22.8 22.8-10.2 22.8-22.8 22.8-22.8-10.2-22.8-22.8zm0 216c0-12.6 10.2-22.8 22.8-22.8s22.8 10.2 22.8 22.8-10.2 22.8-22.8 22.8-22.8-10.2-22.8-22.8zm185.6 127.2c-12.6 0-22.8-10.2-22.8-22.8s10.2-22.8 22.8-22.8 22.8 10.2 22.8 22.8-10.2 22.8-22.8 22.8zm0-101.4c-37.4 0-67.8-30.4-67.8-67.8s30.4-67.8 67.8-67.8 67.8 30.4 67.8 67.8-30.4 67.8-67.8 67.8z"
        />
      </svg>
    );
  }

  if (norm.includes('semrush')) {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className} 
        style={size ? { width: size, height: size } : undefined}
        aria-label="Semrush"
      >
        <path 
          fill="#FF642D" 
          d="M50 8C26.8 8 8 26.8 8 50s18.8 42 42 42 42-18.8 42-42S73.2 8 50 8zm22.8 54.6c-4.4 7.6-13 12.8-22.8 12.8-14.6 0-26.4-11.8-26.4-26.4 0-14.6 11.8-26.4 26.4-26.4 9.8 0 18.4 5.2 22.8 12.8l-8.6 4.9c-2.7-4.7-7.9-7.9-14.2-7.9-8.9 0-16.2 7.2-16.2 16.6s7.2 16.6 16.2 16.6c6.3 0 11.5-3.2 14.2-7.9l8.6 4.9z"
        />
        <circle cx="50" cy="50" r="7" fill="#001026" />
      </svg>
    );
  }

  if (norm.includes('ibm')) {
    return (
      <svg 
        viewBox="0 0 300 120" 
        className={className} 
        style={size ? { width: size, height: size } : undefined}
        aria-label="IBM"
      >
        <g fill="#0F62FE">
          {/* IBM 8-bar iconic mark */}
          <rect x="10" y="10" width="60" height="8" />
          <rect x="10" y="24" width="60" height="8" />
          <rect x="25" y="38" width="30" height="8" />
          <rect x="25" y="52" width="30" height="8" />
          <rect x="25" y="66" width="30" height="8" />
          <rect x="25" y="80" width="30" height="8" />
          <rect x="10" y="94" width="60" height="8" />
          <rect x="10" y="108" width="60" height="8" />

          {/* B */}
          <path d="M90 10h55c8 0 14 5 14 11s-6 11-14 11h-40v14h40c8 0 14 5 14 11s-6 11-14 11h-40v14h45c9 0 16 6 16 12s-7 12-16 12H90V10z" />
          <path d="M170 10h16l24 38 24-38h16v106h-15V46l-20 32h-10l-20-32v70h-15V10z" />
        </g>
      </svg>
    );
  }

  if (norm.includes('meta')) {
    return (
      <svg 
        viewBox="0 0 512 512" 
        className={className} 
        style={size ? { width: size, height: size } : undefined}
        aria-label="Meta"
      >
        <path 
          fill="#0081FB" 
          d="M331.6 137.9c-29.2 0-56.1 14.1-75.6 37.6-19.5-23.5-46.4-37.6-75.6-37.6-60.7 0-110 49.3-110 110s49.3 110 110 110c37.5 0 70.8-18.7 90.7-47.3l-34.5-24.2c-13.6 19.5-36.2 32.2-61.9 32.2-41.5 0-75.2-33.7-75.2-75.2s33.7-75.2 75.2-75.2c28.2 0 52.8 15.6 65.7 38.6l30.9-20.9c-2.3-3.6-4.7-7-7.3-10.3 18.5-23.2 47-38.1 79.1-38.1 56 0 101.5 45.5 101.5 101.5s-45.5 101.5-101.5 101.5c-27.8 0-52.8-11.2-71-29.4l-25.1 25.1c25.4 25.4 60.5 41.1 99.3 41.1 77.7 0 140.7-63 140.7-140.7S409.3 137.9 331.6 137.9z"
        />
      </svg>
    );
  }

  // Fallback
  return (
    <div className={`rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs ${className}`}>
      {issuer.slice(0, 2).toUpperCase()}
    </div>
  );
};
