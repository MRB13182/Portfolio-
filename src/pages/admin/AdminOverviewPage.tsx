import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { migrationService } from '../../services/migrationService';
import { messageService } from '../../services/messageService';
import { isSupabaseConfigured, supabaseUrl } from '../../lib/supabase';
import {
  FolderGit2,
  Cpu,
  Award,
  Mail,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Database,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const { isDark } = useTheme();
  const { projects, skills, certificates, refreshData, isSupabaseLive } = usePortfolioData();
  const { showToast } = useToast();

  const [messageCount, setMessageCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationResults, setMigrationResults] = useState<any>(null);

  useEffect(() => {
    if (isSupabaseConfigured) {
      messageService.getAll().then((msgs) => {
        setMessageCount(msgs.length);
        setUnreadMessageCount(msgs.filter((m) => m.status === 'unread').length);
      }).catch(() => {});
    }
  }, []);

  const handleMigrate = async () => {
    setIsMigrating(true);
    try {
      const res = await migrationService.migrateAllStaticData();
      setMigrationResults(res);
      if (res.errors.length === 0) {
        showToast('All static portfolio data synced to Supabase!', { type: 'success' });
      } else {
        showToast('Sync completed with warnings', { type: 'info', message: res.errors[0] });
      }
      await refreshData();
    } catch (err: any) {
      showToast('Migration failed', { type: 'error', message: err.message });
    } finally {
      setIsMigrating(false);
    }
  };

  const statCards = [
    {
      label: 'Projects',
      count: projects.length,
      icon: FolderGit2,
      link: '/admin/projects',
      color: isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]',
    },
    {
      label: 'Skills Matrix',
      count: skills.length,
      icon: Cpu,
      link: '/admin/skills',
      color: isDark ? 'text-[#F5D06F]' : 'text-[#00E5FF]',
    },
    {
      label: 'Certificates',
      count: certificates.length,
      icon: Award,
      link: '/admin/certificates',
      color: isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]',
    },
    {
      label: 'Messages',
      count: messageCount,
      extra: unreadMessageCount > 0 ? `${unreadMessageCount} new` : undefined,
      icon: Mail,
      link: '/admin/messages',
      color: 'text-rose-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
        isDark
          ? 'bg-gradient-to-br from-[#0B0B0F] via-[#050505] to-[#121008] border-[rgba(212,175,55,0.25)]'
          : 'bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                isDark ? 'bg-[#D4AF37]/10 text-[#F5D76E] border-[#D4AF37]/30' : 'bg-emerald-100/50 text-[#00A896] border-[#00E5FF]/30'
              }`}>
                Connected Database
              </span>
              <span className="text-xs opacity-70 font-mono">egpwwzkwwxsrctzyhpnv</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Portfolio Admin Console</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Manage your personal branding, technical skills, projects showcase, verified certificates, and incoming recruiter messages directly through Supabase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleMigrate}
              disabled={isMigrating}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                isDark
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90'
                  : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-90'
              } ${isMigrating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isMigrating ? 'animate-spin' : ''}`} />
              <span>{isMigrating ? 'Syncing to Supabase...' : 'Sync Static Data to Supabase'}</span>
            </button>

            <a
              href="https://supabase.com/dashboard/project/egpwwzkwwxsrctzyhpnv"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-colors ${
                isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-200 hover:border-slate-400 text-slate-700'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Dashboard</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* Migration Results if present */}
      {migrationResults && (
        <div className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-4 ${
          migrationResults.errors.length === 0
            ? isDark
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
              : 'bg-emerald-50 border-emerald-300 text-emerald-800'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              Synced: {migrationResults.projects} projects, {migrationResults.skills} skills, {migrationResults.certificates} certificates, {migrationResults.experience} experience items.
            </span>
          </div>
          <button
            onClick={() => setMigrationResults(null)}
            className="text-[11px] font-bold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Database State Alert */}
      <div className={`p-4 rounded-2xl border flex items-start sm:items-center justify-between gap-4 text-xs ${
        isSupabaseLive
          ? isDark
            ? 'bg-[#D4AF37]/5 border-[#D4AF37]/20 text-[#F5D76E]'
            : 'bg-emerald-50/50 border-[#00C8A8]/20 text-[#00A896]'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
      }`}>
        <div className="flex items-center gap-3">
          {isSupabaseLive ? (
            <ShieldCheck className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <div>
            <span className="font-bold">
              {isSupabaseLive ? 'Live Supabase Data Active' : 'Offline / Seed Mode Active'}
            </span>
            <p className="text-[11px] opacity-80 mt-0.5">
              {isSupabaseLive
                ? 'Portfolio queries are actively served from your Supabase PostgreSQL database.'
                : 'Showing static data fallback. Click "Sync Static Data to Supabase" above or run schema.sql in Supabase SQL editor.'}
            </p>
          </div>
        </div>

        <Link
          to="/admin/settings"
          className="shrink-0 px-3 py-1.5 rounded-xl border border-current text-[11px] font-bold hover:opacity-80"
        >
          View SQL Schema
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className={`p-5 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${
                isDark
                  ? 'bg-[#0A0A0C] border-white/10 hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                  : 'bg-white border-slate-200 hover:border-[#00E5FF]/50 hover:shadow-[0_8px_20px_rgba(0,229,255,0.1)]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl border border-white/10 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black">{card.count}</span>
                {card.extra && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {card.extra}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
                <span>Manage records</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Jump Modules */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">
          Management Sections
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Personal Profile', desc: 'Update titles, biography, contact info & resume', path: '/admin/profile' },
            { title: 'Project Showcase', desc: 'Publish apps, tech stacks, live links & images', path: '/admin/projects' },
            { title: 'Skills & Proficiencies', desc: 'Configure 44+ technical skill sliders & levels', path: '/admin/skills' },
            { title: 'Work Experience', desc: 'Manage leadership roles, achievements & timeline', path: '/admin/experience' },
            { title: 'Formal Education', desc: 'Degrees, institutions, dates & honor highlights', path: '/admin/education' },
            { title: 'Verified Certificates', desc: 'Issuers, credential IDs, images & badges', path: '/admin/certificates' },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`p-5 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-[#0A0A0C] border-white/10 hover:border-white/25 hover:bg-white/5'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <h4 className="font-bold text-sm leading-tight flex items-center justify-between">
                <span>{item.title}</span>
                <Sparkles className="w-3.5 h-3.5 opacity-40" />
              </h4>
              <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
