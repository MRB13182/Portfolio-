import React, { useState, useMemo } from 'react';
import { skills as allSkills } from '../config/skills';
import { Skill } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SkillModal } from '../components/modals/SkillModal';
import { TechLogo } from '../components/common/TechLogo';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  Sparkles, 
  Search, 
  Cpu, 
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const SkillsPage: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const categories = [
    { id: 'All', label: 'All Skills' },
    { id: 'Frontend Development', label: 'Frontend' },
    { id: 'Backend Development', label: 'Backend' },
    { id: 'Database', label: 'Database' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'UI/UX & Design', label: 'UI/UX & Design' }
  ];

  const categoryOrder = [
    'Frontend Development',
    'Backend Development',
    'Database',
    'Cloud & DevOps',
    'UI/UX & Design'
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
      const matchesName = skill.name.toLowerCase().includes(q);
      const matchesCat = skill.category.toLowerCase().includes(q);
      const matchesDesc = skill.description.toLowerCase().includes(q);
      const matchesKeywords = skill.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false;
      const matchesProjects = skill.projects?.some((p) => p.toLowerCase().includes(q)) ?? false;

      return matchesName || matchesCat || matchesDesc || matchesKeywords || matchesProjects;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Header */}
      <ScrollReveal direction="up" distance={18} duration={0.55}>
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
              isDark
                ? 'bg-[#8B5CF6]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                : 'bg-cyan-500/10 text-[#0097A7] border border-[#00E5FF]/30 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Competency Index</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Technical Skills &amp;{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#00E5FF] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#00E5FF] to-[#8B5CF6]'
            }`}>
              Architecture Stack
            </span>
          </h1>
          
          <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-[#94A3B8]' : 'text-slate-600'
          }`}
          >
            Over 44+ production-tested technologies, frameworks, databases, DevOps pipelines, and UI/UX design tools with verified mastery metrics.
          </p>
        </div>
      </ScrollReveal>

      {/* Search & Category Filter Controls */}
      <ScrollReveal direction="up" distance={15} duration={0.5} delay={0.1}>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 sm:mb-12">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-84">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search by skill, category, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="skills-search-input"
              className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs sm:text-sm border transition-all outline-none backdrop-blur-2xl ${
                isDark
                  ? 'bg-[#121217]/80 border-white/10 text-white placeholder-white/40 focus:border-[#00E5FF]'
                  : 'bg-white/90 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00E5FF]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className={`flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-2xl overflow-x-auto scrollbar-none max-w-full ${
            isDark 
              ? 'bg-[#121217]/70 border-white/10' 
              : 'bg-white/85 border-slate-200'
          }`}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`skills-category-filter-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                        : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-white shadow-[0_2px_10px_rgba(0,229,255,0.2)]'
                      : isDark
                        ? 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>
      </ScrollReveal>

      {/* Skills Grid Rendering */}
      {filteredSkills.length === 0 ? (
        <div className={`text-center py-20 p-8 rounded-[32px] border border-dashed ${
          isDark ? 'border-white/15' : 'border-slate-300'
        }`}>
          <Cpu className="w-12 h-12 mx-auto mb-3 text-[#00E5FF]" />
          <h3 className="text-base font-bold mb-1">No technical skills matching your search</h3>
          <p className={`text-xs mb-4 ${isDark ? 'text-[#94A3B8]' : 'text-slate-500'}`}>
            Try adjusting your search query "{searchQuery}" or choose another category filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-xs font-bold hover:underline cursor-pointer text-[#00E5FF]"
          >
            Reset Filters
          </button>
        </div>
      ) : selectedCategory === 'All' && !searchQuery ? (
        /* Section-Wise Categorized Layout */
        <div className="space-y-12 sm:space-y-16">
          {categoryOrder.map((group) => {
            const groupSkills = allSkills.filter(s => s.category === group);
            if (groupSkills.length === 0) return null;

            return (
              <ScrollReveal key={group} direction="up" distance={15} duration={0.5}>
                <div className="space-y-5">
                  {/* Category Section Heading */}
                  <div className={`flex items-center justify-between border-b pb-3 ${
                    isDark ? 'border-white/10' : 'border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {group}
                      </h2>
                      <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                        {groupSkills.length} Skills
                      </span>
                    </div>
                  </div>

                  {/* Minimal Glass Prism Skill Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
                    {groupSkills.map((skill, index) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        index={index}
                        isDark={isDark}
                        onClick={() => setActiveSkillModal(skill)}
                      />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        /* Filtered Grid View */
        <div>
          <div className={`mb-4 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Showing {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                isDark={isDark}
                onClick={() => setActiveSkillModal(skill)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Floating Skill Detail Modal */}
      {activeSkillModal && (
        <SkillModal
          skill={activeSkillModal}
          isOpen={!!activeSkillModal}
          onClose={() => setActiveSkillModal(null)}
        />
      )}

    </div>
  );
};

interface SkillCardProps {
  skill: Skill;
  index: number;
  isDark: boolean;
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, isDark, onClick }) => {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -25px 0px', amount: 0.1 }}
      transition={{ 
        duration: 0.45, 
        delay: Math.min(index * 0.025, 0.25),
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      id={`skill-card-${skill.id}`}
      aria-label={`Open details for ${skill.name}`}
      className={`group relative p-4 sm:p-5 rounded-[26px] border backdrop-blur-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center shadow-lg ${
        isDark
          ? 'bg-[#121217]/75 border-white/10 hover:border-[#00E5FF]/60 hover:shadow-[0_8px_30px_rgba(0,229,255,0.2)] text-white'
          : 'bg-white/85 border-white/60 hover:border-[#00E5FF] hover:shadow-[0_8px_25px_rgba(0,229,255,0.12)] text-slate-800 shadow-sm'
      }`}
    >
      {/* Official Technology Logo */}
      <div 
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
          isDark
            ? 'bg-[#15151E] border border-white/15 group-hover:border-[#00E5FF]/50'
            : 'bg-cyan-50/80 border border-[#00E5FF]/20 group-hover:border-[#00E5FF]'
        }`}
      >
        <TechLogo 
          logo={skill.logo || skill.id} 
          size={30} 
          className="w-7 h-7 sm:w-8 sm:h-8" 
        />
      </div>

      {/* Skill Name */}
      <h3 className={`font-extrabold text-xs sm:text-sm leading-tight mb-2 truncate max-w-full transition-colors ${
        isDark ? 'group-hover:text-[#00E5FF]' : 'group-hover:text-[#0097A7]'
      }`}>
        {skill.name}
      </h3>

      {/* Percentage Badge */}
      <div 
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black font-mono tracking-tight transition-all duration-300 ${
          isDark
            ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 group-hover:bg-[#00E5FF] group-hover:text-black'
            : 'bg-cyan-50 text-[#0097A7] border border-[#00E5FF]/30 group-hover:bg-[#00E5FF] group-hover:text-black'
        }`}
      >
        <span>{skill.level}%</span>
      </div>
    </motion.button>
  );
};
