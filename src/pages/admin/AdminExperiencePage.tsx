import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { experienceService } from '../../services/experienceService';
import { activityLogService } from '../../services/activityLogService';
import { ExperienceRow } from '../../types/database';
import { Plus, Trash2, Edit2, Check, X, Briefcase, MapPin, Calendar } from 'lucide-react';

export const AdminExperiencePage: React.FC = () => {
  const { isDark } = useTheme();
  const { experience, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingExp, setEditingExp] = useState<Partial<ExperienceRow> | null>(null);
  const [achievementsInput, setAchievementsInput] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleStartCreate = () => {
    const newId = `exp-${Date.now()}`;
    setEditingExp({
      id: newId,
      position: '',
      company: '',
      location: 'Remote',
      duration: '2023 - Present',
      period: '2023 - Present',
      type: 'Full-time',
      description: '',
      achievements: [],
      skills: [],
    });
    setAchievementsInput('');
    setSkillsInput('');
  };

  const handleStartEdit = (exp: any) => {
    setEditingExp({
      id: exp.id,
      position: exp.position,
      company: exp.company,
      location: exp.location,
      duration: exp.duration,
      period: exp.period,
      type: exp.type,
      description: exp.description,
      achievements: exp.achievements || [],
      skills: exp.skills || [],
    });
    setAchievementsInput((exp.achievements || []).join('\n'));
    setSkillsInput((exp.skills || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.position || !editingExp.company) {
      showToast('Position and Company are required', { type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const achievements = achievementsInput.split('\n').map((a) => a.trim()).filter(Boolean);
      const skills = skillsInput.split(',').map((s) => s.trim()).filter(Boolean);

      const payload: Partial<ExperienceRow> = {
        ...editingExp,
        achievements,
        skills,
      };

      const existing = experience.find((e) => e.id === editingExp.id);
      if (existing) {
        await experienceService.update(editingExp.id!, payload);
        await activityLogService.log('Experience Updated', 'Career Timeline', `Updated ${payload.position} at ${payload.company}`);
      } else {
        await experienceService.create(payload);
        await activityLogService.log('Experience Added', 'Career Timeline', `Added role: ${payload.position} at ${payload.company}`);
      }

      await refreshData();
      showToast('Experience saved in Supabase!', { type: 'success' });
      setEditingExp(null);
    } catch (err: any) {
      showToast('Failed to save experience', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience record?')) return;
    try {
      await experienceService.delete(id);
      await activityLogService.log('Experience Deleted', 'Career Timeline', `Removed experience record ID: ${id}`);
      await refreshData();
      showToast('Experience deleted', { type: 'info' });
    } catch (err: any) {
      showToast('Delete failed', { type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Work Experience</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Chronological engineering roles, team leadership, architectural achievements, and stacks.
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
          <span>Add Position</span>
        </button>
      </div>

      {editingExp && (
        <form
          onSubmit={handleSave}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-4 ${
            isDark ? 'bg-[#0C0C10] border-[#D4AF37]/30' : 'bg-white border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-extrabold text-base">
              {experience.some((e) => e.id === editingExp.id) ? 'Edit Position' : 'Create Position'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingExp(null)}
              className="p-1.5 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Position Title</label>
              <input
                type="text"
                required
                value={editingExp.position || ''}
                onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                placeholder="Senior Full Stack Engineer"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Company / Organization</label>
              <input
                type="text"
                required
                value={editingExp.company || ''}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                placeholder="Tech Corp / Autonomous Lab"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Location</label>
              <input
                type="text"
                value={editingExp.location || ''}
                onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                placeholder="San Francisco, CA / Remote"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Duration / Period</label>
              <input
                type="text"
                value={editingExp.duration || ''}
                onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value, period: e.target.value })}
                placeholder="Jan 2022 - Present"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Employment Type</label>
              <select
                value={editingExp.type || 'Full-time'}
                onChange={(e: any) => setEditingExp({ ...editingExp, type: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Summary Description</label>
            <textarea
              rows={2}
              value={editingExp.description || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Key Achievements (one per line)</label>
            <textarea
              rows={3}
              value={achievementsInput}
              onChange={(e) => setAchievementsInput(e.target.value)}
              placeholder="Reduced API latency by 45% using Edge functions&#10;Mentored 6 junior engineers on TypeScript best practices"
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Technologies Used (comma-separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="TypeScript, React, Node.js, PostgreSQL"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingExp(null)}
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
              <span>{isSaving ? 'Saving...' : 'Save Position'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Experience Timeline Cards */}
      <div className="space-y-4">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-start justify-between gap-4 ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-base">{exp.position}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                  isDark ? 'bg-white/5 border-white/10 text-[#D4AF37]' : 'bg-slate-100 border-slate-200 text-[#00A896]'
                }`}>
                  {exp.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs opacity-70">
                <span className="font-semibold">{exp.company}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  {exp.duration || exp.period}
                </span>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                {exp.description}
              </p>

              {(exp.achievements || []).length > 0 && (
                <ul className="list-disc list-inside text-xs opacity-80 space-y-1 pt-1">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 self-end md:self-start">
              <button
                onClick={() => handleStartEdit(exp)}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
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
