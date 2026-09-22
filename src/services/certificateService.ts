import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { CertificateRow } from '../types/database';
import { portfolioConfig } from '../config/portfolio';
import { storageHelper } from './storageHelper';

const getDefaultCertificates = (): CertificateRow[] => {
  return portfolioConfig.certificates.map((cert, idx) => ({
    id: cert.id || `cert-${idx + 1}`,
    title: cert.title,
    issuer: cert.issuer,
    issuer_logo: cert.issuerLogo || '',
    theme: cert.theme || 'dark',
    category: (cert as any).category || 'Engineering',
    accent: cert.accent || '#00E5FF',
    image: cert.image,
    issue_date: cert.issueDate,
    expiry_date: cert.expiryDate,
    credential_id: cert.credentialId,
    credential_url: cert.credentialUrl,
    verification_url: (cert as any).verificationUrl || cert.credentialUrl,
    skills: cert.skills || [],
    description: cert.description || '',
    verified: cert.verified ?? true,
    display_order: idx,
    sort_order: idx,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

export const certificateService = {
  async getAll(): Promise<CertificateRow[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const rows = data as CertificateRow[];
          storageHelper.setCached('certificates', rows);
          return rows;
        }
        if (error && !isTableMissingError(error)) {
          console.warn('certificateService.getAll note:', error.message || error);
        }
      } catch (err: any) {
        console.warn('certificateService.getAll network note:', err.message || err);
      }
    }

    const cached = storageHelper.getCached<CertificateRow[]>('certificates', []);
    if (cached && cached.length > 0) {
      return cached;
    }

    const defaults = getDefaultCertificates();
    storageHelper.setCached('certificates', defaults);
    return defaults;
  },

  async getById(id: string): Promise<CertificateRow | null> {
    const list = await this.getAll();
    return list.find((c) => c.id === id) || null;
  },

  async create(payload: Partial<CertificateRow>): Promise<CertificateRow> {
    const currentList = await this.getAll();
    const newRecord: CertificateRow = {
      id: payload.id || `cert-${Date.now()}`,
      title: payload.title || 'Certificate of Excellence',
      issuer: payload.issuer || 'Issuing Authority',
      issuer_logo: payload.issuer_logo || '',
      theme: payload.theme || 'dark',
      category: payload.category || 'Engineering',
      accent: payload.accent || '#00E5FF',
      image: payload.image || '/certificates/cert-1.webp',
      issue_date: payload.issue_date || '2024',
      expiry_date: payload.expiry_date || 'Lifetime',
      credential_id: payload.credential_id || '',
      credential_url: payload.credential_url || '',
      verification_url: payload.verification_url || '',
      skills: payload.skills || [],
      description: payload.description || '',
      verified: payload.verified ?? true,
      display_order: payload.display_order ?? currentList.length,
      sort_order: payload.sort_order ?? currentList.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .insert([newRecord])
          .select()
          .single();

        if (error) {
          console.warn('Supabase certificate insert note:', error.message);
        } else if (data) {
          const created = data as CertificateRow;
          const updated = [...currentList, created];
          storageHelper.setCached('certificates', updated);
          return created;
        }
      } catch (err: any) {
        console.warn('Supabase certificate insert network note:', err.message);
      }
    }

    const updated = [...currentList, newRecord];
    storageHelper.setCached('certificates', updated);
    return newRecord;
  },

  async update(id: string, payload: Partial<CertificateRow>): Promise<CertificateRow> {
    const currentList = await this.getAll();
    const existingIndex = currentList.findIndex((c) => c.id === id);

    const mergedRecord: CertificateRow = {
      ...(existingIndex >= 0 ? currentList[existingIndex] : {}),
      ...payload,
      id,
      updated_at: new Date().toISOString(),
    } as CertificateRow;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.warn('Supabase certificate update note:', error.message);
        } else if (data) {
          const updatedRow = data as CertificateRow;
          const updatedList = existingIndex >= 0
            ? currentList.map((c) => (c.id === id ? updatedRow : c))
            : [...currentList, updatedRow];
          storageHelper.setCached('certificates', updatedList);
          return updatedRow;
        }
      } catch (err: any) {
        console.warn('Supabase certificate update network note:', err.message);
      }
    }

    const updatedList = existingIndex >= 0
      ? currentList.map((c) => (c.id === id ? mergedRecord : c))
      : [...currentList, mergedRecord];
    storageHelper.setCached('certificates', updatedList);
    return mergedRecord;
  },

  async delete(id: string): Promise<boolean> {
    const currentList = await this.getAll();
    const updatedList = currentList.filter((c) => c.id !== id);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('certificates')
          .delete()
          .eq('id', id);

        if (error) {
          console.warn('Supabase certificate delete note:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase certificate delete network note:', err.message);
      }
    }

    storageHelper.setCached('certificates', updatedList);
    return true;
  },
};
