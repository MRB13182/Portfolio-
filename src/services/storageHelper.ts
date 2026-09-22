/**
 * Storage Helper for Portfolio Admin CMS
 * Provides robust fallback local persistence so the CMS works seamlessly
 * whether connected to live Supabase, offline, or pending table creation.
 */

export const storageHelper = {
  getCached<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const stored = localStorage.getItem(`portfolio_cms_${key}`);
      if (!stored) return defaultValue;
      return JSON.parse(stored) as T;
    } catch {
      return defaultValue;
    }
  },

  setCached<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`portfolio_cms_${key}`, JSON.stringify(value));
    } catch (err) {
      console.warn(`storageHelper: Failed to persist ${key}`, err);
    }
  },

  removeCached(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(`portfolio_cms_${key}`);
    } catch (err) {
      console.warn(`storageHelper: Failed to remove ${key}`, err);
    }
  },
};
