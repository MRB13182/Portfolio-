import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ProfileRow } from '../types/database';

export const profileService = {
  async getAll(): Promise<ProfileRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('profileService.getAll info:', error.message || error);
        return [];
      }
      return (data as ProfileRow[]) || [];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<ProfileRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`profileService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as ProfileRow;
    } catch {
      return null;
    }
  },

  async getPrimary(): Promise<ProfileRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn('profileService.getPrimary info:', error.message || error);
        }
        return null;
      }
      return data as ProfileRow;
    } catch {
      return null;
    }
  },

  async create(payload: Partial<ProfileRow>): Promise<ProfileRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('profiles')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "profiles" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as ProfileRow;
  },

  async update(id: string, payload: Partial<ProfileRow>): Promise<ProfileRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "profiles" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as ProfileRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "profiles" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
