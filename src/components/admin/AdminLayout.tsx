import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { messageService } from '../../services/messageService';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Share2,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isDark } = useTheme();
  const { signOut, user } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (isSupabaseConfigured) {
      messageService.getAll().then((msgs) => {
        const unread = msgs.filter((m) => m.status === 'unread').length;
        setUnreadCount(unread);
      }).catch(() => {});
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      showToast('Logged out of Admin Portal', { type: 'info' });
      navigate('/admin/login');
    } catch (err: any) {
      showToast('Logout failed', { type: 'error', message: err.message });
    }
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Profile & Bio', path: '/admin/profile', icon: User },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Skills Matrix', path: '/admin/skills', icon: Cpu },
    { label: 'Experience', path: '/admin/experience', icon: Briefcase },
    { label: 'Education', path: '/admin/education', icon: GraduationCap },
    { label: 'Certificates', path: '/admin/certificates', icon: Award },
    { label: 'Social Links', path: '/admin/socials', icon: Share2 },
    { label: 'Messages', path: '/admin/messages', icon: Mail, badge: unreadCount },
    { label: 'Settings & DB', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${
      isDark ? 'bg-[#050505] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      {/* Mobile Top Bar */}
      <div className={`md:hidden flex items-center justify-between px-5 py-4 border-b sticky top-0 z-40 backdrop-blur-xl ${
        isDark ? 'bg-[#0A0A0C]/90 border-white/10' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
            isDark ? 'border-[#D4AF37]/40 text-[#D4AF37] bg-black' : 'border-[#00E5FF]/40 text-[#00C8A8] bg-white'
          }`}>
            <Database className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight">Admin Console</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg border border-white/10 text-inherit cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 border-r flex flex-col justify-between ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDark
            ? 'bg-[#08080A] border-[rgba(212,175,55,0.15)] text-zinc-300'
            : 'bg-white border-slate-200 text-slate-700'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-md ${
                isDark
                  ? 'bg-black border-[#D4AF37]/50 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-white border-[#00E5FF]/50 text-[#00C8A8] shadow-[0_0_15px_rgba(0,229,255,0.2)]'
              }`}>
                {/* Minimal Shield Emblem */}
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path
                    d="M12 2.75L4.5 5.75V11.25C4.5 16.5 7.7 20.65 12 22C16.3 20.65 19.5 16.5 19.5 11.25V5.75L12 2.75Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8.75C11.17 8.75 10.5 9.42 10.5 10.25C10.5 10.84 10.84 11.35 11.33 11.59L11 14H13L12.67 11.59C13.16 11.35 13.5 10.84 13.5 10.25C13.5 9.42 12.83 8.75 12 8.75Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-extrabold text-sm tracking-tight leading-none text-inherit">
                  Executive Admin
                </h2>
                <span className={`text-[10px] font-mono ${isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'}`}>
                  Supabase Connected
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Connection Status Pill */}
          <div className="px-5 py-3">
            <div className={`px-3 py-2 rounded-xl text-[11px] flex items-center gap-2 border ${
              isSupabaseConfigured
                ? isDark
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#F5D76E]'
                  : 'bg-emerald-50 border-[#00C8A8]/30 text-[#00C8A8]'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
            }`}>
              {isSupabaseConfigured ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate font-mono">egpwwzkwwxsrctzyhpnv</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Configure Anon Key in .env</span>
                </>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-[#D4AF37]/15 text-[#F5D76E] border border-[#D4AF37]/30 font-bold'
                        : 'bg-[#00E5FF]/15 text-[#00A896] border border-[#00E5FF]/30 font-bold'
                      : isDark
                      ? 'hover:bg-white/5 hover:text-white'
                      : 'hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {Boolean(item.badge && item.badge > 0) && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isDark
                ? 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400'
            }`}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Portfolio</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out ({user?.email || 'Admin'})</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
