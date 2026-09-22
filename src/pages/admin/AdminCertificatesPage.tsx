import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { certificateService } from '../../services/certificateService';
import { activityLogService } from '../../services/activityLogService';
import { uploadFileToStorage, STORAGE_BUCKETS } from '../../lib/supabase';
import { CertificateRow } from '../../types/database';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Award,
  Upload,
  CheckCircle2,
  ExternalLink,
  Eye,
  ArrowUp,
  ArrowDown,
  Calendar,
} from 'lucide-react';

export const AdminCertificatesPage: React.FC = () => {
  const { isDark } = useTheme();
  const { certificates, addCertificate, updateCertificate, deleteCertificate, refreshData } = usePortfolioData();
  const { showToast } = useToast();

  const [editingCert, setEditingCert] = useState<Partial<CertificateRow> | null>(null);
  const [skillsInput, setSkillsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewingCert, setPreviewingCert] = useState<any | null>(null);

  const handleStartCreate = () => {
    const newId = `cert-${Date.now()}`;
    setEditingCert({
      id: newId,
      title: '',
      issuer: '',
      category: 'Cloud & Architecture',
      image: '/certificate/cer1.png',
      issue_date: '2024',
      credential_url: 'https://',
      description: '',
      verified: true,
      skills: [],
      sort_order: certificates.length + 1,
    });
    setSkillsInput('');
  };

  const handleStartEdit = (c: any) => {
    setEditingCert({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      issuer_logo: c.issuerLogo || c.issuer_logo || '',
      theme: c.theme || '',
      category: c.category || 'Cloud & Architecture',
      accent: c.accent || '#00E5FF',
      image: c.image || '',
      issue_date: c.issueDate || c.issue_date || '',
      expiry_date: c.expiryDate || c.expiry_date || '',
      credential_id: c.credentialId || c.credential_id || '',
      credential_url: c.credentialUrl || c.credential_url || '',
      description: c.description || '',
      verified: c.verified !== undefined ? c.verified : true,
      sort_order: c.sortOrder || c.sort_order || 0,
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

      setEditingCert((prev) => (prev ? { ...prev, image: url } : null));
      showToast('Certificate image uploaded!', { type: 'success' });
    } catch (err: any) {
      showToast('Image upload failed', { type: 'error', message: err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= certificates.length) return;

    const currentCert = certificates[index];
    const targetCert = certificates[targetIndex];

    try {
      await updateCertificate(currentCert.id, { sort_order: targetIndex + 1 });
      await updateCertificate(targetCert.id, { sort_order: index + 1 });
      showToast('Certificate order updated', { type: 'success' });
    } catch (err: any) {
      showToast('Error reordering', { type: 'error', message: err.message });
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
      const skillsArr = skillsInput.split(',').map((s) => s.trim()).filter(Boolean);

      const payload: Partial<CertificateRow> = {
        ...editingCert,
        skills: skillsArr,
      };

      const existing = certificates.find((c) => c.id === editingCert.id);
      if (existing) {
        await updateCertificate(editingCert.id!, payload);
        await activityLogService.log('Certificate Updated', 'Certificates', `Updated credential: ${payload.title}`);
      } else {
        await addCertificate(payload);
        await activityLogService.log('Certificate Uploaded', 'Certificates', `Uploaded new credential: ${payload.title} (${payload.issuer})`);
      }

      showToast('Certificate saved successfully!', { type: 'success' });
      setEditingCert(null);
    } catch (err: any) {
      showToast('Failed to save certificate', { type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title?: string) => {
    if (!confirm(`Are you sure you want to permanently delete certificate "${title || id}"?`)) return;
    try {
      await deleteCertificate(id);
      await activityLogService.log('Certificate Deleted', 'Certificates', `Removed credential: ${title || id}`);
      showToast('Certificate removed', { type: 'info' });
      if (editingCert?.id === id) setEditingCert(null);
    } catch (err: any) {
      showToast('Failed to delete certificate', { type: 'error', message: err.message });
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
              Verified Credentials
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Certificates Management</h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            Upload verified certificates, badge images, verification links, and reorder credentials showcase.
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
          <span>Upload Certificate</span>
        </button>
      </div>

      {/* Editor Modal / Panel */}
      {editingCert && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-5 ${
            isDark ? 'bg-[#0A0A0C] border-[#D4AF37]/30' : 'bg-white border-[#00C8A8]/30 shadow-md'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-sm tracking-wide">
                {certificates.some((c) => c.id === editingCert.id) ? 'Edit Certificate' : 'Upload New Certificate'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="p-1 rounded-lg border border-white/10 opacity-70 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Certificate Title</label>
                <input
                  type="text"
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Issuing Organization</label>
                <input
                  type="text"
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g., Amazon Web Services"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>
            </div>

            {/* Certificate Image Upload & URL */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">Certificate Image File</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={editingCert.image || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, image: e.target.value })}
                  placeholder="https://... or upload below"
                  className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
                <label className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isDark ? 'border-white/10 hover:border-white/30 text-zinc-300' : 'border-slate-300 hover:border-slate-500 text-slate-700'
                }`}>
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingImage ? '...' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Issue Date</label>
                <input
                  type="text"
                  value={editingCert.issue_date || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                  placeholder="e.g., 2024 or Nov 2023"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Verification URL</label>
                <input
                  type="text"
                  value={editingCert.credential_url || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                  placeholder="https://www.credly.com/badges/..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent ${
                    isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Description</label>
              <textarea
                rows={2}
                value={editingCert.description || ''}
                onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                placeholder="Validated mastery of cloud native architectures, high availability, and container orchestration."
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border bg-transparent resize-none ${
                  isDark ? 'border-white/10 focus:border-[#D4AF37]' : 'border-slate-300 focus:border-[#00C8A8]'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingCert(null)}
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
                {isSaving ? 'Saving...' : 'Save Certificate'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Preview Certificate Modal */}
      {previewingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`p-6 rounded-3xl border max-w-xl w-full shadow-2xl relative ${
            isDark ? 'bg-[#0A0A0C] border-[#D4AF37]/30 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <button
              onClick={() => setPreviewingCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl border border-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-extrabold text-base">{previewingCert.title}</h3>
                <span className="text-xs opacity-60 font-mono">{previewingCert.issuer}</span>
              </div>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-4 flex items-center justify-center">
              <img src={previewingCert.image} alt={previewingCert.title} className="max-h-full object-contain" />
            </div>

            <p className="text-xs opacity-80 leading-relaxed mb-4">{previewingCert.description}</p>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <span className="opacity-60">{previewingCert.issueDate || previewingCert.issue_date}</span>
              {previewingCert.credentialUrl || previewingCert.credential_url ? (
                <a
                  href={previewingCert.credentialUrl || previewingCert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify Credential</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Certificates List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert, idx) => (
          <div
            key={cert.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
              isDark ? 'bg-[#0A0A0C] border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40 p-1 flex items-center justify-center">
                    <img src={cert.image} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm line-clamp-1">{cert.title}</h3>
                    <span className="text-[10px] font-mono opacity-60 block">{cert.issuer}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded-md border border-white/10 disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleMoveOrder(idx, 'down')}
                    disabled={idx === certificates.length - 1}
                    className="p-1 rounded-md border border-white/10 disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <p className={`text-xs line-clamp-2 mb-3 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                {cert.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[11px] opacity-60 font-mono">{cert.issueDate || cert.issue_date}</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewingCert(cert)}
                  className="p-1.5 rounded-xl border border-white/10 hover:bg-white/10 text-inherit cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleStartEdit(cert)}
                  className="p-1.5 rounded-xl border border-white/10 hover:bg-white/10 text-inherit cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id, cert.title)}
                  className="p-1.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  title="Delete"
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
