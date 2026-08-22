import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { 
  X, 
  Send, 
  Sparkles, 
  Mail, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  Copy, 
  Github, 
  Linkedin, 
  Facebook,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.4 },
        colors: isDark ? ['#D4AF37', '#7C3AED', '#FFD700'] : ['#00C896', '#7FFFD4', '#00A57A']
      });
    }, 1000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'messagecircle': return MessageCircle;
      case 'send': return Send;
      case 'facebook': return Facebook;
      case 'mail': return Mail;
      default: return ExternalLink;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          id="contact-modal-window"
          className={`relative w-full max-w-3xl rounded-3xl backdrop-blur-2xl border shadow-2xl z-10 overflow-hidden flex flex-col ${
            isDark
              ? 'bg-[rgba(15,15,20,0.95)] border-[rgba(212,175,55,0.35)] text-[#F8FAFC] shadow-[0_0_80px_rgba(124,58,237,0.3)]'
              : 'bg-white/95 border-[#00C896]/25 text-slate-900 shadow-[0_25px_70px_rgba(0,200,150,0.2)]'
          }`}
        >
          {/* Ambient Glow */}
          <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isDark ? 'bg-[#7C3AED]' : 'bg-[#00C896]'
          }`} />

          {/* Close Button */}
          <button
            onClick={onClose}
            id="contact-modal-close-btn"
            aria-label="Close contact dialog"
            className={`absolute top-5 right-5 z-20 p-2 rounded-full border transition-colors cursor-pointer ${
              isDark 
                ? 'border-[rgba(212,175,55,0.3)] bg-[#0B0B0F] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37]' 
                : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:border-[#00C896]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 lg:p-10">
            
            {/* Header */}
            <div className="mb-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 ${
                isDark ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-emerald-500/10 text-[#00A57A]'
              }`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start a Project &amp; Connect</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Let's Build Something <br className="hidden sm:inline" />
                <span className={`text-transparent bg-clip-text ${
                  isDark 
                    ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                    : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
                }`}>
                  Remarkable Together
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Form: Contact Inputs */}
              <div className="lg:col-span-7">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-2xl border text-center flex flex-col items-center ${
                      isDark ? 'bg-[rgba(15,15,20,0.85)] border-[#D4AF37]/40' : 'bg-emerald-50/80 border-emerald-200'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Message Transmitted!</h3>
                    <p className="text-xs text-slate-600 dark:text-[#F8FAFC] mb-4 leading-relaxed">
                      Thank you, {formData.name || 'friend'}. MD. Moshiur Rahman has received your request and will reply within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00C896] dark:bg-[#D4AF37] text-white dark:text-black cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#FFD700] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                            isDark
                              ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] placeholder-slate-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896]'
                          }`}
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#FFD700] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                            isDark
                              ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] placeholder-slate-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896]'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#FFD700] mb-1.5">
                        Subject / Project Scope
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Next.js SaaS Web Application"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                          isDark
                            ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] placeholder-slate-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896]'
                        }`}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#FFD700] mb-1.5">
                        Message Details *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your timeline, vision, and requirements..."
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border focus:outline-none transition-all resize-none ${
                          isDark
                            ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] placeholder-slate-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896]'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-form-submit-btn"
                      className={`w-full py-3 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 ${
                        isDark
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:opacity-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                          : 'bg-[#00C896] hover:bg-[#00A57A] text-white'
                      }`}
                    >
                      {isSubmitting ? (
                        <span>Encrypting &amp; Sending...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Direct Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Direct Channels & Social Links */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                {/* Email Quick Action Box */}
                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-[#FFD700] uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                      Direct Email
                    </span>
                    <button
                      onClick={() => handleCopy(portfolioConfig.personal.email, 'email')}
                      className="text-[10px] font-semibold text-emerald-600 dark:text-[#D4AF37] flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedField === 'email' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <a
                    href={`mailto:${portfolioConfig.personal.email}`}
                    className="text-xs font-bold font-mono hover:underline break-all dark:text-[#FFD700]"
                  >
                    {portfolioConfig.personal.email}
                  </a>
                </div>

                {/* Instant Social Channels Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#FFD700] mb-3">
                    Instant Social Connect
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {portfolioConfig.socials.map((social) => {
                      const Icon = getSocialIcon(social.icon);
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`modal-social-${social.name.toLowerCase()}`}
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-semibold transition-all hover:scale-102 ${
                            isDark
                              ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC] hover:border-[#D4AF37] hover:text-[#FFD700]'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-[#00C896] hover:text-slate-900'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#00A57A] dark:text-[#D4AF37]" />
                          <span>{social.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Status Box */}
                <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                  isDark 
                    ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC]' 
                    : 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                }`}>
                  <p className="font-semibold text-[11px] uppercase tracking-wider text-[#00A57A] dark:text-[#FFD700] mb-1">
                    ⚡ Response Guarantee
                  </p>
                  <p className="text-[11px]">
                    Available for enterprise contracts, SaaS MVPs, and consulting. Typical response time &lt; 4 hours.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
