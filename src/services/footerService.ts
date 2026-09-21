import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { FooterSettingsRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';

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
  updated_at: new Date().toISOString(),
};

export const footerService = {
  async get(): Promise<FooterSettingsRow> {
    if (!isSupabaseConfigured) return DEFAULT_FOOTER_SETTINGS;
    try {
      const { data, error } = await supabase
        .from('footer_settings')
        .select('*')
        .eq('id', 'default')
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn('footerService.get info:', error.message || error);
        }
        return DEFAULT_FOOTER_SETTINGS;
      }
      return (data as FooterSettingsRow) || DEFAULT_FOOTER_SETTINGS;
    } catch {
      return DEFAULT_FOOTER_SETTINGS;
    }
  },

  async update(payload: Partial<FooterSettingsRow>): Promise<FooterSettingsRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const record = {
      ...DEFAULT_FOOTER_SETTINGS,
      ...payload,
      id: 'default',
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('footer_settings')
      .upsert(record)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "footer_settings" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as FooterSettingsRow;
  },
};
