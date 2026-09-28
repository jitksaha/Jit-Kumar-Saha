import { motion } from 'framer-motion';
import { createFileRoute } from '@tanstack/react-router';
import { TrendingUp, Briefcase, ArrowUpRight } from 'lucide-react';
import { SubrouteLayout } from '../../components/layout/SubrouteLayout';
import { ThreeBackground } from '../../components/ui/ThreeBackground';
import { ExecutivePortraitCard } from '../../components/ui/ExecutivePortraitCard';
import { ActionLink } from '../../components/ui/Button';
import { assets } from '../../data/assets';
import { caseStudies } from '../../data/work';
import { easeCustom, containerVariants, itemVariants } from '../../utils/motion';

export const Route = createFileRoute('/work/')({
  head: () => ({
    meta: [
      {
        title: 'Jit Kumar Saha Impact — Business, Product & Technology Innovation',
      },
      {
        name: 'description',
        content: 'Explore the business, product and technology impact created through Jit Kumar Saha\'s work in entrepreneurship, software, SaaS and digital transformation.',
      },
      {
        name: 'keywords',
        content: 'Jit Kumar Saha Impact, Business Innovation, Product Innovation, Technology Innovation, Digital Transformation, Technology Ventures, SaaS',
      },
      {
        property: 'og:title',
        content: 'Jit Kumar Saha Impact — Business, Product & Technology Innovation',
      },
      {
        property: 'og:description',
        content: 'Explore the business, product and technology impact created through Jit Kumar Saha\'s work in entrepreneurship, software, SaaS and digital transformation.',
      },
      {
        property: 'og:url',
        content: 'https://jitksaha.com/work',
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
        content: 'Jit Kumar Saha Impact — Business, Product & Technology Innovation',
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
        content: 'Jit Kumar Saha Impact — Business, Product & Technology Innovation',
      },
      {
        name: 'twitter:description',
        content: 'Explore the business, product and technology impact created through Jit Kumar Saha\'s work in entrepreneurship, software, SaaS and digital transformation.',
      },
      {
        name: 'twitter:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'Jit Kumar Saha Impact — Business, Product & Technology Innovation',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://jitksaha.com/work',
      },
    ],
  }),
  component: WorkIndexRoute,
});

