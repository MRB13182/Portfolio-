import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SiteSettingsRow } from '../types/database';

const DEFAULT_SETTINGS: SiteSettingsRow = {
  id: 'default',
  site_title: 'MD. Moshiur Rahman | Luxury Portfolio',
  meta_description: 'Premium dual-theme developer portfolio for MD. Moshiur Rahman.',
  contact_email: 'borshonsweb@gmail.com',
  active_theme: 'dual',
  show_stats: true,
  maintenance_mode: false,
};

export const settingsService = {
  async getAll(): Promise<SiteSettingsRow[]> {
    const item = await this.getById('default');
    return item ? [item] : [];
  },
  async getById(id: string = 'default'): Promise<SiteSettingsRow | null> {
    if (!isSupabaseConfigured) return DEFAULT_SETTINGS;
    const { data, error } = await supabase.from('site_settings').select('*').eq('id', id).maybeSingle();
    if (error) {
      if (isTableMissingError(error)) return DEFAULT_SETTINGS;
      throw error;
    }
    return (data as SiteSettingsRow) || DEFAULT_SETTINGS;
  },
  async create(payload: Partial<SiteSettingsRow>): Promise<SiteSettingsRow> {
    return this.update(payload.id || 'default', payload);
  },
  async update(id: string = 'default', payload: Partial<SiteSettingsRow>): Promise<SiteSettingsRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const row = {
      id,
      site_title: payload.site_title ?? payload.website_name ?? DEFAULT_SETTINGS.site_title,
      meta_description: payload.meta_description ?? DEFAULT_SETTINGS.meta_description,
      contact_email: payload.contact_email ?? DEFAULT_SETTINGS.contact_email,
      active_theme: payload.active_theme ?? DEFAULT_SETTINGS.active_theme,
      show_stats: payload.show_stats ?? DEFAULT_SETTINGS.show_stats,
      maintenance_mode: payload.maintenance_mode ?? DEFAULT_SETTINGS.maintenance_mode,
      custom_announcement: payload.custom_announcement ?? null,
      main_logo: payload.main_logo ?? payload.website_logo ?? null,
      dark_logo: payload.dark_logo ?? null,
      light_logo: payload.light_logo ?? null,
      favicon: payload.favicon ?? null,
      hero_banner: payload.hero_banner ?? null,
      meta_title: payload.meta_title ?? null,
      seo_keywords: payload.seo_keywords ?? [],
      og_image: payload.og_image ?? null,
      primary_color: payload.primary_color ?? '#00E5FF',
      secondary_color: payload.secondary_color ?? '#050505',
      accent_color: payload.accent_color ?? '#00C8A8',
      background_color: payload.background_color ?? '#050505',
      navigation: payload.navigation ?? [],
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('site_settings').upsert(row).select().single();
    if (error) throw error;
    return data as SiteSettingsRow;
  },
};
