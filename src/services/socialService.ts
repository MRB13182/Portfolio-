import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SocialLinkRow } from '../types/database';

export const socialService = {
  async getAll(): Promise<SocialLinkRow[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase.from('social_links').select('*').order('display_order', { ascending: true });
    if (error) {
      if (isTableMissingError(error)) return [];
      throw error;
    }
    return (data as SocialLinkRow[]) || [];
  },
  async getById(id: string): Promise<SocialLinkRow | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase.from('social_links').select('*').eq('id', id).maybeSingle();
    if (error) {
      if (isTableMissingError(error)) return null;
      throw error;
    }
    return (data as SocialLinkRow) || null;
  },
  async create(payload: Partial<SocialLinkRow>): Promise<SocialLinkRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('social_links').insert([{
      platform_name: payload.platform_name ?? payload.name ?? 'Social',
      name: payload.name ?? payload.platform_name ?? 'Social',
      url: payload.url ?? '#',
      icon: payload.icon ?? 'ExternalLink',
      color: payload.color ?? null,
      action_type: payload.action_type ?? 'link',
      enabled: payload.enabled ?? true,
      display_order: payload.display_order ?? payload.sort_order ?? 0,
    }]).select().single();
    if (error) throw error;
    return data as SocialLinkRow;
  },
  async update(id: string, payload: Partial<SocialLinkRow>): Promise<SocialLinkRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('social_links').update({
      ...payload,
      display_order: payload.display_order ?? payload.sort_order,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select().single();
    if (error) throw error;
    return data as SocialLinkRow;
  },
  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
