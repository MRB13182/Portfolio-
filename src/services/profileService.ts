import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ProfileRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const getDefaultProfile = (): ProfileRow => {
  return {
    id: 'default',
    name: portfolioConfig.personal.name,
    first_name: portfolioConfig.personal.firstName,
    last_name: portfolioConfig.personal.lastName,
    titles: portfolioConfig.personal.titles,
    bio: portfolioConfig.personal.bio,
    extended_bio: portfolioConfig.personal.extendedBio,
    about: portfolioConfig.personal.extendedBio,
    location: portfolioConfig.personal.location,
    email: portfolioConfig.personal.email,
    phone: portfolioConfig.personal.phone,
    whatsapp_number: portfolioConfig.personal.whatsappNumber,
    whatsapp: portfolioConfig.personal.whatsappNumber,
    telegram_username: portfolioConfig.personal.telegramUsername,
    telegram: portfolioConfig.personal.telegramUsername,
    availability_status: portfolioConfig.personal.availabilityStatus,
    resume_url: portfolioConfig.personal.resumeUrl,
    years_of_experience: portfolioConfig.personal.yearsOfExperience,
    profile_image: portfolioConfig.assets.profileImage,
    cover_image: '/cover-banner.webp',
    logo_light: portfolioConfig.assets.logos.light,
    logo_dark: portfolioConfig.assets.logos.dark,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

export const profileService = {
  async getAll(): Promise<ProfileRow[]> {
    const primary = await this.getPrimary();
    return primary ? [primary] : [getDefaultProfile()];
  },

  async getById(id: string): Promise<ProfileRow | null> {
    return this.getPrimary();
  },

  async getPrimary(): Promise<ProfileRow | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          const row = data as ProfileRow;
          storageHelper.setCached('profile', row);
          return row;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('profileService.getPrimary note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('profileService.getPrimary network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<ProfileRow | null>('profile', null);
    if (cached) {
      return cached;
    }

    const def = getDefaultProfile();
    storageHelper.setCached('profile', def);
    return def;
  },

  async create(payload: Partial<ProfileRow>): Promise<ProfileRow> {
    return this.update('default', payload);
  },

  async update(id: string, payload: Partial<ProfileRow>): Promise<ProfileRow> {
    const current = (await this.getPrimary()) || getDefaultProfile();
    const merged: ProfileRow = {
      ...current,
      ...payload,
      id: current.id || 'default',
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert([{ ...merged }])
          .select()
          .single();

        if (error) {
          console.warn('Supabase profile update note:', error.message);
        } else if (data) {
          const updated = data as ProfileRow;
          storageHelper.setCached('profile', updated);
          return updated;
        }
      } catch (err: any) {
        console.warn('Supabase profile update network note:', err.message);
      }
    }

    storageHelper.setCached('profile', merged);
    return merged;
  },

  async delete(id: string): Promise<boolean> {
    storageHelper.removeCached('profile');
    return true;
  },
};
