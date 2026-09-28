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
} from "lucide-react";
import GlyphPortal from "../../../components/ui/glyph-portal";
import { ActionLink } from "../../../components/ui/Button";

export function EnterpriseGlyphHero() {
  return (
    <div className="w-full bg-[#FAFAF8] border-b border-[#163300]/10">
      <div
        data-enterprise-portal
        tabIndex={0}
        role="region"
        aria-label="Enterprise Solutions. Scroll to step inside."
        className="w-full relative overflow-y-auto"
        style={{
          height: "min(780px, 92svh)",
          background: "#FAFAF8",
          containerType: "inline-size",
          fontFamily:
            '"Inter", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <style>{`
          [data-enterprise-portal] [data-gp-caption] {
            inset: calc(var(--gp-word-bottom, 50%) + 86px) 24px auto !important;
            justify-content: center !important;
          }
          [data-enterprise-portal] [data-gp-hint] {
            display: none !important;
          }
          [data-enterprise-portal] [data-gp-enter] {
            min-height: 44px;
            padding: 0 24px;
            gap: 12px;
            background: #163300;
            border: 1px solid #163300;
            border-radius: 9999px;
            color: #DCFF85;
            font-size: 13px;
            font-weight: 600;
            box-shadow: 0 4px 14px rgba(22, 51, 0, 0.18);
            transition: all 0.2s ease;
          }
          [data-enterprise-portal] [data-gp-enter]:hover {
            background: #204800;
            color: #ffffff;
            box-shadow: 0 6px 20px rgba(22, 51, 0, 0.25);
            transform: translateY(-1px);
          }
          [data-enterprise-portal] [data-gp-enter]:focus-visible {
            outline: 2px solid #163300;
            outline-offset: 4px;
          }
          [data-enterprise-portal] [data-gp-touch-picker] {
            top: auto !important;
            bottom: 18px !important;
            left: 50% !important;
          }
          [data-enterprise-portal] [data-gp-select] {
            border-color: rgba(22, 51, 0, 0.2) !important;
            border-radius: 8px !important;
            font-size: 12px !important;
            color: #163300 !important;
            background: #ffffff !important;
          }

          /* Exact positional elements above and below the live word */
          [data-ep-header] {
            position: absolute;
            inset: clamp(84px, 11svh, 108px) clamp(24px, 5cqw, 64px) auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }
          [data-ep-logo] {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: #163300;
            text-transform: uppercase;
            font-family: ui-monospace, monospace;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          [data-ep-category] {
            font-size: 12px;
            line-height: 1.5;
            color: #163300;
            opacity: 0.75;
            font-weight: 500;
          }
          [data-ep-eyebrow] {
            position: absolute;
            inset: auto 24px calc(100% - var(--gp-word-top, 35%) + 28px);
            margin: 0;
            text-align: center;
            font-size: clamp(12px, 1.6cqw, 14px);
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #163300;
            opacity: 0.8;
          }
          [data-ep-support] {
            position: absolute;
            inset: calc(var(--gp-word-bottom, 50%) + 28px) 24px auto;
            margin: 0;
            text-align: center;
            font-size: clamp(14px, 1.8cqw, 16px);
            font-weight: 500;
            line-height: 1.5;
            color: #163300;
            opacity: 0.85;
            max-width: 44ch;
            left: 50%;
            transform: translateX(-50%);
          }
          [data-ep-scroll] {
            position: absolute;
            inset: auto 24px 6%;
            text-align: center;
            color: #163300;
            opacity: 0.65;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-family: ui-monospace, monospace;
          }
          @media (any-pointer: coarse) {
            [data-ep-scroll] {
              bottom: 12%;
            }
          }
          @container (max-width: 450px) {
            [data-ep-category] {
              max-width: 14ch;
              text-align: right;
            }
            [data-ep-eyebrow] {
              font-size: 11px;
            }
            [data-ep-support] {
              font-size: 13px;
            }
            [data-enterprise-portal] [data-gp-caption] {
              top: calc(var(--gp-word-bottom, 50%) + 76px) !important;
            }
          }

          /* Inside content */
          [data-enterprise-portal] [data-gp-content] {
            padding: 5rem clamp(1.25rem, 5cqw, 4.5rem) 6rem;
            font-family: inherit;
          }
          [data-ep-copy] {
            display: flex;
            width: min(100%, 76rem);
            margin: auto;
            flex-direction: column;
            align-items: flex-start;
            gap: clamp(2rem, 4svh, 3rem);
          }
          [data-ep-copy] h2 {
            max-width: 46rem;
            margin: 0;
            color: #ffffff;
            font-size: clamp(1.75rem, 1.2rem + 1.8cqw, 2.35rem);
            font-weight: 700;
            line-height: 1.25;
            letter-spacing: -0.02em;
          }
          [data-ep-features] {
            display: grid;
            width: 100%;
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          @container (min-width: 768px) {
            [data-ep-features] {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 2.5rem;
            }
          }
          [data-ep-feature] {
            border-top: 1px solid rgba(220, 255, 133, 0.25);
            padding-top: 1.25rem;
          }
          [data-ep-feature] h3 {
            margin: 0;
            color: #ffffff;
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.3;
          }
          [data-ep-feature] p {
            margin: 0.65rem 0 0;
            color: rgba(255, 255, 255, 0.85);
            font-size: 0.9375rem;
            line-height: 1.55;
          }
          [data-ep-no] {
            display: inline-block;
            margin-right: 0.75rem;
            color: #DCFF85;
            font: 700 0.8rem ui-monospace, monospace;
            letter-spacing: 0.08em;
          }
        `}</style>

        <GlyphPortal
          word="ENTERPRISE"
          fontFamily='"Inter", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Arial Black", sans-serif'
          fontWeight={900}
          scrollLength={2.2}
          interactive={true}
          annotations={false}
          enterLabel="Step Inside"
          style={{
            "--gp-paper": "#FAFAF8",
            "--gp-ink": "#163300",
            "--gp-field": "#0B1307",
            "--gp-foreground": "#FAFAF8",
          }}
          background={
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: "scale(var(--gp-field-scale, 1))",
                background:
                  "radial-gradient(circle at 20% 15%, rgba(42, 90, 0, 0.75), transparent 45%), radial-gradient(circle at 80% 75%, rgba(22, 51, 0, 0.9), transparent 50%), linear-gradient(135deg, #0B1307 0%, #163300 60%, #060B04 100%)",
              }}
            />
          }
          front={
            <>
              <div data-ep-header>
                <span data-ep-logo>
                  <Shield size={16} className="text-[#163300]" />
                  Enterprise Solutions
                </span>
                <span data-ep-category>Digital Systems & Architecture</span>
              </div>

              <p data-ep-eyebrow>Executive Product Leadership & Systems Strategy</p>

              <p data-ep-support>
                Pick any letter or scroll to explore our architectural foundations,
                AI swarms, and enterprise modernization frameworks.
              </p>

              <span data-ep-scroll>Scroll inside to explore ↓</span>
            </>
          }
        >
          <div data-ep-copy>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCFF85]/15 text-[#DCFF85] text-xs font-mono uppercase tracking-wider mb-3 border border-[#DCFF85]/30 font-semibold">
                <Sparkles size={12} /> MISSION-CRITICAL FOUNDATIONS
              </div>
              <h2>Architecting Scalable Foundations for Enterprise Growth.</h2>
            </div>

            <div data-ep-features>
              <div data-ep-feature>
                <h3>
                  <span data-ep-no>01</span>Digital Product & SaaS Core
                </h3>
                <p>
                  Multi-tenant cloud architectures, microservices decoupling, and
                  sub-100ms API contracts engineered for high-concurrency workloads.
                </p>
              </div>

              <div data-ep-feature>
                <h3>
                  <span data-ep-no>02</span>Autonomous AI & Swarms
                </h3>
                <p>
                  Zero-data-retention AI workflows, vector search pipelines, and
                  autonomous agent decision engines integrated into your private VPC.
                </p>
              </div>

              <div data-ep-feature>
                <h3>
                  <span data-ep-no>03</span>Business Systems & ERP
                </h3>
                <p>
                  Consolidating CRM, ERP, and operational pipelines into a unified
                  single pane of glass with zero-downtime data migrations.
                </p>
              </div>
            </div>

            <div className="w-full pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs font-mono text-white/70 uppercase tracking-wider">
                <span className="text-[#DCFF85] font-bold">99.99% UPTIME</span>
                <span>·</span>
                <span>ZERO-TRUST SECURITY</span>
                <span>·</span>
                <span>SOC 2 COMPLIANT</span>
              </div>

              <div className="flex items-center gap-3">
                <ActionLink
                  href="#book-demo"
                  variant="lime"
                  text="Discuss Enterprise Project"
                  icon={<ArrowUpRight size={15} />}
                  className="px-5 py-2.5 text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        </GlyphPortal>
      </div>
    </div>
  );
}
