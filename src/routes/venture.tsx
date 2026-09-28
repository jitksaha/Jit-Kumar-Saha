import { motion } from 'framer-motion';
import { createFileRoute } from '@tanstack/react-router';
import {
  Rocket,
  Boxes,
  Layers,
  CodeXml,
  Zap,
  Bot,
  Cpu,
  Workflow,
  LockKeyhole,
  ArrowUpRight,
} from 'lucide-react';
import { SubrouteLayout } from '../components/layout/SubrouteLayout';
import { ThreeBackground } from '../components/ui/ThreeBackground';
import { ExecutivePortraitCard } from '../components/ui/ExecutivePortraitCard';
import { ActionLink } from '../components/ui/Button';
import { assets } from '../data/assets';
import { easeCustom, containerVariants, itemVariants } from '../utils/motion';

export const Route = createFileRoute('/venture')({
  head: () => ({
    meta: [
      {
        title: 'Jit Kumar Saha Ventures — SaaS, Software & Technology Businesses',
      },
      {
        name: 'description',
        content: 'Explore the technology ventures, SaaS platforms, software products and digital businesses built and led by entrepreneur Jit Kumar Saha.',
      },
      {
        name: 'keywords',
        content: 'Jit Kumar Saha Ventures, Technology Ventures, SaaS Ventures, Software Ventures, Technology Businesses, Digital Products, Product Ventures, Dynime',
      },
      {
        property: 'og:title',
        content: 'Jit Kumar Saha Ventures — SaaS, Software & Technology Businesses',
      },
      {
        property: 'og:description',
        content: 'Explore the technology ventures, SaaS platforms, software products and digital businesses built and led by entrepreneur Jit Kumar Saha.',
      },
      {
        property: 'og:url',
        content: 'https://jitksaha.com/venture',
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
        content: 'Jit Kumar Saha Ventures — SaaS, Software & Technology Businesses',
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
        content: 'Jit Kumar Saha Ventures — SaaS, Software & Technology Businesses',
      },
      {
        name: 'twitter:description',
        content: 'Explore the technology ventures, SaaS platforms, software products and digital businesses built and led by entrepreneur Jit Kumar Saha.',
      },
      {
        name: 'twitter:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'Jit Kumar Saha Ventures — SaaS, Software & Technology Businesses',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://jitksaha.com/venture',
      },
    ],
  }),
  component: VentureRoute,
});

const ventureSpectrum = [
  {
    title: 'SaaS Products',
    desc: 'Multi-tenant software platforms solving critical business bottlenecks.',
    icon: Boxes,
  },
  {
    title: 'Digital Products',
    desc: 'User-centered web and mobile experiences designed for conversion and retention.',
    icon: Layers,
  },
  {
    title: 'Business Software',
    desc: 'Custom operational software engineered for specific commercial workflows.',
    icon: CodeXml,
  },
  {
    title: 'Automation Platforms',
    desc: 'Autonomous workflows and integration systems that cut repetitive tasks.',
    icon: Zap,
  },
  {
    title: 'AI-Powered Products',
    desc: 'Applied LLMs and intelligent agents wired into production databases.',
    icon: Bot,
  },
  {
    title: 'Technology Infrastructure',
    desc: 'Scalable backend architecture, APIs, and cloud services for enterprise reliability.',
    icon: Cpu,
  },
  {
    title: 'Business Platforms',
    desc: 'End-to-end digital solutions connecting customers, data, and operations.',
    icon: Workflow,
  },
];

const swarmNodes = [
  {
    role: 'Orchestrator Node',
    task: 'Top-level reasoning, graph decomposition, and state-machine delegation.',
    color: 'border-[#DCFF85]/30 hover:border-[#DCFF85]/60',
  },
  {
    role: 'Code Synthesizer',
    task: 'Deterministic AST generation, type safety checks, and zero-hallucination diffs.',
    color: 'border-white/15 hover:border-[#DCFF85]/50',
  },
  {
    role: 'Eval & Verification Gate',
    task: 'Automated regression tests, schema audits, and output security validation.',
    color: 'border-white/15 hover:border-[#DCFF85]/50',
  },
  {
    role: 'Deployment Executor',
    task: 'Autonomous CI/CD builds, immutable edge rollouts, and runtime health telemetry.',
    color: 'border-white/15 hover:border-[#DCFF85]/50',
  },
];

