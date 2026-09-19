/// <reference types="vite/client" />
import { Certificate } from '../types';

/**
 * Canonical certificate asset registry.
 *
 * The portfolio uses `/public/certificate/` as the single runtime asset directory.
 * 1. cer1.png -> Google AI Professional Certificate (Google)
 * 2. cer2.png -> Google UX Design Professional Certificate (Google)
 * 3. cer3.png -> IBM Full Stack Software Developer Professional Certificate (IBM)
 * 4. cer4.png -> Meta Front-End Developer Professional Certificate (Meta)
 * 5. cer5.png -> HubSpot SEO Certification (HubSpot)
 * 6. cer6.png -> Semrush SEO Certification (Semrush)
 */

export const authenticCertificateRegistry: Record<string, {
  title: string;
  issuer: 'Google' | 'IBM' | 'Meta' | 'HubSpot' | 'Semrush' | string;
  category: string;
  issueDate?: string;
  credentialId?: string;
  theme?: string;
  accent?: string;
  skills?: string[];
  description?: string;
}> = {
  // cer1 / Cer1
  'cer1.png': {
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    category: 'AI & Machine Learning',
    issueDate: 'Verified Credential',
    credentialId: 'GOOG-AI-948102',
    accent: '#4285F4',
    skills: ['Generative AI', 'Gemini API', 'Machine Learning', 'Prompt Engineering', 'AI Architecture'],
    description: 'Professional credential validating foundational and advanced expertise in applied artificial intelligence, generative AI models, neural architectures, and intelligent application engineering.'
  },
  'Cer1.png': {
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    category: 'AI & Machine Learning',
    issueDate: 'Verified Credential',
    credentialId: 'GOOG-AI-948102',
    accent: '#4285F4',
    skills: ['Generative AI', 'Gemini API', 'Machine Learning', 'Prompt Engineering', 'AI Architecture'],
    description: 'Professional credential validating foundational and advanced expertise in applied artificial intelligence, generative AI models, neural architectures, and intelligent application engineering.'
  },

  // cer2 / Cer2
  'cer2.png': {
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    category: 'UI/UX Design',
    issueDate: 'Verified Credential',
    credentialId: 'GOOG-UX-823190',
    accent: '#34A853',
    skills: ['Figma Design Systems', 'User Research', 'Wireframing', 'Interactive Prototyping', 'Accessibility (WCAG)'],
    description: 'Comprehensive human-centered design certification covering rigorous user research, accessible interface architecture, wireframing, high-fidelity interactive prototyping, and design system governance.'
  },
  'Cer2.png': {
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    category: 'UI/UX Design',
    issueDate: 'Verified Credential',
    credentialId: 'GOOG-UX-823190',
    accent: '#34A853',
    skills: ['Figma Design Systems', 'User Research', 'Wireframing', 'Interactive Prototyping', 'Accessibility (WCAG)'],
    description: 'Comprehensive human-centered design certification covering rigorous user research, accessible interface architecture, wireframing, high-fidelity interactive prototyping, and design system governance.'
  },

  // cer3 / Cer3
  'cer3.png': {
    title: 'IBM Full Stack Software Developer Professional Certificate',
    issuer: 'IBM',
    category: 'Full Stack Development',
    issueDate: 'Verified Credential',
    credentialId: 'IBM-FSD-661904',
    accent: '#0F62FE',
    skills: ['Cloud Native Architecture', 'Node.js & Express', 'React Frontend', 'Microservices', 'Docker & CI/CD', 'REST APIs'],
    description: 'Enterprise full stack certification validating competencies in cloud-native software engineering, scalable backend microservices, containerization, and modern TypeScript workflows.'
  },
  'Cer3.png': {
    title: 'IBM Full Stack Software Developer Professional Certificate',
    issuer: 'IBM',
    category: 'Full Stack Development',
    issueDate: 'Verified Credential',
    credentialId: 'IBM-FSD-661904',
    accent: '#0F62FE',
    skills: ['Cloud Native Architecture', 'Node.js & Express', 'React Frontend', 'Microservices', 'Docker & CI/CD', 'REST APIs'],
    description: 'Enterprise full stack certification validating competencies in cloud-native software engineering, scalable backend microservices, containerization, and modern TypeScript workflows.'
  },

  // cer4 / Cer4
  'cer4.png': {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    category: 'Frontend Engineering',
    issueDate: 'Verified Credential',
    credentialId: 'META-FED-339182',
    accent: '#0081FB',
    skills: ['React & Next.js', 'Advanced JavaScript (ES6+)', 'State Management', 'UI/UX Engineering', 'Core Web Vitals'],
    description: 'Advanced frontend accreditation validating mastery in modern JavaScript, React application architecture, responsive design, testing methodologies, and sub-second performance optimization.'
  },
  'Cer4.png': {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    category: 'Frontend Engineering',
    issueDate: 'Verified Credential',
    credentialId: 'META-FED-339182',
    accent: '#0081FB',
    skills: ['React & Next.js', 'Advanced JavaScript (ES6+)', 'State Management', 'UI/UX Engineering', 'Core Web Vitals'],
    description: 'Advanced frontend accreditation validating mastery in modern JavaScript, React application architecture, responsive design, testing methodologies, and sub-second performance optimization.'
  },

  // cer5 / Cer5
  'cer5.png': {
    title: 'HubSpot SEO Certification',
    issuer: 'HubSpot',
    category: 'SEO & Search Strategy',
    issueDate: 'Verified Credential',
    credentialId: 'HUB-SEO-581932',
    accent: '#FF7A59',
    skills: ['Technical SEO', 'Content Strategy', 'Keyword Modeling', 'On-Page Optimization', 'Organic Growth'],
    description: 'Industry-standard accreditation covering technical search engine optimization, content architecture, keyword clustering, link acquisition, and Google algorithm optimization.'
  },
  'Cer5.png': {
    title: 'HubSpot SEO Certification',
    issuer: 'HubSpot',
    category: 'SEO & Search Strategy',
    issueDate: 'Verified Credential',
    credentialId: 'HUB-SEO-581932',
    accent: '#FF7A59',
    skills: ['Technical SEO', 'Content Strategy', 'Keyword Modeling', 'On-Page Optimization', 'Organic Growth'],
    description: 'Industry-standard accreditation covering technical search engine optimization, content architecture, keyword clustering, link acquisition, and Google algorithm optimization.'
  },

  // cer6 / Cer6
  'cer6.png': {
    title: 'Semrush SEO Certification',
    issuer: 'Semrush',
    category: 'Search Analytics & Audit',
    issueDate: 'Verified Credential',
    credentialId: 'SEM-SEO-771204',
    accent: '#FF642D',
    skills: ['Technical Site Audit', 'Competitive Intelligence', 'SERP Tracking', 'Backlink Audit', 'Search Telemetry'],
    description: 'Specialized certification in deep technical website auditing, competitive keyword intelligence, backlink profile analysis, and SERP visibility optimization.'
  },
  'Cer6.png': {
    title: 'Semrush SEO Certification',
    issuer: 'Semrush',
    category: 'Search Analytics & Audit',
    issueDate: 'Verified Credential',
    credentialId: 'SEM-SEO-771204',
    accent: '#FF642D',
    skills: ['Technical Site Audit', 'Competitive Intelligence', 'SERP Tracking', 'Backlink Audit', 'Search Telemetry'],
    description: 'Specialized certification in deep technical website auditing, competitive keyword intelligence, backlink profile analysis, and SERP visibility optimization.'
  }
};

