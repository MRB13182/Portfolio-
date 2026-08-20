import { PortfolioConfig } from '../types';

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
    '/certificates/certificate1.png',
    '/certificates/certificate2.png',
    '/certificates/certificate3.png',
  ],
  certificateLogos: {
    meta: '/certificates/logos/meta.png',
    google: '/certificates/logos/google.png',
    microsoft: '/certificates/logos/microsoft.png',
    aws: '/certificates/logos/aws.png',
    vercel: '/certificates/logos/vercel.png',
  }
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
      url: 'https://github.com',
      icon: 'Github',
      color: '#24292e',
      actionType: 'link'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
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
      url: 'https://facebook.com',
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

  skills: [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      level: 96,
      experienceDuration: '5 Years',
      iconName: 'Atom',
      description: 'Building declarative, reactive user interfaces with advanced state management, custom hooks, and concurrent rendering.',
      proficiencyHighlights: [
        'React 18 & 19 Concurrent Features',
        'Custom Hooks & Compound Components',
        'Zustand, Redux Toolkit & Context API',
        'Performance Profiling & Virtualization'
      ],
      projectsUsing: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Aether Cloud Analytics']
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Frontend',
      level: 94,
      experienceDuration: '4 Years',
      iconName: 'Zap',
      description: 'Developing high-speed full stack web applications with App Router, Server Components, SSR/SSG, and Edge runtime.',
      proficiencyHighlights: [
        'App Router & Server Actions',
        'Incremental Static Regeneration (ISR)',
        'Edge Functions & Middleware',
        'Dynamic SEO & OpenGraph Optimization'
      ],
      projectsUsing: ['Apex AI Workspace', 'Velocita Dashboard', 'Quantum Financial Engine']
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend',
      level: 92,
      experienceDuration: '4.5 Years',
      iconName: 'Code2',
      description: 'Writing strictly typed, maintainable, and bug-resistant enterprise code with generics, mapped types, and utility types.',
      proficiencyHighlights: [
        'Strict Type Safety & Generics',
        'Type Narrowing & Discriminated Unions',
        'API Contract Validation with Zod',
        'Complex Interface Architectures'
      ],
      projectsUsing: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Quantum Financial Engine', 'Aether Cloud Analytics']
    },
    {
      id: 'javascript',
      name: 'JavaScript (ES6+)',
      category: 'Frontend',
      level: 95,
      experienceDuration: '5+ Years',
      iconName: 'FileCode',
      description: 'Deep understanding of event loops, asynchronous programming, prototypes, closures, and modern ECMAScript standards.',
      proficiencyHighlights: [
        'Async/Await & Promises',
        'Web APIs & DOM Performance',
        'Functional Programming Paradigms',
        'Modern ESNext Features'
      ],
      projectsUsing: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Velocita Dashboard']
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 98,
      experienceDuration: '4 Years',
      iconName: 'Palette',
      description: 'Creating bespoke, responsive, and luxury design systems using modern Tailwind CSS with container queries and fluid typography.',
      proficiencyHighlights: [
        'Custom Design Tokens & Plugins',
        'Dark/Light Dual Theme Architecture',
        'Fluid Responsive Layouts',
        'Micro-interactions & Keyframe Animations'
      ],
      projectsUsing: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Quantum Financial Engine', 'Velocita Dashboard']
    },
    {
      id: 'html-css',
      name: 'HTML5 & Modern CSS',
      category: 'Frontend',
      level: 98,
      experienceDuration: '5+ Years',
      iconName: 'Layout',
      description: 'Semantic markup, accessibility (a11y) standards, CSS Grid, Flexbox, Subgrid, and CSS Custom Properties.',
      proficiencyHighlights: [
        'WCAG AA/AAA Accessibility',
        'CSS Grid & Complex Flexbox Layouts',
        'CSS Variables & Modern Selectors',
        'Responsive Web Design Standards'
      ],
      projectsUsing: ['All Projects']
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      level: 90,
      experienceDuration: '4 Years',
      iconName: 'Server',
      description: 'Architecting scalable server-side microservices, event-driven backends, stream processors, and REST/GraphQL APIs.',
      proficiencyHighlights: [
        'Event-Driven Architecture',
        'Streams, Buffers & File Systems',
        'Clustering & Process Management',
        'Microservices & Worker Threads'
      ],
      projectsUsing: ['Quantum Financial Engine', 'Aether Cloud Analytics', 'Velocita Dashboard']
    },
    {
      id: 'express',
      name: 'Express.js',
      category: 'Backend',
      level: 92,
      experienceDuration: '4 Years',
      iconName: 'Layers',
      description: 'Crafting robust RESTful APIs with secure middleware pipelines, rate-limiting, JWT authentication, and validation.',
      proficiencyHighlights: [
        'RESTful API Design & Versioning',
        'Auth Pipelines (JWT, OAuth2, RBAC)',
        'Custom Error Handling Middleware',
        'Security Headers & Rate Limiting'
      ],
      projectsUsing: ['Quantum Financial Engine', 'Luxe Commerce Suite']
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Database',
      level: 88,
      experienceDuration: '3.5 Years',
      iconName: 'Database',
      description: 'Designing high-throughput NoSQL document databases with indexing strategies, aggregation pipelines, and Mongoose ORM.',
      proficiencyHighlights: [
        'Aggregation Pipelines & Grouping',
        'Compound & Partial Index Optimization',
        'Mongoose Schema Validation',
        'Replica Sets & Sharding Concepts'
      ],
      projectsUsing: ['Luxe Commerce Suite', 'Velocita Dashboard']
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Database',
      level: 89,
      experienceDuration: '3 Years',
      iconName: 'Cpu',
      description: 'Relational data modeling, ACID transactions, complex joins, CTEs, and integration with Prisma & Drizzle ORM.',
      proficiencyHighlights: [
        'Relational Schema Design & Normalization',
        'Prisma & Drizzle ORM Integration',
        'ACID Transactions & Row-level Security',
        'Query Optimization & EXPLAIN ANALYZE'
      ],
      projectsUsing: ['Apex AI Workspace', 'Quantum Financial Engine', 'Aether Cloud Analytics']
    },
    {
      id: 'figma',
      name: 'Figma & UI/UX',
      category: 'Design & Tools',
      level: 92,
      experienceDuration: '4 Years',
      iconName: 'Figma',
      description: 'Translating product vision into luxury interfaces with comprehensive design systems, interactive prototypes, and auto-layout.',
      proficiencyHighlights: [
        'Design System & Component Tokens',
        'Interactive High-Fidelity Prototyping',
        'Auto Layout & Responsive Constraints',
        'Micro-interaction Wireframing'
      ],
      projectsUsing: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Quantum Financial Engine']
    },
    {
      id: 'docker-cloud',
      name: 'Docker & Cloud CI/CD',
      category: 'Cloud & DevOps',
      level: 86,
      experienceDuration: '3 Years',
      iconName: 'Boxes',
      description: 'Containerizing multi-tier applications, setting up automated CI/CD pipelines, and deploying to Cloud Run, Vercel, and AWS.',
      proficiencyHighlights: [
        'Multi-stage Dockerfile Optimization',
        'GitHub Actions CI/CD Automation',
        'GCP Cloud Run & Vercel Deployments',
        'Environment Secret Management'
      ],
      projectsUsing: ['Apex AI Workspace', 'Aether Cloud Analytics']
    }
  ],

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

  certificates: [
    {
      id: 'cert-1',
      title: 'Meta Certified Full Stack Developer Professional',
      issuer: 'Meta',
      issuerLogo: '/certificates/logos/meta.png',
      issueDate: 'August 2023',
      credentialId: 'META-FS-984210',
      credentialUrl: 'https://coursera.org/verify/professional-cert/meta-fullstack',
      image: '/certificates/certificate1.png',
      skills: ['React', 'Node.js', 'System Architecture', 'Database Engineering', 'API Design'],
      description: 'Comprehensive professional certification verifying advanced proficiency in modern full stack engineering, responsive user interfaces, relational and NoSQL databases, and cloud infrastructure.',
      verified: true
    },
    {
      id: 'cert-2',
      title: 'Google Professional Cloud Developer',
      issuer: 'Google Cloud',
      issuerLogo: '/certificates/logos/google.png',
      issueDate: 'November 2023',
      credentialId: 'GCP-DEV-652819',
      credentialUrl: 'https://google.accredible.com/cloud-developer',
      image: '/certificates/certificate2.png',
      skills: ['Google Cloud Platform', 'Cloud Run', 'Kubernetes', 'Serverless', 'DevOps'],
      description: 'Demonstrated expertise in architecting, building, and deploying highly scalable cloud-native microservices and data pipelines on Google Cloud Platform.',
      verified: true
    },
    {
      id: 'cert-3',
      title: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      issuerLogo: '/certificates/logos/microsoft.png',
      issueDate: 'March 2024',
      credentialId: 'MS-AZ-204-893120',
      credentialUrl: 'https://learn.microsoft.com/credentials/azure-developer-associate',
      image: '/certificates/certificate3.png',
      skills: ['Azure Cloud', 'App Services', 'Cosmos DB', 'Azure Functions', 'CI/CD Pipelines'],
      description: 'Validation of end-to-end cloud development capabilities, security hardening, compute solutions, and Azure SDK integrations.',
      verified: true
    },
    {
      id: 'cert-4',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      issuerLogo: '/certificates/logos/aws.png',
      issueDate: 'October 2023',
      credentialId: 'AWS-CCP-440912',
      credentialUrl: 'https://aws.amazon.com/verification',
      image: '/certificates/certificate1.png',
      skills: ['Cloud Architecture', 'ECS / Docker', 'S3 & CloudFront', 'Serverless Lambda'],
      description: 'Validation of cloud architecture fundamentals, containerized workload deployments, high availability setups, and cloud security best practices.',
      verified: true
    },
    {
      id: 'cert-5',
      title: 'Advanced React & Next.js Architecture Masterclass',
      issuer: 'Vercel / Next.js',
      issuerLogo: '/certificates/logos/vercel.png',
      issueDate: 'January 2024',
      credentialId: 'VERCEL-ADV-781923',
      credentialUrl: 'https://frontendmasters.com/certificates/react-next-adv',
      image: '/certificates/certificate2.png',
      skills: ['Next.js App Router', 'Server Components', 'Performance Optimization', 'Edge Runtime'],
      description: 'Advanced mastery in React 18/19 internals, concurrent mode, Next.js App Router paradigm, streaming SSR, and edge compute performance tuning.',
      verified: true
    }
  ]
};
