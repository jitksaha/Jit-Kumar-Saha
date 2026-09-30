import React, { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Clock,
  Layers,
  Bot,
  Server,
  Code2,
  Cpu,
  Workflow,
  Plus,
  Minus,
  Sliders,
  DollarSign,
  TrendingUp,
  Boxes,
  Building2,
  Rocket,
  Compass,
  FileCheck2,
  Activity,
  Globe,
  RefreshCw,
  Search,
  Filter,
  Users,
  Terminal,
  Database,
  Check,
  ChevronRight,
  Palette,
  LayoutTemplate,
  ShoppingBag,
  CreditCard,
  Gauge,
  X,
  MessageCircle,
  Mail,
  Send,
  Calendar,
  Info,
} from 'lucide-react';
import { SubrouteLayout, FadeIn } from '../components/layout/SubrouteLayout';
import { ThreeBackground } from '../components/ui/ThreeBackground';
import { BrandStar } from '../components/ui/BrandStar';
import { Button, ActionLink } from '../components/ui/Button';
import { ReviewsMarquee } from '../components/sections/shared/ReviewsMarquee';
import { BrandSlider } from '../components/sections/home/BrandSlider';
import { InquiryWizard } from '../components/forms/InquiryWizard';
import { EnterpriseForm } from '../components/forms/EnterpriseForm';
import { BookCallSection } from '../components/sections/pricing/BookCallSection';

type BuyingModel = 'onetime' | 'monthly' | 'enterprise';

// 01. ONE-TIME PROJECT PACKAGES
interface ProjectPackage {
  id: string;
  code: string;
  name: string;
  badge?: string;
  availability: string;
  priceTag: string;
  startingPrice: number;
  delivery: string;
  bestFor: string;
  description: string;
  highlighted?: boolean;
  features: string[];
  techStack: string[];
  ctaText: string;
}

const ONETIME_PACKAGES: ProjectPackage[] = [
  {
    id: 'launch',
    code: '01',
    name: 'Launch',
    badge: 'RAPID KICKOFF',
    availability: '3 Slots Available, Hurry!',
    priceTag: '$500+',
    startingPrice: 500,
    delivery: '7–14 Days',
    bestFor: 'Perfect for small projects, MVP launch or testing the waters',
    description: 'A high-converting, modern digital presence built with clean code and conversion-focused fundamentals.',
    features: [
      'Up to 5 custom-designed pages',
      'Responsive UI & mobile perfection',
      'Headless CMS / Content setup',
      'Basic SEO foundation & speed tuning',
      'Contact & lead capture forms',
      'Cloudflare deployment & 7d support',
    ],
    techStack: ['React', 'Vite', 'Tailwind', 'Cloudflare'],
    ctaText: 'Book a free call',
  },
  {
    id: 'growth',
    code: '02',
    name: 'Growth',
    badge: 'BUSINESS ELEVATION',
    availability: '2 Slots Available, Hurry!',
    priceTag: '$1,500+',
    startingPrice: 1500,
    delivery: '2–4 Weeks',
    bestFor: 'For growing teams with consistent design & development needs',
    description: 'Custom-designed digital platform with rich animations, seamless integrations, and growth-ready architecture.',
    features: [
      'Custom website design (10–15 pages)',
      'Advanced micro-interactions & motion',
      'CMS / WordPress / Shopify build',
      'Conversion-focused UX flows',
      'Stripe / Payment integration',
      'Technical SEO & 14d post-launch support',
    ],
    techStack: ['Next.js / Vite', 'Framer Motion', 'Tailwind', 'Headless CMS'],
    ctaText: 'Book a free call',
  },
  {
    id: 'scale',
    code: '03',
    name: 'Scale',
    badge: 'MOST POPULAR',
    availability: '1 Slot Available, Hurry!',
    priceTag: '$3,500+',
    startingPrice: 3500,
    delivery: '4–8 Weeks',
    bestFor: 'For established businesses with high-velocity product demands',
    description: 'Full-cycle modern web application engineering with authentication, stateful dashboards, and payment flows.',
    highlighted: true,
    features: [
      'Advanced web application & SaaS',
      'Custom bespoke UI/UX systems',
      'React 19 / Modern full-stack build',
      'Authentication & role-based RBAC',
      'Admin dashboard & analytics',
      'AI & automated workflows',
      'Cloud CI/CD & 30d dedicated support',
    ],
    techStack: ['React 19', 'TanStack Router', 'FastAPI / Node', 'Stripe', 'Supabase'],
    ctaText: 'Book a free call',
  },
  {
    id: 'custom-project',
    code: '04',
    name: 'Custom',
    badge: 'COMPLEX DIGITAL SYSTEMS',
    availability: 'Limited availability',
    priceTag: '$7,500+',
    startingPrice: 7500,
    delivery: 'Milestone Scope',
    bestFor: 'Tailored for large organizations with complex custom requirements',
    description: 'For complex digital products, SaaS, automation platforms, enterprise systems and custom business infrastructure.',
    features: [
      'End-to-end product architecture',
      'Custom software & ERP/CRM sync',
      'AI agent & LLM integrations',
      'Global multi-currency payment SLA',
      'High-security cloud infrastructure',
      'Dedicated senior partner capacity',
    ],
    techStack: ['Microservices', 'Autonomous Agents', 'Docker', 'Kubernetes', 'AWS/GCP'],
    ctaText: 'Contact Me',
  },
];

// 02. MONTHLY BUSINESS RETAINERS
interface RetainerPackage {
  id: string;
  code: string;
  name: string;
  badge?: string;
  availability: string;
  priceTag: string;
  startingPrice: number;
  cadence: string;
  bestFor: string;
  description: string;
  highlighted?: boolean;
  features: string[];
  ctaText: string;
}

const MONTHLY_RETAINERS: RetainerPackage[] = [
  {
    id: 'essential',
    code: '01',
    name: 'Starter',
    badge: 'CONTINUOUS SUPPORT',
    availability: '3 Slots Available, Hurry!',
    priceTag: '$750',
    startingPrice: 750,
    cadence: '/month',
    bestFor: 'Perfect for small projects or continuous technology support',
    description: 'For businesses that need continuous technology support.',
    features: [
      'Dedicated senior developer capacity',
      'Website & platform management',
      'Continuous development & bug fixes',
      'Security monitoring & speed tuning',
      'Priority ticket resolution SLA',
    ],
    ctaText: 'Book a free call',
  },
  {
    id: 'growth-retainer',
    code: '02',
    name: 'Accelerate',
    badge: 'EXPANSION & AI',
    availability: '2 Slots Available, Hurry!',
    priceTag: '$1,500',
    startingPrice: 1500,
    cadence: '/month',
    bestFor: 'For growing teams with consistent product & AI development needs',
    description: 'For companies actively improving their digital infrastructure.',
    features: [
      'Everything in Starter, plus:',
      'Continuous full-stack feature delivery',
      'Custom AI implementation & automation',
      'Conversion optimization & UI polish',
      'Third-party API & webhook integrations',
      'Monthly executive strategy session',
    ],
    ctaText: 'Book a free call',
  },
  {
    id: 'scale-retainer',
    code: '03',
    name: 'Scale',
    badge: 'MOST POPULAR',
    availability: '1 Slot Available, Hurry!',
    priceTag: '$3,000',
    startingPrice: 3000,
    cadence: '/month',
    bestFor: 'For established businesses with high-volume technical demands',
    description: 'For businesses treating technology as a growth engine.',
    highlighted: true,
    features: [
      'Everything in Accelerate, plus:',
      'Dedicated senior development squad',
      'SaaS & core product development',
      'Advanced autonomous AI pipelines',
      'Cloud infrastructure & database SLA',
      'Technical architecture leadership',
      'Bi-weekly strategic roadmap reviews',
    ],
    ctaText: 'Book a free call',
  },
  {
    id: 'fractional-cto',
    code: '04',
    name: 'Enterprise',
    badge: 'EXECUTIVE PARTNERSHIP',
    availability: 'Limited availability',
    priceTag: '$5,000+',
    startingPrice: 5000,
    cadence: '/month',
    bestFor: 'Tailored for large organizations with custom requirements',
    description: 'A dedicated executive technology leadership partnership without the full-time C-suite overhead.',
    features: [
      'Executive Fractional CTO leadership',
      'System architecture & security governance',
      'Product roadmaps & engineering direction',
      'AI & automation transformation strategy',
      'Weekly executive strategy & advisory',
      'Direct WhatsApp / Slack principal access',
    ],
    ctaText: 'Contact Me',
  },
];

// 03. ENTERPRISE PACKAGES
interface EnterprisePackage {
  id: string;
  code: string;
  name: string;
  badge?: string;
  availability: string;
  priceTag: string;
  startingPrice: number;
  delivery: string;
  bestFor: string;
  description: string;
  highlighted?: boolean;
  features: string[];
  ctaText: string;
}

