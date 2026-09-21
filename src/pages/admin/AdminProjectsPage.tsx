import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { projectService } from '../../services/projectService';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import { ProjectRow } from '../../types/database';
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Upload,
  Check,
  X,
  Star,
  Layers,
} from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { projects, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingProject, setEditingProject] = useState<Partial<ProjectRow> | null>(null);
  const [techStackInput, setTechStackInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleStartCreate = () => {
    const newId = `project-${Date.now()}`;
    setEditingProject({
      id: newId,
      title: '',
      category: 'Full Stack',
      tagline: '',
      description: '',
      image: '/projects/project-1.webp',
      tech_stack: [],
      features: [],
      architecture: [],
      featured: false,
    });
    setTechStackInput('');
    setFeaturesInput('');
  };

  const handleStartEdit = (p: any) => {
    setEditingProject({
      id: p.id,
      title: p.title,
      category: p.category,
      tagline: p.tagline,
      description: p.description,
      image: p.image,
      tech_stack: p.techStack || p.tech_stack || [],
      features: p.features || [],
      architecture: p.architecture || [],
      live_url: p.liveUrl || p.live_url || '',
      github_url: p.githubUrl || p.github_url || '',
      featured: p.featured,
    });
    setTechStackInput((p.techStack || p.tech_stack || []).join(', '));
    setFeaturesInput((p.features || []).join('\n'));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.PROJECT_IMAGES, file);
      if (error || !url) throw error || new Error('Upload failed');
      setEditingProject((prev) => prev ? { ...prev, image: url } : null);
      showToast('Project image uploaded to Supabase Storage!', { type: 'success' });
    } catch (err: any) {
      showToast('Image upload failed', { type: 'error', message: err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) {
      showToast('Project title is required', { type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const techStack = techStackInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const features = featuresInput
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload: Partial<ProjectRow> = {
        ...editingProject,
        tech_stack: techStack,
        features: features,
      };

      const existing = projects.find((p) => p.id === editingProject.id);
      if (existing) {
        await projectService.update(editingProject.id!, payload);
      } else {
        await projectService.create(payload);
      }

      await refreshData();
      showToast('Project saved successfully!', { type: 'success' });
      setEditingProject(null);
    } catch (err: any) {
      showToast('Error saving project', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.delete(id);
      await refreshData();
      showToast('Project removed', { type: 'info' });
    } catch (err: any) {
      showToast('Error deleting project', { type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Projects Management</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Showcase enterprise-grade full-stack apps, AI platforms, and luxury mobile/web creations.
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
          <span>Add New Project</span>
        </button>
      </div>

      {/* Edit / Create Modal or Drawer Form */}
      {editingProject && (
        <form
          onSubmit={handleSave}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
            isDark
              ? 'bg-[#0C0C10] border-[#D4AF37]/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
              : 'bg-white border-slate-300 shadow-xl'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="font-extrabold text-base">
              {projects.some((p) => p.id === editingProject.id) ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="p-1.5 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Project Title</label>
              <input
                type="text"
                required
                value={editingProject.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                placeholder="e.g. Apex AI Workspace"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Category</label>
              <select
                value={editingProject.category || 'Full Stack'}
                onChange={(e: any) => setEditingProject({ ...editingProject, category: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10 text-white' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="Full Stack">Full Stack</option>
                <option value="AI & SaaS">AI & SaaS</option>
                <option value="Mobile / Web">Mobile / Web</option>
                <option value="UI / UX">UI / UX</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Tagline (High-impact summary)</label>
            <input
              type="text"
              value={editingProject.tagline || ''}
              onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
              placeholder="e.g. Autonomous Multimodal LLM Workspace"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Full Description</label>
            <textarea
              rows={3}
              value={editingProject.description || ''}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          {/* Project Image & Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Image URL or Storage Path</label>
              <input
                type="text"
                value={editingProject.image || ''}
                onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
            <div className="pt-5">
              <label className="cursor-pointer px-4 py-2.5 rounded-xl border border-white/20 text-xs font-bold hover:bg-white/5 inline-flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload To Supabase Bucket'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Live Demo URL</label>
              <input
                type="url"
                value={editingProject.live_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                placeholder="https://example.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Key Features (one per line)</label>
            <textarea
              rows={3}
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="Real-time multi-agent execution&#10;Sub-50ms latency websockets&#10;Role-based access security"
              className={`w-full p-3 rounded-xl border text-xs outline-none ${
                isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={Boolean(editingProject.featured)}
              onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="featured-checkbox" className="text-xs font-semibold cursor-pointer">
              Mark as Featured Project (pinned on homepage)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md ${
                isDark
                  ? 'bg-[#D4AF37] text-black hover:bg-[#F5D06F]'
                  : 'bg-[#00E5FF] text-slate-950 hover:bg-[#00C8A8]'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="aspect-video w-full overflow-hidden bg-zinc-900 relative">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-40">No Image</div>
                )}
                {p.featured && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37] text-black flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/80 text-white backdrop-blur-md">
                  {p.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-sm">{p.title}</h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {p.tagline || p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(p.techStack || []).slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 opacity-80"
                    >
                      {tech}
                    </span>
                  ))}
                  {(p.techStack || []).length > 4 && (
                    <span className="text-[10px] opacity-50 self-center">
                      +{(p.techStack || []).length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-white/10 text-inherit hover:opacity-80"
                    title="View Live App"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(p)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  title="Delete Project"
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
