export type ThemeMode = 'light' | 'dark';
export type PdfThemeMode = 'light' | 'dark';
export type PdfDownloadType = 'resume' | 'certificates';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
  actionType?: 'link' | 'email' | 'whatsapp' | 'telegram';
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Cloud & DevOps' | 'Design & Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100%
  experienceDuration: string;
  iconName: string;
  description: string;
  proficiencyHighlights: string[];
  projectsUsing: string[];
}

export type ProjectCategory = 'All' | 'Full Stack' | 'AI & SaaS' | 'Mobile / Web' | 'UI / UX';

export interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | 'AI & SaaS' | 'Mobile / Web' | 'UI / UX';
  tagline: string;
  description: string;
  image: string;
  fallbackGradient?: string;
  techStack: string[];
  features: string[];
  architecture?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Lead';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  duration: string;
  grade?: string;
  highlights: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string; // Dynamic path e.g. /certificates/logos/meta.png
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
  skills: string[];
  description: string;
  verified?: boolean;
}

export interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  suffix?: string;
  description: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    titles: string[];
    bio: string;
    extendedBio: string;
    location: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    telegramUsername: string;
    availabilityStatus: string;
    resumeUrl: string;
    yearsOfExperience: number;
  };
  assets: {
    logos: {
      light: string;
      dark: string;
    };
    profileImage: string;
  };
  socials: SocialLink[];
  stats: StatItem[];
  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: Certificate[];
}
