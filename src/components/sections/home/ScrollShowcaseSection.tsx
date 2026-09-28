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
} from "lucide-react";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import { assets } from "../../../data/assets";
import { ActionLink } from "../../ui/Button";

export function ScrollShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-8 sm:py-14 border-t border-[#163300]/10">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-3 shadow-xs">
              <Sparkles size={13} className="text-[#163300]" /> ARCHITECTURE &amp; EXECUTION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#163300] leading-[1.1] mb-3">
              Unleash The Power of <br />
              <span className="font-serif italic font-normal text-[#163300]/75">
                0→1 Product Engineering
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#163300]/75 max-w-2xl font-medium leading-relaxed">
              Translating high-level business vision into robust SaaS architectures, AI agent workflows, and scalable systems.
            </p>
          </div>
        }
      >
        {/* macOS Browser Window - Authentically Graded High-Contrast Console */}
        <div className="relative w-full h-full flex flex-col justify-between bg-[#0b100c] text-white select-none overflow-hidden">
          {/* macOS Browser Top Bar & Tabs Header */}
          <div className="bg-[#141b15] border-b border-white/10 shrink-0">
            {/* Top Row: Window Controls + Browser Tabs */}
            <div className="flex items-center justify-between px-3 sm:px-4 pt-2.5 pb-1.5">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-xs inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-xs inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-xs inline-block" />
              </div>

              {/* Browser Tabs */}
              <div className="flex items-center gap-1 max-w-[65%] sm:max-w-md mx-auto">
                {/* Active Tab */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-t-lg bg-[#0b100c] border-t border-x border-white/15 text-xs font-medium text-white shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#DCFF85] animate-pulse shrink-0" />
                  <span className="truncate max-w-[130px] sm:max-w-[200px] font-sans font-semibold">
                    Jit Kumar Saha — Systems
                  </span>
                  <X size={12} className="text-white/50 hover:text-white cursor-pointer ml-1" />
                </div>

                {/* Inactive Tab */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-white/[0.03] text-xs text-white/50 hover:text-white/80 transition-colors">
                  <span className="truncate max-w-[110px] font-sans">
                    Dynime Platform
                  </span>
                </div>

                {/* New Tab Button */}
                <button
                  type="button"
                  className="w-6 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="New Tab"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Right Spacer */}
              <div className="w-12 hidden sm:block" />
            </div>

            {/* Bottom Row: Navigation Toolbar & Address Bar (Omnibox) */}
            <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2 bg-[#0b100c]/80 border-t border-white/5">
              {/* Back / Forward / Reload Navigation Icons */}
              <div className="flex items-center gap-1.5 text-white/60">
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
              <div className="flex-1 max-w-lg mx-auto flex items-center justify-between px-3 py-1 rounded-lg bg-white/[0.07] border border-white/15 text-xs font-mono shadow-inner">
                <div className="flex items-center gap-2 truncate">
                  <Lock size={12} className="text-[#DCFF85] shrink-0" />
                  <span className="text-white/40">https://</span>
                  <span className="text-white font-semibold">jitksaha.com</span>
                  <span className="text-[#DCFF85] font-semibold">/systems</span>
                </div>
                <Share2 size={12} className="text-white/40 hover:text-white cursor-pointer ml-2 shrink-0 hidden sm:block" />
              </div>

              {/* Live Status Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFF85]/15 text-[#DCFF85] font-mono text-[11px] font-semibold border border-[#DCFF85]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85] animate-pulse" />
                  Production Live
                </span>
              </div>
            </div>
          </div>

          {/* Main Visual Display Inside Browser Window */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
            {/* Left Column: Jit's Portrait with Crisp Framing & Rich Contrast */}
            <div className="md:col-span-5 flex justify-center items-center h-full">
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-[4/4.8] rounded-2xl overflow-hidden border border-[#DCFF85]/20 bg-[#121c13] shadow-2xl group ring-1 ring-white/10">
                <img
                  src={assets.hero}
                  alt="Jit Kumar Saha — Head of Product & Systems Architect"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-104"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b100c] via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Minimalist Bottom Info Overlay */}
                <div className="absolute bottom-2.5 inset-x-2.5 bg-[#0e160f]/95 backdrop-blur-md p-3 rounded-xl border border-white/15 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                        Jit Kumar Saha
                      </h4>
                      <p className="text-[10px] text-[#DCFF85] font-mono font-medium mt-0.5">
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
                    className="bg-[#141d15]/80 hover:bg-[#18241a] rounded-2xl p-3.5 sm:p-4 border border-white/10 hover:border-[#DCFF85]/40 transition-all duration-200 group/item flex items-start gap-3.5 shadow-sm hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#DCFF85]/15 border border-[#DCFF85]/30 flex items-center justify-center text-[#DCFF85] shrink-0 group-hover/item:bg-[#DCFF85] group-hover/item:text-[#163300] transition-colors shadow-xs">
                      <Icon size={17} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                          {item.title}
                        </h5>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 font-medium">
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
                  className="px-5 py-2.5 text-xs font-bold shadow-md"
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
          <div className="flex items-center justify-between px-4 py-2 bg-[#080c09] border-t border-white/10 text-[10px] font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85]" />
              <span className="text-zinc-300 font-medium">macOS Sequoia · Metal 3 Engine</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="hidden sm:inline">MULTI-REGION ACTIVE</span>
              <span className="text-[#DCFF85] font-semibold">LATENCY: 14ms</span>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
