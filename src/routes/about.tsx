import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, PortfolioShell, RevealBlock } from "@/components/site/PortfolioShell";
import { principles } from "@/components/site/portfolio-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Jit Kumar Saha" },
      {
        name: "description",
        content:
          "The story, values, and experience behind Jit Kumar Saha’s work across business, product, and AI.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PortfolioShell page="about">
      <PageIntro
        number="01 / ABOUT"
        eyebrow="THE PERSON BEHIND THE WORK"
        title="Builder by nature."
        italic="Strategist by evolution."
        copy="I have spent my career moving closer to the questions that shape businesses: what should we build, why will it matter, and how do we make it work in the real world?"
      />
      <section className="story-grid wrap">
        <RevealBlock className="story-lead">
          <span className="eyebrow">THE LONGER STORY</span>
          <h2>
            I didn’t follow a straight line.
            <br />
            <em>I followed the work.</em>
          </h2>
        </RevealBlock>
        <RevealBlock className="story-copy">
          <p>
            I started as a freelance developer, learning how to turn an idea into something people
            could click, use, and pay for. That hands-on beginning still shapes how I think:
            strategy should eventually become something real.
          </p>
          <p>
            As my work grew, so did the questions. I moved from websites to products, from delivery
            to leadership, and from individual projects to the systems behind entire businesses.
          </p>
          <p>
            Today, I work across business strategy, product leadership, and applied AI. The
            disciplines are different, but the purpose is consistent: create clarity, connect the
            right people and ideas, and build progress that lasts.
          </p>
        </RevealBlock>
        <RevealBlock className="story-note">
          <b>“</b>
          <p>
            I’m most useful in the space between an ambitious idea and the operating reality
            required to make it happen.
          </p>
        </RevealBlock>
      </section>
      <section className="values-section">
        <div className="wrap">
          <RevealBlock className="section-heading">
            <div>
              <p className="eyebrow">WHAT GUIDES THE WORK</p>
              <h2>
                Four principles.
                <br />
                <em>No theatre.</em>
              </h2>
            </div>
            <p>
              A practical philosophy for
              <br />
              ambitious, imperfect work.
            </p>
          </RevealBlock>
          <div className="principle-grid">
            {principles.map(([n, t, d]) => (
              <RevealBlock className="principle-card" key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <i>↗</i>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>
      <section className="journey-map wrap">
        <RevealBlock>
          <p className="eyebrow">THE JOURNEY</p>
          <h2>
            Each chapter added
            <br />
            <em>a wider lens.</em>
          </h2>
        </RevealBlock>
        <div className="journey-rail">
          {[
            ["2019", "Freelance developer", "Learned to sell, scope, build, and deliver."],
            ["2020", "Commerce builder", "Connected digital craft to business outcomes."],
            ["2022", "Project leader", "Made complex delivery feel clear and accountable."],
            ["2023", "Business operator", "Worked across teams, revenue, clients, and systems."],
            ["2024", "Head of Product", "Led discovery, strategy, roadmaps, and execution."],
            ["2026", "AI strategist", "Bringing intelligence into products and operations."],
          ].map(([year, title, text], i) => (
            <RevealBlock className="journey-stop" key={year}>
              <span>{year}</span>
              <b>0{i + 1}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </RevealBlock>
          ))}
        </div>
      </section>
      <section className="next-link wrap">
        <p>Enough about where I came from.</p>
        <Link to="/work">
          See what I build <ArrowUpRight />
        </Link>
      </section>
    </PortfolioShell>
  );
}
