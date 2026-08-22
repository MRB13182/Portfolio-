import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioConfig } from '../config/portfolio';
import { Skill, SkillCategory } from '../types';
import { SkillModal } from '../components/modals/SkillModal';
import { 
  Sparkles, 
  Search, 
  Cpu, 
  Layers, 
  Database, 
  Cloud, 
  Smartphone, 
  Palette, 
  Terminal,
  Code2,
  CheckCircle2,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

export const SkillsPage: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Mobile & UI', 'DevOps & Tools'];

  const getSkillIcon = (category: string, name: string) => {
    switch (category.toLowerCase()) {
      case 'frontend': return Code2;
      case 'backend': return Terminal;
      case 'database': return Database;
      case 'mobile & ui': return Smartphone;
      case 'devops & tools': return Cloud;
      default: return Cpu;
    }
  };

  const filteredSkills = portfolioConfig.skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group skills by category if 'All' is selected, or display list
  const categoryGroups = Array.from(new Set(portfolioConfig.skills.map(s => s.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
          isDark 
            ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
            : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20 shadow-[0_4px_15px_rgba(0,200,150,0.1)]'
        }`}>
          <Cpu className="w-4 h-4" />
          <span>Technical Competencies Matrix</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          Skills &amp;{' '}
          <span className={`text-transparent bg-clip-text ${
            isDark 
              ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
              : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
          }`}>
            Expertise
          </span>
        </h1>
        
        <p className="text-slate-600 dark:text-[#F8FAFC] max-w-2xl text-base sm:text-lg leading-relaxed">
          Comprehensive inventory of full-stack software development languages, frameworks, cloud platforms, and architecture patterns.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#F8FAFC]" />
          <input
            type="text"
            placeholder="Search skills, tech, frameworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="skills-search-input"
            className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs sm:text-sm border transition-all outline-none ${
              isDark
                ? 'bg-[rgba(15,15,20,0.85)] border-[#7C3AED]/40 text-[#F8FAFC] placeholder-white/50 focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.25)] focus:ring-1 focus:ring-[#D4AF37]'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896] focus:ring-1 focus:ring-[#00C896]'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-[#F8FAFC] dark:hover:text-[#FFD700]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-md overflow-x-auto max-w-full bg-white/60 dark:bg-[rgba(15,15,20,0.85)] border-slate-200/80 dark:border-[rgba(212,175,55,0.25)]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                id={`skills-category-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-[#00C896] text-white shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
                    : isDark
                      ? 'text-[#F8FAFC] hover:text-[#FFD700] hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl border border-dashed border-slate-300 dark:border-[rgba(212,175,55,0.25)]">
          <Cpu className="w-12 h-12 mx-auto text-slate-400 dark:text-[#D4AF37] mb-3" />
          <h3 className="text-base font-bold mb-1">No technical skills found</h3>
          <p className="text-xs text-slate-500 dark:text-[#F8FAFC] mb-4">
            Try adjusting your search query "{searchQuery}" or select another category filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-xs font-bold text-[#00A57A] dark:text-[#D4AF37] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : selectedCategory === 'All' && !searchQuery ? (
        /* Categorized Sections for Clean Overview */
        <div className="space-y-12">
          {categoryGroups.map((group) => {
            const groupSkills = portfolioConfig.skills.filter(s => s.category === group);
            if (groupSkills.length === 0) return null;

            return (
              <div key={group} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-[rgba(212,175,55,0.25)] pb-3">
                  <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                    {group}
                  </h2>
                  <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full border ${
                    isDark ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.3)] text-[#D4AF37]' : 'bg-emerald-50 border-emerald-200 text-[#00A57A]'
                  }`}>
                    {groupSkills.length} Technologies
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {groupSkills.map((skill, index) => {
                    const Icon = getSkillIcon(skill.category, skill.name);
                    return (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        whileHover={{ y: -4, scale: 1.04 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSkillModal(skill)}
                        id={`skill-card-${skill.id}`}
                        className={`group relative p-4 sm:p-5 rounded-[22px] backdrop-blur-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center ${
                          isDark
                            ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] text-[#F8FAFC]'
                            : 'bg-white/90 border-slate-200/80 hover:border-[#00C896]/60 hover:shadow-[0_10px_25px_rgba(0,200,150,0.15)] text-slate-900'
                        }`}
                      >
                        {/* Ambient Glow */}
                        <div className={`absolute -right-6 -bottom-6 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity ${
                          isDark ? 'bg-[#7C3AED]' : 'bg-[#00C896]'
                        }`} />

                        {/* Tech Icon Container */}
                        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm ${
                          isDark 
                            ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]' 
                            : 'bg-emerald-50 text-[#00A57A] border border-emerald-200 group-hover:shadow-[0_0_15px_rgba(0,200,150,0.25)]'
                        }`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>

                        {/* Skill Name */}
                        <h3 className="font-extrabold text-xs sm:text-sm md:text-base leading-tight mb-2 truncate max-w-full group-hover:text-emerald-600 dark:group-hover:text-[#FFD700] transition-colors">
                          {skill.name}
                        </h3>

                        {/* Percentage Badge */}
                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black font-mono tracking-tight transition-all ${
                          isDark
                            ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-black'
                            : 'bg-emerald-500/10 text-[#00A57A] border border-emerald-500/20 group-hover:bg-[#00C896] group-hover:text-white'
                        }`}>
                          <span>{skill.level}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Filtered Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredSkills.map((skill, index) => {
            const Icon = getSkillIcon(skill.category, skill.name);
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSkillModal(skill)}
                id={`skill-card-${skill.id}`}
                className={`group relative p-4 sm:p-5 rounded-[22px] backdrop-blur-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_25px_rgba(124,58,237,0.25)] text-[#F8FAFC]'
                    : 'bg-white/90 border-slate-200/80 hover:border-[#00C896]/60 hover:shadow-[0_10px_25px_rgba(0,200,150,0.15)] text-slate-900'
                }`}
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm ${
                  isDark 
                    ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]' 
                    : 'bg-emerald-50 text-[#00A57A] border border-emerald-200 group-hover:shadow-[0_0_15px_rgba(0,200,150,0.25)]'
                }`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h3 className="font-extrabold text-xs sm:text-sm md:text-base leading-tight mb-2 truncate max-w-full group-hover:text-emerald-600 dark:group-hover:text-[#FFD700] transition-colors">
                  {skill.name}
                </h3>

                <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black font-mono tracking-tight transition-all ${
                  isDark
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-black'
                    : 'bg-emerald-500/10 text-[#00A57A] border border-emerald-500/20 group-hover:bg-[#00C896] group-hover:text-white'
                }`}>
                  <span>{skill.level}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Interactive Detail Modal */}
      <SkillModal
        skill={activeSkillModal}
        onClose={() => setActiveSkillModal(null)}
      />

    </div>
  );
};
