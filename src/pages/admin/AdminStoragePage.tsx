import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  Cloud,
  FileCode,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const AdminStoragePage: React.FC = () => {
  const { isDark } = useTheme();
  const {
    profile,
    projects,
    skills,
    certificates,
    socials,
    settings,
    testimonials,
    exportBackup,
    importBackup,
    resetToDefaults,
  } = usePortfolioData();
  const { showToast } = useToast();

  const [isImporting, setIsImporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleExport = () => {
    try {
      const jsonString = exportBackup();
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Backup exported successfully as JSON!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to export backup', { type: 'error', message: err.message });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const success = await importBackup(text);
      if (success) {
        showToast('Portfolio data restored successfully from backup!', { type: 'success' });
      } else {
        showToast('Invalid backup JSON file structure', { type: 'error' });
      }
    } catch (err: any) {
      showToast('Failed to import backup', { type: 'error', message: err.message });
    } finally {
      setIsImporting(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all data to default seed values? This will clear custom additions.')) {
      return;
    }

    setIsResetting(true);
    try {
      await resetToDefaults();
      showToast('Reset to default seed portfolio data', { type: 'info' });
    } catch (err: any) {
      showToast('Reset failed', { type: 'error', message: err.message });
    } finally {
      setIsResetting(false);
    }
  };

  const storageItems = [
    { label: 'Profile Information', count: profile ? 1 : 0, status: 'Stored Locally' },
    { label: 'Projects Showcase', count: projects.length, status: 'Stored Locally' },
    { label: 'Skills Matrix', count: skills.length, status: 'Stored Locally' },
    { label: 'Certificates & Credentials', count: certificates.length, status: 'Stored Locally' },
    { label: 'Social Media Links', count: socials.length, status: 'Stored Locally' },
    { label: 'Testimonials & Reviews', count: testimonials.length, status: 'Stored Locally' },
    { label: 'Branding & Theme Settings', count: settings ? 1 : 0, status: 'Stored Locally' },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
        isDark
          ? 'bg-gradient-to-br from-[#0B0B0F] via-[#050505] to-[#121008] border-[rgba(212,175,55,0.25)]'
          : 'bg-gradient-to-br from-white via-slate-50 to-cyan-50/40 border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                isDark ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30' : 'bg-cyan-50 text-[#0097A7] border-[#00E5FF]/30'
              }`}>
                Persistence Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Storage & Backup System</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Reliable offline-first local storage engine with instant UI synchronization and future-ready Supabase hooks.
            </p>
          </div>
        </div>
      </div>

      {/* Storage Engine Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Local Storage Card */}
        <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-3 ${
          isDark ? 'bg-[#0A0A0E]/80 border-emerald-500/30' : 'bg-white/90 border-emerald-500/40'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs">
              <HardDrive className="w-4 h-4" /> LOCAL STORAGE ENGINE
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Active & Synchronized
            </span>
          </div>
          <p className="text-xs opacity-75 leading-relaxed">
            All CMS modifications are persisted directly to high-speed reactive browser storage with zero latency and full offline support.
          </p>
        </div>

        {/* Cloud Integration Card */}
        <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-3 ${
          isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#00E5FF] font-bold font-mono text-xs">
              <Cloud className="w-4 h-4" /> SUPABASE CLOUD ARCHITECTURE
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
              isSupabaseConfigured
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-cyan-500/10 text-[#00E5FF] border-[#00E5FF]/30'
            }`}>
              {isSupabaseConfigured ? 'Connected' : 'Future-Ready'}
            </span>
          </div>
          <p className="text-xs opacity-75 leading-relaxed">
            Full Supabase service layer implemented. Simply configure VITE_SUPABASE_URL to auto-enable multi-device cloud database sync.
          </p>
        </div>

      </div>

      {/* Backup & Restore Controls */}
      <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
        isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
      }`}>
        <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
          <FileCode className="w-4 h-4" /> Backup & Restore Portfolio State
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleExport}
            className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
              isDark
                ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.2)]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export Backup (JSON)</span>
          </button>

          <label className={`px-5 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
            isDark
              ? 'bg-white/5 border-white/15 hover:border-[#00E5FF]/50 text-white'
              : 'bg-slate-100 border-slate-300 hover:border-[#00E5FF]/60 text-slate-800'
          }`}>
            <Upload className="w-4 h-4 text-[#00E5FF]" />
            <span>{isImporting ? 'Restoring Data...' : 'Import / Restore JSON Backup'}</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImport}
              className="hidden"
              disabled={isImporting}
            />
          </label>

          <button
            onClick={handleReset}
            disabled={isResetting}
            className="px-4 py-3 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer ml-auto"
          >
            <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset All to Default Seed</span>
          </button>
        </div>
      </div>

      {/* Local Storage Items Breakdown */}
      <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-4 ${
        isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
      }`}>
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono opacity-80 flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-[#00E5FF]" /> Active Stored Records Breakdown
        </h3>

        <div className="divide-y divide-white/10">
          {storageItems.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs font-mono">
              <span className="font-medium text-white">{item.label}</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">{item.count} items</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
