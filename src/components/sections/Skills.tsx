import React, { useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { Skill, SkillCategory } from '../../types';
import { SkillModal } from '../modals/SkillModal';
import { 
  Search, 
  X, 
  Sparkles, 
  Cpu, 
  Layers, 
  Code2, 
  Database, 
  Layout, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

export const Skills: React.FC = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const categories: Array<{ id: string; label: string }> = [
    { id: 'All', label: 'All Tech' },
    { id: 'Frontend', label: 'Frontend' },
    { id: 'Backend', label: 'Backend' },
    { id: 'Database', label: 'Database' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'Design & Tools', label: 'Design & UI/UX' },
  ];

  const filteredSkills = useMemo(() => {
    return portfolioConfig.skills.filter((skill) => {
      const matchesSearch = 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="skills" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark 
              ? 'bg-[#6D28D9]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
              : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Competency Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Mastered Stacks &amp;{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark 
                ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]' 
                : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
            }`}>
              Engineering Capabilities
            </span>
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg">
            Interactive skill catalog. Click any technology to explore architectural highlights, experience duration, and production projects.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`skill-filter-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-[#6D28D9] to-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-[#00C896] text-white shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
                      : isDark
                        ? 'bg-[rgba(15,15,20,0.85)] text-[#A1A1AA] hover:text-white border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/50'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#A1A1AA]" />
            <input
              type="text"
              id="skill-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill, react, node..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                isDark
                  ? 'bg-[rgba(15,15,20,0.85)] border-[#6D28D9]/40 text-[#F8FAFC] placeholder-[#A1A1AA] focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.25)] focus:ring-1 focus:ring-[#D4AF37]'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896] focus:shadow-[0_2px_15px_rgba(0,200,150,0.15)]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                id="skill-search-clear-btn"
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-[#A1A1AA] dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Skills Grid - Simplified Apple Minimalist Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-slate-300 dark:border-zinc-800">
            <Cpu className="w-12 h-12 mx-auto text-slate-400 dark:text-zinc-600 mb-3" />
            <h4 className="font-bold text-lg mb-1">No technologies match "{searchQuery}"</h4>
            <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mb-4">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00C896] dark:bg-[#D4AF37] text-white dark:text-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSkillModal(skill)}
                id={`skill-card-${skill.id}`}
                className={`group relative p-4 sm:p-5 rounded-[24px] backdrop-blur-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center ${
                  isDark
                    ? 'bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_25px_rgba(109,40,217,0.25)] text-white'
                    : 'bg-white/90 border-slate-200/80 hover:border-[#00C896]/60 hover:shadow-[0_10px_25px_rgba(0,200,150,0.15)] text-slate-900'
                }`}
              >
                {/* Ambient Glow */}
                <div className={`absolute -right-6 -bottom-6 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity ${
                  isDark ? 'bg-[#6D28D9]' : 'bg-[#00C896]'
                }`} />

                {/* Tech Icon Container */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm ${
                  isDark 
                    ? 'bg-[#6D28D9]/20 text-[#A855F7] border border-[#6D28D9]/30 group-hover:shadow-[0_0_15px_rgba(109,40,217,0.35)]' 
                    : 'bg-emerald-50 text-[#00A57A] border border-emerald-200 group-hover:shadow-[0_0_15px_rgba(0,200,150,0.25)]'
                }`}>
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
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
            ))}
          </div>
        )}

      </div>

      {/* Floating Skill Modal */}
      <SkillModal
        skill={activeSkillModal}
        onClose={() => setActiveSkillModal(null)}
      />
    </section>
  );
};
