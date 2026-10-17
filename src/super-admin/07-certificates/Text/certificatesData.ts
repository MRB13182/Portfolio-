/**
 * 07 - CERTIFICATES (SUPER ADMIN)
 * 
 * Edit this file to add, modify, or update verified professional credentials,
 * credential IDs, issuers, skills acquired, and verification links.
 */

import { Certificate } from '../../../types';

export const certificatesData: Certificate[] = [
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
    verified: true,
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
    verified: true,
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
    verified: true,
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
    verified: true,
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
    verified: true,
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
    verified: true,
  },
];

export default certificatesData;
