import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { projectService } from '../../services/projectService';
import { activityLogService } from '../../services/activityLogService';
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
  Eye,
  ArrowUp,
  ArrowDown,
  Github,
  Globe,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { isDark } = useTheme();
  const { projects, addProject, updateProject, deleteProject, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingProject, setEditingProject] = useState<Partial<ProjectRow> | null>(null);
  const [techStackInput, setTechStackInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [architectureInput, setArchitectureInput] = useState('');
  const [galleryImagesInput, setGalleryImagesInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleStartCreate = () => {
    const newId = `project-${Date.now()}`;
    setEditingProject({
      id: newId,
      title: '',
      category: 'Full Stack',
      tagline: '',
      description: '',
      image: '/projects/project-1.webp',
      logo: '',
      gallery_images: [],
      tech_stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      features: [],
      architecture: [],
      github_url: 'https://github.com/',
      live_url: 'https://',
      status: 'Live & Operational',
      featured: false,
      sort_order: projects.length + 1,
    });
    setTechStackInput('React, TypeScript, Node.js, PostgreSQL');
    setFeaturesInput('');
    setArchitectureInput('');
    setGalleryImagesInput('');
  };

  const handleStartEdit = (p: any) => {
    setEditingProject({
      id: p.id,
      title: p.title,
      category: p.category,
      tagline: p.tagline,
      description: p.description,
      image: p.image,
      logo: p.logo || '',
      gallery_images: p.galleryImages || p.gallery_images || [],
      tech_stack: p.techStack || p.tech_stack || [],
      features: p.features || [],
      architecture: p.architecture || [],
      live_url: p.liveUrl || p.live_url || '',
      github_url: p.githubUrl || p.github_url || '',
      status: p.status || 'Live & Operational',
      featured: p.featured || false,
      sort_order: p.sortOrder || p.sort_order || 0,
    });
    setTechStackInput((p.techStack || p.tech_stack || []).join(', '));
    setFeaturesInput((p.features || []).join('\n'));
    setArchitectureInput((p.architecture || []).join('\n'));
    setGalleryImagesInput((p.galleryImages || p.gallery_images || []).join('\n'));
  };

  const handleImageFile = async (file: File, field: 'image' | 'logo') => {
    if (field === 'image') setUploadingImage(true);
    else setUploadingLogo(true);

    try {
      const bucket = field === 'image' ? STORAGE_BUCKETS.PROJECT_IMAGES : STORAGE_BUCKETS.LOGOS;
      const { url, error } = await uploadFileToStorage(bucket, file);
      if (error || !url) throw error || new Error('Upload failed');

      setEditingProject((prev) => (prev ? { ...prev, [field]: url } : null));
      showToast(`${field === 'image' ? 'Project Thumbnail' : 'Project Logo'} uploaded!`, { type: 'success' });
    } catch (err: any) {
      showToast('Image upload failed', { type: 'error', message: err.message });
    } finally {
      if (field === 'image') setUploadingImage(false);
      else setUploadingLogo(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && editingProject) {
      await handleImageFile(file, 'image');
    }
  };

  const handleToggleFeatured = async (p: any, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updatedFeatured = !p.featured;
      await updateProject(p.id, { featured: updatedFeatured });
      await activityLogService.log('Project Updated', 'Projects', `Toggled featured ${updatedFeatured ? 'ON' : 'OFF'} for ${p.title}`);
      showToast(`Project marked as ${updatedFeatured ? 'Featured' : 'Standard'}`, { type: 'success' });
    } catch (err: any) {
      showToast('Error updating status', { type: 'error', message: err.message });
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const currentProject = projects[index];
    const targetProject = projects[targetIndex];

    try {
      await updateProject(currentProject.id, { sort_order: targetIndex + 1 });
      await updateProject(targetProject.id, { sort_order: index + 1 });
      showToast('Project order updated', { type: 'success' });
    } catch (err: any) {
      showToast('Error reordering', { type: 'error', message: err.message });
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
      const techStack = techStackInput.split(',').map((t) => t.trim()).filter(Boolean);
      const features = featuresInput.split('\n').map((f) => f.trim()).filter(Boolean);
      const architecture = architectureInput.split('\n').map((a) => a.trim()).filter(Boolean);
      const galleryImages = galleryImagesInput.split('\n').map((g) => g.trim()).filter(Boolean);

      const payload: Partial<ProjectRow> = {
        ...editingProject,
        tech_stack: techStack,
        features,
        architecture,
        gallery_images: galleryImages,
      };

      const existing = projects.find((p) => p.id === editingProject.id);
      if (existing) {
        await updateProject(editingProject.id!, payload);
        await activityLogService.log('Project Updated', 'Projects', `Updated details for ${payload.title}`);
      } else {
        await addProject(payload);
        await activityLogService.log('Project Added', 'Projects', `Created new showcase project: ${payload.title}`);
      }

      showToast('Project saved successfully!', { type: 'success' });
      setEditingProject(null);
    } catch (err: any) {
      showToast('Save failed', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title?: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title || id}"?`)) return;
    try {
      await deleteProject(id);
      await activityLogService.log('Project Deleted', 'Projects', `Removed project: ${title || id}`);
      showToast('Project deleted', { type: 'info' });
      if (editingProject?.id === id) setEditingProject(null);
    } catch (err: any) {
      showToast('Failed to delete project', { type: 'error', message: err.message });
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
              Engineering Showcase
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Projects Management</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Add, edit, reorder, and configure full tech stacks, screenshots, and live deployment links.
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
          <span>Add New Project</span>
        </button>
      </div>

      {/* Editing / Creating Modal or Form */}
      {editingProject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
            <div className={`p-6 rounded-3xl border space-y-5 ${
              isDark ? 'bg-[#0A0A0C] border-[#D4AF37]/30' : 'bg-white border-[#00C8A8]/30 shadow-md'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-bold text-sm tracking-wide">
                  {projects.some((p) => p.id === editingProject.id) ? 'Edit Project' : 'Create New Project'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="p-1 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g., Nexus AI Architecture"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="e.g., Full Stack, AI Platform, Cloud Infrastructure"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Tagline / Short Hook</label>
                <input
                  type="text"
                  value={editingProject.tagline || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  placeholder="e.g., Enterprise Distributed Neural Orchestration Platform"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="In-depth overview of the engineering challenges solved..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent resize-y ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Drag & Drop Main Thumbnail Image */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Project Thumbnail Image</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-4 rounded-2xl border-2 border-dashed text-center transition-all ${
                    isDragging
                      ? isDark ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#00C8A8] bg-emerald-50'
                      : isDark ? 'border-white/15 bg-black/30' : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Upload className="w-5 h-5 opacity-60" />
                    <span className="text-xs font-semibold">
                      Drag and drop thumbnail here, or paste URL
                    </span>
                    <label className={`mt-1 px-3 py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-colors ${
                      isDark ? 'border-white/20 hover:bg-white/10 text-white' : 'border-slate-300 hover:bg-slate-200 text-slate-800'
                    }`}>
                      <span>{uploadingImage ? 'Uploading...' : 'Browse Image File'}</span>
                      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0], 'image')} className="hidden" />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="https://... or /projects/project-1.webp"
                    className={`mt-3 w-full px-3 py-1.5 rounded-lg text-[11px] border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="React, TypeScript, Tailwind CSS, PostgreSQL, Supabase, Docker"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Features (one per line) */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">Key Features (one per line)</label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Real-time multi-tenant sync&#10;Sub-millisecond token streaming&#10;Cryptographic RBAC security"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent font-mono ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Architecture & Gallery Screenshots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Architecture Highlights (one per line)</label>
                  <textarea
                    rows={3}
                    value={architectureInput}
                    onChange={(e) => setArchitectureInput(e.target.value)}
                    placeholder="Microservices&#10;Edge Caching&#10;CQRS Event Bus"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent font-mono ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Multiple Gallery URLs (one per line)</label>
                  <textarea
                    rows={3}
                    value={galleryImagesInput}
                    onChange={(e) => setGalleryImagesInput(e.target.value)}
                    placeholder="https://.../screenshot1.jpg&#10;https://.../screenshot2.jpg"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent font-mono ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>
              </div>

              {/* URLs & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Live Production URL</label>
                  <input
                    type="text"
                    value={editingProject.live_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                    placeholder="https://..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>
              </div>

              {/* Featured & Sort Order */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-0"
                  />
                  <span className="text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Featured Project (Prominently Highlighted)</span>
                  </span>
                </label>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold">Sort Order:</span>
                  <input
                    type="number"
                    value={editingProject.sort_order || 0}
                    onChange={(e) => setEditingProject({ ...editingProject, sort_order: parseInt(e.target.value, 10) || 0 })}
                    className={`w-16 px-2 py-1 rounded-lg text-xs border bg-transparent ${
                      isDark ? 'border-white/10' : 'border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
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
                  {isSaving ? 'Saving Project...' : 'Save & Publish Project'}
                </button>
              </div>
            </div>
          </form>

          {/* Live Project Card Preview (Right / 5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-80">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Project Preview</span>
              </span>
              <span className="text-[10px] font-mono opacity-60">Interactive</span>
            </div>

            <div className={`rounded-3xl border overflow-hidden shadow-xl ${
              isDark ? 'bg-[#08080A] border-[rgba(212,175,55,0.25)] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="h-44 relative bg-black/40 overflow-hidden">
                <img
                  src={editingProject.image || '/projects/project-1.webp'}
                  alt={editingProject.title || 'Project'}
                  className="w-full h-full object-cover"
                />
                {editingProject.featured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D4AF37] text-black flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-black" />
                    <span>Featured</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md text-white border border-white/10">
                  {editingProject.category || 'Full Stack'}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h4 className="font-extrabold text-base">{editingProject.title || 'Project Title'}</h4>
                <p className="text-xs opacity-75 line-clamp-2">{editingProject.tagline || 'Project tagline overview...'}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {techStackInput.split(',').slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/10 bg-white/5">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold">{editingProject.status || 'Live'}</span>
                  <div className="flex items-center gap-2">
                    {editingProject.github_url && <Github className="w-4 h-4 opacity-70" />}
                    {editingProject.live_url && <ExternalLink className="w-4 h-4 opacity-70" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs opacity-70 font-semibold">
          <span>{projects.length} Total Projects Configured</span>
          <span>Order / Status Controls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                isDark
                  ? 'bg-[#0A0A0C] border-white/10 hover:border-white/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono opacity-60">{project.category}</span>
                        {project.featured && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-400 border border-amber-400/30">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveOrder(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded-lg border border-white/10 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(idx, 'down')}
                      disabled={idx === projects.length - 1}
                      className="p-1 rounded-lg border border-white/10 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className={`text-xs line-clamp-2 mb-3 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {project.tagline || project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {(project.techStack || project.tech_stack || []).slice(0, 4).map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/10 bg-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={(e) => handleToggleFeatured(project, e)}
                  className={`text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                    project.featured ? 'text-amber-400' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-amber-400' : ''}`} />
                  <span>{project.featured ? 'Featured' : 'Mark Featured'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(project)}
                    className="p-1.5 rounded-xl border border-white/10 hover:bg-white/10 text-inherit cursor-pointer"
                    title="Edit project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-1.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
