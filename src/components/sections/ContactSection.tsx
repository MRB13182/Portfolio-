import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { messageService } from '../../services/messageService';
import { ScrollReveal } from '../common/ScrollReveal';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  ExternalLink,
  MessageSquare,
  Clock,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { isDark } = useTheme();
  const { profile, socials } = usePortfolioData();
  const { showToast } = useToast();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = profile?.email || portfolioConfig.personal.email;
  const phone = profile?.phone || portfolioConfig.personal.phone;
  const location = profile?.location || portfolioConfig.personal.location;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    showToast('Email address copied to clipboard!', { type: 'success' });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', { type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      await messageService.create({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      });

      setSubmitted(true);
      showToast('Thank you! Your message has been sent successfully.', { type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      showToast('Message delivery failed. Please email directly.', { type: 'error', message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = (socials && socials.length > 0)
    ? socials.filter(s => s.is_active ?? true).map(s => ({ platform: s.platform, url: s.url }))
    : portfolioConfig.socials.map(s => ({ platform: s.name, url: s.url }));

  return (
    <section id="contact" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={18} duration={0.55}>
          <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono mb-3 border ${
              isDark
                ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
                : 'bg-slate-100 text-[#0891B2] border-slate-200'
            }`}>
              <Mail className="w-3.5 h-3.5" />
              <span>Connect &amp; Collaborate</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
              Get In{' '}
              <span className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-white via-[#22D3EE] to-[#8B5CF6]'
                  : 'bg-gradient-to-r from-slate-900 via-[#0891B2] to-[#7C3AED]'
              }`}>
                Touch With Me
              </span>
            </h2>
            
            <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
            }`}>
              Have an exciting product idea, full-stack architectural opportunity, or consulting inquiry? Let's connect.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
          
          {/* Left Column: Glass Contact Channels & Socials */}
          <ScrollReveal direction="right" distance={25} duration={0.6} className="lg:col-span-5 space-y-4">
            
            {/* 1. Email Card */}
            <div className={`p-5 sm:p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDark
                ? 'bg-[#111722]/80 border-white/10 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]'
                : 'bg-white/85 border-slate-200/90 text-slate-900 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)]'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-mono uppercase tracking-wider block ${
                      isDark ? 'text-[#A1AAB8]' : 'text-slate-500'
                    }`}>
                      Direct Email
                    </span>
                    <h4 className="text-sm font-bold truncate max-w-[200px] sm:max-w-xs">{email}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Copy email"
                    id="contact-copy-email-btn"
                    className={`p-2 rounded-xl border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                      isDark ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-[#22D3EE]/40' : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-[#0891B2]/40'
                    }`}
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#22D3EE]" />
                    )}
                  </button>
                  <a
                    href={`mailto:${email}`}
                    aria-label="Mailto link"
                    id="contact-mailto-btn"
                    className="p-2 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-bold cursor-pointer hover:opacity-95 shadow-xs focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Phone Card */}
            {phone && (
              <div className={`p-5 sm:p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                isDark
                  ? 'bg-[#111722]/80 border-white/10 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]'
                  : 'bg-white/85 border-slate-200/90 text-slate-900 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)]'
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/25">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-[11px] font-mono uppercase tracking-wider block ${
                        isDark ? 'text-[#A1AAB8]' : 'text-slate-500'
                      }`}>
                        Direct Phone / WhatsApp
                      </span>
                      <h4 className="text-sm font-bold font-mono">{phone}</h4>
                    </div>
                  </div>

                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                    id="contact-phone-call-btn"
                    aria-label="Call phone"
                    className={`p-2 rounded-xl border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                      isDark ? 'bg-white/[0.04] border-white/10 text-[#8B5CF6] hover:border-[#8B5CF6]/50' : 'bg-slate-100 border-slate-200 text-[#7C3AED]'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* 3. Location Card */}
            <div className={`p-5 sm:p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDark
                ? 'bg-[#111722]/80 border-white/10 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]'
                : 'bg-white/85 border-slate-200/90 text-slate-900 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)]'
            }`}>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-[11px] font-mono uppercase tracking-wider block ${
                    isDark ? 'text-[#A1AAB8]' : 'text-slate-500'
                  }`}>
                    Location &amp; Timezone
                  </span>
                  <h4 className="text-sm font-bold">{location}</h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}`}>
                    Available for Remote &amp; Global Engineering
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Social Media Channels Card */}
            <div className={`p-5 sm:p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
              isDark
                ? 'bg-[#111722]/80 border-white/10 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]'
                : 'bg-white/85 border-slate-200/90 text-slate-900 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)]'
            }`}>
              <span className={`text-[11px] font-mono uppercase tracking-wider block mb-3 ${
                isDark ? 'text-[#A1AAB8]' : 'text-slate-500'
              }`}>
                Social &amp; Developer Profiles
              </span>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((s: any, idx: number) => (
                  <a
                    key={`${s.platform || s.url || 'social'}-${idx}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`contact-social-${(s.platform || 'link').toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 text-white hover:border-[#22D3EE]/40 hover:bg-white/[0.08]'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-[#0891B2]/40 hover:bg-slate-100'
                    }`}
                  >
                    <span>{s.platform}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Glass Message Form */}
          <ScrollReveal direction="left" distance={25} duration={0.6} delay={0.15} className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl backdrop-blur-xl border ${
              isDark
                ? 'bg-[#111722]/80 border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] text-white'
                : 'bg-white/85 border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] text-slate-900'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Send Direct Message
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}`}>
                    Typically responds within 12-24 hours.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className={`p-6 sm:p-8 rounded-xl border text-center my-6 ${
                  isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <Check className="w-9 h-9 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-base font-bold mb-1">Message Received!</h4>
                  <p className={`text-xs max-w-sm mx-auto mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Thank you for reaching out. I have received your message and will review your inquiry shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#22D3EE] text-black cursor-pointer hover:opacity-95"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-mono font-semibold mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                          isDark
                            ? 'bg-white/[0.03] border-white/10 text-white placeholder-slate-500 focus:border-[#22D3EE]'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0891B2]'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-mono font-semibold mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                          isDark
                            ? 'bg-white/[0.03] border-white/10 text-white placeholder-slate-500 focus:border-[#22D3EE]'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0891B2]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-mono font-semibold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project Opportunity / Consulting Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                        isDark
                          ? 'bg-white/[0.03] border-white/10 text-white placeholder-slate-500 focus:border-[#22D3EE]'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0891B2]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono font-semibold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project scope, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border outline-none transition-all resize-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                        isDark
                          ? 'bg-white/[0.03] border-white/10 text-white placeholder-slate-500 focus:border-[#22D3EE]'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0891B2]'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-form-submit-btn"
                    className="w-full min-h-[44px] py-3 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-extrabold hover:opacity-95 active:scale-95 disabled:opacity-50 shadow-md shadow-cyan-500/10 focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
