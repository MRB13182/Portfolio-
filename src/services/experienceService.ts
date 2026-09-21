import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ExperienceRow } from '../types/database';

export const experienceService = {
  async getAll(): Promise<ExperienceRow[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase.from('experience').select('*').order('display_order', { ascending: true });
    if (error) {
      if (isTableMissingError(error)) return [];
      throw error;
    }
    return (data as ExperienceRow[]) || [];
  },
  async getById(id: string): Promise<ExperienceRow | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase.from('experience').select('*').eq('id', id).maybeSingle();
    if (error) {
      if (isTableMissingError(error)) return null;
      throw error;
    }
    return (data as ExperienceRow) || null;
  },
  async create(payload: Partial<ExperienceRow>): Promise<ExperienceRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('experience').insert([{
      position: payload.position,
      company: payload.company,
      company_logo: payload.company_logo ?? null,
      location: payload.location ?? null,
      duration: payload.duration ?? null,
      period: payload.period ?? null,
      type: payload.type ?? 'Full-time',
      employment_type: payload.employment_type ?? null,
      description: payload.description ?? null,
      achievements: payload.achievements ?? [],
      skills: payload.skills ?? [],
      technologies: payload.skills ?? payload.technologies ?? [],
      display_order: payload.display_order ?? payload.sort_order ?? 0,
    }]).select().single();
    if (error) throw error;
    return data as ExperienceRow;
  },
  async update(id: string, payload: Partial<ExperienceRow>): Promise<ExperienceRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('experience').update({
      ...payload,
      display_order: payload.display_order ?? payload.sort_order,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select().single();
    if (error) throw error;
    return data as ExperienceRow;
  },
  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
