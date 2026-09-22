import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SiteSettingsRow } from '../types/database';
import { storageHelper } from './storageHelper';

const DEFAULT_SETTINGS: SiteSettingsRow = {
  id: 'default',
  site_title: 'MD. Moshiur Rahman | Luxury Portfolio',
  website_name: 'MD. Moshiur Rahman',
  website_logo: '/logo.svg',
  dark_logo: '/logo-dark.svg',
  light_logo: '/logo-light.svg',
  favicon: '/favicon.ico',
  hero_banner: '/hero-banner.webp',
  meta_title: 'MD. Moshiur Rahman | Lead Full-Stack & Cloud Engineer',
  meta_description: 'Premium dual-theme developer portfolio for MD. Moshiur Rahman featuring Apple Emerald Light and Black Mamba Luxury Gold themes.',
  seo_keywords: 'Full Stack Developer, React, TypeScript, Cloud Architecture, PostgreSQL, Moshiur Rahman',
  og_image: '/og-image.png',
  contact_email: 'borshonsweb@gmail.com',
  active_theme: 'dual',
  show_stats: true,
  maintenance_mode: false,
  primary_color: '#00E5FF',
  secondary_color: '#00C8A8',
  accent_color: '#D4AF37',
};

export const settingsService = {
  async getAll(): Promise<SiteSettingsRow[]> {
    const single = await this.getById('default');
    return single ? [single] : [DEFAULT_SETTINGS];
  },

  async getById(id: string = 'default'): Promise<SiteSettingsRow | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          const row = data as SiteSettingsRow;
          storageHelper.setCached('settings', row);
          return row;
        }
        if (error && !isTableMissingError(error)) {
          console.warn(`settingsService.getById(${id}) note:`, error.message || error);
        }
      } catch (err: any) {
        console.warn(`settingsService.getById(${id}) network note:`, err.message || err);
      }
    }

    const cached = storageHelper.getCached<SiteSettingsRow | null>('settings', null);
    if (cached) {
      return cached;
    }

    storageHelper.setCached('settings', DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  },

  async create(payload: Partial<SiteSettingsRow>): Promise<SiteSettingsRow> {
    return this.update('default', payload);
  },

  async update(id: string = 'default', payload: Partial<SiteSettingsRow>): Promise<SiteSettingsRow> {
    const current = (await this.getById(id)) || DEFAULT_SETTINGS;
    const merged: SiteSettingsRow = {
      ...current,
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .upsert([{ ...merged }])
          .select()
          .single();

        if (error) {
          console.warn('Supabase settings update note:', error.message);
        } else if (data) {
          const updatedRow = data as SiteSettingsRow;
          storageHelper.setCached('settings', updatedRow);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase settings update network note:', err.message);
      }
    }

    storageHelper.setCached('settings', merged);
    return merged;
  },

  async delete(id: string): Promise<boolean> {
    storageHelper.removeCached('settings');
    return true;
  },
};
