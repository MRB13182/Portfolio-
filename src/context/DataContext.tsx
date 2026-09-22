import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioConfig } from '../config/portfolio';
import { skills as staticSkills } from '../config/skills';
import { 
  ProfileRow, 
  ProjectRow, 
  SkillRow, 
  ExperienceRow, 
  EducationRow, 
  CertificateRow, 
  SocialLinkRow, 
  SiteSettingsRow,
  FooterSettingsRow,
  TestimonialRow
} from '../types/database';
import { profileService } from '../services/profileService';
import { projectService } from '../services/projectService';
import { skillService } from '../services/skillService';
import { experienceService } from '../services/experienceService';
import { educationService } from '../services/educationService';
import { certificateService } from '../services/certificateService';
import { socialService } from '../services/socialService';
import { settingsService } from '../services/settingsService';
import { footerService } from '../services/footerService';
import { testimonialService } from '../services/testimonialService';
import { storageHelper } from '../services/storageHelper';
import { isSupabaseConfigured } from '../lib/supabase';
import { Project, Skill, ExperienceItem, EducationItem, Certificate, SocialLink } from '../types';

const DEFAULT_FOOTER_SETTINGS: FooterSettingsRow = {
  id: 'default',
  footer_logo: '',
  footer_description: 'Architecting high-performance web systems, generative AI engines, and enterprise solutions with obsessive design fidelity.',
  copyright_text: `© 2026 MR Portfolio`,
  banner_text: 'All Rights Reserved.',
  email: portfolioConfig.personal.email,
  phone: portfolioConfig.personal.phone,
  address: portfolioConfig.personal.location,
  social_links: portfolioConfig.socials.map(s => ({
    name: s.name,
    url: s.url,
    icon: s.icon,
  })),
  navigation_links: [
    { label: 'Home', path: '/home' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Contact', path: '/contact' },
  ],
  background_image: '',
  footer_theme: 'minimal',
};

const DEFAULT_SETTINGS: SiteSettingsRow = {
  id: 'default',
  site_title: 'MR Portfolio | Moshiur Rahman',
  website_name: 'MR Portfolio',
  website_logo: '',
  dark_logo: '',
  light_logo: '',
  favicon: '/favicon.ico',
  hero_banner: '',
  meta_title: 'MR Portfolio | Senior Full-Stack & AI Systems Architect',
  meta_description: 'Portfolio of Moshiur Rahman - Senior Full-Stack & AI Systems Architect specializing in React, TypeScript, Cloud Engineering, and Glassmorphism design.',
  seo_keywords: 'Full Stack Engineer, React, TypeScript, Node.js, AI Systems, Cloud Architecture, Portfolio',
  og_image: '/og-image.png',
  contact_email: 'borshonsweb@gmail.com',
  active_theme: 'dual',
  show_stats: true,
  maintenance_mode: false,
  primary_color: '#00E5FF',
  secondary_color: '#8B5CF6',
  accent_color: '#00E5FF',
  footer_text: 'All Rights Reserved.',
  copyright_text: '© 2026 MR Portfolio',
  hero_greeting: 'Hello, I am',
  hero_cta_text: 'Get In Touch',
  hero_cta_link: '/contact',
  glass_blur: 'balanced',
  glass_opacity: 'medium',
  border_glow: true,
};

interface DataContextType {
  loading: boolean;
  error: string | null;
  isSupabaseLive: boolean;
  visitorCount: number;
  profile: ProfileRow | null;
  projects: Project[];
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: Certificate[];
  socials: SocialLink[];
  settings: SiteSettingsRow | null;
  footerSettings: FooterSettingsRow;
  testimonials: TestimonialRow[];
  refreshData: () => Promise<void>;
  updateProfile: (payload: Partial<ProfileRow>) => Promise<ProfileRow>;
  addProject: (payload: Partial<ProjectRow>) => Promise<ProjectRow>;
  updateProject: (id: string, payload: Partial<ProjectRow>) => Promise<ProjectRow>;
  deleteProject: (id: string) => Promise<boolean>;
  addSkill: (payload: Partial<SkillRow>) => Promise<SkillRow>;
  updateSkill: (id: string, payload: Partial<SkillRow>) => Promise<SkillRow>;
  deleteSkill: (id: string) => Promise<boolean>;
  reorderSkills: (orderedSkills: Skill[]) => Promise<void>;
  addCertificate: (payload: Partial<CertificateRow>) => Promise<CertificateRow>;
  updateCertificate: (id: string, payload: Partial<CertificateRow>) => Promise<CertificateRow>;
  deleteCertificate: (id: string) => Promise<boolean>;
  updateSocials: (socials: SocialLink[]) => Promise<void>;
  updateSettings: (payload: Partial<SiteSettingsRow>) => Promise<SiteSettingsRow>;
  updateFooterSettings: (payload: Partial<FooterSettingsRow>) => Promise<FooterSettingsRow>;
  addTestimonial: (payload: Partial<TestimonialRow>) => Promise<TestimonialRow>;
  updateTestimonial: (id: string, payload: Partial<TestimonialRow>) => Promise<TestimonialRow>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  exportBackup: () => string;
  importBackup: (jsonString: string) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 1240;
    try {
      const stored = localStorage.getItem('portfolio_cms_visitor_count');
      const count = stored ? parseInt(stored, 10) : 1240;
      const next = isNaN(count) ? 1240 : count + 1;
      localStorage.setItem('portfolio_cms_visitor_count', next.toString());
      return next;
    } catch {
      return 1240;
    }
  });

  // Initialize with static fallback data
  const [profile, setProfile] = useState<ProfileRow | null>({
    id: 'default',
    name: portfolioConfig.personal.name,
    first_name: portfolioConfig.personal.firstName,
    last_name: portfolioConfig.personal.lastName,
    titles: portfolioConfig.personal.titles,
    bio: portfolioConfig.personal.bio,
    extended_bio: portfolioConfig.personal.extendedBio,
    location: portfolioConfig.personal.location,
    email: portfolioConfig.personal.email,
    phone: portfolioConfig.personal.phone,
    whatsapp_number: portfolioConfig.personal.whatsappNumber,
    telegram_username: portfolioConfig.personal.telegramUsername,
    availability_status: portfolioConfig.personal.availabilityStatus,
    resume_url: portfolioConfig.personal.resumeUrl,
    resume_file_name: 'Moshiur_Rahman_Resume.pdf',
    resume_download_enabled: true,
    resume_badge_text: 'ATS-Optimized Edition',
    years_of_experience: portfolioConfig.personal.yearsOfExperience,
    profile_image: portfolioConfig.assets.profileImage,
    logo_light: portfolioConfig.assets.logos.light,
    logo_dark: portfolioConfig.assets.logos.dark,
  });

  const [projects, setProjects] = useState<Project[]>(portfolioConfig.projects);
  const [skills, setSkills] = useState<Skill[]>(staticSkills.length > 0 ? staticSkills : portfolioConfig.skills);
  const [experience, setExperience] = useState<ExperienceItem[]>(portfolioConfig.experience);
  const [education, setEducation] = useState<EducationItem[]>(portfolioConfig.education);
  const [certificates, setCertificates] = useState<Certificate[]>(portfolioConfig.certificates);
  const [socials, setSocials] = useState<SocialLink[]>(portfolioConfig.socials);
  const [settings, setSettings] = useState<SiteSettingsRow | null>(DEFAULT_SETTINGS);
  const [footerSettings, setFooterSettings] = useState<FooterSettingsRow>(DEFAULT_FOOTER_SETTINGS);
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsSupabaseLive(isSupabaseConfigured);

    try {
      const [
        fetchedProfile,
        fetchedProjects,
        fetchedSkills,
        fetchedExp,
        fetchedEdu,
        fetchedCerts,
        fetchedSocials,
        fetchedSettings,
        fetchedFooter,
        fetchedTestimonials,
      ] = await Promise.all([
        profileService.getPrimary().catch(() => null),
        projectService.getAll().catch(() => []),
        skillService.getAll().catch(() => []),
        experienceService.getAll().catch(() => []),
        educationService.getAll().catch(() => []),
        certificateService.getAll().catch(() => []),
        socialService.getAll().catch(() => []),
        settingsService.getById('default').catch(() => null),
        footerService.get().catch(() => DEFAULT_FOOTER_SETTINGS),
        testimonialService.getAll().catch(() => []),
      ]);

      let hasAnyDbData = false;

      if (fetchedProfile) {
        setProfile(fetchedProfile);
        hasAnyDbData = true;
      }

      if (fetchedProjects && fetchedProjects.length > 0) {
        setProjects(fetchedProjects.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category as any,
          tagline: p.tagline,
          description: p.description,
          image: p.image,
          fallbackGradient: p.fallback_gradient,
          techStack: p.tech_stack || [],
          features: p.features || [],
          architecture: p.architecture || [],
          liveUrl: p.live_url,
          githubUrl: p.github_url,
          featured: p.featured,
        })));
        hasAnyDbData = true;
      }

      if (fetchedSkills && fetchedSkills.length > 0) {
        setSkills(fetchedSkills.map(s => ({
          id: s.id,
          name: s.name,
          category: s.category as any,
          level: s.level,
          logo: s.logo,
          experience: s.experience,
          experienceDuration: s.experience_duration,
          iconName: s.icon_name,
          description: s.description,
          projects: s.projects || [],
          projectsUsing: s.projects_using || [],
          proficiencyHighlights: s.proficiency_highlights || [],
          keywords: s.keywords || [],
          accentColor: s.accent_color,
        })));
        hasAnyDbData = true;
      }

      if (fetchedExp && fetchedExp.length > 0) {
        setExperience(fetchedExp.map(e => ({
          id: e.id,
          position: e.position,
          company: e.company,
          location: e.location,
          duration: e.duration,
          period: e.period || e.duration,
          type: e.type as any,
          description: e.description,
          achievements: e.achievements || [],
          skills: e.skills || [],
        })));
        hasAnyDbData = true;
      }

      if (fetchedEdu && fetchedEdu.length > 0) {
        setEducation(fetchedEdu.map(ed => ({
          id: ed.id,
          degree: ed.degree,
          field: ed.field || '',
          institution: ed.institution,
          location: ed.location,
          duration: ed.duration,
          grade: ed.grade,
          highlights: ed.highlights || [],
        })));
        hasAnyDbData = true;
      }

      if (fetchedCerts && fetchedCerts.length > 0) {
        setCertificates(fetchedCerts.map(c => ({
          id: c.id,
          title: c.title,
          issuer: c.issuer,
          issuerLogo: c.issuer_logo,
          theme: c.theme,
          category: c.category,
          accent: c.accent,
          image: c.image,
          issueDate: c.issue_date,
          expiryDate: c.expiry_date,
          credentialId: c.credential_id,
          credentialUrl: c.credential_url,
          verificationUrl: c.verification_url,
          skills: c.skills || [],
          description: c.description,
          verified: c.verified,
        })));
        hasAnyDbData = true;
      }

      if (fetchedSocials && fetchedSocials.length > 0) {
        setSocials(fetchedSocials.map(s => ({
          name: s.name,
          url: s.url,
          icon: s.icon,
          color: s.color,
          actionType: s.action_type,
        })));
        hasAnyDbData = true;
      }

      if (fetchedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...fetchedSettings });
        // Sync document head
        if (typeof document !== 'undefined') {
          if (fetchedSettings.meta_title || fetchedSettings.site_title) {
            document.title = fetchedSettings.meta_title || fetchedSettings.site_title || document.title;
          }
        }
      }

      if (fetchedFooter) {
        setFooterSettings(fetchedFooter);
      }

      if (fetchedTestimonials) {
        setTestimonials(fetchedTestimonials);
      }

      setIsSupabaseLive(hasAnyDbData);
    } catch (err: any) {
      console.warn('Failed to load live Supabase data, using cached fallback:', err);
      setError(err?.message || 'Failed to connect to Supabase');
      setIsSupabaseLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Instant reactive profile update
  const updateProfile = async (payload: Partial<ProfileRow>): Promise<ProfileRow> => {
    const updated = await profileService.update('default', payload);
    setProfile(prev => ({ ...prev, ...updated }));
    return updated;
  };

  // Instant reactive project operations
  const addProject = async (payload: Partial<ProjectRow>): Promise<ProjectRow> => {
    const created = await projectService.create(payload);
    const mapped: Project = {
      id: created.id,
      title: created.title,
      category: created.category as any,
      tagline: created.tagline,
      description: created.description,
      image: created.image,
      fallbackGradient: created.fallback_gradient,
      techStack: created.tech_stack || [],
      features: created.features || [],
      architecture: created.architecture || [],
      liveUrl: created.live_url,
      githubUrl: created.github_url,
      featured: created.featured,
    };
    setProjects(prev => [mapped, ...prev]);
    return created;
  };

  const updateProject = async (id: string, payload: Partial<ProjectRow>): Promise<ProjectRow> => {
    const updated = await projectService.update(id, payload);
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          title: updated.title,
          category: updated.category as any,
          tagline: updated.tagline,
          description: updated.description,
          image: updated.image,
          techStack: updated.tech_stack || p.techStack,
          liveUrl: updated.live_url,
          githubUrl: updated.github_url,
          featured: updated.featured,
        };
      }
      return p;
    }));
    return updated;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const success = await projectService.delete(id);
    if (success) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
    return success;
  };

  // Instant reactive skill operations
  const addSkill = async (payload: Partial<SkillRow>): Promise<SkillRow> => {
    const created = await skillService.create(payload);
    const mapped: Skill = {
      id: created.id,
      name: created.name,
      category: created.category as any,
      level: created.level,
      logo: created.logo,
      experience: created.experience,
      experienceDuration: created.experience_duration,
      iconName: created.icon_name,
      description: created.description,
      projects: created.projects || [],
      projectsUsing: created.projects_using || [],
      proficiencyHighlights: created.proficiency_highlights || [],
      keywords: created.keywords || [],
      accentColor: created.accent_color,
    };
    setSkills(prev => [...prev, mapped]);
    return created;
  };

  const updateSkill = async (id: string, payload: Partial<SkillRow>): Promise<SkillRow> => {
    const updated = await skillService.update(id, payload);
    setSkills(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          name: updated.name,
          category: updated.category as any,
          level: updated.level,
          logo: updated.logo,
          description: updated.description,
          accentColor: updated.accent_color,
        };
      }
      return s;
    }));
    return updated;
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    const success = await skillService.delete(id);
    if (success) {
      setSkills(prev => prev.filter(s => s.id !== id));
    }
    return success;
  };

  const reorderSkills = async (orderedSkills: Skill[]): Promise<void> => {
    setSkills(orderedSkills);
    const rowList: SkillRow[] = orderedSkills.map((s, idx) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      level: s.level,
      logo: s.logo || '',
      experience: s.experience || '',
      experience_duration: s.experienceDuration || '',
      icon_name: s.iconName || '',
      description: s.description || '',
      projects: s.projects || [],
      projects_using: s.projectsUsing || [],
      proficiency_highlights: s.proficiencyHighlights || [],
      keywords: s.keywords || [],
      accent_color: s.accentColor || '#00E5FF',
      display_order: idx,
      sort_order: idx,
    }));
    storageHelper.setCached('skills', rowList);
  };

  // Instant reactive certificate operations
  const addCertificate = async (payload: Partial<CertificateRow>): Promise<CertificateRow> => {
    const created = await certificateService.create(payload);
    const mapped: Certificate = {
      id: created.id,
      title: created.title,
      issuer: created.issuer,
      issuerLogo: created.issuer_logo,
      theme: created.theme,
      category: created.category,
      accent: created.accent,
      image: created.image,
      issueDate: created.issue_date,
      expiryDate: created.expiry_date,
      credentialId: created.credential_id,
      credentialUrl: created.credential_url,
      verificationUrl: created.verification_url,
      skills: created.skills || [],
      description: created.description,
      verified: created.verified,
    };
    setCertificates(prev => [mapped, ...prev]);
    return created;
  };

  const updateCertificate = async (id: string, payload: Partial<CertificateRow>): Promise<CertificateRow> => {
    const updated = await certificateService.update(id, payload);
    setCertificates(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          title: updated.title,
          issuer: updated.issuer,
          image: updated.image,
          issueDate: updated.issue_date,
          credentialId: updated.credential_id,
          credentialUrl: updated.credential_url,
          verificationUrl: updated.verification_url,
          category: updated.category,
        };
      }
      return c;
    }));
    return updated;
  };

  const deleteCertificate = async (id: string): Promise<boolean> => {
    const success = await certificateService.delete(id);
    if (success) {
      setCertificates(prev => prev.filter(c => c.id !== id));
    }
    return success;
  };

  // Socials
  const updateSocials = async (newSocials: SocialLink[]): Promise<void> => {
    setSocials(newSocials);
    const rows: SocialLinkRow[] = newSocials.map((s, idx) => ({
      id: `social-${idx}`,
      name: s.name,
      url: s.url,
      icon: s.icon,
      color: s.color,
      action_type: s.actionType,
      enabled: true,
      display_order: idx,
    }));
    storageHelper.setCached('socials', rows);
  };

  // Settings
  const updateSettings = async (payload: Partial<SiteSettingsRow>): Promise<SiteSettingsRow> => {
    const updated = await settingsService.update('default', payload);
    const merged = { ...DEFAULT_SETTINGS, ...updated };
    setSettings(merged);
    if (typeof document !== 'undefined' && (merged.meta_title || merged.site_title)) {
      document.title = merged.meta_title || merged.site_title || document.title;
    }
    return merged;
  };

  // Footer Settings
  const updateFooterSettings = async (payload: Partial<FooterSettingsRow>): Promise<FooterSettingsRow> => {
    const updated = await footerService.update(payload);
    setFooterSettings(updated);
    return updated;
  };

  // Testimonials
  const addTestimonial = async (payload: Partial<TestimonialRow>): Promise<TestimonialRow> => {
    const created = await testimonialService.create(payload);
    setTestimonials(prev => [created, ...prev]);
    return created;
  };

  const updateTestimonial = async (id: string, payload: Partial<TestimonialRow>): Promise<TestimonialRow> => {
    const updated = await testimonialService.update(id, payload);
    setTestimonials(prev => prev.map(t => (t.id === id ? updated : t)));
    return updated;
  };

  const deleteTestimonial = async (id: string): Promise<boolean> => {
    const success = await testimonialService.delete(id);
    if (success) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
    return success;
  };

  // Export Backup
  const exportBackup = (): string => {
    const data = {
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      profile,
      projects,
      skills,
      certificates,
      experience,
      education,
      socials,
      settings,
      footerSettings,
      testimonials,
      visitorCount,
    };
    return JSON.stringify(data, null, 2);
  };

  // Import Backup
  const importBackup = async (jsonString: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) {
        storageHelper.setCached('profile', parsed.profile);
        setProfile(parsed.profile);
      }
      if (parsed.projects) {
        const pRows: ProjectRow[] = parsed.projects.map((p: Project, idx: number) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          tagline: p.tagline,
          description: p.description,
          image: p.image,
          fallback_gradient: p.fallbackGradient,
          tech_stack: p.techStack,
          features: p.features || [],
          architecture: p.architecture || [],
          live_url: p.liveUrl,
          github_url: p.githubUrl,
          featured: p.featured,
          display_order: idx,
        }));
        storageHelper.setCached('projects', pRows);
        setProjects(parsed.projects);
      }
      if (parsed.skills) {
        const sRows: SkillRow[] = parsed.skills.map((s: Skill, idx: number) => ({
          id: s.id,
          name: s.name,
          category: s.category,
          level: s.level,
          logo: s.logo,
          experience: s.experience,
          experience_duration: s.experienceDuration,
          icon_name: s.iconName,
          description: s.description,
          projects: s.projects,
          projects_using: s.projectsUsing,
          proficiency_highlights: s.proficiencyHighlights,
          keywords: s.keywords,
          accent_color: s.accentColor,
          display_order: idx,
        }));
        storageHelper.setCached('skills', sRows);
        setSkills(parsed.skills);
      }
      if (parsed.certificates) {
        const cRows: CertificateRow[] = parsed.certificates.map((c: Certificate, idx: number) => ({
          id: c.id,
          title: c.title,
          issuer: c.issuer,
          issuer_logo: c.issuerLogo,
          theme: c.theme,
          category: c.category,
          accent: c.accent,
          image: c.image,
          issue_date: c.issueDate,
          expiry_date: c.expiryDate,
          credential_id: c.credentialId,
          credential_url: c.credentialUrl,
          verification_url: c.verificationUrl,
          skills: c.skills,
          description: c.description,
          verified: c.verified,
          display_order: idx,
        }));
        storageHelper.setCached('certificates', cRows);
        setCertificates(parsed.certificates);
      }
      if (parsed.settings) {
        storageHelper.setCached('settings', parsed.settings);
        setSettings(parsed.settings);
      }
      if (parsed.footerSettings) {
        storageHelper.setCached('footer', parsed.footerSettings);
        setFooterSettings(parsed.footerSettings);
      }
      if (parsed.testimonials) {
        storageHelper.setCached('testimonials', parsed.testimonials);
        setTestimonials(parsed.testimonials);
      }
      return true;
    } catch (err) {
      console.error('Failed to import backup JSON:', err);
      return false;
    }
  };

  // Reset to default seed data
  const resetToDefaults = async (): Promise<void> => {
    localStorage.removeItem('portfolio_cms_profile');
    localStorage.removeItem('portfolio_cms_projects');
    localStorage.removeItem('portfolio_cms_skills');
    localStorage.removeItem('portfolio_cms_certificates');
    localStorage.removeItem('portfolio_cms_experience');
    localStorage.removeItem('portfolio_cms_education');
    localStorage.removeItem('portfolio_cms_socials');
    localStorage.removeItem('portfolio_cms_settings');
    localStorage.removeItem('portfolio_cms_footer');
    localStorage.removeItem('portfolio_cms_testimonials');
    await fetchData();
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        error,
        isSupabaseLive,
        visitorCount,
        profile,
        projects,
        skills,
        experience,
        education,
        certificates,
        socials,
        settings,
        footerSettings,
        testimonials,
        refreshData: fetchData,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        reorderSkills,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        updateSocials,
        updateSettings,
        updateFooterSettings,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        exportBackup,
        importBackup,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
};
