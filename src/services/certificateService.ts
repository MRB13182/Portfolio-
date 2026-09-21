import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { CertificateRow } from '../types/database';

export const certificateService = {
  async getAll(): Promise<CertificateRow[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase.from('certificates').select('*').order('display_order', { ascending: true });
    if (error) {
      if (isTableMissingError(error)) return [];
      throw error;
    }
    return (data as CertificateRow[]) || [];
  },
  async getById(id: string): Promise<CertificateRow | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase.from('certificates').select('*').eq('id', id).maybeSingle();
    if (error) {
      if (isTableMissingError(error)) return null;
      throw error;
    }
    return (data as CertificateRow) || null;
  },
  async create(payload: Partial<CertificateRow>): Promise<CertificateRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('certificates').insert([{
      title: payload.title,
      issuer: payload.issuer,
      issuer_logo: payload.issuer_logo ?? null,
      theme: payload.theme ?? null,
      category: payload.category ?? null,
      accent: payload.accent ?? null,
      image: payload.image ?? null,
      issue_date: payload.issue_date ?? null,
      expiry_date: payload.expiry_date ?? null,
      credential_id: payload.credential_id ?? null,
      credential_url: payload.credential_url ?? null,
      verification_url: payload.verification_url ?? null,
      skills: payload.skills ?? [],
      description: payload.description ?? null,
      verified: payload.verified ?? true,
      is_visible: payload.is_visible ?? true,
      display_order: payload.display_order ?? payload.sort_order ?? 0,
    }]).select().single();
    if (error) throw error;
    return data as CertificateRow;
  },
  async update(id: string, payload: Partial<CertificateRow>): Promise<CertificateRow> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.from('certificates').update({
      ...payload,
      display_order: payload.display_order ?? payload.sort_order,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select().single();
    if (error) throw error;
    return data as CertificateRow;
  },
  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
