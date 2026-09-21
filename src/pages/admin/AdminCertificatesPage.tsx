import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { certificateService } from '../../services/certificateService';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import { CertificateRow } from '../../types/database';
import { Plus, Trash2, Edit2, Check, X, Award, Upload, CheckCircle2, ExternalLink } from 'lucide-react';

export const AdminCertificatesPage: React.FC = () => {
  const { isDark } = useTheme();
  const { certificates, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingCert, setEditingCert] = useState<Partial<CertificateRow> | null>(null);
  const [skillsInput, setSkillsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleStartCreate = () => {
    const newId = `cert-${Date.now()}`;
    setEditingCert({
      id: newId,
      title: '',
      issuer: '',
      category: 'Cloud & Architecture',
      image: '/certificate/cer1.png',
      issue_date: '2023',
      verified: true,
      skills: [],
    });
    setSkillsInput('');
  };

  const handleStartEdit = (c: any) => {
    setEditingCert({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      issuer_logo: c.issuerLogo || c.issuer_logo,
      theme: c.theme,
      category: c.category,
      accent: c.accent,
      image: c.image,
      issue_date: c.issueDate || c.issue_date,
      expiry_date: c.expiryDate || c.expiry_date,
      credential_id: c.credentialId || c.credential_id,
      credential_url: c.credentialUrl || c.credential_url,
      description: c.description,
      verified: c.verified !== undefined ? c.verified : true,
    });
    setSkillsInput((c.skills || []).join(', '));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const { url, error } = await uploadFileToStorage(STORAGE_BUCKETS.CERTIFICATE_IMAGES, file);
      if (error || !url) throw error || new Error('Upload failed');
      setEditingCert((prev) => prev ? { ...prev, image: url } : null);
      showToast('Certificate image uploaded to Supabase Storage!', { type: 'success' });
    } catch (err: any) {
      showToast('Image upload failed', { type: 'error', message: err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editingCert.title || !editingCert.issuer) {
      showToast('Title and Issuer are required', { type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const skills = skillsInput.split(',').map((s) => s.trim()).filter(Boolean);

      const payload: Partial<CertificateRow> = {
        ...editingCert,
        skills,
      };

      const existing = certificates.find((c) => c.id === editingCert.id);
      if (existing) {
        await certificateService.update(editingCert.id!, payload);
      } else {
        await certificateService.create(payload);
      }

      await refreshData();
      showToast('Certificate saved in Supabase!', { type: 'success' });
      setEditingCert(null);
    } catch (err: any) {
      showToast('Failed to save certificate', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await certificateService.delete(id);
      await refreshData();
      showToast('Certificate deleted', { type: 'info' });
    } catch (err: any) {
      showToast('Failed to delete certificate', { type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Verified Certifications</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Manage verified credentials, official issuing bodies, license numbers, and digital badges.
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
          <span>Add Certificate</span>
        </button>
      </div>

      {editingCert && (
        <form
          onSubmit={handleSave}
          className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-4 ${
            isDark ? 'bg-[#0C0C10] border-[#D4AF37]/30' : 'bg-white border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-extrabold text-base">
              {certificates.some((c) => c.id === editingCert.id) ? 'Edit Certificate' : 'Create Certificate'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingCert(null)}
              className="p-1.5 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Certification Title</label>
              <input
                type="text"
                required
                value={editingCert.title || ''}
                onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Issuer Body</label>
              <input
                type="text"
                required
                value={editingCert.issuer || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                placeholder="Amazon Web Services / Google Cloud"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Category</label>
              <input
                type="text"
                value={editingCert.category || 'Cloud & Architecture'}
                onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Issue Date</label>
              <input
                type="text"
                value={editingCert.issue_date || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                placeholder="November 2023"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Credential ID</label>
              <input
                type="text"
                value={editingCert.credential_id || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credential_id: e.target.value })}
                placeholder="AWS-PSA-908123"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Certificate Image & Storage Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Certificate Image URL</label>
              <input
                type="text"
                value={editingCert.image || ''}
                onChange={(e) => setEditingCert({ ...editingCert, image: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div className="pt-5">
              <label className="cursor-pointer px-4 py-2.5 rounded-xl border border-white/20 text-xs font-bold hover:bg-white/5 inline-flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? 'Uploading...' : 'Upload Certificate to Supabase'}</span>
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
              <label className="block text-xs font-semibold mb-1 opacity-80">Credential URL</label>
              <input
                type="url"
                value={editingCert.credential_url || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                placeholder="https://credly.com/badges/..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Associated Skills (comma-separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Cloud Architecture, Security, Serverless"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${
                  isDark ? 'bg-black border-white/10' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="verified-checkbox"
              checked={Boolean(editingCert.verified)}
              onChange={(e) => setEditingCert({ ...editingCert, verified: e.target.checked })}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="verified-checkbox" className="text-xs font-semibold cursor-pointer">
              Verified Credential Badge
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setEditingCert(null)}
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
              <span>{isSaving ? 'Saving...' : 'Save Certificate'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id || cert.title}
            className={`rounded-2xl border overflow-hidden flex flex-col justify-between ${
              isDark ? 'bg-[#0A0A0C] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-900 relative">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-40">No Image</div>
                )}
                {cert.verified && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-1.5">
                <h3 className="font-bold text-sm leading-snug">{cert.title}</h3>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>{cert.issuer}</span>
                  <span className="font-mono">{cert.issueDate}</span>
                </div>
                {cert.credentialId && (
                  <p className="font-mono text-[10px] opacity-60">ID: {cert.credentialId}</p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-white/10 text-inherit hover:opacity-80 inline-block"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(cert)}
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => cert.id && handleDelete(cert.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
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
