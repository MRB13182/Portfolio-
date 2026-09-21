import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { FooterSettingsRow } from '../types/database';

const DEFAULT_FOOTER: FooterSettingsRow = {
  id: 'default',
  footer_logo: '',
  footer_description: '',
  copyright_text: '',
  email: '',
  phone: '',
  address: '',
  social_links: [],
  navigation_links: [],
  background_image: '',
  banner_text: '',
  footer_theme: 'luxury',
};

export const footerService = {
  async get(): Promise<FooterSettingsRow> {
    if (!isSupabaseConfigured) return DEFAULT_FOOTER;
    const { data, error } = await supabase.from('footer_settings').select('*').eq('id', 'default').maybeSingle();
    if (error) {
      if (isTableMissingError(error)) return DEFAULT_FOOTER;
      throw error;
    }
    if (!data) return DEFAULT_FOOTER;
    return {
      ...(data as any),
      navigation_links: (data as any).navigation_links ?? (data as any).footer_navigation ?? [],
      background_image: (data as any).background_image ?? (data as any).footer_background ?? '',
      banner_text: (data as any).banner_text ?? (data as any).footer_banner ?? '',
    } as FooterSettingsRow;
  },
  async update(payload: Partial<FooterSettingsRow>): Promise<FooterSettingsRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const row = {
      id: 'default',
      footer_logo: payload.footer_logo ?? null,
      footer_description: payload.footer_description ?? null,
      copyright_text: payload.copyright_text ?? null,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      address: payload.address ?? null,
      footer_navigation: payload.navigation_links ?? [],
      social_links: payload.social_links ?? [],
      footer_banner: payload.banner_text ?? null,
      footer_background: payload.background_image ?? null,
      footer_theme: payload.footer_theme ?? 'luxury',
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('footer_settings').upsert(row).select().single();
    if (error) throw error;
    return {
      ...(data as any),
      navigation_links: row.footer_navigation,
      background_image: row.footer_background,
      banner_text: row.footer_banner,
    } as FooterSettingsRow;
  },
};
