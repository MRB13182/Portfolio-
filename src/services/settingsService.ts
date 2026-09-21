import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SiteSettingsRow } from '../types/database';

const DEFAULT_SETTINGS: SiteSettingsRow = {
  id: 'default',
  site_title: 'MD. Moshiur Rahman | Luxury Portfolio',
  meta_description: 'Premium dual-theme developer portfolio for MD. Moshiur Rahman featuring Apple Emerald Light and Black Mamba Luxury Gold themes.',
  contact_email: 'borshonsweb@gmail.com',
  active_theme: 'dual',
  show_stats: true,
  maintenance_mode: false,
};

export const settingsService = {
  async getAll(): Promise<SiteSettingsRow[]> {
    if (!isSupabaseConfigured) return [DEFAULT_SETTINGS];
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn('settingsService.getAll info:', error.message || error);
        }
        return [DEFAULT_SETTINGS];
      }
      return (data as SiteSettingsRow[]) || [DEFAULT_SETTINGS];
    } catch {
      return [DEFAULT_SETTINGS];
    }
  },

  async getById(id: string = 'default'): Promise<SiteSettingsRow | null> {
    if (!isSupabaseConfigured) return DEFAULT_SETTINGS;
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`settingsService.getById(${id}) info:`, error.message || error);
        }
        return DEFAULT_SETTINGS;
      }
      return (data as SiteSettingsRow) || DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  async create(payload: Partial<SiteSettingsRow>): Promise<SiteSettingsRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('site_settings')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "site_settings" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as SiteSettingsRow;
  },

  async update(id: string = 'default', payload: Partial<SiteSettingsRow>): Promise<SiteSettingsRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ ...payload, id, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "site_settings" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as SiteSettingsRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('site_settings')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "site_settings" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
