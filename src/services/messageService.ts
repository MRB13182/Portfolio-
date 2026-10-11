import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ContactMessageRow } from '../types/database';

const LOCAL_STORAGE_KEY = 'portfolio_local_messages';

function getLocalMessages(): ContactMessageRow[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as ContactMessageRow[] : [];
  } catch {
    return [];
  }
}

/**
 * Contact messages are persisted to the trusted database only. When Supabase is configured,
 * localStorage must not be merged into the admin inbox or used to pretend a write succeeded.
 */
export const messageService = {
  async getAll(): Promise<ContactMessageRow[]> {
    if (!isSupabaseConfigured) {
      // Only supports legacy local-only/demo data. Admin routing is disabled without verified
      // Supabase Auth, so this data is never treated as a secured production inbox.
      return getLocalMessages();
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error('Could not load server contact messages. Verify admin access and retry.');
    return (data as ContactMessageRow[]) || [];
  },

  async getById(id: string): Promise<ContactMessageRow | null> {
    if (!isSupabaseConfigured) {
      return getLocalMessages().find((message) => message.id === id) || null;
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error('Could not load this server message. Verify admin access and retry.');
    return (data as ContactMessageRow) || null;
  },

  async create(
    payload: Omit<ContactMessageRow, 'id' | 'created_at' | 'status'> & {
      status?: 'unread' | 'read' | 'archived';
    },
  ): Promise<ContactMessageRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured; the message was not delivered. Please use the direct email link.');
    }

    const name = payload.name.trim();
    const email = payload.email.trim();
    const subject = (payload.subject || 'Portfolio Inquiry').trim();
    const message = payload.message.trim();

    if (name.length < 1 || name.length > 120) throw new Error('Name must be 1–120 characters.');
    if (email.length < 3 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Enter a valid email address.');
    }
    if (subject.length < 1 || subject.length > 200) throw new Error('Subject must be 1–200 characters.');
    if (message.length < 1 || message.length > 5000) throw new Error('Message must be 1–5000 characters.');

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message, status: 'unread' }])
      .select('*')
      .single();

    if (error || !data) {
      throw new Error('Message delivery failed. Nothing was confirmed as received; please use the direct email link.');
    }
    return data as ContactMessageRow;
  },

  async update(id: string, payload: Partial<ContactMessageRow>): Promise<ContactMessageRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured; server messages cannot be updated.');

    // Permit only the intended status field. IDs and content must not be mutable through inbox controls.
    if (payload.status && !['unread', 'read', 'archived'].includes(payload.status)) {
      throw new Error('Invalid message status.');
    }
    const update = payload.status ? { status: payload.status } : {};
    if (Object.keys(update).length === 0) throw new Error('No supported message changes were supplied.');

    const { data, error } = await supabase
      .from('contact_messages')
      .update(update)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error || !data) throw new Error('Message update failed or the record is not accessible.');
    return data as ContactMessageRow;
  },

  async markAsRead(id: string): Promise<ContactMessageRow> {
    return this.update(id, { status: 'read' });
  },

  async markAsArchived(id: string): Promise<ContactMessageRow> {
    return this.update(id, { status: 'archived' });
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured; server messages cannot be deleted.');

    const { data, error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error || !data) throw new Error('Message deletion failed or the record is not accessible.');
    return true;
  },
};