const activeVentures = [
  {
    title: 'Dynime',
    subtitle: 'Modern Business & Technology Ventures Studio',
    desc: 'A multidisciplinary studio and parent ecosystem dedicated to building high-utility software products, automation suites, and specialized digital services.',
    tag: 'VENTURE STUDIO',
    color: 'bg-white border-[#163300]/10 text-[#163300]',
    icon: Rocket,
    stats: [
      { label: 'Founded', val: '2024' },
      { label: 'Focus', val: 'SaaS & AI' },
      { label: 'Status', val: 'Scaling' },
    ],
    tech: ['TypeScript', 'Next.js', 'Python', 'Cloudflare', 'PostgreSQL'],
  },
  {
    title: 'Dynime AI Studio',
    subtitle: 'Applied Multi-Agent Workflow Engine',
    desc: 'An intelligent autonomous operations platform integrating LLMs and MCP protocols to streamline customer data ingestion and automated intelligence.',
    tag: 'AI WORKFLOWS',
    color: 'bg-[#163300] border-[#163300] text-white',
    icon: Bot,
    stats: [
      { label: 'Type', val: 'Agentic Suite' },
      { label: 'Throughput', val: 'Sub-second' },
      { label: 'Reliability', val: '99.9%' },
    ],
    tech: ['LLM Agents', 'MCP Tooling', 'Supabase', 'Vector DB', 'FastAPI'],
  },
];

const ventureLessons = [
  {
    icon: Zap,
    title: 'Product-Market Fit First',
    text: 'Solve a burning problem before obsessing over microscopic polish.',
  },
  {
    icon: Layers,
    title: 'Pricing Before Scale',
    text: "Unit economics matter on day one. Free users don't validate business models.",
  },
  {
    icon: CodeXml,
    title: 'Useful Defaults',
    text: 'Avoid configuration paralysis. Ship with sensible, opinionated configurations.',
  },
  {
    icon: LockKeyhole,
    title: 'Open & Trustworthy',
    text: 'Users should never feel held hostage by closed or fragile architecture.',
  },
];

