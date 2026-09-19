import { PortfolioConfig } from '../types';
import { defaultVerifiedCertificates } from '../utils/certificateAssets';
import { skills } from './skills';

export const assets = {
  logo: {
    light: '/logos/logo1.png',
    dark: '/logos/logo2.png',
  },
  profile: '/profile/profile.png',
  projects: [
    '/projects/project-1.webp',
    '/projects/project-2.webp',
    '/projects/project-3.webp',
    '/projects/project-4.webp',
    '/projects/project-5.webp',
    '/projects/project-6.webp',
  ],
  certificates: [
    '/certificate/cer1.png',
    '/certificate/cer2.png',
    '/certificate/cer3.png',
    '/certificate/cer4.png',
    '/certificate/cer5.png',
    '/certificate/cer6.png',
  ],
};

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'MD. MOSHIUR RAHMAN',
    firstName: 'Moshiur',
    lastName: 'Rahman',
    titles: [
      'Full Stack Developer',
      'UI/UX Designer',
      'Next.js & React Specialist',
      'Cloud & System Architect'
    ],
    bio: 'Crafting high-performance web applications, luxury digital experiences, and scalable cloud systems with meticulous attention to detail and modern engineering excellence.',
    extendedBio: 'I am a passionate Full Stack Software Engineer and UI/UX Designer with over 5+ years of hands-on expertise building enterprise-grade SaaS platforms, fluid web applications, and intuitive design systems. Blending technical rigor with Apple-level aesthetic sensibility, I architect robust end-to-end solutions that elevate brands and drive measurable business impact.',
    location: 'Dhaka, Bangladesh (Available Worldwide & Remote)',
    email: 'borshonsweb@gmail.com',
    phone: '+880 1700-000000',
    whatsappNumber: '+8801700000000',
    telegramUsername: 'moshiur_dev',
    availabilityStatus: 'Available for Full-time & High-Impact Projects',
    resumeUrl: '#resume-download',
    yearsOfExperience: 5,
  },

  assets: {
    logos: {
      light: '/logos/logo1.png',
      dark: '/logos/logo2.png',
    },
    profileImage: '/profile/profile.png',
  },

  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/MRB13182',
      icon: 'Github',
      color: '#24292e',
      actionType: 'link'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/moshiur-rahman',
      icon: 'Linkedin',
      color: '#0077b5',
      actionType: 'link'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/8801700000000',
      icon: 'MessageCircle',
      color: '#25D366',
      actionType: 'whatsapp'
    },
    {
      name: 'Telegram',
      url: 'https://t.me/moshiur_dev',
      icon: 'Send',
      color: '#229ED9',
      actionType: 'telegram'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/',
      icon: 'Facebook',
      color: '#1877F2',
      actionType: 'link'
    },
    {
      name: 'Email',
      url: 'mailto:borshonsweb@gmail.com',
      icon: 'Mail',
      color: '#EA4335',
      actionType: 'email'
    }
  ],

  stats: [
    {
      label: 'Years Experience',
      value: '5+',
      numericValue: 5,
      suffix: '+',
      description: 'Building modern web applications'
    },
    {
      label: 'Projects Completed',
      value: '50+',
      numericValue: 50,
      suffix: '+',
      description: 'Delivered for global clients'
    },
    {
      label: 'Happy Clients',
      value: '35+',
      numericValue: 35,
      suffix: '+',
      description: 'Worldwide satisfaction rate'
    },
    {
      label: 'Client Satisfaction',
      value: '99%',
      numericValue: 99,
      suffix: '%',
      description: 'Based on post-launch metrics'
    }
  ],

  skills: skills,

  projects: [
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
        'Export to Markdown, PDF, and interactive slide deck formats'
      ],
      architecture: [
        'Edge Runtime API middleware for instant model streaming',
        'PostgreSQL with pgvector for semantic retrieval & embeddings',
        'Secure token vault with AES-256 client credential encryption'
      ],
      liveUrl: 'https://example.com/apex-ai',
      githubUrl: 'https://github.com/moshiur-dev/apex-ai-workspace',
      featured: true
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
        'Multi-currency balance aggregation and automated tax reporting'
      ],
      architecture: [
        'TimescaleDB time-series database for ultra-fast metric lookups',
        'Node.js cluster worker pool for CPU-intensive mathematical modeling'
      ],
      liveUrl: 'https://example.com/quantum-fin',
      githubUrl: 'https://github.com/moshiur-dev/quantum-financial-engine',
      featured: true
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
        'Custom administrative portal with real-time stock sync'
      ],
      architecture: [
        'Headless architecture with localized edge caching',
        'Stripe webhooks with idempotency safeguards'
      ],
      liveUrl: 'https://example.com/luxe-commerce',
      githubUrl: 'https://github.com/moshiur-dev/luxe-commerce-suite',
      featured: true
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
        'Webhook alert routing to Slack, Discord, and Telegram'
      ],
      architecture: [
        'Stream ingestion pipeline processing 10k+ log events per second',
        'Columnar compression storage for long-term historical retention'
      ],
      liveUrl: 'https://example.com/aether-cloud',
      githubUrl: 'https://github.com/moshiur-dev/aether-cloud-analytics',
      featured: false
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
        'Dark mode luxury dashboard with ambient lighting controls'
      ],
      architecture: [
        'Client-side state caching with offline PWA synchronization',
        'Vector-based SVG instruments with hardware-accelerated animations'
      ],
      liveUrl: 'https://example.com/velocita',
      githubUrl: 'https://github.com/moshiur-dev/velocita-dashboard',
      featured: false
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
        'Secure encrypted local storage for all sensitive biometric records'
      ],
      architecture: [
        'Web Bluetooth API integration for wearable device telemetry',
        'End-to-end encrypted biometric database schema'
      ],
      liveUrl: 'https://example.com/pulse-health',
      githubUrl: 'https://github.com/moshiur-dev/pulse-health-web',
      featured: false
    }
  ],

  experience: [
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
        'Built reusable enterprise component library adopted across 6 cross-functional product squads.'
      ],
      skills: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'System Design']
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
        'Collaborated directly with UI/UX designers to implement pixel-perfect micro-animations using Framer Motion.'
      ],
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Figma', 'Framer Motion', 'REST APIs']
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
        'Created custom interactive SVG data visualizations and design systems in Figma.'
      ],
      skills: ['JavaScript', 'HTML5/CSS3', 'Figma', 'UI/UX Design', 'Tailwind CSS', 'Responsive Design']
    }
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science & Engineering (B.Sc CSE)',
      field: 'Computer Science & Software Engineering',
      institution: 'Leading University of Engineering & Technology',
      location: 'Dhaka, Bangladesh',
      duration: '2015 - 2019',
      grade: 'First Class Honors (CGPA: 3.84 / 4.0)',
      highlights: [
        'Specialized in Distributed Algorithms, Database Systems & Object Oriented Architecture',
        'Dean’s Honor List & Best Undergraduate Software Project Award Winner'
      ]
    }
  ],

  certificates: defaultVerifiedCertificates
};
