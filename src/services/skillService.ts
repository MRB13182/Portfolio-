import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SkillRow } from '../types/database';

export const skillService = {
  async getAll(): Promise<SkillRow[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
    if (error) {
      if (isTableMissingError(error)) return [];
      throw error;
    }
    return (data as SkillRow[]) || [];
  },

  async getById(id: string): Promise<SkillRow | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase.from('skills').select('*').eq('id', id).maybeSingle();
    if (error) {
      if (isTableMissingError(error)) return null;
      throw error;
    }
    return (data as SkillRow) || null;
  },

  async create(payload: Partial<SkillRow>): Promise<SkillRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('skills').insert([{
      name: payload.name,
      category: payload.category,
      level: payload.level ?? 0,
      logo: payload.logo ?? null,
      experience: payload.experience ?? null,
      experience_duration: payload.experience_duration ?? null,
      icon_name: payload.icon_name ?? null,
      description: payload.description ?? null,
      projects: payload.projects ?? [],
      projects_using: payload.projects_using ?? [],
      proficiency_highlights: payload.proficiency_highlights ?? [],
      keywords: payload.keywords ?? [],
      accent_color: payload.accent_color ?? null,
      display_order: payload.display_order ?? payload.sort_order ?? 0,
    }]).select().single();
    if (error) throw error;
    return data as SkillRow;
  },

  async update(id: string, payload: Partial<SkillRow>): Promise<SkillRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('skills').update({
      ...payload,
      display_order: payload.display_order ?? payload.sort_order,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select().single();
    if (error) throw error;
    return data as SkillRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
