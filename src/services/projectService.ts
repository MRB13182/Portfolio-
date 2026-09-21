import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ProjectRow } from '../types/database';

export const projectService = {
  async getAll(): Promise<ProjectRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('projectService.getAll info:', error.message || error);
        return [];
      }
      return (data as ProjectRow[]) || [];
    } catch (e: any) {
      if (!isTableMissingError(e)) {
        console.warn('projectService.getAll exception:', e.message || e);
      }
      return [];
    }
  },

  async getById(id: string): Promise<ProjectRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`projectService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as ProjectRow;
    } catch {
      return null;
    }
  },

  async create(payload: Partial<ProjectRow>): Promise<ProjectRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('projects')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "projects" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as ProjectRow;
  },

  async update(id: string, payload: Partial<ProjectRow>): Promise<ProjectRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('projects')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "projects" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as ProjectRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "projects" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
