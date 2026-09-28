import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Bot,
  Network,
  Shield,
  Layers,
  CheckCircle,
  TrendingUp,
  Cpu,
} from "lucide-react";
import { assetUrls } from "../data/assets";
import { aiIcons } from "../data/aiIcons";
import { SubrouteLayout } from "../components/layout/SubrouteLayout";
import { ThreeBackground } from "../components/ui/ThreeBackground";
import { ExecutivePortraitCard } from "../components/ui/ExecutivePortraitCard";
import { NeuralConstellation } from "../components/NeuralConstellation";
import { ReviewsMarquee } from "../components/sections/shared/ReviewsMarquee";
import { ActionLink } from "../components/ui/Button";
import {
  easeCustom,
  springTransition,
  containerVariants,
  itemVariants,
} from "../utils/motion";

interface DetailedAITool {
  name: string;
  shortName: string;
  category: "frontier" | "open" | "agent" | "protocol";
  icon: string;
  role: string;
  strength: string;
  contextWindow: string;
  tier: string;
  badge: string;
}

const detailedAITools: DetailedAITool[] = [
  {
    name: "Claude 3.5 Sonnet",
    shortName: "Claude 3.5",
    category: "frontier",
    icon: "claude",
    role: "Coding & Agentic Workflows",
    strength:
      "Top-tier complex reasoning, architectural refactoring & codebase generation.",
    contextWindow: "200k Tokens",
    tier: "Frontier Engine",
    badge: "Anthropic",
  },
  {
    name: "OpenAI GPT-4o",
    shortName: "GPT-4o",
    category: "frontier",
    icon: "openai",
    role: "Multimodal & Vision Synthesis",
    strength:
      "Ultra low-latency speech, live vision analysis & conversational interface systems.",
    contextWindow: "128k Tokens",
    tier: "Frontier Engine",
    badge: "OpenAI",
  },
  {
    name: "Google Gemini 1.5 Pro",
    shortName: "Gemini 1.5",
    category: "frontier",
    icon: "googlegemini",
    role: "2M Token Deep Ingestion",
    strength:
      "Massive multi-file repository indexing, full book ingestion & audio/video synthesis.",
    contextWindow: "2,000,000 Tokens",
    tier: "Frontier Engine",
    badge: "Google",
  },
  {
    name: "DeepSeek R1",
    shortName: "DeepSeek R1",
    category: "open",
    icon: "deepseek",
    role: "Open Reasoning & Logic",
    strength:
      "Cost-efficient deep chain-of-thought, math proofing & algorithmic problem solving.",
    contextWindow: "64k Tokens",
    tier: "Open Weights",
    badge: "DeepSeek",
  },
  {
    name: "Perplexity AI",
    shortName: "Perplexity",
    category: "agent",
    icon: "perplexity",
    role: "Live Grounding & Citations",
    strength:
      "Real-time web indexing, factual source cross-referencing & verified research.",
    contextWindow: "Realtime Web",
    tier: "Search Agent",
    badge: "Perplexity",
  },
  {
    name: "Cursor AI Composer",
    shortName: "Cursor AI",
    category: "agent",
    icon: "cursor",
    role: "Agentic IDE Composer",
    strength:
      "Multi-file inline codebase diffs, terminal execution & semantic symbol mapping.",
    contextWindow: "Project Context",
    tier: "Developer Agent",
    badge: "Anysphere",
  },
  {
    name: "Model Context Protocol",
    shortName: "MCP Protocol",
    category: "protocol",
    icon: "modelcontextprotocol",
    role: "Universal Tool & Data Bridge",
    strength:
      "Standardized open protocol connecting frontier LLMs to Postgres, APIs & local CLI.",
    contextWindow: "Open Standard",
    tier: "Protocol Layer",
    badge: "Anthropic Standard",
  },
  {
    name: "GitHub Copilot",
    shortName: "GitHub Copilot",
    category: "agent",
    icon: "githubcopilot",
    role: "Inline Code Velocity",
    strength:
      "Context-aware autocompletion, CLI explanations & workspace test generation.",
    contextWindow: "Repository Scope",
    tier: "Developer Tool",
    badge: "GitHub / MS",
  },
  {
    name: "Mistral Large 2",
    shortName: "Mistral Large",
    category: "frontier",
    icon: "mistralai",
    role: "Sovereign Low Latency",
    strength:
      "Multilingual speed, strict European privacy compliance & function calling.",
    contextWindow: "128k Tokens",
    tier: "Frontier Engine",
    badge: "Mistral AI",
  },
  {
    name: "Replit Agent",
    shortName: "Replit Agent",
    category: "agent",
    icon: "replit",
    role: "Rapid Cloud Instantiation",
    strength:
      "Full-stack environment scaffolding, database deployment & ephemeral sandbox testing.",
    contextWindow: "Cloud Sandbox",
    tier: "Platform Agent",
    badge: "Replit",
  },
  {
    name: "Meta Llama 3.3",
    shortName: "Llama 3.3",
    category: "open",
    icon: "meta",
    role: "Self-Hosted Private Deploy",
    strength:
      "Zero data leakage on-premise execution, fine-tuning & sovereign enterprise runs.",
    contextWindow: "128k Tokens",
    tier: "Open Weights",
    badge: "Meta AI",
  },
  {
    name: "VS Code Tooling",
    shortName: "VS Code",
    category: "agent",
    icon: "visualstudiocode",
    role: "Developer Environment",
    strength:
      "Custom background tasks, debugger hooks & terminal agent execution.",
    contextWindow: "Workspace Scope",
    tier: "IDE Runtime",
    badge: "Microsoft",
  },
];

