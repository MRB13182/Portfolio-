export interface ProfileRow {
  id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  titles: string[];
  bio?: string;
  extended_bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  whatsapp_number?: string;
  telegram_username?: string;
  availability_status?: string;
  resume_url?: string;
  years_of_experience?: number;
  profile_image?: string;
  logo_light?: string;
  logo_dark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectRow {
  id: string;
  title: string;
  category: 'Full Stack' | 'AI & SaaS' | 'Mobile / Web' | 'UI / UX';
  tagline: string;
  description: string;
  image: string;
  fallback_gradient?: string;
  tech_stack: string[];
  features: string[];
  architecture?: string[];
  live_url?: string;
  github_url?: string;
  featured?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SkillRow {
  id: string;
  name: string;
  category: string;
  level: number;
  logo?: string;
  experience?: string;
  experience_duration?: string;
  icon_name?: string;
  description: string;
  projects?: string[];
  projects_using?: string[];
  proficiency_highlights?: string[];
  keywords?: string[];
  accent_color?: string;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceRow {
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
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EducationRow {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  duration: string;
  grade?: string;
  highlights: string[];
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CertificateRow {
  id: string;
  title: string;
  issuer: string;
  issuer_logo?: string;
  theme?: string;
  category?: string;
  accent?: string;
  image: string;
  issue_date?: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  skills?: string[];
  description?: string;
  verified?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SocialLinkRow {
  id: string;
  name: string;
  url: string;
  icon: string;
  color?: string;
  action_type?: 'link' | 'email' | 'whatsapp' | 'telegram';
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at?: string;
}

export interface SiteSettingsRow {
  id: string;
  site_title: string;
  meta_description?: string;
  contact_email?: string;
  active_theme?: string;
  show_stats?: boolean;
  maintenance_mode?: boolean;
  custom_announcement?: string;
  updated_at?: string;
}
