import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Bot, Layers, Terminal } from "lucide-react";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import { assets } from "../../../data/assets";
import { ActionLink } from "../../ui/Button";

export function ScrollShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-12 md:py-16 border-t border-[#163300]/10">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
              <Sparkles size={13} className="text-[#84cc16]" /> ARCHITECTURE & EXECUTION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#163300] leading-[1.1] mb-4">
              Unleash The Power of <br />
              <span className="font-serif italic font-normal text-[#163300]/70">
                0→1 Product Engineering
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#163300]/75 max-w-2xl font-medium leading-relaxed mb-4">
              Translating complex business concepts into resilient platforms, AI swarm automation, and scalable digital architectures.
            </p>
          </div>
        }
      >
        {/* Frame Interior Content with Jit's Image & Glass Badges */}
        <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-b from-[#111A0D] via-[#0B1307] to-[#060A03] overflow-hidden">
          {/* Top Window Chrome */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
              <span className="ml-2 font-mono text-[11px] text-white/50 hidden sm:inline-block">
                jitksaha.com / console / execution-engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFF85]/15 text-[#DCFF85] font-mono text-[10px] font-bold border border-[#DCFF85]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85] animate-pulse" />
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Main Visual Display: Jit's Portrait with Overlaid Capability Badges */}
          <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center z-10 my-auto">
            {/* Left Column: Image with Glow Frame */}
            <div className="md:col-span-6 flex justify-center items-center h-full">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={assets.hero}
                  alt="Jit Kumar Saha"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Floating Bottom Card on Image */}
                <div className="absolute bottom-3 inset-x-3 bg-[#163300]/90 backdrop-blur-md p-3 rounded-xl border border-white/15 shadow-lg">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    Jit Kumar Saha
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#DCFF85] font-mono mt-0.5">
                    Head of Product · Systems Architect
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Architecture Pillars */}
            <div className="md:col-span-6 flex flex-col justify-center gap-3">
              {[
                {
                  icon: Zap,
                  title: "0→1 Product Strategy & Build",
                  desc: "From user journeys and data models to full production launch.",
                },
                {
                  icon: Bot,
                  title: "AI Swarms & LLM Workflows",
                  desc: "Autonomous multi-agent systems and intelligent automation.",
                },
                {
                  icon: Layers,
                  title: "Enterprise Multi-Tenant SaaS",
                  desc: "Scalable microservices, role permissions, and custom ERPs.",
                },
              ].map((pill, idx) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/10 hover:border-[#DCFF85]/40 transition-all duration-300 group/item flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#DCFF85]/15 border border-[#DCFF85]/30 flex items-center justify-center text-[#DCFF85] shrink-0 group-hover/item:bg-[#DCFF85] group-hover/item:text-[#163300] transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover/item:text-[#DCFF85] transition-colors">
                        {pill.title}
                      </h5>
                      <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mt-0.5 font-medium">
                        {pill.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 flex items-center gap-3">
                <ActionLink
                  to="/enterprise"
                  variant="lime"
                  text="Explore Capabilities"
                  icon={<ArrowRight size={14} />}
                  className="px-5 py-2.5 text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#163300]/40 rounded-full blur-3xl pointer-events-none" />
        </div>
      </ContainerScroll>
    </section>
  );
}
