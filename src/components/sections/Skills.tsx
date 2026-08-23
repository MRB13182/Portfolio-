import React, { useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { skills as allSkills } from '../../config/skills';
import { Skill } from '../../types';
import { SkillModal } from '../modals/SkillModal';
import { TechLogo } from '../common/TechLogo';
import { 
  Search, 
  X, 
  Sparkles, 
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';

export const Skills: React.FC = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const categories = [
    { id: 'All', label: 'All Skills' },
    { id: 'Frontend Development', label: 'Frontend' },
    { id: 'Backend Development', label: 'Backend' },
    { id: 'Database', label: 'Database' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'UI/UX & Design', label: 'UI/UX & Design' },
  ];

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory = 
        selectedCategory === 'All' || 
        skill.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'Frontend Development' && skill.category.toLowerCase().includes('frontend')) ||
        (selectedCategory === 'Backend Development' && skill.category.toLowerCase().includes('backend')) ||
        (selectedCategory === 'Cloud & DevOps' && (skill.category.toLowerCase().includes('cloud') || skill.category.toLowerCase().includes('devops'))) ||
        (selectedCategory === 'UI/UX & Design' && (skill.category.toLowerCase().includes('design') || skill.category.toLowerCase().includes('ui')));

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        skill.name.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        (skill.keywords?.some(k => k.toLowerCase().includes(q)) ?? false) ||
        (skill.projects?.some(p => p.toLowerCase().includes(q)) ?? false);

      return matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="skills" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark 
              ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
              : 'bg-emerald-500/10 text-[#00A57A] border border-[#00C896]/20 shadow-[0_4px_15px_rgba(0,200,150,0.1)]'
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
          <p className="text-slate-600 dark:text-[#F8FAFC] max-w-2xl text-base sm:text-lg">
            Interactive skill catalog featuring 44+ production-tested technologies. Click any skill to explore architectural highlights and production projects.
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
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-[#00C896] text-white shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
                      : isDark
                        ? 'bg-[rgba(15,15,20,0.65)] text-[#F8FAFC] hover:text-[#FFD700] border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/50'
                        : 'bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-300" />
            <input
              type="text"
              id="skill-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill, react, node..."
              className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-xs font-medium border focus:outline-none transition-all ${
                isDark
                  ? 'bg-[rgba(15,15,20,0.65)] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] placeholder-white/40 focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.25)] focus:ring-1 focus:ring-[#D4AF37]'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896] focus:shadow-[0_2px_15px_rgba(0,200,150,0.15)]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                id="skill-search-clear-btn"
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-[#F8FAFC] dark:hover:text-[#FFD700]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Skills Grid - Glass Prism Style */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-slate-300 dark:border-[rgba(212,175,55,0.25)]">
            <Cpu className="w-12 h-12 mx-auto text-slate-400 dark:text-[#D4AF37] mb-3" />
            <h4 className="font-bold text-lg mb-1">No technologies match "{searchQuery}"</h4>
            <p className="text-xs text-slate-500 dark:text-[#F8FAFC] mb-4">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00C896] dark:bg-[#D4AF37] text-white dark:text-black cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSkillModal(skill)}
                id={`skill-card-${skill.id}`}
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '28px',
                }}
                className={`group relative p-4 sm:p-5 border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center ${
                  isDark
                    ? 'bg-[rgba(12,12,16,0.6)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/70 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] text-[#F8FAFC]'
                    : 'bg-[rgba(255,255,255,0.35)] border-[rgba(0,200,150,0.25)] hover:border-[#00C896]/70 hover:shadow-[0_10px_25px_rgba(0,200,150,0.18)] text-slate-900'
                }`}
              >
                {/* Ambient Glow */}
                <div 
                  style={{
                    backgroundColor: skill.accentColor || (isDark ? '#7C3AED' : '#00C896'),
                  }}
                  className="absolute -right-8 -bottom-8 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none" 
                />

                {/* Tech Icon Container */}
                <div 
                  style={{
                    borderRadius: '20px',
                  }}
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-[20px] flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                    isDark 
                      ? 'bg-[#15151E] border border-[rgba(212,175,55,0.2)] group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]' 
                      : 'bg-white border border-slate-200/80 group-hover:border-[#00C896]/50 group-hover:shadow-[0_4px_15px_rgba(0,200,150,0.2)]'
                  }`}
                >
                  <TechLogo logo={skill.logo || skill.id} size={32} className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                {/* Skill Name */}
                <h3 className="font-extrabold text-xs sm:text-sm leading-tight mb-2 truncate max-w-full group-hover:text-[#00A57A] dark:group-hover:text-[#FFD700] transition-colors">
                  {skill.name}
                </h3>

                {/* Percentage Badge */}
                <div 
                  style={{
                    borderRadius: '9999px',
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black font-mono tracking-tight transition-all ${
                    isDark
                      ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-black'
                      : 'bg-emerald-500/10 text-[#00A57A] border border-emerald-500/20 group-hover:bg-[#00C896] group-hover:text-white'
                  }`}
                >
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
