import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PortfolioShell, PageIntro, RevealBlock } from "@/components/site/PortfolioShell";
export const Route = createFileRoute("/insights")({ component: InsightsPage });
const notes = [
  ["Product thinking", "The best product decisions make the next decision easier."],
  ["AI systems", "An agent should feel like a capable teammate, not another dashboard."],
  ["Founders", "Clarity compounds when the whole team can see the same problem."],
  ["Design practice", "Constraints are where a point of view starts to become useful."],
  ["Building in public", "Small shipped experiments beat a perfect strategy document."],
];
function InsightsPage() {
  return (
    <PortfolioShell page="insights">
      <PageIntro
        number="05"
        eyebrow="Insights"
        title="Notes from"
        italic="inside the work."
        copy="Short observations on products, teams and the systems that help good ideas travel further."
      />
      <section className="wrap page-section insights-grid">
        {notes.map(([tag, title], i) => (
          <RevealBlock className="insight-card" key={title}>
            <div>
              <span>
                0{i + 1} / {tag}
              </span>
              <h2>{title}</h2>
            </div>
            <ArrowUpRight size={19} />
            <small>Read note · 4 min</small>
          </RevealBlock>
        ))}
      </section>
      <section className="studio-cta">
        <div className="wrap">
          <p className="section-label">Want the longer version?</p>
          <h2>Let’s talk through the problem you’re carrying.</h2>
          <Link to="/contact">
            Get in touch <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </PortfolioShell>
  );
}
