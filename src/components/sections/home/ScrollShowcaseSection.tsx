import React from "react";
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
  Plus,
  X,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import { assets } from "../../../data/assets";
import { ActionLink } from "../../ui/Button";

export function ScrollShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] pt-12 pb-16 sm:pt-20 sm:pb-24 border-t border-[#163300]/10">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/10 text-[#163300] border border-[#163300]/15 mb-4 shadow-xs">
              <Sparkles size={13} className="text-[#163300]" /> ARCHITECTURE &amp; EXECUTION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#163300] leading-[1.1] mb-4">
              Unleash The Power of <br />
              <span className="font-serif italic font-normal text-[#163300]/80">
                0→1 Product Engineering
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#163300]/80 max-w-2xl font-medium leading-relaxed">
              Translating high-level business vision into robust SaaS architectures, AI agent workflows, and scalable systems.
            </p>
          </div>
        }
      >
        {/* macOS Browser Window - High-Contrast Safari / macOS Obsidian Console */}
        <div className="relative w-full h-full flex flex-col justify-between bg-[#080d09] text-white select-none overflow-hidden rounded-[14px]">
          {/* macOS Browser Chrome Toolbar */}
          <div className="bg-[#121c14] border-b border-[#233525] shrink-0">
            {/* Top Bar: Traffic Light Controls & Browser Tab */}
            <div className="flex items-center justify-between px-3.5 sm:px-5 pt-3 pb-2">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block" />
              </div>

              {/* Browser Active Tab */}
              <div className="flex items-center gap-1 max-w-[70%] sm:max-w-md mx-auto">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-t-lg bg-[#080d09] border-t border-x border-[#233525] text-xs font-semibold text-white shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#DCFF85] animate-pulse shrink-0" />
                  <span className="truncate max-w-[140px] sm:max-w-[220px] font-sans">
                    Jit Kumar Saha — Systems
                  </span>
                  <X size={12} className="text-white/60 hover:text-white cursor-pointer ml-1" />
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-white/[0.04] text-xs text-white/60 hover:text-white transition-colors">
                  <span className="truncate max-w-[110px] font-sans">
                    Dynime Platform
                  </span>
                </div>

                <button
                  type="button"
                  className="w-6 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1"
                  aria-label="New Tab"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Live Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCFF85]/20 text-[#DCFF85] font-mono text-[11px] font-bold border border-[#DCFF85]/40 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85] animate-pulse" />
                  Production Live
                </span>
              </div>
            </div>

            {/* Bottom Row: Navigation Toolbar & URL Omnibox */}
            <div className="flex items-center justify-between gap-3 px-3.5 sm:px-5 py-2 bg-[#0a110b] border-t border-white/5">
              {/* Back / Forward / Reload Navigation Icons */}
              <div className="flex items-center gap-1.5 text-white/70">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Back"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Forward"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors ml-1"
                  aria-label="Reload"
                >
                  <RotateCw size={13} />
                </button>
              </div>

              {/* Central URL Omnibox */}
              <div className="flex-1 max-w-md mx-auto flex items-center justify-between px-3.5 py-1 rounded-lg bg-[#141e15] border border-[#283d2a] text-xs font-mono shadow-inner">
                <div className="flex items-center gap-2 truncate">
                  <Lock size={12} className="text-[#DCFF85] shrink-0" />
                  <span className="text-white/50">https://</span>
                  <span className="text-white font-bold">jitksaha.com</span>
                  <span className="text-[#DCFF85] font-bold">/systems</span>
                </div>
                <Share2 size={12} className="text-white/50 hover:text-white cursor-pointer ml-2 shrink-0 hidden sm:block" />
              </div>

              {/* SLA Tag */}
              <div className="hidden sm:flex items-center text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                <Shield size={11} className="text-[#DCFF85] mr-1.5" />
                99.99% Uptime SLA
              </div>
            </div>
          </div>

          {/* Main Visual Display Inside Browser Window - High Contrast & Crisp Grading */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
            {/* Left Column: Jit's Portrait with Crisp Framing & Rich Contrast */}
            <div className="md:col-span-5 flex justify-center items-center h-full">
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-[4/4.8] rounded-2xl overflow-hidden border-2 border-[#243826] bg-[#111c12] shadow-2xl group ring-1 ring-white/10">
                <img
                  src={assets.hero}
                  alt="Jit Kumar Saha — Head of Product & Systems Architect"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-104"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d09] via-transparent to-transparent opacity-95 pointer-events-none" />

                {/* Minimalist Bottom Info Overlay */}
                <div className="absolute bottom-2.5 inset-x-2.5 bg-[#0e1710]/95 backdrop-blur-md p-3 rounded-xl border border-white/15 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                        Jit Kumar Saha
                      </h4>
                      <p className="text-[10px] text-[#DCFF85] font-mono font-semibold mt-0.5">
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

            {/* Right Column: High-Contrast System Capabilities Bento */}
            <div className="md:col-span-7 flex flex-col justify-center gap-3">
              {[
                {
                  icon: Zap,
                  title: "Product Strategy & Architecture",
                  desc: "0→1 SaaS platforms, enterprise workflows, and high-concurrency operating models.",
                  badge: "Strategy",
                },
                {
                  icon: Bot,
                  title: "Autonomous AI & Intelligent Systems",
                  desc: "Multi-agent AI swarms, custom RAG vector pipelines, and automated decision engines.",
                  badge: "AI Swarms",
                },
                {
                  icon: Layers,
                  title: "High-Performance Digital Infrastructure",
                  desc: "Microservice contracts, multi-tenant databases, zero-downtime migrations, and edge scalability.",
                  badge: "Cloud Scale",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#121c13] hover:bg-[#162418] rounded-2xl p-3.5 sm:p-4 border border-[#233525] hover:border-[#DCFF85]/50 transition-all duration-200 group/item flex items-start gap-3.5 shadow-sm hover:shadow-lg"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold shrink-0 shadow-md group-hover/item:scale-105 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                          {item.title}
                        </h5>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#DCFF85] font-semibold border border-white/10">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed mt-1 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Bottom Action Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <ActionLink
                  to="/enterprise"
                  variant="lime"
                  text="Explore Enterprise"
                  icon={<ArrowRight size={14} />}
                  className="px-5 py-2.5 text-xs font-bold shadow-md hover:shadow-lg hover:shadow-[#DCFF85]/20"
                />
                <ActionLink
                  to="/work"
                  variant="outline"
                  text="View Selected Work"
                  icon={<ExternalLink size={13} />}
                  className="px-4.5 py-2.5 text-xs font-semibold text-white border-white/20 hover:bg-white/15 hover:text-white"
                />
              </div>
            </div>
          </div>

          {/* Bottom Browser Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#060a07] border-t border-[#1c2b1e] text-[10px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85]" />
              <span className="text-zinc-300 font-semibold">macOS Sequoia · Metal 3 Engine</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="hidden sm:inline">MULTI-REGION CLOUD</span>
              <span className="text-[#DCFF85] font-bold">LATENCY: 14ms</span>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
