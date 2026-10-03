import { useState } from 'react';
import { motion } from 'framer-motion';
import { createFileRoute, Link } from '@tanstack/react-router';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { SubrouteLayout } from '../components/layout/SubrouteLayout';
import { ThreeBackground } from '../components/ui/ThreeBackground';
import { RollingText, RollingIcon } from '../components/ui/Button';
import { easeCustom, containerVariants, itemVariants } from '../utils/motion';

export const Route = createFileRoute('/insights')({
  head: () => ({
    meta: [
      {
        title: 'Insights — Jit Kumar Saha',
      },
      {
        name: 'description',
        content: 'Short, practical notes on product, software, business, and AI by entrepreneur and technology founder Jit Kumar Saha.',
      },
      {
        property: 'og:url',
        content: 'https://jitksaha.com/insights',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'Jit Kumar Saha',
      },
      {
        property: 'og:title',
        content: 'Insights — Jit Kumar Saha',
      },
      {
        property: 'og:description',
        content: 'Short, practical notes on product, software, business, and AI by entrepreneur and technology founder Jit Kumar Saha.',
      },
      {
        property: 'og:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '675',
      },
      {
        property: 'og:image:alt',
        content: 'Insights — Jit Kumar Saha',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@jitksahabd',
      },
      {
        name: 'twitter:creator',
        content: '@jitksahabd',
      },
      {
        name: 'twitter:title',
        content: 'Insights — Jit Kumar Saha',
      },
      {
        name: 'twitter:description',
        content: 'Short, practical notes on product, software, business, and AI by entrepreneur and technology founder Jit Kumar Saha.',
      },
      {
        name: 'twitter:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'Insights — Jit Kumar Saha',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://jitksaha.com/insights',
      },
    ],
  }),
  component: InsightsRoute,
});

const insightNotes = [
  {
    category: 'Product',
    title: 'Most roadmaps are wishlists disguised as strategy.',
    desc: 'Why sequencing constraints, customer churn signals, and unit economics matter more than feature volume.',
    readTime: '4 min read',
    date: '2026',
  },
  {
    category: 'Engineering',
    title: 'The feature nobody asked for is usually the one you built.',
    desc: 'Avoiding developer bias and building deterministic feedback loops before writing a single line of backend logic.',
    readTime: '5 min read',
    date: '2026',
  },
  {
    category: 'Business',
    title: 'Your software is only as good as the operating process behind it.',
    desc: "Why automation fails when team incentives and manual workflows aren't mapped first.",
    readTime: '6 min read',
    date: '2025',
  },
  {
    category: 'AI & Agents',
    title: 'Where AI actually saves money, and where it wastes executive time.',
    desc: 'Moving beyond chat interfaces to deterministic eval suites, MCP protocols, and background autonomous swarms.',
    readTime: '7 min read',
    date: '2026',
  },
  {
    category: 'Ventures',
    title: 'What running multiple digital products simultaneously taught me.',
    desc: 'Context switching hygiene, shared design tokens, and ruthlessly killing low-conviction ideas.',
    readTime: '5 min read',
    date: '2025',
  },
];

const insightCategories = ['All', 'Product', 'Engineering', 'Business', 'AI & Agents', 'Ventures'];

export function InsightsRoute() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredNotes = insightNotes.filter(
    (note) => selectedCategory === 'All' || note.category === selectedCategory
  );

  return (
    <SubrouteLayout page="insights">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <ThreeBackground variant="particles" accentColor={10479728} />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeCustom }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163300] text-[#DCFF85] text-xs font-mono uppercase tracking-widest mb-6 border border-[#DCFF85]/30 shadow-sm">
                <BookOpen size={13} className="text-[#9FE870]" />
                {' FIELD NOTES & ESSAYS'}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                Notes from{' '}
                <span className="font-serif italic font-normal text-[#163300]/70">
                  the trenches.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#163300]/75 leading-relaxed max-w-2xl mb-8">
                Short, practical notes on product architecture, software engineering, unit economics, and AI systems. Honest enough to include the parts that failed before they worked.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {insightCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#163300] text-[#DCFF85] font-bold shadow-sm'
                        : 'bg-white/80 border border-[#163300]/10 text-[#163300]/70 hover:bg-[#DCFF85]/30 hover:text-[#163300]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: easeCustom, delay: 0.15 }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#163300]/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#DCFF85]/30 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between pb-5 border-b border-[#163300]/10 mb-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#163300]/60 block font-semibold">
                      EDITORIAL PRINCIPLES
                    </span>
                    <h3 className="text-xl font-bold text-[#163300]">
                      No Theory Without Code
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFF85] text-[#163300] text-xs font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
                <div className="space-y-3.5 text-sm text-[#163300]/80 mb-6">
                  <p className="leading-relaxed">
                    Every observation written here comes directly from shipping software in high-stakes environments — from multi-million dollar corporate workflows to lean indie ventures.
                  </p>
                  <p className="text-xs text-[#163300]/60 font-mono">
                    Updated regularly with real postmortems, architecture breakdowns, and operator frameworks.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between text-xs font-mono text-[#163300]/60">
                  <span>Subscribe via RSS / Email</span>
                  <Link to="/contact" className="text-[#163300] font-bold hover:underline">
                    Suggest a Topic →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {filteredNotes.map((note, index) => {
              const isLarge = index % 3 === 0;
              return (
                <motion.div
                  key={note.title}
                  className={`${
                    isLarge ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4'
                  } bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono uppercase font-bold text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-full border border-[#9FE870]/40">
                        {note.category}
                      </span>
                      <span className="text-xs font-mono text-[#163300]/50">
                        {note.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#163300] mb-3 group-hover:text-[#163300]/80 transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-sm text-[#163300]/70 leading-relaxed mb-6">
                      {note.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between text-xs font-mono text-[#163300]/60">
                    <span>{note.date}</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#163300]">
                      <RollingText text="Read Note" />
                      <RollingIcon icon={ArrowUpRight} size={14} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </SubrouteLayout>
  );
}
