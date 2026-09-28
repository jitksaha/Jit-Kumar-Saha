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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
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
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0B1307] text-white">
      {/* Background Matrix & Lighting */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <ThreeBackground variant="particles" accentColor={0xdcff85} />
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(220, 255, 133, 0.12), transparent 70%), radial-gradient(ellipse 60% 60% at 90% 80%, rgba(22, 51, 0, 0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mb-16"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFF85]/15 text-[#DCFF85] text-xs font-mono uppercase tracking-widest mb-6 border border-[#DCFF85]/30 backdrop-blur-md">
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
            className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-3xl mb-8 font-medium"
          >
            Operating at the highest level as Head of Product, Fractional CTO,
            and Principal Systems Architect — delivering 0→1 SaaS products, AI
            swarm automation, business ERP/CRM systems, and enterprise legacy
            modernizations.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mb-12">
            <ActionLink
              href="#book-demo"
              variant="lime"
              text="Discuss an Enterprise Project"
              icon={<ArrowUpRight size={16} />}
              className="px-7 py-3.5 text-sm font-semibold"
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

        {/* 4 Interactive Enterprise Architecture Bento Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="bg-[#163300]/40 hover:bg-[#163300]/70 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#DCFF85]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold shadow-md">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#DCFF85] tracking-wider uppercase bg-[#DCFF85]/10 px-2.5 py-1 rounded-full border border-[#DCFF85]/20">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#DCFF85] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono text-white/60">
                  {pillar.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#DCFF85] shrink-0" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
