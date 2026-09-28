import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { ActionLink } from "./Button";
import { easeCustom, itemVariants } from "../../utils/motion";

export interface HighlightItem {
  label: string;
  value: string;
}

export interface ExecutivePortraitCardProps {
  image: string;
  badge?: string;
  tagline?: string;
  location?: string;
  statusText?: string;
  highlights?: HighlightItem[];
  quote?: string;
  ctaText?: string;
  ctaTo?: string;
  className?: string;
  aspectRatio?: string;
  size?: "normal" | "large";
}

export function ExecutivePortraitCard({
  image,
  badge = "FOUNDER & OPERATOR",
  tagline = "Business · Product · Applied AI",
  location = "Dhaka · Global Remote",
  highlights = [
    { label: "Track Record", value: "7+ Yrs" },
    { label: "Shipped Systems", value: "30+ Live" },
  ],
  quote,
  ctaText,
  ctaTo = "/contact",
  className = "",
  aspectRatio = "aspect-[4/3.5] sm:aspect-[4/3.8]",
}: ExecutivePortraitCardProps) {
  return (
    <motion.div
      className={`relative group rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-[#163300]/15 shadow-lg transition-all duration-500 hover:shadow-xl hover:border-[#163300]/30 max-w-md mx-auto ${className}`}
      variants={itemVariants}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: easeCustom }}
    >
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#DCFF85]/40 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

      <div className={`relative w-full ${aspectRatio} min-h-[280px] sm:min-h-[320px] overflow-hidden bg-[#163300]/5`}>
        <img
          src={image}
          alt="Jit Kumar Saha — Founder, Product Leader and AI Strategist"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#163300]/90 via-[#163300]/20 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#163300] text-[10px] sm:text-[11px] font-mono font-bold shadow-sm border border-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#163300] animate-pulse" />
            {badge}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#163300]/80 backdrop-blur-md text-[#DCFF85] text-[10px] font-mono font-semibold border border-[#DCFF85]/30">
            <MapPin size={10} className="text-[#9FE870]" />
            {location}
          </span>
        </div>

        <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-sm flex items-center gap-1.5">
            Jit Kumar Saha
            <span className="text-[#DCFF85] text-[10px] font-normal font-mono bg-[#163300]/60 px-1.5 py-0.5 rounded border border-[#DCFF85]/30">
              Verified
            </span>
          </h3>
          <p className="text-[11px] text-[#DCFF85] font-medium tracking-wide mt-0.5">
            {tagline}
          </p>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 bg-white space-y-2.5">
        {quote && (
          <p className="text-xs text-[#163300]/80 italic border-l-2 border-[#9FE870] pl-2.5 py-0.5 leading-snug font-serif line-clamp-2">
            “{quote}”
          </p>
        )}

        {highlights.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#163300]/10">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-[#163300]/[0.03] px-2.5 py-1.5 rounded-xl border border-[#163300]/5"
              >
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#163300]/60 block font-semibold leading-tight">
                  {h.label}
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-[#163300] font-mono leading-tight">
                  {h.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {ctaText && (
          <div className="pt-1">
            <ActionLink
              to={ctaTo}
              variant="dark"
              text={ctaText}
              icon={<ArrowUpRight size={13} />}
              className="w-full py-2 text-xs font-semibold justify-center"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
