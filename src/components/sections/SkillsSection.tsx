import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { portfolioConfig } from '../../config/portfolio';
import { usePortfolioData } from '../../context/DataContext';
import { Skill, SkillCategory } from '../../types';
import { SkillModal } from '../modals/SkillModal';
import {
  Cpu,
  Layers,
  Search,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  Palette,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
        color: s.color || '#00E5FF',
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
    <section id="skills" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark
              ? 'bg-[#8B5CF6]/20 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
              : 'bg-cyan-500/10 text-[#0097A7] border border-[#00E5FF]/30 shadow-[0_2px_12px_rgba(0,229,255,0.12)]'
          }`}>
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Skills &amp;{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-white via-[#00E5FF] to-[#8B5CF6]'
                : 'bg-gradient-to-r from-slate-900 via-[#00E5FF] to-[#8B5CF6]'
            }`}>
              Technologies Matrix
            </span>
          </h2>
          
          <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-[#94A3B8]' : 'text-slate-600'
          }`}>
            A comprehensive catalog of programming languages, frameworks, state systems, databases, and DevOps tooling utilized across production environments.
          </p>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Categories Tab Group */}
          <div className={`flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-2xl overflow-x-auto max-w-full scrollbar-none ${
            isDark ? 'bg-[#121217]/70 border-white/10' : 'bg-white/80 border-slate-200'
          }`}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  id={`skill-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-black shadow-[0_0_15px_rgba(0,229,255,0.35)]'
                        : 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-white shadow-[0_2px_10px_rgba(0,229,255,0.25)]'
                      : isDark
                        ? 'text-[#94A3B8] hover:text-white hover:bg-white/5'
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
              isDark ? 'text-[#94A3B8]' : 'text-slate-400'
            }`} />
            <input
              type="text"
              placeholder="Search skills, frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="skills-search-input"
              className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-2xl border backdrop-blur-xl outline-none transition-all ${
                isDark
                  ? 'bg-[#121217]/80 border-white/10 text-white placeholder-slate-500 focus:border-[#00E5FF]'
                  : 'bg-white/80 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#00E5FF]'
              }`}
            />
          </div>

        </div>

        {/* Skills Glass Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill, index) => {
            const proficiency = typeof skill.level === 'number' ? skill.level : 90;
            return (
              <motion.div
                key={skill.id || skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
                whileHover={{ y: -5, scale: 1.01 }}
                onClick={() => setActiveSkillModal(skill)}
                id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`p-5 rounded-[24px] backdrop-blur-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isDark
                    ? 'bg-[#121217]/65 border-white/10 hover:border-[#00E5FF]/60 hover:shadow-[0_8px_30px_rgba(0,229,255,0.2)]'
                    : 'bg-white/80 border-white/60 hover:border-[#00E5FF] hover:shadow-[0_8px_25px_rgba(0,229,255,0.12)]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-colors ${
                      isDark 
                        ? 'bg-[#121217] border-white/15 text-[#00E5FF] group-hover:border-[#00E5FF]' 
                        : 'bg-slate-50 border-slate-200 text-[#0097A7] group-hover:border-[#00E5FF]'
                    }`}>
                      <Code2 className="w-5 h-5" />
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-[#94A3B8]'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {skill.category}
                    </span>
                  </div>

                  {/* Title & Level */}
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className={`font-black text-base tracking-tight truncate ${
                      isDark ? 'text-white group-hover:text-[#00E5FF]' : 'text-slate-900 group-hover:text-[#0097A7]'
                    }`}>
                      {skill.name}
                    </h3>
                    <span className={`text-xs font-mono font-bold ${
                      isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
                    }`}>
                      {proficiency}%
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
                    isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                  }`}>
                    {skill.description}
                  </p>
                </div>

                {/* Proficiency Indicator Bar */}
                <div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-white/10' : 'bg-slate-200'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 text-[10px] font-mono">
                    <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                      Level: {skill.level || 'Mastery'}
                    </span>
                    <span className={`font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? 'text-[#00E5FF]' : 'text-[#0097A7]'
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
