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
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';

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
        image: p.image || `/projects/project-${(idx % 6) + 1}.webp`,
        gallery: p.gallery || [],
        metrics: p.metrics || [],
        liveUrl: p.live_url || p.liveUrl || 'https://github.com/MRB13182',
        githubUrl: p.github_url || p.githubUrl || 'https://github.com/MRB13182',
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
    <section id="projects" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border ${
            isDark
              ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
              : 'bg-slate-100 text-[#0891B2] border-slate-200'
          }`}>
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Case Studies &amp; Software</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
            Engineering{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#22D3EE] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#0891B2] to-[#7C3AED]'
            }`}>
              Portfolio &amp; Projects
            </span>
          </h2>
          
          <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
          }`}>
            A curated showcase of full-stack platforms, cloud architectures, and design systems engineered for scale, performance, and accessibility.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center justify-center gap-1.5 mb-10 flex-wrap">
          {filterTags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                id={`project-filter-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-bold shadow-sm shadow-cyan-500/20'
                      : 'bg-gradient-to-r from-[#0891B2] to-[#7C3AED] text-white font-bold shadow-xs'
                    : isDark
                      ? 'bg-[#111722]/70 text-[#A1AAB8] border border-white/[0.07] hover:text-white hover:border-white/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-xs'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Projects Grid (Tier B Standard Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.3) }}
              whileHover={{ y: -4 }}
              id={`project-card-${project.id}`}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                isDark
                  ? 'bg-[#111722]/70 border-white/[0.08] hover:border-[#22D3EE]/35 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]'
                  : 'bg-white/85 border-slate-200/90 hover:border-[#0891B2]/40 shadow-[0_6px_20px_-6px_rgba(15,23,42,0.05)]'
              }`}
            >
              <div>
                {/* 1. Project Image Container with Subtle Zoom */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-slate-950/40"
                  onClick={() => setActiveProjectModal(project)}
                >
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackType="project"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />
                  
                  {/* Category Chip */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/60 text-[#22D3EE] border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* View Details Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/15 shadow-md">
                      <Eye className="w-3.5 h-3.5 text-[#22D3EE]" /> Case Study
                    </span>
                  </div>
                </div>

                {/* 2. Project Title & 3. Concise Description */}
                <div className="p-5 sm:p-6">
                  <h3 
                    onClick={() => setActiveProjectModal(project)}
                    className={`font-black text-lg sm:text-xl tracking-tight mb-2 cursor-pointer transition-colors ${
                      isDark ? 'text-white group-hover:text-[#22D3EE]' : 'text-slate-900 group-hover:text-[#0891B2]'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${
                    isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* 4. Technology Tags (Tier C Subtle Surface) */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                          isDark
                            ? 'bg-white/[0.04] border-white/[0.07] text-slate-300'
                            : 'bg-slate-100/90 border-slate-200 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Live Demo and GitHub Action Buttons */}
              <div className={`p-5 sm:p-6 pt-0 flex items-center gap-3 border-t ${
                isDark ? 'border-white/[0.06] pt-4' : 'border-slate-200/80 pt-4'
              }`}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`project-live-btn-${project.id}`}
                    className="flex-1 min-h-[40px] py-2 px-3.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black hover:opacity-95 active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none"
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
                    className={`min-h-[40px] py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
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
