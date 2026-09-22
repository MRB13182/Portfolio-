import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { FooterSettingsRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const DEFAULT_FOOTER_SETTINGS: FooterSettingsRow = {
  id: 'default',
  footer_logo: '',
  footer_description: 'Architecting high-performance web systems, generative AI engines, and enterprise solutions with obsessive design fidelity.',
  copyright_text: `© ${new Date().getFullYear()} MD. Moshiur Rahman. All rights reserved.`,
  email: portfolioConfig.personal.email,
  phone: portfolioConfig.personal.phone,
  address: portfolioConfig.personal.location,
  social_links: portfolioConfig.socials.map((s) => ({
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
  updated_at: new Date().toISOString(),
};

export const footerService = {
  async get(): Promise<FooterSettingsRow> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('footer_settings')
          .select('*')
          .eq('id', 'default')
          .maybeSingle();

        if (!error && data) {
          const row = data as FooterSettingsRow;
          storageHelper.setCached('footer', row);
          return row;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('footerService.get note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('footerService.get network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<FooterSettingsRow | null>('footer', null);
    if (cached) {
      return cached;
    }

    storageHelper.setCached('footer', DEFAULT_FOOTER_SETTINGS);
    return DEFAULT_FOOTER_SETTINGS;
  },

  async update(payload: Partial<FooterSettingsRow>): Promise<FooterSettingsRow> {
    const current = (await this.get()) || DEFAULT_FOOTER_SETTINGS;
    const record: FooterSettingsRow = {
      ...current,
      ...payload,
      id: 'default',
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('footer_settings')
          .upsert([record])
          .select()
          .single();

        if (error) {
          console.warn('Supabase footer update note:', error.message);
        } else if (data) {
          const updatedRow = data as FooterSettingsRow;
          storageHelper.setCached('footer', updatedRow);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase footer update network note:', err.message);
      }
    }

    storageHelper.setCached('footer', record);
    return record;
  },
};
