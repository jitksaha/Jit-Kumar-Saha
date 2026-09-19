import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PortfolioShell, PageIntro, RevealBlock } from "@/components/site/PortfolioShell";
import { roles } from "@/components/site/ExperienceShowcase";
export const Route = createFileRoute("/experience")({ component: ExperiencePage });
function ExperiencePage() {
  return (
    <PortfolioShell page="experience">
      <PageIntro
        number="04"
        eyebrow="Experience"
        title="A career built"
        italic="around useful change."
        copy="Six-plus years moving between product strategy, design systems and the details that make an idea work in the real world."
      />
      <section className="wrap page-section">
        <div className="section-label">Selected chapters</div>
        <div className="experience-list">
          {roles.map((role, i) => (
            <RevealBlock className="experience-line" key={role.company}>
              <span className="experience-index">0{i + 1}</span>
              <div>
                <strong>{role.role}</strong>
                <b>{role.company}</b>
                <p>{role.summary}</p>
              </div>
              <small>{role.period}</small>
              <ArrowUpRight size={16} />
            </RevealBlock>
          ))}
        </div>
      </section>
    </PortfolioShell>
  );
}
