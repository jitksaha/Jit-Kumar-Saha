import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate, createTimeline, stagger } from 'animejs';
import { createFileRoute } from '@tanstack/react-router';
import { Sparkles, Calendar, CheckCircle2, ArrowUpRight, X } from 'lucide-react';
import { SubrouteLayout } from '../components/layout/SubrouteLayout';
import { ThreeBackground } from '../components/ui/ThreeBackground';
import { ExecutivePortraitCard } from '../components/ui/ExecutivePortraitCard';
import { Button } from '../components/ui/Button';
import { DisciplinesCarousel } from '../components/sections/shared/DisciplinesCarousel';
import { assets } from '../data/assets';
import { experienceItems } from '../data/experience';
import type { ExperienceItem } from '../types/experience';
import { easeCustom, containerVariants, itemVariants } from '../utils/motion';

export const Route = createFileRoute('/experience')({
  head: () => ({
    meta: [
      {
        title: 'Jit Kumar Saha Experience — Entrepreneurship, Product & Technology',
      },
      {
        name: 'description',
        content: "Explore Jit Kumar Saha's professional experience across entrepreneurship, business development, product development, software and technology.",
      },
      {
        name: 'keywords',
        content: 'Jit Kumar Saha Experience, Entrepreneurship, Product Development, Business Development, Technology, Software Products, SaaS, Product Strategy',
      },
      {
        property: 'og:title',
        content: 'Jit Kumar Saha Experience — Entrepreneurship, Product & Technology',
      },
      {
        property: 'og:description',
        content: "Explore Jit Kumar Saha's professional experience across entrepreneurship, business development, product development, software and technology.",
      },
      {
        property: 'og:url',
        content: 'https://jitksaha.com/experience',
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
        content: 'Jit Kumar Saha Experience — Entrepreneurship, Product & Technology',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@jitksaha',
      },
      {
        name: 'twitter:creator',
        content: '@jitksaha',
      },
      {
        name: 'twitter:title',
        content: 'Jit Kumar Saha Experience — Entrepreneurship, Product & Technology',
      },
      {
        name: 'twitter:description',
        content: "Explore Jit Kumar Saha's professional experience across entrepreneurship, business development, product development, software and technology.",
      },
      {
        name: 'twitter:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'Jit Kumar Saha Experience — Entrepreneurship, Product & Technology',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://jitksaha.com/experience',
      },
    ],
  }),
  component: ExperienceRoute,
});

const lifecycleSteps = [
  {
    step: '01',
    stage: 'Opportunity',
    desc: 'Identifying business problems, market opportunities and product opportunities.',
  },
  {
    step: '02',
    stage: 'Strategy',
    desc: 'Defining product direction, business models and technology strategies.',
  },
  {
    step: '03',
    stage: 'Development',
    desc: 'Turning product concepts into functional software and scalable digital products.',
  },
  {
    step: '04',
    stage: 'Launch',
    desc: 'Bringing products to market and creating the infrastructure required to operate them.',
  },
  {
    step: '05',
    stage: 'Growth',
    desc: 'Improving products, systems and businesses based on real-world needs and opportunities.',
  },
];

