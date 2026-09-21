import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ExperienceRow } from '../types/database';

export const experienceService = {
  async getAll(): Promise<ExperienceRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('experienceService.getAll info:', error.message || error);
        return [];
      }
      return (data as ExperienceRow[]) || [];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<ExperienceRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`experienceService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as ExperienceRow;
    } catch {
      return null;
    }
  },

  async create(payload: Partial<ExperienceRow>): Promise<ExperienceRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('experience')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "experience" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as ExperienceRow;
  },

  async update(id: string, payload: Partial<ExperienceRow>): Promise<ExperienceRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('experience')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "experience" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as ExperienceRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "experience" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
