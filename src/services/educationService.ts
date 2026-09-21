import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { EducationRow } from '../types/database';

export const educationService = {
  async getAll(): Promise<EducationRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('educationService.getAll info:', error.message || error);
        return [];
      }
      return (data as EducationRow[]) || [];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<EducationRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`educationService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as EducationRow;
    } catch {
      return null;
    }
  },

  async create(payload: Partial<EducationRow>): Promise<EducationRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('education')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "education" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as EducationRow;
  },

  async update(id: string, payload: Partial<EducationRow>): Promise<EducationRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('education')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "education" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as EducationRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "education" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
