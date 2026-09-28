import { motion } from 'framer-motion';
import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SubrouteLayout } from '../../components/layout/SubrouteLayout';
import { ThreeBackground } from '../../components/ui/ThreeBackground';
import { ActionLink } from '../../components/ui/Button';
import { caseStudies } from '../../data/work';
import { easeCustom, containerVariants, itemVariants } from '../../utils/motion';

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = caseStudies.find((t) => t.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? 'Case Study'} — Jit Kumar Saha`,
      },
      {
        name: 'description',
        content: `${loaderData?.title}: ${loaderData?.summary ?? 'Case study on product innovation, software architecture and measurable business impact by Jit Kumar Saha.'}`,
      },
      {
        property: 'og:url',
        content: `https://jitksaha.com/work/${params.slug}`,
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:site_name',
        content: 'Jit Kumar Saha',
      },
      {
        property: 'og:title',
        content: `${loaderData?.title ?? 'Case Study'} — Jit Kumar Saha`,
      },
      {
        property: 'og:description',
        content: `${loaderData?.title}: ${loaderData?.summary ?? 'Case study on product innovation, software architecture and measurable business impact by Jit Kumar Saha.'}`,
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
        content: `${loaderData?.title ?? 'Case Study'} — Jit Kumar Saha`,
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
        content: `${loaderData?.title ?? 'Case Study'} — Jit Kumar Saha`,
      },
      {
        name: 'twitter:description',
        content: `${loaderData?.title}: ${loaderData?.summary ?? 'Case study on product innovation, software architecture and measurable business impact by Jit Kumar Saha.'}`,
      },
      {
        name: 'twitter:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: `${loaderData?.title ?? 'Case Study'} — Jit Kumar Saha`,
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: `https://jitksaha.com/work/${params.slug}`,
      },
    ],
  }),
  component: WorkSlugRoute,
});

export function WorkSlugRoute() {
  const project = Route.useLoaderData();
  const currentIndex = caseStudies.findIndex((t) => t.slug === project.slug);
  const nextProject = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <SubrouteLayout page="work">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <ThreeBackground variant="torus" accentColor={10479728} />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#163300]/70 hover:text-[#163300] mb-8 group bg-white/80 border border-[#163300]/10 px-3.5 py-1.5 rounded-full shadow-sm"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>← All Case Studies</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeCustom }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-mono uppercase font-bold text-[#163300] bg-[#DCFF85] px-3.5 py-1.5 rounded-full border border-[#9FE870]/40 shadow-sm">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[#163300]/70 bg-white border border-[#163300]/10 px-3.5 py-1.5 rounded-full shadow-sm">
                  {project.year}
                </span>
                <span className="text-xs font-mono text-[#163300]/70 bg-white border border-[#163300]/10 px-3.5 py-1.5 rounded-full shadow-sm">
                  Case Study #{project.index}
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                {project.headline}
              </h1>
              <p className="text-base sm:text-lg text-[#163300]/75 leading-relaxed max-w-2xl mb-8">
                {project.summary}
              </p>
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
                      ENGAGEMENT SCOPE
                    </span>
                    <h3 className="text-xl font-bold text-[#163300]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFF85] text-[#163300] text-xs font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
                <div className="space-y-3 mb-6 text-xs font-mono">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAF8] border border-[#163300]/10">
                    <span className="text-[#163300]/60">Focus Domain</span>
                    <span className="font-bold text-[#163300]">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAF8] border border-[#163300]/10">
                    <span className="text-[#163300]/60">Release Year</span>
                    <span className="font-bold text-[#163300]">{project.year}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAF8] border border-[#163300]/10">
                    <span className="text-[#163300]/60">Key Impact Markers</span>
                    <span className="font-bold text-[#163300]">
                      {project.metrics.length} Direct Outcomes
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between text-xs font-mono text-[#163300]/60">
                  <span>Architecture & Code</span>
                  <Link to="/contact" className="text-[#163300] font-bold hover:underline">
                    Inquire Similar Build →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-14 bg-white border-b border-[#163300]/10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {project.metrics.map(([val, label]) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-[#F3FCED] rounded-3xl p-8 border border-[#163300]/10 flex flex-col justify-between group"
              >
                <span className="text-xs font-mono uppercase text-[#163300]/50 font-semibold">
                  KEY METRIC
                </span>
                <strong className="text-4xl sm:text-5xl font-bold tracking-tight text-[#163300] my-3 block">
                  {val}
                </strong>
                <span className="text-sm font-medium text-[#163300]/70">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Narrative Section: Challenge, Architecture, Outcome */}
      <section className="py-20 bg-[#F3FCED]/60">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {/* Challenge */}
          <motion.div
            className="bg-white rounded-3xl p-8 sm:p-12 border border-[#163300]/10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="md:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1 rounded-full font-bold inline-block mb-3 border border-red-200">
                THE CHALLENGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#163300] tracking-tight">
                Finding the real{' '}
                <span className="italic font-serif font-normal text-[#163300]/70">
                  bottleneck.
                </span>
              </h2>
            </div>
            <div className="md:col-span-8 text-base sm:text-lg text-[#163300]/80 leading-relaxed">
              <p>{project.challenge}</p>
            </div>
          </motion.div>

          {/* Architecture */}
          <motion.div
            className="bg-[#163300] text-white rounded-3xl p-8 sm:p-12 border border-[#163300] shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#DCFF85]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="md:col-span-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] bg-white/10 px-3 py-1 rounded-full font-bold inline-block mb-3 border border-[#DCFF85]/30">
                THE ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Clarity, then{' '}
                <span className="italic font-serif font-normal text-white/70">
                  execution.
                </span>
              </h2>
            </div>
            <div className="md:col-span-8 text-base sm:text-lg text-white/80 leading-relaxed relative z-10">
              <p>{project.approach}</p>
            </div>
          </motion.div>

          {/* Outcome */}
          <motion.div
            className="bg-white rounded-3xl p-8 sm:p-12 border border-[#163300]/10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="md:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 bg-[#E8F9DC] px-3 py-1 rounded-full font-bold inline-block mb-3 border border-emerald-300">
                THE OUTCOME
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#163300] tracking-tight">
                Progress people{' '}
                <span className="italic font-serif font-normal text-[#163300]/70">
                  can measure.
                </span>
              </h2>
            </div>
            <div className="md:col-span-8 text-base sm:text-lg text-[#163300]/80 leading-relaxed">
              <p>{project.outcome}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Case Study */}
      <section className="py-20 bg-white border-t border-[#163300]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/50 block mb-1">
              CONTINUE READING
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-[#163300]">
              Next Case: {nextProject.title}
            </span>
          </div>
          <ActionLink
            to={`/work/${nextProject.slug}`}
            variant="dark"
            text="Read Case Study"
            icon={ArrowUpRight}
            className="px-6 py-3.5 text-sm font-semibold"
          />
        </div>
      </section>
    </SubrouteLayout>
  );
}
