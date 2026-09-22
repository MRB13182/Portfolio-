import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { Project } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { ProjectModal } from '../modals/ProjectModal';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  Sparkles, 
  ArrowUpRight,
  Filter,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsSection: React.FC = () => {
  const { isDark } = useTheme();
  const { projects: dbProjects } = usePortfolioData();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const allProjects: Project[] = (dbProjects && dbProjects.length > 0)
    ? dbProjects.map((p: any, idx: number) => ({
        id: p.id || `proj-${idx}`,
        title: p.title,
        tagline: p.tagline || p.category || 'Modern Web Application',
        category: p.category || 'Full Stack',
        description: p.description,
        fullDescription: p.full_description || p.fullDescription || p.description,
        techStack: p.tech_stack || p.techStack || ['React', 'TypeScript', 'Tailwind CSS'],
        image: p.image || '/assets/projects/placeholder.webp',
        gallery: p.gallery || [],
        metrics: p.metrics || [],
        liveUrl: p.live_url || p.liveUrl || 'https://github.com',
        githubUrl: p.github_url || p.githubUrl || 'https://github.com',
        featured: p.featured ?? true,
        order: p.order ?? idx,
      }))
    : portfolioConfig.projects;

  const filterTags = ['All', 'Full Stack', 'Next.js', 'React', 'AI / API', 'TypeScript'];

  const filteredProjects = allProjects.filter((proj) => {
    if (selectedTag === 'All') return true;
    const matchCat = proj.category.toLowerCase().includes(selectedTag.toLowerCase());
    const matchStack = proj.techStack.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
    return matchCat || matchStack;
  });

  return (
    <section id="projects" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark
              ? 'bg-[#8B5CF6]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
              : 'bg-cyan-500/10 text-[#0097A7] border border-[#00E5FF]/30 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
          }`}>
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Case Studies &amp; Software</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Engineering{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#00E5FF] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#00E5FF] to-[#8B5CF6]'
            }`}>
              Portfolio &amp; Projects
            </span>
          </h2>
          
          <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-[#94A3B8]' : 'text-slate-600'
          }`}>
            A curated showcase of full-stack platforms, cloud architectures, and design systems engineered for scale, performance, and accessibility.
          </p>
        </div>

        {/* Filter Tags Bar */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {filterTags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                id={`project-filter-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-[0_0_20px_rgba(0,229,255,0.35)]'
                      : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-white shadow-[0_4px_15px_rgba(0,229,255,0.25)]'
                    : isDark
                      ? 'bg-[#121217]/70 text-[#94A3B8] border border-white/10 hover:text-white hover:border-[#00E5FF]/40'
                      : 'bg-white/80 text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-[#00E5FF]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              id={`project-card-${project.id}`}
              className={`rounded-[30px] backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl ${
                isDark
                  ? 'bg-[#121217]/70 border-white/12 hover:border-[#00E5FF]/60 hover:shadow-[0_12px_40px_rgba(0,229,255,0.2)]'
                  : 'bg-white/85 border-white/60 hover:border-[#00E5FF] hover:shadow-[0_12px_35px_rgba(0,229,255,0.12)]'
              }`}
            >
              <div>
                {/* Project Image Container with Overlay */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                  onClick={() => setActiveProjectModal(project)}
                >
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackType="project"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-[#00E5FF] border border-[#00E5FF]/30">
                      {project.category}
                    </span>
                  </div>

                  {/* View Details Overlay Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-4 py-2 rounded-2xl bg-black/75 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#00E5FF]" /> View Case Study
                    </span>
                  </div>
                </div>

                {/* Project Info & Description */}
                <div className="p-6">
                  <h3 
                    onClick={() => setActiveProjectModal(project)}
                    className={`font-black text-xl tracking-tight mb-2 cursor-pointer transition-colors ${
                      isDark ? 'text-white group-hover:text-[#00E5FF]' : 'text-slate-900 group-hover:text-[#0097A7]'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${
                    isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Technology Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action Buttons (Live Demo + GitHub) */}
              <div className={`p-6 pt-0 flex items-center gap-3 border-t ${
                isDark ? 'border-white/10 pt-4' : 'border-slate-200/80 pt-4'
              }`}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`project-live-btn-${project.id}`}
                    className="flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black font-extrabold shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:opacity-95 active:scale-95"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`project-github-btn-${project.id}`}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      isDark
                        ? 'bg-[#121217] border-white/15 text-white hover:border-[#00E5FF]'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-[#00E5FF]'
                    }`}
                  >
                    <Github className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Case Study Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          isOpen={!!activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
};
