import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Boxes,
  TrendingUp,
  Users,
  Layers,
  Globe,
  Bot,
  Check,
  CheckCircle,
} from "lucide-react";
import { assetUrls } from "../../../data/assets";
import { aiIcons } from "../../../data/aiIcons";
import { BrandStar } from "../../ui/BrandStar";
import { RollingText, RollingIcon } from "../../ui/Button";
import { easeCustom, springTransition } from "../../../utils/motion";

const openToTargets = [
  "Founders.",
  "Startups.",
  "Scale-ups.",
  "Enterprises.",
  "Builders.",
];

export function BentoGrid() {
  const [selectedCapability, setSelectedCapability] = useState(0);
  const [openToIndex, setOpenToIndex] = useState(0);
  const [shippedUnits, setShippedUnits] = useState(73447);

  useEffect(() => {
    const targetTimer = setInterval(() => {
      setOpenToIndex((prev) => (prev + 1) % openToTargets.length);
    }, 2400);

    const unitsTimer = setInterval(() => {
      setShippedUnits((prev) => prev + Math.floor(Math.random() * 5));
    }, 3000);

    return () => {
      clearInterval(targetTimer);
      clearInterval(unitsTimer);
    };
  }, []);

  const capabilityButtons = [
    { icon: Shield, label: "Security" },
    { icon: Boxes, label: "Product" },
    { icon: TrendingUp, label: "Growth" },
    { icon: Users, label: "Team" },
    { icon: Layers, label: "Systems" },
  ];

  return (
    <section
      className="relative py-28 md:py-36 bg-[#FAFAF8] border-t border-black/5"
      id="bento-grid"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
            <Sparkles size={13} className="text-[#9FE870]" /> CURRENT WORK &
            ECOSYSTEM
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
            Building What{" "}
            <span className="font-serif italic font-normal text-[#163300]/70">
              Comes Next
            </span>
          </h2>
          <p className="mt-3 text-base text-[#163300]/75 max-w-2xl leading-relaxed">
            My current work focuses on SaaS, digital products, business
            software, automation and technology platforms designed to help
            businesses operate, grow and adapt in a digital-first world.
          </p>
        </div>

        <Link to="/work" className="group">
          <motion.span
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#163300] hover:text-[#163300] border-b border-[#163300]/20 pb-1"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <RollingText text="Explore all case studies" />
            <RollingIcon icon={ArrowRight} size={16} />
          </motion.span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 max-w-7xl mx-auto items-stretch">
        {/* Capabilities Tab Card */}
        <motion.div
          className="lg:col-span-3 rounded-3xl bg-white border border-[#163300]/10 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#163300]/50 mb-4">
            <span>CAPABILITIES</span>
            <span className="h-2 w-2 rounded-full bg-[#9FE870]" />
          </div>

          <div className="grid grid-cols-5 gap-2 my-auto">
            {capabilityButtons.map((btn, index) => {
              const Icon = btn.icon;
              const isSelected = selectedCapability === index;
              return (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setSelectedCapability(index)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                    isSelected
                      ? "bg-[#163300] text-[#DCFF85] scale-110 shadow-md"
                      : "bg-[#FAFAF8] text-[#163300]/70 hover:bg-[#F3FCED]"
                  }`}
                  title={btn.label}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>

          <p className="font-mono text-[11px] text-[#163300]/60 text-center mt-3 pt-3 border-t border-[#163300]/5">
            Full-stack product & engineering fluency
          </p>
        </motion.div>

        {/* Shipped Work Units Card */}
        <motion.div
          className="lg:col-span-3 rounded-3xl bg-[#F3FCED]/60 border border-[#163300]/10 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          whileHover={{ y: -4 }}
        >
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#163300]/70">
              SHIPPED WORK UNITS
            </span>
            <h4 className="text-2xl font-bold font-mono text-[#163300] mt-1">
              {shippedUnits.toLocaleString()}+
            </h4>
          </div>

          <div className="flex items-end gap-1.5 h-16 mt-4">
            {[35, 48, 62, 55, 78, 88, 100].map((hVal, idx) => (
              <motion.div
                key={idx}
                className="flex-1 rounded-t-md bg-gradient-to-t from-[#163300] to-[#9FE870]"
                initial={{ height: "10%" }}
                whileInView={{ height: `${hVal}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.08,
                  ease: easeCustom,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Time Leverage / Cost Reduction Card */}
        <motion.div
          className="lg:col-span-2 rounded-3xl bg-[#FAFAF8] border border-black/5 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
        >
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-cyan-900">
            TIME LEVERAGE
          </span>
          <div className="relative flex items-center justify-center my-1">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-cyan-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className="text-cyan-600"
                strokeDasharray="64, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                initial={{ strokeDasharray: "0, 100" }}
                whileInView={{ strokeDasharray: "64, 100" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-mono text-sm font-bold text-cyan-950">
              64%
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-800 text-center">
            Cost reduction
          </span>
        </motion.div>

        {/* Intelligent Systems / Dynime OS Card */}
        <motion.div
          className="lg:col-span-4 lg:row-span-2 rounded-3xl bg-[#1b122c] border border-purple-500/20 text-white p-8 flex flex-col justify-between overflow-hidden relative shadow-2xl group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -4 }}
        >
          <Link to="/ai" className="flex flex-col h-full justify-between">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-purple-300">
                INTELLIGENT SYSTEMS
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2 leading-tight">
                The Agentic Network for Digital Products
              </h3>
              <p className="mt-3 text-xs md:text-sm text-purple-200/70 leading-relaxed">
                Dynime OS is a purpose-built, high-velocity operating layer
                architected specifically for autonomous workflows and
                enterprise-grade scale.
              </p>
            </div>

            <div className="relative z-10 my-8 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="relative w-40 h-40 flex items-center justify-center"
              >
                {[140, 110, 80, 50].map((size, idx) => (
                  <div
                    key={size}
                    style={{ width: size, height: size }}
                    className={`absolute rounded-full border border-dashed ${
                      idx % 2 === 0
                        ? "border-purple-400/30"
                        : "border-[#c7ff37]/40"
                    }`}
                  />
                ))}
                <div className="h-10 w-10 rounded-full bg-[#c7ff37] text-black flex items-center justify-center font-bold text-xs shadow-lg shadow-[#c7ff37]/30">
                  AI
                </div>
              </motion.div>
            </div>

            <div className="relative z-10 pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300 group-hover:text-[#c7ff37] transition-colors">
              <span className="font-mono">
                Dynime OS · Explore AI & Agents
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 group-hover:bg-[#c7ff37] group-hover:text-black transition-colors">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* 0→1 Velocity Card */}
        <motion.div
          className="lg:col-span-4 rounded-3xl bg-white border border-black/10 p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4 }}
        >
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-black/50">
              0→1 VELOCITY
            </span>
            <h3 className="text-xl font-bold tracking-tight text-[#171717] mt-1">
              Welcome to the New Economy
            </h3>
            <p className="text-xs text-[#666660] mt-1.5">
              From raw concept to paying customers in 6 weeks.
            </p>
          </div>

          <div className="mt-4 h-32 w-full rounded-2xl overflow-hidden relative shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=700&q=80"
              alt="Architecture visual"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
              <span className="text-white text-[11px] font-mono font-medium">
                Clear roadmaps. Zero bloat.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Founder & Builder Card */}
        <motion.div
          className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#163300] via-[#102400] to-[#0A1700] border border-[#DCFF85]/20 text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          whileHover={{ y: -4, scale: 1.01 }}
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#DCFF85]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#DCFF85]/25 transition-all duration-700" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#9FE870]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#DCFF85] text-[10px] font-mono font-bold uppercase tracking-wider border border-white/15 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCFF85] animate-pulse" />
              FOUNDER & BUILDER
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#DCFF85] group-hover:scale-110 group-hover:border-[#DCFF85]/40 transition-transform shadow-sm">
              <BrandStar size={14} spin />
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center my-auto">
            <div className="relative mb-4 group/avatar">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-[#DCFF85] shadow-lg relative z-10 bg-[#163300]">
                <img
                  src={assetUrls.hero}
                  alt="Jit Kumar Saha"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/avatar:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute -inset-1 bg-[#DCFF85]/30 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="absolute -bottom-1 -right-1 z-20 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DCFF85] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#DCFF85] border-2 border-[#163300]" />
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
              Jit Kumar Saha
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-medium max-w-xs leading-snug">
              Entrepreneur · Product Builder · Technology Founder
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-[10px] font-mono font-bold text-[#163300] bg-[#DCFF85] px-2.5 py-0.5 rounded-full shadow-sm">
                7+ Yrs Track Record
              </span>
              <span className="text-[10px] font-mono text-white/85 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                Dynime Founder
              </span>
              <span className="text-[10px] font-mono text-white/85 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                0→1 Execution
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#DCFF85] animate-pulse" />
              <span className="text-[11px] font-mono font-semibold text-[#DCFF85] tracking-wide">
                Available for Engagements
              </span>
            </div>
            <Link
              to="/about"
              className="text-xs font-bold text-white/90 hover:text-[#DCFF85] inline-flex items-center gap-1 transition-colors group/link"
            >
              <span>Profile</span>
              <ArrowUpRight
                size={13}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </motion.div>

        {/* Integration Stack Card */}
        <motion.div
          className="lg:col-span-4 rounded-3xl bg-[#163300] text-white p-6 md:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden border border-[#9FE870]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4 }}
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#DCFF85]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#DCFF85]">
                INTEGRATION STACK
              </span>
              <span className="w-2 h-2 rounded-full bg-[#DCFF85] animate-pulse" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Production Tools & Ecosystem
            </h3>
            <p className="mt-1 text-xs text-white/70 leading-relaxed">
              Curated stack of frontier models, developer tools, and agent
              runtimes.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 my-5 relative z-10">
            {[
              { name: "OpenAI", sub: "GPT-4o", icon: "openai" },
              { name: "Claude", sub: "Sonnet 3.5", icon: "claude" },
              { name: "Gemini", sub: "1.5 Pro", icon: "googlegemini" },
              { name: "Cursor", sub: "IDE Agent", icon: "cursor" },
              { name: "MCP", sub: "Protocol", icon: "modelcontextprotocol" },
              { name: "Copilot", sub: "Dev Tool", icon: "githubcopilot" },
            ].map((tool) => (
              <motion.div
                key={tool.name}
                className="flex flex-col items-start gap-1.5 p-3 rounded-2xl bg-white/[0.07] border border-white/10 hover:border-[#DCFF85]/50 hover:bg-white/[0.12] transition-all cursor-default group"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={springTransition}
              >
                <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center p-1.5 group-hover:bg-[#DCFF85] transition-colors">
                  <img
                    src={aiIcons[tool.icon]}
                    alt={tool.name}
                    className="w-full h-full object-contain filter group-hover:invert transition-all"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block tracking-tight">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 block">
                    {tool.sub}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-xs font-mono text-white/60 flex items-center justify-between pt-3 border-t border-white/10 relative z-10">
            <span>Seamless API & Agent Integration</span>
            <CheckCircle size={15} className="text-[#DCFF85]" />
          </div>
        </motion.div>

        {/* Institutional-Grade Card */}
        <motion.div
          className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#eaf2fd] via-[#dcebfc] to-[#cadff8] border border-blue-200/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          whileHover={{ y: -4 }}
        >
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-blue-900">
              VERSATILE DEPLOYMENT
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-blue-950 mt-1">
              Institutional-Grade.
            </h3>
            <div className="text-xl md:text-2xl font-serif italic text-blue-700 h-8 flex items-center">
              Open to&nbsp;
              <AnimatePresence mode="wait">
                <motion.span
                  key={openToIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-bold underline decoration-blue-400 decoration-2"
                >
                  {openToTargets[openToIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative z-10 space-y-2.5 my-4">
            <div className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-200/70 shadow-xs flex items-center justify-between hover:bg-white transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Globe size={14} />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-950 block">
                    Global Edge CDN
                  </span>
                  <span className="text-[10px] font-mono text-blue-900/60 block">
                    Anycast · AWS · Vercel
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full border border-blue-200">
                &lt; 45ms
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-200/70 shadow-xs flex items-center justify-between hover:bg-white transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={14} />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-950 block">
                    Agent Runtime
                  </span>
                  <span className="text-[10px] font-mono text-blue-900/60 block">
                    MCP Tool Bridge · Claude
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                99.4% Pass
              </span>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-200/70 shadow-xs flex items-center justify-between hover:bg-white transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Shield size={14} />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-950 block">
                    Deterministic Guard
                  </span>
                  <span className="text-[10px] font-mono text-blue-900/60 block">
                    Zero Data Leakage
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-full border border-blue-200">
                SOC2 Ready
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-blue-200/80 flex items-center justify-between text-xs text-blue-900/70 font-mono">
            <span>Built for rigorous production demands</span>
            <Check size={14} className="text-blue-700" />
          </div>
        </motion.div>

        {/* Scale & Reach Card */}
        <motion.div
          className="lg:col-span-4 rounded-3xl bg-[#163300] border border-[#DCFF85]/20 text-white p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -4 }}
        >
          <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-[#DCFF85]/10 blur-3xl pointer-events-none" />
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#DCFF85]">
              SCALE & REACH
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Autonomous Workflows. One Platform.
            </h3>
          </div>

          <div className="relative my-5 flex items-center justify-center h-44">
            <div className="absolute w-44 h-44 rounded-full border border-white/5 animate-pulse pointer-events-none" />
            <div className="absolute w-36 h-36 rounded-full bg-[#DCFF85]/5 blur-xl pointer-events-none" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="relative w-36 h-36 rounded-full border border-dashed border-white/25 flex items-center justify-center"
            >
              {[
                { icon: "claude", top: "0%", left: "50%", color: "#d57453", label: "Claude" },
                { icon: "openai", top: "25%", left: "93%", color: "#109b79", label: "OpenAI" },
                { icon: "googlegemini", top: "75%", left: "93%", color: "#6983db", label: "Gemini" },
                { icon: "cursor", top: "100%", left: "50%", color: "#18212e", label: "Cursor" },
                { icon: "modelcontextprotocol", top: "75%", left: "7%", color: "#805ad5", label: "MCP" },
                { icon: "githubcopilot", top: "25%", left: "7%", color: "#24292f", label: "Copilot" },
              ].map((tool, idx) => (
                <div
                  key={idx}
                  style={{
                    top: tool.top,
                    left: tool.left,
                    transform: "translate(-50%, -50%)",
                    background: tool.color,
                  }}
                  className="absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg p-1.5 border border-white/30 transition-transform duration-300 hover:scale-125"
                  title={tool.label}
                >
                  <img
                    src={aiIcons[tool.icon]}
                    alt={tool.label}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>

            <div className="absolute font-mono text-xs font-bold text-[#DCFF85] bg-[#163300] px-3.5 py-1.5 rounded-full border border-[#DCFF85]/40 shadow-xl flex items-center gap-1.5 z-10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#9FE870] animate-pulse" />
              100% Shipped
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-white/70 pt-3 border-t border-white/10">
            <span>@jitksahabd</span>
            <span className="text-[#DCFF85] font-bold">Verified Architect</span>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
