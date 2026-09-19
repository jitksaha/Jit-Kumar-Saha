import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Boxes, LockKeyhole, Sparkles, Workflow } from "lucide-react";
import { PortfolioShell, RevealBlock } from "@/components/site/PortfolioShell";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export const Route = createFileRoute("/venture")({ component: VenturePage });

const agents = [
  ["Teaching assistant", "Personalized learning flows"],
  ["Research copilot", "Answers grounded in your data"],
  ["Operations agent", "Automates repetitive work"],
  ["Growth analyst", "Finds the next best action"],
];

function VenturePage() {
  return (
    <PortfolioShell page="venture">
      <div className="venture-page">
        <section className="venture-hero">
          <span className="venture-eyebrow">
            <Sparkles size={12} /> Venture studio / 01
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Build the next generation of <em>intelligent systems.</em>
          </motion.h1>
          <p>
            Jit Kumar Saha partners with ambitious founders to turn complex ideas into simple,
            useful products people want to use.
          </p>
          <div className="venture-actions">
            <Link className="primary" to="/contact">
              Start a conversation <ArrowUpRight size={14} />
            </Link>
            <Link className="secondary" to="/work">
              See selected work
            </Link>
          </div>
          <div className="venture-agent-diagram">
            <div className="venture-core">
              <Bot size={23} /> AI workbench
            </div>
            {agents.map(([title, text]) => (
              <div className="venture-agent" key={title}>
                <b>{title}</b>
                <small>{text}</small>
              </div>
            ))}
          </div>
        </section>
        <RevealBlock className="venture-section">
          <div className="venture-section-head">
            <span>The opportunity</span>
            <h2>
              AI workbench. <em>Infinite possibilities</em> for real businesses.
            </h2>
          </div>
          <div className="venture-bento">
            <article className="venture-card">
              <div className="venture-icon">
                <Boxes size={22} />
              </div>
              <h3>Connect the knowledge already inside your team.</h3>
              <p>
                Map the tools, documents and decisions that make your business unique, then give
                everyone a clearer way to use them.
              </p>
            </article>
            <article className="venture-card">
              <div className="venture-icon">
                <Bot size={22} />
              </div>
              <h3>Agents with a point of view.</h3>
              <p>
                Focused copilots that understand context, take action and keep people in control.
              </p>
            </article>
            <article className="venture-card">
              <div className="venture-icon">
                <Workflow size={22} />
              </div>
              <h3>Workflows that move at human speed.</h3>
              <p>
                Design the moments where automation removes friction and leaves better work in its
                place.
              </p>
            </article>
            <article className="venture-card">
              <div className="venture-icon">
                <Sparkles size={22} />
              </div>
              <h3>Make complexity feel effortless.</h3>
              <p>
                From first prototype to a product your customers trust, we make the hard parts
                legible.
              </p>
            </article>
          </div>
        </RevealBlock>
        <RevealBlock className="venture-section">
          <div className="venture-section-head">
            <span>How it works</span>
            <h2>
              Automate complex operations <em>effortlessly.</em>
            </h2>
          </div>
          <div className="venture-process">
            <article>
              <b>01</b>
              <h3>Discover the signal</h3>
              <p>
                Understand the people, constraints and high-value opportunities before choosing a
                tool.
              </p>
            </article>
            <article>
              <b>02</b>
              <h3>Design the system</h3>
              <p>Shape an experience that makes intelligence visible, useful and easy to trust.</p>
            </article>
            <article>
              <b>03</b>
              <h3>Deliver and learn</h3>
              <p>Launch small, measure what matters and keep improving alongside the team.</p>
            </article>
          </div>
        </RevealBlock>
        <RevealBlock className="venture-section">
          <div className="venture-section-head">
            <span>Integrations</span>
            <h2>
              Connect the tools your team <em>already uses.</em>
            </h2>
          </div>
          <div className="venture-integrations">
            <span>Google Workspace</span>
            <span>Slack</span>
            <span>Notion</span>
            <span>HubSpot</span>
            <span>Linear</span>
            <span>Stripe</span>
            <span>OpenAI</span>
          </div>
        </RevealBlock>
        <RevealBlock className="venture-section">
          <div className="venture-security">
            <div>
              <span className="venture-eyebrow">
                <LockKeyhole size={12} /> Commitment
              </span>
              <h2>Privacy is a product feature.</h2>
              <p>
                Every system is designed with thoughtful permissions, clear ownership and a calm
                path from prototype to production.
              </p>
            </div>
            <div className="venture-security-list">
              <div>Human-in-the-loop controls</div>
              <div>Private by default</div>
              <div>Transparent decisions</div>
              <div>Built to scale safely</div>
            </div>
          </div>
        </RevealBlock>
        <section className="venture-section venture-cta">
          <h2>Have a complicated problem worth solving?</h2>
          <Link to="/contact">
            Let’s make it useful <ArrowUpRight size={15} />
          </Link>
        </section>
      </div>
    </PortfolioShell>
  );
}
