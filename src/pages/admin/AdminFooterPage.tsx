import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { footerService } from '../../services/footerService';
import { activityLogService } from '../../services/activityLogService';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import { FooterSettingsRow } from '../../types/database';
import {
  Save,
  Upload,
  Layers,
  Sparkles,
  Link as LinkIcon,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  RefreshCw,
  Palette,
  Compass,
} from 'lucide-react';

export const AdminFooterPage: React.FC = () => {
  const { isDark } = useTheme();
  const { footerSettings, profile, socials, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FooterSettingsRow>(footerSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'links' | 'appearance'>('content');

  // New Navigation Link local state
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkPath, setNewLinkPath] = useState('');

  useEffect(() => {
    if (footerSettings) {
      setFormData(footerSettings);
    }
  }, [footerSettings]);

  const handleInputChange = (field: keyof FooterSettingsRow, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.LOGOS, file);
      if (error || !url) throw error || new Error('Upload failed');
      setFormData((prev) => ({ ...prev, footer_logo: url }));
      showToast('Footer logo uploaded!', { type: 'success' });
    } catch (err: any) {
      showToast('Logo upload error', { type: 'error', message: err.message });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBg(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.PROJECT_IMAGES, file);
      if (error || !url) throw error || new Error('Upload failed');
      setFormData((prev) => ({ ...prev, background_image: url }));
      showToast('Footer background image uploaded!', { type: 'success' });
    } catch (err: any) {
      showToast('Background upload error', { type: 'error', message: err.message });
    } finally {
      setIsUploadingBg(false);
    }
  };

  const handleAddNavLink = () => {
    if (!newLinkLabel.trim() || !newLinkPath.trim()) {
      showToast('Label and path are required', { type: 'info' });
      return;
    }
    const current = formData.navigation_links || [];
    setFormData((prev) => ({
      ...prev,
      navigation_links: [...current, { label: newLinkLabel.trim(), path: newLinkPath.trim() }],
    }));
    setNewLinkLabel('');
    setNewLinkPath('');
    showToast('Navigation link added', { type: 'success' });
  };

  const handleRemoveNavLink = (index: number) => {
    const current = [...(formData.navigation_links || [])];
    current.splice(index, 1);
    setFormData((prev) => ({ ...prev, navigation_links: current }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await footerService.update(formData);
      await activityLogService.log('Footer Modified', 'Footer CMS', 'Updated footer content and navigation architecture');
      await refreshData();
      showToast('Footer CMS settings saved successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save footer settings', { type: 'error', message: err.message });
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
              Dedicated CMS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Footer Management CMS</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Full control over your portfolio footer — logos, descriptions, copyright, custom navigation links, and theme aesthetics.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg self-start sm:self-auto ${
            isDark
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
              : 'bg-gradient-to-r from-[#00E5FF] to-[#00C8A8] text-slate-950 hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.3)]'
          } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Publishing Changes...' : 'Save Footer Changes'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-bold">
        {[
          { id: 'content', label: 'Core Content & Contact', icon: Layers },
          { id: 'links', label: 'Navigation & Links', icon: LinkIcon },
          { id: 'appearance', label: 'Appearance & Themes', icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? isDark
                    ? 'bg-[#D4AF37]/20 text-[#F5D76E] border border-[#D4AF37]/40'
                    : 'bg-[#00E5FF]/20 text-[#00A896] border border-[#00E5FF]/40'
                  : isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls (Left / 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeTab === 'content' && (
            <div className={`p-6 rounded-3xl border space-y-5 ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <h3 className="font-bold text-sm tracking-wide">Brand &amp; Bio Information</h3>

              {/* Footer Logo */}
              <div>
                <label className="block text-xs font-semibold mb-2">Footer Custom Logo</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.footer_logo || ''}
                    onChange={(e) => handleInputChange('footer_logo', e.target.value)}
                    placeholder="URL or upload an image below"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                  <label className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
                  }`}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingLogo ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Footer Description */}
              <div>
                <label className="block text-xs font-semibold mb-2">Footer Tagline / Description</label>
                <textarea
                  rows={3}
                  value={formData.footer_description || ''}
                  onChange={(e) => handleInputChange('footer_description', e.target.value)}
                  placeholder="Architecting high-performance web systems..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent resize-none ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Banner Text */}
              <div>
                <label className="block text-xs font-semibold mb-2">Notice Banner (Optional)</label>
                <input
                  type="text"
                  value={formData.banner_text || ''}
                  onChange={(e) => handleInputChange('banner_text', e.target.value)}
                  placeholder="e.g., Open for technical advisory and contracts"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Copyright Text */}
              <div>
                <label className="block text-xs font-semibold mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={formData.copyright_text || ''}
                  onChange={(e) => handleInputChange('copyright_text', e.target.value)}
                  placeholder={`© ${new Date().getFullYear()} MD. Moshiur Rahman. All rights reserved.`}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              {/* Direct Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Direct Email</label>
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
                  <label className="block text-xs font-semibold mb-1.5">Direct Phone</label>
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

              <div>
                <label className="block text-xs font-semibold mb-1.5">Physical / Regional Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Dhaka, Bangladesh"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Footer Navigation Builder</h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Add, reorder, or customize menu links displayed in the footer.
                </p>
              </div>

              {/* Existing Navigation Links */}
              <div className="space-y-2">
                {(formData.navigation_links || []).map((link, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs ${
                      isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{link.label}</span>
                      <span className={`font-mono text-[11px] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                        {link.path}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveNavLink(idx)}
                      className="p-1 text-rose-400 hover:text-rose-500 transition-colors cursor-pointer"
                      aria-label="Remove link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Link Box */}
              <div className="p-4 rounded-2xl border border-dashed border-white/20 space-y-3">
                <span className="text-xs font-bold block">Add Navigation Link</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newLinkLabel}
                    onChange={(e) => setNewLinkLabel(e.target.value)}
                    placeholder="Link Label (e.g., Blog)"
                    className={`px-3 py-2 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                  <input
                    type="text"
                    value={newLinkPath}
                    onChange={(e) => setNewLinkPath(e.target.value)}
                    placeholder="Path (e.g., /blog or https://...)"
                    className={`px-3 py-2 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddNavLink}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Link to Footer</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <h3 className="font-bold text-sm tracking-wide">Aesthetic Theme &amp; Background</h3>

              {/* Theme Selector */}
              <div>
                <label className="block text-xs font-semibold mb-2">Footer Visual Theme Preset</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'luxury', label: 'Luxury Dark', badge: '#050505 / #D4AF37' },
                    { id: 'emerald', label: 'Titanium Emerald', badge: '#00E5FF / #00C8A8' },
                    { id: 'gold', label: 'Black Mamba Gold', badge: '#D4AF37' },
                    { id: 'minimal', label: 'Ultra Minimal', badge: 'Glassmorphism' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleInputChange('footer_theme', preset.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        (formData.footer_theme || 'luxury') === preset.id
                          ? isDark
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                            : 'bg-[#00E5FF]/20 border-[#00E5FF] text-slate-900 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                          : isDark
                          ? 'border-white/10 hover:border-white/20 text-zinc-400'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="font-bold text-xs">{preset.label}</div>
                      <div className="text-[10px] opacity-70 mt-0.5">{preset.badge}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Image */}
              <div>
                <label className="block text-xs font-semibold mb-2">Custom Footer Background Overlay (Optional)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.background_image || ''}
                    onChange={(e) => handleInputChange('background_image', e.target.value)}
                    placeholder="https://example.com/footer-bg.jpg"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                      isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                    }`}
                  />
                  <label className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
                  }`}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingBg ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Interactive Preview (Right / 5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-80">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Footer Preview</span>
            </span>
            <span className="text-[10px] font-mono opacity-60">Instant Sync</span>
          </div>

          <div
            style={formData.background_image ? { backgroundImage: `url(${formData.background_image})`, backgroundSize: 'cover' } : undefined}
            className={`p-6 rounded-3xl border shadow-xl transition-all ${
              isDark
                ? 'bg-[#08080A] border-[rgba(212,175,55,0.25)] text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {formData.banner_text && (
              <div className="mb-4 p-2.5 rounded-xl border text-center text-[11px] font-medium"
                style={{
                  borderColor: isDark ? 'rgba(212,175,55,0.3)' : 'rgba(18,214,160,0.3)',
                  backgroundColor: isDark ? 'rgba(212,175,55,0.08)' : 'rgba(18,214,160,0.08)',
                  color: isDark ? '#F5D06F' : '#0EB385',
                }}
              >
                {formData.banner_text}
              </div>
            )}

            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border p-1 ${
                isDark ? 'border-[#D4AF37]/30 bg-black text-[#D4AF37]' : 'border-[#00C8A8]/30 bg-white text-[#00C8A8]'
              }`}>
                {formData.footer_logo ? (
                  <img src={formData.footer_logo} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="font-extrabold text-xs">MR</span>
                )}
              </div>
              <div>
                <div className="font-black text-sm">{profile?.name || 'MD. Moshiur Rahman'}</div>
                <div className={`text-[10px] font-bold ${isDark ? 'text-[#D4AF37]' : 'text-[#00C8A8]'}`}>
                  {profile?.titles?.[0] || 'Senior Architect'}
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed opacity-70 mb-4 line-clamp-3">
              {formData.footer_description || profile?.bio || 'Architecting high-performance web systems and AI applications.'}
            </p>

            <div className="border-t border-white/10 pt-3 mb-3">
              <div className="text-[10px] uppercase font-bold tracking-wider mb-2 opacity-60">Navigation</div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {(formData.navigation_links || []).map((nav, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 font-medium">
                    {nav.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 text-[10px] opacity-60 flex items-center justify-between">
              <span>{formData.copyright_text || `© ${new Date().getFullYear()} All rights reserved.`}</span>
              <span className="font-mono">{formData.footer_theme || 'luxury'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
