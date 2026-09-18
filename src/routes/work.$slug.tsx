import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PortfolioShell, RevealBlock } from "@/components/site/PortfolioShell";
import { projects } from "@/components/site/portfolio-data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Case Study"} — Jit Kumar Saha` }],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const project = Route.useLoaderData();
  const current = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(current + 1) % projects.length];
  return (
    <PortfolioShell page="work">
      <article className={`case-study case-${project.accent}`}>
        <header className="case-hero wrap">
          <Link to="/work" className="case-back">
            <ArrowLeft size={16} /> All work
          </Link>
          <div className="case-meta">
            <span>{project.index} / CASE STUDY</span>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1>{project.headline}</h1>
          <p>{project.summary}</p>
          <div className="case-art" aria-hidden="true">
            <span>{project.index}</span>
            <b>{current === 0 ? "AI" : current === 1 ? "0→1" : "↗"}</b>
            <i />
            <i />
            <i />
            <i />
          </div>
        </header>
        <section className="case-content wrap">
          <RevealBlock className="case-section">
            <span>01 / THE CHALLENGE</span>
            <h2>
              Finding the real
              <br />
              <em>constraint.</em>
            </h2>
            <p>{project.challenge}</p>
          </RevealBlock>
          <RevealBlock className="case-section">
            <span>02 / THE APPROACH</span>
            <h2>
              Clarity, then
              <br />
              <em>movement.</em>
            </h2>
            <p>{project.approach}</p>
          </RevealBlock>
          <RevealBlock className="case-section">
            <span>03 / THE OUTCOME</span>
            <h2>
              Progress people
              <br />
              <em>can feel.</em>
            </h2>
            <p>{project.outcome}</p>
          </RevealBlock>
        </section>
        <section className="case-metrics wrap">
          {project.metrics.map(([value, label]) => (
            <RevealBlock key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </RevealBlock>
          ))}
        </section>
        <section className="next-case wrap">
          <span>NEXT CASE STUDY</span>
          <Link to="/work/$slug" params={{ slug: next.slug }}>
            {next.title}
            <ArrowUpRight />
          </Link>
        </section>
      </article>
    </PortfolioShell>
  );
}
