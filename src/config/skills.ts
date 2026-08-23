import { Skill } from '../types';

/**
 * 44+ Industry-Grade Technical Skills Matrix
 * Organized by Frontend, Backend, Database, Cloud & DevOps, and UI/UX & Design.
 */
export const skills: Skill[] = [
  // ==========================================
  // 1. FRONTEND DEVELOPMENT (14 Skills)
  // ==========================================
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend Development',
    level: 98,
    logo: 'html5',
    experience: '6 Years',
    experienceDuration: '6 Years',
    accentColor: '#E34F26',
    description: 'Mastery in modern semantic HTML5 markup, ARIA accessibility standards, document outlines, web components, and optimized DOM structures.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Velocita Dashboard', 'Portfolio Platform'],
    proficiencyHighlights: [
      'Semantic Structure & Document Outlines',
      'Microdata & OpenGraph Integration',
      'WCAG 2.1 AA/AAA Compliance',
      'Web Components & Shadow DOM'
    ],
    keywords: ['html', 'html5', 'markup', 'semantic', 'web', 'dom', 'accessibility', 'frontend']
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend Development',
    level: 96,
    logo: 'css3',
    experience: '6 Years',
    experienceDuration: '6 Years',
    accentColor: '#1572B6',
    description: 'Expertise in modern CSS3, CSS Grid, complex Flexbox architectures, Subgrid, CSS variables (custom properties), and GPU-accelerated transitions.',
    projects: ['Luxe Commerce Suite', 'Apex AI Workspace', 'SaaS Application'],
    proficiencyHighlights: [
      'CSS Grid & Multi-axis Flexbox Layouts',
      'Custom Properties (CSS Variables)',
      'Subgrid & Container Queries',
      'Keyframe Animations & 3D Transforms'
    ],
    keywords: ['css', 'css3', 'styles', 'stylesheet', 'grid', 'flexbox', 'animations', 'frontend']
  },
  {
    id: 'javascript',
    name: 'JavaScript ES6+',
    category: 'Frontend Development',
    level: 97,
    logo: 'javascript',
    experience: '5+ Years',
    experienceDuration: '5+ Years',
    accentColor: '#F7DF1E',
    description: 'Deep mastery of modern JavaScript (ESNext), asynchronous event loops, closures, prototype chains, promises, generators, and memory management.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Velocita Dashboard', 'Quantum Financial Engine'],
    proficiencyHighlights: [
      'Event Loop & Asynchronous Microtasks',
      'Closures, Prototypes & Currying',
      'Modern ES2024+ Syntax & Modules',
      'V8 Engine Profiling & Garbage Collection'
    ],
    keywords: ['javascript', 'js', 'es6', 'esnext', 'ecmascript', 'frontend', 'scripting', 'programming']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend Development',
    level: 95,
    logo: 'typescript',
    experience: '4+ Years',
    experienceDuration: '4+ Years',
    accentColor: '#3178C6',
    description: 'Strictly typed engineering across full stack systems. Expertise in advanced generics, conditional types, mapped types, discriminated unions, and Zod inference.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Quantum Financial Engine', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Strict Type Safety & Generics',
      'Discriminated Unions & Type Narrowing',
      'Mapped, Conditional & Template Literal Types',
      'Zod Schema Inference & Runtime Validation'
    ],
    keywords: ['typescript', 'ts', 'types', 'type safety', 'generics', 'frontend', 'backend']
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend Development',
    level: 96,
    logo: 'react',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#61DAFB',
    description: 'React.js is a modern frontend library used for building scalable, high-performance, and interactive user interfaces with reusable components and concurrent rendering.',
    projects: ['Portfolio Platform', 'Dashboard System', 'SaaS Application', 'Apex AI Workspace'],
    proficiencyHighlights: [
      'React 18 & 19 Concurrent Features',
      'Custom Hooks & Compound Component Patterns',
      'Virtual DOM Optimization & Memoization',
      'Context API & Modular State Architecture'
    ],
    keywords: ['react', 'reactjs', 'react.js', 'frontend', 'ui', 'components', 'jsx', 'tsx', 'spa']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend Development',
    level: 94,
    logo: 'nextjs',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#000000',
    description: 'Building production-grade web applications using Next.js App Router, React Server Components (RSC), Server Actions, ISR, and edge middleware.',
    projects: ['Apex AI Workspace', 'Velocita Dashboard', 'Quantum Financial Engine', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'App Router & React Server Components (RSC)',
      'Server Actions & Edge Middleware',
      'Incremental Static Regeneration (ISR)',
      'Sub-second Lighthouse Performance & Core Web Vitals'
    ],
    keywords: ['next', 'nextjs', 'next.js', 'ssr', 'ssg', 'server components', 'fullstack', 'frontend']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend Development',
    level: 98,
    logo: 'tailwind',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#06B6D4',
    description: 'Crafting bespoke design systems and pixel-perfect luxury interfaces with utility-first Tailwind CSS, custom design tokens, container queries, and responsive variants.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Velocita Dashboard', 'Quantum Financial Engine'],
    proficiencyHighlights: [
      'Custom Design Token Architecture',
      'Dark/Light Dual Theme Systems',
      'Fluid Typography & Responsive Variants',
      'JIT Compiler & Plugin Configuration'
    ],
    keywords: ['tailwind', 'tailwindcss', 'css', 'utility', 'design system', 'styling', 'frontend']
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'Frontend Development',
    level: 90,
    logo: 'bootstrap',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#7952B3',
    description: 'Rapid prototyping and responsive layout development using Bootstrap grid systems, utility classes, customized SCSS variables, and accessible UI components.',
    projects: ['Legacy Portal Migration', 'Admin ERP Dashboard'],
    proficiencyHighlights: [
      'SCSS Variable Theming & Overrides',
      '12-Column Responsive Grid System',
      'Accessible Modal & Navigation Components',
      'Cross-browser Compatibility'
    ],
    keywords: ['bootstrap', 'css', 'framework', 'responsive', 'ui', 'frontend']
  },
  {
    id: 'redux',
    name: 'Redux Toolkit',
    category: 'Frontend Development',
    level: 92,
    logo: 'redux',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#764ABC',
    description: 'Centralized global state management with Redux Toolkit (RTK), RTK Query for data caching, slices, immutable state updates, and middleware integration.',
    projects: ['Quantum Financial Engine', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'RTK Slices & Immutability with Immer',
      'RTK Query Automated Caching & Invalidation',
      'Async Thunks & Custom Middleware',
      'Redux DevTools State Hydration'
    ],
    keywords: ['redux', 'redux toolkit', 'rtk', 'state', 'state management', 'frontend', 'store']
  },
  {
    id: 'reactquery',
    name: 'React Query',
    category: 'Frontend Development',
    level: 94,
    logo: 'reactquery',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#FF4154',
    description: 'Server state orchestration using TanStack React Query. Automatic background refetching, cache hydration, optimistic mutations, and paginated infinite queries.',
    projects: ['Apex AI Workspace', 'Velocita Dashboard', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Optimistic Updates & Mutation Rollbacks',
      'Stale-While-Revalidate Caching Logic',
      'Infinite Query Pagination & Prefetching',
      'Zero-latency Cache Invalidation Strategies'
    ],
    keywords: ['react query', 'tanstack query', 'caching', 'server state', 'data fetching', 'frontend']
  },
  {
    id: 'framermotion',
    name: 'Framer Motion',
    category: 'Frontend Development',
    level: 93,
    logo: 'framermotion',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#0055FF',
    description: 'Orchestrating 60fps physics-based web animations, gesture recognition, layout transitions, exit effects, and scroll-linked micro-interactions.',
    projects: ['Apex AI Workspace', 'Portfolio Platform', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'Spring Physics & Layout Shared Transitions',
      'Scroll-Linked Parallax & Scroll Triggers',
      'SVG Path & Morphing Animations',
      'Reduced Motion & Accessible Animations'
    ],
    keywords: ['framer motion', 'motion', 'animation', 'gestures', 'transitions', 'frontend', 'ui']
  },
  {
    id: 'responsive',
    name: 'Responsive Design',
    category: 'Frontend Development',
    level: 98,
    logo: 'responsive',
    experience: '6 Years',
    experienceDuration: '6 Years',
    accentColor: '#10B981',
    description: 'Mobile-first responsive architecture ensuring flawless cross-device layout adaptation across ultra-wide desktop screens, tablets, foldables, and mobile viewports.',
    projects: ['All Portfolio Projects', 'Luxe Commerce Suite', 'Apex AI Workspace'],
    proficiencyHighlights: [
      'Mobile-First Layout Paradigm',
      'Fluid Container Queries & Clamp Scaling',
      'Adaptive Touch Targets (44px Minimum)',
      'Cross-DPI Retina Asset Rendering'
    ],
    keywords: ['responsive', 'mobile', 'mobile friendly', 'adaptive', 'cross device', 'frontend', 'css']
  },
  {
    id: 'a11y',
    name: 'Web Accessibility',
    category: 'Frontend Development',
    level: 91,
    logo: 'a11y',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#0085FF',
    description: 'Implementing WCAG 2.1 AA/AAA accessibility compliance, screen reader support, keyboard navigation focus traps, and high-contrast color verification.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Portfolio Platform'],
    proficiencyHighlights: [
      'WCAG 2.1 Level AA/AAA Conformance',
      'WAI-ARIA Attributes & Landmark Roles',
      'Keyboard Focus Management & Trap Focus',
      'Automated Lighthouse & Axe Accessibility Testing'
    ],
    keywords: ['accessibility', 'a11y', 'wcag', 'aria', 'screen reader', 'keyboard', 'frontend']
  },
  {
    id: 'seo',
    name: 'SEO Optimization',
    category: 'Frontend Development',
    level: 92,
    logo: 'seo',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#F59E0B',
    description: 'Technical search engine optimization: dynamic OpenGraph/Twitter cards, JSON-LD structured schema markup, sitemap generation, canonical tags, and sub-second Core Web Vitals.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Portfolio Platform'],
    proficiencyHighlights: [
      'JSON-LD Structured Data Schema Markup',
      'Dynamic OpenGraph & Meta Tags',
      'Core Web Vitals (LCP, FID, CLS, INP) Optimization',
      'Robots.txt & XML Sitemap Automation'
    ],
    keywords: ['seo', 'search engine optimization', 'core web vitals', 'metadata', 'opengraph', 'frontend']
  },

  // ==========================================
  // 2. BACKEND DEVELOPMENT (9 Skills)
  // ==========================================
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend Development',
    level: 95,
    logo: 'nodejs',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#339933',
    description: 'Building asynchronous, event-driven backend services, worker threads, stream processors, and high-concurrency microservice architectures in Node.js.',
    projects: ['Quantum Financial Engine', 'Aether Cloud Analytics', 'Velocita Dashboard'],
    proficiencyHighlights: [
      'Non-blocking Event Loop & Libuv Architecture',
      'Node.js Streams & Buffer Management',
      'Clustering, Worker Threads & Child Processes',
      'Native Crypto & Secure Token Verification'
    ],
    keywords: ['node', 'nodejs', 'node.js', 'backend', 'server', 'runtime', 'javascript', 'api']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend Development',
    level: 94,
    logo: 'express',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#404040',
    description: 'Architecting fast, modular RESTful APIs with secure middleware pipelines, rate-limiting, CORS policies, JWT/OAuth2 authentication, and error interception.',
    projects: ['Quantum Financial Engine', 'Luxe Commerce Suite', 'SaaS Platform'],
    proficiencyHighlights: [
      'Modular Routing & Middleware Chains',
      'Security Hardening (Helmet, Rate Limiter, CORS)',
      'Centralized Error Interception & Logging',
      'Request Validation Pipelines (Zod / Joi)'
    ],
    keywords: ['express', 'expressjs', 'express.js', 'backend', 'rest', 'api', 'server']
  },
  {
    id: 'nestjs',
    name: 'Nest.js',
    category: 'Backend Development',
    level: 90,
    logo: 'nestjs',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#E0234E',
    description: 'Enterprise TypeScript server architecture using NestJS modular structure, dependency injection, decorators, guards, interceptors, and Swagger documentation.',
    projects: ['Enterprise ERP Core', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Inversion of Control (IoC) & Dependency Injection',
      'Guards, Interceptors & Custom Decorators',
      'Microservice Transports (TCP, Redis, gRPC)',
      'Automated OpenAPI Swagger Generation'
    ],
    keywords: ['nest', 'nestjs', 'nest.js', 'backend', 'typescript', 'architecture', 'enterprise']
  },
  {
    id: 'restapi',
    name: 'REST API',
    category: 'Backend Development',
    level: 98,
    logo: 'restapi',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#009688',
    description: 'Designing RESTful web APIs adhering to Richardson Maturity Model standards: semantic HTTP status codes, idempotent verbs, pagination, and HATEOAS.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Quantum Financial Engine'],
    proficiencyHighlights: [
      'Stateless Resource-Oriented Architecture',
      'Idempotent HTTP Methods & Caching Headers',
      'Cursor-based & Offset Pagination Models',
      'Granular RFC 7807 Error Responses'
    ],
    keywords: ['rest', 'rest api', 'restful', 'api', 'http', 'json', 'endpoints', 'backend']
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'Backend Development',
    level: 89,
    logo: 'graphql',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#E10098',
    description: 'Designing GraphQL schemas, strongly typed queries, mutations, subscriptions, DataLoader batching to eliminate N+1 queries, and Apollo/Yoga servers.',
    projects: ['Aether Cloud Analytics', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'Schema-First & Code-First Schema Design',
      'DataLoader Batching & N+1 Problem Prevention',
      'Real-time Subscriptions with WebSockets',
      'Query Complexity Cost Analysis & Depth Limiting'
    ],
    keywords: ['graphql', 'gql', 'apollo', 'query', 'mutations', 'backend', 'api']
  },
  {
    id: 'auth',
    name: 'Authentication',
    category: 'Backend Development',
    level: 95,
    logo: 'auth',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#10B981',
    description: 'Implementing battle-tested authentication mechanisms including JWT tokens, HTTP-only secure cookie sessions, OAuth 2.0 flows, and multi-factor authentication (MFA).',
    projects: ['Apex AI Workspace', 'Quantum Financial Engine', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'OAuth 2.0 & OpenID Connect (OIDC) Protocols',
      'JWT Access & Refresh Token Rotation',
      'HTTP-Only Secure Cookie Session Vaults',
      'Multi-Factor Authentication (TOTP / SMS)'
    ],
    keywords: ['auth', 'authentication', 'jwt', 'oauth', 'session', 'login', 'security', 'backend']
  },
  {
    id: 'authorization',
    name: 'Authorization',
    category: 'Backend Development',
    level: 94,
    logo: 'authorization',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#6366F1',
    description: 'Fine-grained access control architecture: Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), and database Row-Level Security (RLS).',
    projects: ['Apex AI Workspace', 'Quantum Financial Engine'],
    proficiencyHighlights: [
      'Role-Based Access Control (RBAC) Hierarchies',
      'Attribute-Based Access Control (ABAC) Policies',
      'PostgreSQL Row-Level Security (RLS) Enforcements',
      'Permission Gate Middleware & Route Guards'
    ],
    keywords: ['authorization', 'rbac', 'abac', 'permissions', 'roles', 'security', 'backend']
  },
  {
    id: 'apidesign',
    name: 'API Design',
    category: 'Backend Development',
    level: 96,
    logo: 'apidesign',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#85EA2D',
    description: 'End-to-end API design and contract governance with OpenAPI 3.0 / Swagger specs, backward compatibility versioning, and client SDK generation.',
    projects: ['Apex AI Workspace', 'Velocita Dashboard', 'Quantum Financial Engine'],
    proficiencyHighlights: [
      'OpenAPI 3.0 & Swagger Specification Authoring',
      'API Versioning Strategies (URI, Header, Media Type)',
      'Automated TypeScript SDK & Client Generation',
      'Contract-First Development Workflows'
    ],
    keywords: ['api design', 'openapi', 'swagger', 'contract', 'endpoints', 'backend', 'api']
  },
  {
    id: 'serverarch',
    name: 'Server Architecture',
    category: 'Backend Development',
    level: 92,
    logo: 'serverarch',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#3B82F6',
    description: 'Designing distributed server systems, fault-tolerant microservices, load balancing, message queues, and horizontal auto-scaling topologies.',
    projects: ['Quantum Financial Engine', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Microservice & Monolith-to-Microservice Transitions',
      'Load Balancing, Reverse Proxies & Ingress Routing',
      'Message Queues & Asynchronous Worker Pipelines',
      'Zero-Downtime Blue/Green Rolling Deployments'
    ],
    keywords: ['server architecture', 'microservices', 'distributed systems', 'scaling', 'backend', 'system design']
  },

  // ==========================================
  // 3. DATABASE (6 Skills)
  // ==========================================
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    level: 94,
    logo: 'mongodb',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#47A248',
    description: 'Document database modeling with MongoDB, complex aggregation pipelines, compound indexing, TTL indexes, replica sets, and Mongoose ODM validation.',
    projects: ['Luxe Commerce Suite', 'Velocita Dashboard', 'SaaS Platform'],
    proficiencyHighlights: [
      'Complex Multi-Stage Aggregation Pipelines',
      'Compound, Geospatial & TTL Index Optimization',
      'Mongoose Schema Modeling & Virtuals',
      'Document Validation & Schema Migrations'
    ],
    keywords: ['mongodb', 'nosql', 'mongo', 'mongoose', 'database', 'db', 'document', 'json']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    level: 93,
    logo: 'postgresql',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#4169E1',
    description: 'Relational data engineering with PostgreSQL: ACID transactions, CTEs, window functions, indexing (B-Tree, GIN, GiST), JSONB manipulation, and pgvector embeddings.',
    projects: ['Apex AI Workspace', 'Quantum Financial Engine', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Complex Joins, Window Functions & Recursive CTEs',
      'GIN, GiST & Partial Index Query Tuning',
      'JSONB Queries & Vector Embeddings with pgvector',
      'ACID Transaction Isolation Levels'
    ],
    keywords: ['postgres', 'postgresql', 'sql', 'relational', 'rdbms', 'database', 'db', 'acid']
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    level: 91,
    logo: 'mysql',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#4479A1',
    description: 'Relational database engineering with MySQL: schema normalization (3NF), stored procedures, query profiling with EXPLAIN, and InnoDB engine optimization.',
    projects: ['Enterprise Core DB', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'InnoDB Engine Configuration & Buffer Pool Tuning',
      'Schema Normalization & Foreign Key Constraints',
      'EXPLAIN Query Plan Optimization',
      'Replication & Connection Pool Management'
    ],
    keywords: ['mysql', 'sql', 'relational', 'database', 'db', 'rdbms', 'innodb']
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Database',
    level: 89,
    logo: 'redis',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#DC382D',
    description: 'In-memory data structures with Redis: sub-millisecond caching layers, distributed locks (Redlock), session storage, pub/sub event broadcasting, and rate limiters.',
    projects: ['Quantum Financial Engine', 'Apex AI Workspace'],
    proficiencyHighlights: [
      'Sub-millisecond In-Memory Caching & Key Eviction (LRU)',
      'Distributed Locking & Concurrency Synchronization',
      'Pub/Sub Channels for Real-time Messaging',
      'Redis Streams & BullMQ Job Queues'
    ],
    keywords: ['redis', 'cache', 'in-memory', 'nosql', 'database', 'pubsub', 'key-value', 'db']
  },
  {
    id: 'prisma',
    name: 'Prisma ORM',
    category: 'Database',
    level: 94,
    logo: 'prisma',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#2D3748',
    description: 'Type-safe database access with Prisma ORM: declarative schema definitions, automated migrations, relation filtering, and raw query integration.',
    projects: ['Apex AI Workspace', 'Quantum Financial Engine', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'Type-Safe Auto-Generated Client Queries',
      'Automated Schema Migration Pipelines',
      'Nested Relation Writes & Cascade Operations',
      'Connection Pooling & Query Logging'
    ],
    keywords: ['prisma', 'orm', 'database', 'typescript', 'postgres', 'mysql', 'sql', 'db']
  },
  {
    id: 'dbdesign',
    name: 'Database Design',
    category: 'Database',
    level: 93,
    logo: 'dbdesign',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#8B5CF6',
    description: 'Holistic data architecture: Entity-Relationship Diagrams (ERD), schema normalization, partitioning, replication topologies, and high-performance indexing.',
    projects: ['Apex AI Workspace', 'Quantum Financial Engine', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'Entity Relationship (ERD) Architecture Modeling',
      'Normalization (1NF to 3NF/BCNF) vs. Denormalization',
      'Horizontal Sharding & Read/Write Replication',
      'Audit Logging & Soft Deletion Patterns'
    ],
    keywords: ['database design', 'erd', 'data modeling', 'schema', 'normalization', 'database', 'db']
  },

  // ==========================================
  // 4. CLOUD & DEVOPS (8 Skills)
  // ==========================================
  {
    id: 'git',
    name: 'Git',
    category: 'Cloud & DevOps',
    level: 98,
    logo: 'git',
    experience: '6 Years',
    experienceDuration: '6 Years',
    accentColor: '#F05032',
    description: 'Advanced distributed version control: interactive rebasing, cherry-picking, bisect debugging, Gitflow branching models, and merge conflict resolution.',
    projects: ['All Production Repositories'],
    proficiencyHighlights: [
      'Interactive Rebasing & Clean Atomic Commit History',
      'Branching Strategies (GitFlow, Trunk-Based)',
      'Git Bisect Regression Debugging',
      'Git Hooks & Pre-commit Lint Automation'
    ],
    keywords: ['git', 'version control', 'vcs', 'branching', 'devops', 'tools']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Cloud & DevOps',
    level: 96,
    logo: 'github',
    experience: '6 Years',
    experienceDuration: '6 Years',
    accentColor: '#181717',
    description: 'Enterprise repository management, GitHub Actions CI/CD workflows, pull request code review standards, branch protection rules, and project automation.',
    projects: ['All Production Repositories'],
    proficiencyHighlights: [
      'GitHub Actions Matrix Builds & Automated Testing',
      'Branch Protection & Required Status Checks',
      'Issue Templates, PR Workflows & Releases',
      'GitHub Packages & Container Registry'
    ],
    keywords: ['github', 'actions', 'ci/cd', 'git', 'repo', 'devops', 'collaboration']
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Cloud & DevOps',
    level: 91,
    logo: 'docker',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#2496ED',
    description: 'Containerizing full stack apps with multi-stage Dockerfiles, Docker Compose multi-service orchestration, layer caching, and lightweight container security.',
    projects: ['Apex AI Workspace', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Multi-Stage Dockerfile Size Minimization (Alpine/Distroless)',
      'Docker Compose Multi-Container Orchestration',
      'BuildKit Cache Mounts & Rapid Container Builds',
      'Non-Root User Container Security Standards'
    ],
    keywords: ['docker', 'container', 'containers', 'dockerfile', 'compose', 'devops', 'cloud']
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    category: 'Cloud & DevOps',
    level: 90,
    logo: 'cicd',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#22C55E',
    description: 'Designing automated Continuous Integration and Continuous Delivery pipelines for automated unit testing, linting, build verification, and zero-downtime deployments.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Automated Test Suites & Static Analysis Gates',
      'Continuous Deployment to Staging & Production',
      'Canary Releases & Rollback Automation',
      'Secret Vault Integration & Environment Injection'
    ],
    keywords: ['ci/cd', 'continuous integration', 'continuous delivery', 'pipeline', 'devops', 'automation']
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud & DevOps',
    level: 88,
    logo: 'aws',
    experience: '3 Years',
    experienceDuration: '3 Years',
    accentColor: '#FF9900',
    description: 'Architecting cloud infrastructure on Amazon Web Services: S3 bucket storage with CloudFront CDN distribution, EC2 instances, Lambda serverless functions, and IAM policies.',
    projects: ['Luxe Commerce Suite', 'Aether Cloud Analytics'],
    proficiencyHighlights: [
      'Amazon S3 & CloudFront Edge Distribution',
      'AWS Lambda Serverless & API Gateway',
      'EC2 Provisioning & Security Group Governance',
      'IAM Least-Privilege Role Policies'
    ],
    keywords: ['aws', 'amazon', 'cloud', 's3', 'lambda', 'cloudfront', 'iam', 'devops']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Cloud & DevOps',
    level: 96,
    logo: 'vercel',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#000000',
    description: 'Deploying modern web applications with Vercel: edge network caching, Serverless & Edge Functions, preview deployments, environment variables, and analytics.',
    projects: ['Apex AI Workspace', 'Velocita Dashboard', 'Portfolio Platform'],
    proficiencyHighlights: [
      'Global Edge Network & Smart Caching Headers',
      'Automated Git Branch Preview Environments',
      'Serverless Function Lifecycle & Cold Start Tuning',
      'Speed Insights & Real-User Core Web Vitals'
    ],
    keywords: ['vercel', 'deployment', 'hosting', 'edge', 'serverless', 'cloud', 'nextjs']
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'Cloud & DevOps',
    level: 92,
    logo: 'netlify',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#00C7B7',
    description: 'Static and jamstack deployments on Netlify with Edge Functions, build plugins, branch previews, custom redirect rules, and DNS configuration.',
    projects: ['Luxe Commerce Suite', 'Documentation Portal'],
    proficiencyHighlights: [
      'Netlify Edge Functions & Rewrite Rules',
      'Branch Deploys & Contextual Build Variables',
      'Form Handling & Serverless Functions',
      'DNS, Custom SSL & Asset Optimization'
    ],
    keywords: ['netlify', 'hosting', 'cloud', 'deployment', 'jamstack', 'devops']
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'Cloud & DevOps',
    level: 90,
    logo: 'linux',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#FCC624',
    description: 'Linux server administration (Ubuntu / Debian): Bash scripting, systemd service daemon configurations, SSH key management, cron jobs, and process monitoring.',
    projects: ['Production Server Nodes', 'Cloud Run Containers'],
    proficiencyHighlights: [
      'Bash Scripting & Automation Utilities',
      'systemd Service Daemons & Journalctl Logs',
      'SSH Key Security, UFW Firewalls & File Permissions',
      'Resource Monitoring (top, htop, iostat, netstat)'
    ],
    keywords: ['linux', 'unix', 'ubuntu', 'bash', 'shell', 'cli', 'server', 'devops']
  },

  // ==========================================
  // 5. UI/UX & DESIGN (7 Skills)
  // ==========================================
  {
    id: 'figma',
    name: 'Figma',
    category: 'UI/UX & Design',
    level: 95,
    logo: 'figma',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#F24E1E',
    description: 'Advanced Figma design: design system token governance, nested auto-layout, component variants with property controls, and interactive prototype flows.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Quantum Financial Engine', 'Velocita Dashboard'],
    proficiencyHighlights: [
      'Design System Variables & Token Architectures',
      'Nested Auto-Layout & Responsive Constraints',
      'Component Sets with Boolean / Text Variants',
      'Micro-interaction Wireframing & Prototyping'
    ],
    keywords: ['figma', 'design', 'ui', 'ux', 'prototyping', 'wireframe', 'design system']
  },
  {
    id: 'uidesign',
    name: 'UI Design',
    category: 'UI/UX & Design',
    level: 96,
    logo: 'uidesign',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#EC4899',
    description: 'User Interface craftsmanship: mathematical typographic scaling, spatial rhythm (8pt grid system), optical alignment, color theory, and micro-interactions.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Velocita Dashboard'],
    proficiencyHighlights: [
      '8pt Spatial Grid & Mathematical Rhythms',
      'Typographic Contrast & Optical Balance',
      'Glassmorphism & Depth Hierarchy (Z-axis)',
      'Dual Light & Dark Theme Craftsmanship'
    ],
    keywords: ['ui', 'ui design', 'interface', 'visual', 'layout', 'design', 'typography']
  },
  {
    id: 'uxresearch',
    name: 'UX Research',
    category: 'UI/UX & Design',
    level: 90,
    logo: 'uxresearch',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#8B5CF6',
    description: 'User experience research methodologies: qualitative user interviews, usability testing, journey mapping, heuristic evaluations, and persona development.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'User Journey Mapping & Information Architecture',
      'Usability Testing & Heuristic Evaluation',
      'Task Flow Analysis & Friction Elimination',
      'Persona Development & User Archetyping'
    ],
    keywords: ['ux', 'ux research', 'user experience', 'research', 'usability', 'user journey', 'design']
  },
  {
    id: 'wireframe',
    name: 'Wireframe',
    category: 'UI/UX & Design',
    level: 94,
    logo: 'wireframe',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#3B82F6',
    description: 'Translating product discovery into low-fidelity and high-fidelity wireframes, structural content hierarchy, user flow diagrams, and interactive blueprints.',
    projects: ['Apex AI Workspace', 'Velocita Dashboard', 'Quantum Financial Engine'],
    proficiencyHighlights: [
      'Low-Fidelity Conceptual Schematics',
      'High-Fidelity Layout Wireframes',
      'Content Hierarchy & Information Architecture',
      'Interactive Blueprint Click-Throughs'
    ],
    keywords: ['wireframe', 'wireframing', 'blueprint', 'layout', 'ux', 'ui', 'design']
  },
  {
    id: 'prototyping',
    name: 'Prototyping',
    category: 'UI/UX & Design',
    level: 93,
    logo: 'prototyping',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#10B981',
    description: 'Creating realistic interactive prototypes with smart animations, interactive components, state machines, gesture triggers, and developer handoff specs.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite'],
    proficiencyHighlights: [
      'Smart Animate & Complex State Transitions',
      'Interactive Component Micro-Interactions',
      'User Testing Simulation Prototypes',
      'Precise Developer Handoff Annotations'
    ],
    keywords: ['prototyping', 'prototype', 'interactive', 'smart animate', 'figma', 'ux', 'design']
  },
  {
    id: 'designsystem',
    name: 'Design System',
    category: 'UI/UX & Design',
    level: 95,
    logo: 'designsystem',
    experience: '4 Years',
    experienceDuration: '4 Years',
    accentColor: '#F59E0B',
    description: 'Architecting scalable enterprise design systems: design tokens (colors, typography, spacing, elevations), headless primitives, and reusable component libraries.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Velocita Dashboard'],
    proficiencyHighlights: [
      'Semantic Design Tokens (Figma Variables & CSS)',
      'Cross-Platform Component Library Governance',
      'Accessibility & Contrast Token Enforcement',
      'Comprehensive Component Documentation'
    ],
    keywords: ['design system', 'design systems', 'tokens', 'components', 'ui', 'ux', 'atomic design']
  },
  {
    id: 'visualdesign',
    name: 'Visual Design',
    category: 'UI/UX & Design',
    level: 94,
    logo: 'visualdesign',
    experience: '5 Years',
    experienceDuration: '5 Years',
    accentColor: '#D4AF37',
    description: 'High-end visual aesthetics: brand identity guidelines, custom iconography, balanced color harmonies, gradient atmospheres, and luxury digital presentation.',
    projects: ['Apex AI Workspace', 'Luxe Commerce Suite', 'Portfolio Platform'],
    proficiencyHighlights: [
      'Color Harmonies & Atmospheric Gradients',
      'Luxury Brand Aesthetics & Vector Iconography',
      'Visual Rhythm & Negative Space Equilibrium',
      'High-Impact Presentation & Product Mockups'
    ],
    keywords: ['visual design', 'visual', 'branding', 'graphics', 'aesthetics', 'art', 'design']
  }
];
