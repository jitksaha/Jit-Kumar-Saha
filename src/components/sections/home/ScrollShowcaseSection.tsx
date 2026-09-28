import React from "react";
import { Sparkles, ArrowRight, Zap, Bot, Layers, Terminal, ExternalLink } from "lucide-react";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import { assets } from "../../../data/assets";
import { ActionLink } from "../../ui/Button";

export function ScrollShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-8 sm:py-12 border-t border-[#163300]/10">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-3">
              <Sparkles size={13} className="text-[#84cc16]" /> ARCHITECTURE & EXECUTION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#163300] leading-[1.1] mb-3">
              Unleash The Power of <br />
              <span className="font-serif italic font-normal text-[#163300]/70">
                0→1 Product Engineering
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#163300]/70 max-w-2xl font-medium leading-relaxed">
              Translating high-level business vision into robust SaaS architectures, AI agent workflows, and scalable systems.
            </p>
          </div>
        }
      >
        {/* macOS Screen Interior Content */}
        <div className="relative w-full h-full flex flex-col justify-between bg-[#0e0f12] text-white p-3 sm:p-6 select-none">
          {/* macOS Top Window Header Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-xs" />
              <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-zinc-400">
                <span className="text-zinc-500">https://</span>
                <span className="text-zinc-200">jitksaha.com</span>
                <span className="text-zinc-500">/systems</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.05] text-zinc-300 font-mono text-[11px] font-medium border border-white/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85]" />
                v2.4.0 Production
              </span>
            </div>
          </div>

          {/* Main Visual Display Inside Screen */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center my-auto">
            {/* Left Column: Jit's Portrait with Minimalist Frame */}
            <div className="md:col-span-5 flex justify-center items-center h-full">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.12] bg-[#18181c] shadow-xl group">
                <img
                  src={assets.hero}
                  alt="Jit Kumar Saha"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-103"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Minimalist Bottom Info Overlay */}
                <div className="absolute bottom-2.5 inset-x-2.5 bg-[#121316]/90 backdrop-blur-md p-2.5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-tight">
                        Jit Kumar Saha
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        Head of Product · Fractional CTO
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCFF85]/15 text-[#DCFF85] font-bold">
                      0 → 1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Monochrome System Capabilities */}
            <div className="md:col-span-7 flex flex-col justify-center gap-2.5 sm:gap-3">
              {[
                {
                  icon: Zap,
                  title: "Product Strategy & Architecture",
                  desc: "0→1 SaaS platforms, enterprise workflows, and digital operating models.",
                },
                {
                  icon: Bot,
                  title: "Autonomous AI & Intelligent Systems",
                  desc: "Multi-agent AI swarms, custom RAG pipelines, and automated intelligence.",
                },
                {
                  icon: Layers,
                  title: "High-Performance Digital Infrastructure",
                  desc: "Microservice contracts, multi-tenant databases, and edge scalability.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/[0.03] hover:bg-white/[0.06] rounded-xl p-3 sm:p-3.5 border border-white/[0.08] hover:border-white/20 transition-all duration-200 group/item flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-zinc-300 shrink-0 group-hover/item:text-[#DCFF85] group-hover/item:border-[#DCFF85]/30 transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-[13px] font-semibold text-zinc-100 tracking-tight">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Bottom Quick Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <ActionLink
                  to="/enterprise"
                  variant="lime"
                  text="Explore Enterprise"
                  icon={<ArrowRight size={14} />}
                  className="px-4.5 py-2 text-xs font-semibold"
                />
                <ActionLink
                  to="/work"
                  variant="outline"
                  text="View Selected Work"
                  icon={<ExternalLink size={13} />}
                  className="px-4 py-2 text-xs font-semibold text-zinc-300 border-white/15 hover:bg-white/10 hover:text-white"
                />
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="hidden sm:flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
            <span>READY · ALL MICROSERVICES HEALTHY</span>
            <span>LATENCY: 18ms · MEMORY: OPTIMAL</span>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
