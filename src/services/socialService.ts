import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SocialLinkRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const getDefaultSocials = (): SocialLinkRow[] => {
  return portfolioConfig.socials.map((s, idx) => ({
    id: (s as any).id || `social-${idx + 1}`,
    name: s.name,
    url: s.url,
    icon: s.icon,
    color: (s as any).color || '#00E5FF',
    action_type: (s as any).action_type || 'link',
    enabled: true,
    display_order: idx,
    sort_order: idx,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

export const socialService = {
  async getAll(): Promise<SocialLinkRow[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const rows = data as SocialLinkRow[];
          storageHelper.setCached('social_links', rows);
          return rows;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('socialService.getAll note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('socialService.getAll network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<SocialLinkRow[]>('social_links', []);
    if (cached && cached.length > 0) {
      return cached;
    }

    const defaults = getDefaultSocials();
    storageHelper.setCached('social_links', defaults);
    return defaults;
  },

  async getById(id: string): Promise<SocialLinkRow | null> {
    const list = await this.getAll();
    return list.find((s) => s.id === id) || null;
  },

  async create(payload: Partial<SocialLinkRow>): Promise<SocialLinkRow> {
    const currentList = await this.getAll();
    const newRecord: SocialLinkRow = {
      id: payload.id || `social-${Date.now()}`,
      name: payload.name || 'Social Platform',
      url: payload.url || 'https://',
      icon: payload.icon || 'globe',
      color: payload.color || '#00E5FF',
      action_type: payload.action_type || 'link',
      enabled: payload.enabled ?? true,
      display_order: payload.display_order ?? currentList.length,
      sort_order: payload.sort_order ?? currentList.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .insert([newRecord])
          .select()
          .single();

        if (error) {
          console.warn('Supabase social_links insert note:', error.message);
        } else if (data) {
          const created = data as SocialLinkRow;
          const updated = [...currentList, created];
          storageHelper.setCached('social_links', updated);
          return created;
        }
      } catch (err: any) {
        console.warn('Supabase social_links insert network note:', err.message);
      }
    }

    const updated = [...currentList, newRecord];
    storageHelper.setCached('social_links', updated);
    return newRecord;
  },

  async update(id: string, payload: Partial<SocialLinkRow>): Promise<SocialLinkRow> {
    const currentList = await this.getAll();
    const existingIndex = currentList.findIndex((s) => s.id === id);

    const mergedRecord: SocialLinkRow = {
      ...(existingIndex >= 0 ? currentList[existingIndex] : {}),
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    } as SocialLinkRow;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.warn('Supabase social_links update note:', error.message);
        } else if (data) {
          const updatedRow = data as SocialLinkRow;
          const updatedList = existingIndex >= 0
            ? currentList.map((s) => (s.id === id ? updatedRow : s))
            : [...currentList, updatedRow];
          storageHelper.setCached('social_links', updatedList);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase social_links update network note:', err.message);
      }
    }

    const updatedList = existingIndex >= 0
      ? currentList.map((s) => (s.id === id ? mergedRecord : s))
      : [...currentList, mergedRecord];
    storageHelper.setCached('social_links', updatedList);
    return mergedRecord;
  },

  async delete(id: string): Promise<boolean> {
    const currentList = await this.getAll();
    const updatedList = currentList.filter((s) => s.id !== id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('social_links')
          .delete()
          .eq('id', id);

        if (error) {
          console.warn('Supabase social_links delete note:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase social_links delete network note:', err.message);
      }
    }

    storageHelper.setCached('social_links', updatedList);
    return true;
  },
};
