import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { Skill, SkillCategory } from '../../types';
import { SkillModal } from '../modals/SkillModal';
import {
  Cpu,
  Search,
  ExternalLink,
  Code2
} from 'lucide-react';
import { motion } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const { isDark } = useTheme();
  const { skills: dbSkills } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillModal, setActiveSkillModal] = useState<Skill | null>(null);

  const allSkills: Skill[] = (dbSkills && dbSkills.length > 0)
    ? dbSkills.map((s: any, idx: number) => ({
        id: s.id || `skill-${idx}`,
        name: s.name,
        category: (s.category || 'Frontend') as SkillCategory,
        proficiency: typeof s.proficiency === 'number' ? s.proficiency : 90,
        level: s.level || 'Advanced',
        icon: s.icon || 'Code',
        color: s.color || '#22D3EE',
        description: s.description || `${s.name} development and production engineering.`,
        tags: s.tags || [s.category || 'Tech'],
      }))
    : portfolioConfig.skills;

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database & Cloud',
    'Tools & DevOps',
    'UI / UX & Architecture'
  ];

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      skill.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory.includes('UI') && skill.category.toLowerCase().includes('design')) ||
      (selectedCategory.includes('Database') && (skill.category.toLowerCase().includes('data') || skill.category.toLowerCase().includes('cloud')));

    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.keywords && skill.keywords.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border ${
            isDark
              ? 'bg-white/[0.04] text-[#22D3EE] border-white/10'
              : 'bg-slate-100 text-[#0891B2] border-slate-200'
          }`}>
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-balance">
            Skills &amp;{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#22D3EE] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#0891B2] to-[#7C3AED]'
            }`}>
              Technologies Matrix
            </span>
          </h2>
          
          <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
          }`}>
            A comprehensive catalog of programming languages, frameworks, state systems, databases, and DevOps tooling utilized across production environments.
          </p>
        </div>

        {/* Category Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Categories Tab Group */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border backdrop-blur-md overflow-x-auto max-w-full ${
            isDark ? 'bg-[#111722]/70 border-white/[0.08]' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  id={`skill-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none ${
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

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-[#A1AAB8]' : 'text-slate-400'
            }`} />
            <input
              type="text"
              placeholder="Search skills, frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="skills-search-input"
              className={`w-full min-h-[42px] pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border backdrop-blur-md outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                isDark
                  ? 'bg-[#111722]/80 border-white/10 text-white placeholder-slate-500 focus:border-[#22D3EE]'
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#0891B2]'
              }`}
            />
          </div>

        </div>

        {/* Skills Grid (Tier B Standard Glass) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill, index) => {
            const proficiency = typeof skill.level === 'number' ? skill.level : 90;
            return (
              <motion.div
                key={skill.id || skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
                whileHover={{ y: -3 }}
                onClick={() => setActiveSkillModal(skill)}
                id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isDark
                    ? 'bg-[#111722]/70 border-white/[0.08] hover:border-[#22D3EE]/35 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]'
                    : 'bg-white/85 border-slate-200/90 hover:border-[#0891B2]/40 shadow-[0_6px_20px_-6px_rgba(15,23,42,0.05)]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                      isDark 
                        ? 'bg-white/[0.04] border-white/10 text-[#22D3EE] group-hover:border-[#22D3EE]/40' 
                        : 'bg-slate-50 border-slate-200 text-[#0891B2] group-hover:border-[#0891B2]/40'
                    }`}>
                      <Code2 className="w-4 h-4" />
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                      isDark
                        ? 'bg-white/[0.04] border-white/[0.07] text-[#A1AAB8]'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {skill.category}
                    </span>
                  </div>

                  {/* Title & Level */}
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className={`font-black text-base tracking-tight truncate ${
                      isDark ? 'text-white group-hover:text-[#22D3EE]' : 'text-slate-900 group-hover:text-[#0891B2]'
                    }`}>
                      {skill.name}
                    </h3>
                    <span className={`text-xs font-mono font-bold ${
                      isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
                    }`}>
                      {proficiency}%
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
                    isDark ? 'text-[#A1AAB8]' : 'text-slate-600'
                  }`}>
                    {skill.description}
                  </p>
                </div>

                {/* Proficiency Indicator Bar */}
                <div>
                  <div className={`w-full h-1 rounded-full overflow-hidden ${
                    isDark ? 'bg-white/10' : 'bg-slate-200'
                  }`}>
                    <div
                      style={{ width: `${proficiency}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 text-[10px] font-mono">
                    <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                      Level: {skill.level || 'Mastery'}
                    </span>
                    <span className={`font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? 'text-[#22D3EE]' : 'text-[#0891B2]'
                    }`}>
                      Inspect <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Skill Modal */}
      {activeSkillModal && (
        <SkillModal
          skill={activeSkillModal}
          isOpen={!!activeSkillModal}
          onClose={() => setActiveSkillModal(null)}
        />
      )}
    </section>
  );
};
