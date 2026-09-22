import { createClient } from '@supabase/supabase-js';

// Project credentials provided for egpwwzkwwxsrctzyhpnv
export const SUPABASE_PROJECT_ID = 'egpwwzkwwxsrctzyhpnv';
export const supabaseUrl = 'https://egpwwzkwwxsrctzyhpnv.supabase.co';

// Read publishable / anon key safely from Vite environment variables or localStorage
const getInitialKey = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('supabase_publishable_key') || localStorage.getItem('supabase_anon_key');
    if (saved && saved.trim() && !saved.includes('YOUR_')) {
      return saved.trim();
    }
  }
  return (
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY || 
    ''
  );
};

export const supabaseAnonKey = getInitialKey();

const DUMMY_KEYS = [
  'YOUR_PUBLISHABLE_KEY',
  'YOUR_SUPABASE_ANON_KEY',
  'YOUR_ANON_KEY',
  'placeholder-anon-key',
  '',
];

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !DUMMY_KEYS.includes(supabaseAnonKey.trim())
);

export function savePublishableKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('supabase_publishable_key', key.trim());
      localStorage.setItem('supabase_anon_key', key.trim());
    } else {
      localStorage.removeItem('supabase_publishable_key');
      localStorage.removeItem('supabase_anon_key');
    }
    window.location.reload();
  }
}

// Helper to determine if an error is due to missing tables in schema cache
export function isTableMissingError(error: any): boolean {
  if (!error) return false;
  return (
    error.code === 'PGRST205' ||
    error.code === '42P01' ||
    error.code === 'PGRST204' ||
    Boolean(
      typeof error.message === 'string' &&
      (error.message.includes('schema cache') ||
       error.message.includes('relation') ||
       error.message.includes('does not exist') ||
       error.message.includes('Could not find the table'))
    )
  );
}

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'placeholder-anon-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Storage Bucket Constants
export const STORAGE_BUCKETS = {
  PROFILE_IMAGES: 'profile-images',
  PROJECT_IMAGES: 'project-images',
  CERTIFICATE_IMAGES: 'certificate-images',
  LOGOS: 'logos',
  RESUME_FILES: 'resume-files',
  DOCUMENTS: 'resume-files',
} as const;

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

/**
 * Upload a file to a specified Supabase storage bucket
 */
export async function uploadFileToStorage(
  bucket: StorageBucket,
  file: File,
  customPath?: string
): Promise<{ url: string | null; error: Error | null }> {
  try {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not yet configured with a valid VITE_SUPABASE_ANON_KEY');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = customPath || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    if (!isTableMissingError(err)) {
      console.warn(`Storage upload note for ${bucket}:`, err.message || err);
    }
    return { url: null, error: err };
  }
}

/**
 * Remove a file from a specified Supabase storage bucket
 */
export async function deleteFileFromStorage(
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
    return { success: true, error: null };
  } catch (err: any) {
    console.warn(`Storage delete note for ${bucket}:`, err.message || err);
    return { success: false, error: err };
  }
}
