import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { messageService } from '../../services/messageService';
import { ContactMessageRow } from '../../types/database';
import { Mail, MailOpen, Trash2, CheckCircle2, Archive, RefreshCw, Calendar, User } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminMessagesPage: React.FC = () => {
  const { isDark } = useTheme();
  const { showToast } = useToast();

  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const msgs = await messageService.getAll();
        setMessages(msgs);
      } else {
        setMessages([]);
      }
    } catch (err: any) {
      showToast('Could not load messages from Supabase', { type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await messageService.markAsRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'read' } : m)));
      showToast('Marked as read', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to update status', { type: 'error', message: err.message });
    }
  };

  const handleMarkAsArchived = async (id: string) => {
    try {
      await messageService.markAsArchived(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'archived' } : m)));
      showToast('Message archived', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to archive message', { type: 'error', message: err.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      await messageService.delete(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast('Message deleted', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to delete message', { type: 'error', message: err.message });
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Contact Messages</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Direct inquiries and recruiter opportunities submitted via your portfolio's contact form.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer transition-colors ${
            isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-100'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {(['all', 'unread', 'read', 'archived'] as const).map((tab) => {
          const count = tab === 'all' ? messages.length : messages.filter((m) => m.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === tab
                  ? isDark
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-[#00E5FF] text-slate-950 font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span>{tab}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'}`}>
          <Mail className="w-10 h-10 mx-auto opacity-30 mb-3" />
          <h3 className="font-bold text-sm">No {filter !== 'all' ? filter : ''} messages found</h3>
          <p className="text-xs opacity-60 mt-1 max-w-xs mx-auto">
            When recruiters or collaborators submit the contact form, their inquiries appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.status === 'unread'
                  ? isDark
                    ? 'bg-[#0E0E12] border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.08)]'
                    : 'bg-emerald-50/30 border-[#00E5FF]/40 shadow-sm'
                  : isDark
                  ? 'bg-[#0A0A0C] border-white/10 opacity-80'
                  : 'bg-white border-slate-200 opacity-90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{msg.subject}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono capitalize ${
                        msg.status === 'unread'
                          ? 'bg-rose-500 text-white font-bold'
                          : msg.status === 'archived'
                          ? 'bg-zinc-700 text-white'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs opacity-70 mt-1">
                    <span className="flex items-center gap-1 font-semibold">
                      <User className="w-3 h-3" />
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="underline hover:opacity-100"
                    >
                      {msg.email}
                    </a>
                    {msg.created_at && (
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleDateString()} at {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  {msg.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs flex items-center gap-1 cursor-pointer"
                      title="Mark as Read"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  )}
                  {msg.status !== 'archived' && (
                    <button
                      onClick={() => handleMarkAsArchived(msg.id)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs cursor-pointer"
                      title="Archive"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className={`p-4 rounded-xl text-xs leading-relaxed ${isDark ? 'bg-black/50 text-zinc-300' : 'bg-slate-50 text-slate-700'}`}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
