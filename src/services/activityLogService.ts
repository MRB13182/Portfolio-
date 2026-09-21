import { supabase, isSupabaseConfigured, isTableMissingError } from '../lib/supabase';
import { ActivityLogRow } from '../types/database';

const STORAGE_KEY = 'portfolio_admin_activity_logs';

const DEFAULT_LOGS: ActivityLogRow[] = [
  {
    id: 'log-1',
    action: 'CMS Initialization',
    entity_type: 'System',
    details: 'Dynamic CMS and Supabase database connection initialized',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'log-2',
    action: 'Project Updated',
    entity_type: 'Projects',
    details: 'Apex AI Workspace portfolio case study synchronized',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'log-3',
    action: 'Certificate Uploaded',
    entity_type: 'Certificates',
    details: 'Google AI Professional Certificate digital asset verified',
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'log-4',
    action: 'Skill Updated',
    entity_type: 'Skills',
    details: 'Full Stack & AI Architecture proficiency matrix updated',
    created_at: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
  },
  {
    id: 'log-5',
    action: 'Footer Modified',
    entity_type: 'Footer',
    details: 'Custom footer navigation and social badges configured',
    created_at: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
  },
];

function getLocalLogs(): ActivityLogRow[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return DEFAULT_LOGS;
}

function saveLocalLog(item: ActivityLogRow) {
  try {
    const logs = getLocalLogs();
    const updated = [item, ...logs].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export const activityLogService = {
  async getAll(): Promise<ActivityLogRow[]> {
    if (!isSupabaseConfigured) {
      return getLocalLogs();
    }
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        if (!isTableMissingError(error)) {
          console.warn('activityLogService.getAll info:', error.message || error);
        }
        return getLocalLogs();
      }
      return data && data.length > 0 ? (data as ActivityLogRow[]) : getLocalLogs();
    } catch {
      return getLocalLogs();
    }
  },

  async log(action: string, entity_type: string, details?: string): Promise<ActivityLogRow> {
    const newLog: ActivityLogRow = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      entity_type,
      details: details || '',
      created_at: new Date().toISOString(),
    };

    saveLocalLog(newLog);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('activity_logs').insert([newLog]);
      } catch {}
    }

    return newLog;
  },
};