const ENTERPRISE_SOLUTIONS: EnterprisePackage[] = [
  {
    id: 'ent-advisory',
    code: '01',
    name: 'Advisory & Blueprint',
    badge: 'STRATEGIC ARCHITECTURE',
    availability: '2 Slots Available',
    priceTag: '$5,000+',
    startingPrice: 5000,
    delivery: '2–4 Weeks SOW',
    bestFor: 'For enterprise leaders needing system audits, tech roadmaps & AI feasibility',
    description: 'Deep technical audits, cloud architecture designs, AI governance, and modernization roadmaps.',
    features: [
      'Enterprise architecture audit & review',
      'Legacy migration & cloud strategy',
      'AI feasibility & security roadmap',
      'Vendor & technology evaluation',
      'Detailed RFP & milestone blueprint',
    ],
    ctaText: 'Book a consultation',
  },
  {
    id: 'ent-modernization',
    code: '02',
    name: 'Modernization',
    badge: 'CORE RE-ENGINEERING',
    availability: '1 Slot Available',
    priceTag: '$10,000+',
    startingPrice: 10000,
    delivery: '6–12 Weeks SOW',
    bestFor: 'For companies transforming legacy monoliths into high-speed modern stacks',
    description: 'Complete replatforming of core web systems, customer portals, and internal workflows.',
    features: [
      'End-to-end frontend & backend rewrite',
      'React 19 & modern microservices',
      'Zero-downtime cloud migration',
      'Performance tuning to 95+ Core Vitals',
      'Comprehensive API & middleware',
      'Staged cutover & rollback safeguards',
    ],
    ctaText: 'Book a consultation',
  },
  {
    id: 'ent-platform',
    code: '03',
    name: 'AI & SaaS Platform',
    badge: 'MOST POPULAR',
    availability: '1 Slot Available, Hurry!',
    priceTag: '$15,000+',
    startingPrice: 15000,
    delivery: '8–16 Weeks SOW',
    bestFor: 'For enterprises launching multi-tenant SaaS, custom portals or AI agents',
    description: 'Custom digital platforms, autonomous AI workflows, multi-tenant databases, and enterprise billing.',
    highlighted: true,
    features: [
      'Multi-tenant enterprise SaaS platform',
      'Custom autonomous AI & RAG pipelines',
      'Enterprise RBAC, SSO (SAML) & audit logs',
      'High-volume Stripe billing infrastructure',
      'Real-time data sync & event streams',
      '100% IP transfer & infrastructure ownership',
    ],
    ctaText: 'Book a free call',
  },
  {
    id: 'ent-partnership',
    code: '04',
    name: 'Enterprise Partner',
    badge: 'DEDICATED ALLIANCE',
    availability: 'Limited availability',
    priceTag: '$20,000+',
    startingPrice: 20000,
    delivery: 'Dedicated Retainer / SLA',
    bestFor: 'For large organizations requiring a dedicated senior squad and fractional leadership',
    description: 'Dedicated senior engineering capacity, continuous product delivery, and technical leadership.',
    features: [
      'Dedicated senior engineering team',
      'Continuous roadmap & sprint delivery',
      'Custom internal tools & ERP sync',
      '24/7 critical system SLA & monitoring',
      'Enterprise security governance',
      'Quarterly executive strategy & review',
    ],
    ctaText: 'Discuss requirements',
  },
];

// 04. ADD-ON SERVICES
interface AddonService {
  id: string;
  name: string;
  category: 'Design' | 'Engineering' | 'AI & Automation' | 'Growth' | 'Support';
  icon: React.ElementType;
  priceNum: number;
  cadence?: string;
  timeline: string;
  description: string;
  deliverables: string[];
}

const ADDON_SERVICES: AddonService[] = [
  {
    id: 'uiux',
    name: 'UI/UX Design System',
    category: 'Design',
    icon: Palette,
    priceNum: 300,
    timeline: '3–5 Days',
    description: 'Bespoke UI screens, complete Figma design tokens, and modular components.',
    deliverables: ['Interactive Figma prototype', 'Scalable component tokens'],
  },
  {
    id: 'redesign',
    name: 'Website Redesign & Polish',
    category: 'Design',
    icon: LayoutTemplate,
    priceNum: 750,
    timeline: '1–2 Weeks',
    description: 'Modern visual overhaul, conversion UX improvements, and motion aesthetics.',
    deliverables: ['Complete layout modernization', 'Micro-interactions & asset tuning'],
  },
  {
    id: 'shopify',
    name: 'Shopify & E-Commerce',
    category: 'Engineering',
    icon: ShoppingBag,
    priceNum: 800,
    timeline: '1–2 Weeks',
    description: 'Custom Liquid theme engineering, cart conversion tuning, and inventory sync.',
    deliverables: ['Custom Liquid architecture', 'Third-party app & checkout integration'],
  },
  {
    id: 'wordpress',
    name: 'WordPress & Headless CMS',
    category: 'Engineering',
    icon: Boxes,
    priceNum: 500,
    timeline: '5–7 Days',
    description: 'Custom Gutenberg blocks, ACF flexible fields, and sub-second load times.',
    deliverables: ['Tailored Gutenberg block kit', 'Security hardening & cache tuning'],
  },
  {
    id: 'saasmvp',
    name: '0→1 SaaS MVP Engineering',
    category: 'Engineering',
    icon: Code2,
    priceNum: 3000,
    timeline: '3–4 Weeks',
    description: 'Production-ready web application with Auth, database, APIs, and Stripe payments.',
    deliverables: ['Auth, RBAC & Postgres/Supabase DB', 'Stripe checkout & user dashboards'],
  },
  {
    id: 'ai',
    name: 'Custom AI Agents & RAG',
    category: 'AI & Automation',
    icon: Bot,
    priceNum: 750,
    timeline: '1–2 Weeks',
    description: 'Custom LLM pipelines, autonomous tool calls, and vector database embeddings.',
    deliverables: ['Custom OpenAI/Anthropic pipelines', 'MCP tools & document retrieval (RAG)'],
  },
  {
    id: 'automation',
    name: 'Business Operations Automation',
    category: 'AI & Automation',
    icon: Workflow,
    priceNum: 500,
    timeline: '3–5 Days',
    description: 'End-to-end webhook pipelines, Make/Zapier automations, and CRM integrations.',
    deliverables: ['Multi-app automated workflows', 'Data validation & error alert webhooks'],
  },
  {
    id: 'api',
    name: 'API & Middleware Pipelines',
    category: 'Engineering',
    icon: Server,
    priceNum: 300,
    timeline: '2–4 Days',
    description: 'Secure REST/GraphQL integrations, webhook ingestion, and middleware.',
    deliverables: ['High-throughput API endpoints', 'Payload sanitization & rate limiting'],
  },
  {
    id: 'payment',
    name: 'Multi-Currency Checkout',
    category: 'Engineering',
    icon: CreditCard,
    priceNum: 300,
    timeline: '2–3 Days',
    description: 'Stripe, PayPal, or localized multi-currency payment infrastructure.',
    deliverables: ['Stripe Customer Portal & webhooks', 'Invoice generation & tax calculation'],
  },
  {
    id: 'perf',
    name: 'Core Web Vitals 95+ Tuning',
    category: 'Engineering',
    icon: Gauge,
    priceNum: 250,
    timeline: '2–3 Days',
    description: 'Sub-second page speeds, asset compression, code splitting, and cache audit.',
    deliverables: ['95+ mobile & desktop Google score', 'Image CDN & script defer optimization'],
  },
  {
    id: 'seo',
    name: 'Technical SEO & GEO Citability',
    category: 'Growth',
    icon: Search,
    priceNum: 300,
    timeline: '3–5 Days',
    description: 'Schema JSON-LD, crawl budget tuning, OpenGraph, and LLM search discovery.',
    deliverables: ['Complete Schema.org structured data', 'Sitemap, robots.txt & GEO indexation'],
  },
  {
    id: 'maintenance',
    name: 'Continuous Maintenance & SLA',
    category: 'Support',
    icon: ShieldCheck,
    priceNum: 250,
    cadence: '/mo',
    timeline: 'Continuous Support',
    description: 'Weekly automated backups, uptime monitoring, security patches, and minor fixes.',
    deliverables: ['24/7 uptime monitoring & alerts', 'Weekly code & dependency patches'],
  },
];

// 05. COMPREHENSIVE CAPABILITIES COMPARISON DATASETS
const ENGAGEMENT_OVERVIEW = [
  { metric: 'Best For', onetime: 'Specific projects', monthly: 'Continuous growth', enterprise: 'Complex organizations' },
  { metric: 'Engagement', onetime: 'Project-based', monthly: 'Ongoing', enterprise: 'Strategic partnership' },
  { metric: 'Duration', onetime: '1–8 weeks', monthly: '3+ months', enterprise: '6–24+ months' },
  { metric: 'Development', onetime: 'Scope-based', monthly: 'Continuous', enterprise: 'Dedicated' },
  { metric: 'Strategy', onetime: 'Project-focused', monthly: 'Ongoing', enterprise: 'Executive-level' },
  { metric: 'AI & Automation', onetime: 'Optional', monthly: 'Included in higher plans', enterprise: 'Core capability' },
  { metric: 'Infrastructure', onetime: 'Project-based', monthly: 'Managed', enterprise: 'Enterprise architecture' },
  { metric: 'Support', onetime: 'Post-launch', monthly: 'Priority', enterprise: 'Dedicated / SLA' },
  { metric: 'Pricing', onetime: 'Fixed / Scope-based', monthly: 'Monthly', enterprise: 'Custom' },
];

