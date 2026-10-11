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

  const copySqlSchema = async () => {
    const sqlContent = `-- P0 SECURITY NOTICE
-- The historical SQL bundle included permissive policies that could let any authenticated
-- user mutate portfolio data and contact messages. Do not apply that legacy bundle.
--
-- Review the versioned remediation file from the repository branch:
-- supabase/migrations/20261011090000_p0_admin_authorization_rls.sql
--
-- The remediation has not been applied to production because the associated Supabase project
-- was reported INACTIVE. Restore the project, inspect live schema/policies/storage consumers,
-- back up definitions, review the migration, provision a verified admin identity, and test
-- anon/non-admin/admin access in an isolated environment before applying it.
`;

    try {
      await navigator.clipboard.writeText(sqlContent);
      setCopiedSchema(true);
      showToast('Security migration notice copied. Review the versioned migration before applying SQL.', { type: 'info' });
      window.setTimeout(() => setCopiedSchema(false), 3000);
    } catch {
      showToast('Clipboard access failed. Open docs/security/P0-REMEDIATION.md in the repository.', { type: 'error' });
    }
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

        {/* Status Indicator */}
        <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
          isSupabaseConfigured
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
        }`}>
          <div className="flex items-center gap-2">
            {isSupabaseConfigured ? (
              <>
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Supabase Live Sync is <strong>Active</strong>. All changes synchronize to cloud and local cache.</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Operating in <strong>Local Resilient Mode</strong>. All edits save locally and instantly update your portfolio.</span>
              </>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 space-y-2">
          <label className="block text-xs font-bold">Supabase publishable key configuration</label>
          <p className="text-[11px] opacity-70 leading-relaxed">
            Configure <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> (or the legacy anon key variable) in your deployment environment and rebuild the app. Runtime key overrides are disabled so the browser cannot silently change the configured backend.
          </p>
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
              <p className="text-xs opacity-60">Safe deployment notice for the reviewed P0 migration; legacy SQL is intentionally not copied.</p>
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
            <span>{copiedSchema ? 'Copied Security Notice!' : 'Copy Migration Notice'}</span>
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
