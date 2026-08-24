import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioConfig, assets } from '../../config/portfolio';
import { 
  ArrowUp, 
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
      className="relative pt-16 pb-28 md:pb-16 border-t backdrop-blur-2xl transition-colors bg-[rgba(5,5,8,0.45)] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(212,175,55,0.2)] items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center p-1 relative overflow-hidden bg-[#0B0B0F] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <img
                  src={assets.logo.dark}
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
                  className="font-black text-sm items-center justify-center w-full h-full text-[#D4AF37]"
                >
                  MR
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#F8FAFC] leading-tight">
                  {portfolioConfig.personal.name}
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold">
                  {portfolioConfig.personal.titles[0]} &amp; UI/UX Designer
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F8FAFC] max-w-sm leading-relaxed mb-6">
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
                    className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all border-[rgba(212,175,55,0.25)] bg-[#0B0B0F] text-[#F8FAFC] hover:text-[#FFD700] hover:border-[#D4AF37]"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Jump Links & Download Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] mb-4">
              Pages &amp; Resources
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link to="/" className="hover:text-[#D4AF37] transition-colors py-1">
                Home
              </Link>
              <Link to="/skills" className="hover:text-[#D4AF37] transition-colors py-1">
                Skills &amp; Tech
              </Link>
              <Link to="/projects" className="hover:text-[#D4AF37] transition-colors py-1">
                Projects
              </Link>
              <Link to="/experience" className="hover:text-[#D4AF37] transition-colors py-1">
                Experience
              </Link>

              {onOpenResumeDownload && (
                <button
                  onClick={onOpenResumeDownload}
                  className="text-left font-bold text-[#D4AF37] hover:underline py-1 flex items-center gap-1 cursor-pointer col-span-2 mt-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Resume (A4 Luxury PDF)</span>
                </button>
              )}

              {onOpenCertificatesDownload && (
                <button
                  onClick={onOpenCertificatesDownload}
                  className="text-left font-bold text-[#D4AF37] hover:underline py-1 flex items-center gap-1 cursor-pointer col-span-2"
                >
                  <Award className="w-3 h-3" />
                  <span>Verified Credentials</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Inquiry CTA */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] mb-3">
              Have a Project in Mind?
            </h4>
            <p className="text-xs text-[#F8FAFC] mb-4 leading-relaxed">
              Available for full-time senior roles, strategic consulting, and contract engineering.
            </p>
            <button
              onClick={onOpenContact}
              id="footer-open-contact-btn"
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md bg-[#D4AF37] text-black hover:bg-[#FFD700] shadow-[0_0_15px_rgba(212,175,55,0.25)]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[#F8FAFC]">
            <span>© {new Date().getFullYear()} {portfolioConfig.personal.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#F8FAFC] font-mono text-[11px]">
              Black Mamba Luxury Edition
            </span>

            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              aria-label="Back to top"
              className="p-2 rounded-xl border transition-all cursor-pointer bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] hover:border-[#D4AF37] hover:text-[#FFD700]"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
