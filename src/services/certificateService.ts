import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { CertificateRow } from '../types/database';

export const certificateService = {
  async getAll(): Promise<CertificateRow[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        if (isTableMissingError(error)) {
          return [];
        }
        console.warn('certificateService.getAll info:', error.message || error);
        return [];
      }
      return (data as CertificateRow[]) || [];
    } catch {
      return [];
    }
  },

  async getById(id: string): Promise<CertificateRow | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn(`certificateService.getById(${id}) info:`, error.message || error);
        }
        return null;
      }
      return data as CertificateRow;
    } catch {
      return null;
    }
  },

  async create(payload: Partial<CertificateRow>): Promise<CertificateRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('certificates')
      .insert([payload])
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "certificates" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as CertificateRow;
  },

  async update(id: string, payload: Partial<CertificateRow>): Promise<CertificateRow> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { data, error } = await supabase
      .from('certificates')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "certificates" table does not exist yet in Supabase. Please run schema.sql in Supabase SQL Editor.');
      }
      throw error;
    }
    return data as CertificateRow;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured with a valid ANON key.');
    }
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) {
      if (isTableMissingError(error)) {
        throw new Error('The "certificates" table does not exist yet in Supabase.');
      }
      throw error;
    }
    return true;
  },
};
