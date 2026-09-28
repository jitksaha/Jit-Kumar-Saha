import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Bot,
  Layers,
  ExternalLink,
  Lock,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Share2,
  X,
  CheckCircle2,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import { assets } from "../../../data/assets";
import { ActionLink } from "../../ui/Button";
import { easeCustom } from "../../../utils/motion";

export function ScrollShowcaseSection() {
  const capabilities = [
    {
      num: "01",
      icon: Zap,
      title: "Product Strategy & 0→1 Architecture",
      desc: "Architecting multi-tenant SaaS platforms, enterprise workflows, and high-concurrency digital operating models.",
      badge: "Strategy & Core",
    },
    {
      num: "02",
      icon: Bot,
      title: "Autonomous AI Swarms & Vector Systems",
      desc: "Deploying private AI agent workflows, custom RAG vector search pipelines, and automated intelligence swarms.",
      badge: "AI Automation",
    },
    {
      num: "03",
      icon: Layers,
      title: "High-Performance Cloud Infrastructure",
      desc: "Microservices contracts, zero-downtime database migrations, and global edge network scalability.",
      badge: "Cloud Scale",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-20 md:py-32 border-t border-[#163300]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeCustom }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/10 text-[#163300] border border-[#163300]/15 mb-4 shadow-xs"
          >
            <Sparkles size={13} className="text-[#163300]" /> ARCHITECTURE &amp; EXECUTION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeCustom }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#163300] leading-[1.1] mb-5"
          >
            Architecting Next-Gen Platforms &{" "}
            <span className="font-serif italic font-normal text-[#163300]/75">
              Scalable Systems.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: easeCustom }}
            className="text-base sm:text-lg text-[#163300]/75 max-w-2xl font-medium leading-relaxed"
          >
            Translating high-level commercial vision into robust SaaS architectures,
            autonomous AI agent swarms, and mission-critical software systems.
          </motion.p>
        </div>

        {/* Authentic Apple macOS Browser Showcase Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.25, ease: easeCustom }}
          className="w-full max-w-5xl mx-auto rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#0a100c] text-white shadow-[0_30px_90px_-20px_rgba(22,51,0,0.35),0_0_0_1px_rgba(22,51,0,0.2)] border border-[#1c2e1e]"
        >
          {/* macOS Window Title Bar */}
          <div className="bg-[#121c14] border-b border-[#223524] px-4 sm:px-6 pt-3.5 pb-2.5">
            {/* Top Row: Window Controls & Active Tab */}
            <div className="flex items-center justify-between gap-4">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-xs inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-xs inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-xs inline-block" />
              </div>

              {/* Browser Tabs */}
              <div className="flex items-center gap-1.5 max-w-[60%] sm:max-w-md mx-auto">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-t-lg bg-[#0a100c] border-t border-x border-[#223524] text-xs font-semibold text-white shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#DCFF85] animate-pulse shrink-0" />
                  <span className="truncate max-w-[130px] sm:max-w-[210px] font-sans">
                    Jit Kumar Saha — Systems
                  </span>
                  <X size={12} className="text-white/50 hover:text-white cursor-pointer ml-1" />
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-white/[0.04] text-xs text-white/50">
                  <span className="truncate max-w-[100px] font-sans">Dynime Core</span>
                </div>
              </div>

              {/* Production Live Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCFF85]/15 text-[#DCFF85] font-mono text-[11px] font-bold border border-[#DCFF85]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85] animate-pulse" />
                  Production Live
                </span>
              </div>
            </div>

            {/* Bottom Row: Navigation Toolbar & Omnibox */}
            <div className="flex items-center justify-between gap-3 pt-2.5 mt-2 border-t border-white/[0.06]">
              {/* Nav Icons */}
              <div className="flex items-center gap-1.5 text-white/60">
                <button type="button" className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors" aria-label="Back">
                  <ChevronLeft size={16} />
                </button>
                <button type="button" className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors" aria-label="Forward">
                  <ChevronRight size={16} />
                </button>
                <button type="button" className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors ml-1" aria-label="Reload">
                  <RotateCw size={13} />
                </button>
              </div>

              {/* URL Omnibox */}
              <div className="flex-1 max-w-md mx-auto flex items-center justify-between px-3.5 py-1 rounded-lg bg-[#0a100c] border border-[#223524] text-xs font-mono shadow-inner">
                <div className="flex items-center gap-2 truncate">
                  <Lock size={12} className="text-[#DCFF85] shrink-0" />
                  <span className="text-white/40">https://</span>
                  <span className="text-white font-bold">jitksaha.com</span>
                  <span className="text-[#DCFF85] font-bold">/systems</span>
                </div>
                <Share2 size={12} className="text-white/40 hover:text-white cursor-pointer ml-2 shrink-0 hidden sm:block" />
              </div>

              {/* SLA Tag */}
              <div className="hidden sm:flex items-center text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                <Shield size={11} className="text-[#DCFF85] mr-1.5" />
                99.99% Uptime
              </div>
            </div>
          </div>

          {/* Window Canvas Body */}
          <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-[#0a100c] to-[#070c08]">
            {/* Left: Executive Portrait in High-End Glass Framing */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/4.9] rounded-2xl overflow-hidden border-2 border-[#223524] bg-[#111c12] shadow-2xl group ring-1 ring-white/10">
                <img
                  src={assets.hero}
                  alt="Jit Kumar Saha — Head of Product & Systems Architect"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-104"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d09] via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Portrait Overlay Info */}
                <div className="absolute bottom-3 inset-x-3 bg-[#0e1710]/95 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
                        Jit Kumar Saha
                      </h4>
                      <p className="text-[11px] text-[#DCFF85] font-mono font-semibold mt-0.5">
                        Head of Product · Systems Architect
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#DCFF85] text-[#163300] font-bold shadow-xs">
                      0 → 1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 3 High-Contrast System Architecture Bento Cards */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-3.5">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    className="bg-[#121c13] hover:bg-[#162418] rounded-2xl p-4 sm:p-5 border border-[#223524] hover:border-[#DCFF85]/50 transition-all duration-200 group/item flex items-start gap-4 shadow-sm hover:shadow-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold shrink-0 shadow-md group-hover/item:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#DCFF85] font-semibold border border-white/10">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <ActionLink
                  to="/enterprise"
                  variant="lime"
                  text="Explore Enterprise Solutions"
                  icon={<ArrowUpRight size={15} />}
                  className="px-6 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-[#DCFF85]/15"
                />
                <ActionLink
                  to="/work"
                  variant="outline"
                  text="View Selected Work"
                  icon={<ExternalLink size={14} />}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white border-white/25 hover:bg-white/15 hover:text-white"
                />
              </div>
            </div>
          </div>

          {/* Bottom Browser Status Bar */}
          <div className="flex items-center justify-between px-6 py-2.5 bg-[#070c08] border-t border-[#1c2e1e] text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85]" />
              <span className="text-zinc-300 font-semibold">macOS Sequoia · V8 Engine</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="hidden sm:inline">GLOBAL MULTI-REGION ACTIVE</span>
              <span className="text-[#DCFF85] font-bold">LATENCY: 14ms</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