const architecturalPillars = [
  {
    icon: Bot,
    phase: "SWARM ORCHESTRATION",
    title: "Autonomous Multi-Agent Swarms",
    desc: "Coordinating specialized autonomous agents with deterministic state machines, role routing, persistent memory, and human-in-the-loop oversight.",
    specs: [
      "Hierarchical Supervisor Patterns",
      "Deterministic Tool Calling",
      "Long-term Vector Memory",
    ],
  },
  {
    icon: Network,
    phase: "STANDARD PROTOCOLS",
    title: "Model Context Protocol (MCP)",
    desc: "Architecting custom local and remote MCP servers that connect models directly to databases, GitHub repositories, internal CRM, and live APIs.",
    specs: [
      "Standardized JSON-RPC 2.0",
      "Database Read/Write Sandboxing",
      "Multi-client Interoperability",
    ],
  },
  {
    icon: Shield,
    phase: "QUALITY BENCHMARKS",
    title: "Deterministic Evals & Guardrails",
    desc: "Building regression testing test suites that continuously benchmark token costs, prompt latency, safety guardrails, and enforce 0 hallucinations.",
    specs: [
      "Automated Assertion Suites",
      "Latency & Token Cost Budgets",
      "Synthetic Test Generation",
    ],
  },
  {
    icon: Layers,
    phase: "SYSTEM INTEGRATION",
    title: "Full-Stack Code & Cloud Runtimes",
    desc: "Wiring AI intelligence directly into modern web frameworks (React 19, Next.js, TanStack), PostgreSQL, Supabase, and resilient serverless runtimes.",
    specs: [
      "Lighthouse 95+ Frontends",
      "Streaming Server-Sent Events",
      "Zero Vendor Lock-in",
    ],
  },
];

