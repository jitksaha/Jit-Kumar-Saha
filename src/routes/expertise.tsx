import { motion } from 'framer-motion';
import { createFileRoute } from '@tanstack/react-router';
import {
  Sparkles,
  Boxes,
  Workflow,
  Zap,
  ShieldCheck,
  Bot,
  BrainCircuit,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { SubrouteLayout } from '../components/layout/SubrouteLayout';
import { ThreeBackground } from '../components/ui/ThreeBackground';
import { ExecutivePortraitCard } from '../components/ui/ExecutivePortraitCard';
import { ActionLink } from '../components/ui/Button';
import { assets } from '../data/assets';
import { easeCustom, containerVariants, itemVariants } from '../utils/motion';

export const Route = createFileRoute('/expertise')({
  head: () => ({
    meta: [
      {
        title: 'Jit Kumar Saha Expertise — Product Development, SaaS & Business Technology',
      },
      {
        name: 'description',
        content: "Explore Jit Kumar Saha's expertise in product development, SaaS, software products, business technology, automation, digital transformation and product strategy.",
      },
      {
        name: 'keywords',
        content: 'Product Development, Product Strategy, Digital Product Development, SaaS Product Development, Business Technology, Software Products, Product Innovation, Technology Strategy',
      },
      {
        property: 'og:title',
        content: 'Jit Kumar Saha Expertise — Product Development, SaaS & Business Technology',
      },
      {
        property: 'og:description',
        content: "Explore Jit Kumar Saha's expertise in product development, SaaS, software products, business technology, automation, digital transformation and product strategy.",
      },
      {
        property: 'og:url',
        content: 'https://jitksaha.com/expertise',
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
        content: 'Jit Kumar Saha Expertise — Product Development, SaaS & Business Technology',
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
        content: 'Jit Kumar Saha Expertise — Product Development, SaaS & Business Technology',
      },
      {
        name: 'twitter:description',
        content: "Explore Jit Kumar Saha's expertise in product development, SaaS, software products, business technology, automation, digital transformation and product strategy.",
      },
      {
        name: 'twitter:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'Jit Kumar Saha Expertise — Product Development, SaaS & Business Technology',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://jitksaha.com/expertise',
      },
    ],
  }),
  component: ExpertiseRoute,
});

const expertisePillars = [
  {
    icon: Sparkles,
    tag: 'PRODUCT STRATEGY',
    title: 'Product Strategy & Development',
    desc: 'I work across the product lifecycle, from opportunity discovery and product strategy to development, launch and continuous improvement.',
    deliverables: [
      'Product Strategy',
      'Product Development',
      'Digital Product Development',
      'Product Innovation',
      'Product Engineering',
    ],
  },
  {
    icon: Boxes,
    tag: 'SAAS & SOFTWARE',
    title: 'SaaS & Software Products',
    desc: 'I build and develop SaaS platforms and software products designed to solve operational, commercial and productivity challenges for modern businesses.',
    deliverables: [
      'SaaS Architecture & Multi-Tenancy',
      'Full-Stack Web & Software Platforms',
      'API Integrations & Custom Workflows',
      'Scalable Cloud & Database Infrastructure',
    ],
  },
  {
    icon: Workflow,
    tag: 'BUSINESS TECHNOLOGY',
    title: 'Business Technology',
    desc: 'I work with technology as a business enabler — connecting software, automation and digital infrastructure with real operational and commercial requirements.',
    deliverables: [
      'Technology Architecture Alignment',
      'Operational Tooling Integration',
      'Technical Debt Auditing & Modernization',
      'Digital Infrastructure Scaling',
    ],
  },
  {
    icon: Zap,
    tag: 'AUTOMATION SYSTEMS',
    title: 'Business Automation',
    desc: 'I explore and build automation systems that reduce repetitive work, improve workflows and help businesses operate more efficiently.',
    deliverables: [
      'Workflow Pipeline Automation',
      'System-to-System Webhooks & APIs',
      'Internal Operations Streamlining',
      'Zero-Error Data Synchronization',
    ],
  },
  {
    icon: ShieldCheck,
    tag: 'TRANSFORMATION',
    title: 'Digital Transformation',
    desc: 'I work on digital transformation initiatives that help businesses modernize their products, systems, workflows and customer experiences.',
    deliverables: [
      'Legacy Software Modernization',
      'Customer Experience Redesign',
      'Cloud & Data Modernization',
      'Process & Org Agility',
    ],
  },
  {
    icon: Bot,
    tag: 'EMERGING TECH',
    title: 'AI & Emerging Technology',
    desc: 'AI and emerging technologies are increasingly becoming part of modern product development. I explore their practical use in software, automation, business systems and digital products.',
    deliverables: [
      'Applied LLMs & Autonomous Agents',
      'Model Context Protocol (MCP) Systems',
      'Practical AI Business Copilots',
      'Deterministic Evals & Safe Rollouts',
    ],
  },
];

const engagementFormats = [
  {
    icon: Sparkles,
    duration: 'Advisory & Strategy',
    title: 'Product & Tech Advisory',
    desc: 'Strategic guidance for founders and leadership teams navigating product discovery, technical architecture, and SaaS roadmap prioritization.',
  },
  {
    icon: Boxes,
    duration: 'Sprint to MVP (4-8 Wks)',
    title: 'End-to-End Build & Launch',
    desc: 'Hands-on execution from initial system architecture to working production software, UX validation, and go-to-market release.',
  },
  {
    icon: Workflow,
    duration: 'Ongoing Leadership',
    title: 'Fractional Tech & Product Leadership',
    desc: 'Embedding as a strategic product partner to guide engineering velocity, automate operations, and scale modern software systems.',
  },
];

const techStack = [
  'TypeScript',
  'React & Next.js',
  'Tailwind CSS',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Supabase',
  'Framer Motion',
  'TanStack Router',
  'LLM & Agent Systems',
  'Docker & Cloud Infra',
  'REST & GraphQL APIs',
  'Figma & Design Systems',
  'CI/CD Workflows',
];

export function ExpertiseRoute() {
  return (
    <SubrouteLayout page="expertise">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <ThreeBackground variant="orb" accentColor={10479728} />
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
                <Sparkles size={13} className="text-[#9FE870]" />
                {' PRODUCT · TECHNOLOGY · BUSINESS'}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                Product, Technology & Business
              </h1>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mb-8 font-medium">
                My expertise sits at the intersection of business strategy, product development and technology. I focus on turning business opportunities into digital products, software platforms and technology-driven businesses.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <ActionLink
                  href="#pillars"
                  variant="dark"
                  text="Explore 6 Focus Areas"
                  icon={<ArrowUpRight size={16} />}
                  className="px-7 py-3.5 text-sm font-semibold tracking-tight shadow-md hover:shadow-xl shadow-[#163300]/15"
                />
                <ActionLink
                  to="/contact"
                  variant="secondary"
                  text="Start a Conversation"
                  icon={<ArrowUpRight size={16} />}
                  className="px-6 py-3.5 text-sm font-semibold tracking-tight shadow-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#163300]/10 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#163300]/80">
                  <span className="w-2 h-2 rounded-full bg-[#9FE870]" />
                  <span>Product Strategy</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#163300]/80">
                  <span className="w-2 h-2 rounded-full bg-[#9FE870]" />
                  <span>SaaS & Software</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#163300]/80">
                  <span className="w-2 h-2 rounded-full bg-[#9FE870]" />
                  <span>Business Automation</span>
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
                image={assets.portraits.expertise}
                badge="PRODUCT & TECHNOLOGY FOUNDER"
                tagline="Product Strategy · SaaS Platforms · Business Tech"
                location="Dhaka · Global Remote"
                quote="Turning market opportunities into sustainable products, scalable software and robust business technology."
                highlights={[
                  { label: 'Core Triad', value: 'Business + Product + Tech' },
                  { label: 'Focus', value: 'Real Commercial Value' },
                ]}
                ctaText="Explore Focus Areas"
                ctaTo="#pillars"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AEO Direct Citation */}
      <section className="py-14 bg-white border-y border-[#163300]/10" aria-labelledby="aeo-expertise-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#163300] text-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#163300] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] font-bold block mb-2">
                AEO DIRECT CITATION
              </span>
              <h2 id="aeo-expertise-heading" className="text-2xl sm:text-3xl font-bold text-[#DCFF85] mb-3">
                What are Jit Kumar Saha's areas of expertise?
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                Jit Kumar Saha focuses on product development, product strategy, SaaS, software products, business technology, automation, digital transformation and emerging technology.
              </p>
            </div>
            <div className="shrink-0">
              <ActionLink
                to="/contact"
                variant="secondary"
                text="Collaborate on a Project"
                icon={ArrowUpRight}
                className="px-5 py-3 text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Domains / Pillars */}
      <section className="py-16 md:py-24 bg-[#FAFAF8]" id="pillars" aria-labelledby="pillars-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
              <Zap size={13} className="text-[#9FE870]" />
              {' CORE DOMAINS'}
            </span>
            <h2 id="pillars-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
              Turning ideas into{' '}
              <span className="font-serif italic font-normal text-[#163300]/70">
                practical value.
              </span>
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {expertisePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.28, ease: easeCustom }}
                  className="group rounded-3xl border border-[#163300]/10 bg-white p-8 shadow-sm hover:shadow-xl hover:border-[#163300]/25 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider font-bold bg-[#DCFF85]/50 text-[#163300] border border-[#9FE870]/40">
                        {pillar.tag}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={18} />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                      {pillar.title}
                    </h2>
                    <p className="text-sm text-[#163300]/75 leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                    <div className="space-y-2 pt-4 border-t border-[#163300]/5">
                      {pillar.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-[#163300]/80">
                          <CheckCircle2 size={13} className="text-[#9FE870] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#163300]/5 flex items-center justify-between text-xs font-semibold text-[#163300]">
                    <span>CORE EXPERTISE</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Engagement Formats */}
      <section className="bg-[#163300] text-white py-20 md:py-28 my-10 border-y border-[#163300]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-white/10 text-[#DCFF85] border border-white/15 mb-4 font-bold">
              <Workflow size={13} />
              {' ENGAGEMENT FORMATS'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Built around the problem,{' '}
              <span className="font-serif italic font-normal text-[#DCFF85]">
                not a rigid package.
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/80">
              Clear timelines, defined deliverables, and zero corporate bloat.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
          >
            {engagementFormats.map((format) => {
              const Icon = format.icon;
              return (
                <motion.div
                  key={format.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.28, ease: easeCustom }}
                  className="rounded-3xl border border-white/15 bg-white/[0.05] p-8 backdrop-blur-md flex flex-col justify-between group hover:border-[#DCFF85]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#DCFF85] bg-[#DCFF85]/15 px-3 py-1 rounded-full border border-[#DCFF85]/30">
                        {format.duration}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#DCFF85]" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                      {format.title}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {format.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                    <span>Direct partner engagement</span>
                    <Icon size={16} className="text-[#DCFF85]" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Technical & Operating Fluency */}
      <section className="py-16 md:py-24 bg-[#FAFAF8] text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
            <BrainCircuit size={13} className="text-[#9FE870]" />
            {' TECHNICAL & OPERATING FLUENCY'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300] mb-10">
            Tools and systems I{' '}
            <span className="font-serif italic font-normal text-[#163300]/70">
              ship with daily.
            </span>
          </h2>

          <motion.div
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                variants={itemVariants}
                whileHover={{
                  scale: 1.08,
                  y: -2,
                  backgroundColor: '#DCFF85',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-white border border-[#163300]/15 text-[#163300] shadow-sm hover:border-[#163300]/40 cursor-pointer transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#9FE870]" /> {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </SubrouteLayout>
  );
}