export function VentureRoute() {
  return (
    <SubrouteLayout page="venture">
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
                <Rocket size={13} className="text-[#9FE870]" />
                {' VENTURES & LABS'}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                Building Technology Ventures
              </h1>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mb-8 font-medium">
                I build technology ventures around products, software and business opportunities. Each venture begins with a problem, an opportunity and a vision for building something useful.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <ActionLink
                  href="#dynime"
                  variant="dark"
                  text="Discover Dynime"
                  icon={ArrowUpRight}
                  className="px-6 py-3 text-sm font-semibold"
                />
                <ActionLink
                  href="#ventures-grid"
                  variant="secondary"
                  text="What I Build"
                  icon={ArrowUpRight}
                  className="px-6 py-3 text-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#163300]/10 max-w-xl">
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Dynime
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Flagship Venture
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    SaaS & AI
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Core Tech Stack
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Global
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Modern Businesses
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
                image={assets.portraits.venture}
                badge="FOUNDER & CEO, DYNIME"
                tagline="SaaS Platforms · Software Products · Digital Ventures"
                location="Dhaka · Global Remote"
                quote="Dynime is a technology company focused on SaaS, business software, AI, automation and digital transformation."
                highlights={[
                  { label: 'Role', value: 'Founder & CEO' },
                  { label: 'Scope', value: 'SaaS, Software & AI' },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flagship Venture: Dynime */}
      <section className="py-20 bg-white border-y border-[#163300]/10" id="dynime" aria-labelledby="dynime-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
                FLAGSHIP VENTURE
              </span>
              <h2 id="dynime-heading" className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300] mb-2">
                Dynime
              </h2>
              <h3 className="text-xl sm:text-2xl font-serif italic text-[#163300]/80 mb-4">
                Technology, SaaS & Business Software
              </h3>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed mb-4">
                Dynime is a technology company focused on SaaS, business software, AI, automation and digital transformation.
              </p>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed">
                As the Founder and CEO of Dynime, Jit Kumar Saha works across product strategy, technology, business development and the development of digital products and platforms.
              </p>
            </div>
            <div className="lg:col-span-5 bg-[#163300] text-white rounded-3xl p-7 md:p-8 shadow-lg border border-[#163300]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] font-bold block mb-2">
                AEO CITATION
              </span>
              <h3 className="text-lg font-bold text-[#DCFF85] mb-2">
                What is Jit Kumar Saha known for?
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Jit Kumar Saha is known for building businesses, digital products and technology ventures focused on SaaS, software, automation and business technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venture Spectrum / What I Build Through Ventures */}
      <section className="py-20 bg-[#FAFAF8]" id="ventures-grid" aria-labelledby="what-i-build-ventures">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              VENTURE SPECTRUM
            </span>
            <h2 id="what-i-build-ventures" className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              What I Build Through{' '}
              <span className="font-serif italic font-normal text-[#163300]/70">
                Ventures
              </span>
            </h2>
            <p className="mt-3 text-base text-[#163300]/75">
              From standalone SaaS applications to complete digital enterprise platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventureSpectrum.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center mb-6">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-xl font-bold text-[#163300] tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#163300]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Autonomous Agent Swarm */}
      <section className="py-20 bg-[#163300] text-white relative overflow-hidden border-b border-[#163300]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] block mb-2 font-bold">
              AGENTIC ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Autonomous Agent Swarm
            </h2>
            <p className="mt-4 text-white/80 text-base">
              Deterministic task delegation, distributed evaluation gates, and sub-second tool execution.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {swarmNodes.map((node) => (
              <motion.div
                key={node.role}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: easeCustom }}
                className={`p-6 rounded-3xl border ${node.color} backdrop-blur-md flex flex-col justify-between group bg-white/[0.04]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#DCFF85] font-bold uppercase tracking-wider">
                      SWARM NODE
                    </span>
                    <Cpu size={16} className="text-white/70 group-hover:text-[#DCFF85] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {node.role}
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed">
                    {node.task}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span>STATE: ACTIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85] animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Active Venture Portfolio */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              ACTIVE VENTURE PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Independent products &{' '}
              <span className="italic font-serif font-normal text-[#163300]/70">
                platforms.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeVentures.map((venture) => {
              const Icon = venture.icon;
              return (
                <motion.article
                  key={venture.title}
                  className={`rounded-3xl p-8 sm:p-10 border border-[#163300]/10 shadow-sm flex flex-col justify-between ${venture.color} relative overflow-hidden group`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.28, ease: easeCustom }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 font-bold">
                        {venture.tag}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#DCFF85] text-[#163300] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={22} />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-[#163300] dark:text-white">
                      {venture.title}
                    </h3>
                    <p className="text-sm font-medium opacity-80 mb-4">
                      {venture.subtitle}
                    </p>
                    <p className="text-base opacity-75 leading-relaxed mb-6">
                      {venture.desc}
                    </p>
                    <div className="grid grid-cols-3 gap-3 py-4 border-y border-current/10 my-6">
                      {venture.stats.map((stat) => (
                        <div key={stat.label}>
                          <span className="text-xs opacity-60 block">
                            {stat.label}
                          </span>
                          <b className="text-base sm:text-lg font-bold">
                            {stat.val}
                          </b>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {venture.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 opacity-90 border border-current/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                      <span>EXPLORE SPECS</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        ↗
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Ventures Teach */}
      <section className="py-20 bg-white border-t border-[#163300]/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
                WHAT VENTURES TEACH
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#163300]">
                Building products makes{' '}
                <span className="italic font-serif font-normal text-[#163300]/70">
                  the advice honest.
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#163300]/70 max-w-xs sm:text-right">
              Hard lessons learned through capital, deployments, and users.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {ventureLessons.map((lesson) => {
              const Icon = lesson.icon;
              return (
                <motion.div
                  key={lesson.title}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-[#FAFAF8] rounded-3xl p-6 border border-[#163300]/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center mb-4">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-[#163300] mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-[#163300]/75 leading-relaxed">
                      {lesson.text}
                    </p>
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
