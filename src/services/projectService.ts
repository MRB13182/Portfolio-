import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ProjectRow } from '../types/database';

export const projectService = {
  async getAll(): Promise<ProjectRow[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .is('deleted_at', null)
      .order('display_order', { ascending: true });

    if (error) {
      if (isTableMissingError(error)) return [];
      throw error;
    }
    return (data as ProjectRow[]) || [];
  },

  async getById(id: string): Promise<ProjectRow | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) {
      if (isTableMissingError(error)) return null;
      throw error;
    }
    return (data as ProjectRow) || null;
  },

  async create(payload: Partial<ProjectRow>): Promise<ProjectRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('projects').insert([{
      title: payload.title,
      category: payload.category,
      tagline: payload.tagline ?? null,
      description: payload.description ?? null,
      image: payload.image ?? null,
      fallback_gradient: payload.fallback_gradient ?? null,
      tech_stack: payload.tech_stack ?? [],
      features: payload.features ?? [],
      architecture: payload.architecture ?? [],
      live_url: payload.live_url ?? null,
      github_url: payload.github_url ?? null,
      featured: payload.featured ?? false,
      display_order: payload.display_order ?? payload.sort_order ?? 0,
      status: payload.status ?? 'published',
    }]).select().single();
    if (error) throw error;
    return data as ProjectRow;
  },

  async update(id: string, payload: Partial<ProjectRow>): Promise<ProjectRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('projects').update({
      ...payload,
      display_order: payload.display_order ?? payload.sort_order,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select().single();
    if (error) throw error;
    return data as ProjectRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { error } = await supabase.from('projects').update({
      deleted_at: new Date().toISOString(),
    }).eq('id', id);
    if (error) throw error;
    return true;
  },
};
