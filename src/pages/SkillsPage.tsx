import React, { useState, useMemo } from 'react';
import { skills as allSkills } from '../config/skills';
import { Skill } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SkillModal } from '../components/modals/SkillModal';
import { TechLogo } from '../components/common/TechLogo';
import { 
  Sparkles, 
  Search, 
  Cpu, 
  X
} from 'lucide-react';
import { motion } from 'motion/react';

export const SkillsPage: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const categories = [
    { id: 'All', label: 'All Skills' },
    { id: 'Frontend Development', label: 'Frontend Development' },
    { id: 'Backend Development', label: 'Backend Development' },
    { id: 'Database', label: 'Database' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'UI/UX & Design', label: 'UI/UX & Design' }
  ];

  // Category order for grouped view
  const categoryOrder = [
    'Frontend Development',
    'Backend Development',
    'Database',
    'Cloud & DevOps',
    'UI/UX & Design'
  ];

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      // Category check
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
            isDark
              ? 'bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
              : 'bg-emerald-500/10 text-[#00A57A] border border-emerald-500/25 shadow-[0_2px_12px_rgba(0,200,150,0.15)]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Competency Index</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
        >
          Technical Skills &amp;{' '}
          <span className={`text-transparent bg-clip-text ${
            isDark
              ? 'bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]'
              : 'bg-gradient-to-r from-slate-900 via-[#00A57A] to-[#00C896]'
          }`}>
            Architecture Stack
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-[#A1A1AA]' : 'text-slate-600'
          }`}
        >
          Over 44+ production-tested technologies, frameworks, databases, DevOps pipelines, and UI/UX design tools with verified mastery metrics.
        </motion.p>
      </div>

      {/* Search & Category Filter Controls */}
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
            className={`w-full pl-10 pr-10 py-3 rounded-2xl text-xs sm:text-sm border transition-all outline-none backdrop-blur-2xl ${
              isDark
                ? 'bg-[rgba(12,12,16,0.6)] border-[rgba(212,175,55,0.25)] text-[#F8FAFC] placeholder-white/40 focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.25)] focus:ring-1 focus:ring-[#D4AF37]'
                : 'bg-white/90 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#00C896] focus:shadow-[0_2px_15px_rgba(0,200,150,0.2)] focus:ring-1 focus:ring-[#00C896]'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-[#FFD700]' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl border backdrop-blur-2xl overflow-x-auto scrollbar-none max-w-full ${
          isDark 
            ? 'bg-[rgba(12,12,16,0.6)] border-[rgba(212,175,55,0.25)]' 
            : 'bg-white/85 border-slate-200'
        }`}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`skills-category-filter-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-gradient-to-r from-[#00C896] to-[#00A57A] text-white shadow-[0_4px_15px_rgba(0,200,150,0.3)]'
                    : isDark
                      ? 'text-[#F8FAFC] hover:text-[#FFD700] hover:bg-white/5'
                      : 'text-slate-700 hover:text-[#00A57A] hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Skills Grid Rendering */}
      {filteredSkills.length === 0 ? (
        <div className={`text-center py-20 p-8 rounded-[28px] border border-dashed ${
          isDark ? 'border-[rgba(212,175,55,0.3)]' : 'border-slate-300'
        }`}>
          <Cpu className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'}`} />
          <h3 className="text-base font-bold mb-1">No technical skills matching your search</h3>
          <p className={`text-xs mb-4 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
            Try adjusting your search query "{searchQuery}" or choose another category filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className={`text-xs font-bold hover:underline cursor-pointer ${
              isDark ? 'text-[#D4AF37]' : 'text-[#00A57A]'
            }`}
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
              <div key={group} className="space-y-5">
                {/* Category Section Heading */}
                <div className={`flex items-center justify-between border-b pb-3 ${
                  isDark ? 'border-[rgba(212,175,55,0.25)]' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                      isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
                    }`}>
                      {group}
                    </h2>
                    <span className={`text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full border ${
                      isDark 
                        ? 'bg-[#0B0B0F] border-[rgba(212,175,55,0.3)] text-[#D4AF37]' 
                        : 'bg-emerald-50 border-emerald-200 text-[#00A57A]'
                    }`}>
                      {groupSkills.length} Skills
                    </span>
                  </div>
                </div>

                {/* Minimal Glass Prism Skill Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
                  {groupSkills.map((skill, index) => {
                    return (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        index={index}
                        isDark={isDark}
                        onClick={() => setActiveSkillModal(skill)}
                      />
                    );
                  })}
                </div>
              </div>
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
      <SkillModal
        skill={activeSkillModal}
        onClose={() => setActiveSkillModal(null)}
      />

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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.3) }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      id={`skill-card-${skill.id}`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '28px',
      }}
      className={`group relative p-4 sm:p-5 border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center ${
        isDark
          ? 'bg-[rgba(12,12,16,0.6)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/70 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] text-[#F8FAFC]'
          : 'bg-white/85 border-[rgba(0,200,150,0.2)] hover:border-[#00C896] hover:shadow-[0_8px_30px_rgba(0,200,150,0.2)] text-slate-800 shadow-sm'
      }`}
    >
      {/* Ambient Color Glow on Hover */}
      <div 
        style={{
          backgroundColor: isDark ? (skill.accentColor || '#7C3AED') : '#00C896',
        }}
        className="absolute -right-8 -bottom-8 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" 
      />

      {/* Official Technology Logo */}
      <div 
        style={{
          borderRadius: '20px',
        }}
        className={`w-13 h-13 sm:w-14 sm:h-14 rounded-[20px] flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
          isDark
            ? 'bg-[#15151E] border border-[rgba(212,175,55,0.2)] group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]'
            : 'bg-emerald-50/80 border border-[#00C896]/20 group-hover:border-[#00C896] group-hover:shadow-[0_4px_15px_rgba(0,200,150,0.25)]'
        }`}
      >
        <TechLogo 
          logo={skill.logo || skill.id} 
          size={32} 
          className="w-7 h-7 sm:w-8 sm:h-8" 
        />
      </div>

      {/* Skill Name */}
      <h3 className={`font-extrabold text-xs sm:text-sm leading-tight mb-2 truncate max-w-full transition-colors ${
        isDark ? 'group-hover:text-[#FFD700]' : 'group-hover:text-[#00A57A]'
      }`}>
        {skill.name}
      </h3>

      {/* Percentage Badge */}
      <div 
        style={{
          borderRadius: '9999px',
        }}
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black font-mono tracking-tight transition-all duration-300 ${
          isDark
            ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-black'
            : 'bg-emerald-50 text-[#00A57A] border border-[#00C896]/30 group-hover:bg-[#00C896] group-hover:text-white'
        }`}
      >
        <span>{skill.level}%</span>
      </div>
    </motion.div>
  );
};
