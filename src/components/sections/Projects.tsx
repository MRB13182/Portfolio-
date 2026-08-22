import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { Project, ProjectCategory } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { ProjectModal } from '../modals/ProjectModal';
import { 
  Sparkles, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Layers, 
  Code2, 
  SlidersHorizontal 
} from 'lucide-react';
import { motion } from 'motion/react';

export const Projects: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Full Stack', 'AI & SaaS', 'Mobile / Web', 'UI / UX'];

  const filteredProjects = portfolioConfig.projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark 
              ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
              : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio &amp; Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Crafted with Passion &amp;{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark 
                ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
            }`}>
              Precision Engineering
            </span>
          </h2>
          <p className="text-slate-600 dark:text-[#F8FAFC] max-w-2xl text-base sm:text-lg">
            A curated collection of production web applications, enterprise SaaS solutions, and bespoke digital luxury experiences.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl border backdrop-blur-md overflow-x-auto max-w-full bg-white/50 dark:bg-[rgba(15,15,20,0.85)] border-slate-200/80 dark:border-[rgba(212,175,55,0.25)]">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  id={`project-category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-[#00C896] text-white shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
                      : isDark
                        ? 'text-[#F8FAFC]/70 hover:text-[#F8FAFC] hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-3xl backdrop-blur-xl border overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer shadow-lg ${
                isDark
                  ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)] text-[#F8FAFC]'
                  : 'bg-white/90 border-slate-200/80 hover:border-[#00C896]/50 hover:shadow-[0_15px_45px_rgba(0,200,150,0.15)] text-slate-900'
              }`}
              onClick={() => setActiveProjectModal(project)}
              id={`project-card-${project.id}`}
            >
              {/* Project Image Thumbnail */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100 dark:bg-[#0B0B0F]">
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  fallbackType="project"
                  fallbackText={project.title}
                  badge={project.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Category Badge overlay */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-md ${
                    isDark 
                      ? 'bg-[#050505]/85 text-[#FFD700] border border-[#D4AF37]/40' 
                      : 'bg-white/80 text-[#00A57A] border border-[#00C896]/30'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Direct Action Overlay Quick Trigger */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md ${
                    isDark ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#00C896] text-white'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-[#FFD700] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#F8FAFC] line-clamp-2 leading-relaxed mb-4">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border ${
                          isDark
                            ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-2 py-1 text-slate-400 dark:text-[#F8FAFC]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-[rgba(212,175,55,0.2)] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00A57A] dark:text-[#D4AF37] flex items-center gap-1 group-hover:underline">
                      Explore Case Study
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-[#F8FAFC] dark:hover:text-[#FFD700] transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-[#F8FAFC] dark:hover:text-[#FFD700] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Floating Project Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
