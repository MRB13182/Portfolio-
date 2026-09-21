import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { settingsService } from '../../services/settingsService';
import { activityLogService } from '../../services/activityLogService';
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
  Download,
  Upload,
  Palette,
  Globe,
  Share2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { isSupabaseConfigured, supabaseUrl, SUPABASE_PROJECT_ID } from '../../lib/supabase';

export const AdminSettingsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { settings, projects, skills, profile, experience, education, certificates, socials, refreshData } = usePortfolioData();
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
        site_name: 'MD. Moshiur Rahman',
        website_logo: '/logo.svg',
        dark_logo: '/logo-dark.svg',
        light_logo: '/logo-light.svg',
        favicon_url: '/favicon.ico',
        hero_banner: '/hero-banner.webp',
        meta_title: 'MD. Moshiur Rahman | Lead Full-Stack & Cloud Engineer',
        meta_description: 'Dual-theme high-performance engineering portfolio featuring Apple Titanium Emerald Light and Black Mamba Gold architectures.',
        seo_keywords: ['Full Stack Developer', 'React', 'TypeScript', 'Cloud Architecture', 'PostgreSQL', 'Moshiur Rahman'],
        opengraph_image: '/og-image.png',
        contact_email: 'borshonsweb@gmail.com',
        active_theme: 'dual',
        show_stats: true,
        maintenance_mode: false,
        theme_colors: {
          emerald_primary: '#00E5FF',
          emerald_secondary: '#00C8A8',
          gold_primary: '#D4AF37',
          gold_secondary: '#F5D06F',
        },
      });
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.update('default', formData);
      await activityLogService.log('Settings Saved', 'Site Settings', 'Updated global site settings and branding');
      await refreshData();
      showToast('Settings saved successfully in Supabase!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save settings', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      version: '2.0',
      profile,
      projects,
      skills,
      experience,
      education,
      certificates,
      socials,
      settings: formData,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON exported successfully!', { type: 'success' });
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.settings) {
          setFormData(parsed.settings);
          await settingsService.update('default', parsed.settings);
        }
        await activityLogService.log('Backup Restored', 'Site Settings', `Imported backup dated: ${parsed.exportDate || 'unknown'}`);
        await refreshData();
        showToast('Portfolio configuration restored!', { type: 'success' });
      } catch (err: any) {
        showToast('Invalid backup file format', { type: 'error' });
      }
    };
    reader.readAsText(file);
  };

  const copySqlSchema = () => {
    const sqlContent = `-- Run this in Supabase SQL Editor (Project ID: ${SUPABASE_PROJECT_ID})
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles
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

-- 2. Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  logo TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  fallback_gradient TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  architecture TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  status TEXT DEFAULT 'Live & Operational',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Skills
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INT NOT NULL,
  logo TEXT,
  icon_name TEXT,
  accent_color TEXT DEFAULT '#00E5FF',
  experience TEXT DEFAULT '4+ Years',
  experience_duration TEXT DEFAULT '4+ Years',
  proficiency_highlights TEXT[] DEFAULT '{}',
  related_projects TEXT[] DEFAULT '{}',
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Experience
CREATE TABLE IF NOT EXISTS public.experience (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  company_url TEXT,
  logo TEXT,
  location TEXT,
  period TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT false,
  type TEXT,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Education
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  institution TEXT NOT NULL,
  location TEXT,
  period TEXT,
  start_year TEXT,
  end_year TEXT,
  grade TEXT,
  description TEXT,
  coursework TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  logo TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issuer_logo TEXT,
  theme TEXT,
  category TEXT,
  accent TEXT,
  image TEXT,
  issue_date TEXT,
  expiry_date TEXT,
  credential_id TEXT,
  credential_url TEXT,
  description TEXT,
  verified BOOLEAN DEFAULT true,
  skills TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Social Links
CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  action_type TEXT DEFAULT 'link',
  enabled BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  reply_text TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY,
  site_title TEXT,
  site_name TEXT,
  website_logo TEXT,
  dark_logo TEXT,
  light_logo TEXT,
  favicon_url TEXT,
  hero_banner TEXT,
  meta_title TEXT,
  meta_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  opengraph_image TEXT,
  contact_email TEXT,
  active_theme TEXT DEFAULT 'dual',
  show_stats BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  theme_colors JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Footer Content
CREATE TABLE IF NOT EXISTS public.footer_content (
  id TEXT PRIMARY KEY DEFAULT 'default',
  brand_name TEXT DEFAULT 'MD. MOSHIUR RAHMAN',
  tagline TEXT DEFAULT 'Lead Full-Stack Architect & Cloud System Engineer.',
  copyright_text TEXT DEFAULT 'All Rights Reserved.',
  status_badge_text TEXT DEFAULT 'Available for High-Impact Roles',
  status_badge_subtext TEXT DEFAULT 'Worldwide Remote & Hybrid',
  quick_links JSONB DEFAULT '[]',
  legal_links JSONB DEFAULT '[]',
  show_system_metrics BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;

-- Public READ-ONLY access for portfolio visitors
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Socials" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Footer" ON public.footer_content FOR SELECT USING (true);

-- Public INSERT for contact messages
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Admin FULL ACCESS (ALL operations) for authenticated users or service role
CREATE POLICY "Admin All Profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Experience" ON public.experience FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Education" ON public.education FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Socials" ON public.social_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Footer" ON public.footer_content FOR ALL USING (true) WITH CHECK (true);
`;

    navigator.clipboard.writeText(sqlContent);
    setCopiedSchema(true);
    showToast('SQL DDL and RLS schema copied to clipboard!', { type: 'success' });
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
              isDark ? 'bg-[#D4AF37]/10 text-[#F5D76E] border-[#D4AF37]/30' : 'bg-emerald-100/50 text-[#00A896] border-[#00E5FF]/30'
            }`}>
              Global System &amp; Brand
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Site Settings &amp; Branding</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Manage logos, favicons, SEO metadata, OpenGraph cards, database connection, and JSON backups.
          </p>
        </div>

        {/* Backup & Restore Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportBackup}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition-all ${
              isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          <label className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition-all ${
            isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
          }`}>
            <Upload className="w-3.5 h-3.5" />
            <span>Restore Backup</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>
        </div>
      </div>

      {/* Supabase Connection Status Card */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${
              isDark ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00A896]'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm">Supabase Cloud Database Infrastructure</h3>
              <p className="text-xs opacity-60">Connected to dedicated PostgreSQL project</p>
            </div>
          </div>

          <a
            href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Supabase Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
              <h3 className="font-bold text-sm">PostgreSQL Schema &amp; Row Level Security (RLS)</h3>
              <p className="text-xs opacity-60">Complete SQL DDL to set up all 10 tables, RLS policies, and storage</p>
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

        <div className="p-4 rounded-xl font-mono text-[11px] bg-black/60 border border-white/10 text-zinc-400 overflow-x-auto max-h-40 leading-relaxed">
          <pre>{`-- Available tables: profiles, projects, skills, experience, education, certificates, social_links, contact_messages, site_settings, footer_content
-- Buckets: profile-images, project-images, certificate-images, logos, resume-files
-- RLS configured: Public READ, Admin Authenticated WRITE, Public contact INSERT`}</pre>
        </div>
      </div>

      {/* Comprehensive Site Settings Form */}
      <form onSubmit={handleSave} className={`p-6 rounded-3xl border space-y-6 ${
        isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200 shadow-md'
      }`}>
        {/* Section 1: Branding & Logos */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">Website Branding &amp; Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Website Title</label>
              <input
                type="text"
                value={formData.site_title || ''}
                onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                placeholder="MD. Moshiur Rahman | Luxury Portfolio"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Website Brand Name</label>
              <input
                type="text"
                value={formData.site_name || ''}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                placeholder="MD. Moshiur Rahman"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Dark Mode Logo URL</label>
              <input
                type="text"
                value={formData.dark_logo || ''}
                onChange={(e) => setFormData({ ...formData, dark_logo: e.target.value })}
                placeholder="/logo-dark.svg"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Light Mode Logo URL</label>
              <input
                type="text"
                value={formData.light_logo || ''}
                onChange={(e) => setFormData({ ...formData, light_logo: e.target.value })}
                placeholder="/logo-light.svg"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Favicon URL</label>
              <input
                type="text"
                value={formData.favicon_url || ''}
                onChange={(e) => setFormData({ ...formData, favicon_url: e.target.value })}
                placeholder="/favicon.ico"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 2: SEO & OpenGraph Social Sharing */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">SEO &amp; OpenGraph Social Cards</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Meta Title</label>
              <input
                type="text"
                value={formData.meta_title || ''}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="MD. Moshiur Rahman | Lead Full-Stack Architect"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">OpenGraph Share Image URL</label>
              <input
                type="text"
                value={formData.opengraph_image || ''}
                onChange={(e) => setFormData({ ...formData, opengraph_image: e.target.value })}
                placeholder="https://.../og-image.png"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Meta Description</label>
            <textarea
              rows={2}
              value={formData.meta_description || ''}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">SEO Keywords (comma-separated)</label>
            <input
              type="text"
              value={(formData.seo_keywords || []).join(', ')}
              onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean) })}
              placeholder="Full Stack, React, TypeScript, Cloud, DevOps, Moshiur Rahman"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00C8A8]'
              }`}
            />
          </div>
        </div>

        {/* Section 3: Theme Palette & Switches */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Palette className="w-4 h-4 text-amber-400" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">Theme Colors &amp; System Toggles</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-semibold mb-1 opacity-80">Emerald Primary</label>
              <input
                type="text"
                value={formData.theme_colors?.emerald_primary || '#00E5FF'}
                onChange={(e) => setFormData({
                  ...formData,
                  theme_colors: { ...formData.theme_colors, emerald_primary: e.target.value },
                })}
                className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-transparent font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold mb-1 opacity-80">Emerald Secondary</label>
              <input
                type="text"
                value={formData.theme_colors?.emerald_secondary || '#00C8A8'}
                onChange={(e) => setFormData({
                  ...formData,
                  theme_colors: { ...formData.theme_colors, emerald_secondary: e.target.value },
                })}
                className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-transparent font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold mb-1 opacity-80">Gold Primary</label>
              <input
                type="text"
                value={formData.theme_colors?.gold_primary || '#D4AF37'}
                onChange={(e) => setFormData({
                  ...formData,
                  theme_colors: { ...formData.theme_colors, gold_primary: e.target.value },
                })}
                className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-transparent font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold mb-1 opacity-80">Gold Secondary</label>
              <input
                type="text"
                value={formData.theme_colors?.gold_secondary || '#F5D06F'}
                onChange={(e) => setFormData({
                  ...formData,
                  theme_colors: { ...formData.theme_colors, gold_secondary: e.target.value },
                })}
                className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-transparent font-mono"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.show_stats !== false}
                onChange={(e) => setFormData({ ...formData, show_stats: e.target.checked })}
                className="w-4 h-4 rounded cursor-pointer text-emerald-500"
              />
              <span className="text-xs font-semibold">Display System Metrics Bar</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.maintenance_mode)}
                onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })}
                className="w-4 h-4 rounded cursor-pointer text-amber-500"
              />
              <span className="text-xs font-semibold text-amber-400">Maintenance Mode Banner</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md ${
              isDark
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90'
                : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-90'
            } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Settings...' : 'Save Site Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
