/**
 * 03 - PROJECTS (SUPER ADMIN)
 * 
 * Edit this file to add, modify, or reorganize portfolio projects.
 * Projects support multi-category filtering, tech stack tags, architecture
 * notes, live demo links, and GitHub repository links.
 */

import { Project } from '../../../types';

export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'Apex AI Workspace',
    category: 'AI & SaaS',
    tagline: 'Enterprise Multi-Modal AI Operating Suite with Real-time Collaboration',
    description: 'A cutting-edge generative AI platform designed for creative directors and enterprise teams. Features real-time neural streaming, multi-canvas document drafting, voice interactions, and custom LLM model fine-tuning dashboards.',
    image: '/projects/project-1.webp',
    fallbackGradient: 'from-emerald-600 via-teal-700 to-slate-900',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Gemini API', 'PostgreSQL', 'Prisma'],
    features: [
      'Multi-modal prompt chaining with real-time response token streaming',
      'Collaborative infinite canvas with zero-latency operational transform',
      'Custom fine-tuned agent workspace with role-based permission control',
      'Granular token usage telemetry & cost breakdown analytics',
      'Export to Markdown, PDF, and interactive slide deck formats',
    ],
    architecture: [
      'Edge Runtime API middleware for instant model streaming',
      'PostgreSQL with pgvector for semantic retrieval & embeddings',
      'Secure token vault with AES-256 client credential encryption',
    ],
    liveUrl: 'https://github.com/MRB13182',
    githubUrl: 'https://github.com/MRB13182',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Quantum Financial Engine',
    category: 'Full Stack',
    tagline: 'High-Frequency Algorithmic Portfolio & Trading Analytics Platform',
    description: 'An institutional-grade fintech dashboard offering real-time market data visualization, portfolio risk metrics, Monte Carlo simulations, and automated order execution workflows.',
    image: '/projects/project-2.webp',
    fallbackGradient: 'from-amber-600 via-purple-800 to-black',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'D3.js', 'Tailwind CSS'],
    features: [
      'Sub-millisecond chart updates via WebSockets and Canvas rendering',
      'Dynamic Value-at-Risk (VaR) and drawdown forecasting models',
      'Interactive backtesting suite with custom strategy script execution',
      'Multi-currency balance aggregation and automated tax reporting',
    ],
    architecture: [
      'TimescaleDB time-series database for ultra-fast metric lookups',
      'Node.js cluster worker pool for CPU-intensive mathematical modeling',
    ],
    liveUrl: 'https://github.com/MRB13182',
    githubUrl: 'https://github.com/MRB13182',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Luxe Commerce Suite',
    category: 'Full Stack',
    tagline: 'Ultra-Luxury Headless E-Commerce Experience for High Fashion',
    description: 'A bespoke digital storefront tailored for ultra-luxury brands. Built with Next.js App Router, smooth 3D product previews, instant checkout flow, and custom inventory management.',
    image: '/projects/project-3.webp',
    fallbackGradient: 'from-emerald-900 via-slate-900 to-emerald-950',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB', 'Framer Motion'],
    features: [
      'Immersive 3D product turntable with dynamic material rendering',
      'Optimistic cart mutations with 60fps micro-interaction animations',
      'Multi-region currency auto-detection and localized checkout',
      'Custom administrative portal with real-time stock sync',
    ],
    architecture: [
      'Headless architecture with localized edge caching',
      'Stripe webhooks with idempotency safeguards',
    ],
    liveUrl: 'https://github.com/MRB13182',
    githubUrl: 'https://github.com/MRB13182',
    featured: true,
  },
  {
    id: 'project-4',
    title: 'Aether Cloud Analytics',
    category: 'AI & SaaS',
    tagline: 'Distributed Serverless Telemetry & Intelligent Log Visualizer',
    description: 'A real-time DevOps observability platform monitoring microservice health, latency bottlenecks, serverless cold starts, and automated anomaly detection using machine learning models.',
    image: '/projects/project-4.webp',
    fallbackGradient: 'from-purple-950 via-slate-900 to-black',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    features: [
      'Visual dependency graph with live traffic heatmaps',
      'AI-driven root cause diagnostic suggestions for 5xx errors',
      'Customizable metric dashboard with drill-down query capabilities',
      'Webhook alert routing to Slack, Discord, and Telegram',
    ],
    architecture: [
      'Stream ingestion pipeline processing 10k+ log events per second',
      'Columnar compression storage for long-term historical retention',
    ],
    liveUrl: 'https://github.com/MRB13182',
    githubUrl: 'https://github.com/MRB13182',
    featured: false,
  },
  {
    id: 'project-5',
    title: 'Velocita Dashboard',
    category: 'UI / UX',
    tagline: 'Luxury Automotive Telematics & Fleet Performance System',
    description: 'An Apple-inspired connected car telemetry application providing hyper-detailed battery health diagnostics, autonomous drive metrics, climate scheduling, and trip replay simulations.',
    image: '/projects/project-5.webp',
    fallbackGradient: 'from-zinc-900 via-neutral-900 to-black',
    techStack: ['React', 'TypeScript', 'Figma', 'Tailwind CSS', 'Framer Motion', 'MongoDB'],
    features: [
      'Neomorphic and frosted glass vehicle HUD interface',
      'Interactive battery degradation and thermal management gauge',
      'Automated trip efficiency scoring and route optimization',
      'Dark mode luxury dashboard with ambient lighting controls',
    ],
    architecture: [
      'Client-side state caching with offline PWA synchronization',
      'Vector-based SVG instruments with hardware-accelerated animations',
    ],
    liveUrl: 'https://github.com/MRB13182',
    githubUrl: 'https://github.com/MRB13182',
    featured: false,
  },
  {
    id: 'project-6',
    title: 'Pulse Mobile Health',
    category: 'Mobile / Web',
    tagline: 'Biometric Wellness & Circadian Rhythm Optimization App',
    description: 'A progressive web application synchronizing biometric data from wearables to deliver actionable recovery scores, sleep stage breakdowns, and personalized daily routines.',
    image: '/projects/project-6.webp',
    fallbackGradient: 'from-teal-900 via-slate-900 to-emerald-900',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    features: [
      'Circadian sleep rhythm tracker with personalized wake windows',
      'Biometric HRV and recovery score algorithmic modeling',
      'Audio-guided breathwork cycles with rhythmic haptic feedback',
      'Secure encrypted local storage for all sensitive biometric records',
    ],
    architecture: [
      'Web Bluetooth API integration for wearable device telemetry',
      'End-to-end encrypted biometric database schema',
    ],
    liveUrl: 'https://github.com/MRB13182',
    githubUrl: 'https://github.com/MRB13182',
    featured: false,
  },
];

export default projectsData;
