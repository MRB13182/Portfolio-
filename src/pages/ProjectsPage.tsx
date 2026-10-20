import React, { useState } from 'react';
import { portfolioConfig } from '../config/portfolio';
import { Project, ProjectCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SafeImage } from '../components/common/SafeImage';
import { ProjectModal } from '../components/modals/ProjectModal';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  Search,
  X,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectsPage: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Full Stack', 'AI & SaaS', 'Mobile / Web', 'UI / UX'];

  const filteredProjects = portfolioConfig.projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {/* Page Header */}
      <ScrollReveal direction="up" distance={16} duration={0.5}>
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border ${
            isDark
              ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
              : 'bg-slate-100 text-[#0891B2] border-slate-200'
          }`}>
            <Layers className="w-3.5 h-3.5" />
            <span>Case Studies &amp; Architectures</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-balance">
            Featured{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#22D3EE] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#0891B2] to-[#7C3AED]'
            }`}>
              Projects
            </span>
          </h1>
          
          <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
          }`}>
            Explore complete production platforms, enterprise SaaS suites, and full-stack solutions built with high performance and clean design.
          </p>
        </div>
      </ScrollReveal>

      {/* Search & Category Filter Controls */}
      <ScrollReveal direction="up" distance={14} duration={0.45} delay={0.1}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-[#A1AAB8]' : 'text-slate-400'
            }`} />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="projects-search-input"
              className={`w-full min-h-[44px] pl-10 pr-10 py-2 rounded-xl text-xs sm:text-sm border transition-all outline-none backdrop-blur-md focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                isDark
                  ? 'bg-[#111722]/80 border-white/10 text-white placeholder-slate-500 focus:border-[#22D3EE]'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0891B2]'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className={`inline-flex items-center gap-1 p-1 rounded-xl border backdrop-blur-md overflow-x-auto max-w-full ${
            isDark 
              ? 'bg-[#111722]/70 border-white/[0.08]' 
              : 'bg-white border-slate-200 shadow-xs'
          }`}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  id={`projects-category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`min-h-[36px] px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-black font-bold shadow-xs'
                        : 'bg-gradient-to-r from-[#0891B2] to-[#7C3AED] text-white font-bold shadow-xs'
                      : isDark
                        ? 'text-[#A1AAB8] hover:text-white hover:bg-white/[0.04]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </ScrollReveal>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <ScrollReveal direction="up" distance={15}>
          <div className={`text-center py-16 p-8 rounded-2xl border border-dashed ${
            isDark ? 'border-white/10' : 'border-slate-300'
          }`}>
            <Layers className="w-10 h-10 mx-auto mb-3 text-[#22D3EE]" />
            <h3 className="text-base font-bold mb-1">No projects matched your criteria</h3>
            <p className={`text-xs mb-4 ${isDark ? 'text-[#A1AAB8]' : 'text-slate-500'}`}>
              Try adjusting your search query "{searchQuery}" or select another category filter.
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold hover:underline cursor-pointer text-[#22D3EE] focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-md px-2 py-1"
            >
              Reset Filters
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ 
                duration: 0.45, 
                delay: Math.min(index * 0.08, 0.3),
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              whileHover={{ y: -4 }}
              id={`project-card-${project.id}`}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                isDark
                  ? 'bg-[#111722]/70 border-white/[0.08] hover:border-[#22D3EE]/35 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]'
                  : 'bg-white/85 border-slate-200/90 hover:border-[#0891B2]/40 shadow-[0_6px_20px_-6px_rgba(15,23,42,0.05)]'
              }`}
            >
              <div>
                {/* 1. Project Image Thumbnail */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-slate-950/40"
                  onClick={() => setActiveProjectModal(project)}
                >
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackType="project"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/60 text-[#22D3EE] border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/15 shadow-md">
                      <Eye className="w-3.5 h-3.5 text-[#22D3EE]" /> Case Study
                    </span>
                  </div>
                </div>

                {/* 2. Project Title & 3. Description */}
                <div className="p-5 sm:p-6">
                  <h3 
                    onClick={() => setActiveProjectModal(project)}
                    className={`font-black text-lg sm:text-xl tracking-tight mb-2 cursor-pointer transition-colors ${
                      isDark ? 'text-white group-hover:text-[#22D3EE]' : 'text-slate-900 group-hover:text-[#0891B2]'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 ${
                    isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* 4. Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
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
                    id={`projects-page-live-btn-${project.id}`}
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
                    id={`projects-page-github-btn-${project.id}`}
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
      )}

      {/* Fullscreen Floating Project Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          isOpen={!!activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}

    </div>
  );
};
