import React, { useState } from 'react';
import { portfolioConfig } from '../config/portfolio';
import { Project, ProjectCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SafeImage } from '../components/common/SafeImage';
import { ProjectModal } from '../components/modals/ProjectModal';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Search,
  X
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
          isDark
            ? 'bg-[#7B2CFF]/20 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
            : 'bg-emerald-500/10 text-[#12D6A0] border border-emerald-500/25 shadow-[0_2px_12px_rgba(18,214,160,0.15)]'
        }`}>
          <Layers className="w-4 h-4" />
          <span>Case Studies &amp; Architectures</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          Featured{' '}
          <span className={`text-transparent bg-clip-text ${
            isDark
              ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#F5D06F]'
              : 'bg-gradient-to-r from-slate-900 via-[#12D6A0] to-[#0EB385]'
          }`}>
            Projects
          </span>
        </h1>
        
        <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
          isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
        }`}>
          Explore complete production platforms, enterprise SaaS suites, and full-stack solutions built with high performance and clean design.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
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
                ? 'bg-[#0A0A0A] border-[rgba(212,175,55,0.25)] text-[#FFFFFF] placeholder-white/50 focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.25)] focus:ring-1 focus:ring-[#D4AF37]'
                : 'bg-white/90 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#12D6A0] focus:shadow-[0_2px_15px_rgba(18,214,160,0.2)] focus:ring-1 focus:ring-[#12D6A0]'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-[#F5D06F]' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className={`inline-flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-2xl overflow-x-auto max-w-full ${
          isDark 
            ? 'bg-[#0A0A0A] border-[rgba(212,175,55,0.25)]' 
            : 'bg-white/85 border-slate-200'
        }`}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                id={`projects-category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D06F] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-gradient-to-r from-[#12D6A0] to-[#0EB385] text-slate-950 shadow-[0_4px_15px_rgba(18,214,160,0.3)]'
                    : isDark
                      ? 'text-[#FFFFFF] hover:text-[#F5D06F] hover:bg-white/5'
                      : 'text-slate-700 hover:text-[#12D6A0] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className={`text-center py-20 p-8 rounded-[32px] border border-dashed ${
          isDark ? 'border-[rgba(212,175,55,0.25)]' : 'border-slate-300'
        }`}>
          <Layers className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'}`} />
          <h3 className="text-base font-bold mb-1">No projects matched your criteria</h3>
          <p className={`text-xs mb-4 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
            Try adjusting your search query "{searchQuery}" or select another category filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className={`text-xs font-bold hover:underline cursor-pointer ${
              isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
            }`}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveProjectModal(project)}
              id={`project-card-${project.id}`}
              className={`group relative rounded-[32px] backdrop-blur-2xl border overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer shadow-lg ${
                isDark
                  ? 'bg-[#0A0A0A] border-[rgba(212,175,55,0.22)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(123,44,255,0.25)] text-[#FFFFFF]'
                  : 'bg-white/85 border-[rgba(18,214,160,0.2)] hover:border-[#12D6A0] hover:shadow-[0_12px_30px_rgba(18,214,160,0.15)] text-slate-800 shadow-sm'
              }`}
            >
              {/* Project Image Thumbnail */}
              <div className={`relative w-full h-52 sm:h-56 overflow-hidden ${isDark ? 'bg-[#0B0B0F]' : 'bg-slate-100'}`}>
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  fallbackType="project"
                  fallbackText={project.title}
                  badge={project.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-md ${
                    isDark
                      ? 'bg-[#050505]/90 text-[#F5D06F] border border-[#D4AF37]/40'
                      : 'bg-white/90 text-[#12D6A0] border border-[#12D6A0]/30'
                  }`}>
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md ${
                    isDark
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-[#12D6A0] text-slate-950 shadow-[0_4px_15px_rgba(18,214,160,0.4)]'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className={`text-xl font-extrabold tracking-tight mb-2 transition-colors line-clamp-1 ${
                    isDark ? 'group-hover:text-[#F5D06F]' : 'group-hover:text-[#12D6A0]'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 ${
                    isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
                  }`}>
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-xl border ${
                          isDark
                            ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#FFFFFF]'
                            : 'bg-emerald-50/70 border-emerald-200/80 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className={`text-[10px] font-mono px-2 py-1 ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                      }`}>
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className={`pt-3 border-t flex items-center justify-between ${
                    isDark ? 'border-[rgba(212,175,55,0.25)]' : 'border-slate-200'
                  }`}>
                    <span className={`text-xs font-bold flex items-center gap-1 group-hover:underline ${
                      isDark ? 'text-[#D4AF37]' : 'text-[#12D6A0]'
                    }`}>
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
                          className={`p-1.5 rounded-xl transition-colors ${
                            isDark ? 'text-[#FFFFFF] hover:text-[#F5D06F]' : 'text-slate-600 hover:text-[#12D6A0]'
                          }`}
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
                          className={`p-1.5 rounded-xl transition-colors ${
                            isDark ? 'text-[#FFFFFF] hover:text-[#F5D06F]' : 'text-slate-600 hover:text-[#12D6A0]'
                          }`}
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
      )}

      {/* Fullscreen Floating Project Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />

    </div>
  );
};
