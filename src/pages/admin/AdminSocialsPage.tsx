import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { socialService } from '../../services/socialService';
import { SocialLinkRow } from '../../types/database';
import { Plus, Trash2, Edit2, Check, X, Share2, ExternalLink } from 'lucide-react';

export const AdminSocialsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { socials, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingSocial, setEditingSocial] = useState<Partial<SocialLinkRow> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartCreate = () => {
    const newId = `social-${Date.now()}`;
    setEditingSocial({
      id: newId,
      name: '',
      url: 'https://',
      icon: 'Globe',
      color: '#00E5FF',
      action_type: 'link',
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
    });
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

      const existing = socials.find((s) => s.name.toLowerCase() === editingSocial.name?.toLowerCase());
      if (existing) {
        await socialService.update(editingSocial.id!, payload);
      } else {
        await socialService.create(payload);
      }

      await refreshData();
      showToast('Social link saved in Supabase!', { type: 'success' });
      setEditingSocial(null);
    } catch (err: any) {
      showToast('Failed to save social link', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;
    try {
      await socialService.delete(id);
      await refreshData();
      showToast('Social link removed', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to delete link', { type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Social & Channels</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Configure GitHub, LinkedIn, WhatsApp, Telegram, X, and messaging endpoints.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
            isDark
              ? 'bg-[#D4AF37] text-black hover:bg-[#F5D06F]'
              : 'bg-[#00E5FF] text-slate-950 hover:bg-[#00C8A8]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {editingSocial && (
        <form
          onSubmit={handleSave}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-4 ${
            isDark ? 'bg-[#0C0C10] border-[#D4AF37]/30' : 'bg-white border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-extrabold text-base">
              {editingSocial.id && socials.some((s) => s.name.toLowerCase() === editingSocial.name?.toLowerCase())
                ? 'Edit Social Link'
                : 'Create Social Link'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingSocial(null)}
              className="p-1.5 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Platform Name</label>
              <input
                type="text"
                required
                value={editingSocial.name || ''}
                onChange={(e) => setEditingSocial({ ...editingSocial, name: e.target.value })}
                placeholder="e.g. GitHub, LinkedIn, WhatsApp"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">URL or Contact Action</label>
              <input
                type="text"
                required
                value={editingSocial.url || ''}
                onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                placeholder="https://github.com/..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Lucide Icon Name</label>
              <input
                type="text"
                value={editingSocial.icon || 'Globe'}
                onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                placeholder="Github, Linkedin, Send, Mail"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Accent Hex Color</label>
              <input
                type="text"
                value={editingSocial.color || '#00E5FF'}
                onChange={(e) => setEditingSocial({ ...editingSocial, color: e.target.value })}
                placeholder="#0077b5"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Action Type</label>
              <select
                value={editingSocial.action_type || 'link'}
                onChange={(e: any) => setEditingSocial({ ...editingSocial, action_type: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="link">Standard Web Link</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingSocial(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                isDark ? 'bg-[#D4AF37] text-black' : 'bg-[#00E5FF] text-slate-950'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Social Link'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Social Links List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socials.map((s) => (
          <div
            key={s.name}
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: s.color || '#333' }}
              >
                {s.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-xs">{s.name}</h4>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] opacity-70 hover:opacity-100 flex items-center gap-1 truncate max-w-[140px]"
                >
                  <span>{s.url}</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStartEdit(s)}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(s.name.toLowerCase())}
                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
