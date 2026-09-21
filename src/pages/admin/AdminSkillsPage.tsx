import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { skillService } from '../../services/skillService';
import { SkillRow } from '../../types/database';
import { Plus, Trash2, Edit2, Check, X, Cpu, Search } from 'lucide-react';

export const AdminSkillsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { skills, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingSkill, setEditingSkill] = useState<Partial<SkillRow> | null>(null);
  const [highlightsInput, setHighlightsInput] = useState('');
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
      description: '',
      accent_color: '#00E5FF',
    });
    setHighlightsInput('');
  };

  const handleStartEdit = (s: any) => {
    setEditingSkill({
      id: s.id,
      name: s.name,
      category: s.category,
      level: s.level,
      logo: s.logo,
      experience: s.experience,
      experience_duration: s.experienceDuration,
      icon_name: s.iconName,
      description: s.description,
      accent_color: s.accentColor,
    });
    setHighlightsInput((s.proficiencyHighlights || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) {
      showToast('Skill name is required', { type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const highlights = highlightsInput
        .split('\n')
        .map((h) => h.trim())
        .filter(Boolean);

      const payload: Partial<SkillRow> = {
        ...editingSkill,
        proficiency_highlights: highlights,
      };

      const existing = skills.find((s) => s.id === editingSkill.id);
      if (existing) {
        await skillService.update(editingSkill.id!, payload);
      } else {
        await skillService.create(payload);
      }

      await refreshData();
      showToast('Skill saved in Supabase!', { type: 'success' });
      setEditingSkill(null);
    } catch (err: any) {
      showToast('Failed to save skill', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await skillService.delete(id);
      await refreshData();
      showToast('Skill removed', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to delete skill', { type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Skills Matrix</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Manage {skills.length} technical capabilities, proficiency percentages, and experience tags.
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
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs outline-none ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-[#00E5FF] text-slate-950 font-bold'
                  : isDark
                  ? 'bg-white/5 text-zinc-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Edit Form */}
      {editingSkill && (
        <form
          onSubmit={handleSave}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-4 ${
            isDark ? 'bg-[#0C0C10] border-[#D4AF37]/30' : 'bg-white border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-extrabold text-base">
              {skills.some((s) => s.id === editingSkill.id) ? 'Edit Skill' : 'Create Skill'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="p-1.5 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Skill Name</label>
              <input
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                placeholder="e.g. React, Docker, TypeScript"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Category</label>
              <select
                value={editingSkill.category || 'Frontend Development'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-50 border-slate-300'
                }`}
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Experience Duration</label>
              <input
                type="text"
                value={editingSkill.experience || '4+ Years'}
                onChange={(e) => setEditingSkill({ ...editingSkill, experience: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold opacity-80">Proficiency Level</label>
                <span className="font-mono text-xs font-bold">{editingSkill.level}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={editingSkill.level || 90}
                onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                className="w-full accent-[#00E5FF] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Accent Color</label>
              <input
                type="text"
                value={editingSkill.accent_color || '#00E5FF'}
                onChange={(e) => setEditingSkill({ ...editingSkill, accent_color: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Description</label>
            <textarea
              rows={2}
              value={editingSkill.description || ''}
              onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Proficiency Highlights (one per line)</label>
            <textarea
              rows={3}
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
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
              <span>{isSaving ? 'Saving...' : 'Save Skill'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-2xl border flex flex-col justify-between ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">{s.name}</span>
                <span className="font-mono text-xs font-bold opacity-80">{s.level}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${s.level}%`,
                    backgroundColor: s.accentColor || (isDark ? '#D4AF37' : '#00C8A8'),
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] opacity-70 mb-2">
                <span>{s.category}</span>
                <span>{s.experience || s.experienceDuration}</span>
              </div>

              <p className={`text-[11px] line-clamp-2 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                {s.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-white/10">
              <button
                onClick={() => handleStartEdit(s)}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(s.id)}
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
