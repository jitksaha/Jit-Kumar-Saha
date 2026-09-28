import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, ArrowUpRight, CheckCircle, TrendingUp } from "lucide-react";
import { engagementTiers } from "../../../data/engagement";
import { ActionLink } from "../../ui/Button";
import {
  easeCustom,
  containerVariants,
  itemVariants,
} from "../../../utils/motion";

export function PricingSection() {
  return (
    <section
      className="relative py-28 bg-[#f8f9fa] border-y border-black/5"
      id="pricing"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/5 text-[#171717] border border-black/10 mb-4">
            <TrendingUp size={13} className="text-amber-500" /> WAYS OF WORKING
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#171717]">
            Transparent models.{" "}
            <span className="font-serif italic font-normal text-black/70">
              Zero fluff.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#555550] leading-relaxed">
            Choose the engagement model that fits your current stage. Every tier
            is built around direct delivery and measurable business movement.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariants}
        >
          {engagementTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: easeCustom }}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                tier.popular
                  ? "bg-[#163300] text-white shadow-2xl ring-2 ring-[#DCFF85]/30 lg:-translate-y-2"
                  : "bg-white text-[#163300] border border-[#163300]/10 shadow-sm hover:shadow-md"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#DCFF85] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#163300] shadow-md flex items-center gap-1.5 border border-[#9FE870]/40">
                  <Sparkles size={13} /> MOST POPULAR
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {tier.name}
                  </h3>
                  <span
                    className={`font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                      tier.popular
                        ? "bg-white/10 text-white/80"
                        : "bg-[#163300]/5 text-[#163300]/70"
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>

                <p
                  className={`mt-2 text-xs font-medium ${
                    tier.popular
                      ? "text-[#DCFF85]"
                      : "text-emerald-800 font-semibold"
                  }`}
                >
                  {tier.tagline}
                </p>

                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    tier.popular ? "text-white/80" : "text-[#163300]/70"
                  }`}
                >
                  {tier.description}
                </p>

                <div
                  className={`mt-8 pt-6 border-t ${
                    tier.popular ? "border-white/10" : "border-[#163300]/10"
                  }`}
                >
                  <p
                    className={`font-mono text-xs uppercase tracking-widest font-semibold ${
                      tier.popular ? "text-white/50" : "text-[#163300]/50"
                    }`}
                  >
                    WHAT’S INCLUDED
                  </p>
                  <ul className="mt-4 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            tier.popular
                              ? "bg-[#DCFF85] text-[#163300]"
                              : "bg-[#E8F9DC] text-[#163300]"
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span
                          className={
                            tier.popular
                              ? "text-white/90"
                              : "text-[#163300]/90"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-6">
                <ActionLink
                  to="/contact"
                  variant={tier.popular ? "lime" : "dark"}
                  text={tier.cta}
                  icon={<ArrowUpRight size={16} />}
                  className={`w-full py-3.5 px-6 text-sm font-semibold btn-shine ${
                    tier.popular ? "btn-lime-glow" : "btn-dark-glow"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reassurance Banner */}
        <motion.div
          className="mt-16 mx-auto max-w-2xl rounded-2xl border border-black/10 bg-white p-6 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[#555550]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
            <CheckCircle size={20} />
          </span>
          <p className="text-left">
            <strong className="text-[#171717] block sm:inline">
              No long-term lock-in.
            </strong>{" "}
            Every engagement starts with clear milestones and deliverables so
            both sides know what success looks like.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
