import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { migrationService } from '../../services/migrationService';
import { messageService } from '../../services/messageService';
import { activityLogService } from '../../services/activityLogService';
import { profileService } from '../../services/profileService';
import { uploadFileToStorage, STORAGE_BUCKETS, isSupabaseConfigured } from '../../lib/supabase';
import { ActivityLogRow } from '../../types/database';
import {
  FolderGit2,
  Cpu,
  Award,
  Mail,
  Share2,
  Clock,
  Plus,
  Upload,
  FileText,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Database,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { projects, skills, certificates, socials, profile, footerSettings, refreshData, isSupabaseLive } = usePortfolioData();
  const { showToast } = useToast();

  const [messageCount, setMessageCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activities, setActivities] = useState<ActivityLogRow[]>([]);
  const [isMigrating, setIsMigrating] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');

  useEffect(() => {
    messageService.getAll().then((msgs) => {
      setMessageCount(msgs.length);
      setUnreadCount(msgs.filter((m) => m.status === 'unread').length);
    }).catch(() => {});

    activityLogService.getAll().then((logs) => {
      setActivities(logs);
      if (logs.length > 0) {
        const date = new Date(logs[0].created_at);
        setLastUpdatedTime(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
      }
    }).catch(() => {});
  }, []);

  const handleMigrate = async () => {
    setIsMigrating(true);
    try {
      const res = await migrationService.migrateAllStaticData();
      await activityLogService.log('Data Migration', 'Database', 'Full static dataset synchronized to Supabase tables');
      const updatedLogs = await activityLogService.getAll();
      setActivities(updatedLogs);
      setLastUpdatedTime('Just now');

      if (res.errors.length === 0) {
        showToast('All portfolio static content synced to Supabase!', { type: 'success' });
      } else {
        showToast('Sync finished with notes', { type: 'info', message: res.errors[0] });
      }
      await refreshData();
    } catch (err: any) {
      showToast('Migration error', { type: 'error', message: err.message });
    } finally {
      setIsMigrating(false);
    }
  };

  const handleQuickResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.DOCUMENTS, file);
      if (error || !url) throw error || new Error('Upload failed');

      if (profile?.id) {
        await profileService.update(profile.id, { resume_url: url });
        await activityLogService.log('Profile Updated', 'Resume', `Uploaded new resume document: ${file.name}`);
        await refreshData();
        const updatedLogs = await activityLogService.getAll();
        setActivities(updatedLogs);
        showToast('Resume PDF uploaded and linked to profile!', { type: 'success' });
      } else {
        showToast('Resume uploaded: ' + url, { type: 'success' });
      }
    } catch (err: any) {
      showToast('Resume upload failed', { type: 'error', message: err.message });
    } finally {
      setIsUploadingResume(false);
    }
  };

  const statCards = [
    {
      label: 'Total Projects',
      count: projects.length,
      icon: FolderGit2,
      link: '/admin/projects',
      color: isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]',
    },
    {
      label: 'Total Skills',
      count: skills.length,
      icon: Cpu,
      link: '/admin/skills',
      color: isDark ? 'text-[#00E5FF]' : 'text-[#00A896]',
    },
    {
      label: 'Total Certificates',
      count: certificates.length,
      icon: Award,
      link: '/admin/certificates',
      color: isDark ? 'text-[#F5D06F]' : 'text-[#10B981]',
    },
    {
      label: 'Total Messages',
      count: messageCount,
      extra: unreadCount > 0 ? `${unreadCount} Unread` : undefined,
      icon: Mail,
      link: '/admin/messages',
      color: 'text-rose-400',
    },
    {
      label: 'Total Social Links',
      count: socials.length,
      icon: Share2,
      link: '/admin/socials',
      color: isDark ? 'text-[#00C8A8]' : 'text-[#0284C7]',
    },
    {
      label: 'Last Updated',
      customValue: lastUpdatedTime,
      icon: Clock,
      link: '/admin/settings',
      color: isDark ? 'text-[#D4AF37]' : 'text-[#00E5FF]',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Luxury Welcome Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
        isDark
          ? 'bg-gradient-to-br from-[#0B0B0F] via-[#050505] to-[#121008] border-[rgba(212,175,55,0.25)]'
          : 'bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border-slate-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                isDark ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30' : 'bg-cyan-50 text-[#0097A7] border-[#00E5FF]/30'
              }`}>
                Management Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Portfolio Management Console
            </h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Manage your projects, skills, certificates, resume, profile details, and website configuration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleMigrate}
              disabled={isMigrating}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                isDark
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                  : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.3)]'
              } ${isMigrating ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isMigrating ? 'animate-spin' : ''}`} />
              <span>{isMigrating ? 'Syncing Content...' : 'Sync Default Content'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Actions</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/admin/projects')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer ${
              isDark
                ? 'bg-[#0A0A0C] border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5'
                : 'bg-white border-slate-200 hover:border-[#00C8A8]/50 hover:bg-slate-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border mb-2 ${
              isDark ? 'border-[#D4AF37]/30 text-[#D4AF37] bg-black' : 'border-[#00E5FF]/30 text-[#00C8A8] bg-white'
            }`}>
              <Plus className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs">Add Project</div>
            <div className="text-[11px] opacity-60 mt-0.5">Showcase new work</div>
          </button>

          <button
            onClick={() => navigate('/admin/skills')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer ${
              isDark
                ? 'bg-[#0A0A0C] border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5'
                : 'bg-white border-slate-200 hover:border-[#00C8A8]/50 hover:bg-slate-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border mb-2 ${
              isDark ? 'border-[#00E5FF]/30 text-[#00E5FF] bg-black' : 'border-[#00E5FF]/30 text-[#00A896] bg-white'
            }`}>
              <Cpu className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs">Add Skill</div>
            <div className="text-[11px] opacity-60 mt-0.5">Expand proficiency matrix</div>
          </button>

          <button
            onClick={() => navigate('/admin/certificates')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer ${
              isDark
                ? 'bg-[#0A0A0C] border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5'
                : 'bg-white border-slate-200 hover:border-[#00C8A8]/50 hover:bg-slate-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border mb-2 ${
              isDark ? 'border-[#F5D06F]/30 text-[#F5D06F] bg-black' : 'border-[#10B981]/30 text-[#10B981] bg-white'
            }`}>
              <Award className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs">Upload Certificate</div>
            <div className="text-[11px] opacity-60 mt-0.5">Add verified credential</div>
          </button>

          <label className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer block relative ${
            isDark
              ? 'bg-[#0A0A0C] border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5'
              : 'bg-white border-slate-200 hover:border-[#00C8A8]/50 hover:bg-slate-50'
          }`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border mb-2 ${
              isDark ? 'border-[#D4AF37]/30 text-[#D4AF37] bg-black' : 'border-[#00C8A8]/30 text-[#00C8A8] bg-white'
            }`}>
              <Upload className={`w-4 h-4 ${isUploadingResume ? 'animate-bounce' : ''}`} />
            </div>
            <div className="font-bold text-xs">{isUploadingResume ? 'Uploading...' : 'Update Resume'}</div>
            <div className="text-[11px] opacity-60 mt-0.5">Replace PDF document</div>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleQuickResumeUpload}
              disabled={isUploadingResume}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 6 Dashboard Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className={`p-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden ${
                isDark
                  ? 'bg-[#0A0A0C] border-white/10 hover:border-[#D4AF37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                  : 'bg-white border-slate-200 hover:border-[#00E5FF]/50 hover:shadow-[0_8px_20px_rgba(0,229,255,0.1)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-lg border border-white/10 ${card.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-baseline justify-between mt-1">
                {card.customValue ? (
                  <span className="text-xs font-mono font-bold truncate">{card.customValue}</span>
                ) : (
                  <span className="text-2xl font-black">{card.count}</span>
                )}
                {card.extra && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500 text-white">
                    {card.extra}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Panel & System Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Activity Panel (8 cols) */}
        <div className={`lg:col-span-8 p-6 rounded-3xl border ${
          isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'}`} />
              <h3 className="font-bold text-sm tracking-wide">Recent Activity Panel</h3>
            </div>
            <span className="text-[11px] opacity-60 font-mono">Live Audit Trail</span>
          </div>

          <div className="divide-y divide-white/10">
            {activities.length > 0 ? (
              activities.slice(0, 7).map((act) => (
                <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono ${
                        act.action.toLowerCase().includes('added') || act.action.toLowerCase().includes('created')
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : act.action.toLowerCase().includes('uploaded')
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : act.action.toLowerCase().includes('footer')
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {act.action}
                      </span>
                      <span className="font-bold">{act.entity_name}</span>
                    </div>
                    {act.details && (
                      <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                        {act.details}
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] opacity-50 font-mono whitespace-nowrap">
                    {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs opacity-60">
                No recorded activity yet. Actions taken across the CMS will appear here in real-time.
              </div>
            )}
          </div>
        </div>

        {/* System Status (4 cols) */}
        <div className={`lg:col-span-4 p-6 rounded-3xl border space-y-4 ${
          isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'}`} />
            <h3 className="font-bold text-sm tracking-wide">CMS Configuration</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="opacity-70">Sync Engine</span>
              <span className="font-bold font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="opacity-70">Document Assets</span>
              <span className="font-mono font-bold">PDF Ready</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="opacity-70">Content Modules</span>
              <span className="font-mono font-bold">11 Categories</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="opacity-70">Access Security</span>
              <span className="font-mono font-bold text-[#00E5FF]">Passcode Protected</span>
            </div>
          </div>

          <Link
            to="/admin/settings"
            className={`w-full mt-2 py-2.5 px-3 rounded-xl border text-xs font-bold text-center block transition-all ${
              isDark
                ? 'border-white/10 hover:border-[#00E5FF]/40 hover:bg-white/5 text-white'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
            }`}
          >
            Website &amp; Theme Settings
          </Link>
        </div>
      </div>
    </div>
  );
};
