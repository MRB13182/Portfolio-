import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioConfig } from '../config/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { SafeImage } from '../components/common/SafeImage';
import { SkillModal } from '../components/modals/SkillModal';
import { ProjectModal } from '../components/modals/ProjectModal';
import { CertificatesShowcase } from '../components/sections/CertificatesShowcase';
import { Skill, Project } from '../types';
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Briefcase, 
  Calendar, 
  Mail, 
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onOpenContact: () => void;
  onOpenResumeDownload: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenContact, onOpenResumeDownload }) => {
  const { isDark } = useTheme();
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // Top 3 featured skills for the Home preview
  const previewSkills = portfolioConfig.skills.slice(0, 3);

  // Top 3 featured projects for the Home preview
  const previewProjects = portfolioConfig.projects.slice(0, 3);

  // Top 2 experience milestones for Home preview
  const previewExperience = portfolioConfig.experience.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 1. Hero Section */}
      <Hero 
        onOpenContact={onOpenContact} 
        onOpenResumeDownload={onOpenResumeDownload} 
      />

      {/* 2. Merged About Section (Intro, Bio, Quick Stats, Core Pillars) */}
      <About />

      {/* 3. Skills Preview Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark
                  ? 'bg-[#7B2CFF]/20 text-[#F5D06F] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
                  : 'bg-emerald-500/10 text-[#12D6A0] border border-[rgba(18,214,160,0.3)] shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
              }`}>
                <Cpu className="w-3.5 h-3.5" />
                <span>Expertise Snapshot</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Core <span className={`text-transparent bg-clip-text ${
                  isDark
                    ? 'bg-gradient-to-r from-white via-[#F5D06F] to-[#D4AF37]'
                    : 'bg-gradient-to-r from-slate-900 via-[#12D6A0] to-[#8EF0D1]'
                }`}>Technical Skills</span>
              </h2>
            </div>

            <Link
              to="/skills"
              id="home-view-all-skills-btn"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 self-start sm:self-auto border backdrop-blur-2xl ${
                isDark
                  ? 'bg-[rgba(17,17,17,0.75)] text-[#F5D06F] border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] hover:bg-[rgba(25,25,32,0.8)] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-white text-[#12D6A0] border-[rgba(18,214,160,0.3)] hover:border-[#12D6A0] hover:bg-emerald-50/50 shadow-sm'
              }`}
            >
              <span>View All Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Skill Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {previewSkills.map((skill, index) => (
              <motion.button
                type="button"
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setActiveSkillModal(skill)}
                id={`home-skill-preview-${skill.id}`}
                aria-label={`Open details for ${skill.name}`}
                className={`p-6 rounded-[28px] backdrop-blur-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center relative group ${
                  isDark
                    ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(123,44,255,0.25)] text-[#FFFFFF]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] hover:shadow-[0_12px_32px_rgba(18,214,160,0.18)] text-slate-800 shadow-sm'
                }`}
              >
                {/* Tech Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm ${
                  isDark
                    ? 'bg-[#0A0A0A] text-[#F5D06F] border border-[rgba(212,175,55,0.25)]'
                    : 'bg-emerald-50 text-[#12D6A0] border border-[rgba(18,214,160,0.3)]'
                }`}>
                  <Cpu className="w-6 h-6" />
                </div>

                <h3 className={`font-extrabold text-base mb-1 transition-colors ${
                  isDark ? 'group-hover:text-[#F5D06F]' : 'group-hover:text-[#12D6A0]'
                }`}>
                  {skill.name}
                </h3>
                <span className={`text-xs mb-3 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
                  {skill.category}
                </span>

                {/* Percentage Badge */}
                <div className={`inline-flex items-center gap-1 px-3.5 py-0.5 rounded-full text-xs font-black font-mono tracking-tight transition-all ${
                  isDark
                    ? 'bg-[#D4AF37]/15 text-[#F5D06F] border border-[#D4AF37]/35'
                    : 'bg-emerald-50 text-[#0EB385] border border-[rgba(18,214,160,0.35)]'
                }`}>
                  <span>{skill.level}% Mastery</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/skills"
              className={`inline-flex items-center gap-2 text-xs font-bold ${
                isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
              }`}
            >
              <span>View All {portfolioConfig.skills.length} Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Projects Preview Section */}
      <section className={`relative py-20 border-t ${
        isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark
                  ? 'bg-[#7B2CFF]/20 text-[#F5D06F] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
                  : 'bg-emerald-500/10 text-[#12D6A0] border border-[rgba(18,214,160,0.3)] shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
              }`}>
                <Layers className="w-3.5 h-3.5" />
                <span>Featured Engineering Work</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Featured <span className={`text-transparent bg-clip-text ${
                  isDark
                    ? 'bg-gradient-to-r from-white via-[#F5D06F] to-[#D4AF37]'
                    : 'bg-gradient-to-r from-slate-900 via-[#12D6A0] to-[#8EF0D1]'
                }`}>Projects</span>
              </h2>
            </div>

            <Link
              to="/projects"
              id="home-view-all-projects-btn"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 self-start sm:self-auto border backdrop-blur-2xl ${
                isDark
                  ? 'bg-[rgba(17,17,17,0.75)] text-[#F5D06F] border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] hover:bg-[rgba(25,25,32,0.8)] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-white text-[#12D6A0] border-[rgba(18,214,160,0.3)] hover:border-[#12D6A0] hover:bg-emerald-50/50 shadow-sm'
              }`}
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Featured Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {previewProjects.map((project, index) => (
              <motion.button
                type="button"
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveProjectModal(project)}
                id={`home-project-preview-${project.id}`}
                aria-label={`Open case study for ${project.title}`}
                className={`group relative rounded-[32px] backdrop-blur-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg ${
                  isDark
                    ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(123,44,255,0.25)] text-[#FFFFFF]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] hover:shadow-[0_16px_35px_rgba(18,214,160,0.18)] text-slate-800 shadow-sm'
                }`}
              >
                <div className={`relative w-full h-48 overflow-hidden ${isDark ? 'bg-[#0A0A0A]' : 'bg-slate-100'}`}>
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackType="project"
                    fallbackText={project.title}
                    badge={project.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md ${
                      isDark
                        ? 'bg-black/75 text-[#F5D06F] border border-[#D4AF37]/40'
                        : 'bg-white/90 text-[#0EB385] border border-[rgba(18,214,160,0.35)]'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className={`text-lg font-extrabold tracking-tight mb-1 transition-colors line-clamp-1 ${
                      isDark ? 'group-hover:text-[#F5D06F]' : 'group-hover:text-[#12D6A0]'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 mb-4 leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-slate-600'}`}>
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-[9.5px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                            isDark
                              ? 'bg-[#0A0A0A] border-[rgba(212,175,55,0.2)] text-[#FFFFFF]'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={`pt-2.5 border-t flex items-center justify-between text-xs font-bold ${
                      isDark ? 'border-[rgba(212,175,55,0.2)] text-[#D4AF37]' : 'border-slate-200 text-[#12D6A0]'
                    }`}>
                      <span>Case Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/projects"
              className={`inline-flex items-center gap-2 text-xs font-bold ${
                isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
              }`}
            >
              <span>View All {portfolioConfig.projects.length} Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Experience Preview Section */}
      <section className={`relative py-20 border-t ${
        isDark ? 'border-[rgba(212,175,55,0.2)]' : 'border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark
                  ? 'bg-[#7B2CFF]/20 text-[#F5D06F] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.18)]'
                  : 'bg-emerald-500/10 text-[#12D6A0] border border-[rgba(18,214,160,0.3)] shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
              }`}>
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career Track Record</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Work <span className={`text-transparent bg-clip-text ${
                  isDark
                    ? 'bg-gradient-to-r from-white via-[#F5D06F] to-[#D4AF37]'
                    : 'bg-gradient-to-r from-slate-900 via-[#12D6A0] to-[#8EF0D1]'
                }`}>Experience</span>
              </h2>
            </div>

            <Link
              to="/experience"
              id="home-view-full-experience-btn"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 self-start sm:self-auto border backdrop-blur-2xl ${
                isDark
                  ? 'bg-[rgba(17,17,17,0.75)] text-[#F5D06F] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[rgba(25,25,32,0.8)] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-white text-[#12D6A0] border-[rgba(18,214,160,0.3)] hover:border-[#12D6A0] hover:bg-emerald-50/50 shadow-sm'
              }`}
            >
              <span>View Full Experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Short Experience Preview Cards */}
          <div className="space-y-4">
            {previewExperience.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 rounded-[28px] backdrop-blur-2xl border transition-all ${
                  isDark
                    ? 'bg-[rgba(17,17,17,0.75)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_25px_rgba(123,44,255,0.2)] text-[#FFFFFF]'
                    : 'bg-white/95 border-[rgba(18,214,160,0.25)] hover:border-[#12D6A0] hover:shadow-md text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{exp.position}</h3>
                    <p className={`text-xs font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`}>
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-mono ${isDark ? 'text-[#FFFFFF]' : 'text-slate-600'}`}>
                    <Calendar className={`w-3.5 h-3.5 ${isDark ? 'text-[#F5D06F]' : 'text-[#12D6A0]'}`} />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-3 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-600'}`}>
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`text-[9.5px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                        isDark
                          ? 'bg-[#0A0A0A] border-[rgba(212,175,55,0.2)] text-[#FFFFFF]'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/experience"
              className={`inline-flex items-center gap-2 text-xs font-bold ${
                isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
              }`}
            >
              <span>View Full Career Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Premium Certificates Showcase Section */}
      <CertificatesShowcase />

      {/* 7. Get In Touch Bottom CTA Card */}
      <section className="relative py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative p-8 sm:p-12 rounded-[32px] backdrop-blur-2xl border text-center overflow-hidden shadow-2xl ${
              isDark
                ? 'bg-[rgba(17,17,17,0.75)] border-[#D4AF37]/35 shadow-[0_0_60px_rgba(212,175,55,0.15)] text-[#FFFFFF]'
                : 'bg-white/95 border-[rgba(18,214,160,0.3)] shadow-[0_20px_50px_rgba(18,214,160,0.12)] text-slate-900'
            }`}
          >
            {/* Ambient Background Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
              isDark ? 'opacity-20 bg-[#7B2CFF]' : 'opacity-15 bg-[#12D6A0]'
            }`} />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                isDark
                  ? 'bg-[#7B2CFF]/30 text-[#F5D06F] border border-[#D4AF37]/35'
                  : 'bg-emerald-500/10 text-[#12D6A0] border border-[rgba(18,214,160,0.3)]'
              }`}>
                <Mail className="w-3.5 h-3.5" />
                <span>Let's Build Something Exceptional</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
                Have an Exciting Project in Mind?
              </h2>

              <p className={`text-sm sm:text-base leading-relaxed mb-8 ${
                isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
              }`}>
                Currently open for full-time engineering roles, technical advisory, and bespoke high-performance web development.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onOpenContact}
                  id="home-cta-get-in-touch-btn"
                  className={`px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5D06F] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                      : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385] text-white hover:shadow-[0_8px_30px_rgba(18,214,160,0.4)]'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modals for Quick Preview inspection */}
      <SkillModal
        skill={activeSkillModal}
        onClose={() => setActiveSkillModal(null)}
      />

      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </div>
  );
};
