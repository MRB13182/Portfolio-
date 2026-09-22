import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { TestimonialRow } from '../../types/database';
import {
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Star,
  CheckCircle2,
  X,
  Save,
  User,
  Building,
  Quote,
} from 'lucide-react';

export const AdminTestimonialsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolioData();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TestimonialRow>>({
    name: '',
    role: '',
    company: '',
    avatar: '',
    content: '',
    rating: 5,
    featured: true,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      company: '',
      avatar: '',
      content: '',
      rating: 5,
      featured: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (test: TestimonialRow) => {
    setEditingId(test.id);
    setFormData({ ...test });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete testimonial from "${name}"?`)) return;
    try {
      await deleteTestimonial(id);
      showToast(`Testimonial from ${name} deleted`, { type: 'info' });
    } catch (err: any) {
      showToast('Failed to delete testimonial', { type: 'error', message: err.message });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTestimonial(editingId, formData);
        showToast('Testimonial updated successfully!', { type: 'success' });
      } else {
        await addTestimonial(formData);
        showToast('New testimonial created successfully!', { type: 'success' });
      }
      setModalOpen(false);
    } catch (err: any) {
      showToast('Failed to save testimonial', { type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
        isDark
          ? 'bg-gradient-to-br from-[#0B0B0F] via-[#050505] to-[#121008] border-[rgba(212,175,55,0.25)]'
          : 'bg-gradient-to-br from-white via-slate-50 to-cyan-50/40 border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                isDark ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30' : 'bg-cyan-50 text-[#0097A7] border-[#00E5FF]/30'
              }`}>
                Social Proof
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Testimonials & Reviews</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Manage client recommendations, executive endorsements, and engineering peer reviews.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
              isDark
                ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.2)]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className={`p-6 rounded-2xl border backdrop-blur-xl flex flex-col justify-between transition-all ${
              isDark ? 'bg-[#0A0A0E]/80 border-white/10 hover:border-[#00E5FF]/40' : 'bg-white/90 border-slate-200 hover:border-[#00E5FF]/50'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {test.avatar ? (
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-11 h-11 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center font-bold text-xs">
                      {test.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">{test.name}</h3>
                    <p className="text-xs opacity-70 font-mono">
                      {test.role} {test.company ? `• ${test.company}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs opacity-80 leading-relaxed italic line-clamp-4">
                "{test.content}"
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-white/10">
              <button
                onClick={() => handleOpenEdit(test)}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#00E5FF]/50 text-xs font-mono flex items-center gap-1 transition-all"
              >
                <Edit className="w-3 h-3 text-[#00E5FF]" /> Edit
              </button>
              <button
                onClick={() => handleDelete(test.id, test.name)}
                className="px-3 py-1.5 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 text-xs font-mono flex items-center gap-1 transition-all"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-dashed border-white/20">
          <Quote className="w-12 h-12 mx-auto text-[#00E5FF] opacity-40 mb-3" />
          <h3 className="text-sm font-bold font-mono">No Testimonials Added Yet</h3>
          <p className="text-xs opacity-60 mt-1">Click "Add Testimonial" above to feature client endorsements.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl border p-6 space-y-5 ${
            isDark ? 'bg-[#0B0B0F] border-white/20 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-mono">
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 opacity-60 hover:opacity-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium mb-1 opacity-80">Full Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent border-white/20 focus:border-[#00E5FF]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium mb-1 opacity-80">Role / Title</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. VP of Engineering"
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent border-white/20 focus:border-[#00E5FF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium mb-1 opacity-80">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. FinTech Global"
                    className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent border-white/20 focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1 opacity-80">Avatar Image URL</label>
                <input
                  type="text"
                  value={formData.avatar || ''}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border text-xs font-mono bg-transparent border-white/20 focus:border-[#00E5FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1 opacity-80">Rating (1 to 5 Stars)</label>
                <select
                  value={formData.rating || 5}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono ${
                    isDark ? 'bg-[#111116] border-white/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value={5} className={isDark ? 'bg-[#111116] text-white' : 'bg-white text-slate-900'}>5 Stars - Outstanding</option>
                  <option value={4} className={isDark ? 'bg-[#111116] text-white' : 'bg-white text-slate-900'}>4 Stars - Very Good</option>
                  <option value={3} className={isDark ? 'bg-[#111116] text-white' : 'bg-white text-slate-900'}>3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium mb-1 opacity-80">Testimonial Quote</label>
                <textarea
                  rows={4}
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed endorsement about architectural work, delivery speed, and technical mastery..."
                  className="w-full px-3 py-2 rounded-xl border text-xs font-medium bg-transparent border-white/20 focus:border-[#00E5FF]"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-lg"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
