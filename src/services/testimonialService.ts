import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { TestimonialRow } from '../types/database';
import { storageHelper } from './storageHelper';

const DEFAULT_TESTIMONIALS: TestimonialRow[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company: 'FinTech Global',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    content: 'Moshiur architected our enterprise trading platform with extraordinary speed and precision. The microservices architecture scaled to millions of daily transactions effortlessly.',
    rating: 5,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'test-2',
    name: 'David Chen',
    role: 'Chief Technology Officer',
    company: 'Nexus AI Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    content: 'Unmatched mastery over TypeScript, Next.js, and generative AI pipelines. A rare engineer who balances rock-solid backend reliability with world-class frontend design polish.',
    rating: 5,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const testimonialService = {
  async getAll(): Promise<TestimonialRow[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const rows = data as TestimonialRow[];
          storageHelper.setCached('testimonials', rows);
          return rows;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('testimonialService.getAll note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('testimonialService.getAll network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<TestimonialRow[]>('testimonials', []);
    if (cached && cached.length > 0) {
      return cached;
    }

    storageHelper.setCached('testimonials', DEFAULT_TESTIMONIALS);
    return DEFAULT_TESTIMONIALS;
  },

  async getById(id: string): Promise<TestimonialRow | null> {
    const list = await this.getAll();
    return list.find((t) => t.id === id) || null;
  },

  async create(payload: Partial<TestimonialRow>): Promise<TestimonialRow> {
    const currentList = await this.getAll();
    const newRecord: TestimonialRow = {
      id: payload.id || `test-${Date.now()}`,
      name: payload.name || 'Anonymous Partner',
      role: payload.role || 'Executive',
      company: payload.company || 'Enterprise Solutions',
      avatar: payload.avatar || '',
      content: payload.content || 'Exceptional craftsmanship and architectural execution.',
      rating: payload.rating || 5,
      featured: payload.featured ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .insert([newRecord])
          .select()
          .single();

        if (!error && data) {
          const created = data as TestimonialRow;
          const updated = [created, ...currentList];
          storageHelper.setCached('testimonials', updated);
          return created;
        }
      } catch (err: any) {
        console.warn('Supabase testimonial insert error:', err);
      }
    }

    const updated = [newRecord, ...currentList];
    storageHelper.setCached('testimonials', updated);
    return newRecord;
  },

  async update(id: string, payload: Partial<TestimonialRow>): Promise<TestimonialRow> {
    const currentList = await this.getAll();
    const existing = currentList.find((t) => t.id === id);
    if (!existing) throw new Error(`Testimonial with ID ${id} not found`);

    const updatedRecord: TestimonialRow = {
      ...existing,
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .update(updatedRecord)
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          const saved = data as TestimonialRow;
          const updated = currentList.map((t) => (t.id === id ? saved : t));
          storageHelper.setCached('testimonials', updated);
          return saved;
        }
      } catch (err: any) {
        console.warn('Supabase testimonial update error:', err);
      }
    }

    const updated = currentList.map((t) => (t.id === id ? updatedRecord : t));
    storageHelper.setCached('testimonials', updated);
    return updatedRecord;
  },

  async delete(id: string): Promise<boolean> {
    const currentList = await this.getAll();
    const filtered = currentList.filter((t) => t.id !== id);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('testimonials').delete().eq('id', id);
      } catch (err: any) {
        console.warn('Supabase testimonial delete error:', err);
      }
    }

    storageHelper.setCached('testimonials', filtered);
    return true;
  },
};