const ONETIME_COMPARISON = [
  { feature: 'Business Website', launch: '✓', growth: '✓', scale: '✓', custom: '✓' },
  { feature: 'Custom UI/UX', launch: 'Basic', growth: '✓', scale: 'Advanced', custom: 'Custom' },
  { feature: 'Responsive Design', launch: '✓', growth: '✓', scale: '✓', custom: '✓' },
  { feature: 'CMS', launch: '✓', growth: '✓', scale: '✓', custom: '✓' },
  { feature: 'E-commerce', launch: '—', growth: '✓', scale: '✓', custom: '✓' },
  { feature: 'Custom Web Application', launch: '—', growth: '—', scale: '✓', custom: '✓' },
  { feature: 'React / Next.js', launch: '—', growth: 'Optional', scale: '✓', custom: '✓' },
  { feature: 'API Integration', launch: 'Basic', growth: '✓', scale: 'Advanced', custom: 'Custom' },
  { feature: 'Payment Integration', launch: '—', growth: '✓', scale: '✓', custom: '✓' },
  { feature: 'Authentication', launch: '—', growth: 'Optional', scale: '✓', custom: '✓' },
  { feature: 'Admin Dashboard', launch: '—', growth: 'Optional', scale: '✓', custom: '✓' },
  { feature: 'AI Integration', launch: '—', growth: 'Optional', scale: '✓', custom: '✓' },
  { feature: 'Business Automation', launch: '—', growth: 'Optional', scale: '✓', custom: '✓' },
  { feature: 'SEO Foundation', launch: '✓', growth: '✓', scale: 'Advanced', custom: 'Advanced' },
  { feature: 'Performance Optimization', launch: '✓', growth: '✓', scale: 'Advanced', custom: 'Advanced' },
  { feature: 'Analytics', launch: '✓', growth: '✓', scale: 'Advanced', custom: 'Custom' },
  { feature: 'Security Configuration', launch: 'Basic', growth: '✓', scale: 'Advanced', custom: 'Enterprise' },
  { feature: 'Cloud Deployment', launch: '✓', growth: '✓', scale: '✓', custom: '✓' },
  { feature: 'Documentation', launch: 'Basic', growth: '✓', scale: '✓', custom: 'Comprehensive' },
  { feature: 'Post-Launch Support', launch: '7 days', growth: '14 days', scale: '30 days', custom: 'Custom' },
  { feature: 'Starting Price', launch: '$500+', growth: '$1,500+', scale: '$3,500+', custom: '$7,500+' },
];

