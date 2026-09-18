import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BrainCircuit,
  ChartNoAxesCombined,
  Boxes,
  Workflow,
  Search,
  Users,
} from "lucide-react";
import { PageIntro, PortfolioShell, RevealBlock } from "@/components/site/PortfolioShell";

export const Route = createFileRoute("/expertise")({
  head: () => ({
    meta: [
      { title: "Expertise — Jit Kumar Saha" },
      {
        name: "description",
        content: "Business strategy, product leadership, and applied AI capabilities.",
      },
    ],
  }),
  component: ExpertisePage,
});

const services = [
  {
    n: "01",
    icon: ChartNoAxesCombined,
    title: "Business strategy",
    lead: "Find the signal. Choose the direction.",
    copy: "I help leadership teams make sense of growth, positioning, operations, and competing opportunities—then turn that clarity into decisions.",
    list: [
      "Business model & positioning",
      "Go-to-market strategy",
      "Growth systems",
      "Operating model design",
    ],
  },
  {
    n: "02",
    icon: Boxes,
    title: "Product leadership",
    lead: "Build the right thing, with the right rhythm.",
    copy: "I connect customer insight, commercial goals, design, and engineering so teams can make stronger bets and deliver with confidence.",
    list: [
      "Product vision & strategy",
      "Discovery & validation",
      "Roadmaps & prioritization",
      "Product team leadership",
    ],
  },
  {
    n: "03",
    icon: BrainCircuit,
    title: "AI transformation",
    lead: "Put intelligence where work happens.",
    copy: "I identify where AI can create practical value, then design the workflows, products, and adoption plan needed to make it useful.",
    list: [
      "AI opportunity mapping",
      "Agents & copilots",
      "Knowledge systems & RAG",
      "Automation strategy",
    ],
  },
];

export function ExpertisePage() {
  return (
    <PortfolioShell page="expertise">
      <PageIntro
        number="03 / EXPERTISE"
        eyebrow="HOW I CAN HELP"
        title="Three disciplines."
        italic="One operating mind."
        copy="I work across the boundaries that usually slow teams down—connecting commercial direction, product execution, and intelligent technology."
      />
      <section className="service-stack wrap">
        {services.map(({ n, icon: Icon, title, lead, copy, list }) => (
          <RevealBlock className="service-card" key={n}>
            <div className="service-number">{n}</div>
            <div className="service-icon">
              <Icon />
            </div>
            <div className="service-copy">
              <h2>{title}</h2>
              <h3>{lead}</h3>
              <p>{copy}</p>
            </div>
            <ul>
              {list.map((item) => (
                <li key={item}>
                  {item}
                  <ArrowUpRight size={14} />
                </li>
              ))}
            </ul>
          </RevealBlock>
        ))}
      </section>
      <section className="engagement-section">
        <div className="wrap">
          <RevealBlock className="section-heading">
            <div>
              <p className="eyebrow">WAYS TO WORK TOGETHER</p>
              <h2>
                Built around the
                <br />
                <em>problem—not a package.</em>
              </h2>
            </div>
            <p>
              Flexible shapes for different
              <br />
              stages and ambitions.
            </p>
          </RevealBlock>
          <div className="engagement-grid">
            {[
              [
                Search,
                "Clarity sprint",
                "A focused engagement to understand the problem, align the team, and define the next smart move.",
              ],
              [
                Workflow,
                "Build partnership",
                "Hands-on strategy and product support through discovery, design, delivery, and learning.",
              ],
              [
                Users,
                "Embedded leadership",
                "Fractional or interim leadership for teams navigating growth, change, or a major product bet.",
              ],
            ].map(([Icon, title, copy], i) => {
              const I = Icon as typeof Search;
              return (
                <RevealBlock key={title as string}>
                  <span>0{i + 1}</span>
                  <I />
                  <h3>{title as string}</h3>
                  <p>{copy as string}</p>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>
      <section className="toolkit wrap">
        <RevealBlock>
          <p className="eyebrow">TOOLKIT / 2026</p>
          <h2>
            Fluent across the
            <br />
            <em>whole conversation.</em>
          </h2>
        </RevealBlock>
        <RevealBlock className="tool-cloud">
          {[
            "Strategy",
            "Product discovery",
            "AI agents",
            "Business models",
            "RAG systems",
            "Roadmapping",
            "GTM",
            "Automation",
            "Customer research",
            "Operations",
            "SaaS",
            "Growth",
            "Team design",
            "Analytics",
            "Prototyping",
            "LLMs",
          ].map((item, i) => (
            <span style={{ "--i": i } as React.CSSProperties} key={item}>
              {item}
            </span>
          ))}
        </RevealBlock>
      </section>
      <section className="next-link wrap">
        <p>Have a challenge that crosses a few lines?</p>
        <Link to="/contact">
          Let’s work through it <ArrowUpRight />
        </Link>
      </section>
    </PortfolioShell>
  );
}
