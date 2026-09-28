import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import {
  Compass,
  Target,
  Layers,
  Code2,
  Workflow,
  Rocket,
  Zap,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

// Swiper core & module styles
import 'swiper/css';
import 'swiper/css/pagination';

export interface MethodologyStep {
  num: string;
  stage: string;
  desc: string;
  icon: React.ElementType;
  tagline: string;
}

export const methodologySteps: MethodologyStep[] = [
  {
    num: '01',
    stage: 'Understand',
    tagline: 'Discovery & Alignment',
    desc: 'Deep alignment on commercial business objectives, user workflows, system constraints, and tangible ROI targets.',
    icon: Compass,
  },
  {
    num: '02',
    stage: 'Strategize',
    tagline: 'Architecture & Stack',
    desc: 'Architecting digital product direction, tech stack selection, risk mitigation frameworks, and phased execution roadmaps.',
    icon: Target,
  },
  {
    num: '03',
    stage: 'Design',
    tagline: 'UX & Data Schemas',
    desc: 'Crafting intuitive UX patterns, database schemas, API contracts, design tokens, and modular enterprise system architecture.',
    icon: Layers,
  },
  {
    num: '04',
    stage: 'Build',
    tagline: 'High-Velocity Eng',
    desc: 'High-velocity production code development with automated testing suites, type-safety, and continuous integration pipelines.',
    icon: Code2,
  },
  {
    num: '05',
    stage: 'Integrate',
    tagline: 'Consolidation & APIs',
    desc: 'Connecting existing enterprise ERPs, CRMs, single sign-on authentication layers, AI agents, and custom microservice webhooks.',
    icon: Workflow,
  },
  {
    num: '06',
    stage: 'Launch',
    tagline: 'Zero-Downtime Rollout',
    desc: 'Zero-downtime deployment, security penetration audits, load stress testing, observability setup, and operational handoff.',
    icon: Rocket,
  },
  {
    num: '07',
    stage: 'Scale',
    tagline: 'Growth & Optimization',
    desc: 'Continuous performance tuning, autonomous AI workflow refinement, enterprise governance, and long-term capability growth.',
    icon: Zap,
  },
];

export function EnterpriseApproachSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <div className="relative w-full">
      {/* Top Header & Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
            My Enterprise Approach
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#163300]/75 max-w-2xl font-medium">
            A structured 7-step execution process delivering predictability, security, and measurable commercial outcomes.
          </p>
        </div>

        {/* Custom Nav Arrows */}
        <div className="flex items-center gap-3 self-start md:self-end shrink-0 z-10">
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous step"
            className="w-12 h-12 rounded-full border-2 border-[#163300]/20 bg-white text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] hover:border-[#163300] flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#163300]/20 active:scale-95 cursor-pointer group"
          >
            <ChevronLeft
              size={22}
              strokeWidth={2.5}
              className="text-[#163300] group-hover:text-[#DCFF85] transition-all duration-200 group-hover:-translate-x-0.5"
            />
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next step"
            className="w-12 h-12 rounded-full border-2 border-[#163300]/20 bg-white text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] hover:border-[#163300] flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#163300]/20 active:scale-95 cursor-pointer group"
          >
            <ChevronRight
              size={22}
              strokeWidth={2.5}
              className="text-[#163300] group-hover:text-[#DCFF85] transition-all duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>

      {/* Swiper Container with top padding to prevent hover elevation clipping */}
      <div className="relative overflow-visible pt-4 pb-10 -mt-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={setSwiperInstance}
          speed={900}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.approach-pagination',
            bulletClass: 'approach-bullet',
            bulletActiveClass: 'approach-bullet-active',
          }}
          spaceBetween={18}
          slidesPerView={1.15}
          grabCursor={true}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2.15,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.15,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 3.75,
              spaceBetween: 24,
            },
          }}
          className="approach-swiper !overflow-visible"
        >
          {methodologySteps.map((step) => {
            const Icon = step.icon;
            return (
              <SwiperSlide key={step.num} className="!h-auto flex">
                <div className="w-full h-full bg-[#FAFAF8] rounded-3xl p-7 border border-[#163300]/10 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:border-[#163300]/25 hover:shadow-[0_16px_36px_rgba(22,51,0,0.09)] hover:-translate-y-1 select-none group min-h-[300px]">
                  <div className="flex-1 flex flex-col">
                    {/* Top row: Number badge & Icon */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="font-mono text-xs font-bold text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-full border border-[#9FE870] inline-flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#163300]" />
                        STEP {step.num}
                      </span>
                      <div className="w-9 h-9 rounded-2xl bg-white border border-[#163300]/10 flex items-center justify-center text-[#163300] shadow-xs group-hover:bg-[#163300] group-hover:text-[#DCFF85] transition-colors duration-300">
                        <Icon size={18} />
                      </div>
                    </div>

                    {/* Step Title & Tagline */}
                    <h3 className="text-2xl font-bold tracking-tight text-[#163300] mb-1.5 group-hover:text-black transition-colors">
                      {step.stage}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#163300]/60 block mb-3.5">
                      {step.tagline}
                    </span>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#163300]/80 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="pt-4 mt-6 border-t border-[#163300]/10 flex items-center justify-between text-xs font-mono text-[#163300]/60">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">
                      Enterprise Delivery
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[#163300]/40 group-hover:text-[#163300] group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Pagination Bullets */}
        <div className="approach-pagination flex items-center justify-center gap-2 mt-8" />
      </div>
    </div>
  );
}
