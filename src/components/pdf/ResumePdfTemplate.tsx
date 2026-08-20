import React from 'react';
import { portfolioConfig, assets } from '../../config/portfolio';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

interface ResumePdfTemplateProps {
  theme: 'light' | 'dark';
  containerId?: string;
}

export const ResumePdfTemplate: React.FC<ResumePdfTemplateProps> = ({ 
  theme,
  containerId = 'resume-pdf-a4-document' 
}) => {
  const isDark = theme === 'dark';
  const { personal, experience, education, certificates, socials } = portfolioConfig;

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
  const sectionTitleColor = isDark ? '#7C3AED' : '#00A57A';
  const accentColor = isDark ? '#D4AF37' : '#00C896';
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
      {/* In Dark mode: Black Mamba #050505 with Royal Purple glow & Gold divider */}
      {/* In Light mode: Apple Emerald #F0FDF4 with Mint accent */}
      <div 
        style={{ 
          backgroundColor: headerBg,
          borderBottom: `3px solid ${headerDivider}`
        }}
        className="relative px-8 pt-7 pb-5 shrink-0 overflow-hidden"
      >
        {/* Purple Glow Effect in Header (Dark Mode) */}
        {isDark && (
          <div 
            style={{ 
              background: 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.35) 0%, transparent 65%)' 
            }} 
            className="absolute inset-0 pointer-events-none" 
          />
        )}

        <div className="relative z-10 flex items-center justify-between gap-5">
          {/* Left: Name, Title & Bio */}
          <div className="flex-1">
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
                <span>Curriculum Vitae • Executive Profile</span>
              </div>
            </div>

            <h1 
              style={{ color: headerText }} 
              className="text-2xl font-black tracking-tight uppercase mb-0.5"
            >
              {personal.name}
            </h1>

            <div 
              style={{ color: headerTitleColor }}
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
            >
              <span>{personal.titles[0]} &amp; {personal.titles[1]}</span>
              <span className="opacity-60">•</span>
              <span>5+ Years Experience</span>
            </div>

            <p 
              style={{ color: headerSubText }}
              className="text-[10px] leading-relaxed max-w-xl"
            >
              {personal.bio}
            </p>
          </div>

          {/* Right: Profile Photo in Gold/Emerald border */}
          <div className="shrink-0 flex flex-col items-center">
            <div 
              style={{ 
                backgroundColor: '#FFFFFF',
                borderColor: headerDivider,
                boxShadow: isDark ? '0 0 15px rgba(212,175,55,0.4)' : '0 4px 15px rgba(0,200,150,0.25)'
              }}
              className="w-22 h-22 rounded-2xl overflow-hidden p-1 border-2 relative"
            >
              <img
                src={portfolioConfig.assets.profileImage}
                alt={personal.name}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;background-color:${headerBg};color:${headerTitleColor}">
                        <span>MR</span>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div 
          style={{ 
            borderColor: isDark ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 200, 150, 0.2)',
            color: headerSubText
          }}
          className="mt-3 pt-2.5 border-t grid grid-cols-4 gap-2 text-[9.5px] font-medium"
        >
          <div className="flex items-center gap-1 truncate">
            <Mail style={{ color: headerDivider }} className="w-3 h-3 shrink-0" />
            <span className="truncate">{personal.email}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <MapPin style={{ color: headerDivider }} className="w-3 h-3 shrink-0" />
            <span className="truncate">{personal.location.split('(')[0]}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <Linkedin style={{ color: headerDivider }} className="w-3 h-3 shrink-0" />
            <span className="truncate">linkedin.com/in/moshiur</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <Github style={{ color: headerDivider }} className="w-3 h-3 shrink-0" />
            <span className="truncate">github.com/moshiur-dev</span>
          </div>
        </div>
      </div>

      {/* ===================== BODY CONTENT (WHITE A4 AREA) ===================== */}
      <div className="p-7 flex-grow flex flex-col justify-between box-border bg-white">
        
        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-12 gap-5 flex-grow">
          
          {/* LEFT COLUMN (7 Cols): Experience & Featured Projects */}
          <div className="col-span-7 flex flex-col justify-between space-y-3.5">
            
            {/* Professional Experience */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5 pb-1 border-b border-slate-200">
                <Briefcase style={{ color: sectionTitleColor }} className="w-3.5 h-3.5" />
                <h2 
                  style={{ color: isDark ? '#7C3AED' : '#00A57A' }}
                  className="text-xs font-black uppercase tracking-wider"
                >
                  Professional Work Experience
                </h2>
              </div>

              <div className="space-y-2.5">
                {experience.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ borderColor: isDark ? '#D4AF37' : '#00C896' }}
                    className="relative pl-3 border-l-2"
                  >
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span style={{ color: bodyText }} className="font-bold">{item.position}</span>
                      <span style={{ color: bodySubtle }} className="font-mono text-[8.5px]">{item.duration}</span>
                    </div>
                    <div 
                      style={{ color: isDark ? '#7C3AED' : '#00A57A' }}
                      className="text-[9px] font-semibold mb-1"
                    >
                      {item.company} • <span style={{ color: bodySubtle }} className="font-normal">{item.location}</span>
                    </div>
                    <p 
                      style={{ color: bodyMuted }}
                      className="text-[9px] mb-1 leading-snug"
                    >
                      {item.description}
                    </p>
                    <div className="space-y-0.5">
                      {item.achievements.slice(0, 2).map((ach, idx) => (
                        <div 
                          key={idx} 
                          style={{ color: bodyMuted }}
                          className="flex items-start gap-1 text-[8.5px]"
                        >
                          <span style={{ color: accentColor }} className="font-bold mt-0.5">›</span>
                          <span className="leading-tight">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Production Projects */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-200">
                <Code2 style={{ color: sectionTitleColor }} className="w-3.5 h-3.5" />
                <h2 
                  style={{ color: isDark ? '#7C3AED' : '#00A57A' }}
                  className="text-xs font-black uppercase tracking-wider"
                >
                  High-Impact Production Projects
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {portfolioConfig.projects.slice(0, 2).map((proj) => (
                  <div 
                    key={proj.id}
                    style={{ 
                      backgroundColor: cardBg, 
                      borderColor: cardBorder 
                    }}
                    className="p-2.5 rounded-xl border"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span style={{ color: bodyText }} className="font-bold text-[9.5px] truncate">{proj.title}</span>
                      <span 
                        style={{ 
                          backgroundColor: isDark ? 'rgba(124, 58, 237, 0.12)' : 'rgba(0, 200, 150, 0.12)',
                          color: isDark ? '#7C3AED' : '#00A57A'
                        }}
                        className="text-[7.5px] font-bold uppercase px-1.5 py-0.2 rounded"
                      >
                        {proj.category}
                      </span>
                    </div>
                    <p 
                      style={{ color: bodyMuted }}
                      className="text-[8px] line-clamp-2 leading-tight mb-1.5"
                    >
                      {proj.tagline}
                    </p>
                    <div className="flex flex-wrap gap-0.5">
                      {proj.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          style={{ 
                            backgroundColor: '#FFFFFF', 
                            borderColor: borderLight, 
                            color: bodyText 
                          }}
                          className="text-[7.5px] font-mono px-1 py-0.2 rounded border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (5 Cols): Skills, Education & Credentials */}
          <div 
            style={{ borderColor: borderLight }}
            className="col-span-5 flex flex-col justify-between space-y-3.5 pl-2 border-l"
          >
            
            {/* Core Competencies */}
            <div>
              <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-200">
                <Sparkles style={{ color: sectionTitleColor }} className="w-3.5 h-3.5" />
                <h2 
                  style={{ color: isDark ? '#7C3AED' : '#00A57A' }}
                  className="text-xs font-black uppercase tracking-wider"
                >
                  Core Competencies
                </h2>
              </div>

              <div className="space-y-2">
                {/* Category 1: Frontend */}
                <div>
                  <div style={{ color: isDark ? '#7C3AED' : '#00A57A' }} className="text-[8.5px] font-bold uppercase mb-1">
                    Frontend Architecture
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'JavaScript'].map((s, idx) => (
                      <span
                        key={idx}
                        style={{ 
                          backgroundColor: cardBg, 
                          borderColor: borderLight, 
                          color: bodyText 
                        }}
                        className="text-[8.5px] font-semibold px-1.5 py-0.5 rounded border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 2: Backend */}
                <div>
                  <div style={{ color: isDark ? '#7C3AED' : '#00A57A' }} className="text-[8.5px] font-bold uppercase mb-1">
                    Backend &amp; Databases
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Prisma ORM', 'REST/GraphQL'].map((s, idx) => (
                      <span
                        key={idx}
                        style={{ 
                          backgroundColor: cardBg, 
                          borderColor: borderLight, 
                          color: bodyText 
                        }}
                        className="text-[8.5px] font-semibold px-1.5 py-0.5 rounded border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 3: Cloud & Design */}
                <div>
                  <div style={{ color: isDark ? '#7C3AED' : '#00A57A' }} className="text-[8.5px] font-bold uppercase mb-1">
                    Cloud &amp; UI/UX Design
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['Docker', 'GCP Cloud Run', 'Vercel Edge', 'Figma', 'CI/CD Pipelines'].map((s, idx) => (
                      <span
                        key={idx}
                        style={{ 
                          backgroundColor: cardBg, 
                          borderColor: borderLight, 
                          color: bodyText 
                        }}
                        className="text-[8.5px] font-semibold px-1.5 py-0.5 rounded border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Education */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
                <GraduationCap style={{ color: sectionTitleColor }} className="w-3.5 h-3.5" />
                <h2 
                  style={{ color: isDark ? '#7C3AED' : '#00A57A' }}
                  className="text-xs font-black uppercase tracking-wider"
                >
                  Academic Education
                </h2>
              </div>

              {education.map((edu) => (
                <div key={edu.id} className="text-[9px]">
                  <div style={{ color: bodyText }} className="font-bold leading-tight">{edu.degree}</div>
                  <div style={{ color: isDark ? '#7C3AED' : '#00A57A' }} className="font-semibold text-[8.5px]">
                    {edu.institution}
                  </div>
                  <div 
                    style={{ color: bodySubtle }}
                    className="flex items-center justify-between text-[8px] mt-0.5"
                  >
                    <span>{edu.duration}</span>
                    <span 
                      style={{ color: isDark ? '#D4AF37' : '#00A57A' }}
                      className="font-mono font-bold"
                    >
                      {edu.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Verified Certifications */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-200">
                <Award style={{ color: sectionTitleColor }} className="w-3.5 h-3.5" />
                <h2 
                  style={{ color: isDark ? '#7C3AED' : '#00A57A' }}
                  className="text-xs font-black uppercase tracking-wider"
                >
                  Official Credentials
                </h2>
              </div>

              <div className="space-y-1.5">
                {certificates.slice(0, 3).map((cert) => (
                  <div key={cert.id} className="flex items-start justify-between text-[8.5px]">
                    <div>
                      <div style={{ color: bodyText }} className="font-bold leading-tight">{cert.title}</div>
                      <div style={{ color: bodyMuted }} className="text-[7.5px]">
                        {cert.issuer} • <span className="font-mono">{cert.credentialId}</span>
                      </div>
                    </div>
                    <CheckCircle2 
                      style={{ color: accentColor }}
                      className="w-3 h-3 shrink-0 mt-0.5 ml-1" 
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bar */}
        <div 
          style={{ borderColor: borderLight, color: bodySubtle }}
          className="pt-2.5 mt-3 border-t flex items-center justify-between text-[8px] font-mono"
        >
          <div>
            Official Verified Profile • {personal.name}
          </div>
          <div>
            {isDark ? 'Black Mamba Luxury Edition' : 'Apple Titanium Emerald Edition'} • {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </div>
        </div>

      </div>
    </div>
  );
};
