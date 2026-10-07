import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HomeHero } from "../components/sections/home/HomeHero";
import { FocusSection } from "../components/sections/home/FocusSection";
import { BentoGrid } from "../components/sections/home/BentoGrid";
import { FeaturedProjects } from "../components/sections/home/FeaturedProjects";
import { ExperienceSection } from "../components/sections/shared/ExperienceSection";
import { AIFluencySection } from "../components/sections/home/AIFluencySection";
import { ReviewsMarquee } from "../components/sections/shared/ReviewsMarquee";
import { PricingSection } from "../components/sections/home/PricingSection";
import { FAQSection } from "../components/sections/home/FAQSection";
import { DisciplinesCarousel } from "../components/sections/shared/DisciplinesCarousel";
import { ActionLink } from "../components/ui/Button";
import { easeCustom } from "../utils/motion";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, delay, ease: easeCustom }}
    >
      {children}
    </motion.div>
  );
}

function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="studio-page overflow-x-hidden w-full" id="top">
      <motion.div className="studio-progress" style={{ scaleX }} />
      <Header />
      <HomeHero />

      {/* Black ribbon bar */}
      <motion.div
        className="w-full bg-[#171717] text-white py-4 px-6 border-y border-white/10 relative z-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeCustom }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-white/70">
          <span className="text-[#c7ff37] font-semibold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c7ff37] animate-pulse" />
            HEAD OF PRODUCT · BUILDING SINCE 2019
          </span>
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <span>Dynime OS</span>
            <span>·</span>
            <span>Dynime AI</span>
            <span>·</span>
            <span>Product Leadership</span>
            <span>·</span>
            <span>Web Engineering</span>
            <span>·</span>
            <span>Business Operations</span>
          </div>
        </div>
      </motion.div>

      <main className="w-full overflow-x-hidden">
        {/* WHAT I BUILD Section with Carousel */}
        <section
          className="relative py-20 md:py-28 overflow-hidden w-full"
          aria-labelledby="what-i-build-heading"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
                  <Sparkles size={13} className="text-[#84cc16]" /> WHAT I BUILD
                </span>
                <h2
                  id="what-i-build-heading"
                  className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300] max-w-3xl"
                >
                  Building Businesses Through{" "}
                  <span className="font-serif italic font-normal text-black/70">
                    Products & Technology
                  </span>
                </h2>
              </div>
              <ActionLink
                to="/about"
                text="Read the longer story"
                icon={<ArrowRight size={16} />}
                className="text-sm font-semibold text-[#163300] hover:text-black border-b border-black/20 pb-1"
              />
            </div>
            <FadeIn className="mb-6">
              <p className="text-lg md:text-xl text-[#555550] leading-relaxed max-w-3xl">
                I build and develop technology-driven businesses by turning
                ideas into practical products, scalable software and digital
                experiences. My work combines entrepreneurship, product strategy,
                software development and business technology to create products
                designed around real business needs.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="w-full">
            <DisciplinesCarousel />
          </FadeIn>
        </section>

        <FocusSection />
        <BentoGrid />
        <FeaturedProjects />
        <ExperienceSection />
        <AIFluencySection />
        <ReviewsMarquee />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