/**
 * Strict verified credentials in the EXACT specified order:
 * 1. Google AI Professional Certificate
 * 2. Google UX Design Professional Certificate
 * 3. IBM Full Stack Software Developer Professional Certificate
 * 4. Meta Front-End Developer Professional Certificate
 * 5. HubSpot SEO Certification
 * 6. Semrush SEO Certification
 */
export const defaultVerifiedCertificates: Certificate[] = [
  {
    id: 'cert-1',
    image: '/certificate/cer1.png',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    category: 'AI & Machine Learning',
    issueDate: 'Verified Credential',
    credentialId: 'GOOG-AI-948102',
    accent: '#4285F4',
    skills: ['Generative AI', 'Gemini API', 'Machine Learning', 'Prompt Engineering', 'AI Architecture'],
    description: 'Professional credential validating foundational and advanced expertise in applied artificial intelligence, generative AI models, neural architectures, and intelligent application engineering.',
    verified: true
  },
  {
    id: 'cert-2',
    image: '/certificate/cer2.png',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    category: 'UI/UX Design',
    issueDate: 'Verified Credential',
    credentialId: 'GOOG-UX-823190',
    accent: '#34A853',
    skills: ['Figma Design Systems', 'User Research', 'Wireframing', 'Interactive Prototyping', 'Accessibility (WCAG)'],
    description: 'Comprehensive human-centered design certification covering rigorous user research, accessible interface architecture, wireframing, high-fidelity interactive prototyping, and design system governance.',
    verified: true
  },
  {
    id: 'cert-3',
    image: '/certificate/cer3.png',
    title: 'IBM Full Stack Software Developer Professional Certificate',
    issuer: 'IBM',
    category: 'Full Stack Development',
    issueDate: 'Verified Credential',
    credentialId: 'IBM-FSD-661904',
    accent: '#0F62FE',
    skills: ['Cloud Native Architecture', 'Node.js & Express', 'React Frontend', 'Microservices', 'Docker & CI/CD', 'REST APIs'],
    description: 'Enterprise full stack certification validating competencies in cloud-native software engineering, scalable backend microservices, containerization, and modern TypeScript workflows.',
    verified: true
  },
  {
    id: 'cert-4',
    image: '/certificate/cer4.png',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    category: 'Frontend Engineering',
    issueDate: 'Verified Credential',
    credentialId: 'META-FED-339182',
    accent: '#0081FB',
    skills: ['React & Next.js', 'Advanced JavaScript (ES6+)', 'State Management', 'UI/UX Engineering', 'Core Web Vitals'],
    description: 'Advanced frontend accreditation validating mastery in modern JavaScript, React application architecture, responsive design, testing methodologies, and sub-second performance optimization.',
    verified: true
  },
  {
    id: 'cert-5',
    image: '/certificate/cer5.png',
    title: 'HubSpot SEO Certification',
    issuer: 'HubSpot',
    category: 'SEO & Search Strategy',
    issueDate: 'Verified Credential',
    credentialId: 'HUB-SEO-581932',
    accent: '#FF7A59',
    skills: ['Technical SEO', 'Content Strategy', 'Keyword Modeling', 'On-Page Optimization', 'Organic Growth'],
    description: 'Industry-standard accreditation covering technical search engine optimization, content architecture, keyword clustering, link acquisition, and Google algorithm optimization.',
    verified: true
  },
  {
    id: 'cert-6',
    image: '/certificate/cer6.png',
    title: 'Semrush SEO Certification',
    issuer: 'Semrush',
    category: 'Search Analytics & Audit',
    issueDate: 'Verified Credential',
    credentialId: 'SEM-SEO-771204',
    accent: '#FF642D',
    skills: ['Technical Site Audit', 'Competitive Intelligence', 'SERP Tracking', 'Backlink Audit', 'Search Telemetry'],
    description: 'Specialized certification in deep technical website auditing, competitive keyword intelligence, backlink profile analysis, and SERP visibility optimization.',
    verified: true
  }
];

export const detectedCertificates: Certificate[] = defaultVerifiedCertificates;

/**
 * Resolves a certificate image path safely
 */
export function resolveCertificateImage(pathOrFilename: string): string {
  if (!pathOrFilename) return '/certificate/cer1.png';
  if (pathOrFilename.startsWith('/')) return pathOrFilename;
  return `/certificate/${pathOrFilename}`;
}
