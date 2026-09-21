import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { settingsService } from '../../services/settingsService';
import { SiteSettingsRow } from '../../types/database';
import {
  Settings,
  Database,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Save,
  Code,
} from 'lucide-react';
import { isSupabaseConfigured, supabaseUrl, SUPABASE_PROJECT_ID } from '../../lib/supabase';

export const AdminSettingsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { settings, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Partial<SiteSettingsRow>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    } else {
      setFormData({
        site_title: 'MD. Moshiur Rahman | Luxury Portfolio',
        meta_description: 'Dual-theme high-performance portfolio for MD. Moshiur Rahman.',
        contact_email: 'borshonsweb@gmail.com',
        active_theme: 'dual',
        show_stats: true,
        maintenance_mode: false,
      });
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.update('default', formData);
      await refreshData();
      showToast('Settings updated successfully in Supabase!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save settings', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const copySqlSchema = () => {
    const sqlContent = `-- Run this in Supabase SQL Editor (Project ID: ${SUPABASE_PROJECT_ID})
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  titles TEXT[] DEFAULT '{}',
  bio TEXT,
  extended_bio TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,
  whatsapp_number TEXT,
  telegram_username TEXT,
  availability_status TEXT DEFAULT 'Open for Opportunities',
  resume_url TEXT,
  years_of_experience NUMERIC DEFAULT 4.5,
  profile_image TEXT,
  logo_light TEXT,
  logo_dark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  fallback_gradient TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  architecture TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  logo TEXT,
  experience TEXT,
  experience_duration TEXT,
  icon_name TEXT,
  description TEXT,
  projects TEXT[] DEFAULT '{}',
  projects_using TEXT[] DEFAULT '{}',
  proficiency_highlights TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  accent_color TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience
CREATE TABLE IF NOT EXISTS public.experience (
  id TEXT PRIMARY KEY,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  duration TEXT,
  period TEXT,
  type TEXT DEFAULT 'Full-time',
  description TEXT,
  achievements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT,
  duration TEXT,
  grade TEXT,
  highlights TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issuer_logo TEXT,
  theme TEXT,
  category TEXT,
  accent TEXT,
  image TEXT NOT NULL,
  issue_date TEXT,
  expiry_date TEXT,
  credential_id TEXT,
  credential_url TEXT,
  skills TEXT[] DEFAULT '{}',
  description TEXT,
  verified BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Links
CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT,
  action_type TEXT DEFAULT 'link',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_title TEXT DEFAULT 'MD. Moshiur Rahman | Luxury Portfolio',
  meta_description TEXT,
  contact_email TEXT DEFAULT 'borshonsweb@gmail.com',
  active_theme TEXT DEFAULT 'dual',
  show_stats BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  custom_announcement TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public projects read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public skills read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public experience read" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public education read" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public certificates read" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public social_links read" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public site_settings read" ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admin profiles manage" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin projects manage" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin skills manage" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin experience manage" ON public.experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin education manage" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin certificates manage" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin social_links manage" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin site_settings manage" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public contact messages insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin contact messages select" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin contact messages update" ON public.contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin contact messages delete" ON public.contact_messages FOR DELETE TO authenticated USING (true);
`;

    navigator.clipboard.writeText(sqlContent);
    setCopiedSchema(true);
    showToast('SQL Schema copied to clipboard!', { type: 'success' });
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Settings & Database</h1>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Supabase infrastructure configuration, PostgreSQL schemas, and site-wide metadata.
        </p>
      </div>

      {/* Supabase Connection Details Card */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isDark ? 'bg-black border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-slate-50 border-[#00E5FF]/30 text-[#00C8A8]'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Supabase Project Connection</h3>
              <p className="text-xs opacity-60">Connected to dedicated cloud backend</p>
            </div>
          </div>

          <a
            href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold flex items-center gap-1.5 hover:bg-white/5"
          >
            <span>Open Dashboard</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-xl border border-white/10">
            <span className="block text-[11px] opacity-60 font-medium">Project ID</span>
            <span className="font-mono text-xs font-bold">{SUPABASE_PROJECT_ID}</span>
          </div>

          <div className="p-3 rounded-xl border border-white/10">
            <span className="block text-[11px] opacity-60 font-medium">Project URL</span>
            <span className="font-mono text-xs font-bold truncate block">{supabaseUrl}</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
          isSupabaseConfigured
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
        }`}>
          {isSupabaseConfigured ? (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>VITE_SUPABASE_ANON_KEY is detected in environment configuration.</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>
                To enable live cloud operations, set your real Supabase Anon Key in `.env` (VITE_SUPABASE_ANON_KEY).
              </span>
            </>
          )}
        </div>
      </div>

      {/* SQL Schema Copy Card */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl border border-white/10">
              <Code className="w-5 h-5 opacity-70" />
            </div>
            <div>
              <h3 className="font-bold text-sm">PostgreSQL Schema & Security Policies</h3>
              <p className="text-xs opacity-60">Complete SQL DDL to set up all 9 tables, RLS policies, and storage</p>
            </div>
          </div>

          <button
            onClick={copySqlSchema}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
              copiedSchema
                ? 'bg-emerald-500 text-white'
                : isDark
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            {copiedSchema ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSchema ? 'Copied SQL Script!' : 'Copy Schema.sql'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl font-mono text-[11px] bg-black/60 border border-white/10 text-zinc-400 overflow-x-auto max-h-48 leading-relaxed">
          <pre>{`-- Available tables: profiles, projects, skills, experience, education, certificates, social_links, contact_messages, site_settings
-- Buckets: profile-images, project-images, certificate-images, logos, resume-files
-- RLS configured: Public READ, Admin Authenticated WRITE, Public contact INSERT`}</pre>
        </div>
      </div>

      {/* Site Preferences Form */}
      <form onSubmit={handleSave} className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Global Site Settings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Site Title</label>
            <input
              type="text"
              value={formData.site_title || ''}
              onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Contact Receiver Email</label>
            <input
              type="email"
              value={formData.contact_email || ''}
              onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 opacity-80">Meta Description (SEO)</label>
          <textarea
            rows={2}
            value={formData.meta_description || ''}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            className={`w-full p-3 rounded-xl border text-xs outline-none ${
              isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
            }`}
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-stats"
              checked={formData.show_stats !== false}
              onChange={(e) => setFormData({ ...formData, show_stats: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="show-stats" className="text-xs font-semibold cursor-pointer">
              Display Metrics & Statistics Bar
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="maint-mode"
              checked={Boolean(formData.maintenance_mode)}
              onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="maint-mode" className="text-xs font-semibold cursor-pointer text-amber-500">
              Maintenance Mode
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md ${
              isDark
                ? 'bg-[#D4AF37] text-black hover:bg-[#F5D06F]'
                : 'bg-[#00E5FF] text-slate-950 hover:bg-[#00C8A8]'
            } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Site Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
