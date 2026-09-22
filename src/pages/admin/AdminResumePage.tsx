import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Save,
  RotateCcw,
} from 'lucide-react';

export const AdminResumePage: React.FC = () => {
  const { isDark } = useTheme();
  const { profile, updateProfile } = usePortfolioData();
  const { showToast } = useToast();

  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFileName, setResumeFileName] = useState('Moshiur_Rahman_Resume.pdf');
  const [downloadEnabled, setDownloadEnabled] = useState(true);
  const [badgeText, setBadgeText] = useState('ATS-Optimized Executive Edition');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setResumeUrl(profile.resume_url || '');
      setResumeFileName(profile.resume_file_name || 'Moshiur_Rahman_Resume.pdf');
      setDownloadEnabled(profile.resume_download_enabled !== false);
      setBadgeText(profile.resume_badge_text || 'ATS-Optimized Executive Edition');
    }
  }, [profile]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please upload a valid PDF document', { type: 'error' });
      return;
    }

    setIsUploading(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.DOCUMENTS, file);
      if (error || !url) throw error || new Error('Upload failed');

      setResumeUrl(url);
      setResumeFileName(file.name);
      
      // Persist immediately to profile
      await updateProfile({
        resume_url: url,
        resume_file_name: file.name,
      });

      showToast('Resume PDF uploaded and updated successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Resume upload failed', { type: 'error', message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!window.confirm('Are you sure you want to remove the current resume?')) return;

    try {
      await updateProfile({
        resume_url: '',
      });
      setResumeUrl('');
      showToast('Resume removed successfully', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to remove resume', { type: 'error', message: err.message });
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        resume_url: resumeUrl,
        resume_file_name: resumeFileName,
        resume_download_enabled: downloadEnabled,
        resume_badge_text: badgeText,
      });
      showToast('Resume settings saved successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save resume settings', { type: 'error', message: err.message });
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
                Document Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Resume & CV Manager</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Upload, replace, and control your official resume PDF document and download permissions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: File Upload & Controls */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* Upload Box */}
            <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-5 ${
              isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
            }`}>
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
                <Upload className="w-4 h-4" /> Upload / Replace PDF Resume
              </h2>

              <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                isDark 
                  ? 'border-white/15 hover:border-[#00E5FF]/50 bg-black/30' 
                  : 'border-slate-300 hover:border-[#00E5FF]/60 bg-slate-50/50'
              }`}>
                <FileText className="w-12 h-12 mx-auto text-[#00E5FF] mb-3 opacity-80" />
                <h3 className="text-sm font-bold mb-1">
                  {resumeUrl ? 'Replace Current Resume PDF' : 'Upload New Resume PDF'}
                </h3>
                <p className="text-xs opacity-60 font-mono mb-4">
                  Accepts official PDF documents. Auto-converts to reliable offline data or cloud storage.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <label className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md ${
                    isDark
                      ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90'
                      : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black hover:opacity-90'
                  }`}>
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Processing File...' : 'Choose PDF File'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>

                  {resumeUrl && (
                    <button
                      type="button"
                      onClick={handleDeleteResume}
                      className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Resume</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Direct URL Input */}
              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                  Or Direct PDF URL / Cloud Link
                </label>
                <input
                  type="text"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://... or /resume.pdf"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
              </div>
            </div>

            {/* Download Button Control Panel */}
            <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-5 ${
              isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
            }`}>
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
                <Download className="w-4 h-4" /> Download Button Control
              </h2>

              {/* Toggle Download Button */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
                <div>
                  <h4 className="text-xs font-bold font-mono">Enable Public Download Button</h4>
                  <p className="text-[11px] opacity-60">
                    When enabled, visitors can download your resume from the Certificates & Resume page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDownloadEnabled(!downloadEnabled)}
                  className="text-2xl transition-transform active:scale-95"
                >
                  {downloadEnabled ? (
                    <ToggleRight className="w-9 h-9 text-[#00E5FF]" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 opacity-40" />
                  )}
                </button>
              </div>

              {/* Custom File Name */}
              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                  Downloaded File Name
                </label>
                <input
                  type="text"
                  value={resumeFileName}
                  onChange={(e) => setResumeFileName(e.target.value)}
                  placeholder="e.g. Moshiur_Rahman_Resume_2026.pdf"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
              </div>

              {/* Badge Text */}
              <div>
                <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. ATS-Optimized Executive Edition"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                    isDark
                      ? 'bg-white/10 border border-white/20 hover:border-[#00E5FF] text-white'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <Save className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Right Col: Live Status & Preview Card */}
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-4 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono opacity-80 flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#00E5FF]" /> Current Resume Status
            </h3>

            {resumeUrl ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold font-mono">Active Resume Loaded</h4>
                    <p className="text-[11px] opacity-80 mt-0.5 truncate max-w-[200px]">
                      {resumeFileName}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="opacity-60">Status:</span>
                    <span className="text-emerald-400 font-bold">Ready for Download</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="opacity-60">Button:</span>
                    <span className={downloadEnabled ? 'text-[#00E5FF]' : 'text-rose-400'}>
                      {downloadEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="opacity-60">Badge:</span>
                    <span className="text-zinc-300 truncate max-w-[140px]">{badgeText}</span>
                  </div>
                </div>

                <a
                  href={resumeUrl}
                  download={resumeFileName}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#8B5CF6]/20 border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/30'
                      : 'bg-cyan-50 border-cyan-300 text-cyan-800 hover:bg-cyan-100'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Test Download Resume</span>
                </a>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-300 text-center space-y-2">
                <AlertCircle className="w-6 h-6 mx-auto opacity-80" />
                <h4 className="text-xs font-bold font-mono">No Resume PDF Uploaded</h4>
                <p className="text-[11px] opacity-80">
                  Upload your CV using the file picker above to make it downloadable for recruiters.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
