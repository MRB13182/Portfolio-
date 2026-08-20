import React from 'react';
import { portfolioConfig, assets } from '../../config/portfolio';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Calendar,
  Award
} from 'lucide-react';

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

  // Exact sRGB hex colors ensuring 100% standard PDF rasterization
  // Paper is ALWAYS white (#FFFFFF) for professional crisp printing
  const paperBg = '#FFFFFF';
  const headerBg = isDark ? '#050505' : '#F0FDF4';
  const headerText = isDark ? '#FFFFFF' : '#0F172A';
  const headerSubText = isDark ? '#CBD5E1' : '#475569';
  const headerTitleColor = isDark ? '#D4AF37' : '#00A57A';
  const headerDivider = isDark ? '#D4AF37' : '#00C896';
  
  // Body Content Area (White background with crisp high-contrast dark typography)
  const bodyText = '#0F172A';
  const bodyMuted = '#334155';
  const bodySubtle = '#64748B';
  const cardBg = '#F8FAFC';
  const cardBorder = isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(0, 200, 150, 0.3)';
  const borderLight = '#E2E8F0';
  const accentColor = isDark ? '#7C3AED' : '#00A57A';
  const goldColor = '#D4AF37';

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
        {/* Purple Glow in Dark Mode Header */}
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
                <span>Official Credentials Portfolio</span>
              </div>
              <span style={{ color: headerSubText }} className="text-[9.5px] font-mono">
                {certificates.length} Verified Accreditations
              </span>
            </div>

            <h1 
              style={{ color: headerText }} 
              className="text-2xl font-black tracking-tight uppercase mb-0.5"
            >
              Certified Engineering Credentials
            </h1>

            <div 
              style={{ color: headerTitleColor }}
              className="text-xs font-bold uppercase tracking-wider"
            >
              Conferred to {personal.name}
            </div>
          </div>

          {/* Authenticity Seal */}
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
                100% VERIFIED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== CERTIFICATES STACK (ALL FIT IN A4 PAGE) ===================== */}
      <div className="p-7 flex-grow flex flex-col justify-between space-y-2.5 bg-white">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            style={{ 
              backgroundColor: cardBg, 
              borderColor: cardBorder 
            }}
            className="p-3.5 rounded-2xl border relative flex flex-col justify-between overflow-hidden shadow-sm"
          >
            <div className="flex items-start gap-4">
              
              {/* Organization Logo Asset */}
              <div 
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  borderColor: borderLight 
                }}
                className="w-13 h-13 rounded-xl shrink-0 p-2 flex items-center justify-center border shadow-sm"
              >
                <img
                  src={cert.issuerLogo}
                  alt={cert.issuer}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div style="font-weight:900;font-size:11px;text-align:center;color:${accentColor}">
                          ${cert.issuer.slice(0, 4).toUpperCase()}
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Certificate Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span 
                    style={{ color: isDark ? '#7C3AED' : '#00A57A' }}
                    className="text-[9px] font-bold uppercase tracking-wider"
                  >
                    {cert.issuer}
                  </span>
                  <div 
                    style={{ color: bodySubtle }}
                    className="flex items-center gap-1 text-[8.5px] font-mono"
                  >
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                <h2 className="text-sm font-extrabold tracking-tight mb-1" style={{ color: bodyText }}>
                  {cert.title}
                </h2>

                <p 
                  style={{ color: bodyMuted }}
                  className="text-[9.5px] line-clamp-2 leading-relaxed mb-2"
                >
                  {cert.description}
                </p>

                {/* Skills Validated */}
                <div className="flex flex-wrap items-center gap-1 mb-2">
                  <span style={{ color: bodySubtle }} className="text-[8px] font-bold uppercase mr-1">Validated:</span>
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{ 
                        backgroundColor: '#FFFFFF', 
                        borderColor: borderLight, 
                        color: bodyText 
                      }}
                      className="text-[8px] font-semibold px-2 py-0.5 rounded-md border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Credential ID and Status */}
                <div 
                  style={{ borderColor: borderLight, color: bodySubtle }}
                  className="pt-2 border-t flex items-center justify-between text-[8.5px]"
                >
                  <div className="font-mono">
                    Credential ID: <span style={{ color: bodyText }} className="font-bold">{cert.credentialId}</span>
                  </div>
                  <div 
                    style={{ color: isDark ? '#D4AF37' : '#00A57A' }}
                    className="flex items-center gap-1 font-bold"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Directly Verified</span>
                  </div>
                </div>

              </div>

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
