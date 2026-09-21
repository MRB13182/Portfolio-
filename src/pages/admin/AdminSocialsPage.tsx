import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { socialService } from '../../services/socialService';
import { activityLogService } from '../../services/activityLogService';
import { SocialLinkRow } from '../../types/database';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Share2,
  ExternalLink,
  Github,
  Linkedin,
  Facebook,
  Mail,
  Send,
  MessageSquare,
  Instagram,
  Youtube,
  Twitter,
  ToggleLeft,
  ToggleRight,
  Eye,
} from 'lucide-react';

const SOCIAL_PRESETS = [
  { name: 'GitHub', icon: 'Github', color: '#FFFFFF', placeholder: 'https://github.com/username' },
  { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2', placeholder: 'https://linkedin.com/in/username' },
  { name: 'Facebook', icon: 'Facebook', color: '#1877F2', placeholder: 'https://facebook.com/username' },
  { name: 'WhatsApp', icon: 'MessageSquare', color: '#25D366', placeholder: 'https://wa.me/...' },
  { name: 'Telegram', icon: 'Send', color: '#229ED9', placeholder: 'https://t.me/username' },
  { name: 'Email', icon: 'Mail', color: '#EA4335', placeholder: 'mailto:borshonsweb@gmail.com' },
  { name: 'Instagram', icon: 'Instagram', color: '#E4405F', placeholder: 'https://instagram.com/username' },
  { name: 'YouTube', icon: 'Youtube', color: '#FF0000', placeholder: 'https://youtube.com/@channel' },
  { name: 'X (Twitter)', icon: 'Twitter', color: '#1DA1F2', placeholder: 'https://x.com/username' },
];

export const AdminSocialsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { socials, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingSocial, setEditingSocial] = useState<Partial<SocialLinkRow> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartCreate = (preset?: typeof SOCIAL_PRESETS[0]) => {
    const newId = `social-${Date.now()}`;
    setEditingSocial({
      id: newId,
      name: preset ? preset.name : '',
      url: preset ? preset.placeholder : 'https://',
      icon: preset ? preset.icon : 'Share2',
      color: preset ? preset.color : '#00E5FF',
      action_type: preset?.name === 'Email' ? 'email' : 'link',
      enabled: true,
      sort_order: socials.length + 1,
    });
  };

  const handleStartEdit = (s: any) => {
    setEditingSocial({
      id: s.id || s.name.toLowerCase(),
      name: s.name,
      url: s.url,
      icon: s.icon,
      color: s.color,
      action_type: s.actionType || s.action_type || 'link',
      enabled: s.enabled !== undefined ? s.enabled : true,
      sort_order: s.sortOrder || s.sort_order || 0,
    });
  };

  const handleToggleEnabled = async (s: any, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = s.enabled === false ? true : false;
      await socialService.update(s.id, { enabled: updated });
      await activityLogService.log('Social Updated', 'Social Links', `Toggled ${s.name} ${updated ? 'ON' : 'OFF'}`);
      await refreshData();
      showToast(`${s.name} is now ${updated ? 'Enabled' : 'Disabled'}`, { type: 'success' });
    } catch (err: any) {
      showToast('Error updating link', { type: 'error', message: err.message });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSocial || !editingSocial.name || !editingSocial.url) {
      showToast('Name and URL are required', { type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const payload: Partial<SocialLinkRow> = {
        ...editingSocial,
      };

      const existing = socials.find((s) => s.id === editingSocial.id || s.name.toLowerCase() === editingSocial.name?.toLowerCase());
      if (existing) {
        await socialService.update(existing.id, payload);
        await activityLogService.log('Social Updated', 'Social Links', `Updated ${payload.name}`);
      } else {
        await socialService.create(payload as any);
        await activityLogService.log('Social Added', 'Social Links', `Added ${payload.name}`);
      }

      await refreshData();
      showToast('Social channel saved in Supabase!', { type: 'success' });
      setEditingSocial(null);
    } catch (err: any) {
      showToast('Failed to save social link', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name?: string) => {
    if (!confirm(`Are you sure you want to delete ${name || 'this link'}?`)) return;
    try {
      await socialService.delete(id);
      await activityLogService.log('Social Deleted', 'Social Links', `Deleted ${name || id}`);
      await refreshData();
      showToast('Social link removed', { type: 'info' });
      if (editingSocial?.id === id) setEditingSocial(null);
    } catch (err: any) {
      showToast('Failed to delete link', { type: 'error', message: err.message });
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
              Communication Channels
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Social Links Management</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Manage GitHub, LinkedIn, Facebook, WhatsApp, Telegram, Email, Instagram, YouTube, and X.
          </p>
        </div>

        <button
          onClick={() => handleStartCreate()}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg self-start sm:self-auto ${
            isDark
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
              : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.3)]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Link</span>
        </button>
      </div>

      {/* Quick Add Preset Buttons */}
      <div className={`p-5 rounded-3xl border ${
        isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <span className="text-xs font-bold uppercase tracking-wider block mb-3 opacity-70">
          Quick Preset Connectors
        </span>
        <div className="flex flex-wrap gap-2">
          {SOCIAL_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleStartCreate(preset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'border-white/10 hover:border-white/30 hover:bg-white/5 text-zinc-300'
                  : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Plus className="w-3 h-3 opacity-60" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Modal / Panel */}
      {editingSocial && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-5 ${
            isDark ? 'bg-[#0A0A0C] border-[#D4AF37]/30' : 'bg-white border-[#00C8A8]/30 shadow-md'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-sm tracking-wide">
                {socials.some((s) => s.id === editingSocial.id) ? `Edit Channel: ${editingSocial.name}` : 'Configure Social Channel'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingSocial(null)}
                className="p-1 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Channel Name</label>
                <input
                  type="text"
                  value={editingSocial.name || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, name: e.target.value })}
                  placeholder="e.g., GitHub, LinkedIn, Telegram"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Action Type</label>
                <select
                  value={editingSocial.action_type || 'link'}
                  onChange={(e) => setEditingSocial({ ...editingSocial, action_type: e.target.value as any })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37] bg-[#0A0A0C]' : 'border-slate-300 focus:border-[#00C8A8] bg-white'
                  }`}
                >
                  <option value="link">Direct Web Link (https://...)</option>
                  <option value="email">Email Action (mailto:...)</option>
                  <option value="modal">In-App Contact Modal Trigger</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Destination URL / Address</label>
              <input
                type="text"
                value={editingSocial.url || ''}
                onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                placeholder="https://..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent font-mono ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Icon Name / Identifier</label>
                <input
                  type="text"
                  value={editingSocial.icon || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                  placeholder="e.g., Github, Linkedin, Send, Mail, Twitter"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Brand Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingSocial.color || '#00E5FF'}
                    onChange={(e) => setEditingSocial({ ...editingSocial, color: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-white/20 p-0.5 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingSocial.color || '#00E5FF'}
                    onChange={(e) => setEditingSocial({ ...editingSocial, color: e.target.value })}
                    className={`flex-1 px-3.5 py-2 rounded-xl text-xs border bg-transparent font-mono ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingSocial.enabled !== false}
                  onChange={(e) => setEditingSocial({ ...editingSocial, enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0"
                />
                <span className="text-xs font-bold">Enabled &amp; Visible on Public Portfolio</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSocial(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 opacity-70 hover:opacity-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-5 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-md ${
                    isDark ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black' : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950'
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Channel'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Social Links List */}
      <div className="space-y-3">
        {socials.map((link) => {
          const isEnabled = link.enabled !== false;
          return (
            <div
              key={link.id || link.name}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#0A0A0C] border-white/10 hover:border-white/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              } ${!isEnabled ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
                  style={{ borderColor: `${link.color}40`, color: link.color }}
                >
                  <Share2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-xs">{link.name}</h4>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                      isEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'
                    }`}>
                      {isEnabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <span className="text-[11px] opacity-60 font-mono truncate block">
                    {link.url}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => handleToggleEnabled(link, e)}
                  className="p-1.5 rounded-xl border border-white/10 text-inherit cursor-pointer"
                  title={isEnabled ? 'Disable link' : 'Enable link'}
                >
                  {isEnabled ? (
                    <ToggleRight className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-4 h-4 opacity-40" />
                  )}
                </button>

                <button
                  onClick={() => handleStartEdit(link)}
                  className="p-1.5 rounded-xl border border-white/10 hover:bg-white/10 text-inherit cursor-pointer"
                  title="Edit link"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(link.id, link.name)}
                  className="p-1.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  title="Delete link"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
