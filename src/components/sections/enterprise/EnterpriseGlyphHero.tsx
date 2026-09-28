import React from "react";
import { Link } from "@tanstack/react-router";
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
import GlyphPortal from "../../../components/ui/glyph-portal";
import { ThreeBackground } from "../../../components/ui/ThreeBackground";
import { ActionLink } from "../../../components/ui/Button";

export function EnterpriseGlyphHero() {
  return (
    <div className="relative w-full bg-[#FAFAF8] overflow-hidden">
      <style>{`
        .enterprise-portal-hero [data-gp-caption] {
          inset: calc(var(--gp-word-bottom, 50%) + 64px) 24px auto;
          justify-content: center;
          gap: 1.5rem;
        }
        .enterprise-portal-hero [data-gp-hint] {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #163300;
          opacity: 0.75;
          font-weight: 600;
        }
        .enterprise-portal-hero [data-gp-enter] {
          min-height: 44px;
          padding: 0 20px;
          gap: 12px;
          background: #163300;
          border: 1px solid #163300;
          border-radius: 9999px;
          color: #DCFF85;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(22, 51, 0, 0.2);
          transition: all 0.2s ease;
        }
        .enterprise-portal-hero [data-gp-enter]:hover {
          background: #204800;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(22, 51, 0, 0.28);
        }
        .enterprise-portal-hero [data-gp-touch-picker] {
          top: auto;
          bottom: 24px;
          left: 50%;
        }
        .enterprise-portal-hero [data-gp-select] {
          border-color: rgba(22, 51, 0, 0.2);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #163300;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .enterprise-portal-hero [data-gp-content] {
          padding: 6rem clamp(1.25rem, 5cqw, 4rem) 6rem;
        }
        @media (max-width: 640px) {
          .enterprise-portal-hero [data-gp-caption] {
            top: calc(var(--gp-word-bottom, 50%) + 48px);
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>

      <div className="enterprise-portal-hero">
        <GlyphPortal
          word="ENTERPRISE"
          fontFamily='"Inter", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Arial Black", sans-serif'
          fontWeight={900}
          scrollLength={2.2}
          interactive={true}
          annotations={false}
          enterLabel="Step Inside Architecture"
          style={{
            "--gp-paper": "#FAFAF8",
            "--gp-ink": "#163300",
            "--gp-field": "#0B1307",
            "--gp-foreground": "#FAFAF8",
          }}
          background={
            <div className="absolute inset-0 bg-[#0B1307] overflow-hidden">
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <ThreeBackground variant="particles" accentColor={0xdcff85} />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(220, 255, 133, 0.12), transparent 70%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(32, 72, 0, 0.4), transparent)",
                }}
              />
            </div>
          }
          front={
            <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 pt-28 sm:pt-32 md:pt-36 pointer-events-none">
              {/* Top Bar / Category */}
              <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163300]/10 text-[#163300] text-xs font-mono uppercase tracking-widest border border-[#163300]/15 backdrop-blur-md font-semibold">
                  <Shield size={13} className="text-[#163300]" />
                  ENTERPRISE CAPABILITY PROFILE
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#163300]/10 text-[11px] font-mono font-medium text-[#163300]/70">
                  <span className="w-2 h-2 rounded-full bg-[#163300] animate-pulse" />
                  FRACTIONAL CTO · PRODUCT LEADERSHIP
                </div>
              </div>

              {/* Center Eyebrow & Headline context */}
              <div className="text-center max-w-4xl mx-auto my-auto pt-6 pb-20 pointer-events-auto">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#163300]/70 font-bold mb-3">
                  Digital Systems · High-Scale SaaS · Autonomous AI
                </p>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-[#163300] leading-[1.12] mb-4">
                  Enterprise Solutions &{" "}
                  <span className="font-serif italic font-normal text-[#163300]/80">
                    Systems Transformation
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-[#163300]/80 leading-relaxed max-w-2xl mx-auto font-medium">
                  Select any letter or scroll down to explore our architectural
                  foundations, AI swarm integrations, and core engineering capabilities.
                </p>
              </div>

              {/* Bottom Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#163300]/10 text-xs font-mono uppercase tracking-wider text-[#163300]/70 pointer-events-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[#163300] font-bold">TRUSTED SCOPE:</span>
                  <span>STRATEGY</span>
                  <span>·</span>
                  <span>ARCHITECTURE</span>
                  <span>·</span>
                  <span>AI SWARMS</span>
                </div>
                <div className="text-[11px] font-mono text-[#163300]/60 hidden md:block">
                  SCROLL TO ENTER PORTAL ↓
                </div>
              </div>
            </div>
          }
        >
          {/* Inside Realm Content (Revealed inside the zoom) */}
          <div className="max-w-6xl mx-auto w-full text-white">
            {/* Inside Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFF85]/15 text-[#DCFF85] text-xs font-mono uppercase tracking-widest mb-4 border border-[#DCFF85]/30">
                <Sparkles size={13} className="text-[#DCFF85]" />
                ENTERPRISE ARCHITECTURE COCKPIT
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4 leading-tight">
                Architecting Scalable Foundations for{" "}
                <span className="font-serif italic font-normal text-[#DCFF85]">
                  Mission-Critical Growth.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed font-medium">
                Bridging commercial vision with industrial-grade technical execution.
                Explore the four pillars powering high-velocity enterprises:
              </p>
            </div>

            {/* 4 Core Enterprise Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Pillar 1 */}
              <div className="bg-[#163300]/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#DCFF85]/20 hover:border-[#DCFF85]/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold">
                    <Layers size={22} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#DCFF85] tracking-wider uppercase bg-[#DCFF85]/10 px-3 py-1 rounded-full border border-[#DCFF85]/20">
                    PILLAR 01
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#DCFF85] transition-colors">
                  Digital Product & SaaS Core
                </h3>
                <p className="text-sm text-white/75 leading-relaxed mb-4">
                  Multi-tenant cloud architectures, microservices decoupling, and
                  high-concurrency client portals engineered for million-user workloads.
                </p>
                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> Multi-Tenant SaaS & Role-Based Auth
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> Sub-100ms API SLA & Edge Compute
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#163300]/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#DCFF85]/20 hover:border-[#DCFF85]/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold">
                    <Bot size={22} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#DCFF85] tracking-wider uppercase bg-[#DCFF85]/10 px-3 py-1 rounded-full border border-[#DCFF85]/20">
                    PILLAR 02
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#DCFF85] transition-colors">
                  Autonomous AI & Agent Swarms
                </h3>
                <p className="text-sm text-white/75 leading-relaxed mb-4">
                  Private, zero-data-retention AI workflows, vector search pipelines,
                  and autonomous decision agents connected directly to your enterprise database.
                </p>
                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> Custom Enterprise RAG & Vector Indexing
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> Private VPC Deployment & Data Isolation
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#163300]/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#DCFF85]/20 hover:border-[#DCFF85]/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold">
                    <Server size={22} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#DCFF85] tracking-wider uppercase bg-[#DCFF85]/10 px-3 py-1 rounded-full border border-[#DCFF85]/20">
                    PILLAR 03
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#DCFF85] transition-colors">
                  Business Systems & ERP Unification
                </h3>
                <p className="text-sm text-white/75 leading-relaxed mb-4">
                  Consolidating fractured internal tools, CRM/ERP pipelines, HRM
                  workflows, and financial automation into a unified single pane of glass.
                </p>
                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> Single Sign-On & Unified RBAC Data Sync
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> Real-time Financial & Operations Telemetry
                  </div>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#163300]/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#DCFF85]/20 hover:border-[#DCFF85]/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFF85] text-[#163300] flex items-center justify-center font-bold">
                    <RefreshCw size={22} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#DCFF85] tracking-wider uppercase bg-[#DCFF85]/10 px-3 py-1 rounded-full border border-[#DCFF85]/20">
                    PILLAR 04
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#DCFF85] transition-colors">
                  Legacy Modernization & Zero-Trust
                </h3>
                <p className="text-sm text-white/75 leading-relaxed mb-4">
                  Strangler Fig migrations, monolith decoupling, and automated zero-downtime
                  database transitions backed by enterprise SOC 2 & ISO compliance standards.
                </p>
                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> Zero-Downtime Live Data Migrations
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#DCFF85]" /> SOC 2 / ISO 27001 Security Best Practices
                  </div>
                </div>
              </div>
            </div>

            {/* Live Metrics Row & CTA Footer */}
            <div className="rounded-2xl bg-[#163300]/80 border border-[#DCFF85]/20 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#DCFF85]">99.99%</div>
                  <div className="text-[11px] font-mono text-white/70 uppercase">Uptime Reliability</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#DCFF85]">0 → 1</div>
                  <div className="text-[11px] font-mono text-white/70 uppercase">Architecture Speed</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#DCFF85]">10x</div>
                  <div className="text-[11px] font-mono text-white/70 uppercase">AI Swarm Output</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#DCFF85]">Zero-Trust</div>
                  <div className="text-[11px] font-mono text-white/70 uppercase">Security Posture</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <ActionLink
                  href="#book-demo"
                  variant="lime"
                  text="Discuss an Enterprise Project"
                  icon={<ArrowUpRight size={16} />}
                  className="px-6 py-3 text-sm font-semibold w-full sm:w-auto text-center"
                />
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white/80 hover:text-[#DCFF85] transition-colors py-3 px-4 rounded-xl border border-white/20 hover:border-[#DCFF85]/40 w-full sm:w-auto"
                >
                  Explore Capabilities ↓
                </a>
              </div>
            </div>
          </div>
        </GlyphPortal>
      </div>
    </div>
  );
}
