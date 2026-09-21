import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SocialLinkRow } from '../types/database';

export const socialService = {
  async getAll(): Promise<SocialLinkRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('socialService.getAll info:', error.message || error);
        return [];
      }
      return (data as SocialLinkRow[]) || [];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<SocialLinkRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`socialService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as SocialLinkRow;
    } catch {
      return null;
    }
  },

  async create(payload: Partial<SocialLinkRow>): Promise<SocialLinkRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('social_links')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "social_links" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as SocialLinkRow;
  },

  async update(id: string, payload: Partial<SocialLinkRow>): Promise<SocialLinkRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('social_links')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "social_links" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as SocialLinkRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "social_links" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
