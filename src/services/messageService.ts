import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ContactMessageRow } from '../types/database';
import { activityLogService } from './activityLogService';

const LOCAL_STORAGE_KEY = 'portfolio_local_messages';

function getLocalMessages(): ContactMessageRow[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveLocalMessages(msgs: ContactMessageRow[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(msgs));
  } catch {}
}

export const messageService = {
  async getAll(): Promise<ContactMessageRow[]> {
    const local = getLocalMessages();
    if (!isSupabaseConfigured) return local;

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn('messageService.getAll info:', error.message || error);
        }
        return local;
      }
      const remote = (data as ContactMessageRow[]) || [];
      const remoteIds = new Set(remote.map(r => r.id));
      const combined = [...remote, ...local.filter(l => !remoteIds.has(l.id))];
      return combined.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    } catch {
      return local;
    }
  },

  async getById(id: string): Promise<ContactMessageRow | null> {
    const local = getLocalMessages().find(m => m.id === id);
    if (!isSupabaseConfigured) return local || null;

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        return local || null;
      }
      return (data as ContactMessageRow) || local || null;
    } catch {
      return local || null;
    }
  },

  async create(payload: Omit<ContactMessageRow, 'id' | 'created_at' | 'status'> & { status?: 'unread' | 'read' | 'archived' }): Promise<ContactMessageRow> {
    const newMsg: ContactMessageRow = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      status: payload.status || 'unread',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert([{
            name: newMsg.name,
            email: newMsg.email,
            subject: newMsg.subject,
            message: newMsg.message,
            status: newMsg.status,
          }])
          .select()
          .single();

        if (!error && data) {
          await activityLogService.log('New Inquiry Received', 'Contact Messages', `From ${payload.name} (${payload.email})`);
          return data as ContactMessageRow;
        }
      } catch {}
    }

    // Offline / fallback storage
    const current = getLocalMessages();
    saveLocalMessages([newMsg, ...current]);
    await activityLogService.log('New Inquiry Received', 'Contact Messages', `From ${payload.name} (${payload.email})`);
    return newMsg;
  },

  async update(id: string, payload: Partial<ContactMessageRow>): Promise<ContactMessageRow> {
    // Update local cache if present
    const local = getLocalMessages();
    const idx = local.findIndex(m => m.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...payload };
      saveLocalMessages(local);
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .update(payload)
          .eq('id', id)
          .select()
          .maybeSingle();

        if (!error && data) {
          return data as ContactMessageRow;
        }
      } catch {}
    }

    if (idx !== -1) {
      return local[idx];
    }
    return {
      id,
      name: '',
      email: '',
      subject: '',
      message: '',
      status: payload.status || 'read',
      ...payload,
    };
  },

  async markAsRead(id: string): Promise<ContactMessageRow> {
    return this.update(id, { status: 'read' });
  },

  async markAsArchived(id: string): Promise<ContactMessageRow> {
    return this.update(id, { status: 'archived' });
  },

  async delete(id: string): Promise<boolean> {
    const local = getLocalMessages();
    saveLocalMessages(local.filter(m => m.id !== id));

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id);
      } catch {}
    }
    return true;
  },
};
