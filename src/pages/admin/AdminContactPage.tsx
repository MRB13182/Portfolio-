import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Mail,
  Phone,
  MapPin,
  Save,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  Sparkles,
} from 'lucide-react';

export const AdminContactPage: React.FC = () => {
  const { isDark } = useTheme();
  const { profile, footerSettings, updateProfile, updateFooterSettings } = usePortfolioData();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');
  const [availability, setAvailability] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setLocation(profile.location || '');
      setWhatsapp(profile.whatsapp_number || '');
      setTelegram(profile.telegram_username || '');
      setAvailability(profile.availability_status || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        email,
        phone,
        location,
        whatsapp_number: whatsapp,
        telegram_username: telegram,
        availability_status: availability,
      });

      await updateFooterSettings({
        email,
        phone,
        address: location,
      });

      showToast('Contact information saved successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save contact info', { type: 'error', message: err.message });
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
                Inquiries & Reach
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Contact Manager</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Manage direct contact channels, email address, phone, physical location, and availability notices.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Primary Channels */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Mail className="w-4 h-4" /> Primary Contact Info
            </h2>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Official Contact Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="borshonsweb@gmail.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                  required
                />
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1711-000000"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
                <Phone className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Location / Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Dhaka, Bangladesh (Open to Remote Worldwide)"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                />
                <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Instant Messengers & Availability */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <MessageSquare className="w-4 h-4" /> Direct Messaging & Availability
            </h2>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+8801700000000"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Telegram Username
              </label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
              />
            </div>

            {/* Availability Status */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Availability Status Banner
              </label>
              <textarea
                rows={2}
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="Available for high-impact technical contracts and fractional CTO advisory."
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
              />
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
            <span>{isSaving ? 'Saving...' : 'Save Contact Info'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
