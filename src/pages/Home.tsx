import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { portfolioConfig } from '../config/portfolio';
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
  Sparkles, 
  Layers, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Mail, 
  ExternalLink,
  Github,
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
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark 
                  ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                  : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
              }`}>
                <Cpu className="w-3.5 h-3.5" />
                <span>Expertise Snapshot</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Core <span className={`text-transparent bg-clip-text ${
                  isDark 
                    ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                    : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
                }`}>Technical Skills</span>
              </h2>
            </div>

            <Link
              to="/skills"
              id="home-view-all-skills-btn"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 self-start sm:self-auto border ${
                isDark
                  ? 'bg-[#0B0B0F] text-[#D4AF37] border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] hover:bg-[#121218] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-white text-[#00A57A] border-[#00C896]/30 hover:border-[#00C896] hover:bg-emerald-50 shadow-sm'
              }`}
            >
              <span>View All Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

            {/* 3 Skill Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {previewSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setActiveSkillModal(skill)}
                id={`home-skill-preview-${skill.id}`}
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center relative group ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(124,58,237,0.25)] text-[#F8FAFC]'
                    : 'bg-white/90 border-slate-200/80 hover:border-[#00C896]/60 hover:shadow-[0_10px_30px_rgba(0,200,150,0.15)] text-slate-900'
                }`}
              >
                {/* Tech Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm ${
                  isDark 
                    ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                    : 'bg-emerald-50 text-[#00A57A] border border-emerald-200'
                }`}>
                  <Cpu className="w-6 h-6" />
                </div>

                <h3 className="font-extrabold text-base mb-1 group-hover:text-emerald-600 dark:group-hover:text-[#FFD700] transition-colors">
                  {skill.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-[#F8FAFC] mb-3">{skill.category}</span>

                {/* Percentage Badge */}
                <div className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-black font-mono tracking-tight transition-all ${
                  isDark
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'bg-emerald-500/10 text-[#00A57A] border border-emerald-500/20'
                }`}>
                  <span>{skill.level}% Mastery</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00A57A] dark:text-[#D4AF37]"
            >
              <span>View All {portfolioConfig.skills.length} Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Projects Preview Section */}
      <section className="relative py-20 border-t border-slate-200/50 dark:border-[rgba(212,175,55,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark 
                  ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                  : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
              }`}>
                <Layers className="w-3.5 h-3.5" />
                <span>Featured Engineering Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Featured <span className={`text-transparent bg-clip-text ${
                  isDark 
                    ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                    : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
                }`}>Projects</span>
              </h2>
            </div>

            <Link
              to="/projects"
              id="home-view-all-projects-btn"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 self-start sm:self-auto border ${
                isDark
                  ? 'bg-[#0B0B0F] text-[#D4AF37] border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] hover:bg-[#121218] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-white text-[#00A57A] border-[#00C896]/30 hover:border-[#00C896] hover:bg-emerald-50 shadow-sm'
              }`}
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Featured Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {previewProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveProjectModal(project)}
                id={`home-project-preview-${project.id}`}
                className={`group relative rounded-3xl backdrop-blur-xl border overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(124,58,237,0.25)] text-[#F8FAFC]'
                    : 'bg-white/90 border-slate-200/80 hover:border-[#00C896]/50 hover:shadow-[0_15px_45px_rgba(0,200,150,0.15)] text-slate-900'
                }`}
              >
                <div className="relative w-full h-48 overflow-hidden bg-slate-100 dark:bg-[#0B0B0F]">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackType="project"
                    fallbackText={project.title}
                    badge={project.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                      isDark 
                        ? 'bg-black/75 text-[#FFD700] border border-[#D4AF37]/40' 
                        : 'bg-white/90 text-[#00A57A] border border-[#00C896]/30'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight mb-1 group-hover:text-emerald-600 dark:group-hover:text-[#FFD700] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#F8FAFC] line-clamp-2 mb-4 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 dark:border-[rgba(212,175,55,0.2)] flex items-center justify-between text-xs font-bold text-[#00A57A] dark:text-[#D4AF37]">
                      <span>Case Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00A57A] dark:text-[#D4AF37]"
            >
              <span>View All {portfolioConfig.projects.length} Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Experience Preview Section */}
      <section className="relative py-20 border-t border-slate-200/50 dark:border-[rgba(212,175,55,0.2)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark 
                  ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                  : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
              }`}>
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career Track Record</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Work <span className={`text-transparent bg-clip-text ${
                  isDark 
                    ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                    : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
                }`}>Experience</span>
              </h2>
            </div>

            <Link
              to="/experience"
              id="home-view-full-experience-btn"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 self-start sm:self-auto border ${
                isDark
                  ? 'bg-[rgba(15,15,20,0.85)] text-[#D4AF37] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#121218] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'bg-white text-[#00A57A] border-[#00C896]/30 hover:border-[#00C896] hover:bg-emerald-50 shadow-sm'
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
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_25px_rgba(124,58,237,0.2)] text-[#F8FAFC]'
                    : 'bg-white/80 border-slate-200/80 text-slate-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{exp.position}</h3>
                    <p className="text-xs font-semibold text-[#00A57A] dark:text-[#D4AF37]">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-[#F8FAFC]">
                    <Calendar className="w-3.5 h-3.5 text-[#00A57A] dark:text-[#D4AF37]" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#F8FAFC] leading-relaxed mb-3">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-md border ${
                        isDark
                          ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
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
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00A57A] dark:text-[#D4AF37]"
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
            className={`relative p-8 sm:p-12 rounded-3xl backdrop-blur-2xl border text-center overflow-hidden shadow-2xl ${
              isDark
                ? 'bg-gradient-to-b from-[#0B0B0F] to-[#050505] border-[#D4AF37]/30 shadow-[0_0_60px_rgba(212,175,55,0.15)]'
                : 'bg-gradient-to-b from-white to-[#F0FDF4] border-[#00C896]/30 shadow-[0_20px_60px_rgba(0,200,150,0.12)]'
            }`}
          >
            {/* Ambient Background Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none ${
              isDark ? 'bg-[#7C3AED]' : 'bg-[#00C896]'
            }`} />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                isDark 
                  ? 'bg-[#7C3AED]/30 text-[#D4AF37] border border-[#D4AF37]/30' 
                  : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
              }`}>
                <Mail className="w-3.5 h-3.5" />
                <span>Let's Build Something Exceptional</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
                Have an Exciting Project in Mind?
              </h2>

              <p className="text-slate-600 dark:text-[#F8FAFC] text-sm sm:text-base leading-relaxed mb-8">
                Currently open for full-time engineering roles, technical advisory, and bespoke high-performance web development.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onOpenContact}
                  id="home-cta-get-in-touch-btn"
                  className={`px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                      : 'bg-[#00C896] hover:bg-[#00A57A] text-white hover:shadow-[0_8px_25px_rgba(0,200,150,0.4)]'
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
