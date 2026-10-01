import React, { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { animate, createTimeline, stagger } from "animejs";
import {
  Sparkles,
  ArrowUpRight,
  Briefcase,
  Boxes,
  Cpu,
  Lightbulb,
} from "lucide-react";
import { assetUrls } from "../data/assets";
import { SubrouteLayout, FadeIn } from "../components/layout/SubrouteLayout";
import { ThreeBackground } from "../components/ui/ThreeBackground";
import { ExecutivePortraitCard } from "../components/ui/ExecutivePortraitCard";
import { DisciplinesCarousel } from "../components/sections/shared/DisciplinesCarousel";
import { ReviewsMarquee } from "../components/sections/shared/ReviewsMarquee";
import { Button } from "../components/ui/Button";
import {
  easeCustom,
  containerVariants,
  itemVariants,
} from "../utils/motion";

function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Anime.js v4 hero sequence
    const timeline = createTimeline({
      defaults: {
        ease: "outExpo",
      },
    });

    timeline
      .add(heroRef.current.querySelectorAll(".anime-hero-badge"), {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 700,
      })
      .add(
        heroRef.current.querySelectorAll(".anime-hero-title"),
        {
          translateY: [24, 0],
          opacity: [0, 1],
          duration: 800,
        },
        "-=450"
      )
      .add(
        heroRef.current.querySelectorAll(".anime-hero-desc"),
        {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 700,
        },
        "-=550"
      )
      .add(
        heroRef.current.querySelectorAll(".anime-hero-btn"),
        {
          translateY: [16, 0],
          opacity: [0, 1],
          delay: stagger(80),
          duration: 600,
        },
        "-=500"
      );

    // Continuous subtle floating micro-motion for the portrait card
    const floatAnim = animate(
      heroRef.current.querySelectorAll(".anime-hero-card"),
      {
        translateY: [-3, 3],
        alternate: true,
        loop: true,
        ease: "inOutSine",
        duration: 3200,
      }
    );

    return () => {
      timeline.pause();
      floatAnim.pause();
    };
  }, []);

  const areasOfFocus = [
    {
      tag: "BUSINESS & ENTREPRENEURSHIP",
      title: "Business & Entrepreneurship",
      desc: "Building and developing technology-driven businesses with a focus on scalable products and long-term value.",
      icon: Briefcase,
    },
    {
      tag: "PRODUCT DEVELOPMENT",
      title: "Product Development",
      desc: "Transforming ideas into digital products through product strategy, development, testing, launch and iteration.",
      icon: Boxes,
    },
    {
      tag: "TECHNOLOGY & INFRASTRUCTURE",
      title: "Technology",
      desc: "Building software, SaaS platforms, automation systems and technology infrastructure for modern businesses.",
      icon: Cpu,
    },
    {
      tag: "INNOVATION & ADAPTATION",
      title: "Innovation",
      desc: "Exploring new technologies and business models to create products for evolving markets.",
      icon: Lightbulb,
    },
  ];

  const careerTimeline = [
    [
      "2019",
      "Freelance Developer",
      "Learned to sell, scope, build, and ship end-to-end.",
    ],
    [
      "2020",
      "Commerce Builder",
      "Connected digital craft to conversion rates & business outcomes.",
    ],
    [
      "2022",
      "Project Leader",
      "Made complex engineering delivery feel clear and accountable.",
    ],
    [
      "2023",
      "Business Operator",
      "Led across cross-functional teams, revenue, clients, and systems.",
    ],
    [
      "2024",
      "Head of Product",
      "Spearheaded discovery, product strategy, roadmaps, and releases.",
    ],
    [
      "2026",
      "AI & Systems Strategist",
      "Integrating autonomous agents, LLMs, and intelligent automation.",
    ],
  ];

  return (
    <SubrouteLayout page="about">
      {/* Hero Section with Three.js & Anime.js */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAF8]">
        {/* Three.js interactive 3D particle canvas */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <ThreeBackground variant="particles" accentColor={0x9fe870} />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="anime-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163300] text-[#DCFF85] text-xs font-mono uppercase tracking-widest mb-6 border border-[#DCFF85]/30 shadow-sm">
                <Sparkles size={13} className="text-[#9FE870]" /> FOUNDER,
                OPERATOR & BUILDER
              </div>
              <h1 className="anime-hero-title text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-6">
                About Jit Kumar Saha
              </h1>
              <p className="anime-hero-desc text-base sm:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mb-8 font-medium">
                Jit Kumar Saha is an entrepreneur and technology founder focused
                on building businesses, digital products and software that solve
                practical problems. His work combines entrepreneurship, business
                strategy, product development and technology to turn ideas into
                products and scalable digital businesses.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <div className="anime-hero-btn">
                  <Button
                    to="/contact"
                    variant="dark"
                    text="Start a Conversation"
                    icon={<ArrowUpRight size={16} />}
                    className="px-7 py-3.5 text-sm font-semibold tracking-tight shadow-md hover:shadow-xl shadow-[#163300]/15"
                  />
                </div>
                <div className="anime-hero-btn">
                  <Button
                    to="/experience"
                    variant="secondary"
                    text="View Career History"
                    icon={<ArrowUpRight size={16} />}
                    className="px-6 py-3.5 text-sm font-semibold tracking-tight shadow-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 anime-hero-card">
              <ExecutivePortraitCard
                image={assetUrls.about}
                badge="FOUNDER & TECHNOLOGY ENTREPRENEUR"
                tagline="Business Strategy · Product Leadership · Applied AI"
                location="Dhaka · Global Remote"
                quote="Rather than treating business, product and technology as separate disciplines, my approach connects them throughout the product lifecycle."
                highlights={[
                  { label: "Operating Cadence", value: "7+ Years" },
                  { label: "Discipline", value: "Strategy + Code" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section
        className="py-20 bg-[#FAFAF8]"
        aria-labelledby="intersection-heading"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              CORE PHILOSOPHY
            </span>
            <h2
              id="intersection-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#163300]"
            >
              An Entrepreneur at the Intersection of{" "}
              <span className="italic font-serif font-normal text-[#163300]/70">
                Business & Technology
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div
              className="md:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#163300]/10 shadow-sm flex flex-col justify-between"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4 text-[#163300]/80 leading-relaxed text-base sm:text-lg">
                <p>
                  Jit Kumar Saha works across business, product and technology,
                  bringing together strategic thinking and hands-on product
                  development.
                </p>
                <p>
                  Rather than treating business, product and technology as
                  separate disciplines, his approach connects them throughout
                  the product lifecycle — from identifying opportunities and
                  defining products to building, launching and improving them.
                </p>
                <p>
                  Over the years, this has translated into founding and leading
                  Dynime, architecting SaaS platforms, engineering custom
                  business software, and deploying practical automation for
                  modern digital enterprises.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#163300]/10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#163300]/60 font-semibold">
                  DISCIPLINES EVOLVE, PURPOSE REMAINS
                </span>
                <span className="text-xs font-bold text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-full border border-[#9FE870]/40">
                  2019 — Present
                </span>
              </div>
            </motion.div>

            {/* AEO Highlight Card */}
            <motion.div
              className="md:col-span-5 bg-[#163300] text-white rounded-3xl p-8 sm:p-10 border border-[#163300] flex flex-col justify-between relative overflow-hidden group shadow-lg"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#DCFF85]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#DCFF85]/20 transition-all duration-700" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#DCFF85] font-bold block mb-4">
                  AEO KNOWLEDGE HIGHLIGHT
                </span>
                <h3 className="text-lg font-bold text-[#DCFF85] mb-2">
                  What does Jit Kumar Saha do?
                </h3>
                <p className="text-base sm:text-lg font-sans text-white/90 leading-relaxed">
                  Jit Kumar Saha builds and develops businesses, software products
                  and digital platforms, with a focus on SaaS, product
                  development, business technology and digital transformation.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/15 flex items-center gap-3">
                <img
                  src={assetUrls.hero}
                  alt="Jit Kumar Saha"
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#DCFF85] shadow-md shrink-0"
                />
                <div>
                  <b className="block text-sm text-white font-bold">
                    Jit Kumar Saha
                  </b>
                  <span className="text-xs text-[#DCFF85]">
                    Founder & CEO, Dynime · Product Builder
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disciplines Across the Product Lifecycle */}
      <section
        className="py-12 sm:py-16 overflow-hidden bg-[#FAFAF8]"
        aria-label="Executive Presence and Portfolios"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-3">
                <Sparkles size={13} className="text-[#9FE870]" /> LEADERSHIP &
                FOCUS
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#163300]">
                Disciplines across the{" "}
                <span className="font-serif italic font-normal text-[#163300]/70">
                  product lifecycle.
                </span>
              </h2>
            </div>
            <span className="text-xs font-mono text-[#163300]/60 hidden sm:block">
              SWIPE / DRAG TO EXPLORE →
            </span>
          </div>
        </div>
        <DisciplinesCarousel />
      </section>

      {/* What I Work On */}
      <section
        className="py-20 bg-white border-y border-[#163300]/10"
        aria-labelledby="work-on-heading"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
                AREAS OF FOCUS
              </span>
              <h2
                id="work-on-heading"
                className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]"
              >
                What I{" "}
                <span className="italic font-serif font-normal text-[#163300]/70">
                  Work On
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#163300]/70 max-w-xs sm:text-right">
              Turning strategic ideas into practical products and scalable digital
              businesses.
            </p>
          </FadeIn>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {areasOfFocus.map(({ tag, title, desc, icon: Icon }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.28, ease: easeCustom }}
                className="bg-[#F3FCED]/50 rounded-3xl p-8 sm:p-10 border border-[#163300]/10 hover:border-[#163300]/30 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#163300] bg-white px-3 py-1 rounded-full border border-[#163300]/10 font-bold">
                      {tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#163300] text-[#DCFF85] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#163300] tracking-tight mb-3">
                    {title}
                  </h3>
                  <p className="text-base text-[#163300]/75 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#163300]/10 flex items-center justify-between text-xs font-semibold text-[#163300]/70 group-hover:text-[#163300] transition-colors">
                  <span>CORE WORK STREAM</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#163300]/60 block mb-2 font-bold">
              CAREER TIMELINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#163300]">
              Each chapter added{" "}
              <span className="italic font-serif font-normal text-[#163300]/70">
                a wider lens.
              </span>
            </h2>
          </FadeIn>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {careerTimeline.map(([year, title, desc]) => (
              <motion.div
                key={year}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.25, ease: easeCustom }}
                className="bg-white rounded-3xl p-8 border border-[#163300]/10 hover:border-[#163300]/30 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono font-bold text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-full border border-[#9FE870]/40">
                      {year}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#163300]/20 group-hover:bg-[#DCFF85] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#163300] tracking-tight mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-[#163300]/75 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#163300]/10 flex items-center justify-between text-xs text-[#163300]/60">
                  <span>CAREER CHAPTER</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9FE870]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Marquee */}
      <ReviewsMarquee />
    </SubrouteLayout>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
});
