import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { profileService } from '../../services/profileService';
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
} from 'lucide-react';

export const AdminProfilePage: React.FC = () => {
  const { isDark } = useTheme();
  const { profile, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Partial<ProfileRow>>({});
  const [titlesInput, setTitlesInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setTitlesInput((profile.titles || []).join(', '));
    }
  }, [profile]);

  const handleInputChange = (field: keyof ProfileRow, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'profile_image' | 'logo_light' | 'logo_dark') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const bucket = field === 'profile_image' ? STORAGE_BUCKETS.PROFILE_IMAGES : STORAGE_BUCKETS.LOGOS;
      const { url, error } = await uploadFileToStorage(bucket, file);

      if (error || !url) {
        throw error || new Error('Upload failed');
      }

      setFormData((prev) => ({ ...prev, [field]: url }));
      showToast('Image uploaded successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Upload error', { type: 'error', message: err.message });
    } finally {
      setUploadingImage(false);
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

      await refreshData();
      showToast('Profile updated in Supabase successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save profile', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Personal Profile & Branding</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Update your identity, hero titles, luxury biography, and contact credentials stored in Supabase.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
            isDark
              ? 'bg-[#D4AF37] text-black hover:bg-[#F5D06F]'
              : 'bg-[#00E5FF] text-slate-950 hover:bg-[#00C8A8]'
          } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photos & Logos Card */}
        <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Profile Imagery & Storage</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Avatar / Profile photo */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 text-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/20 relative group bg-black/40">
                {formData.profile_image ? (
                  <img
                    src={formData.profile_image}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs opacity-50">No Image</div>
                )}
              </div>
              <label className="cursor-pointer px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5 flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'profile_image')}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>

            {/* Light Logo */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 text-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/20 flex items-center justify-center bg-white p-2">
                {formData.logo_light ? (
                  <img src={formData.logo_light} alt="Light logo preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-black">Light Logo</span>
                )}
              </div>
              <label className="cursor-pointer px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5 flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Logo (Light)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo_light')}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>

            {/* Dark Logo */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 text-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/20 flex items-center justify-center bg-black p-2">
                {formData.logo_dark ? (
                  <img src={formData.logo_dark} alt="Dark logo preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-white">Dark Logo</span>
                )}
              </div>
              <label className="cursor-pointer px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold hover:bg-white/5 flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Logo (Dark)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo_dark')}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Basic Identification */}
        <div className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Core Identity</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Full Display Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">First Name</label>
              <input
                type="text"
                value={formData.first_name || ''}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Last Name</label>
              <input
                type="text"
                value={formData.last_name || ''}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Professional Titles (comma-separated)</label>
            <input
              type="text"
              value={titlesInput}
              onChange={(e) => setTitlesInput(e.target.value)}
              placeholder="Full Stack Developer, UI/UX Designer, System Architect"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
              }`}
            />
          </div>
        </div>

        {/* Biography */}
        <div className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Biography & Pitch</h3>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Short Tagline Bio (Hero)</label>
            <textarea
              rows={2}
              value={formData.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className={`w-full p-3 rounded-xl border text-xs outline-none transition-colors ${
                isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Extended Biography (About Section)</label>
            <textarea
              rows={4}
              value={formData.extended_bio || ''}
              onChange={(e) => handleInputChange('extended_bio', e.target.value)}
              className={`w-full p-3 rounded-xl border text-xs outline-none transition-colors ${
                isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
              }`}
            />
          </div>
        </div>

        {/* Contact & Availability */}
        <div className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Contact & Credentials</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Primary Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Phone Number</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsapp_number || ''}
                onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Telegram Username</label>
              <input
                type="text"
                value={formData.telegram_username || ''}
                onChange={(e) => handleInputChange('telegram_username', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Years of Experience</label>
              <input
                type="number"
                step="0.5"
                value={formData.years_of_experience || 5}
                onChange={(e) => handleInputChange('years_of_experience', parseFloat(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Availability Status</label>
            <input
              type="text"
              value={formData.availability_status || ''}
              onChange={(e) => handleInputChange('availability_status', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                isDark ? 'bg-black border-white/10 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-300 focus:border-[#00E5FF]'
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
              isDark
                ? 'bg-[#D4AF37] text-black hover:bg-[#F5D06F]'
                : 'bg-[#00E5FF] text-slate-950 hover:bg-[#00C8A8]'
            } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
