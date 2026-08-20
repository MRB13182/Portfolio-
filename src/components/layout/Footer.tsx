import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig, assets } from '../../config/portfolio';
import { 
  ArrowUp, 
  Sparkles, 
  Heart, 
  Github, 
  Linkedin, 
  MessageCircle, 
  Send, 
  Facebook, 
  Mail,
  ExternalLink,
  FileText,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenResumeDownload?: () => void;
  onOpenCertificatesDownload?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenContact,
  onOpenResumeDownload,
  onOpenCertificatesDownload
}) => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer
      id="main-footer"
      className={`relative pt-16 pb-28 md:pb-16 border-t transition-colors ${
        isDark
          ? 'bg-[#050505] border-[rgba(212,175,55,0.15)] text-[#A1A1AA]'
          : 'bg-[#F0FDF4]/50 border-[#00C896]/15 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/60 dark:border-zinc-800/80 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-1 relative overflow-hidden ${
                isDark 
                  ? 'bg-[#0B0B0F] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'bg-white border border-[#00C896]/30 shadow-md'
              }`}>
                <img
                  src={isDark ? assets.logo.dark : assets.logo.light}
                  alt={`${portfolioConfig.personal.name} Logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <span 
                  style={{ display: 'none' }}
                  className={`font-black text-sm items-center justify-center w-full h-full ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'
                  }`}
                >
                  MR
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                  {portfolioConfig.personal.name}
                </h3>
                <p className="text-xs text-[#00A57A] dark:text-[#D4AF37] font-semibold">
                  {portfolioConfig.personal.titles[0]} &amp; UI/UX Designer
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA] max-w-sm leading-relaxed mb-6">
              {portfolioConfig.personal.bio}
            </p>

            <div className="flex items-center gap-2">
              {portfolioConfig.socials.map((social) => {
                const Icon = getSocialIcon(social.icon);
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                      isDark
                        ? 'border-zinc-800 bg-[#0B0B0F] text-[#A1A1AA] hover:text-white hover:border-[#D4AF37]'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-[#00C896]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Jump Links & Download Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Pages &amp; Resources
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link to="/" className="hover:text-emerald-600 dark:hover:text-[#D4AF37] transition-colors py-1">
                Home
              </Link>
              <Link to="/skills" className="hover:text-emerald-600 dark:hover:text-[#D4AF37] transition-colors py-1">
                Skills &amp; Tech
              </Link>
              <Link to="/projects" className="hover:text-emerald-600 dark:hover:text-[#D4AF37] transition-colors py-1">
                Projects
              </Link>
              <Link to="/experience" className="hover:text-emerald-600 dark:hover:text-[#D4AF37] transition-colors py-1">
                Experience
              </Link>

              {onOpenResumeDownload && (
                <button
                  onClick={onOpenResumeDownload}
                  className="text-left font-bold text-[#00A57A] dark:text-[#D4AF37] hover:underline py-1 flex items-center gap-1 cursor-pointer col-span-2 mt-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Resume (A4 Luxury PDF)</span>
                </button>
              )}

              {onOpenCertificatesDownload && (
                <button
                  onClick={onOpenCertificatesDownload}
                  className="text-left font-bold text-[#00A57A] dark:text-[#D4AF37] hover:underline py-1 flex items-center gap-1 cursor-pointer col-span-2"
                >
                  <Award className="w-3 h-3" />
                  <span>Verified Credentials</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Inquiry CTA */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Have a Project in Mind?
            </h4>
            <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mb-4 leading-relaxed">
              Available for full-time senior roles, strategic consulting, and contract engineering.
            </p>
            <button
              onClick={onOpenContact}
              id="footer-open-contact-btn"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                isDark
                  ? 'bg-[#D4AF37] text-black hover:bg-[#FFD700] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-[#00C896] text-white hover:bg-[#00A57A]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-500">
            <span>© {new Date().getFullYear()} {portfolioConfig.personal.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 dark:text-zinc-500 font-mono text-[11px]">
              Apple Emerald &amp; Black Mamba Luxury Edition
            </span>

            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              aria-label="Back to top"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#0B0B0F] border-zinc-800 text-zinc-300 hover:border-[#D4AF37] hover:text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#00C896] hover:text-slate-900'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
