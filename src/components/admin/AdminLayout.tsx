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
  PanelBottom,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
  Search,
  Sparkles,
  Shield,
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
  const [navSearch, setNavSearch] = useState('');

  useEffect(() => {
    messageService.getAll().then((msgs) => {
      const unread = msgs.filter((m) => m.status === 'unread').length;
      setUnreadCount(unread);
    }).catch(() => {});
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      showToast('Logged out of Admin CMS', { type: 'info' });
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
    { label: 'Messages Inbox', path: '/admin/messages', icon: Mail, badge: unreadCount },
    { label: 'Footer CMS', path: '/admin/footer', icon: PanelBottom },
    { label: 'Site Settings & DB', path: '/admin/settings', icon: Settings },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(navSearch.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${
      isDark ? 'bg-[#050505] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      {/* Mobile Top Bar */}
      <div className={`md:hidden flex items-center justify-between px-5 py-4 border-b sticky top-0 z-40 backdrop-blur-xl ${
        isDark ? 'bg-[#050505]/95 border-[rgba(212,175,55,0.2)]' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm ${
            isDark ? 'border-[#D4AF37]/50 text-[#D4AF37] bg-black' : 'border-[#00E5FF]/50 text-[#00C8A8] bg-white'
          }`}>
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight">Portfolio Admin CMS</span>
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
            ? 'bg-[#060608] border-[rgba(212,175,55,0.18)] text-zinc-300'
            : 'bg-white border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-lg ${
                isDark
                  ? 'bg-black border-[#D4AF37]/60 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'bg-white border-[#00E5FF]/60 text-[#00C8A8] shadow-[0_0_20px_rgba(0,229,255,0.2)]'
              }`}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm tracking-tight leading-none text-inherit">
                  Executive Admin
                </h2>
                <span className={`text-[10px] font-mono font-bold mt-1 block ${isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'}`}>
                  Dynamic CMS System
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

          {/* Quick Nav Search */}
          <div className="px-4 pt-4 pb-2 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search modules..."
                className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs border bg-transparent outline-none transition-all ${
                  isDark
                    ? 'border-white/10 focus:border-[#D4AF37] placeholder-zinc-500 text-white'
                    : 'border-slate-200 focus:border-[#00C8A8] placeholder-slate-400 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Connection Status Pill */}
          <div className="px-4 py-2 shrink-0">
            <div className={`px-3 py-2 rounded-xl text-[11px] flex items-center justify-between border ${
              isSupabaseConfigured
                ? isDark
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#F5D76E]'
                  : 'bg-emerald-50 border-[#00C8A8]/30 text-[#00C8A8]'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
            }`}>
              <div className="flex items-center gap-2 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate font-mono font-semibold">Supabase PostgreSQL</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1 flex-1 overflow-y-auto">
            {filteredNavItems.map((item) => {
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
                        ? 'bg-[#D4AF37]/20 text-[#F5D76E] border border-[#D4AF37]/40 font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'bg-[#00E5FF]/20 text-[#00A896] border border-[#00E5FF]/40 font-bold shadow-[0_4px_15px_rgba(0,229,255,0.15)]'
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
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
            <Link
              to="/"
              className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isDark
                  ? 'border-white/10 text-zinc-400 hover:text-white hover:border-[#D4AF37]/50'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-[#00C8A8]/50'
              }`}
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Public Portfolio</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">Live</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </span>
              <span className="text-[10px] font-mono opacity-70">Passcode</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Desktop Top Bar */}
        <header className={`hidden md:flex items-center justify-between px-8 py-4 border-b sticky top-0 z-30 backdrop-blur-xl ${
          isDark ? 'bg-[#050505]/90 border-[rgba(212,175,55,0.15)]' : 'bg-white/90 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 text-xs">
            <span className="opacity-50">Admin CMS</span>
            <span className="opacity-40">/</span>
            <span className={`font-bold capitalize ${isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'}`}>
              {location.pathname.replace('/admin/', '').replace('/admin', 'Dashboard Overview')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/messages"
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                unreadCount > 0
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                  : isDark
                  ? 'border-white/10 hover:border-white/20 text-zinc-400'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{unreadCount > 0 ? `${unreadCount} Unread` : 'Inbox'}</span>
            </Link>

            <Link
              to="/"
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isDark
                  ? 'border-[#D4AF37]/30 text-[#F5D76E] hover:bg-[#D4AF37]/10'
                  : 'border-[#00C8A8]/30 text-[#00A896] hover:bg-emerald-50'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
