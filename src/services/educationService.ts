import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { EducationRow } from '../types/database';

export const educationService = {
  async getAll(): Promise<EducationRow[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      if (isTableMissingError(error)) return [];
      throw error;
    }
    return (data as EducationRow[]) || [];
  },

  async getById(id: string): Promise<EducationRow | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      if (isTableMissingError(error)) return null;
      throw error;
    }
    return (data as EducationRow) || null;
  },

  async create(payload: Partial<EducationRow>): Promise<EducationRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase
      .from('education')
      .insert([{
        degree: payload.degree,
        institution: payload.institution,
        institution_logo: payload.institution_logo ?? null,
        location: payload.location ?? null,
        duration: payload.duration ?? null,
        grade: payload.grade ?? null,
        highlights: payload.highlights ?? [],
        sort_order: payload.sort_order ?? 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return data as EducationRow;
  },

  async update(id: string, payload: Partial<EducationRow>): Promise<EducationRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase
      .from('education')
      .update({
        degree: payload.degree,
        institution: payload.institution,
        institution_logo: payload.institution_logo ?? null,
        location: payload.location ?? null,
        duration: payload.duration ?? null,
        grade: payload.grade ?? null,
        highlights: payload.highlights ?? [],
        sort_order: payload.sort_order ?? 0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as EducationRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
