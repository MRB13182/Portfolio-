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
  ArrowUpRight, 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Header */}
      <ScrollReveal direction="up" distance={18} duration={0.55}>
        <div className="flex flex-col items-center text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
            isDark
              ? 'bg-[#8B5CF6]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
              : 'bg-cyan-500/10 text-[#0097A7] border border-[#00E5FF]/30 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
          }`}>
            <Layers className="w-4 h-4" />
            <span>Case Studies &amp; Architectures</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Featured{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#00E5FF] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#00E5FF] to-[#8B5CF6]'
            }`}>
              Projects
            </span>
          </h1>
          
          <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-[#94A3B8]' : 'text-slate-600'
          }`}>
            Explore complete production platforms, enterprise SaaS suites, and full-stack solutions built with high performance and clean design.
          </p>
        </div>
      </ScrollReveal>

      {/* Search & Category Filter Controls */}
      <ScrollReveal direction="up" distance={15} duration={0.5} delay={0.1}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="projects-search-input"
              className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs sm:text-sm border transition-all outline-none backdrop-blur-2xl ${
                isDark
                  ? 'bg-[#121217]/80 border-white/10 text-white placeholder-white/50 focus:border-[#00E5FF]'
                  : 'bg-white/90 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className={`inline-flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-2xl overflow-x-auto max-w-full ${
            isDark 
              ? 'bg-[#121217]/70 border-white/10' 
              : 'bg-white/85 border-slate-200'
          }`}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  id={`projects-category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                        : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-white shadow-[0_2px_10px_rgba(0,229,255,0.2)]'
                      : isDark
                        ? 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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
          <div className={`text-center py-20 p-8 rounded-[32px] border border-dashed ${
            isDark ? 'border-white/15' : 'border-slate-300'
          }`}>
            <Layers className="w-12 h-12 mx-auto mb-3 text-[#00E5FF]" />
            <h3 className="text-base font-bold mb-1">No projects matched your criteria</h3>
            <p className={`text-xs mb-4 ${isDark ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
              Try adjusting your search query "{searchQuery}" or select another category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold hover:underline cursor-pointer text-[#00E5FF]"
            >
              Reset Filters
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px', amount: 0.15 }}
              transition={{ 
                duration: 0.55, 
                delay: Math.min(index * 0.08, 0.35),
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              whileHover={{ y: -6 }}
              id={`project-card-${project.id}`}
              className={`rounded-[30px] backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl ${
                isDark
                  ? 'bg-[#121217]/70 border-white/12 hover:border-[#00E5FF]/60 hover:shadow-[0_12px_40px_rgba(0,229,255,0.2)]'
                  : 'bg-white/85 border-white/60 hover:border-[#00E5FF] hover:shadow-[0_12px_35px_rgba(0,229,255,0.12)]'
              }`}
            >
              <div>
                {/* Project Image Thumbnail */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black/40"
                  onClick={() => setActiveProjectModal(project)}
                >
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackType="project"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-[#00E5FF] border border-[#00E5FF]/30">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="px-4 py-2 rounded-2xl bg-black/75 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#00E5FF]" /> View Case Study
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 
                    onClick={() => setActiveProjectModal(project)}
                    className={`font-black text-xl tracking-tight mb-2 cursor-pointer transition-colors ${
                      isDark ? 'text-white group-hover:text-[#00E5FF]' : 'text-slate-900 group-hover:text-[#0097A7]'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 ${
                    isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
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

              {/* Bottom Card Actions (Live Demo + GitHub) */}
              <div className={`p-6 pt-0 flex items-center gap-3 border-t ${
                isDark ? 'border-white/10 pt-4' : 'border-slate-200/80 pt-4'
              }`}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`projects-page-live-btn-${project.id}`}
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
                    id={`projects-page-github-btn-${project.id}`}
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
