import { createClient } from '@supabase/supabase-js';

// Project identifiers and publishable keys are public configuration, not privileged secrets.
export const SUPABASE_PROJECT_ID = 'egpwwzkwwxsrctzyhpnv';
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://egpwwzkwwxsrctzyhpnv.supabase.co';
export const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

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
  !DUMMY_KEYS.includes(supabaseAnonKey.trim()) &&
);

// Helper to determine if an error is due to missing tables in schema cache.
export function isTableMissingError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as { code?: unknown; message?: unknown };
  return (
    candidate.code === 'PGRST205' ||
    candidate.code === '42P01' ||
    candidate.code === 'PGRST204' ||
    (typeof candidate.message === 'string' &&
      (candidate.message.includes('schema cache') ||
        candidate.message.includes('relation') ||
        candidate.message.includes('does not exist') ||
        candidate.message.includes('Could not find the table')))
  );
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-anon-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const STORAGE_BUCKETS = {
  PROFILE_IMAGES: 'profile-images',
  PROJECT_IMAGES: 'project-images',
  CERTIFICATE_IMAGES: 'certificate-images',
  LOGOS: 'logos',
  RESUME_FILES: 'resume-files',
  DOCUMENTS: 'resume-files',
} as const;

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const DOCUMENT_TYPES = new Set(['application/pdf']);

function validateUpload(bucket: StorageBucket, file: File): Error | null {
  if (!(file instanceof File)) return new Error('Choose a valid file.');
  if (bucket === STORAGE_BUCKETS.RESUME_FILES) {
    if (!DOCUMENT_TYPES.has(file.type)) return new Error('Resume files must be PDF documents.');
    if (file.size <= 0 || file.size > MAX_RESUME_BYTES) return new Error('PDF files must be between 1 byte and 10 MB.');
    return null;
  }

  if (!IMAGE_TYPES.has(file.type)) return new Error('Upload a JPEG, PNG, WebP, GIF, or AVIF image.');
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) return new Error('Images must be between 1 byte and 5 MB.');
  return null;
}

/**
 * Uploads an asset to Supabase Storage. No local Base64 fallback is used: an upload failure
 * must be visible to the operator instead of reporting a non-persistent file as successfully saved.
 */
export async function uploadFileToStorage(
  bucket: StorageBucket,
  file: File,
  customPath?: string,
): Promise<{ url: string | null; error: Error | null }> {
  if (!isSupabaseConfigured) {
    return { url: null, error: new Error('Supabase is not configured; the file was not uploaded.') };
  }

  const validationError = validateUpload(bucket, file);
  if (validationError) return { url: null, error: validationError };

  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !/^[a-z0-9]{1,8}$/.test(extension)) {
    return { url: null, error: new Error('The file extension is invalid.') };
  }

  const safeCustomPath = customPath?.trim();
  if (safeCustomPath && (!/^[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]{1,8}$/.test(safeCustomPath) || safeCustomPath.includes('..'))) {
    return { url: null, error: new Error('The requested storage path is invalid.') };
  }

  const fileName = safeCustomPath || `${crypto.randomUUID()}.${extension}`;
  try {
    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });
    if (uploadError) return { url: null, error: new Error(uploadError.message || 'Storage upload failed.') };

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    if (!data?.publicUrl) return { url: null, error: new Error('Upload completed but a public asset URL could not be generated.') };
    return { url: data.publicUrl, error: null };
  } catch {
    return { url: null, error: new Error('Storage upload failed. Check your connection and administrator access, then retry.') };
  }
}

/** Remove an object only when Storage RLS authorizes the signed-in administrator. */
export async function deleteFileFromStorage(
  bucket: StorageBucket,
  path: string,
): Promise<{ success: boolean; error: Error | null }> {
  if (!isSupabaseConfigured) return { success: false, error: new Error('Supabase is not configured.') };
  if (!path || path.includes('..') || path.startsWith('/')) {
    return { success: false, error: new Error('The storage path is invalid.') };
  }

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return { success: false, error: new Error(error.message || 'Storage delete failed.') };
    return { success: true, error: null };
  } catch {
    return { success: false, error: new Error('Storage delete failed. Check administrator access and retry.') };
  }
}
