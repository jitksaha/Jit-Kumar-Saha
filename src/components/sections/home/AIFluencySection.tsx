import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bot,
  Network,
  Shield,
  Database,
  ArrowUpRight,
  Server,
  LockKeyhole,
  TrendingUp,
  CheckCircle,
  Terminal,
} from "lucide-react";
import { aiIcons, aiModelsTools, type AIModelTool } from "../../../data/aiIcons";
import { NeuralConstellation } from "../../NeuralConstellation";
import { easeCustom, springTransition } from "../../../utils/motion";

export function AIFluencySection() {
  const [selectedTool, setSelectedTool] = useState<AIModelTool>(
    aiModelsTools[0]
  );
  const [activeWorkflow, setActiveWorkflow] = useState("agents");

  const workflowTabs = [
    { key: "agents", label: "Autonomous Swarms", icon: Bot },
    { key: "mcp", label: "MCP Protocol", icon: Network },
    { key: "evals", label: "Deterministic Evals", icon: Shield },
    { key: "rag", label: "Knowledge Plumbing", icon: Database },
  ];

  const methodologyPhases = [
    {
      phase: "DIAGNOSTIC",
      title: "Diagnostic & Baseline",
      desc: "Identify the highest friction business bottleneck with a measurable baseline metric before writing a single line of prompt.",
    },
    {
      phase: "SPIKE",
      title: "Thin Agent Spike",
      desc: "Build and deploy the smallest viable agent in 2 weeks to validate accuracy, prompt topology, and user adoption.",
    },
    {
      phase: "EVALS",
      title: "Deterministic Evals",
      desc: "Establish automated evaluation suites to continuously benchmark regressions, token costs, and safety guardrails.",
    },
    {
      phase: "EMBED",
      title: "Workflow Embedding",
      desc: "Wire the verified agent into daily team workflows, Slack/Discord, CRM, or production databases with full human-in-the-loop audit logs.",
    },
  ];

  return (
    <section
      id="ai-fluency"
      className="relative py-28 md:py-36 bg-[#0f1117] text-white overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-purple-600/10 via-emerald-500/10 to-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-[#DCFF85]/10 text-[#DCFF85] border border-[#DCFF85]/30 mb-5">
            <Sparkles size={13} /> AI & CODE · APPLIED AGENTIC ENGINEERING
          </span>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            AI & Code that earns{" "}
            <span className="font-serif italic font-normal text-[#DCFF85]">
              its place.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
            From Frontier LLMs (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro,
            DeepSeek R1) to Autonomous Coding Agents (Cursor, Claude Code,
            Copilot), custom Model Context Protocol (MCP) servers, and production
            evals that drive real commercial velocity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Multi-Agent Orchestration & Tool Calling */}
          <motion.div
            className="lg:col-span-8 relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[440px] group shadow-2xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCustom }}
          >
            <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              <NeuralConstellation />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/40 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DCFF85] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DCFF85]" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#DCFF85] font-semibold">
                  LIVE NEURAL ENGINE
                </span>
              </div>
              <span className="font-mono text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                &lt; 280ms latency
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-24">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Multi-Agent Orchestration & Tool Calling
              </h3>
              <p className="text-sm md:text-base text-white/75 max-w-xl mb-6">
                Coordinating specialized models with deterministic memory,
                database lookups, code execution, and structured outputs.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {workflowTabs.map(({ key, label, icon: TabIcon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveWorkflow(key)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      activeWorkflow === key
                        ? "bg-[#DCFF85] text-[#163300] font-bold shadow-lg shadow-[#DCFF85]/20 scale-105"
                        : "bg-white/10 text-white/80 hover:bg-white/15 border border-white/10"
                    }`}
                  >
                    <TabIcon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Model Context Protocol */}
          <motion.div
            className="lg:col-span-4 relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden flex flex-col justify-between shadow-xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeCustom }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Network size={20} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 font-bold bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/50">
                  STANDARD PROTOCOL
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                Model Context Protocol
              </h3>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-6">
                Connecting frontier models directly to local file systems,
                databases, GitHub, and production APIs without vendor lock-in.
              </p>

              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Terminal size={14} className="text-[#DCFF85]" />
                  <span className="text-white/90">Client / Agent Host</span>
                  <ArrowUpRight size={13} className="ml-auto text-white/40 rotate-45" />
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
                  <Server size={14} className="text-cyan-400" />
                  <span className="font-semibold">MCP Server Layer</span>
                  <span className="ml-auto text-[9px] bg-cyan-400/20 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Database size={14} className="text-purple-400" />
                  <span className="text-white/90">
                    Postgres / Vector / Tools
                  </span>
                  <CheckCircle size={13} className="ml-auto text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>Security & Sandboxing</span>
              <LockKeyhole size={14} className="text-[#DCFF85]" />
            </div>
          </motion.div>

          {/* Card 3: Frontier Engines & Agent Tooling */}
          <motion.div
            className="lg:col-span-7 relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 md:p-8 overflow-hidden shadow-xl flex flex-col justify-between"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeCustom }}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#DCFF85] font-semibold">
                    TOOLING & PROTOCOLS
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1">
                    Frontier Engines & Agent Tooling
                  </h3>
                </div>
                <span className="text-xs text-white/50 font-mono hidden sm:inline-block">
                  Click to inspect
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mb-6">
                {aiModelsTools.map((model) => {
                  const isSelected = selectedTool.name === model.name;
                  const iconSrc = aiIcons[model.icon];

                  return (
                    <motion.button
                      key={model.name}
                      type="button"
                      onClick={() => setSelectedTool(model)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={springTransition}
                      className={`relative p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left ${
                        isSelected
                          ? "bg-[#DCFF85]/15 border border-[#DCFF85] shadow-[0_0_20px_rgba(220,255,133,0.15)] ring-1 ring-[#DCFF85]/40"
                          : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 p-1.5 transition-colors ${
                          isSelected ? "bg-[#DCFF85]" : "bg-white/10"
                        }`}
                      >
                        {iconSrc ? (
                          <img
                            src={iconSrc}
                            alt={model.name}
                            className={`w-full h-full object-contain ${
                              isSelected ? "filter invert" : ""
                            }`}
                          />
                        ) : (
                          <Bot
                            size={18}
                            className={isSelected ? "text-[#163300]" : "text-white"}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-bold truncate tracking-tight ${
                            isSelected ? "text-[#DCFF85]" : "text-white"
                          }`}
                        >
                          {model.shortName}
                        </div>
                        <div className="text-[10px] font-mono text-white/50 truncate">
                          {model.badge}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTool.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-gradient-to-r from-[#DCFF85]/10 via-white/[0.04] to-transparent border border-[#DCFF85]/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#DCFF85] flex items-center justify-center p-2.5 shrink-0 shadow-md">
                    <img
                      src={aiIcons[selectedTool.icon]}
                      alt=""
                      className="w-full h-full object-contain filter invert"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {selectedTool.name}
                      </h4>
                      <span className="font-mono text-[10px] bg-[#DCFF85]/20 text-[#DCFF85] border border-[#DCFF85]/30 px-2 py-0.5 rounded-full font-semibold">
                        {selectedTool.tier}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 mt-1 leading-snug">
                      {selectedTool.strength}
                    </p>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-[#163300] bg-[#DCFF85] px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap shrink-0">
                  {selectedTool.role}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Card 4: Unit Economics & ROI */}
          <motion.div
            className="lg:col-span-5 relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden flex flex-col justify-between shadow-xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeCustom }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <TrendingUp size={18} />
                </span>
                <span className="font-mono text-xs font-semibold text-[#DCFF85] uppercase tracking-wider">
                  MEASURABLE MOVEMENT
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Unit Economics & ROI
              </h3>
              <p className="text-xs text-white/70 mb-6 leading-relaxed">
                The win is never “AI for marketing hype” — it is quietly
                cutting cost-to-serve and accelerating release velocity.
              </p>

              <div className="space-y-3">
                {[
                  {
                    metric: "40% – 60%",
                    label: "Reduction in repetitive support & ops cost",
                  },
                  {
                    metric: "3x Faster",
                    label: "Full-stack feature discovery to production",
                  },
                  {
                    metric: "0 Hallucinations",
                    label: "In production pipelines using strict evals",
                  },
                ].map((item) => (
                  <div
                    key={item.metric}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-lg font-bold text-[#DCFF85] block">
                        {item.metric}
                      </span>
                      <span className="text-xs text-white/60">
                        {item.label}
                      </span>
                    </div>
                    <CheckCircle size={16} className="text-[#DCFF85]/80" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 5: Production Methodology */}
          <motion.div
            className="lg:col-span-12 relative rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] backdrop-blur-xl p-8 md:p-10 overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: easeCustom }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#DCFF85] font-semibold">
                  PRODUCTION METHODOLOGY
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                  How I Ship AI Systems Into Live Operations
                </h3>
              </div>
              <span className="text-xs text-white/50 max-w-sm text-left md:text-right">
                A disciplined engineering approach that ensures every model
                deployment pays for itself.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologyPhases.map((phase) => (
                <div
                  key={phase.title}
                  className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#DCFF85]/40 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold text-[#DCFF85] bg-[#DCFF85]/10 px-2.5 py-1 rounded-md border border-[#DCFF85]/20">
                      {phase.phase}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-[#DCFF85] transition-colors" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#DCFF85] transition-colors">
                    {phase.title}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
