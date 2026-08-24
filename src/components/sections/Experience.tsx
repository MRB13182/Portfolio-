import React from 'react';
import { portfolioConfig } from '../../config/portfolio';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-[#7C3AED]/20 text-[#D4AF37] border border-[#D4AF37]/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones &amp; Track Record</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Professional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]">
              Engineering Journey
            </span>
          </h2>
          <p className="text-[#F8FAFC] max-w-xl text-base">
            Demonstrated history of driving technical innovation, mentoring high-performing engineering teams, and shipping production architectures.
          </p>
        </div>

        {/* Animated Vertical Timeline Container */}
        <div className="relative">
          
          {/* Central Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#D4AF37] via-[#7C3AED] to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)]" />

          {/* Timeline Milestones */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {portfolioConfig.experience.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={item.id}
                  className="relative flex flex-col sm:flex-row items-start"
                >
                  {/* Milestone Node on Center Line */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center p-1 border-2 transition-transform duration-300 hover:scale-125 bg-[#050505] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>

                  {/* Card wrapper - Alternating left and right on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`pl-12 sm:pl-0 w-full sm:w-[calc(50%-2rem)] ${
                      isEven ? 'sm:mr-auto sm:pr-4' : 'sm:ml-auto sm:pl-4'
                    }`}
                  >
                    <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:shadow-xl bg-[rgba(15,15,20,0.85)] border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)] text-[#F8FAFC]">
                      
                      {/* Top Header: Duration & Position Type */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#F8FAFC]">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{item.duration}</span>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#7C3AED]/30 text-[#D4AF37] border border-[#D4AF37]/30">
                          {item.type}
                        </span>
                      </div>

                      {/* Position & Company */}
                      <h3 className="text-xl font-extrabold tracking-tight mb-1 text-[#F8FAFC]">
                        {item.position}
                      </h3>
                      <div className="text-sm font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
                        <span>{item.company}</span>
                        <span className="text-xs text-[#F8FAFC]">• {item.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#F8FAFC] mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-2 mb-5">
                        {item.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-[#F8FAFC]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Used */}
                      <div className="pt-3 border-t border-[rgba(212,175,55,0.2)] flex flex-wrap gap-1.5">
                        {item.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-semibold px-2.5 py-0.5 rounded-lg border bg-[#0B0B0F] border-[rgba(212,175,55,0.2)] text-[#F8FAFC]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