const MONTHLY_COMPARISON = [
  { feature: 'Website Management', essential: '✓', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Technical Support', essential: '✓', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Bug Fixes', essential: '✓', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Security Monitoring', essential: '✓', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Performance Optimization', essential: '✓', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Continuous Development', essential: 'Limited', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'New Features', essential: 'Limited', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'AI Integration', essential: '—', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Business Automation', essential: '—', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'API Development', essential: '—', growth: 'Optional', scale: '✓', fractional: '✓' },
  { feature: 'Third-Party Integrations', essential: 'Basic', growth: '✓', scale: 'Advanced', fractional: 'Advanced' },
  { feature: 'SaaS Development', essential: '—', growth: '—', scale: '✓', fractional: '✓' },
  { feature: 'Product Strategy', essential: '—', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Technical Architecture', essential: '—', growth: 'Optional', scale: '✓', fractional: '✓' },
  { feature: 'Infrastructure Management', essential: '—', growth: '—', scale: '✓', fractional: '✓' },
  { feature: 'Engineering Leadership', essential: '—', growth: '—', scale: 'Optional', fractional: '✓' },
  { feature: 'Technology Roadmap', essential: '—', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Analytics & Optimization', essential: 'Basic', growth: '✓', scale: 'Advanced', fractional: 'Advanced' },
  { feature: 'Strategy Sessions', essential: '—', growth: 'Monthly', scale: 'Bi-weekly', fractional: 'Weekly' },
  { feature: 'Priority Support', essential: '—', growth: '✓', scale: '✓', fractional: '✓' },
  { feature: 'Dedicated Development Capacity', essential: '—', growth: 'Limited', scale: '✓', fractional: '✓' },
  { feature: 'CTO-Level Advisory', essential: '—', growth: '—', scale: '—', fractional: '✓' },
  { feature: 'Starting Price', essential: '$750/mo', growth: '$1,500/mo', scale: '$3,000/mo', fractional: '$5,000+/mo' },
];

const ENTERPRISE_COMPARISON = [
  { capability: 'Enterprise Websites', transformation: '✓', partnership: '✓' },
  { capability: 'SaaS Platforms', transformation: '✓', partnership: '✓' },
  { capability: 'Custom Software', transformation: '✓', partnership: '✓' },
  { capability: 'ERP / CRM Systems', transformation: '✓', partnership: '✓' },
  { capability: 'AI Implementation', transformation: '✓', partnership: '✓' },
  { capability: 'Business Automation', transformation: '✓', partnership: '✓' },
  { capability: 'API Ecosystem', transformation: '✓', partnership: '✓' },
  { capability: 'Payment Infrastructure', transformation: '✓', partnership: '✓' },
  { capability: 'Multi-System Integration', transformation: '✓', partnership: '✓' },
  { capability: 'Data & Analytics', transformation: '✓', partnership: '✓' },
  { capability: 'Security Architecture', transformation: '✓', partnership: '✓' },
  { capability: 'Cloud Architecture', transformation: '✓', partnership: '✓' },
  { capability: 'DevOps & Infrastructure', transformation: '✓', partnership: '✓' },
  { capability: 'Product Architecture', transformation: '✓', partnership: '✓' },
  { capability: 'Technical Roadmap', transformation: '✓', partnership: '✓' },
  { capability: 'Dedicated Engineering', transformation: 'Optional', partnership: '✓' },
  { capability: 'Product Management', transformation: 'Optional', partnership: '✓' },
  { capability: 'Engineering Leadership', transformation: 'Optional', partnership: '✓' },
  { capability: 'Technology Strategy', transformation: '✓', partnership: '✓' },
  { capability: 'Long-Term Product Development', transformation: '✓', partnership: '✓' },
  { capability: 'Internal Business Tools', transformation: '✓', partnership: '✓' },
  { capability: 'AI & Automation Strategy', transformation: '✓', partnership: '✓' },
  { capability: 'Vendor / Technology Management', transformation: 'Optional', partnership: '✓' },
  { capability: 'Ongoing Optimization', transformation: '✓', partnership: '✓' },
  { capability: 'SLA / Priority Support', transformation: 'Custom', partnership: 'Custom' },
  { capability: 'Pricing', transformation: '$10,000+', partnership: 'Custom' },
];

const FAQS = [
  {
    question: 'How do I choose between One-Time Projects, Monthly Retainers, and Enterprise?',
    answer:
      'If you have a defined build or specific release in mind, a One-Time Project is ideal. If you want continuous development, feature iteration, AI automation, and ongoing improvements, a Monthly Retainer provides dedicated monthly capacity. If you represent an established company needing complex digital transformation, custom architecture, or a fractional technology partnership, Enterprise is tailored specifically for you.',
  },
  {
    question: 'How does milestone-based billing work for One-Time Projects?',
    answer:
      'For project engagements, we divide the investment into transparent milestone stages (e.g., 30% kickoff & architecture blueprint, 40% core functional build, 30% staging verification & deployment). You review and approve each deliverable on live preview environments before disbursing milestone payments.',
  },
  {
    question: 'Who owns the intellectual property and code?',
    answer:
      'You own 100% of the intellectual property, design assets, and source code from day one. All repositories, cloud infrastructures, and third-party keys are provisioned directly in your organization’s accounts with zero vendor lock-in.',
  },
  {
    question: 'Can I combine multiple Add-On Services with a project or retainer?',
    answer:
      'Yes. You can bundle any add-on service (such as AI Integrations, Payment Gateways, or Technical SEO) into your project scope or attach it to an ongoing retainer at transparent fixed rates.',
  },
  {
    question: 'What is the commitment period for Monthly Retainers?',
    answer:
      'Monthly Retainers operate on a flexible month-to-month agreement with a simple 30-day notice to pause or adjust capacity. There are no punitive long-term lock-ins.',
  },
  {
    question: 'Do you offer a non-disclosure agreement (NDA) before discussing details?',
    answer:
      'Yes, bilateral mutual NDAs are provided and signed before any proprietary documents, trade secrets, or codebase access are shared.',
  },
];

interface InquiryModalData {
  title: string;
  category?: string;
  price?: string;
  delivery?: string;
  type?: 'project' | 'retainer' | 'enterprise' | 'addon' | 'custom';
  description?: string;
}

export function PricingPage() {
  const [activeModel, setActiveModel] = useState<BuyingModel>('onetime');
  const [compareTab, setCompareTab] = useState<'onetime' | 'monthly' | 'enterprise'>('onetime');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [addonCategory, setAddonCategory] = useState<string>('All');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'BDT'>('USD');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryModalData | null>({
    title: 'Scale Package',
    category: 'One-Time Project',
    price: '$3,500+',
    delivery: '4–8 Weeks',
    type: 'project',
    description: 'Full-cycle modern web application engineering with authentication, stateful dashboards, and payment flows.',
  });

  const handleSelectPackage = (inquiry: InquiryModalData) => {
    setSelectedInquiry(inquiry);
    const el = document.getElementById('inquiry-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatCurrency = (usdAmount: number, suffix: string = '') => {
    if (currency === 'EUR') return `€${Math.round(usdAmount * 0.92).toLocaleString()}${suffix}`;
    if (currency === 'GBP') return `£${Math.round(usdAmount * 0.78).toLocaleString()}${suffix}`;
    if (currency === 'BDT') return `৳${Math.round(usdAmount * 122).toLocaleString()}${suffix}`;
    return `$${usdAmount.toLocaleString()}${suffix}`;
  };

  const renderTableCell = (val: string, isPriceRow: boolean = false) => {
    if (isPriceRow) {
      return (
        <span className="text-sm font-extrabold text-[#163300] font-sans">
          {val}
        </span>
      );
    }
    if (val === '✓') {
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#163300]/10 text-[#163300] font-black">
          <Check size={13} className="stroke-[3]" />
        </span>
      );
    }
    if (val === '—') {
      return <span className="text-[#163300]/30 font-mono text-base font-bold">—</span>;
    }
    if (val === 'Advanced' || val === 'Enterprise' || val === 'Comprehensive') {
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-[#DCFF85] text-[#163300] border border-[#163300]/25 shadow-2xs">
          {val}
        </span>
      );
    }
    if (val === 'Optional' || val === 'Limited' || val === 'Basic') {
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#163300] bg-[#163300]/[0.08] border border-[#163300]/20">
          {val}
        </span>
      );
    }
    if (val === 'Custom') {
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-[#163300] text-[#DCFF85] border border-[#163300] shadow-xs">
          {val}
        </span>
      );
    }
    return <span className="text-xs font-bold text-[#163300] font-mono">{val}</span>;
  };

  // Filtered Addons
  const filteredAddons = useMemo(() => {
    if (addonCategory === 'All') return ADDON_SERVICES;
    return ADDON_SERVICES.filter((a) => a.category === addonCategory);
  }, [addonCategory]);

  return (
    <SubrouteLayout page="pricing" hideFooterCta={true}>
      {/* 1. HERO SECTION (WITH SIGNATURE 3D ORB BACKGROUND & REDESIGNED GUARANTEE CARDS) */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#FAF9F6] border-b border-[#163300]/[0.06]">
        <ThreeBackground variant="orb" accentColor={0x9fe870} className="absolute inset-0 w-full h-full pointer-events-none opacity-35" />

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white ring-1 ring-[#163300]/[0.08] shadow-2xs mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#163300] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#163300]">
                Pricing &amp; Engagement Models
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
              Build once. Grow continuously.{' '}
              <span className="font-serif italic font-normal text-[#2e5513]">
                Scale without limits.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#163300]/75 max-w-2xl mx-auto mb-12 leading-relaxed">
              Whether you need a high-performance website, ongoing technology support, or a complete digital transformation, choose the engagement model that fits your business.
            </p>

            {/* Redesigned Equal-Height Guarantee Cards (Bare Left Icons) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto items-stretch">
              {[
                { icon: ShieldCheck, title: '100% IP Ownership', desc: 'Full code & repository transfer' },
                { icon: Lock, title: 'Bilateral Mutual NDA', desc: 'Signed before project briefing' },
                { icon: Zap, title: 'Direct Principal Access', desc: 'Zero junior outsourcing guarantee' },
                { icon: Clock, title: 'Milestone Escrow', desc: 'Verify on staging before payout' },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="group relative h-full bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#163300]/[0.08] shadow-[0_2px_8px_rgba(22,51,0,0.03)] hover:shadow-[0_6px_20px_rgba(22,51,0,0.06)] hover:border-[#163300]/20 transition-all duration-300 flex items-center gap-3.5 text-left"
                >
                  {/* Bare Icon on the Left without background box */}
                  <pill.icon
                    size={22}
                    strokeWidth={1.8}
                    className="text-[#163300] shrink-0 group-hover:scale-110 group-hover:text-[#2e5513] transition-transform duration-300"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="text-xs font-bold text-[#163300] tracking-tight truncate">
                      {pill.title}
                    </div>
                    <div className="text-[11px] text-[#163300]/65 leading-snug mt-0.5 line-clamp-2">
                      {pill.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. PRICING SECTION (FULL-WIDTH · CURRENCY SWITCHER · COMPACT TABS · PRECISION CARDS) */}
      <section id="pricing-models" className="py-20 md:py-28 relative z-10 bg-white">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-8">
          
          {/* SECTION EDITORIAL HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163300]/[0.04] ring-1 ring-[#163300]/[0.08] mb-3.5">
              <Sparkles size={13} className="text-[#163300]" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#163300]">
                01 · Transparent Investment Tiers
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300] leading-[1.12] mb-3">
              Predictable pricing.{' '}
              <span className="font-serif italic font-normal text-[#2e5513]">
                Zero hidden surprises.
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-[#163300]/75 max-w-xl mx-auto leading-relaxed">
              Select an engagement model tailored to your current stage—from rapid one-time builds to high-velocity retainers and enterprise partnerships.
            </p>
          </div>

          {/* COMPACT FLOATING SWITCHER & CURRENCY SELECTOR */}
          <div className="flex flex-col items-center justify-center gap-3.5 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Buying Model Tabs */}
              <div className="p-1 rounded-full bg-[#163300]/[0.05] ring-1 ring-[#163300]/10 shadow-[inset_0_2px_4px_rgba(22,51,0,0.03)] backdrop-blur-md flex items-center">
                {[
                  { id: 'onetime', label: 'One-Time', icon: Boxes },
                  { id: 'monthly', label: 'Monthly', icon: RefreshCw },
                  { id: 'enterprise', label: 'Enterprise', icon: Building2 },
                ].map((tab) => {
                  const isSelected = activeModel === tab.id;
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveModel(tab.id as BuyingModel)}
                      className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                        isSelected
                          ? 'text-[#163300] font-bold'
                          : 'text-[#111111] hover:text-[#163300] hover:bg-black/[0.04]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="pricing-switcher-pill"
                          className="absolute inset-0 bg-[#DCFF85] rounded-full border border-[#163300]/15 shadow-xs"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5 text-inherit">
                        <Icon size={14} className="shrink-0 text-inherit" />
                        <span className="text-inherit font-semibold">{tab.label}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Currency Switcher */}
              <div className="p-1 rounded-full bg-[#163300]/[0.05] ring-1 ring-[#163300]/10 shadow-inner flex items-center gap-0.5">
                {[
                  { id: 'USD', label: 'USD ($)' },
                  { id: 'EUR', label: 'EUR (€)' },
                  { id: 'GBP', label: 'GBP (£)' },
                  { id: 'BDT', label: 'BDT (৳)' },
                ].map((curr) => {
                  const isSelected = currency === curr.id;
                  return (
                    <button
                      key={curr.id}
                      type="button"
                      onClick={() => setCurrency(curr.id as any)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer select-none ${
                        isSelected
                          ? '!bg-[#163300] !text-[#DCFF85] hover:!bg-[#224808] hover:!text-[#DCFF85] shadow-xs'
                          : 'text-[#111111] hover:text-[#163300] hover:bg-black/[0.05]'
                      }`}
                    >
                      {curr.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-[#163300]/60 text-center font-medium flex items-center justify-center gap-1.5">
              <span>No Extra Hidden Fees</span>
              <span className="text-[#163300]/30">·</span>
              <span>100% IP Ownership</span>
              <span className="text-[#163300]/30">·</span>
              <span>Bilateral Mutual NDA</span>
              <span className="text-[#163300]/50 ml-0.5">ⓘ</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* MODEL 01: ONE-TIME PROJECTS */}
            {activeModel === 'onetime' && (
              <motion.div
                key="onetime"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch pt-2">
                  {ONETIME_PACKAGES.map((pkg) => {
                    const isFeatured = pkg.highlighted;
                    const priceFormatted = formatCurrency(pkg.startingPrice, '+');

                    return (
                      <div
                        key={pkg.id}
                        className={`group relative h-full rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                          isFeatured
                            ? 'bg-gradient-to-b from-[#DCFF85]/35 via-[#DCFF85]/10 to-white border-2 border-[#9FE870] shadow-[0_16px_36px_rgba(22,51,0,0.1)] scale-[1.01]'
                            : 'bg-white border border-[#163300]/[0.08] shadow-[0_2px_12px_rgba(22,51,0,0.03)] hover:shadow-[0_12px_28px_rgba(22,51,0,0.07)] hover:border-[#163300]/20'
                        }`}
                      >
                        {/* Perched Top Badge on Featured Card */}
                        {isFeatured && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#9FE870] text-[#163300] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm whitespace-nowrap z-20">
                            Most popular
                          </div>
                        )}

                        <div className="flex-1 flex flex-col">
                          {/* Status Pill */}
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#163300]/[0.05] text-[10px] font-medium text-[#163300] mb-4 self-start">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isFeatured ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                              }`}
                            />
                            <span>{pkg.availability}</span>
                          </div>

                          <h3 className="text-xl font-bold tracking-tight text-[#163300] mb-1.5">
                            {pkg.name}
                          </h3>

                          <p className="text-xs text-[#163300]/70 mb-4 leading-relaxed min-h-[34px]">
                            {pkg.bestFor}
                          </p>

                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-[#163300]">
                                {priceFormatted}
                              </span>
                            </div>

                            {/* Negotiable Scope Tooltip */}
                            <div className="relative group/tip flex items-center">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full !bg-[#F0F2ED] !border !border-[#E2E5DC] !text-[#163300] hover:!bg-[#163300] hover:!text-[#DCFF85] hover:!border-[#163300] text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer transition-all shadow-2xs select-none"
                                title="Flexible pricing based on project scope"
                              >
                                <span>Negotiable</span>
                                <Info size={11} className="shrink-0 opacity-70" />
                              </button>
                              <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-60 rounded-xl bg-[#163300] p-3 text-[11px] leading-snug text-white shadow-2xl opacity-0 translate-y-1 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 group-focus-within/tip:opacity-100 group-focus-within/tip:translate-y-0 transition-all duration-200 z-40 border border-white/10">
                                <div className="font-bold text-[#DCFF85] mb-1 flex items-center gap-1">
                                  <span>Scope-Flexible Pricing</span>
                                </div>
                                <p className="text-white/80">
                                  Not a rigid price tag. Final investment is adjusted to your exact feature requirements, timeline, and startup budget.
                                </p>
                                <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-[#163300]" />
                              </div>
                            </div>
                          </div>

                          <div className="text-[11px] text-[#163300]/55 mb-5 font-medium">
                            Milestone escrow · Delivery: {pkg.delivery}
                          </div>

                          {/* CTA Button placed directly below price area */}
                          <Button
                            text={pkg.ctaText}
                            icon={<ArrowRight size={14} />}
                            onClick={() => {
                              handleSelectPackage({
                                title: `${pkg.name} Package`,
                                category: pkg.badge || 'One-Time Project',
                                price: priceFormatted,
                                delivery: pkg.delivery,
                                type: 'project',
                                description: pkg.description,
                              });
                            }}
                            variant={isFeatured ? 'dark' : 'secondary'}
                            className={`w-full py-3 text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 ${
                              isFeatured
                                ? '!bg-[#163300] !border-[#163300] !text-[#DCFF85] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-white'
                                : '!bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]'
                            }`}
                          />

                          {/* Link below Book a Call Button */}
                          <div className="flex justify-center mt-2.5">
                            <ActionLink
                              href="#all-services"
                              text="See all included capabilities"
                              icon={<ArrowRight size={12} className="rotate-90" />}
                              className="text-xs font-medium text-[#163300]/70 hover:text-[#163300] justify-center transition-colors"
                            />
                          </div>

                          {/* Divider */}
                          <div className="w-full h-px bg-[#163300]/[0.08] my-5" />

                          {/* Features */}
                          <div className="space-y-2.5 text-xs flex-1">
                            <div className="text-[11px] font-bold text-[#163300] font-mono uppercase tracking-wider mb-3">
                              What's Included:
                            </div>
                            {pkg.features.map((feat, fi) => (
                              <div key={fi} className="flex items-start gap-2 text-[#163300]/85 leading-snug">
                                <Check size={13} className="text-[#163300] shrink-0 mt-0.5 stroke-[2.5]" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Compare Link at Bottom of Card */}
                          <div className="mt-4 pt-3.5 border-t border-[#163300]/[0.08] flex items-center justify-center text-center">
                            <ActionLink
                              text="Compare all package tiers"
                              icon={<ArrowRight size={13} />}
                              onClick={() => {
                                setCompareTab('onetime');
                                document.getElementById('compare-matrix')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center justify-center text-center text-xs font-semibold text-[#163300]/75 hover:text-[#163300] cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* MODEL 02: MONTHLY BUSINESS RETAINERS */}
            {activeModel === 'monthly' && (
              <motion.div
                key="monthly"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch pt-2">
                  {MONTHLY_RETAINERS.map((pkg) => {
                    const isFeatured = pkg.highlighted;
                    const priceFormatted = formatCurrency(pkg.startingPrice, pkg.startingPrice >= 5000 ? '+' : '');

                    return (
                      <div
                        key={pkg.id}
                        className={`group relative h-full rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                          isFeatured
                            ? 'bg-gradient-to-b from-[#DCFF85]/35 via-[#DCFF85]/10 to-white border-2 border-[#9FE870] shadow-[0_16px_36px_rgba(22,51,0,0.1)] scale-[1.01]'
                            : 'bg-white border border-[#163300]/[0.08] shadow-[0_2px_12px_rgba(22,51,0,0.03)] hover:shadow-[0_12px_28px_rgba(22,51,0,0.07)] hover:border-[#163300]/20'
                        }`}
                      >
                        {/* Perched Top Badge on Featured Card */}
                        {isFeatured && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#9FE870] text-[#163300] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm whitespace-nowrap z-20">
                            Most popular
                          </div>
                        )}

                        <div className="flex-1 flex flex-col">
                          {/* Status Pill */}
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#163300]/[0.05] text-[10px] font-medium text-[#163300] mb-4 self-start">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isFeatured ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                              }`}
                            />
                            <span>{pkg.availability}</span>
                          </div>

                          <h3 className="text-xl font-bold tracking-tight text-[#163300] mb-1.5">
                            {pkg.name}
                          </h3>

                          <p className="text-xs text-[#163300]/70 mb-4 leading-relaxed min-h-[34px]">
                            {pkg.bestFor}
                          </p>

                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-[#163300]">
                                {priceFormatted}
                              </span>
                              <span className="text-xs font-mono text-[#163300]/60">
                                {pkg.cadence}
                              </span>
                            </div>

                            {/* Negotiable Scope Tooltip */}
                            <div className="relative group/tip flex items-center">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full !bg-[#F0F2ED] !border !border-[#E2E5DC] !text-[#163300] hover:!bg-[#163300] hover:!text-[#DCFF85] hover:!border-[#163300] text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer transition-all shadow-2xs select-none"
                                title="Flexible retainer hours & commitment"
                              >
                                <span>Negotiable</span>
                                <Info size={11} className="shrink-0 opacity-70" />
                              </button>
                              <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-60 rounded-xl bg-[#163300] p-3 text-[11px] leading-snug text-white shadow-2xl opacity-0 translate-y-1 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 group-focus-within/tip:opacity-100 group-focus-within/tip:translate-y-0 transition-all duration-200 z-40 border border-white/10">
                                <div className="font-bold text-[#DCFF85] mb-1 flex items-center gap-1">
                                  <span>Flexible Retainer Sprints</span>
                                </div>
                                <p className="text-white/80">
                                  Monthly sprint hours, technology stack scope, and commitment can be tailored to match your startup's roadmap and runway.
                                </p>
                                <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-[#163300]" />
                              </div>
                            </div>
                          </div>

                          <div className="text-[11px] text-[#163300]/55 mb-5 font-medium">
                            Cancel any time · Dedicated partner
                          </div>

                          {/* CTA Button placed directly below price area */}
                          <Button
                            text={pkg.ctaText}
                            icon={<ArrowRight size={14} />}
                            onClick={() => {
                              handleSelectPackage({
                                title: `${pkg.name} Retainer`,
                                category: pkg.badge || 'Monthly Retainer',
                                price: `${priceFormatted}${pkg.cadence}`,
                                delivery: pkg.availability,
                                type: 'retainer',
                                description: pkg.description,
                              });
                            }}
                            variant={isFeatured ? 'dark' : 'secondary'}
                            className={`w-full py-3 text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 ${
                              isFeatured
                                ? '!bg-[#163300] !border-[#163300] !text-[#DCFF85] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-white'
                                : '!bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]'
                            }`}
                          />

                          {/* Link below Book a Call Button */}
                          <div className="flex justify-center mt-2.5">
                            <ActionLink
                              href="#all-services"
                              text="See all included capabilities"
                              icon={<ArrowRight size={12} className="rotate-90" />}
                              className="text-xs font-medium text-[#163300]/70 hover:text-[#163300] justify-center transition-colors"
                            />
                          </div>

                          {/* Divider */}
                          <div className="w-full h-px bg-[#163300]/[0.08] my-5" />

                          {/* Features */}
                          <div className="space-y-2.5 text-xs flex-1">
                            <div className="text-[11px] font-bold text-[#163300] font-mono uppercase tracking-wider mb-3">
                              What's Included:
                            </div>
                            {pkg.features.map((feat, fi) => (
                              <div key={fi} className="flex items-start gap-2 text-[#163300]/85 leading-snug">
                                <Check size={13} className="text-[#163300] shrink-0 mt-0.5 stroke-[2.5]" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Compare Link at Bottom of Card */}
                          <div className="mt-4 pt-3.5 border-t border-[#163300]/[0.08] flex items-center justify-center text-center">
                            <ActionLink
                              text="Compare all retainer tiers"
                              icon={<ArrowRight size={13} />}
                              onClick={() => {
                                setCompareTab('monthly');
                                document.getElementById('compare-matrix')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center justify-center text-center text-xs font-semibold text-[#163300]/75 hover:text-[#163300] cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* MODEL 03: ENTERPRISE SOLUTIONS (UNIFORM 4-CARD STRUCTURE MATCHING ALL TIERS) */}
            {activeModel === 'enterprise' && (
              <motion.div
                key="enterprise"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch pt-2">
                  {ENTERPRISE_SOLUTIONS.map((pkg) => {
                    const isFeatured = pkg.highlighted;
                    const priceFormatted = formatCurrency(pkg.startingPrice, '+');

                    return (
                      <div
                        key={pkg.id}
                        className={`group relative h-full rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                          isFeatured
                            ? 'bg-gradient-to-b from-[#DCFF85]/35 via-[#DCFF85]/10 to-white border-2 border-[#9FE870] shadow-[0_16px_36px_rgba(22,51,0,0.1)] scale-[1.01]'
                            : 'bg-white border border-[#163300]/[0.08] shadow-[0_2px_12px_rgba(22,51,0,0.03)] hover:shadow-[0_12px_28px_rgba(22,51,0,0.07)] hover:border-[#163300]/20'
                        }`}
                      >
                        {/* Perched Top Badge on Featured Card */}
                        {isFeatured && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#9FE870] text-[#163300] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm whitespace-nowrap z-20">
                            Most popular
                          </div>
                        )}

                        <div className="flex-1 flex flex-col">
                          {/* Status Pill */}
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#163300]/[0.05] text-[10px] font-medium text-[#163300] mb-4 self-start">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isFeatured ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                              }`}
                            />
                            <span>{pkg.availability}</span>
                          </div>

                          <h3 className="text-xl font-bold tracking-tight text-[#163300] mb-1.5">
                            {pkg.name}
                          </h3>

                          <p className="text-xs text-[#163300]/70 mb-4 leading-relaxed min-h-[34px]">
                            {pkg.bestFor}
                          </p>

                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-[#163300]">
                                {priceFormatted}
                              </span>
                            </div>

                            {/* Negotiable Scope Tooltip */}
                            <div className="relative group/tip flex items-center">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full !bg-[#F0F2ED] !border !border-[#E2E5DC] !text-[#163300] hover:!bg-[#163300] hover:!text-[#DCFF85] hover:!border-[#163300] text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer transition-all shadow-2xs select-none"
                                title="Custom SOW & Enterprise SLA"
                              >
                                <span>Negotiable</span>
                                <Info size={11} className="shrink-0 opacity-70" />
                              </button>
                              <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-60 rounded-xl bg-[#163300] p-3 text-[11px] leading-snug text-white shadow-2xl opacity-0 translate-y-1 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 group-focus-within/tip:opacity-100 group-focus-within/tip:translate-y-0 transition-all duration-200 z-40 border border-white/10">
                                <div className="font-bold text-[#DCFF85] mb-1 flex items-center gap-1">
                                  <span>Custom Enterprise SOW</span>
                                </div>
                                <p className="text-white/80">
                                  Enterprise engagements are tailored with custom SOWs, milestone roadmaps, and payment terms designed for your organization.
                                </p>
                                <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-[#163300]" />
                              </div>
                            </div>
                          </div>

                          <div className="text-[11px] text-[#163300]/55 mb-5 font-medium">
                            Bilateral SLA · Delivery: {pkg.delivery}
                          </div>

                          {/* CTA Button placed directly below price area */}
                          <Button
                            text={pkg.ctaText}
                            icon={<ArrowRight size={14} />}
                            onClick={() => {
                              handleSelectPackage({
                                title: `${pkg.name} Enterprise`,
                                category: pkg.badge || 'Enterprise Solution',
                                price: priceFormatted,
                                delivery: pkg.delivery,
                                type: 'enterprise',
                                description: pkg.description,
                              });
                            }}
                            variant={isFeatured ? 'dark' : 'secondary'}
                            className={`w-full py-3 text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 ${
                              isFeatured
                                ? '!bg-[#163300] !border-[#163300] !text-[#DCFF85] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-white'
                                : '!bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]'
                            }`}
                          />

                          {/* Link below Book a Call Button */}
                          <div className="flex justify-center mt-2.5">
                            <ActionLink
                              href="#all-services"
                              text="See all included capabilities"
                              icon={<ArrowRight size={12} className="rotate-90" />}
                              className="text-xs font-medium text-[#163300]/70 hover:text-[#163300] justify-center transition-colors"
                            />
                          </div>

                          {/* Divider */}
                          <div className="w-full h-px bg-[#163300]/[0.08] my-5" />

                          {/* Features */}
                          <div className="space-y-2.5 text-xs flex-1">
                            <div className="text-[11px] font-bold text-[#163300] font-mono uppercase tracking-wider mb-3">
                              What's Included:
                            </div>
                            {pkg.features.map((feat, fi) => (
                              <div key={fi} className="flex items-start gap-2 text-[#163300]/85 leading-snug">
                                <Check size={13} className="text-[#163300] shrink-0 mt-0.5 stroke-[2.5]" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Compare Link at Bottom of Card */}
                          <div className="mt-4 pt-3.5 border-t border-[#163300]/[0.08] flex items-center justify-center text-center">
                            <ActionLink
                              text="Compare enterprise capabilities"
                              icon={<ArrowRight size={13} />}
                              onClick={() => {
                                setCompareTab('enterprise');
                                document.getElementById('compare-matrix')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center justify-center text-center text-xs font-semibold text-[#163300]/75 hover:text-[#163300] cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ALL SERVICES INCLUDED DARK SECTION */}
          <div id="all-services" className="mt-16 md:mt-24 rounded-2xl md:rounded-3xl bg-[#163300] text-white p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCFF85]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#DCFF85] text-xs font-mono font-semibold uppercase tracking-wider mb-3.5">
                <Sparkles size={12} className="text-[#9FE870]" />
                <span>Full-Cycle Execution</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                All Our Creative, Technology &amp; Engineering Services Included in These Packages
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
                Every package gives you direct senior execution capacity across design, full-stack architecture, automation, and AI.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3.5 gap-x-5 text-xs sm:text-sm">
              {[
                'Website & Web App Architecture',
                'Custom UI/UX & Interactive Design',
                'Full-Stack React & Next.js Builds',
                'Headless CMS (Sanity / Strapi / Shopify)',
                'REST, GraphQL & Webhook APIs',
                'AI Pipelines & Autonomous Agents',
                'Business Automation (Make / Python)',
                'Performance (95+ Core Web Vitals)',
                'Technical SEO & LLM Citability',
                'Stripe & Multi-Currency Checkout',
                'Database Architecture (Supabase / Postgres)',
                'Cloud Infrastructure & DevOps (Cloudflare / GCP)',
                'Interactive GSAP & Framer Motion UI',
                'Admin Dashboards & Event Tracking',
                'Bilateral NDA & 100% IP Transfer',
                'Continuous Senior Principal Direct Support',
              ].map((service, si) => (
                <div key={si} className="flex items-center gap-2.5 text-white/90">
                  <span className="w-2 h-2 rounded-full bg-[#9FE870] shrink-0 shadow-[0_0_8px_rgba(159,232,112,0.8)]" />
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2.5 COMPREHENSIVE CAPABILITIES COMPARISON TABLE */}
      <section id="compare-matrix" className="py-20 md:py-28 bg-white relative z-10 scroll-mt-20 border-b border-[#163300]/[0.06]">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-8 pb-6 border-b border-[#163300]/10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163300]/[0.04] ring-1 ring-[#163300]/[0.08] mb-2.5">
                <Layers size={13} className="text-[#163300]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163300]">
                  02 · Detailed Capabilities Comparison
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#163300] leading-tight mb-2">
                Structured around capabilities.{' '}
                <span className="font-serif italic font-normal text-[#2e5513]">
                  Engineered for transparency.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#163300]/70 leading-relaxed">
                Compare technical architectures, integrations, deliverables, and service levels across every package tier with zero ambiguity.
              </p>
            </div>

            {/* Matrix Tab Switcher (Non-scrollable, fit-to-width, compact pill container) */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[#163300]/[0.05] ring-1 ring-[#163300]/[0.08] shadow-xs shrink-0 self-start xl:self-end">
              {[
                { id: 'onetime', label: 'One-Time' },
                { id: 'monthly', label: 'Monthly' },
                { id: 'enterprise', label: 'Enterprise' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCompareTab(tab.id as typeof compareTab)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none shrink-0 ${
                    compareTab === tab.id
                      ? '!bg-[#163300] !text-[#DCFF85] shadow-sm'
                      : '!text-[#163300] hover:!text-black hover:!bg-[#163300]/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE SHELL CONTAINER */}
          <div className="mt-4 rounded-2xl md:rounded-3xl border border-[#163300]/10 bg-white shadow-xl">
            <div className="overflow-x-auto scrollbar-thin pt-3.5">
              
              {/* TAB 1: ONE-TIME PROJECTS COMPARISON */}
              {compareTab === 'onetime' && (
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="border-b border-[#163300]/10 bg-[#FAF9F6]">
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#163300] w-2/5 min-w-[220px]">
                        Technical Capability &amp; Scope
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-[15%]">
                        <div className="font-bold text-sm">Launch</div>
                        <div className="font-mono text-[11px] text-[#163300]/60 font-normal mt-0.5">$500+</div>
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-[15%]">
                        <div className="font-bold text-sm">Growth</div>
                        <div className="font-mono text-[11px] text-[#163300]/60 font-normal mt-0.5">$1,500+</div>
                      </th>
                      <th className="p-4 sm:p-5 pt-6 text-center text-xs font-bold text-[#163300] w-[15%] bg-[#DCFF85]/20 border-x border-[#163300]/10">
                        <div className="relative w-full flex flex-col items-center justify-center">
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#163300] text-[#DCFF85] text-[10px] font-mono font-bold uppercase tracking-wider shadow-md z-30 whitespace-nowrap border border-[#DCFF85]/30">
                            Popular
                          </span>
                          <div className="font-extrabold text-sm text-[#163300]">Scale</div>
                          <div className="font-mono text-[11px] text-[#163300]/70 font-semibold mt-0.5">$3,500+</div>
                        </div>
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-[15%]">
                        <div className="font-bold text-sm">Custom</div>
                        <div className="font-mono text-[11px] text-[#163300]/60 font-normal mt-0.5">$7,500+</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#163300]/[0.06] text-xs">
                    {ONETIME_COMPARISON.map((row, idx) => {
                      const isPriceRow = row.feature === 'Starting Price';
                      return (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isPriceRow
                              ? 'bg-[#163300]/[0.03] font-bold'
                              : idx % 2 === 0
                              ? 'bg-white hover:bg-[#163300]/[0.015]'
                              : 'bg-[#FAF9F6]/50 hover:bg-[#163300]/[0.015]'
                          }`}
                        >
                          <td className="p-3.5 sm:p-4 font-medium text-[#163300] flex items-center gap-2">
                            {row.feature}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            {renderTableCell(row.launch, isPriceRow)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            {renderTableCell(row.growth, isPriceRow)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center bg-[#DCFF85]/10 border-x border-[#163300]/10">
                            {renderTableCell(row.scale, isPriceRow)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            {renderTableCell(row.custom, isPriceRow)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[#163300]/10 bg-[#FAF9F6]">
                      <td className="p-4 text-xs font-mono font-bold text-[#163300]/70">
                        Action &amp; Direct Briefing
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          text="Book Launch"
                          icon={<ArrowRight size={12} />}
                          variant="secondary"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Launch Package',
                              category: 'One-Time Project',
                              price: '$500+',
                              delivery: '7–14 Days',
                              type: 'project',
                              description: 'A high-converting, modern digital presence built with clean code and conversion-focused fundamentals.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 !bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          text="Book Growth"
                          icon={<ArrowRight size={12} />}
                          variant="secondary"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Growth Package',
                              category: 'One-Time Project',
                              price: '$1,500+',
                              delivery: '2–4 Weeks',
                              type: 'project',
                              description: 'Custom-designed digital platform with rich animations, seamless integrations, and growth-ready architecture.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 !bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]"
                        />
                      </td>
                      <td className="p-4 text-center bg-[#DCFF85]/20 border-x border-[#163300]/10">
                        <Button
                          text="Book Scale"
                          icon={<ArrowRight size={12} />}
                          variant="dark"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Scale Package',
                              category: 'One-Time Project',
                              price: '$3,500+',
                              delivery: '4–8 Weeks',
                              type: 'project',
                              description: 'Full-cycle modern web application engineering with authentication, stateful dashboards, and payment flows.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-md ring-2 ring-[#9FE870]/40 transition-colors duration-200 !bg-[#163300] !border-[#163300] !text-[#DCFF85] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-white"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          text="Contact Custom"
                          icon={<ArrowRight size={12} />}
                          variant="secondary"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Custom Enterprise System',
                              category: 'One-Time Project',
                              price: '$7,500+',
                              delivery: 'Milestone Scope',
                              type: 'project',
                              description: 'For complex digital products, SaaS, automation platforms, enterprise systems and custom business infrastructure.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 !bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]"
                        />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}

              {/* TAB 2: MONTHLY BUSINESS RETAINERS COMPARISON */}
              {compareTab === 'monthly' && (
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="border-b border-[#163300]/10 bg-[#FAF9F6]">
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#163300] w-2/5 min-w-[220px]">
                        Continuous Retainer Capability
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-[15%]">
                        <div className="font-bold text-sm">Starter</div>
                        <div className="font-mono text-[11px] text-[#163300]/60 font-normal mt-0.5">$750/mo</div>
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-[15%]">
                        <div className="font-bold text-sm">Accelerate</div>
                        <div className="font-mono text-[11px] text-[#163300]/60 font-normal mt-0.5">$1,500/mo</div>
                      </th>
                      <th className="p-4 sm:p-5 pt-6 text-center text-xs font-bold text-[#163300] w-[15%] bg-[#DCFF85]/20 border-x border-[#163300]/10">
                        <div className="relative w-full flex flex-col items-center justify-center">
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#163300] text-[#DCFF85] text-[10px] font-mono font-bold uppercase tracking-wider shadow-md z-30 whitespace-nowrap border border-[#DCFF85]/30">
                            Popular
                          </span>
                          <div className="font-extrabold text-sm text-[#163300]">Scale</div>
                          <div className="font-mono text-[11px] text-[#163300]/70 font-semibold mt-0.5">$3,000/mo</div>
                        </div>
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-[15%]">
                        <div className="font-bold text-sm">Fractional CTO</div>
                        <div className="font-mono text-[11px] text-[#163300]/60 font-normal mt-0.5">$5,000+/mo</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#163300]/[0.06] text-xs">
                    {MONTHLY_COMPARISON.map((row, idx) => {
                      const isPriceRow = row.feature === 'Starting Price';
                      return (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isPriceRow
                              ? 'bg-[#163300]/[0.03] font-bold'
                              : idx % 2 === 0
                              ? 'bg-white hover:bg-[#163300]/[0.015]'
                              : 'bg-[#FAF9F6]/50 hover:bg-[#163300]/[0.015]'
                          }`}
                        >
                          <td className="p-3.5 sm:p-4 font-medium text-[#163300] flex items-center gap-2">
                            {row.feature}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            {renderTableCell(row.essential, isPriceRow)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            {renderTableCell(row.growth, isPriceRow)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center bg-[#DCFF85]/10 border-x border-[#163300]/10">
                            {renderTableCell(row.scale, isPriceRow)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            {renderTableCell(row.fractional, isPriceRow)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[#163300]/10 bg-[#FAF9F6]">
                      <td className="p-4 text-xs font-mono font-bold text-[#163300]/70">
                        Action &amp; Direct Briefing
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          text="Book Starter"
                          icon={<ArrowRight size={12} />}
                          variant="secondary"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Starter Retainer',
                              category: 'Monthly Retainer',
                              price: '$750/month',
                              delivery: 'Continuous Support',
                              type: 'retainer',
                              description: 'Dedicated senior developer capacity for businesses needing ongoing technology support and maintenance.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 !bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          text="Book Accelerate"
                          icon={<ArrowRight size={12} />}
                          variant="secondary"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Accelerate Retainer',
                              category: 'Monthly Retainer',
                              price: '$1,500/month',
                              delivery: 'Continuous Sprints',
                              type: 'retainer',
                              description: 'Continuous full-stack feature delivery, AI automations, and monthly executive strategy sessions.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 !bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]"
                        />
                      </td>
                      <td className="p-4 text-center bg-[#DCFF85]/20 border-x border-[#163300]/10">
                        <Button
                          text="Book Scale"
                          icon={<ArrowRight size={12} />}
                          variant="dark"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Scale Retainer',
                              category: 'Monthly Retainer',
                              price: '$3,000/month',
                              delivery: 'Dedicated Squad',
                              type: 'retainer',
                              description: 'Dedicated senior engineering capacity, SaaS core builds, advanced AI pipelines, and bi-weekly roadmap reviews.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-md ring-2 ring-[#9FE870]/40 transition-colors duration-200 !bg-[#163300] !border-[#163300] !text-[#DCFF85] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-white"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          text="Contact CTO"
                          icon={<ArrowRight size={12} />}
                          variant="secondary"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Fractional CTO Partner',
                              category: 'Monthly Retainer',
                              price: '$5,000+/month',
                              delivery: 'Executive Leadership',
                              type: 'retainer',
                              description: 'Executive Fractional CTO leadership, architecture governance, roadmap direction, and weekly advisory.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 !bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]"
                        />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}

              {/* TAB 3: ENTERPRISE ENGAGEMENTS COMPARISON */}
              {compareTab === 'enterprise' && (
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="border-b border-[#163300]/10 bg-[#FAF9F6]">
                      <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase tracking-wider text-[#163300] w-1/2 min-w-[260px]">
                        Enterprise Transformation &amp; Partnership Capability
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-1/4">
                        <div className="font-bold text-sm">Digital Transformation</div>
                        <div className="font-mono text-[11px] text-[#163300]/60 font-normal mt-0.5">$10,000+ SOW</div>
                      </th>
                      <th className="p-4 sm:p-5 text-center text-xs font-bold text-[#163300] w-1/4 bg-[#DCFF85]/20 border-l border-[#163300]/10">
                        <div className="font-extrabold text-sm text-[#163300]">Technology Partnership</div>
                        <div className="font-mono text-[11px] text-[#163300]/70 font-semibold mt-0.5">Custom Enterprise SLA</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#163300]/[0.06] text-xs">
                    {ENTERPRISE_COMPARISON.map((row, idx) => {
                      const isPriceRow = row.capability === 'Pricing';
                      return (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isPriceRow
                              ? 'bg-[#163300]/[0.03] font-bold'
                              : idx % 2 === 0
                              ? 'bg-white hover:bg-[#163300]/[0.015]'
                              : 'bg-[#FAF9F6]/50 hover:bg-[#163300]/[0.015]'
                          }`}
                        >
                          <td className="p-3.5 sm:p-4 font-medium text-[#163300]">
                            {row.capability}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center">
                            {renderTableCell(row.transformation, isPriceRow)}
                          </td>
                          <td className="p-3.5 sm:p-4 text-center bg-[#DCFF85]/10 border-l border-[#163300]/10">
                            {renderTableCell(row.partnership, isPriceRow)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[#163300]/10 bg-[#FAF9F6]">
                      <td className="p-4 text-xs font-mono font-bold text-[#163300]/70">
                        Action &amp; Direct Briefing
                      </td>
                      <td className="p-4 text-center">
                        <Button
                          text="Inquire Transformation"
                          icon={<ArrowRight size={12} />}
                          variant="secondary"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Enterprise Digital Transformation',
                              category: 'Enterprise Engagement',
                              price: '$10,000+',
                              delivery: '6–12 Weeks SOW',
                              type: 'enterprise',
                              description: 'Complete replatforming, ERP integration, cloud architecture, and custom business automation platforms.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm transition-colors duration-200 !bg-[#F0F2ED] !border-[#F0F2ED] !text-[#163300] hover:!bg-[#F0F2ED] hover:!border-[#F0F2ED] hover:!text-[#3D6B05]"
                        />
                      </td>
                      <td className="p-4 text-center bg-[#DCFF85]/20 border-l border-[#163300]/10">
                        <Button
                          text="Discuss Partnership"
                          icon={<ArrowRight size={12} />}
                          variant="dark"
                          onClick={() =>
                            handleSelectPackage({
                              title: 'Enterprise Technology Partnership',
                              category: 'Enterprise Alliance',
                              price: 'Custom SLA',
                              delivery: 'Continuous Retainer',
                              type: 'enterprise',
                              description: 'Dedicated senior engineering squad, roadmap co-creation, critical 24/7 SLA, and executive technology leadership.',
                            })
                          }
                          className="w-full py-2 px-2.5 text-[11px] font-mono font-bold uppercase tracking-wider shadow-md ring-2 ring-[#9FE870]/40 transition-colors duration-200 !bg-[#163300] !border-[#163300] !text-[#DCFF85] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-white"
                        />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* 3. MODULAR ADD-ON SERVICES */}
      <section id="addons" className="py-20 md:py-28 bg-[#FAF9F6] border-y border-[#163300]/[0.06] relative z-10 scroll-mt-20">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Section Header with 1-Line Compact Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#163300]/10">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163300]/[0.04] ring-1 ring-[#163300]/[0.08] mb-2.5">
                <Boxes size={13} className="text-[#163300]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#163300]">
                  02 · Modular Capabilities &amp; Extensions
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#163300] leading-[1.15] mb-2">
                Plug-and-play modules.{' '}
                <span className="font-serif italic font-normal text-[#2e5513]">
                  Tailored on demand.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#163300]/70 leading-relaxed">
                Attach specialized capabilities to any project or retainer—from AI pipelines and payment gateways to performance tuning.
              </p>
            </div>

            {/* Filter Pills strictly in 1 line */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[#163300]/[0.04] ring-1 ring-[#163300]/[0.08] shadow-xs flex-nowrap overflow-x-auto scrollbar-none whitespace-nowrap max-w-full">
              {[
                { label: 'All', count: ADDON_SERVICES.length },
                { label: 'Design', count: ADDON_SERVICES.filter((a) => a.category === 'Design').length },
                { label: 'Engineering', count: ADDON_SERVICES.filter((a) => a.category === 'Engineering').length },
                { label: 'AI & Automation', count: ADDON_SERVICES.filter((a) => a.category === 'AI & Automation').length },
                { label: 'Growth', count: ADDON_SERVICES.filter((a) => a.category === 'Growth').length },
                { label: 'Support', count: ADDON_SERVICES.filter((a) => a.category === 'Support').length },
              ].map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setAddonCategory(tab.label)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none flex items-center gap-1.5 shrink-0 ${
                    addonCategory === tab.label
                      ? '!bg-[#163300] !text-[#DCFF85] font-bold shadow-xs'
                      : 'text-[#111111] hover:text-[#163300] hover:bg-black/[0.04]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono opacity-70 ${addonCategory === tab.label ? 'text-[#DCFF85]' : 'text-[#163300]/60'}`}>
                    ({tab.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {filteredAddons.map((addon) => {
              const Icon = addon.icon;
              return (
                <div
                  key={addon.id}
                  className="group relative h-full bg-white rounded-2xl p-5 border border-[#163300]/[0.08] shadow-[0_2px_12px_rgba(22,51,0,0.03)] hover:shadow-[0_16px_32px_rgba(22,51,0,0.08)] hover:border-[#163300]/25 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header: Left = Icon Box, Right = Category Tag as Button */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[#163300]/[0.05] text-[#163300] flex items-center justify-center group-hover:bg-[#163300] group-hover:text-[#DCFF85] transition-colors">
                        <Icon size={16} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setAddonCategory(addon.category)}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white !text-[#163300] border border-[#163300]/20 hover:bg-[#163300] hover:!text-[#DCFF85] transition-all duration-200 cursor-pointer shadow-2xs"
                      >
                        {addon.category}
                      </button>
                    </div>

                    {/* Price & Timeline */}
                    <div className="flex items-baseline justify-between gap-1 mb-2">
                      <span className="text-2xl font-extrabold text-[#163300] tracking-tight font-sans">
                        {formatCurrency(addon.priceNum, addon.cadence || '')}
                      </span>
                      <span className="text-[10px] font-mono text-[#163300]/60 font-medium">
                        {addon.timeline}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-base font-bold text-[#163300] tracking-tight mb-1.5 group-hover:text-[#2e5513] transition-colors">
                      {addon.name}
                    </h4>
                    <p className="text-xs text-[#163300]/70 leading-relaxed mb-4 min-h-[34px]">
                      {addon.description}
                    </p>

                    {/* Deliverables Mini-List */}
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-[#163300]/[0.06]">
                      {addon.deliverables.map((del, di) => (
                        <div key={di} className="flex items-center gap-1.5 text-[11px] text-[#163300]/80">
                          <Check size={12} className="text-[#163300] shrink-0 stroke-[2.5]" />
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action: Triggers Instant Scroll to Inquiry Section */}
                  <div className="pt-3 border-t border-[#163300]/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-[#163300]/50">Modular Add-On</span>
                    <ActionLink
                      text="Inquire Module"
                      icon={<ArrowRight size={13} />}
                      onClick={() => {
                        handleSelectPackage({
                          title: addon.name,
                          category: `${addon.category} Module`,
                          price: formatCurrency(addon.priceNum, addon.cadence || ''),
                          delivery: addon.timeline,
                          type: 'addon',
                          description: addon.description,
                        });
                      }}
                      className="font-bold text-xs !text-[#163300] hover:!text-[#2e5513] cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BRAND MARQUEE & REVIEWS */}
      <section className="py-12 border-t border-[#163300]/[0.06] bg-[#FAF9F6] relative z-10">
        <BrandSlider />
        <div className="mt-8">
          <ReviewsMarquee />
        </div>
      </section>

      {/* 5. DEDICATED BOOK A CALL & DISCOVERY SCHEDULER SECTION */}
      <section id="inquiry-section" className="py-20 md:py-32 bg-[#FAF9F6] border-t border-[#163300]/[0.08] relative z-10 scroll-mt-16">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-8">
          <BookCallSection selectedPackage={selectedInquiry} />
        </div>
      </section>

      {/* 6. TECHNICAL FAQS */}
      <section className="py-20 md:py-28 relative z-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono font-bold text-[#163300]/60 uppercase tracking-widest block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#163300] tracking-tight">
              Transparent terms, zero ambiguity.
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#FAF9F6] border border-[#163300]/10 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#163300]/[0.03] transition-colors"
                  >
                    <span className="text-base sm:text-lg font-extrabold !text-[#163300] tracking-tight">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#163300]/15 flex items-center justify-center !text-[#163300] shrink-0 shadow-xs">
                      {isOpen ? <Minus size={15} className="stroke-[2.5]" /> : <Plus size={15} className="stroke-[2.5]" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 text-sm sm:text-base !text-[#1F3312] leading-relaxed border-t border-[#163300]/[0.08] font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CLOSING CONVERSION HERO */}
      <section className="py-24 md:py-32 bg-[#0A0F07] text-white relative z-10 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#163300_0%,transparent_70%)] opacity-70 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#DCFF85]/20 text-[#DCFF85] text-xs font-mono font-semibold uppercase tracking-wider mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85] animate-pulse" />
              <span>Start a Conversation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Not sure which model{' '}
              <span className="font-serif italic font-normal text-[#DCFF85]">
                fits your business?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Tell me what you're building, what you're trying to improve, and where you want to go next.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to="/enterprise"
                text="Start a Conversation"
                icon={<ArrowRight size={15} />}
                variant="lime"
                className="px-8 py-4 text-xs font-mono font-bold uppercase tracking-wider !bg-[#DCFF85] !text-[#163300] !border-[#DCFF85] hover:!bg-white hover:!text-[#163300] hover:!border-white shadow-[0_8px_32px_rgba(220,255,133,0.3)] transition-all duration-300"
              />
              <Button
                to="/contact"
                text="Book Consultation"
                icon={<ArrowUpRight size={15} />}
                variant="glass-dark"
                className="px-8 py-4 text-xs font-mono font-bold uppercase tracking-wider !bg-white/10 !text-white !border-white/25 hover:!bg-white/20 hover:!text-[#DCFF85] hover:!border-[#DCFF85]/60 shadow-lg transition-all duration-300"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </SubrouteLayout>
  );
}

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});
