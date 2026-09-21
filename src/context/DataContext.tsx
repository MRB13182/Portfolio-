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
  FooterSettingsRow
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
import { isSupabaseConfigured } from '../lib/supabase';
import { Project, Skill, ExperienceItem, EducationItem, Certificate, SocialLink } from '../types';

const DEFAULT_FOOTER_SETTINGS: FooterSettingsRow = {
  id: 'default',
  footer_logo: '',
  footer_description: 'Architecting high-performance web systems, generative AI engines, and enterprise solutions with obsessive design fidelity.',
  copyright_text: `© ${new Date().getFullYear()} MD. Moshiur Rahman. All rights reserved.`,
  email: portfolioConfig.personal.email,
  phone: portfolioConfig.personal.phone,
  address: portfolioConfig.personal.location,
  social_links: portfolioConfig.socials.map(s => ({
    name: s.name,
    url: s.url,
    icon: s.icon,
  })),
  navigation_links: [
    { label: 'Overview', path: '/' },
    { label: 'Skills & Stack', path: '/skills' },
    { label: 'Featured Projects', path: '/projects' },
    { label: 'Experience & Career', path: '/experience' },
  ],
  background_image: '',
  banner_text: 'Available for high-impact technical leadership & full-stack architectural contracts.',
  footer_theme: 'luxury',
};

interface DataContextType {
  loading: boolean;
  error: string | null;
  isSupabaseLive: boolean;
  profile: ProfileRow | null;
  projects: Project[];
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: Certificate[];
  socials: SocialLink[];
  settings: SiteSettingsRow | null;
  footerSettings: FooterSettingsRow;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

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
  const [settings, setSettings] = useState<SiteSettingsRow | null>(null);
  const [footerSettings, setFooterSettings] = useState<FooterSettingsRow>(DEFAULT_FOOTER_SETTINGS);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      // Running on offline / static fallback
      setLoading(false);
      setIsSupabaseLive(false);
      return;
    }

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
        setSettings(fetchedSettings);
      }

      if (fetchedFooter) {
        setFooterSettings(fetchedFooter);
      }

      setIsSupabaseLive(hasAnyDbData);
    } catch (err: any) {
      console.warn('Failed to load live Supabase data, using static fallback:', err);
      setError(err?.message || 'Failed to connect to Supabase');
      setIsSupabaseLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider
      value={{
        loading,
        error,
        isSupabaseLive,
        profile,
        projects,
        skills,
        experience,
        education,
        certificates,
        socials,
        settings,
        footerSettings,
        refreshData: fetchData,
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
