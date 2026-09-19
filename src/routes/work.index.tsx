import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PortfolioShell, RevealBlock } from "@/components/site/PortfolioShell";
import { projects } from "@/components/site/portfolio-data";
import "@/components/site/studio.css";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Selected Work — Jit Kumar Saha" },
      {
        name: "description",
        content: "Selected strategy, product, and AI case studies by Jit Kumar Saha.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <PortfolioShell page="work">
      <section className="work-hero-studio">
        <div className="work-hero-frame">
          <div className="work-hero-kicker">
            <span>02 / WORK</span>
            <span>SELECTED CASE STUDIES</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
          <div className="work-hero-copy">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              Build better
              <br />
              <em>next moves.</em>
            </motion.h1>
            <p>
              A selection of product, AI, operations, and growth systems shaped through hands-on
              work.
            </p>
          </div>
          <div className="work-card-fan" aria-label="Selected work collection">
            {[
              ["AI operations", "#b4e86d", "AI"],
              ["Product growth", "#ec7d64", "0→1"],
              ["Business systems", "#638ce5", "↗"],
              ["Digital products", "#ebc0df", "J."],
              ["Automation", "#f1d763", "✦"],
            ].map(([label, color, mark], index) => (
              <motion.div
                className={`work-fan-card work-fan-${index + 1}`}
                style={{ background: color }}
                key={label}
                initial={{ opacity: 0, y: 80, rotate: (index - 2) * 5 }}
                animate={{ opacity: 1, y: 0, rotate: (index - 2) * 5 }}
                transition={{ delay: index * 0.08, duration: 0.7 }}
              >
                <span>{label}</span>
                <b>{mark}</b>
              </motion.div>
            ))}
          </div>
          <div className="work-hero-bottom">
            <span>Strategy</span>
            <span>Product</span>
            <span>Systems</span>
            <span>Outcome</span>
          </div>
        </div>
      </section>
      <section className="work-index wrap">
        {projects.map((project, i) => (
          <RevealBlock key={project.slug} className={`project-row project-${project.accent}`}>
            <Link to="/work/$slug" params={{ slug: project.slug }}>
              <div className="project-meta">
                <span>{project.index}</span>
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <div className="project-body">
                <div>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                </div>
                <div className="project-visual">
                  <span>{i === 0 ? "AI" : i === 1 ? "0→1" : "↗"}</span>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="project-open">
                View case study <ArrowUpRight size={18} />
              </div>
            </Link>
          </RevealBlock>
        ))}
      </section>
      <section className="work-belief wrap">
        <RevealBlock>
          <p className="eyebrow">A NOTE ON THE WORK</p>
          <h2>
            The best outcomes rarely belong
            <br />
            to one discipline.{" "}
            <em>
              They happen
              <br />
              between them.
            </em>
          </h2>
        </RevealBlock>
        <RevealBlock>
          <p>
            That’s why these stories combine commercial thinking, product judgment, technical
            fluency, team design, and practical execution.
          </p>
          <Link to="/expertise">
            Explore my capabilities <ArrowUpRight size={18} />
          </Link>
        </RevealBlock>
      </section>
    </PortfolioShell>
  );
}
