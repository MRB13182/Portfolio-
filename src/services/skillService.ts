import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SkillRow } from '../types/database';

export const skillService = {
  async getAll(): Promise<SkillRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('skillService.getAll info:', error.message || error);
        return [];
      }
      return (data as SkillRow[]) || [];
    } catch (e: any) {
      if (!isTableMissingError(e)) {
        console.warn('skillService.getAll exception:', e.message || e);
      }
      return [];
    }
  },

  async getById(id: string): Promise<SkillRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`skillService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as SkillRow;
    } catch {
      return null;
    }
  },

  async create(payload: Partial<SkillRow>): Promise<SkillRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('skills')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "skills" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as SkillRow;
  },

  async update(id: string, payload: Partial<SkillRow>): Promise<SkillRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('skills')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "skills" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as SkillRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "skills" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
