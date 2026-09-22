import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ProjectRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const getDefaultProjects = (): ProjectRow[] => {
  return portfolioConfig.projects.map((proj, idx) => ({
    id: proj.id || `project-${idx + 1}`,
    title: proj.title,
    category: proj.category,
    tagline: proj.tagline,
    description: proj.description,
    image: proj.image,
    logo: (proj as any).logo || '',
    gallery_images: (proj as any).galleryImages || [],
    fallback_gradient: proj.fallbackGradient,
    tech_stack: proj.techStack || [],
    features: proj.features || [],
    architecture: proj.architecture || [],
    live_url: proj.liveUrl,
    github_url: proj.githubUrl,
    featured: proj.featured || false,
    status: (proj as any).status || 'Live',
    display_order: idx,
    sort_order: idx,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

export const projectService = {
  async getAll(): Promise<ProjectRow[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const rows = data as ProjectRow[];
          storageHelper.setCached('projects', rows);
          return rows;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('projectService.getAll note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('projectService.getAll network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<ProjectRow[]>('projects', []);
    if (cached && cached.length > 0) {
      return cached;
    }

    const defaults = getDefaultProjects();
    storageHelper.setCached('projects', defaults);
    return defaults;
  },

  async getById(id: string): Promise<ProjectRow | null> {
    const list = await this.getAll();
    return list.find((p) => p.id === id) || null;
  },

  async create(payload: Partial<ProjectRow>): Promise<ProjectRow> {
    const currentList = await this.getAll();
    const newRecord: ProjectRow = {
      id: payload.id || `project-${Date.now()}`,
      title: payload.title || 'Untitled Project',
      category: payload.category || 'Full Stack',
      tagline: payload.tagline || '',
      description: payload.description || '',
      image: payload.image || '/projects/project-1.webp',
      logo: payload.logo || '',
      gallery_images: payload.gallery_images || [],
      fallback_gradient: payload.fallback_gradient || 'from-emerald-600 to-slate-900',
      tech_stack: payload.tech_stack || [],
      features: payload.features || [],
      architecture: payload.architecture || [],
      live_url: payload.live_url || '',
      github_url: payload.github_url || '',
      featured: payload.featured || false,
      status: payload.status || 'Live',
      display_order: payload.display_order ?? currentList.length,
      sort_order: payload.sort_order ?? currentList.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .insert([newRecord])
          .select()
          .single();

        if (error) {
          console.warn('Supabase project insert note:', error.message);
        } else if (data) {
          const created = data as ProjectRow;
          const updated = [...currentList, created];
          storageHelper.setCached('projects', updated);
          return created;
        }
      } catch (err: any) {
        console.warn('Supabase project insert network note:', err.message);
      }
    }

    const updated = [...currentList, newRecord];
    storageHelper.setCached('projects', updated);
    return newRecord;
  },

  async update(id: string, payload: Partial<ProjectRow>): Promise<ProjectRow> {
    const currentList = await this.getAll();
    const existingIndex = currentList.findIndex((p) => p.id === id);

    const mergedRecord: ProjectRow = {
      ...(existingIndex >= 0 ? currentList[existingIndex] : {}),
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    } as ProjectRow;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.warn('Supabase project update note:', error.message);
        } else if (data) {
          const updatedRow = data as ProjectRow;
          const updatedList = existingIndex >= 0
            ? currentList.map((p) => (p.id === id ? updatedRow : p))
            : [...currentList, updatedRow];
          storageHelper.setCached('projects', updatedList);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase project update network note:', err.message);
      }
    }

    const updatedList = existingIndex >= 0
      ? currentList.map((p) => (p.id === id ? mergedRecord : p))
      : [...currentList, mergedRecord];
    storageHelper.setCached('projects', updatedList);
    return mergedRecord;
  },

  async delete(id: string): Promise<boolean> {
    const currentList = await this.getAll();
    const updatedList = currentList.filter((p) => p.id !== id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) {
          console.warn('Supabase project delete note:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase project delete network note:', err.message);
      }
    }

    storageHelper.setCached('projects', updatedList);
    return true;
  },
};
