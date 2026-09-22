import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Palette,
  Sun,
  Moon,
  Sparkles,
  Save,
  Layers,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

const PRESET_COLORS = [
  { label: 'Electric Cyan', hex: '#00E5FF' },
  { label: 'Emerald Mint', hex: '#10B981' },
  { label: 'Royal Violet', hex: '#8B5CF6' },
  { label: 'Luxury Gold', hex: '#D4AF37' },
  { label: 'Rose Crimson', hex: '#F43F5E' },
  { label: 'Deep Sky', hex: '#0284C7' },
];

export const AdminThemePage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { settings, updateSettings } = usePortfolioData();
  const { showToast } = useToast();

  const [primaryColor, setPrimaryColor] = useState('#00E5FF');
  const [secondaryColor, setSecondaryColor] = useState('#8B5CF6');
  const [accentColor, setAccentColor] = useState('#00E5FF');
  const [activeTheme, setActiveTheme] = useState('dual');
  const [glassBlur, setGlassBlur] = useState('balanced');
  const [glassOpacity, setGlassOpacity] = useState('medium');
  const [borderGlow, setBorderGlow] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setPrimaryColor(settings.primary_color || '#00E5FF');
      setSecondaryColor(settings.secondary_color || '#8B5CF6');
      setAccentColor(settings.accent_color || '#00E5FF');
      setActiveTheme(settings.active_theme || 'dual');
      setGlassBlur(settings.glass_blur || 'balanced');
      setGlassOpacity(settings.glass_opacity || 'medium');
      setBorderGlow(settings.border_glow !== false);
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings({
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor,
        active_theme: activeTheme,
        glass_blur: glassBlur,
        glass_opacity: glassOpacity,
        border_glow: borderGlow,
      });

      // Update root css variable
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--primary-accent', primaryColor);
      }

      showToast('Theme & Glassmorphism settings updated!', { type: 'success' });
    } catch (err: any) {
      showToast('Failed to save theme settings', { type: 'error', message: err.message });
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
                Visual Styling
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Theme & Glassmorphism</h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Customize your signature accent colors, dark/light mode preference, and glassmorphism blur and opacity.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Color Presets */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Palette className="w-4 h-4" /> Accent Colors
            </h2>

            {/* Primary Accent Color */}
            <div>
              <label className="block text-xs font-mono font-medium mb-2 opacity-80">
                Primary Brand Color ({primaryColor})
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_COLORS.map((c) => (
                  <button
                    type="button"
                    key={c.hex}
                    onClick={() => setPrimaryColor(c.hex)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                      primaryColor === c.hex
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#00E5FF"
                className={`w-full px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
              />
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-xs font-mono font-medium mb-2 opacity-80">
                Secondary Accent Color ({secondaryColor})
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_COLORS.map((c) => (
                  <button
                    type="button"
                    key={c.hex}
                    onClick={() => setSecondaryColor(c.hex)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                      secondaryColor === c.hex
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                placeholder="#8B5CF6"
                className={`w-full px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/10 text-white focus:border-[#00E5FF]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00E5FF]'
                }`}
              />
            </div>
          </div>

          {/* Glassmorphism & Mode Settings */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl space-y-6 ${
            isDark ? 'bg-[#0A0A0E]/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#00E5FF]">
              <Layers className="w-4 h-4" /> Glassmorphism & Modes
            </h2>

            {/* Default Theme Mode */}
            <div>
              <label className="block text-xs font-mono font-medium mb-2 opacity-80">
                Default Theme Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTheme('dark');
                    if (!isDark) toggleTheme();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono transition-all ${
                    isDark
                      ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF]'
                      : 'border-white/10 bg-white/5 opacity-60'
                  }`}
                >
                  <Moon className="w-4 h-4" /> Dark Mode
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTheme('light');
                    if (isDark) toggleTheme();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono transition-all ${
                    !isDark
                      ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-[#0097A7]'
                      : 'border-white/10 bg-white/5 opacity-60'
                  }`}
                >
                  <Sun className="w-4 h-4" /> Light Mode
                </button>
              </div>
            </div>

            {/* Glass Blur Intensity */}
            <div>
              <label className="block text-xs font-mono font-medium mb-2 opacity-80">
                Glass Blur Intensity
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {['subtle', 'balanced', 'deep'].map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setGlassBlur(lvl)}
                    className={`py-2 px-3 rounded-xl border capitalize transition-all ${
                      glassBlur === lvl
                        ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                        : 'border-white/10 hover:border-white/20 opacity-70'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Opacity */}
            <div>
              <label className="block text-xs font-mono font-medium mb-2 opacity-80">
                Glass Opacity
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {['low', 'medium', 'high'].map((op) => (
                  <button
                    type="button"
                    key={op}
                    onClick={() => setGlassOpacity(op)}
                    className={`py-2 px-3 rounded-xl border capitalize transition-all ${
                      glassOpacity === op
                        ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                        : 'border-white/10 hover:border-white/20 opacity-70'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Glass Preview Card */}
            <div>
              <label className="block text-xs font-mono font-medium mb-2 opacity-80">
                Live Glassmorphism Card Preview
              </label>
              <div
                className="p-5 rounded-2xl border transition-all relative overflow-hidden backdrop-blur-xl"
                style={{
                  borderColor: `${primaryColor}40`,
                  backgroundColor: isDark ? 'rgba(10,10,14,0.7)' : 'rgba(255,255,255,0.75)',
                  boxShadow: `0 8px 32px ${primaryColor}15`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <span className="text-xs font-bold font-mono" style={{ color: primaryColor }}>
                    Active Accent Token
                  </span>
                </div>
                <p className="text-xs opacity-70">
                  Dual-layer glassmorphism reflects ambient light with smooth refraction.
                </p>
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
            <span>{isSaving ? 'Saving...' : 'Save Theme Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
