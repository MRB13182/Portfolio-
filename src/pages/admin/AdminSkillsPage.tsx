import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { skillService } from '../../services/skillService';
import { activityLogService } from '../../services/activityLogService';
import { SkillRow } from '../../types/database';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Cpu,
  Search,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Eye,
  Sliders,
} from 'lucide-react';

export const AdminSkillsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { skills, addSkill, updateSkill, deleteSkill, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingSkill, setEditingSkill] = useState<Partial<SkillRow> | null>(null);
  const [highlightsInput, setHighlightsInput] = useState('');
  const [relatedProjectsInput, setRelatedProjectsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const categories = ['All', 'Frontend Development', 'Backend Development', 'Database', 'Cloud & DevOps', 'UI/UX & Design'];

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartCreate = () => {
    const newId = `skill-${Date.now()}`;
    setEditingSkill({
      id: newId,
      name: '',
      category: 'Frontend Development',
      level: 90,
      experience: '4+ Years',
      experience_duration: '4+ Years',
      description: '',
      accent_color: '#00E5FF',
      logo: '',
      icon_name: 'Code2',
      sort_order: skills.length + 1,
    });
    setHighlightsInput('');
    setRelatedProjectsInput('');
  };

  const handleStartEdit = (s: any) => {
    setEditingSkill({
      id: s.id,
      name: s.name,
      category: s.category,
      level: s.level,
      logo: s.logo || '',
      experience: s.experience || '4+ Years',
      experience_duration: s.experienceDuration || s.experience_duration || '4+ Years',
      icon_name: s.iconName || s.icon_name || 'Code2',
      description: s.description || '',
      accent_color: s.accentColor || s.accent_color || '#00E5FF',
      sort_order: s.sortOrder || s.sort_order || 0,
    });
    setHighlightsInput((s.proficiencyHighlights || s.proficiency_highlights || []).join('\n'));
    setRelatedProjectsInput((s.relatedProjects || s.related_projects || []).join(', '));
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredSkills.length) return;

    const currentSkill = filteredSkills[index];
    const targetSkill = filteredSkills[targetIndex];

    try {
      await updateSkill(currentSkill.id, { sort_order: targetIndex + 1 });
      await updateSkill(targetSkill.id, { sort_order: index + 1 });
      showToast('Skill order updated', { type: 'success' });
    } catch (err: any) {
      showToast('Error reordering', { type: 'error', message: err.message });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) {
      showToast('Skill name is required', { type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const highlights = highlightsInput.split('\n').map((h) => h.trim()).filter(Boolean);
      const relatedProjects = relatedProjectsInput.split(',').map((p) => p.trim()).filter(Boolean);

      const payload: Partial<SkillRow> = {
        ...editingSkill,
        proficiency_highlights: highlights,
        related_projects: relatedProjects,
      };

      const existing = skills.find((s) => s.id === editingSkill.id);
      if (existing) {
        await updateSkill(editingSkill.id!, payload);
        await activityLogService.log('Skill Updated', 'Skills Matrix', `Updated skill: ${payload.name}`);
      } else {
        await addSkill(payload);
        await activityLogService.log('Skill Added', 'Skills Matrix', `Added skill: ${payload.name}`);
      }

      showToast('Skill saved successfully!', { type: 'success' });
      setEditingSkill(null);
    } catch (err: any) {
      showToast('Save failed', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name?: string) => {
    if (!confirm(`Are you sure you want to permanently delete skill "${name || id}"?`)) return;
    try {
      await deleteSkill(id);
      await activityLogService.log('Skill Deleted', 'Skills Matrix', `Removed skill: ${name || id}`);
      showToast('Skill removed', { type: 'info' });
      if (editingSkill?.id === id) setEditingSkill(null);
    } catch (err: any) {
      showToast('Failed to delete skill', { type: 'error', message: err.message });
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
              Technical Proficiency
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Skills Matrix Management</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Configure 44+ technical proficiencies, level meters, experience timelines, and accent colors.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg self-start sm:self-auto ${
            isDark
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
              : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.3)]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Editor Form Modal / Drawer */}
      {editingSkill && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
            <div className={`p-6 rounded-3xl border space-y-5 ${
              isDark ? 'bg-[#0A0A0C] border-[#D4AF37]/30' : 'bg-white border-[#00C8A8]/30 shadow-md'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-bold text-sm tracking-wide">
                  {skills.some((s) => s.id === editingSkill.id) ? `Edit Skill: ${editingSkill.name}` : 'Add New Skill'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="p-1 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Skill Name</label>
                  <input
                    type="text"
                    value={editingSkill.name || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    placeholder="e.g., React & Next.js"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Category</label>
                  <select
                    value={editingSkill.category || 'Frontend Development'}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37] bg-[#0A0A0C]' : 'border-slate-300 focus:border-[#00C8A8] bg-white'
                    }`}
                  >
                    {categories.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Level Slider (0 - 100%) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold">Proficiency Level</label>
                  <span className="font-mono text-xs font-bold" style={{ color: editingSkill.accent_color || '#00E5FF' }}>
                    {editingSkill.level || 90}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={editingSkill.level || 90}
                  onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value, 10) })}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-emerald-400"
                />
              </div>

              {/* Experience & Accent Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Experience Duration</label>
                  <input
                    type="text"
                    value={editingSkill.experience || editingSkill.experience_duration || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, experience: e.target.value, experience_duration: e.target.value })}
                    placeholder="e.g., 5+ Years"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Accent Color (Hex)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingSkill.accent_color || '#00E5FF'}
                      onChange={(e) => setEditingSkill({ ...editingSkill, accent_color: e.target.value })}
                      className="w-9 h-9 rounded-xl border border-white/20 p-0.5 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingSkill.accent_color || '#00E5FF'}
                      onChange={(e) => setEditingSkill({ ...editingSkill, accent_color: e.target.value })}
                      className={`flex-1 px-3.5 py-2 rounded-xl text-xs border bg-transparent font-mono ${
                        isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Logo / Icon URL */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Skill Logo / Icon URL</label>
                <input
                  type="text"
                  value={editingSkill.logo || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, logo: e.target.value })}
                  placeholder="https://... or /icons/react.svg"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Description &amp; Use-Cases</label>
                <textarea
                  rows={2}
                  value={editingSkill.description || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                  placeholder="Production-grade component systems, server components, and performance optimizations."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent resize-none ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Related Projects */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Related Projects (comma-separated)</label>
                <input
                  type="text"
                  value={relatedProjectsInput}
                  onChange={(e) => setRelatedProjectsInput(e.target.value)}
                  placeholder="Nexus AI, Cloud Scale Architecture, Portfolio"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
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
                  {isSaving ? 'Saving Skill...' : 'Save Skill'}
                </button>
              </div>
            </div>
          </form>

          {/* Live Skill Card Preview */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-80">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Skill Card Preview</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">Interactive</span>
            </div>

            <div className={`p-6 rounded-3xl border shadow-xl ${
              isDark ? 'bg-[#08080A] border-[rgba(212,175,55,0.25)] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border p-1"
                    style={{ borderColor: editingSkill.accent_color || '#00E5FF', color: editingSkill.accent_color || '#00E5FF' }}
                  >
                    {editingSkill.logo ? (
                      <img src={editingSkill.logo} alt="" className="w-6 h-6 object-contain" />
                    ) : (
                      <Cpu className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm">{editingSkill.name || 'Skill Name'}</h4>
                    <span className="text-[10px] font-mono opacity-60">{editingSkill.category || 'Frontend'}</span>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold" style={{ color: editingSkill.accent_color || '#00E5FF' }}>
                  {editingSkill.level || 90}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${editingSkill.level || 90}%`,
                    backgroundColor: editingSkill.accent_color || '#00E5FF',
                  }}
                />
              </div>

              <p className="text-xs opacity-75 leading-relaxed line-clamp-2 mb-3">
                {editingSkill.description || 'Production system implementation & high throughput scalability.'}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="opacity-60">{editingSkill.experience || '4+ Years Experience'}</span>
                <span className="font-mono" style={{ color: editingSkill.accent_color || '#00E5FF' }}>
                  {editingSkill.accent_color || '#00E5FF'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills by name or keyword..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border bg-transparent ${
              isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
            }`}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-[#00E5FF] text-slate-950 font-bold'
                  : isDark
                  ? 'border border-white/10 hover:bg-white/5 text-zinc-400'
                  : 'border border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, idx) => (
          <div
            key={skill.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
              isDark ? 'bg-[#0A0A0C] border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center border p-1 shrink-0"
                    style={{
                      borderColor: `${skill.accentColor || skill.accent_color || '#00E5FF'}40`,
                      color: skill.accentColor || skill.accent_color || '#00E5FF',
                    }}
                  >
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">{skill.name}</h3>
                    <span className="text-[10px] font-mono opacity-60">{skill.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded-md border border-white/10 disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleMoveOrder(idx, 'down')}
                    disabled={idx === filteredSkills.length - 1}
                    className="p-1 rounded-md border border-white/10 disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Level Bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.accentColor || skill.accent_color || '#00E5FF',
                  }}
                />
              </div>

              <p className={`text-xs line-clamp-2 mb-3 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                {skill.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] font-bold" style={{ color: skill.accentColor || skill.accent_color || '#00E5FF' }}>
                {skill.level}%
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(skill)}
                  className="p-1.5 rounded-xl border border-white/10 hover:bg-white/10 text-inherit cursor-pointer"
                  title="Edit skill"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id, skill.name)}
                  className="p-1.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  title="Delete skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
