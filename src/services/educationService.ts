import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { EducationRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const getDefaultEducation = (): EducationRow[] => {
  return portfolioConfig.education.map((edu, idx) => ({
    id: edu.id || `edu-${idx + 1}`,
    degree: edu.degree,
    field: edu.field,
    institution: edu.institution,
    location: edu.location,
    duration: edu.duration,
    grade: edu.grade,
    highlights: edu.highlights || [],
    display_order: idx,
    sort_order: idx,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

export const educationService = {
  async getAll(): Promise<EducationRow[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const rows = data as EducationRow[];
          storageHelper.setCached('education', rows);
          return rows;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('educationService.getAll note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('educationService.getAll network note:', err.message || err);
      }
    }

    // Resilient fallback to local cache or portfolio defaults
    const cached = storageHelper.getCached<EducationRow[]>('education', []);
    if (cached && cached.length > 0) {
      return cached;
    }

    const defaults = getDefaultEducation();
    storageHelper.setCached('education', defaults);
    return defaults;
  },

  async getById(id: string): Promise<EducationRow | null> {
    const list = await this.getAll();
    return list.find((e) => e.id === id) || null;
  },

  async create(payload: Partial<EducationRow>): Promise<EducationRow> {
    const currentList = await this.getAll();
    const newRecord: EducationRow = {
      id: payload.id || `edu-${Date.now()}`,
      degree: payload.degree || 'Degree Program',
      field: payload.field || '',
      institution: payload.institution || 'Academic Institution',
      location: payload.location || 'Location',
      duration: payload.duration || 'Year - Year',
      grade: payload.grade || '',
      highlights: payload.highlights || [],
      display_order: payload.display_order ?? currentList.length,
      sort_order: payload.sort_order ?? currentList.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('education')
          .insert([newRecord])
          .select()
          .single();

        if (error) {
          console.warn('Supabase education insert note:', error.message);
        } else if (data) {
          const created = data as EducationRow;
          const updated = [...currentList, created];
          storageHelper.setCached('education', updated);
          return created;
        }
      } catch (err: any) {
        console.warn('Supabase education insert network note:', err.message);
      }
    }

    // Always persist to local cache so saving never fails
    const updated = [...currentList, newRecord];
    storageHelper.setCached('education', updated);
    return newRecord;
  },

  async update(id: string, payload: Partial<EducationRow>): Promise<EducationRow> {
    const currentList = await this.getAll();
    const existingIndex = currentList.findIndex((e) => e.id === id);

    const mergedRecord: EducationRow = {
      ...(existingIndex >= 0 ? currentList[existingIndex] : {}),
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    } as EducationRow;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('education')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.warn('Supabase education update note:', error.message);
        } else if (data) {
          const updatedRow = data as EducationRow;
          const updatedList = existingIndex >= 0
            ? currentList.map((e) => (e.id === id ? updatedRow : e))
            : [...currentList, updatedRow];
          storageHelper.setCached('education', updatedList);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase education update network note:', err.message);
      }
    }

    // Always persist locally
    const updatedList = existingIndex >= 0
      ? currentList.map((e) => (e.id === id ? mergedRecord : e))
      : [...currentList, mergedRecord];
    storageHelper.setCached('education', updatedList);
    return mergedRecord;
  },

  async delete(id: string): Promise<boolean> {
    const currentList = await this.getAll();
    const updatedList = currentList.filter((e) => e.id !== id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('education')
          .delete()
          .eq('id', id);

        if (error) {
          console.warn('Supabase education delete note:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase education delete network note:', err.message);
      }
    }

    storageHelper.setCached('education', updatedList);
    return true;
  },
};
