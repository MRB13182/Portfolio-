import React from 'react';
import { portfolioConfig, assets } from '../../config/portfolio';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

interface CertificatesPdfTemplateProps {
  theme: 'light' | 'dark';
  containerId?: string;
}

export const CertificatesPdfTemplate: React.FC<CertificatesPdfTemplateProps> = ({
  theme,
  containerId = 'certificates-pdf-a4-document'
}) => {
  const isDark = theme === 'dark';
  const { personal, certificates } = portfolioConfig;

  const paperBg = '#FFFFFF';
  const headerBg = isDark ? '#050505' : '#F0FDF4';
  const headerText = isDark ? '#FFFFFF' : '#0F172A';
  const headerSubText = isDark ? '#CBD5E1' : '#475569';
  const headerTitleColor = isDark ? '#D4AF37' : '#00A57A';
  const headerDivider = isDark ? '#D4AF37' : '#00C896';
  
  const bodyText = '#0F172A';
  const bodySubtle = '#64748B';
  const cardBg = '#F8FAFC';
  const cardBorder = isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(0, 200, 150, 0.25)';
  const borderLight = '#E2E8F0';

  return (
    <div
      id={containerId}
      style={{ 
        width: '794px', 
        height: '1123px', 
        backgroundColor: paperBg, 
        color: bodyText 
      }}
      className="relative overflow-hidden font-sans box-border select-none leading-tight flex flex-col justify-between"
    >
      {/* ===================== TOP HEADER BLOCK ===================== */}
      <div 
        style={{ 
          backgroundColor: headerBg,
          borderBottom: `3px solid ${headerDivider}`
        }}
        className="relative px-8 pt-7 pb-5 shrink-0 overflow-hidden"
      >
        {isDark && (
          <div 
            style={{ 
              background: 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.35) 0%, transparent 65%)' 
            }} 
            className="absolute inset-0 pointer-events-none" 
          />
        )}

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div 
                style={{ 
                  backgroundColor: isDark ? 'rgba(124, 58, 237, 0.3)' : 'rgba(0, 200, 150, 0.15)',
                  color: isDark ? '#D4AF37' : '#00A57A',
                  borderColor: isDark ? 'rgba(212, 175, 55, 0.5)' : 'rgba(0, 200, 150, 0.4)'
                }}
                className="text-[9.5px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border flex items-center gap-1.5"
              >
                <img 
                  src={isDark ? assets.logo.dark : assets.logo.light} 
                  alt="Logo" 
                  className="w-3.5 h-3.5 object-contain inline-block"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span>Official Verified Credentials</span>
              </div>
              <span style={{ color: headerSubText }} className="text-[9.5px] font-mono">
                {certificates.length} Verified Certificates
              </span>
            </div>

            <h1 
              style={{ color: headerText }} 
              className="text-2xl font-black tracking-tight uppercase mb-0.5"
            >
              Certified Professional Portfolio
            </h1>

            <div 
              style={{ color: headerTitleColor }}
              className="text-xs font-bold uppercase tracking-wider"
            >
              Conferred to {personal.name}
            </div>
          </div>

          <div 
            style={{ 
              backgroundColor: isDark ? '#121212' : '#FFFFFF',
              borderColor: headerDivider,
              boxShadow: isDark ? '0 0 15px rgba(212,175,55,0.3)' : '0 4px 15px rgba(0,200,150,0.15)'
            }}
            className="px-4 py-2 rounded-2xl border-2 flex items-center gap-2.5"
          >
            <ShieldCheck style={{ color: headerDivider }} className="w-6 h-6" />
            <div>
              <div style={{ color: isDark ? '#94A3B8' : '#64748B' }} className="text-[8px] font-bold uppercase">Authenticity</div>
              <div 
                style={{ color: isDark ? '#D4AF37' : '#00A57A' }}
                className="text-[10px] font-black tracking-wider"
              >
                VERIFIED ASSETS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== 6 CERTIFICATE IMAGES GRID ===================== */}
      <div className="p-7 flex-grow grid grid-cols-2 gap-4 bg-white items-stretch">
        {certificates.slice(0, 6).map((cert, index) => (
          <div
            key={cert.id || index}
            style={{ 
              backgroundColor: cardBg, 
              borderColor: cardBorder 
            }}
            className="p-3 rounded-2xl border flex flex-col justify-between overflow-hidden shadow-sm"
          >
            {/* Real Certificate Image */}
            <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-2 flex items-center justify-center">
              <img 
                src={cert.image} 
                alt={cert.title}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>

            {/* Title */}
            <div className="text-center pt-1 border-t border-slate-200">
              <h3 className="text-xs font-bold truncate" style={{ color: bodyText }}>
                {cert.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== FOOTER BAR ===================== */}
      <div 
        style={{ borderColor: borderLight, color: bodySubtle }}
        className="px-8 py-3 border-t flex items-center justify-between text-[8px] font-mono bg-white"
      >
        <div>
          Recipient: {personal.name} • {personal.email}
        </div>
        <div>
          Official Verified Credentials Ledger • {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </div>
      </div>
    </div>
  );
};