function AIPage() {
  const [selectedTool, setSelectedTool] = useState<DetailedAITool>(
    detailedAITools[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [monthlyTasks, setMonthlyTasks] = useState<number>(4000);
  const [hourlyRate, setHourlyRate] = useState<number>(35);

  const filteredTools = detailedAITools.filter(
    (tool) => activeCategory === "all" || tool.category === activeCategory
  );

  // ROI calculations
  const hoursSaved = Math.round((monthlyTasks * 18) / 60);
  const monthlySavings = Math.round(hoursSaved * hourlyRate * 0.72);
  const annualSavings = monthlySavings * 12;

  const categories = [
    { id: "all", label: "All (12)" },
    { id: "frontier", label: "Frontier LLMs" },
    { id: "agent", label: "Coding Agents" },
    { id: "protocol", label: "Protocols" },
    { id: "open", label: "Open Weights" },
  ];

  return (
    <SubrouteLayout page="ai">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <ThreeBackground variant="orb" accentColor={0x9fe870} />
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
                <Sparkles size={13} className="text-[#9FE870]" /> SOFTWARE ·
                SAAS · APPLIED AI
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                AI, Software & Product Development
              </h1>
              <p className="text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mb-8 font-medium">
                Technology is the foundation through which ideas become
                products. My work across AI, software, SaaS and automation
                focuses on using technology to build useful products and scalable
                business systems.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <ActionLink
                  href="#ai-pillars"
                  variant="dark"
                  text="Explore AI & Engineering"
                  icon={<ArrowUpRight size={16} />}
                  className="px-6 py-3 text-sm font-semibold"
                />
                <ActionLink
                  to="/contact"
                  variant="secondary"
                  text="Start a Conversation"
                  icon={<ArrowUpRight size={16} />}
                  className="px-6 py-3 text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#163300]/10 max-w-xl">
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    AI & SaaS
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Product Architecture
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Automation
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Workflow Systems
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#163300] block tracking-tight">
                    Engineering
                  </span>
                  <span className="text-xs text-[#163300]/60 font-medium">
                    Reliable Execution
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
                image={assetUrls.ai}
                badge="AI & SOFTWARE ARCHITECT"
                tagline="AI Products · SaaS Engineering · Automation"
                location="Dhaka · Global Remote"
                quote="Applying AI, software, and automation to practical business and product challenges."
                highlights={[
                  {
                    label: "Engineering Model",
                    value: "Product Engineering",
                  },
                  {
                    label: "Focus",
                    value: "Scalable SaaS & Automation",
                  },
                ]}
                ctaText="Start a Conversation"
                ctaTo="/contact"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AEO Citation Banner */}
      <section
        className="py-14 bg-white border-y border-[#163300]/10"
        aria-labelledby="aeo-ai-heading"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#163300] text-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#163300] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] font-bold block mb-2">
                AEO DIRECT CITATION
              </span>
              <h2
                id="aeo-ai-heading"
                className="text-2xl sm:text-3xl font-bold text-[#DCFF85] mb-3"
              >
                What does Jit Kumar Saha work on in AI and technology?
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                Jit Kumar Saha works on AI, SaaS, software, automation and
                product development, with a focus on applying technology to
                practical business and product challenges.
              </p>
            </div>
            <div className="shrink-0">
              <ActionLink
                to="/contact"
                variant="secondary"
                text="Discuss AI Project"
                icon={<ArrowUpRight size={16} />}
                className="px-5 py-3 text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section
        className="py-20 bg-[#FAFAF8]"
        id="ai-pillars"
        aria-labelledby="ai-pillars-heading"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
              <Sparkles size={13} className="text-[#9FE870]" /> TECHNICAL
              CAPABILITIES
            </span>
            <h2
              id="ai-pillars-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]"
            >
              Engineering practical systems for{" "}
              <span className="font-serif italic font-normal text-[#163300]/70">
                modern businesses.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center mb-6">
                  <Bot size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                  AI for Products & Business
                </h3>
                <p className="text-sm sm:text-base text-[#163300]/75 leading-relaxed">
                  AI is becoming a core component of modern software and business
                  systems. I explore practical applications of AI across product
                  development, automation, business operations and digital
                  experiences.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center mb-6">
                  <Cpu size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                  Software & SaaS
                </h3>
                <p className="text-sm sm:text-base text-[#163300]/75 leading-relaxed">
                  I build software and SaaS products that combine product
                  thinking, engineering and business requirements into scalable
                  digital solutions.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center mb-6">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                  Automation
                </h3>
                <p className="text-sm sm:text-base text-[#163300]/75 leading-relaxed">
                  Automation can transform how businesses operate. I work on
                  systems that connect workflows, software and intelligent
                  technologies to reduce operational complexity.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center mb-6">
                  <Layers size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#163300] mb-3">
                  Product Engineering
                </h3>
                <p className="text-sm sm:text-base text-[#163300]/75 leading-relaxed">
                  Product engineering connects product strategy with technology
                  execution. My approach combines architecture, development,
                  usability and scalability to turn product concepts into working
                  software.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Neural Swarm Simulator Section */}
      <section className="py-24 bg-[#0f1117] text-white relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              className="lg:col-span-7 relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden min-h-[460px] flex flex-col justify-between group shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeCustom }}
            >
              <div className="absolute inset-0 opacity-85 group-hover:opacity-100 transition-opacity duration-700">
                <NeuralConstellation />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/40 to-transparent pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DCFF85] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#DCFF85] font-bold">
                    NEURAL SWARM SIMULATOR
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/50 bg-white/10 px-3 py-1 rounded-full">
                  Real-Time Particle Physics
                </span>
              </div>
              <div className="relative z-10 pt-32">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                  Autonomous Multi-Agent Orchestration
                </h3>
                <p className="text-sm text-white/75 max-w-lg leading-relaxed">
                  Interactive real-time agent visualization showing hierarchical
                  supervisor agents delegating tasks to specialized coding,
                  debugging, and verification workers.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeCustom }}
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#DCFF85] font-semibold block mb-2">
                  HIGH-CONVICTION ENGINEERING
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  How applied intelligence actually works in production.
                </h2>
              </div>
              <p className="text-sm text-white/75 leading-relaxed">
                Most AI implementations fail because they rely on single,
                unstructured prompts. Production velocity requires bounded state
                machines, deterministic schema validation, and persistent memory
                across execution runs.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Hierarchical supervisor swarms with role specialization",
                  "Standardized MCP protocol for instant tool attachment",
                  "Automated evals to catch regressions before git push",
                  "Zero data retention & enterprise privacy sandboxes",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-xs font-mono text-white/85"
                  >
                    <CheckCircle
                      size={16}
                      className="text-[#DCFF85] shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Frontier Engines & Agent Tooling */}
      <section
        className="py-24 bg-[#FAFAF8] border-b border-black/5"
        id="engines"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
                <Sparkles size={13} className="text-[#9FE870]" /> TOOLING &
                MODELS
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
                Frontier Engines &{" "}
                <span className="font-serif italic font-normal text-[#163300]/70">
                  Agent Tooling.
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#163300] text-[#DCFF85] shadow-sm"
                      : "bg-white text-[#163300]/70 hover:text-[#163300] border border-[#163300]/10 hover:border-[#163300]/25"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {filteredTools.map((tool) => {
              const isSelected = selectedTool.name === tool.name;
              const iconSrc = aiIcons[tool.icon];

              return (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  onClick={() => setSelectedTool(tool)}
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={springTransition}
                  className={`cursor-pointer rounded-3xl p-6 transition-all flex flex-col justify-between group ${
                    isSelected
                      ? "bg-[#163300] text-white shadow-xl ring-2 ring-[#DCFF85]"
                      : "bg-white text-[#163300] border border-[#163300]/10 hover:border-[#163300]/30 hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center p-2 transition-colors ${
                          isSelected ? "bg-[#DCFF85]" : "bg-[#163300]"
                        }`}
                      >
                        {iconSrc ? (
                          <img
                            src={iconSrc}
                            alt={tool.name}
                            className={`w-full h-full object-contain ${
                              isSelected ? "filter invert" : "filter invert-0"
                            }`}
                          />
                        ) : (
                          <Bot
                            size={20}
                            className={
                              isSelected ? "text-[#163300]" : "text-[#DCFF85]"
                            }
                          />
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                          isSelected
                            ? "bg-white/10 text-[#DCFF85]"
                            : "bg-[#F3FCED] text-[#163300] border border-[#9FE870]/40"
                        }`}
                      >
                        {tool.tier}
                      </span>
                    </div>

                    <h3
                      className={`text-lg font-bold tracking-tight mb-1 ${
                        isSelected ? "text-white" : "text-[#163300]"
                      }`}
                    >
                      {tool.name}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                        isSelected ? "text-white/80" : "text-[#163300]/70"
                      }`}
                    >
                      {tool.strength}
                    </p>
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
                      isSelected
                        ? "border-white/10 text-[#DCFF85]"
                        : "border-[#163300]/10 text-[#163300]/60"
                    }`}
                  >
                    <span>{tool.contextWindow}</span>
                    <span className="font-bold">{tool.badge}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Active Model Spotlight */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTool.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-[#163300] text-white p-8 md:p-10 border border-[#9FE870]/30 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-80 h-80 bg-[#DCFF85]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-[#DCFF85] flex items-center justify-center p-3.5 shrink-0 shadow-lg">
                    <img
                      src={aiIcons[selectedTool.icon]}
                      alt=""
                      className="w-full h-full object-contain filter invert"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="text-2xl font-bold tracking-tight text-white">
                        {selectedTool.name}
                      </h3>
                      <span className="font-mono text-xs bg-[#DCFF85] text-[#163300] font-bold px-3 py-1 rounded-full">
                        {selectedTool.tier}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 max-w-xl leading-relaxed">
                      {selectedTool.strength}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono">
                    <div className="text-[10px] text-white/50 uppercase">
                      Context Window
                    </div>
                    <div className="text-sm font-bold text-[#DCFF85] mt-0.5">
                      {selectedTool.contextWindow}
                    </div>
                  </div>
                  <ActionLink
                    to="/contact"
                    variant="lime"
                    text="Deploy in Stack"
                    icon={<ArrowUpRight size={16} />}
                    className="px-6 py-3.5 text-sm font-bold btn-shine btn-lime-glow"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* The Four Pillars of Verifiable AI */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
              <Sparkles size={13} className="text-[#9FE870]" /> ARCHITECTURAL
              PILLARS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
              The four pillars of{" "}
              <span className="font-serif italic font-normal text-[#163300]/70">
                verifiable AI.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {architecturalPillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.28, ease: easeCustom }}
                  className="rounded-3xl border border-[#163300]/10 bg-[#FAFAF8] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-[#163300]/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#163300] text-[#DCFF85] group-hover:scale-110 transition-transform">
                        <PillarIcon size={22} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold bg-[#E8F9DC] text-[#163300] px-3 py-1 rounded-full border border-[#9FE870]/40">
                        {pillar.phase}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#163300] tracking-tight mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#163300]/75 leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#163300]/10 space-y-2">
                    {pillar.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2.5 text-xs font-mono text-[#163300]/80"
                      >
                        <CheckCircle
                          size={14}
                          className="text-[#9FE870] shrink-0"
                        />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Generative ROI Modeler */}
      <section className="py-24 bg-[#163300] text-white relative overflow-hidden border-b border-white/10">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#DCFF85]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#DCFF85]/15 text-[#DCFF85] border border-[#DCFF85]/30">
                <Sparkles size={13} /> GENERATIVE ROI MODELER
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Model the financial impact of{" "}
                <span className="font-serif italic font-normal text-[#DCFF85]">
                  agent automation.
                </span>
              </h2>
              <p className="text-base text-white/75 leading-relaxed">
                Adjust your monthly manual operational workload and loaded
                hourly cost to see how autonomous agent swarms and MCP
                protocols translate into tangible annual savings.
              </p>

              <div className="space-y-6 pt-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/80 mb-2">
                    <span>Monthly Repetitive Work Items</span>
                    <span className="text-[#DCFF85] font-bold text-sm">
                      {monthlyTasks.toLocaleString()} Tasks
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="250"
                    value={monthlyTasks}
                    onChange={(e) => setMonthlyTasks(Number(e.target.value))}
                    className="w-full accent-[#DCFF85] h-2 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                    <span>500</span>
                    <span>7,500</span>
                    <span>15,000+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/80 mb-2">
                    <span>Loaded Team Hourly Rate ($USD)</span>
                    <span className="text-[#DCFF85] font-bold text-sm">
                      ${hourlyRate}/hr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-[#DCFF85] h-2 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                    <span>$15/hr</span>
                    <span>$65/hr</span>
                    <span>$120/hr</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white/[0.06] border border-[#9FE870]/30 p-8 md:p-10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#DCFF85] font-bold">
                    PROJECTED IMPACT REPORT
                  </span>
                  <span className="text-xs font-mono text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
                    3.4x VELOCITY
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 my-8">
                  <div>
                    <span className="text-xs font-mono text-white/60 block mb-1">
                      Monthly Hours Reclaimed
                    </span>
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-white block tracking-tight">
                      {hoursSaved.toLocaleString()} hrs
                    </span>
                    <span className="text-[11px] text-[#DCFF85] font-mono mt-1 block">
                      Redirected to GTM & Product
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-white/60 block mb-1">
                      Monthly Cost Savings
                    </span>
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-[#DCFF85] block tracking-tight">
                      ${monthlySavings.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-white/60 font-mono mt-1 block">
                      Net of inference token costs
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#DCFF85]/15 border border-[#DCFF85]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#DCFF85] font-bold">
                      Estimated Annual Commercial Value
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
                      ${annualSavings.toLocaleString()} / year
                    </div>
                  </div>
                  <ActionLink
                    to="/contact"
                    variant="lime"
                    text="Build This System"
                    icon={<ArrowUpRight size={16} />}
                    className="px-6 py-3 text-xs font-bold btn-shine"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Marquee */}
      <ReviewsMarquee />
    </SubrouteLayout>
  );
}

export const Route = createFileRoute("/ai")({
  component: AIPage,
});
