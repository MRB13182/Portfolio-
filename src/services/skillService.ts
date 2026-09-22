import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { SkillRow } from '../types/database';
import { skills as staticSkills } from '../config/skills';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const getDefaultSkills = (): SkillRow[] => {
  const source = staticSkills.length > 0 ? staticSkills : portfolioConfig.skills;
  return source.map((sk, idx) => ({
    id: sk.id || `skill-${idx + 1}`,
    name: sk.name,
    category: sk.category,
    level: sk.level,
    logo: sk.logo || '',
    experience: sk.experience || '',
    experience_duration: sk.experienceDuration || '',
    icon_name: sk.iconName || '',
    description: sk.description || '',
    projects: sk.projects || [],
    projects_using: sk.projectsUsing || [],
    proficiency_highlights: sk.proficiencyHighlights || [],
    keywords: sk.keywords || [],
    accent_color: sk.accentColor || '#00E5FF',
    display_order: idx,
    sort_order: idx,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

export const skillService = {
  async getAll(): Promise<SkillRow[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const rows = data as SkillRow[];
          storageHelper.setCached('skills', rows);
          return rows;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('skillService.getAll note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('skillService.getAll network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<SkillRow[]>('skills', []);
    if (cached && cached.length > 0) {
      return cached;
    }

    const defaults = getDefaultSkills();
    storageHelper.setCached('skills', defaults);
    return defaults;
  },

  async getById(id: string): Promise<SkillRow | null> {
    const list = await this.getAll();
    return list.find((s) => s.id === id) || null;
  },

  async create(payload: Partial<SkillRow>): Promise<SkillRow> {
    const currentList = await this.getAll();
    const newRecord: SkillRow = {
      id: payload.id || `skill-${Date.now()}`,
      name: payload.name || 'New Skill',
      category: payload.category || 'Frontend',
      level: payload.level ?? 80,
      logo: payload.logo || '',
      experience: payload.experience || '2+ Years',
      experience_duration: payload.experience_duration || payload.experience || '2+ Years',
      icon_name: payload.icon_name || '',
      description: payload.description || '',
      projects: payload.projects || [],
      projects_using: payload.projects_using || [],
      proficiency_highlights: payload.proficiency_highlights || [],
      keywords: payload.keywords || [],
      accent_color: payload.accent_color || '#00E5FF',
      display_order: payload.display_order ?? currentList.length,
      sort_order: payload.sort_order ?? currentList.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .insert([newRecord])
          .select()
          .single();

        if (error) {
          console.warn('Supabase skill insert note:', error.message);
        } else if (data) {
          const created = data as SkillRow;
          const updated = [...currentList, created];
          storageHelper.setCached('skills', updated);
          return created;
        }
      } catch (err: any) {
        console.warn('Supabase skill insert network note:', err.message);
      }
    }

    const updated = [...currentList, newRecord];
    storageHelper.setCached('skills', updated);
    return newRecord;
  },

  async update(id: string, payload: Partial<SkillRow>): Promise<SkillRow> {
    const currentList = await this.getAll();
    const existingIndex = currentList.findIndex((s) => s.id === id);

    const mergedRecord: SkillRow = {
      ...(existingIndex >= 0 ? currentList[existingIndex] : {}),
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    } as SkillRow;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.warn('Supabase skill update note:', error.message);
        } else if (data) {
          const updatedRow = data as SkillRow;
          const updatedList = existingIndex >= 0
            ? currentList.map((s) => (s.id === id ? updatedRow : s))
            : [...currentList, updatedRow];
          storageHelper.setCached('skills', updatedList);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase skill update network note:', err.message);
      }
    }

    const updatedList = existingIndex >= 0
      ? currentList.map((s) => (s.id === id ? mergedRecord : s))
      : [...currentList, mergedRecord];
    storageHelper.setCached('skills', updatedList);
    return mergedRecord;
  },

  async delete(id: string): Promise<boolean> {
    const currentList = await this.getAll();
    const updatedList = currentList.filter((s) => s.id !== id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('skills')
          .delete()
          .eq('id', id);

        if (error) {
          console.warn('Supabase skill delete note:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase skill delete network note:', err.message);
      }
    }

    storageHelper.setCached('skills', updatedList);
    return true;
  },
};
