import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Layers,
  Bot,
  RefreshCw,
  Server,
  Globe,
  CheckCircle,
  ChevronRight,
  Check,
} from "lucide-react";
import { SubrouteLayout, FadeIn } from "../components/layout/SubrouteLayout";
import { ThreeBackground } from "../components/ui/ThreeBackground";
import { EnterpriseForm } from "../components/forms/EnterpriseForm";
import { ReviewsMarquee } from "../components/sections/shared/ReviewsMarquee";
import { BrandSlider } from "../components/sections/home/BrandSlider";
import { EnterpriseApproachSlider } from "../components/sections/enterprise/EnterpriseApproachSlider";
import { EnterpriseHero } from "../components/sections/enterprise/EnterpriseHero";
import { ActionLink } from "../components/ui/Button";

function EnterprisePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const capabilityCategories = [
    {
      title: "Digital Product Development",
      items: [
        "SaaS Platforms & Multi-tenant Architecture",
        "Enterprise Portals & Client Dashboards",
        "Internal Business Operations Applications",
        "Marketplace Platforms & Commerce Engines",
        "High-performance Web Applications",
      ],
      icon: Layers,
    },
    {
      title: "Business Systems & Infrastructure",
      items: [
        "ERP & Supply Chain Operations",
        "CRM & Customer Success Pipelines",
        "HRM & Workforce Management Systems",
        "Finance, Accounting & Billing Automation",
        "Workflow Consolidation Platforms",
      ],
      icon: Server,
    },
    {
      title: "AI & Intelligent Automation",
      items: [
        "Autonomous Multi-Agent AI Swarms",
        "Intelligent Document & Data Automation",
        "AI-Powered Vector Search & Knowledge Systems",
        "Custom LLM Workflows & RAG Pipeline Setup",
        "Autonomous Process Optimization",
      ],
      icon: Bot,
    },
    {
      title: "Digital Transformation & Legacy",
      items: [
        "Legacy Platform Modernization & Monolith Split",
        "Digital Operating Model Refactoring",
        "Technology Stack Migration & Consolidation",
        "Process Automation & Tool Standardization",
        "Cloud-native System Re-architecting",
      ],
      icon: RefreshCw,
    },
    {
      title: "Technology & System Architecture",
      items: [
        "Enterprise Product & System Architecture",
        "Microservices & API Contract Design",
        "Cloud Infrastructure & Multi-region Scalability",
        "Database Architecture & Vector Indexing",
        "Security, Role-Based Access & Compliance",
      ],
      icon: Shield,
    },
    {
      title: "Web & Digital Experience",
      items: [
        "Enterprise Brand & Corporate Websites",
        "Conversion-Engineered Product Sites",
        "Design System Architecture & Tokens",
        "Accessibility (WCAG 2.2 AA) & Performance",
        "Global CDN & Edge Delivery Infrastructure",
      ],
      icon: Globe,
    },
  ];

  const enterpriseFaqs = [
    {
      q: "What type of enterprise projects do you work on?",
      a: "I focus on complex digital products, SaaS platforms, business operating systems (ERP/CRM/HRM consolidations), AI agent automation, legacy software modernizations, and high-conversion enterprise web experiences.",
    },
    {
      q: "Can you work alongside an existing internal engineering team?",
      a: "Yes. I frequently embed as a strategic advisor, lead architect, or specialized pod lead to augment internal teams, accelerate delivery, and establish design system and AI best practices.",
    },
    {
      q: "Do you work with international enterprise organizations?",
      a: "Yes. I operate globally across North America, Europe, Middle East, Asia-Pacific, and South Asia with a structured async-first collaboration model and international time-zone coordination.",
    },
    {
      q: "How do you handle enterprise security and data privacy?",
      a: "All AI and software architecture follows strict zero-trust principles, including Zero Data Retention policies for LLMs, role-based access control (RBAC), end-to-end encryption, and custom VPC/on-premise deployment options.",
    },
    {
      q: "Can you sign an NDA before reviewing proprietary materials?",
      a: "Yes. Standard enterprise Non-Disclosure Agreements (NDAs) are signed prior to deep technical discovery or code access.",
    },
    {
      q: "How does an enterprise engagement begin?",
      a: "It starts with an initial executive architecture discussion to review your organization's goals, existing stack, and challenges. From there, we define scope, delivery model, and roadmap.",
    },
  ];

  return (
    <SubrouteLayout page="enterprise">
      {/* Enterprise Executive Hero Section */}
      <EnterpriseHero />

      {/* Brand & Ecosystem Slider */}
      <section className="py-12 bg-[#FAFAF8] border-b border-[#163300]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <BrandSlider
            kicker="TRUSTED ACROSS PRODUCTS, PLATFORMS & VENTURES"
            buttonText="Read Founder Reviews"
            reviewsAnchorId="reviews"
          />
        </div>
      </section>

      {/* Positioning & Differentiation */}
      <section className="py-20 bg-white border-b border-[#163300]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
                POSITIONING & DIFFERENTIATION
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300] mb-6">
                “Enterprise problems are rarely just{" "}
                <span className="font-serif italic font-normal text-[#163300]/70">
                  technology problems.”
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl font-medium">
                True enterprise transformation requires bridging the gap between
                high-level commercial objectives and complex technical execution.
                I operate at the intersection of business strategy, product
                architecture, and hands-on software engineering.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#FAFAF8] rounded-3xl p-8 border border-[#163300]/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#163300] font-bold block mb-2">
                CORE OPERATING DOMAINS
              </span>
              {[
                "Business Strategy & Business Models",
                "Digital Product Strategy & UX",
                "Enterprise SaaS & Platforms",
                "AI & Autonomous Workflow Automation",
                "Digital Operating Models & Modernization",
                "Scalable Architecture & Integrations",
              ].map((domain) => (
                <div
                  key={domain}
                  className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#163300]"
                >
                  <CheckCircle size={16} className="text-[#163300] shrink-0" />
                  <span>{domain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Engagement Profiles */}
      <section className="py-20 bg-[#FAFAF8]" id="audience">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              TARGET ENGAGEMENT PROFILES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Who I Work With
            </h2>
            <p className="mt-3 text-base text-[#163300]/75">
              From growth-stage companies scaling into enterprise to established
              global organizations modernizing legacy tech stacks.
            </p>
          </FadeIn>

          <div className="mb-12 p-4 rounded-2xl bg-white border border-[#163300]/10 flex flex-wrap items-center justify-around gap-4 text-xs font-mono font-bold text-[#163300]">
            <span>STARTUP</span>
            <span>→</span>
            <span>GROWTH</span>
            <span>→</span>
            <span>MID-MARKET</span>
            <span>→</span>
            <span className="bg-[#DCFF85] px-3 py-1 rounded-full border border-[#9FE870]">
              ENTERPRISE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Established Companies & Enterprises",
              "Global Technology & SaaS Businesses",
              "Financial Services & Fintech Platforms",
              "E-commerce & Digital Retail Systems",
              "Professional Services & Advisory Firms",
              "Multi-location Organizations Modernizing Legacy",
            ].map((profile) => (
              <div
                key={profile}
                className="bg-white rounded-3xl p-6 border border-[#163300]/10 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#163300] text-[#DCFF85]">
                  <Shield size={18} />
                </div>
                <span className="text-sm font-bold text-[#163300]">
                  {profile}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Capabilities */}
      <section
        className="py-24 bg-white border-y border-[#163300]/10"
        id="capabilities"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              STRATEGIC EXECUTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Enterprise Capabilities
            </h2>
            <p className="mt-3 text-base text-[#163300]/75">
              Comprehensive technical and product capabilities organized around
              enterprise growth and reliability.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilityCategories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="rounded-3xl bg-[#FAFAF8] p-8 border border-[#163300]/10 shadow-sm hover:shadow-xl hover:border-[#163300]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#163300] text-[#DCFF85]">
                        <CatIcon size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-[#163300] tracking-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <ul className="space-y-2.5 pt-4 border-t border-[#163300]/10">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#163300]/80 font-medium"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#163300] shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem -> Solution Framework */}
      <section className="py-24 bg-[#FAFAF8]" id="solutions">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              PROBLEM → SOLUTION FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              What I Can Help An{" "}
              <span className="font-serif italic font-normal text-[#163300]/70">
                Enterprise Solve
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                problem: "“Our systems don't scale with the business.”",
                solution:
                  "Product architecture redesign, database sharding, microservices decoupling, and high-concurrency cloud infrastructure.",
              },
              {
                problem: "“Our teams use too many disconnected tools.”",
                solution:
                  "Design and consolidate a unified enterprise operating ecosystem with central auth, APIs, and real-time data sync.",
              },
              {
                problem:
                  "“We need to turn a complex requirement into a real product.”",
                solution:
                  "End-to-end execution: Product strategy → UX architecture → system design → engineering → production launch.",
              },
              {
                problem: "“Our legacy platform is holding us back.”",
                solution:
                  "Incremental Strangler Fig migration, modern API encapsulation, and zero-downtime database transition.",
              },
              {
                problem: "“We want to integrate AI into core operations safely.”",
                solution:
                  "Deploy private, zero-data-retention AI agent swarms integrated with your internal data warehouses and VPC.",
              },
              {
                problem:
                  "“Our digital presence doesn't reflect our organization.”",
                solution:
                  "Complete enterprise portal, corporate brand experience, and high-converting web platform overhaul.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#163300] bg-[#DCFF85] px-2.5 py-1 rounded-full border border-[#9FE870] inline-block mb-3">
                    CHALLENGE 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#163300] mb-3">
                    {item.problem}
                  </h3>
                  <div className="pt-4 border-t border-[#163300]/10">
                    <span className="text-xs font-mono uppercase font-bold text-[#163300]/60 block mb-1">
                      STRATEGIC SOLUTION:
                    </span>
                    <p className="text-sm text-[#163300]/80 leading-relaxed font-medium">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology 7-Steps - Swiper Slider */}
      <section
        className="py-24 bg-white border-y border-[#163300]/10 overflow-hidden"
        id="approach"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <EnterpriseApproachSlider />
        </div>
      </section>

      {/* Operational Role */}
      <section className="py-24 bg-[#FAFAF8]" id="engagement">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#163300] text-white rounded-3xl p-8 sm:p-12 border border-[#163300] shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] font-bold block mb-3">
                OPERATIONAL ROLE
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                How I Engage
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium mb-8">
                “Depending on the engagement, I can operate as a strategic
                advisor, product partner, technology lead, or hands-on builder.”
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15 text-xs font-mono font-bold text-[#DCFF85]">
                <span>· Product Strategy</span>
                <span>· Technology Strategy</span>
                <span>· Digital Transformation</span>
                <span>· Hands-on Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Ecosystem */}
      <section
        className="py-24 bg-white border-b border-[#163300]/10"
        id="technology"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              SYSTEM INTEGRATIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Technology Ecosystem
            </h2>
            <p className="mt-3 text-base text-[#163300]/75 italic font-serif">
              “Technology is selected around the business problem, not the other
              way around.”
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            {[
              {
                label: "Product Stack",
                tech: "React · Next.js · TypeScript · Node.js",
              },
              {
                label: "Data Stack",
                tech: "PostgreSQL · MySQL · Redis · Vector DBs",
              },
              {
                label: "Cloud & Infrastructure",
                tech: "Vercel · AWS · Cloudflare · Docker",
              },
              {
                label: "AI & Automation",
                tech: "LLMs · AI Swarms · RAG · Vector Search",
              },
              {
                label: "Business Platforms",
                tech: "ERP · CRM · HRM · Payments · APIs",
              },
            ].map((stack) => (
              <div
                key={stack.label}
                className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#163300]/10"
              >
                <span className="font-mono text-xs font-bold uppercase text-[#163300] block mb-2">
                  {stack.label}
                </span>
                <p className="text-xs font-mono text-[#163300]/80 leading-relaxed">
                  {stack.tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-[#FAFAF8]" id="models">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              ENGAGEMENT STRUCTURES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Engagement Models
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Strategic Advisory",
                forWho:
                  "Organizations needing senior technology & product direction before making heavy engineering investments.",
                delivery:
                  "Product Roadmaps, Tech Stack Audits, AI Feasibility, Architecture Reviews.",
              },
              {
                title: "Project Engagement",
                forWho:
                  "Defined scope enterprise software, SaaS platform builds, or legacy modernization initiatives.",
                delivery:
                  "Fixed Timeline Delivery, Dedicated Engineering Execution, Full Launch.",
              },
              {
                title: "Product Partnership",
                forWho:
                  "Founders and leadership teams building and scaling a flagship digital product from zero to market.",
                delivery:
                  "End-to-end Leadership, Design System, System Architecture, Core Engineering.",
              },
              {
                title: "Technology Leadership",
                forWho:
                  "Organizations requiring executive product & technical leadership without hiring full-time internal C-suite.",
                delivery:
                  "Fractional Head of Product, Team Mentorship, Vendor Governance, SLA Control.",
              },
            ].map((model) => (
              <div
                key={model.title}
                className="bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-2xl font-bold text-[#163300] mb-3">
                  {model.title}
                </h3>
                <p className="text-sm text-[#163300]/80 leading-relaxed font-medium mb-4">
                  {model.forWho}
                </p>
                <div className="pt-4 border-t border-[#163300]/10 text-xs font-mono font-bold text-[#163300]">
                  <span>DELIVERABLES: {model.delivery}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise FAQ */}
      <section
        className="py-24 bg-white border-t border-[#163300]/10"
        id="faq"
      >
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Enterprise FAQ
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {enterpriseFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#163300]/10 bg-[#FAFAF8] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left font-bold text-base text-[#163300] flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      size={18}
                      className={`transition-transform ${
                        isOpen ? "rotate-90 text-[#163300]" : "text-[#163300]/40"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[#163300]/80 leading-relaxed font-medium border-t border-[#163300]/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Marquee */}
      <ReviewsMarquee />

      {/* Enterprise Qualification & PDF Generator Form */}
      <section
        className="pt-28 pb-36 md:pt-36 md:pb-40 bg-[#EFEFEA] border-t border-[#163300]/10 text-[#163300] relative overflow-hidden scroll-mt-24"
        id="book-demo"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <EnterpriseForm />
        </div>
      </section>
    </SubrouteLayout>
  );
}

export const Route = createFileRoute("/enterprise")({
  component: EnterprisePage,
});
