import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { profileService } from '../../services/profileService';
import { activityLogService } from '../../services/activityLogService';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import { ProfileRow } from '../../types/database';
import {
  Save,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  Eye,
  MessageSquare,
  Send,
  ExternalLink,
  Download,
} from 'lucide-react';

export const AdminProfilePage: React.FC = () => {
  const { isDark } = useTheme();
  const { profile, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Partial<ProfileRow>>({});
  const [titlesInput, setTitlesInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [uploadingCoverImage, setUploadingCoverImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setTitlesInput((profile.titles || []).join(', '));
    }
  }, [profile]);

  const handleInputChange = (field: keyof ProfileRow, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'profile_image' | 'cover_image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === 'profile_image') setUploadingProfileImage(true);
    else setUploadingCoverImage(true);

    try {
      const bucket = STORAGE_BUCKETS.PROFILE_IMAGES;
      const { url, error } = await uploadFileToStorage(bucket, file);
      if (error || !url) throw error || new Error('Upload failed');

      setFormData((prev) => ({ ...prev, [field]: url }));
      showToast(`${field === 'profile_image' ? 'Profile' : 'Cover'} image uploaded!`, { type: 'success' });
    } catch (err: any) {
      showToast('Image upload failed', { type: 'error', message: err.message });
    } finally {
      if (field === 'profile_image') setUploadingProfileImage(false);
      else setUploadingCoverImage(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.DOCUMENTS, file);
      if (error || !url) throw error || new Error('Resume upload failed');

      setFormData((prev) => ({ ...prev, resume_url: url }));
      showToast('Resume PDF document uploaded successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Upload error', { type: 'error', message: err.message });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const titles = titlesInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: Partial<ProfileRow> = {
        ...formData,
        titles,
      };

      if (profile?.id && profile.id !== 'default') {
        await profileService.update(profile.id, payload);
      } else {
        await profileService.create(payload);
      }

      await activityLogService.log('Profile Updated', 'Profile Management', `Updated profile bio and executive details for ${formData.name || 'Admin'}`);
      await refreshData();
      showToast('Profile updated & synchronized live!', { type: 'success' });
    } catch (err: any) {
      showToast('Save failed', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
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
              Identity &amp; Bio
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Profile Management</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Edit all core identity details, rotating titles, biography copy, contact points, and resume download file.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg self-start sm:self-auto ${
            isDark
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
              : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.3)]'
          } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Publishing Updates...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Fields (Left / 7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Section: Names & Titles */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              <User className="w-4 h-4 opacity-70" />
              <span>Full Name &amp; Professional Titles</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Full Display Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="MD. Moshiur Rahman"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">First Name</label>
                <input
                  type="text"
                  value={formData.first_name || ''}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  placeholder="Moshiur"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={formData.last_name || ''}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  placeholder="Rahman"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">
                Rotating Titles (comma-separated)
              </label>
              <input
                type="text"
                value={titlesInput}
                onChange={(e) => setTitlesInput(e.target.value)}
                placeholder="Senior Full Stack Architect, Cloud Specialist, AI System Designer"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Availability Status</label>
              <select
                value={formData.availability_status || 'Available for technical projects'}
                onChange={(e) => handleInputChange('availability_status', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37] bg-[#0A0A0C]' : 'border-slate-300 focus:border-[#00C8A8] bg-white'
                }`}
              >
                <option value="Available for technical leadership & projects">Available for technical leadership &amp; projects</option>
                <option value="Open for Consulting & Advisory">Open for Consulting &amp; Advisory</option>
                <option value="Available for Full-time Roles">Available for Full-time Roles</option>
                <option value="Currently Booked (Limited Availability)">Currently Booked (Limited Availability)</option>
              </select>
            </div>
          </div>

          {/* Section: Biography */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4 opacity-70" />
              <span>Biographies &amp; Narrative</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Short Bio (Hero Intro)</label>
              <textarea
                rows={2}
                value={formData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Architecting high-performance web systems and AI applications with precision."
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent resize-none ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Extended Bio (About Section)</label>
              <textarea
                rows={4}
                value={formData.about || ''}
                onChange={(e) => handleInputChange('about', e.target.value)}
                placeholder="Comprehensive technical background, leadership philosophy, and engineering track record..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent resize-y ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>
          </div>

          {/* Section: Media & Visual Assets */}
          <div className={`p-6 rounded-3xl border space-y-5 ${
            isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 opacity-70" />
              <span>Profile &amp; Cover Images</span>
            </h3>

            {/* Profile Image */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">Profile Avatar Photo</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.profile_image || ''}
                  onChange={(e) => handleInputChange('profile_image', e.target.value)}
                  placeholder="/profile/moshiur.png or CDN URL"
                  className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
                <label className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
                }`}>
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingProfileImage ? '...' : 'Upload'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile_image')} className="hidden" />
                </label>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">Cover Image (Hero Backdrop)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.cover_image || ''}
                  onChange={(e) => handleInputChange('cover_image', e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
                <label className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
                }`}>
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingCoverImage ? '...' : 'Upload'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover_image')} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Section: Direct Contact & Social Handles */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              <Mail className="w-4 h-4 opacity-70" />
              <span>Contact Channels &amp; Messenger</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Official Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="borshonsweb@gmail.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Official Phone</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+880 1827..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">WhatsApp Number / Link</label>
                <input
                  type="text"
                  value={formData.whatsapp || ''}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="+8801827000000 or https://wa.me/..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Telegram Username / Link</label>
                <input
                  type="text"
                  value={formData.telegram || ''}
                  onChange={(e) => handleInputChange('telegram', e.target.value)}
                  placeholder="@username or https://t.me/..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Location / City &amp; Country</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Dhaka, Bangladesh"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>
          </div>

          {/* Section: Resume Management */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4 opacity-70" />
              <span>Resume Management</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Resume Download URL</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.resume_url || ''}
                  onChange={(e) => handleInputChange('resume_url', e.target.value)}
                  placeholder="https://example.com/resume.pdf"
                  className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
                <label className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
                }`}>
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingResume ? '...' : 'Upload PDF'}</span>
                  <input type="file" accept=".pdf,application/pdf" onChange={handleResumeUpload} className="hidden" />
                </label>
              </div>
            </div>

            {formData.resume_url && (
              <div className="flex items-center gap-3 pt-2 text-xs">
                <a
                  href={formData.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Current Resume</span>
                </a>
                <a
                  href={formData.resume_url}
                  download
                  className="opacity-70 hover:opacity-100 flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </a>
              </div>
            )}
          </div>
        </form>

        {/* Live Preview Panel (Right / 5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-80">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Identity Card Preview</span>
            </span>
            <span className="text-[10px] font-mono opacity-60">Real-time</span>
          </div>

          <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
            isDark
              ? 'bg-[#08080A] border-[rgba(212,175,55,0.25)] text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {formData.cover_image && (
              <div
                className="h-24 -mx-6 -mt-6 mb-4 bg-cover bg-center border-b border-white/10"
                style={{ backgroundImage: `url(${formData.cover_image})` }}
              />
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-md ${
                  isDark ? 'border-[#D4AF37]' : 'border-[#00C8A8]'
                }`}>
                  <img
                    src={formData.profile_image || '/profile/moshiur.png'}
                    alt={formData.name || 'Admin'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
              </div>

              <div>
                <h4 className="font-black text-base">{formData.name || 'MD. Moshiur Rahman'}</h4>
                <div className={`text-xs font-bold ${isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'}`}>
                  {titlesInput.split(',')[0] || 'Senior Architect'}
                </div>
                <div className="text-[11px] opacity-60 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{formData.location || 'Dhaka, Bangladesh'}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1.5 ${
                isDark ? 'bg-[#D4AF37]/10 text-[#F5D76E] border-[#D4AF37]/30' : 'bg-emerald-50 text-[#00A896] border-[#00E5FF]/30'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{formData.availability_status || 'Available for technical leadership'}</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed opacity-80 mb-4 line-clamp-3">
              {formData.bio || 'Architecting resilient software systems with clean precision.'}
            </p>

            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[11px]">
              {formData.email && (
                <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 font-mono">
                  {formData.email}
                </span>
              )}
              {formData.phone && (
                <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 font-mono">
                  {formData.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
