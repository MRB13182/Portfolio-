import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { messageService } from '../../services/messageService';
import { activityLogService } from '../../services/activityLogService';
import { ContactMessageRow } from '../../types/database';
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCircle2,
  Archive,
  RefreshCw,
  Calendar,
  User,
  Search,
  ExternalLink,
  Reply,
  Shield,
  Eye,
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminMessagesPage: React.FC = () => {
  const { isDark } = useTheme();
  const { showToast } = useToast();

  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageRow | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const msgs = await messageService.getAll();
      setMessages(msgs);
    } catch (err: any) {
      showToast('Could not load messages', { type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleReadStatus = async (msg: ContactMessageRow) => {
    const nextStatus = msg.status === 'unread' ? 'read' : 'unread';
    try {
      await messageService.update(msg.id, { status: nextStatus });
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, status: nextStatus } : m)));
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, status: nextStatus });
      }
      showToast(`Marked as ${nextStatus}`, { type: 'success' });
    } catch (err: any) {
      showToast('Failed to update status', { type: 'error', message: err.message });
    }
  };

  const handleMarkAsArchived = async (id: string) => {
    try {
      await messageService.markAsArchived(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'archived' } : m)));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'archived' });
      }
      showToast('Message archived', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to archive message', { type: 'error', message: err.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      await messageService.delete(id);
      await activityLogService.log('Message Deleted', 'Contact Messages', `Deleted message ID: ${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      showToast('Message deleted', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to delete message', { type: 'error', message: err.message });
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter = filter === 'all' || m.status === filter;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
              isDark ? 'bg-[#D4AF37]/10 text-[#F5D76E] border-[#D4AF37]/30' : 'bg-emerald-100/50 text-[#00A896] border-[#00E5FF]/30'
            }`}>
              Recruiter &amp; Inquiries Inbox
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Contact Messages System</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Live inquiries delivered directly from your portfolio contact form without relying on mailto.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
            isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-200 hover:border-slate-400 text-slate-700'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Messages', count: messages.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'read', label: 'Read', count: messages.filter((m) => m.status === 'read').length },
            { id: 'archived', label: 'Archived', count: messages.filter((m) => m.status === 'archived').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? isDark
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-[#00E5FF] text-slate-950 font-bold'
                  : isDark
                  ? 'border border-white/10 hover:bg-white/5 text-zinc-400'
                  : 'border border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  filter === tab.id
                    ? 'bg-black/20 text-current'
                    : isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border bg-transparent ${
              isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
            }`}
          />
        </div>
      </div>

      {/* Main Inbox & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List (Left / 7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => {
              const isUnread = msg.status === 'unread';
              const isSelected = selectedMessage?.id === msg.id;

              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? isDark
                        ? 'bg-[#0F0F14] border-[#D4AF37]'
                        : 'bg-emerald-50/50 border-[#00C8A8]'
                      : isDark
                      ? isUnread
                        ? 'bg-[#0D0D12] border-white/20 hover:border-white/30'
                        : 'bg-[#060608] border-white/10 hover:border-white/20'
                      : isUnread
                      ? 'bg-white border-slate-300 shadow-sm'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border text-xs font-bold ${
                        isUnread
                          ? isDark ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00A896]'
                          : isDark ? 'border-white/10 text-zinc-400' : 'border-slate-300 text-slate-600'
                      }`}>
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={`text-xs ${isUnread ? 'font-extrabold text-white' : 'font-semibold'}`}>
                          {msg.name}
                        </h4>
                        <span className="text-[11px] opacity-60 font-mono block">{msg.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-50 font-mono">
                        {new Date(msg.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      )}
                    </div>
                  </div>

                  <h5 className="text-xs font-bold mb-1 line-clamp-1">{msg.subject}</h5>
                  <p className={`text-xs line-clamp-2 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                    {msg.message}
                  </p>
                </div>
              );
            })
          ) : (
            <div className={`p-12 rounded-3xl border text-center text-xs opacity-60 ${
              isDark ? 'border-white/10 bg-[#0A0A0C]' : 'border-slate-200 bg-white'
            }`}>
              No inquiries found for this filter. Messages submitted via the contact form will automatically arrive here.
            </div>
          )}
        </div>

        {/* Selected Message Detail Panel (Right / 5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          {selectedMessage ? (
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
              isDark ? 'bg-[#0A0A0C] border-[rgba(212,175,55,0.25)] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    selectedMessage.status === 'unread'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {selectedMessage.status}
                  </span>
                  <h3 className="font-extrabold text-base mt-2">{selectedMessage.subject}</h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleReadStatus(selectedMessage)}
                    className="p-1.5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer"
                    title={selectedMessage.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                  >
                    {selectedMessage.status === 'unread' ? <MailOpen className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleMarkAsArchived(selectedMessage.id)}
                    className="p-1.5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer"
                    title="Archive"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-1.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="opacity-60 font-semibold">From:</span>
                  <span className="font-bold">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-60 font-semibold">Email:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-emerald-400 hover:underline font-mono">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-60 font-semibold">Received:</span>
                  <span className="opacity-80 font-mono">
                    {new Date(selectedMessage.created_at || '').toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed whitespace-pre-wrap ${
                isDark ? 'bg-black/50 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                {selectedMessage.message}
              </div>

              {/* Quick Reply Action */}
              <div className="pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isDark
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90'
                      : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-90'
                  }`}
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Direct Email ({selectedMessage.email})</span>
                </a>
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-3xl border text-center text-xs opacity-60 ${
              isDark ? 'border-white/10 bg-[#0A0A0C]' : 'border-slate-200 bg-white'
            }`}>
              Select a message from the list to read full details and reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
