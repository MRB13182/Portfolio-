import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ContactMessageRow } from '../types/database';

export const messageService = {
  async getAll(): Promise<ContactMessageRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('messageService.getAll info:', error.message || error);
        return [];
      }
      return (data as ContactMessageRow[]) || [];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<ContactMessageRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`messageService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as ContactMessageRow;
    } catch {
      return null;
    }
  },

  async create(payload: Omit<ContactMessageRow, 'id' | 'created_at' | 'status'> & { status?: 'unread' | 'read' | 'archived' }): Promise<ContactMessageRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase configuration (VITE_SUPABASE_ANON_KEY) is required to submit messages.');
    }
    const record = {
      ...payload,
      status: payload.status || 'unread',
    };
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([record])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "contact_messages" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as ContactMessageRow;
  },

  async update(id: string, payload: Partial<ContactMessageRow>): Promise<ContactMessageRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('contact_messages')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "contact_messages" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return data as ContactMessageRow;
  },

  async markAsRead(id: string): Promise<ContactMessageRow> {
    return this.update(id, { status: 'read' });
  },

  async markAsArchived(id: string): Promise<ContactMessageRow> {
    return this.update(id, { status: 'archived' });
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "contact_messages" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
