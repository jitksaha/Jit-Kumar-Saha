import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  ArrowUpRight,
  Briefcase,
  X,
  Sparkles,
} from 'lucide-react';
import { experienceItems, type ExperienceItem } from '../../../data/experience';
import { Button } from '../../ui/Button';

export function ExperienceSection() {
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 bg-[#FAFAF8] overflow-hidden"
      aria-labelledby="experience-section-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
              <Briefcase size={13} className="text-[#163300]" /> CAREER TIMELINE & IMPACT
            </span>
            <h2
              id="experience-section-heading"
              className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]"
            >
              Where I’ve{' '}
              <span className="font-serif italic font-normal text-black/70">
                driven outcomes.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#555550] max-w-md leading-relaxed">
            Click any career chapter to inspect full responsibilities, major shipped initiatives, and
            business metrics.
          </p>
        </div>

        <motion.div
          className="flex flex-col gap-4 sm:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
        >
          {experienceItems.map((item) => (
            <motion.div
              key={item.company + item.role}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-3xl border border-[#163300]/10 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#163300]/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#163300] bg-[#DCFF85]/50 px-3 py-1 rounded-full border border-[#9FE870]/40">
                      <Calendar size={12} className="text-[#163300]" /> {item.period}
                    </span>
                    {item.period === 'Present' && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#163300] bg-[#9FE870] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#163300] animate-pulse" />{' '}
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163300] group-hover:text-[#163300] transition-colors">
                    {item.role}
                  </h3>
                  <h4 className="text-sm sm:text-base font-semibold text-[#163300]/70 mt-1">
                    {item.company}
                  </h4>
                </div>

                <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-[#163300]/10 pt-4 lg:pt-0 lg:pl-6">
                  <p className="text-sm text-[#163300]/80 leading-relaxed font-medium mb-3">
                    {item.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.achievements.slice(0, 2).map((ach) => (
                      <div
                        key={ach}
                        className="flex items-start gap-2 text-xs text-[#163300]/80 bg-[#FAFAF8] p-2.5 rounded-xl border border-[#163300]/5"
                      >
                        <CheckCircle size={13} className="text-[#163300] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 border-t lg:border-t-0 border-[#163300]/10 pt-4 lg:pt-0">
                  <span className="text-xs font-semibold text-[#163300]/70 group-hover:text-[#163300] transition-colors hidden sm:inline">
                    Inspect role
                  </span>
                  <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#163300]/5 group-hover:bg-[#163300] group-hover:text-[#DCFF85] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-[#163300] text-white">
          <div>
            <h4 className="text-lg font-bold text-white tracking-tight">
              Want to explore full operating lifecycle?
            </h4>
            <p className="text-xs sm:text-sm text-white/80">
              Explore deep dive achievements, strategy models, and business impact.
            </p>
          </div>
          <Button
            to="/experience"
            variant="lime"
            text="View Full Experience Page"
            icon={<ArrowUpRight size={15} />}
            className="px-6 py-3 text-xs sm:text-sm font-semibold"
          />
        </div>
      </div>

      {/* Modal Drawer */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#163300] text-white p-8 md:p-10 border border-[#DCFF85]/30 shadow-2xl"
            >
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>

              <span className="font-mono text-xs uppercase tracking-widest text-[#DCFF85] font-bold bg-[#DCFF85]/15 px-3 py-1 rounded-full border border-[#DCFF85]/30 inline-block mb-3">
                {selectedItem.period}
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white">
                {selectedItem.role}
              </h3>
              <p className="text-base text-white/80 font-medium mt-1">
                {selectedItem.company}
              </p>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-white/85">
                {selectedItem.summary}
              </p>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-mono text-xs uppercase tracking-widest text-[#9FE870] font-semibold mb-3">
                  Core Responsibilities
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                  {selectedItem.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#DCFF85] shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-mono text-xs uppercase tracking-widest text-[#9FE870] font-semibold mb-3">
                  Key Achievements
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                  {selectedItem.achievements.map((ach) => (
                    <li key={ach} className="flex items-start gap-2">
                      <Sparkles size={14} className="text-[#DCFF85] mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9FE870] block font-bold mb-1">
                  COMMERCIAL & PRODUCT IMPACT
                </span>
                <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  {selectedItem.impact}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
