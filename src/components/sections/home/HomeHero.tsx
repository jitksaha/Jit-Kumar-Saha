import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import { assetUrls } from "../../../data/assets";
import { Button } from "../../ui/Button";
import { BrandSlider } from "./BrandSlider";
import { containerVariants, itemVariants } from "../../../utils/motion";

const leftTerms = [
  "Security",
  "Automation",
  "Analytics",
  "Platforms",
  "Products",
  "Systems",
  "Innovation",
  "No Code",
  "Low Code",
  "Supabase",
  "Replit",
  "Laravel",
  "AI",
  "SaaS",
  "Cloud",
  "Data",
  "Apps",
  "APIs",
];

const rightTerms = [
  "Operations",
  "Roadmapping",
  "Revenue Ops",
  "0 → 1 Build",
  "Advisory",
  "Scale Ops",
  "AI Strategy",
  "Product Leadership",
  "Growth Engines",
  "GTM Strategy",
];

interface RailProps {
  terms: string[];
  right?: boolean;
}

function HeroRail({ terms, right = false }: RailProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(
      () => setIndex((prev) => (prev + 1) % terms.length),
      2400
    );
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, terms.length]);

  return (
    <div
      className={`intro-rail ${right ? "intro-rail-right" : "intro-rail-left"}`}
      aria-hidden="true"
    >
      {Array.from({ length: 9 }, (_, a) => {
        const term = terms[(index + a) % terms.length];
        return (
          <motion.div
            key={term}
            className={`intro-rail-item ${a === 4 ? "is-selected" : ""}`}
            initial={false}
            animate={{
              x: (Math.abs(a - 4) - 2) * (right ? -14 : 14),
              y: a * 44,
              opacity: [0.12, 0.3, 0.5, 0.65, 1, 0.65, 0.5, 0.3, 0.12][a],
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <span>
              {a === 4 &&
                (right ? (
                  <Sparkles size={15} />
                ) : (
                  <Layers size={15} />
                ))}
              {term}
            </span>
          </motion.div>
        );
      })}
      <span className="intro-rail-arrows">{right ? "‹‹‹‹‹" : "›››››"}</span>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="home-intro" aria-labelledby="intro-heading">
      <HeroRail terms={leftTerms} />
      <HeroRail terms={rightTerms} right />

      <motion.div
        className="intro-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span
          className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full bg-[#163300]/[0.05] border border-[#163300]/10 text-xs font-mono font-medium text-[#163300]/80 shadow-2xs mb-5 select-none"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={assetUrls.hero}
            alt="Jit Kumar Saha"
            className="w-5 h-5 rounded-full object-cover object-top border border-[#DCFF85]/60 shadow-xs"
          />
          <motion.i
            className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block shrink-0"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[11px] sm:text-xs tracking-tight font-medium text-[#163300]">
            Entrepreneur · Product Builder · Technology Founder
          </span>
        </motion.span>

        <motion.h1
          id="intro-heading"
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#163300] leading-[1.08] mb-4"
          variants={itemVariants}
        >
          Jit Kumar Saha
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#163300]/80 mb-4 max-w-2xl text-center"
          variants={itemVariants}
        >
          Entrepreneur building businesses, products and technology for the
          digital economy.
        </motion.h2>

        <motion.p
          className="intro-description max-w-2xl text-center text-sm sm:text-base text-[#163300]/75 leading-relaxed mb-8"
          variants={itemVariants}
        >
          Jit Kumar Saha is an entrepreneur, product builder and technology
          founder focused on building digital products, SaaS platforms and
          technology-driven businesses. His work sits at the intersection of
          business strategy, product development, software and emerging
          technology.
        </motion.p>

        {/* Redesigned Action Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10 max-w-2xl w-full px-2"
          variants={itemVariants}
        >
          <Button
            text="Discuss a Project"
            to="/contact"
            variant="primary"
            icon={<ArrowUpRight size={16} />}
            className="px-7 py-3.5 text-sm font-semibold tracking-tight shadow-md hover:shadow-xl shadow-[#163300]/15"
          />
          <Button
            text="Explore Enterprise"
            to="/enterprise"
            variant="secondary"
            icon={<Briefcase size={16} />}
            className="px-6 py-3.5 text-sm font-semibold tracking-tight shadow-xs transition-colors duration-200 !bg-[#F0F2ED] !border-[#E2E5DC] !text-[#163300] hover:!bg-[#163300] hover:!border-[#163300] hover:!text-[#DCFF85]"
          />
        </motion.div>

        {/* 2-Row Brand Logo Slider with wide breathing room */}
        <motion.div
          className="w-full max-w-4xl xl:max-w-5xl px-2 sm:px-4"
          variants={itemVariants}
        >
          <BrandSlider />
        </motion.div>
      </motion.div>
    </section>
  );
}