export function WorkIndexRoute() {
  return (
    <SubrouteLayout page="work">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <ThreeBackground variant="torus" accentColor={10479728} />
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
                <TrendingUp size={13} className="text-[#9FE870]" />
                {' MEASURABLE BUSINESS IMPACT'}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                Building Impact Through Business & Technology
              </h1>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mb-8 font-medium">
                I measure meaningful work by what it creates, improves and enables. My focus is on building products and businesses that turn technology into practical value.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <ActionLink
                  href="#impact-themes"
                  variant="dark"
                  text="Explore Impact Philosophy"
                  icon={ArrowUpRight}
                  className="px-6 py-3 text-sm font-semibold"
                />
                <ActionLink
                  href="#projects"
                  variant="secondary"
                  text="Browse Case Studies"
                  icon={ArrowUpRight}
                  className="px-6 py-3 text-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#163300]/10 max-w-xl">
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Real Value
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Practical Solutions
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Scalable
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    SaaS & Software
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Sustainable
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Long-Term Thinking
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeCustom }}
            >
              <ExecutivePortraitCard
                image={assets.portraits.work}
                badge="BUSINESS & TECH IMPACT"
                tagline="Product Architecture · Web Engineering · Applied AI"
                location="Dhaka · Global Remote"
                quote="The goal is not simply to launch products. It is to build products that can evolve, scale and create sustainable value over time."
                highlights={[
                  { label: 'Execution Model', value: 'Idea to Product' },
                  { label: 'Technology Focus', value: 'Real Business Value' },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Philosophy Section */}
      <section className="py-20 bg-white border-y border-[#163300]/10" id="impact-themes" aria-labelledby="impact-themes-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            <div className="lg:col-span-12 bg-[#163300] text-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#163300] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] font-bold block mb-2">
                  AEO KNOWLEDGE DIRECT ANSWER
                </span>
                <h2 id="impact-themes-heading" className="text-2xl sm:text-3xl font-bold text-[#DCFF85] mb-3">
                  What kind of impact does Jit Kumar Saha focus on?
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  Jit Kumar Saha focuses on creating business and technology impact through digital products, software, SaaS, automation and technology-driven ventures.
                </p>
              </div>
              <ActionLink
                to="/contact"
                variant="secondary"
                text="Start a Conversation"
                icon={ArrowUpRight}
                className="shrink-0 px-5 py-3 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-[#FAFAF8] rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#163300] bg-[#DCFF85]/50 px-3 py-1 rounded-full border border-[#9FE870]/40 inline-block mb-4 font-bold">
                  01 · EXECUTION
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                  From Ideas to Real Products
                </h2>
                <p className="text-sm text-[#163300]/75 leading-relaxed">
                  Ideas become valuable when they are transformed into products that people can use. My work focuses on taking concepts through strategy, development and implementation to create functional digital products and technology businesses.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-[#FAFAF8] rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#163300] bg-[#DCFF85]/50 px-3 py-1 rounded-full border border-[#9FE870]/40 inline-block mb-4 font-bold">
                  02 · VALUE
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                  Creating Business Value Through Technology
                </h2>
                <p className="text-sm text-[#163300]/75 leading-relaxed">
                  Technology should solve real problems. I focus on building software, SaaS platforms, automation systems and digital infrastructure that can improve how businesses operate and grow.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-[#FAFAF8] rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#163300] bg-[#DCFF85]/50 px-3 py-1 rounded-full border border-[#9FE870]/40 inline-block mb-4 font-bold">
                  03 · SUSTAINABILITY
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                  Long-Term Product Thinking
                </h2>
                <p className="text-sm text-[#163300]/75 leading-relaxed">
                  The goal is not simply to launch products. It is to build products that can evolve, scale and create sustainable value over time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Production Portfolio Section */}
      <section className="py-16 md:py-24 bg-[#FAFAF8]" id="projects">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
                <Briefcase size={13} className="text-[#9FE870]" />
                {' PRODUCTION PORTFOLIO'}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
                Case studies &{' '}
                <span className="font-serif italic font-normal text-[#163300]/70">
                  delivered systems.
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#163300]/70 max-w-md leading-relaxed">
              Detailed breakdowns of unit economics, system architecture, and operational movement.
            </p>
          </div>

          <motion.div
            className="space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={containerVariants}
          >
            {caseStudies.map((project, idx) => {
              const coverImg =
                idx === 0
                  ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
                  : idx === 1
                  ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80'
                  : 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80';

              return (
                <motion.article
                  key={project.slug}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: easeCustom }}
                  className="group rounded-3xl border border-[#163300]/10 bg-white p-6 md:p-10 shadow-sm hover:shadow-xl hover:border-[#163300]/25 transition-all duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="font-mono text-xs font-bold text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-md border border-[#9FE870]/40">
                            {project.year} DELIVERY
                          </span>
                          <span className="font-mono text-xs text-[#163300]/50 font-semibold">
                            {project.category}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-[#9FE870] ml-auto" />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[#163300] mb-3 group-hover:text-[#163300] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-base text-[#163300]/75 leading-relaxed mb-6">
                          {project.summary}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                          {project.metrics.map(([val, label]) => (
                            <div
                              key={label}
                              className="p-3.5 rounded-2xl bg-[#F3FCED] border border-[#163300]/10"
                            >
                              <span className="font-mono text-lg font-bold text-[#163300] block">
                                {val}
                              </span>
                              <span className="text-[11px] text-[#163300]/65 leading-tight block mt-0.5 font-medium">
                                {label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <ActionLink
                          to={`/work/${project.slug}`}
                          variant="dark"
                          text="Read full case study"
                          icon={ArrowUpRight}
                          className="px-6 py-3 text-xs font-semibold btn-shine"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden bg-[#163300] border border-[#163300]/10 shadow-md">
                        <img
                          src={coverImg}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#163300] via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                          <span className="bg-[#163300]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[#DCFF85]">
                            {project.title}
                          </span>
                          <span className="text-[#DCFF85] font-bold">
                            {project.metrics[0][0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>
    </SubrouteLayout>
  );
}
