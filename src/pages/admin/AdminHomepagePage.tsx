import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Sparkles,
  Save,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Compass,
  ArrowRight,
  Layers,
} from 'lucide-react';

export const AdminHomepagePage: React.FC = () => {
  const { isDark } = useTheme();
  const { profile, settings, skills, updateProfile, updateSettings } = usePortfolioData();
  const { showToast } = useToast();

  const [greeting, setGreeting] = useState('Hello, I am');
  const [name, setName] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [bio, setBio] = useState('');
  const [ctaText, setCtaText] = useState('Get In Touch');
  const [ctaLink, setCtaLink] = useState('/contact');
  const [featuredSkillIds, setFeaturedSkillIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setTitles(profile.titles || ['Senior Full-Stack Architect', 'AI Systems Engineer']);
      setBio(profile.bio || '');
      setFeaturedSkillIds(profile.featured_skill_ids || skills.slice(0, 4).map(s => s.id));
    }
    if (settings) {
      setGreeting(settings.hero_greeting || 'Hello, I am');
      setCtaText(settings.hero_cta_text || 'Get In Touch');
      setCtaLink(settings.hero_cta_link || '/contact');
    }
  }, [profile, settings, skills]);

  const handleAddTitle = () => {
    if (!newTitle.trim()) return;
    setTitles([...titles, newTitle.trim()]);
    setNewTitle('');
  };

  const handleRemoveTitle = (index: number) => {
    setTitles(titles.filter((_, idx) => idx !== index));
  };

  const toggleFeaturedSkill = (skillId: string) => {
    if (featuredSkillIds.includes(skillId)) {
      setFeaturedSkillIds(featuredSkillIds.filter(id => id !== skillId));
    } else {
      if (featuredSkillIds.length >= 6) {
        showToast('Maximum 6 featured skills on Hero', { type: 'info' });
        return;
      }
      setFeaturedSkillIds([...featuredSkillIds, skillId]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name,
        titles,
        bio,
        featured_skill_ids: featuredSkillIds,
      });

      await updateSettings({
        hero_greeting: greeting,
        hero_cta_text: ctaText,
        hero_cta_link: ctaLink,
      });

      showToast('Homepage hero content updated successfully!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save homepage settings', { type: 'error', message: err.message });
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
                Homepage CMS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Homepage Hero Manager</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Configure the hero greeting, rotating professional roles, call-to-action buttons, and featured skills.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Hero Greetings & Titles */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-5 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Sparkles className="w-4 h-4" /> Hero Headings & Roles
            </h2>

            {/* Greeting */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Hero Eyebrow / Greeting
              </label>
              <input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="e.g. Hello, I am"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Hero Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. MD. Moshiur Rahman"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
                required
              />
            </div>

            {/* Dynamic Rotating Roles */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Rotating Roles (Carousel Text)
              </label>
              <div className="space-y-2 mb-3">
                {titles.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-mono"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTitle(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Add another role (e.g. Generative AI Specialist)"
                  className={`flex-1 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                    isDark
                      ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTitle();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTitle}
                  className="px-3 py-2 rounded-xl border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/10 text-xs font-mono flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>

            {/* Hero Bio */}
            <div>
              <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                Short Hero Bio / Tagline
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Architecting high-performance web systems..."
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
              />
            </div>
          </div>

          {/* CTA Buttons & Featured Skills */}
          <div className="space-y-6">
            
            {/* CTA Buttons */}
            <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-5 ${
              isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
            }`}>
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
                <Compass className="w-4 h-4" /> Call-To-Action Buttons
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g. Get In Touch"
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      isDark
                        ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                    Target Route / Link
                  </label>
                  <input
                    type="text"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    placeholder="/contact"
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                      isDark
                        ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Featured Skills Selector */}
            <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-4 ${
              isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
                  <Layers className="w-4 h-4" /> Featured Skills on Hero
                </h2>
                <span className="text-[11px] font-mono text-zinc-400">
                  {featuredSkillIds.length} Selected (Max 6)
                </span>
              </div>
              <p className="text-[11px] opacity-60 font-mono">
                Click to toggle which key skills are spotlighted in the Hero section cards.
              </p>

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                {skills.map((skill) => {
                  const isSelected = featuredSkillIds.includes(skill.id);
                  return (
                    <button
                      type="button"
                      key={skill.id}
                      onClick={() => toggleFeaturedSkill(skill.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                        isSelected
                          ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Submit */}
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
            <span>{isSaving ? 'Saving Changes...' : 'Save Homepage Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
