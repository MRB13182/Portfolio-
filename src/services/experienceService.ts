import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ExperienceRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const getDefaultExperience = (): ExperienceRow[] => {
  return portfolioConfig.experience.map((exp, idx) => ({
    id: exp.id || `exp-${idx + 1}`,
    position: exp.position,
    company: exp.company,
    location: exp.location,
    duration: exp.duration,
    period: exp.period || exp.duration,
    type: exp.type as any,
    description: exp.description,
    achievements: exp.achievements || [],
    skills: exp.skills || [],
    display_order: idx,
    sort_order: idx,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

export const experienceService = {
  async getAll(): Promise<ExperienceRow[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const rows = data as ExperienceRow[];
          storageHelper.setCached('experience', rows);
          return rows;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('experienceService.getAll note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('experienceService.getAll network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<ExperienceRow[]>('experience', []);
    if (cached && cached.length > 0) {
      return cached;
    }

    const defaults = getDefaultExperience();
    storageHelper.setCached('experience', defaults);
    return defaults;
  },

  async getById(id: string): Promise<ExperienceRow | null> {
    const list = await this.getAll();
    return list.find((e) => e.id === id) || null;
  },

  async create(payload: Partial<ExperienceRow>): Promise<ExperienceRow> {
    const currentList = await this.getAll();
    const newRecord: ExperienceRow = {
      id: payload.id || `exp-${Date.now()}`,
      position: payload.position || 'Software Engineer',
      company: payload.company || 'Company Name',
      location: payload.location || 'Remote',
      duration: payload.duration || 'Present',
      period: payload.period || payload.duration || 'Present',
      type: payload.type || 'Full-time',
      description: payload.description || '',
      achievements: payload.achievements || [],
      skills: payload.skills || [],
      display_order: payload.display_order ?? currentList.length,
      sort_order: payload.sort_order ?? currentList.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('experience')
          .insert([newRecord])
          .select()
          .single();

        if (error) {
          console.warn('Supabase experience insert note:', error.message);
        } else if (data) {
          const created = data as ExperienceRow;
          const updated = [...currentList, created];
          storageHelper.setCached('experience', updated);
          return created;
        }
      } catch (err: any) {
        console.warn('Supabase experience insert network note:', err.message);
      }
    }

    const updated = [...currentList, newRecord];
    storageHelper.setCached('experience', updated);
    return newRecord;
  },

  async update(id: string, payload: Partial<ExperienceRow>): Promise<ExperienceRow> {
    const currentList = await this.getAll();
    const existingIndex = currentList.findIndex((e) => e.id === id);

    const mergedRecord: ExperienceRow = {
      ...(existingIndex >= 0 ? currentList[existingIndex] : {}),
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    } as ExperienceRow;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('experience')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.warn('Supabase experience update note:', error.message);
        } else if (data) {
          const updatedRow = data as ExperienceRow;
          const updatedList = existingIndex >= 0
            ? currentList.map((e) => (e.id === id ? updatedRow : e))
            : [...currentList, updatedRow];
          storageHelper.setCached('experience', updatedList);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase experience update network note:', err.message);
      }
    }

    const updatedList = existingIndex >= 0
      ? currentList.map((e) => (e.id === id ? mergedRecord : e))
      : [...currentList, mergedRecord];
    storageHelper.setCached('experience', updatedList);
    return mergedRecord;
  },

  async delete(id: string): Promise<boolean> {
    const currentList = await this.getAll();
    const updatedList = currentList.filter((e) => e.id !== id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('experience')
          .delete()
          .eq('id', id);

        if (error) {
          console.warn('Supabase experience delete note:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase experience delete network note:', err.message);
      }
    }

    storageHelper.setCached('experience', updatedList);
    return true;
  },
};
