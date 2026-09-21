import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { educationService } from '../../services/educationService';
import { EducationRow } from '../../types/database';
import { Plus, Trash2, Edit2, Check, X, GraduationCap, MapPin } from 'lucide-react';

export const AdminEducationPage: React.FC = () => {
  const { isDark } = useTheme();
  const { education, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingEdu, setEditingEdu] = useState<Partial<EducationRow> | null>(null);
  const [highlightsInput, setHighlightsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleStartCreate = () => {
    const newId = `edu-${Date.now()}`;
    setEditingEdu({
      id: newId,
      degree: '',
      field: 'Computer Science & Engineering',
      institution: '',
      location: 'Dhaka, Bangladesh',
      duration: '2019 - 2023',
      grade: 'First Class Honors',
      highlights: [],
    });
    setHighlightsInput('');
  };

  const handleStartEdit = (edu: any) => {
    setEditingEdu({
      id: edu.id,
      degree: edu.degree,
      field: edu.field,
      institution: edu.institution,
      location: edu.location,
      duration: edu.duration,
      grade: edu.grade,
      highlights: edu.highlights || [],
    });
    setHighlightsInput((edu.highlights || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu || !editingEdu.degree || !editingEdu.institution) {
      showToast('Degree and Institution are required', { type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const highlights = highlightsInput.split('\n').map((h) => h.trim()).filter(Boolean);

      const payload: Partial<EducationRow> = {
        ...editingEdu,
        highlights,
      };

      const existing = education.find((e) => e.id === editingEdu.id);
      if (existing) {
        await educationService.update(editingEdu.id!, payload);
      } else {
        await educationService.create(payload);
      }

      await refreshData();
      showToast('Education saved in Supabase!', { type: 'success' });
      setEditingEdu(null);
    } catch (err: any) {
      showToast('Failed to save education', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await educationService.delete(id);
      await refreshData();
      showToast('Education deleted', { type: 'info' });
    } catch (err: any) {
      showToast('Delete failed', { type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Formal Education</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Degrees, academic honors, universities, and specialized curriculum records.
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
          <span>Add Education</span>
        </button>
      </div>

      {editingEdu && (
        <form
          onSubmit={handleSave}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-4 ${
            isDark ? 'bg-[#0C0C10] border-[#D4AF37]/30' : 'bg-white border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-extrabold text-base">
              {education.some((e) => e.id === editingEdu.id) ? 'Edit Education' : 'Create Education'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingEdu(null)}
              className="p-1.5 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Degree</label>
              <input
                type="text"
                required
                value={editingEdu.degree || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                placeholder="Bachelor of Science"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Field of Study</label>
              <input
                type="text"
                required
                value={editingEdu.field || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, field: e.target.value })}
                placeholder="Computer Science & Engineering"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Institution</label>
              <input
                type="text"
                required
                value={editingEdu.institution || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                placeholder="University Name"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Location</label>
              <input
                type="text"
                value={editingEdu.location || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, location: e.target.value })}
                placeholder="Dhaka, Bangladesh"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Duration</label>
              <input
                type="text"
                value={editingEdu.duration || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, duration: e.target.value })}
                placeholder="2019 - 2023"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Academic Highlights (one per line)</label>
            <textarea
              rows={3}
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              placeholder="Dean's List Honoree&#10;Lead author on Distributed Systems Research paper"
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingEdu(null)}
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
              <span>{isSaving ? 'Saving...' : 'Save Education'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Education Cards */}
      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-start justify-between gap-4 ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 opacity-70" />
                <h3 className="font-bold text-base">{edu.degree} - {edu.field}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs opacity-70">
                <span className="font-semibold">{edu.institution}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {edu.location}
                </span>
                <span className="font-mono">{edu.duration}</span>
                {edu.grade && <span className="font-semibold text-[#00C8A8]">{edu.grade}</span>}
              </div>

              {(edu.highlights || []).length > 0 && (
                <ul className="list-disc list-inside text-xs opacity-80 space-y-1 pt-1">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStartEdit(edu)}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
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
