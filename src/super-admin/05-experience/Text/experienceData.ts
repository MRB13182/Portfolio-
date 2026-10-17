/**
 * 05 - EXPERIENCE (SUPER ADMIN)
 * 
 * Edit this file to add, modify, or update career work history, senior positions,
 * key accomplishments, enterprise impact metrics, and utilized technologies.
 */

import { ExperienceItem } from '../../../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    position: 'Senior Full Stack Engineer',
    company: 'OmniTech Solutions Global',
    location: 'Remote / Dhaka',
    duration: '2023 - Present',
    period: '2+ Years',
    type: 'Full-time',
    description: 'Leading the core web architecture team in building enterprise AI-driven web platforms and high-traffic customer interfaces.',
    achievements: [
      'Architected Next.js 15 migration reducing page load latency by 48% across 1.2M monthly active sessions.',
      'Mentored 8 junior and mid-level engineers in modern TypeScript, clean architecture, and test-driven development.',
      'Built reusable enterprise component library adopted across 6 cross-functional product squads.',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'System Design'],
  },
  {
    id: 'exp-2',
    position: 'Full Stack Developer',
    company: 'HyperScale Digital Lab',
    location: 'Dhaka, Bangladesh',
    duration: '2021 - 2023',
    period: '2 Years',
    type: 'Full-time',
    description: 'Developed scalable SaaS backends and high-fidelity frontends for fintech and luxury e-commerce clients.',
    achievements: [
      'Engineered high-performance REST and GraphQL APIs with Express and Node.js serving 500+ requests/sec.',
      'Integrated Stripe and PayPal checkout systems handling over $4M in cumulative transaction volume.',
      'Collaborated directly with UI/UX designers to implement pixel-perfect micro-animations using Framer Motion.',
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Figma', 'Framer Motion', 'REST APIs'],
  },
  {
    id: 'exp-3',
    position: 'Frontend & UI/UX Developer',
    company: 'Creative Nexus Studio',
    location: 'Dhaka, Bangladesh',
    duration: '2019 - 2021',
    period: '2 Years',
    type: 'Lead',
    description: 'Designed and implemented interactive web solutions, responsive marketing sites, and digital brand identities.',
    achievements: [
      'Delivered 25+ responsive client websites with 100% on-time project completion record.',
      'Improved core web vitals and Lighthouse audit scores from average 68 to 98+ across client deliverables.',
      'Created custom interactive SVG data visualizations and design systems in Figma.',
    ],
    skills: ['JavaScript', 'HTML5/CSS3', 'Figma', 'UI/UX Design', 'Tailwind CSS', 'Responsive Design'],
  },
];

export default experienceData;
