import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import {
  Search,
  Globe,
  Upload,
  Save,
  Share2,
  CheckCircle2,
  ExternalLink,
  Eye,
} from 'lucide-react';

export const AdminSeoPage: React.FC = () => {
  const { isDark } = useTheme();
  const { settings, updateSettings } = usePortfolioData();
  const { showToast } = useToast();

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ogImage, setOgImage] = useState('/og-image.png');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setMetaTitle(settings.meta_title || settings.site_title || 'MR Portfolio | Senior Full-Stack & AI Systems Architect');
      setMetaDescription(settings.meta_description || 'Dual-theme high performance developer portfolio featuring modern React, TypeScript, and AI architecture.');
      setKeywords(settings.seo_keywords || 'Full Stack Engineer, React, TypeScript, Cloud Architecture, Portfolio');
      setOgImage(settings.og_image || '/og-image.png');
    }
  }, [settings]);

  const handleOgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.PROJECT_IMAGES, file);
      if (error || !url) throw error || new Error('Upload failed');
      setOgImage(url);
      showToast('OG Image uploaded successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('OG Image upload failed', { type: 'error', message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings({
        meta_title: metaTitle,
        site_title: metaTitle,
        meta_description: metaDescription,
        seo_keywords: keywords,
        og_image: ogImage,
      });

      // Directly sync document tags
      if (typeof document !== 'undefined') {
        document.title = metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', metaDescription);
      }

      showToast('SEO & Metadata updated successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save SEO settings', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
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
                Search Engine Optimization
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">SEO & Social Meta Manager</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Optimize your portfolio search rank, Google SERP previews, and Open Graph social sharing cards.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SEO Input Fields */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Search className="w-4 h-4" /> Meta Tags
            </h2>

            {/* Meta Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono font-medium opacity-80">
                  Meta Title (<title>)
                </label>
                <span className={`text-[10px] font-mono ${metaTitle.length > 60 ? 'text-amber-400' : 'opacity-60'}`}>
                  {metaTitle.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="e.g. Moshiur Rahman | Senior Full-Stack & AI Systems Architect"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono font-medium opacity-80">
                  Meta Description
                </label>
                <span className={`text-[10px] font-mono ${metaDescription.length > 160 ? 'text-amber-400' : 'opacity-60'}`}>
                  {metaDescription.length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief summary of skills, experience, and accomplishments for search engines..."
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                SEO Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="React, TypeScript, Cloud Engineering, Node.js, Moshiur Rahman"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
              />
            </div>

            {/* Open Graph Image */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Open Graph Social Share Image URL
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="/og-image.png"
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
                  <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOgUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Real-time SERP & Social Preview */}
          <div className="space-y-6">
            
            {/* Google Search Result Preview */}
            <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-3 ${
              isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono opacity-80 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#00E5FF]" /> Google Search Result Preview
              </h3>
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-1 font-sans">
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
                  <span>https://moshiur-rahman.portfolio</span>
                </div>
                <h4 className="text-base text-[#8AB4F8] hover:underline cursor-pointer font-medium line-clamp-1">
                  {metaTitle || 'Portfolio Title'}
                </h4>
                <p className="text-xs text-[#BDC1C6] line-clamp-2 leading-relaxed">
                  {metaDescription || 'Add your meta description to see how this page displays in Google search results.'}
                </p>
              </div>
            </div>

            {/* Social Share Card Preview */}
            <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-3 ${
              isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono opacity-80 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-[#00E5FF]" /> Social Card Preview (LinkedIn / X)
              </h3>
              <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40">
                {ogImage ? (
                  <img
                    src={ogImage}
                    alt="Social Card preview"
                    className="w-full h-36 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-r from-[#00E5FF]/20 to-[#8B5CF6]/20 flex items-center justify-center text-xs font-mono text-zinc-400">
                    No OG Image set
                  </div>
                )}
                <div className="p-3.5 space-y-1">
                  <div className="text-[10px] text-zinc-500 font-mono uppercase">moshiur-rahman.portfolio</div>
                  <div className="text-xs font-bold text-white truncate">{metaTitle}</div>
                  <div className="text-[11px] text-zinc-400 line-clamp-1">{metaDescription}</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Action Button */}
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
            <span>{isSaving ? 'Saving...' : 'Save SEO & Metadata'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
