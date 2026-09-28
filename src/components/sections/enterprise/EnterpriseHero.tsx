import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Shield,
  Bot,
  Layers,
  Server,
  RefreshCw,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
} from "lucide-react";
import { ThreeBackground } from "../../../components/ui/ThreeBackground";
import { ActionLink } from "../../../components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function EnterpriseHero() {
  const pillars = [
    {
      num: "01",
      icon: Layers,
      title: "Digital Product & SaaS Core",
      desc: "Multi-tenant cloud architectures, microservices decoupling, and high-concurrency client portals engineered for million-user workloads.",
      tags: ["Multi-Tenant SaaS", "Sub-100ms API SLA"],
    },
    {
      num: "02",
      icon: Bot,
      title: "Autonomous AI & Swarms",
      desc: "Private, zero-data-retention AI workflows, vector search pipelines, and autonomous agent swarms deployed directly to your private VPC.",
      tags: ["Vector Indexing", "Private VPC Swarms"],
    },
    {
      num: "03",
      icon: Server,
      title: "Business Systems & ERP Unification",
      desc: "Consolidating fractured internal tools, CRM/ERP pipelines, HRM workflows, and financial automation into a unified operational cockpit.",
      tags: ["Single Sign-On", "Real-Time Telemetry"],
    },
    {
      num: "04",
      icon: RefreshCw,
      title: "Legacy Modernization & Zero-Trust",
      desc: "Strangler Fig migrations, monolith decoupling, and automated zero-downtime database transitions backed by SOC 2 & ISO compliance.",
      tags: ["Zero-Downtime Migration", "SOC 2 / ISO Ready"],
    },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-28 md:pt-40 md:pb-36 bg-[#081006] text-white">
      {/* Dynamic Interactive Three.js Particle Mesh */}
      <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
        <ThreeBackground variant="particles" accentColor={0xdcff85} />
      </div>

      {/* Soft Multi-Layered Ambient Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(220, 255, 133, 0.12), transparent 70%), radial-gradient(circle at 85% 85%, rgba(32, 72, 0, 0.4), transparent 60%), radial-gradient(circle at 15% 45%, rgba(22, 51, 0, 0.35), transparent 50%), linear-gradient(180deg, #091307 0%, #0c1809 45%, #070e05 100%)",
        }}
      />

      {/* Subtle Animated Ambient Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#DCFF85]/20 rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mb-14"
        >
          {/* Eyebrow Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFF85]/15 text-[#DCFF85] text-xs font-mono uppercase tracking-widest mb-6 border border-[#DCFF85]/30 backdrop-blur-md shadow-sm"
          >
            <Shield size={13} className="text-[#DCFF85]" />
            ENTERPRISE CAPABILITY PROFILE
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-white leading-[1.08] mb-6"
          >
            Executive Product Leadership, Digital Systems &{" "}
            <span className="font-serif italic font-normal text-[#DCFF85]">
              Enterprise Transformation.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-3xl mb-8 font-medium"
          >
            Operating at the highest level as Head of Product, Fractional CTO,
            and Principal Systems Architect — delivering 0→1 SaaS products, AI
            swarm automation, business ERP/CRM systems, and enterprise legacy
            modernizations.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 mb-12"
          >
            <ActionLink
              href="#book-demo"
              variant="lime"
              text="Discuss an Enterprise Project"
              icon={<ArrowUpRight size={16} />}
              className="px-7 py-3.5 text-sm font-semibold shadow-lg shadow-[#DCFF85]/10 hover:shadow-[#DCFF85]/25 transition-all"
            />
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors duration-200 group py-2"
            >
              <span className="border-b border-white/30 group-hover:border-[#DCFF85] transition-colors pb-0.5">
                View Selected Work
              </span>
              <ArrowRight
                size={16}
                className="text-[#DCFF85] transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Trust Scope */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-white/70"
          >
            <span className="text-[#DCFF85] font-bold">TRUSTED SCOPE:</span>
            <span>Strategy</span>
            <span>·</span>
            <span>Product</span>
            <span>·</span>
            <span>Technology</span>
            <span>·</span>
            <span>AI Swarms</span>
            <span>·</span>
            <span>Digital Transformation</span>
          </motion.div>
        </motion.div>

        {/* 4 Interactive Enterprise Architecture Bento Cards with Original Rich Emerald Glass Background */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                variants={cardItemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 350, damping: 22 },
                }}
                className="bg-[#163300]/75 hover:bg-[#163300]/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#DCFF85]/20 hover:border-[#DCFF85]/55 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_45px_-10px_rgba(22,51,0,0.6)] cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#DCFF85] tracking-wider uppercase bg-[#DCFF85]/15 px-2.5 py-1 rounded-full border border-[#DCFF85]/30">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#DCFF85] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4 font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/15 text-xs font-mono text-white/70">
                  {pillar.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#DCFF85] shrink-0" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
