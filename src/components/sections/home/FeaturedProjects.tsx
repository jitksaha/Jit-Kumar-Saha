import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, ArrowUpRight, Bot } from "lucide-react";
import { caseStudies } from "../../../data/work";
import { ActionLink, RollingText, RollingIcon } from "../../ui/Button";
import {
  easeCustom,
  containerVariants,
  itemVariants,
} from "../../../utils/motion";

export function FeaturedProjects() {
  const featured = caseStudies[0];
  const remaining = caseStudies.slice(1);

  return (
    <section
      className="relative py-28 md:py-36 bg-[#FAFAF8] border-t border-black/5"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
            <Award size={13} className="text-[#9FE870]" /> FEATURED CASE
            STUDIES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
            Work that moved{" "}
            <span className="font-serif italic font-normal text-[#163300]/70">
              the needle.
            </span>
          </h2>
          <p className="mt-3 text-base text-[#163300]/75 max-w-xl leading-relaxed">
            Real products shipped into production. Real unit economics improved.
            Every project is documented with the problem, approach, and outcome.
          </p>
        </div>

        <ActionLink
          to="/work"
          variant="dark"
          text="View all projects"
          icon={<ArrowUpRight size={16} />}
          className="px-6 py-3 text-sm btn-shine btn-dark-glow"
        />
      </div>

      {/* Featured Spotlight Card */}
      {featured && (
        <motion.div
          className="mb-10 rounded-3xl border border-[#163300]/10 bg-white p-6 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: easeCustom }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="font-mono text-xs font-bold text-[#163300] bg-[#DCFF85] px-3 py-1 rounded-md border border-[#9FE870]/40">
                    FEATURED SPOTLIGHT · {featured.year}
                  </span>
                  <span className="font-mono text-xs text-[#163300]/50 font-semibold">
                    {featured.category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[#163300] mb-4">
                  {featured.title}
                </h3>
                <p className="text-base text-[#163300]/75 leading-relaxed mb-6">
                  {featured.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {featured.metrics.map(([val, desc]) => (
                    <div
                      key={desc}
                      className="p-3 rounded-2xl bg-[#F3FCED] border border-[#163300]/10"
                    >
                      <span className="font-mono text-base font-bold text-[#163300] block">
                        {val}
                      </span>
                      <span className="text-[11px] text-[#163300]/65 leading-tight block mt-0.5 font-medium">
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  to="/work/$slug"
                  params={{ slug: featured.slug }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#163300] border-b-2 border-[#163300] pb-1 hover:text-[#163300] group"
                >
                  <RollingText text="Read full case study" />
                  <RollingIcon icon={ArrowUpRight} size={15} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden bg-[#163300] border border-[#163300]/10 shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                  alt="AI Operations System Preview"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163300] via-[#163300]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DCFF85] text-[#163300] font-bold">
                      <Bot size={20} />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold">
                        Autonomous Agent Orchestration
                      </h4>
                      <p className="text-[11px] text-white/70">
                        Connecting CRM, Codebase & Operations
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#DCFF85] font-bold bg-[#163300]/80 px-2.5 py-1 rounded-md border border-white/15">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Remaining 2 Case Studies */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={containerVariants}
      >
        {remaining.map((item) => {
          const imgUrl =
            item.slug === "product-growth-engine"
              ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
              : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80";

          return (
            <motion.article
              key={item.slug}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: easeCustom }}
              className="group flex flex-col justify-between rounded-3xl border border-[#163300]/10 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#163300] mb-6 border border-[#163300]/5 shadow-inner">
                  <img
                    src={imgUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[10px] uppercase font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {item.category.split("·")[0].trim()}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                    <span>{item.year} Delivery</span>
                    <span className="text-[#DCFF85] font-bold">
                      {item.metrics[0][0]} {item.metrics[0][1]}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#163300] group-hover:text-[#163300] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#163300]/75 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-black/5 flex items-center justify-between">
                <Link
                  to="/work/$slug"
                  params={{ slug: item.slug }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#171717] hover:text-[#163300] group"
                >
                  <RollingText text="View Case Study" />
                  <RollingIcon icon={ArrowUpRight} size={15} />
                </Link>
                <span className="font-mono text-xs text-black/40 font-semibold">
                  {item.year}
                </span>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
      </div>
    </section>
  );
}
