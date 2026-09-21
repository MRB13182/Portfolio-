import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_ID = 'egpwwzkwwxsrctzyhpnv';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseUrl =
  typeof rawUrl === 'string' && rawUrl.trim()
    ? rawUrl.trim()
    : 'https://egpwwzkwwxsrctzyhpnv.supabase.co';

const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const legacyAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabasePublishableKey =
  (typeof publishableKey === 'string' ? publishableKey.trim() : '') ||
  (typeof legacyAnonKey === 'string' ? legacyAnonKey.trim() : '');

export const supabaseAnonKey = supabasePublishableKey;

const isPlaceholderKey = (key: string) => {
  const normalized = key.trim();
  return (
    normalized.length === 0 ||
    normalized === 'YOUR_SUPABASE_ANON_KEY' ||
    normalized === 'YOUR_SUPABASE_PUBLISHABLE_KEY' ||
    normalized.startsWith('sb_publishable_REPLACE_') ||
    normalized.includes('MY_SUPABASE')
  );
};

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && !isPlaceholderKey(supabasePublishableKey);

export function isTableMissingError(error: unknown): boolean {
  if (!error) return false;
  const e = error as { code?: string; message?: string };
  return (
    e.code === 'PGRST205' ||
    e.code === '42P01' ||
    e.code === 'PGRST204' ||
    Boolean(
      typeof e.message === 'string' &&
        (e.message.includes('schema cache') ||
          e.message.includes('relation') ||
          e.message.includes('does not exist') ||
          e.message.includes('Could not find the table'))
    )
  );
}

// The browser may only use the publishable/anon key. Never put a secret/service-role key here.
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey || 'missing-publishable-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const STORAGE_BUCKETS = {
  PROFILE_IMAGES: 'profile-images',
  PROJECT_IMAGES: 'project-images',
  PROJECT_LOGOS: 'project-logos',
  CERTIFICATES: 'certificates',
  FOOTER_ASSETS: 'footer-assets',
  SITE_ASSETS: 'site-assets',
  RESUMES: 'resumes',
  MEDIA_LIBRARY: 'media-library',
} as const;

export type StorageBucket =
  typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

export async function uploadFileToStorage(
  bucket: StorageBucket,
  file: File,
  customPath?: string
): Promise<{ url: string | null; error: Error | null }> {
  try {
    if (!isSupabaseConfigured) {
      throw new Error(
        'Supabase is not configured. Add VITE_SUPABASE_PUBLISHABLE_KEY to your deployment environment.'
      );
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const fileName =
      customPath ||
      \`\${Date.now()}-\${Math.random().toString(36).slice(2, 9)}.\${fileExt}\`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return { url: data.publicUrl, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return { url: null, error };
  }
}

export async function deleteFileFromStorage(
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
    return { success: true, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return { success: false, error };
  }
}
