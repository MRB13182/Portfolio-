/**
 * 01 - WEBSITE SETTINGS (SUPER ADMIN)
 * 
 * Edit this file to customize high-level website parameters, SEO metadata,
 * branding titles, and visual theme accents.
 * 
 * Changes committed here directly update the public website on deployment.
 */

export interface WebsiteSettingsConfig {
  siteTitle: string;
  websiteName: string;
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string;
  faviconUrl: string;
  ogImageUrl: string;
  contactEmail: string;
  activeTheme: 'dual' | 'dark' | 'light';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  hero: {
    greeting: string;
    headlinePrefix: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
  };
  navigation: {
    links: Array<{
      name: string;
      path: string;
    }>;
  };
  effects: {
    glassBlur: 'subtle' | 'balanced' | 'deep';
    glassOpacity: 'low' | 'medium' | 'high';
    borderGlow: boolean;
    showScrollProgress: boolean;
  };
  maintenanceMode: boolean;
  visitorCountBase: number;
}

export const websiteSettings: WebsiteSettingsConfig = {
  siteTitle: 'MD. MOSHIUR RAHMAN | Senior Full-Stack & AI Systems Architect',
  websiteName: 'MR Portfolio',
  metaTitle: 'MD. MOSHIUR RAHMAN — Senior Full-Stack & AI Systems Architect',
  metaDescription: 'Executive portfolio of Moshiur Rahman: Senior Full-Stack Engineer, UI/UX Designer, and Cloud & System Architect specializing in React, Next.js, AI systems, and luxury digital experiences.',
  seoKeywords: 'Full Stack Developer, UI/UX Designer, React Specialist, Next.js Architect, TypeScript, Cloud Systems, Portfolio',
  faviconUrl: '/favicon.ico',
  ogImageUrl: '/og-image.png',
  contactEmail: 'borshonsweb@gmail.com',
  activeTheme: 'dual',
  colors: {
    primary: '#00E5FF',
    secondary: '#8B5CF6',
    accent: '#00E5FF',
  },
  hero: {
    greeting: 'Hello, I am',
    headlinePrefix: 'Building scalable systems with',
    ctaPrimaryText: 'Explore Projects',
    ctaPrimaryLink: '/projects',
    ctaSecondaryText: 'Contact Me',
    ctaSecondaryLink: '/contact',
  },
  navigation: {
    links: [
      { name: 'Home', path: '/' },
      { name: 'Skills', path: '/skills' },
      { name: 'Projects', path: '/projects' },
      { name: 'Certificates', path: '/certificates' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  effects: {
    glassBlur: 'balanced',
    glassOpacity: 'medium',
    borderGlow: true,
    showScrollProgress: true,
  },
  maintenanceMode: false,
  visitorCountBase: 1240,
};

export default websiteSettings;
