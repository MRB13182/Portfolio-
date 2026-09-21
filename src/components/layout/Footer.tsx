import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/DataContext';
import { assets } from '../../config/portfolio';
import { AdminTrigger } from '../common/AdminTrigger';
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
  Award,
  Instagram,
  Youtube,
  Twitter
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
  const { profile, socials, footerSettings } = usePortfolioData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'messagecircle':
      case 'whatsapp': return MessageCircle;
      case 'send':
      case 'telegram': return Send;
      case 'facebook': return Facebook;
      case 'mail':
      case 'email': return Mail;
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'twitter':
      case 'x': return Twitter;
      default: return ExternalLink;
    }
  };

  const [logoError, setLogoError] = useState(false);
  const currentLogo = footerSettings.footer_logo || (isDark ? (profile?.logo_dark || assets.logo.dark) : (profile?.logo_light || assets.logo.light));

  const displayName = profile?.name || 'MD. Moshiur Rahman';
  const primaryTitle = profile?.titles?.[0] || 'Senior Full Stack Architect';
  const description = footerSettings.footer_description || profile?.bio || 'Architecting high-performance web systems, generative AI engines, and enterprise solutions.';
  const copyrightText = footerSettings.copyright_text || `© ${new Date().getFullYear()} ${displayName}. All rights reserved.`;
  const navLinks = footerSettings.navigation_links && footerSettings.navigation_links.length > 0
    ? footerSettings.navigation_links
    : [
        { label: 'Overview', path: '/' },
        { label: 'Skills & Tech', path: '/skills' },
        { label: 'Projects', path: '/projects' },
        { label: 'Experience', path: '/experience' },
      ];

  const activeSocials = (footerSettings.social_links && footerSettings.social_links.length > 0)
    ? footerSettings.social_links
    : socials;

  return (
    <footer
      id="main-footer"
      style={footerSettings.background_image ? { backgroundImage: `url(${footerSettings.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      className={`relative pt-16 pb-28 md:pb-16 border-t backdrop-blur-2xl transition-colors duration-300 ${
        isDark
          ? 'bg-[rgba(5,5,8,0.85)] border-[rgba(212,175,55,0.2)] text-[#FFFFFF]'
          : 'bg-white/80 border-slate-200/80 text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Optional Custom Banner if configured */}
        {footerSettings.banner_text && (
          <div className="mb-8 p-4 rounded-2xl border text-center text-xs sm:text-sm font-medium backdrop-blur-md transition-all"
            style={{
              borderColor: isDark ? 'rgba(212,175,55,0.25)' : 'rgba(18,214,160,0.25)',
              backgroundColor: isDark ? 'rgba(212,175,55,0.06)' : 'rgba(18,214,160,0.06)',
              color: isDark ? '#F5D06F' : '#0EB385'
            }}
          >
            {footerSettings.banner_text}
          </div>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b items-start ${
          isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
        }`}>
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center p-1 relative overflow-hidden ${
                isDark 
                  ? 'bg-[#0B0B0F] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'bg-white border border-[#12D6A0]/30 shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
              }`}>
                {!logoError && currentLogo ? (
                  <img
                    key={currentLogo}
                    src={currentLogo}
                    alt={`${displayName} Logo`}
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span 
                    className={`font-black text-sm flex items-center justify-center w-full h-full ${
                      isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                    }`}
                  >
                    MR
                  </span>
                )}
              </div>
              <div>
                <h3 className={`font-extrabold text-base sm:text-lg leading-tight ${
                  isDark ? 'text-[#FFFFFF]' : 'text-slate-900'
                }`}>
                  {displayName}
                </h3>
                <p className={`text-xs font-semibold ${
                  isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                }`}>
                  {primaryTitle}
                </p>
              </div>
            </div>

            <p className={`text-xs sm:text-sm max-w-sm leading-relaxed mb-6 ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
            }`}>
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {activeSocials.map((social) => {
                const Icon = getSocialIcon(social.icon || social.name);
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                      isDark
                        ? 'border-[rgba(212,175,55,0.25)] bg-[#0B0B0F] text-[#FFFFFF] hover:text-[#F5D06F] hover:border-[#D4AF37]'
                        : 'border-slate-200 bg-white text-slate-700 hover:text-[#12D6A0] hover:border-[#12D6A0]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Dynamic Navigation Jump Links & Download Links */}
          <div className="md:col-span-4">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
              isDark ? 'text-[#FFFFFF]' : 'text-slate-900'
            }`}>
              Pages &amp; Resources
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {navLinks.map((nav, idx) => (
                <Link 
                  key={idx}
                  to={nav.path} 
                  className={`transition-colors py-1 ${
                    isDark ? 'text-[#A1A1AA] hover:text-[#D4AF37]' : 'text-slate-600 hover:text-[#12D6A0]'
                  }`}
                >
                  {nav.label}
                </Link>
              ))}

              {onOpenResumeDownload && (
                <button
                  onClick={onOpenResumeDownload}
                  className={`text-left font-bold hover:underline py-1 flex items-center gap-1 cursor-pointer col-span-2 mt-1 ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Resume (A4 PDF)</span>
                </button>
              )}

              {onOpenCertificatesDownload && (
                <button
                  onClick={onOpenCertificatesDownload}
                  className={`text-left font-bold hover:underline py-1 flex items-center gap-1 cursor-pointer col-span-2 ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                  }`}
                >
                  <Award className="w-3 h-3" />
                  <span>Verified Credentials</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Inquiry CTA */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
              isDark ? 'text-[#FFFFFF]' : 'text-slate-900'
            }`}>
              Have a Project in Mind?
            </h4>
            <p className={`text-xs mb-4 leading-relaxed ${
              isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
            }`}>
              {profile?.availability_status || 'Available for full-time senior roles, strategic consulting, and contract engineering.'}
            </p>
            <button
              onClick={onOpenContact}
              id="footer-open-contact-btn"
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                isDark
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black hover:opacity-90 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385] text-slate-950 hover:opacity-90 shadow-[0_4px_15px_rgba(18,214,160,0.3)]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className={`flex items-center gap-1.5 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
            <span>{copyrightText}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
              <span className={`font-mono text-[11px] tracking-wide ${isDark ? 'text-[#D4AF37]/80' : 'text-[#00C8A8]'}`}>
                {isDark ? 'Black Mamba Gold' : 'Apple Titanium Emerald Light'}
              </span>

              {/* Admin CMS Trigger Button */}
              <AdminTrigger />
            </div>

            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              aria-label="Back to top"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.25)] text-[#FFFFFF] hover:border-[#D4AF37] hover:text-[#F5D06F]'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#12D6A0] hover:text-[#12D6A0]'
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
