import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { portfolioConfig } from '../config/portfolio';
import { skills as staticSkills } from '../config/skills';

export interface MigrationStatus {
  profile: boolean;
  projects: number;
  skills: number;
  experience: number;
  education: number;
  certificates: number;
  socials: number;
  settings: boolean;
  errors: string[];
}

export const migrationService = {
  async checkDataStatus(): Promise<{ hasData: boolean; counts: Record<string, number> }> {
    const counts: Record<string, number> = {
      profiles: 0,
      projects: 0,
      skills: 0,
      experience: 0,
      education: 0,
      certificates: 0,
      social_links: 0,
    };

    if (!isSupabaseConfigured) {
      return { hasData: false, counts };
    }

    try {
      const results = await Promise.allSettled([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('skills').select('*', { count: 'exact', head: true }),
        supabase.from('experience').select('*', { count: 'exact', head: true }),
        supabase.from('education').select('*', { count: 'exact', head: true }),
        supabase.from('certificates').select('*', { count: 'exact', head: true }),
        supabase.from('social_links').select('*', { count: 'exact', head: true }),
      ]);

      const keys = ['profiles', 'projects', 'skills', 'experience', 'education', 'certificates', 'social_links'];
      results.forEach((res, idx) => {
        if (res.status === 'fulfilled' && !res.value.error) {
          counts[keys[idx]] = res.value.count || 0;
        }
      });

      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      return { hasData: total > 0, counts };
    } catch {
      return { hasData: false, counts };
    }
  },

  async migrateAllStaticData(): Promise<MigrationStatus> {
    const result: MigrationStatus = {
      profile: false,
      projects: 0,
      skills: 0,
      experience: 0,
      education: 0,
      certificates: 0,
      socials: 0,
      settings: false,
      errors: [],
    };

    if (!isSupabaseConfigured) {
      result.errors.push('Supabase is not configured. Please set VITE_SUPABASE_ANON_KEY in .env');
      return result;
    }

    // 1. Migrate Profile
    try {
      const profileData = {
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
      };

      const { data: existingProfile } = await supabase.from('profiles').select('id').limit(1).maybeSingle();
      if (existingProfile?.id) {
        await supabase.from('profiles').update(profileData).eq('id', existingProfile.id);
      } else {
        await supabase.from('profiles').insert([profileData]);
      }
      result.profile = true;
    } catch (e: any) {
      result.errors.push(`Profile migration failed: ${e.message}`);
    }

    // 2. Migrate Projects
    try {
      for (let i = 0; i < portfolioConfig.projects.length; i++) {
        const p = portfolioConfig.projects[i];
        const projectRow = {
          id: p.id,
          title: p.title,
          category: p.category,
          tagline: p.tagline,
          description: p.description,
          image: p.image,
          fallback_gradient: p.fallbackGradient || null,
          tech_stack: p.techStack,
          features: p.features,
          architecture: p.architecture || [],
          live_url: p.liveUrl || null,
          github_url: p.githubUrl || null,
          featured: Boolean(p.featured),
          display_order: i,
        };
        await supabase.from('projects').upsert([projectRow]);
        result.projects++;
      }
    } catch (e: any) {
      result.errors.push(`Projects migration failed: ${e.message}`);
    }

    // 3. Migrate Skills
    try {
      const skillsToMigrate = staticSkills.length > 0 ? staticSkills : portfolioConfig.skills;
      for (let i = 0; i < skillsToMigrate.length; i++) {
        const s = skillsToMigrate[i];
        const skillRow = {
          id: s.id,
          name: s.name,
          category: s.category,
          level: s.level,
          logo: s.logo || null,
          experience: s.experience || null,
          experience_duration: s.experienceDuration || null,
          icon_name: s.iconName || null,
          description: s.description,
          projects: s.projects || [],
          projects_using: s.projectsUsing || [],
          proficiency_highlights: s.proficiencyHighlights || [],
          keywords: s.keywords || [],
          accent_color: s.accentColor || null,
          display_order: i,
        };
        await supabase.from('skills').upsert([skillRow]);
        result.skills++;
      }
    } catch (e: any) {
      result.errors.push(`Skills migration failed: ${e.message}`);
    }

    // 4. Migrate Experience
    try {
      for (let i = 0; i < portfolioConfig.experience.length; i++) {
        const exp = portfolioConfig.experience[i];
        const expRow = {
          id: exp.id,
          position: exp.position,
          company: exp.company,
          location: exp.location,
          duration: exp.duration,
          period: exp.period,
          type: exp.type,
          description: exp.description,
          achievements: exp.achievements,
          skills: exp.skills,
          display_order: i,
        };
        await supabase.from('experience').upsert([expRow]);
        result.experience++;
      }
    } catch (e: any) {
      result.errors.push(`Experience migration failed: ${e.message}`);
    }

    // 5. Migrate Education
    try {
      for (let i = 0; i < portfolioConfig.education.length; i++) {
        const edu = portfolioConfig.education[i];
        const eduRow = {
          id: edu.id,
          degree: edu.degree,
          field: edu.field,
          institution: edu.institution,
          location: edu.location,
          duration: edu.duration,
          grade: edu.grade || null,
          highlights: edu.highlights,
          display_order: i,
        };
        await supabase.from('education').upsert([eduRow]);
        result.education++;
      }
    } catch (e: any) {
      result.errors.push(`Education migration failed: ${e.message}`);
    }

    // 6. Migrate Certificates
    try {
      for (let i = 0; i < portfolioConfig.certificates.length; i++) {
        const c = portfolioConfig.certificates[i];
        const certRow = {
          id: c.id || `cert-${i + 1}`,
          title: c.title,
          issuer: c.issuer || 'Official Issuer',
          issuer_logo: c.issuerLogo || null,
          theme: c.theme || null,
          category: c.category || 'Engineering',
          accent: c.accent || null,
          image: c.image,
          issue_date: c.issueDate || null,
          expiry_date: c.expiryDate || null,
          credential_id: c.credentialId || null,
          credential_url: c.credentialUrl || null,
          skills: c.skills || [],
          description: c.description || null,
          verified: c.verified !== undefined ? c.verified : true,
          display_order: i,
        };
        await supabase.from('certificates').upsert([certRow]);
        result.certificates++;
      }
    } catch (e: any) {
      result.errors.push(`Certificates migration failed: ${e.message}`);
    }

    // 7. Migrate Social Links
    try {
      for (let i = 0; i < portfolioConfig.socials.length; i++) {
        const s = portfolioConfig.socials[i];
        const socialRow = {
          id: s.name.toLowerCase().replace(/\s+/g, '-'),
          name: s.name,
          url: s.url,
          icon: s.icon,
          color: s.color || null,
          action_type: s.actionType || 'link',
          display_order: i,
        };
        await supabase.from('social_links').upsert([socialRow]);
        result.socials++;
      }
    } catch (e: any) {
      result.errors.push(`Social links migration failed: ${e.message}`);
    }

    // 8. Migrate Site Settings
    try {
      await supabase.from('site_settings').upsert([{
        id: 'default',
        site_title: 'MD. Moshiur Rahman | Luxury Portfolio',
        meta_description: 'Official portfolio of MD. Moshiur Rahman – Full Stack Developer and UI/UX Designer crafting high-performance, luxury web applications.',
        contact_email: portfolioConfig.personal.email,
        active_theme: 'dual',
        show_stats: true,
        maintenance_mode: false,
      }]);
      result.settings = true;
    } catch (e: any) {
      result.errors.push(`Settings migration failed: ${e.message}`);
    }

    return result;
  },
};
