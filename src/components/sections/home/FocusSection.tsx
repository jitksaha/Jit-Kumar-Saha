import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, Boxes, Bot, ArrowUpRight } from "lucide-react";
import { whatIBuildItems } from "../../../data/whatIBuild";
import { RollingText, RollingIcon } from "../../ui/Button";
import {
  easeCustom,
  containerVariants,
  itemVariants,
} from "../../../utils/motion";

const iconMap: Record<string, React.ElementType> = {
  business: Briefcase,
  product: Boxes,
  technology: Bot,
};

export function FocusSection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      id="focus"
      aria-labelledby="focus-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#171717]/5 text-[#171717] border border-[#171717]/10 mb-4">
            <Sparkles size={13} className="text-[#84cc16]" /> STRATEGIC FOCUS
          </span>
          <h2
            id="focus-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-[#171717]"
          >
            Business. Product.{" "}
            <span className="font-serif italic font-normal text-black/70">
              Technology.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#555550] leading-relaxed">
            Rather than treating business, product and technology as separate
            silos, my work connects them throughout the product lifecycle to
            create long-term value.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {whatIBuildItems.map((item) => {
            const Icon = iconMap[item.id] || Briefcase;
            return (
              <motion.article
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: easeCustom }}
                className="group relative flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Link
                  to={item.link}
                  className="flex flex-col h-full justify-between"
                >
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171717] text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Icon size={22} className="text-[#c7ff37]" />
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#9FE870] ring-4 ring-[#9FE870]/20" />
                    </div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono tracking-wider font-semibold border ${item.badgeColor} mb-3`}
                    >
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-[#171717] group-hover:text-black transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#666660] leading-relaxed">
                      {item.description}
                    </p>
                    <ul className="mt-6 space-y-2.5 border-t border-black/5 pt-6">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-2.5 text-xs font-medium text-[#444440]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#171717]" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative z-10 mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#171717]">
                      {item.stats}
                    </span>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#163300]/5 text-[#163300] group-hover:bg-[#163300] group-hover:text-[#DCFF85] text-xs font-semibold transition-all duration-300">
                      <RollingText text={item.ctaText} staggerDelay={0.015} />
                      <RollingIcon icon={ArrowUpRight} size={14} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
