import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import { 
  Save, 
  Upload, 
  Sparkles, 
  Globe, 
  Image as ImageIcon, 
  Eye, 
  CheckCircle2, 
  RotateCcw,
  Shield
} from 'lucide-react';

export const AdminBrandingPage: React.FC = () => {
  const { isDark } = useTheme();
  const { settings, footerSettings, updateSettings, updateFooterSettings } = usePortfolioData();
  const { showToast } = useToast();

  const [websiteName, setWebsiteName] = useState('MR Portfolio');
  const [darkLogo, setDarkLogo] = useState('');
  const [lightLogo, setLightLogo] = useState('');
  const [favicon, setFavicon] = useState('/favicon.ico');
  const [footerText, setFooterText] = useState('All Rights Reserved.');
  const [copyrightText, setCopyrightText] = useState('© 2026 MR Portfolio');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingDarkLogo, setUploadingDarkLogo] = useState(false);
  const [uploadingLightLogo, setUploadingLightLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  useEffect(() => {
    if (settings) {
      setWebsiteName(settings.website_name || 'MR Portfolio');
      setDarkLogo(settings.dark_logo || settings.website_logo || '');
      setLightLogo(settings.light_logo || '');
      setFavicon(settings.favicon || '/favicon.ico');
      setFooterText(settings.footer_text || footerSettings.banner_text || 'All Rights Reserved.');
      setCopyrightText(settings.copyright_text || footerSettings.copyright_text || '© 2026 MR Portfolio');
    }
  }, [settings, footerSettings]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'darkLogo' | 'lightLogo' | 'favicon'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'darkLogo') setUploadingDarkLogo(true);
    else if (type === 'lightLogo') setUploadingLightLogo(true);
    else setUploadingFavicon(true);

    try {
      const bucket = STORAGE_BUCKETS.LOGOS;
      const { url, error } = await uploadFileToStorage(bucket, file);
      if (error || !url) throw error || new Error('Upload failed');

      if (type === 'darkLogo') {
        setDarkLogo(url);
        showToast('Dark logo uploaded successfully!', { type: 'success' });
      } else if (type === 'lightLogo') {
        setLightLogo(url);
        showToast('Light logo uploaded successfully!', { type: 'success' });
      } else {
        setFavicon(url);
        showToast('Favicon uploaded successfully!', { type: 'success' });
      }
    } catch (err: any) {
      showToast('File upload failed', { type: 'error', message: err.message });
    } finally {
      if (type === 'darkLogo') setUploadingDarkLogo(false);
      else if (type === 'lightLogo') setUploadingLightLogo(false);
      else setUploadingFavicon(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings({
        website_name: websiteName,
        website_logo: darkLogo || lightLogo,
        dark_logo: darkLogo,
        light_logo: lightLogo,
        favicon,
        footer_text: footerText,
        copyright_text: copyrightText,
      });

      await updateFooterSettings({
        copyright_text: copyrightText,
        banner_text: footerText,
      });

      showToast('Branding updated! All changes reflected instantly.', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save branding', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setWebsiteName('MR Portfolio');
    setDarkLogo('');
    setLightLogo('');
    setFavicon('/favicon.ico');
    setFooterText('All Rights Reserved.');
    setCopyrightText('© 2026 MR Portfolio');
    showToast('Reset values to defaults. Click Save to persist.', { type: 'info' });
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
                Visual Identity
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Branding Manager</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Customize your logo, website name, favicon, copyright notice, and footer text. Changes appear instantly.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetDefaults}
            className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all ${
              isDark ? 'border-white/10 hover:border-white/30 text-zinc-400' : 'border-slate-200 hover:border-slate-300 text-slate-600'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Logo & Identity Panel */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Globe className="w-4 h-4" /> Logo & Identity
            </h2>

            {/* Website Name */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Website Name / Brand Title
              </label>
              <input
                type="text"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                placeholder="e.g. MR Portfolio"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            {/* Dark Mode Logo Upload */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Logo (Dark Mode)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={darkLogo}
                  onChange={(e) => setDarkLogo(e.target.value)}
                  placeholder="URL or upload image file below"
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
                <label className={`px-3.5 py-2.5 rounded-xl border cursor-pointer text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/15 hover:border-[#00E5FF]/50 text-slate-300'
                    : 'bg-slate-100 border-slate-200 hover:border-[#00E5FF]/60 text-slate-700'
                }`}>
                  <Upload className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{uploadingDarkLogo ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'darkLogo')}
                    className="hidden"
                    disabled={uploadingDarkLogo}
                  />
                </label>
              </div>
              {darkLogo && (
                <div className="mt-2 p-2 rounded-lg bg-black/60 border border-white/10 inline-flex items-center gap-2">
                  <img src={darkLogo} alt="Dark logo preview" className="h-6 w-auto max-w-[120px] object-contain" />
                  <span className="text-[10px] text-zinc-400 font-mono">Dark Logo Preview</span>
                </div>
              )}
            </div>

            {/* Light Mode Logo Upload */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Logo (Light Mode)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={lightLogo}
                  onChange={(e) => setLightLogo(e.target.value)}
                  placeholder="URL or upload image file below"
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
                <label className={`px-3.5 py-2.5 rounded-xl border cursor-pointer text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/15 hover:border-[#00E5FF]/50 text-slate-300'
                    : 'bg-slate-100 border-slate-200 hover:border-[#00E5FF]/60 text-slate-700'
                }`}>
                  <Upload className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{uploadingLightLogo ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'lightLogo')}
                    className="hidden"
                    disabled={uploadingLightLogo}
                  />
                </label>
              </div>
              {lightLogo && (
                <div className="mt-2 p-2 rounded-lg bg-white border border-slate-200 inline-flex items-center gap-2">
                  <img src={lightLogo} alt="Light logo preview" className="h-6 w-auto max-w-[120px] object-contain" />
                  <span className="text-[10px] text-slate-600 font-mono">Light Logo Preview</span>
                </div>
              )}
            </div>

            {/* Favicon Upload */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Website Favicon (.ico or .png)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={favicon}
                  onChange={(e) => setFavicon(e.target.value)}
                  placeholder="/favicon.ico"
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
                <label className={`px-3.5 py-2.5 rounded-xl border cursor-pointer text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/15 hover:border-[#00E5FF]/50 text-slate-300'
                    : 'bg-slate-100 border-slate-200 hover:border-[#00E5FF]/60 text-slate-700'
                }`}>
                  <Upload className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{uploadingFavicon ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/x-icon,image/png,image/svg+xml"
                    onChange={(e) => handleFileUpload(e, 'favicon')}
                    className="hidden"
                    disabled={uploadingFavicon}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Footer & Copyright Text Panel */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Eye className="w-4 h-4" /> Footer & Copyright Settings
            </h2>

            {/* Copyright Text */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Footer Copyright Text (Left Side)
              </label>
              <input
                type="text"
                value={copyrightText}
                onChange={(e) => setCopyrightText(e.target.value)}
                placeholder="e.g. © 2026 MR Portfolio"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
              <p className="text-[11px] opacity-60 font-mono mt-1">
                Appears on the left side of the minimal glassmorphism footer.
              </p>
            </div>

            {/* Center Footer Text */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Footer Center Text (Middle)
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="e.g. All Rights Reserved."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
              <p className="text-[11px] opacity-60 font-mono mt-1">
                Appears centered between soft divider lines.
              </p>
            </div>

            {/* Live Footer Preview */}
            <div>
              <label className="block text-xs font-mono font-medium mb-2 opacity-80">
                Live Footer Component Preview
              </label>
              <div className={`p-4 rounded-xl border backdrop-blur-xl ${
                isDark ? 'bg-[#08080C] border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                  <span className="font-medium text-white">{copyrightText || '© 2026 MR Portfolio'}</span>
                  <div className="flex items-center gap-3">
                    <span className="opacity-30">|</span>
                    <span className="opacity-80">{footerText || 'All Rights Reserved.'}</span>
                    <span className="opacity-30">|</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[11px] text-[#00E5FF]">
                    <Shield className="w-3 h-3" />
                    <span>Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
              isDark
                ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_0_25px_rgba(0,229,255,0.3)]'
                : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90 shadow-[0_4px_15px_rgba(0,229,255,0.25)]'
            } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Branding Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