export function ExperienceRoute() {
  const [selectedRole, setSelectedRole] = useState<ExperienceItem | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const timeline = createTimeline({
      defaults: {
        ease: "outExpo",
      },
    });

    timeline
      .add(heroRef.current.querySelectorAll(".anime-hero-badge"), {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 700,
      })
      .add(
        heroRef.current.querySelectorAll(".anime-hero-title"),
        {
          translateY: [24, 0],
          opacity: [0, 1],
          duration: 800,
        },
        "-=450"
      )
      .add(
        heroRef.current.querySelectorAll(".anime-hero-desc"),
        {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 700,
        },
        "-=550"
      )
      .add(
        heroRef.current.querySelectorAll(".anime-hero-cta"),
        {
          translateY: [16, 0],
          opacity: [0, 1],
          delay: stagger(80),
          duration: 650,
        },
        "-=500"
      )
      .add(
        heroRef.current.querySelectorAll(".anime-hero-stats > div"),
        {
          translateY: [16, 0],
          opacity: [0, 1],
          delay: stagger(70),
          duration: 600,
        },
        "-=450"
      );

    const floatAnim = animate(
      heroRef.current.querySelectorAll(".anime-hero-card"),
      {
        translateY: [-3, 3],
        alternate: true,
        loop: true,
        ease: "inOutSine",
        duration: 3200,
      }
    );

    return () => {
      timeline.pause();
      floatAnim.pause();
    };
  }, []);

  return (
    <SubrouteLayout page="experience">
      {/* Hero Section with Three.js & Anime.js */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        {/* Three.js interactive 3D particle canvas */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <ThreeBackground variant="particles" accentColor={0x9fe870} />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="anime-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163300] text-[#DCFF85] text-xs font-mono uppercase tracking-widest mb-6 border border-[#DCFF85]/30 shadow-sm">
                <Sparkles size={13} className="text-[#9FE870]" />
                {' 7+ YEARS OPERATING TRACK RECORD'}
              </div>
              <h1 className="anime-hero-title text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                Experience
              </h1>
              <p className="anime-hero-desc text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mb-8 font-medium">
                My experience has been shaped by building businesses, products and technology across the evolving digital economy. My work spans entrepreneurship, business strategy, product development, software and technology — with a continuous focus on turning ideas into working products and businesses.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <div className="anime-hero-cta">
                  <Button
                    href="#lifecycle"
                    variant="dark"
                    text="Explore Product Lifecycle"
                    icon={<ArrowUpRight size={16} />}
                    className="px-7 py-3.5 text-sm font-semibold tracking-tight shadow-md hover:shadow-xl shadow-[#163300]/15"
                  />
                </div>
                <div className="anime-hero-cta">
                  <Button
                    to="/contact"
                    variant="secondary"
                    text="Discuss Opportunities"
                    icon={<ArrowUpRight size={16} />}
                    className="px-6 py-3.5 text-sm font-semibold tracking-tight shadow-xs"
                  />
                </div>
              </div>
              <div className="anime-hero-stats grid grid-cols-3 gap-3 pt-6 border-t border-[#163300]/10 max-w-xl">
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    7+ Yrs
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Operating Cadence
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Full Lifecycle
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Opportunity to Growth
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    100%
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Shipped & Maintained
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 anime-hero-card">
              <ExecutivePortraitCard
                image={assets.portraits.experience}
                badge="7+ YEARS TRACK RECORD"
                tagline="Entrepreneurship · Product · Technology"
                location="Dhaka · Global Remote"
                quote="Over the years, my work has evolved from digital services and software development toward building complete technology products and businesses."
                highlights={[
                  { label: 'Operating Cadence', value: '2015 — 2026+' },
                  { label: 'Shipped & Maintained', value: '100% Verified' },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Evolution & Scope */}
      <section className="py-20 bg-white border-y border-[#163300]/10" aria-labelledby="building-across-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
                EVOLUTION & SCOPE
              </span>
              <h2 id="building-across-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#163300] mb-4">
                Building Across{' '}
                <span className="italic font-serif font-normal text-[#163300]/70">
                  Business & Technology
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed">
                Over the years, my work has evolved from digital services and software development toward building complete technology products and businesses. This journey has involved working across product strategy, software development, business systems, automation, SaaS and digital transformation.
              </p>
            </div>
            <div className="lg:col-span-5 bg-[#163300] text-white rounded-3xl p-7 md:p-8 shadow-lg border border-[#163300]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] font-bold block mb-2">
                AEO KNOWLEDGE HIGHLIGHT
              </span>
              <h3 className="text-base font-bold text-[#DCFF85] mb-2">
                What is Jit Kumar Saha's professional background?
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Jit Kumar Saha's professional background spans entrepreneurship, technology, software products, SaaS, product development and business technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Systematic Process / Lifecycle */}
      <section className="py-20 bg-[#FAFAF8]" id="lifecycle" aria-labelledby="lifecycle-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              SYSTEMATIC PROCESS
            </span>
            <h2 id="lifecycle-heading" className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Experience Across the{' '}
              <span className="italic font-serif font-normal text-[#163300]/70">
                Product Lifecycle
              </span>
            </h2>
            <p className="mt-3 text-base text-[#163300]/75">
              From discovering the underlying market opportunity to scaling reliable technology infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {lifecycleSteps.map(({ step, stage, desc }) => (
              <motion.div
                key={stage}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-6 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#163300] bg-[#DCFF85] px-2.5 py-1 rounded-full border border-[#9FE870]/40 inline-block mb-3">
                    {step}
                  </span>
                  <h3 className="text-xl font-bold text-[#163300] tracking-tight mb-2">
                    {stage}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#163300]/75 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-16 md:py-24 bg-[#FAFAF8]" id="timeline">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
                <Sparkles size={13} className="text-[#9FE870]" />
                {' CAREER TIMELINE & IMPACT'}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
                Where I’ve{' '}
                <span className="font-serif italic font-normal text-[#163300]/70">
                  driven outcomes.
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#163300]/70 max-w-md leading-relaxed">
              Click any career chapter to inspect full responsibilities, major shipped initiatives, and business metrics.
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
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                onClick={() => setSelectedRole(item)}
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
                          <span className="h-1.5 w-1.5 rounded-full bg-[#163300] animate-pulse" />
                          {' Active'}
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
                      {item.achievements.slice(0, 2).map((achievement) => (
                        <div
                          key={achievement}
                          className="flex items-start gap-2 text-xs text-[#163300]/80 bg-[#FAFAF8] p-2.5 rounded-xl border border-[#163300]/5"
                        >
                          <CheckCircle2 size={13} className="text-[#163300] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{achievement}</span>
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
        </div>
      </section>

      {/* Disciplines Carousel */}
      <DisciplinesCarousel />

      {/* Role Detail Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedRole(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: easeCustom }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#F3FCED] text-[#163300] p-8 md:p-10 border border-[#163300]/20 shadow-2xl"
            >
              <motion.button
                onClick={() => setSelectedRole(null)}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#9FE870] hover:bg-[#8ed660] text-[#163300] shadow-sm transition-all"
                aria-label="Close modal"
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4 text-[#163300] stroke-[2.5]" />
              </motion.button>
              <span className="font-mono text-xs uppercase tracking-widest text-[#163300] font-bold bg-[#DCFF85] px-3 py-1 rounded-full border border-[#9FE870] inline-block mb-3 shadow-xs">
                {selectedRole.period}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#163300]">
                {selectedRole.role}
              </h3>
              <p className="text-base text-[#163300]/80 font-medium mt-1">
                {selectedRole.company}
              </p>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-[#163300]/85 font-normal">
                {selectedRole.summary}
              </p>

              <div className="mt-8 pt-6 border-t border-[#163300]/15">
                <p className="font-mono text-xs uppercase tracking-widest text-[#163300]/70 font-bold mb-3">
                  CORE RESPONSIBILITIES
                </p>
                <ul className="space-y-2.5">
                  {selectedRole.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-3 text-sm text-[#163300]/85 font-medium">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#163300]" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-[#163300]/15">
                <p className="font-mono text-xs uppercase tracking-widest text-[#163300]/70 font-bold mb-3">
                  KEY ACHIEVEMENTS
                </p>
                <ul className="space-y-2.5">
                  {selectedRole.achievements.map((ach) => (
                    <li key={ach} className="flex items-start gap-3 text-sm text-[#163300]/85 font-medium">
                      <CheckCircle2 size={15} className="mt-0.5 text-[#163300] shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-2xl border border-[#163300]/15 bg-white/70 backdrop-blur-sm p-5 shadow-xs">
                <p className="font-mono text-xs uppercase tracking-widest text-[#163300]/70 font-bold mb-1">
                  BUSINESS IMPACT
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#163300] font-semibold">
                  {selectedRole.impact}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SubrouteLayout>
  );
}
