import { type PointerEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Check,
  MoveUpRight,
  Sparkles,
} from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { projects } from "./portfolio-data";
import { roles } from "./ExperienceShowcase";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import "./studio.css";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const imageTiles = [
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=85",
];

export function Portfolio() {
  const scroll = useScroll();
  const progress = useSpring(scroll.scrollYProgress, { stiffness: 100, damping: 30 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const heroX = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const heroY = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const moveHero = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left - box.width / 2) * 0.025);
    pointerY.set((event.clientY - box.top - box.height / 2) * 0.018);
  };
  return (
    <div className="studio-page" id="top">
      <motion.div className="studio-progress" style={{ scaleX: progress }} />
      <section className="studio-hero" onPointerMove={moveHero}>
        <video
          className="studio-hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          src="https://v1.pinimg.com/videos/mc/720p/54/a7/6b/54a76bf0828a6f962a6e0cf1728b0438.mp4"
        />
        <div className="studio-hero-noise" />
        <SiteHeader variant="dark" />
        <div className="studio-hero-content">
          <div className="studio-kicker">
            <span /> TECHNOLOGY × PRODUCT × BUSINESS / DHAKA → GLOBAL
          </div>
          <motion.div className="studio-hero-copy" style={{ x: heroX, y: heroY }}>
            <h1>
              Systems for
              <br />
              <em>growing</em> businesses.
            </h1>
            <p>
              I connect technology, product thinking, and business operations to turn complex ideas
              into useful digital systems.
            </p>
          </motion.div>
          <div className="studio-hero-actions">
            <Link className="studio-button studio-button-light" to="/work">
              Explore work <ArrowUpRight size={16} />
            </Link>
            <Link className="studio-button studio-button-outline" to="/contact">
              Start a conversation <ArrowRight size={16} />
            </Link>
          </div>
          <motion.div
            className="studio-card-stack"
            style={{ x: heroX, y: heroY }}
            aria-label="Digital product systems"
          >
            {["AI systems", "Product", "Operations", "Growth", "Business"].map((label, index) => (
              <div className={`studio-stack-card stack-card-${index + 1}`} key={label}>
                <span>{label}</span>
                <b>
                  {index === 0
                    ? "✦"
                    : index === 1
                      ? "01"
                      : index === 2
                        ? "↗"
                        : index === 3
                          ? "∞"
                          : "J."}
                </b>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="studio-hero-footer">
          <span>01 / INTRODUCTION</span>
          <span>
            SCROLL TO EXPLORE <ArrowDown size={15} />
          </span>
        </div>
      </section>
      <section className="studio-client-strip">
        <span className="strip-lead">BUILT ACROSS TECHNOLOGY AND BUSINESS</span>
        <span>Dynime</span>
        <span>Product systems</span>
        <span>AI operations</span>
        <span>Digital growth</span>
        <span>Business infrastructure</span>
      </section>
      <main>
        <section className="studio-manifesto studio-wrap">
          <Reveal className="studio-section-label">
            <span>02 / THE APPROACH</span>
            <span>About the studio →</span>
          </Reveal>
          <Reveal className="manifesto-grid">
            <h2>
              I build search-first digital systems to help <em>ambitious teams</em> move with
              clarity.
            </h2>
            <p>
              From the first question to the final product, I keep strategy, design, technology, and
              operations connected. The result is work that looks considered and works in the real
              world.
            </p>
          </Reveal>
          <div className="studio-image-rail">
            {imageTiles.map((src, index) => (
              <motion.div
                className="studio-image-tile"
                key={src}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <img src={src} alt="Creative work reference" />
                <span>
                  0{index + 1} / {["Strategy", "Product", "Systems", "Growth"][index]}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="studio-metrics studio-wrap">
          <Reveal className="studio-section-label">
            <span>03 / BY THE NUMBERS</span>
            <span>Proof over promises</span>
          </Reveal>
          <div className="metric-grid">
            {[
              ["10+", "Years across digital work"],
              ["30+", "Products and systems shipped"],
              ["4×", "Disciplines connected"],
              ["100%", "Hands-on and accountable"],
            ].map(([value, label], index) => (
              <Reveal className="metric-card" key={value} delay={index * 0.06}>
                <strong>{value}</strong>
                <span>{label}</span>
                <p>Technology, product, business, and learning in one operating rhythm.</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="studio-capabilities" id="process">
          <div className="studio-wrap">
            <Reveal className="studio-section-label light">
              <span>04 / CAPABILITIES</span>
              <span>What I bring to the room</span>
            </Reveal>
            <Reveal className="capabilities-heading">
              <h2>
                Strategy that ships.
                <br />
                <em>Systems that scale.</em>
              </h2>
              <p>
                Four connected ways of working for teams moving from idea to meaningful outcome.
              </p>
            </Reveal>
            <div className="capability-grid">
              {[
                [
                  <Sparkles />,
                  "Product strategy",
                  "Find the opportunity, define the product, and make the next decision obvious.",
                ],
                [
                  <Bot />,
                  "AI & automation",
                  "Design practical AI systems that reduce friction and create leverage.",
                ],
                [
                  <Boxes />,
                  "Digital systems",
                  "Build the web products, workflows, and infrastructure that keep work moving.",
                ],
                [
                  <MoveUpRight />,
                  "Business growth",
                  "Connect the product to customers, operations, revenue, and learning.",
                ],
              ].map(([icon, title, copy], index) => (
                <Reveal
                  className={`capability-card capability-card-${index + 1}`}
                  key={title as string}
                  delay={index * 0.06}
                >
                  <span className="capability-icon">{icon}</span>
                  <small>0{index + 1}</small>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <ArrowUpRight className="capability-arrow" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="studio-kinetic">
          <div className="kinetic-word">
            JIT <span>×</span> WORKS
          </div>
          <div className="kinetic-caption">Technology / Product / Business / Outcome</div>
        </section>
        <section className="studio-work studio-wrap">
          <Reveal className="studio-section-label">
            <span>05 / SELECTED WORK</span>
            <Link to="/work">
              View all work <ArrowUpRight size={15} />
            </Link>
          </Reveal>
          <Reveal className="work-heading">
            <h2>
              Built for the
              <br />
              <em>next move.</em>
            </h2>
            <p>
              A selection of product, AI, operations, and growth systems shaped through hands-on
              work.
            </p>
          </Reveal>
          <div className="work-bento">
            {projects.map((project, index) => (
              <Reveal
                className={`work-bento-card work-bento-${index + 1}`}
                key={project.slug}
                delay={index * 0.07}
              >
                <Link to="/work/$slug" params={{ slug: project.slug }}>
                  <div className="work-card-visual">
                    <span>{index === 0 ? "AI" : index === 1 ? "0→1" : "↗"}</span>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="work-card-meta">
                    <span>{project.category}</span>
                    <ArrowUpRight size={17} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="studio-features studio-wrap">
          <Reveal className="studio-section-label">
            <span>06 / THE WORKING MODEL</span>
            <span>Small details, compounding value</span>
          </Reveal>
          <div className="feature-heading">
            <h2>
              Clear thinking
              <br />
              <em>made visible.</em>
            </h2>
            <p>
              The details matter: how the system feels, how the team uses it, and what improves
              after launch.
            </p>
          </div>
          <div className="feature-grid">
            {[
              "Understand the real problem",
              "Make complex things usable",
              "Ship in useful increments",
              "Measure what changes",
            ].map((item, index) => (
              <Reveal className="feature-card" key={item} delay={index * 0.05}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="feature-orb">
                  <Check />
                </div>
                <h3>{item}</h3>
                <p>Research, structure, and thoughtful execution keep the work grounded.</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="studio-experience">
          <div className="studio-wrap">
            <Reveal className="studio-section-label">
              <span>07 / EXPERIENCE</span>
              <Link to="/about">
                Full career story <ArrowUpRight size={15} />
              </Link>
            </Reveal>
            <Reveal className="experience-heading">
              <h2>
                Perspective built
                <br />
                <em>chapter by chapter.</em>
              </h2>
              <p>
                Every role added another way to create value—from freelance development to product
                leadership and AI strategy.
              </p>
            </Reveal>
            <div className="experience-list">
              {roles.slice(0, 4).map((role, index) => (
                <Reveal className="experience-line" key={role.company} delay={index * 0.05}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{role.role}</h3>
                    <p>{role.company}</p>
                  </div>
                  <small>{role.period}</small>
                  <ArrowUpRight size={18} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="studio-testimonials studio-wrap">
          <Reveal className="studio-section-label">
            <span>08 / SIGNALS</span>
            <span>What the work should feel like</span>
          </Reveal>
          <div className="testimonial-grid">
            {[
              "“Jit brings strategic clarity and the rare ability to make the complex feel actionable.”",
              "“He connects product decisions to the business outcome without losing the human detail.”",
              "“The work moved our team from scattered ideas to a system we could actually use.”",
            ].map((quote, index) => (
              <Reveal className="testimonial-card" key={quote} delay={index * 0.06}>
                <span>0{index + 1}</span>
                <blockquote>{quote}</blockquote>
                <footer>
                  {["Founder / Dynime", "Product partner", "Growth collaborator"][index]}
                </footer>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="studio-cta">
          <div className="studio-wrap">
            <Reveal>
              <span className="studio-section-label light">09 / NEXT STEP</span>
              <h2>
                Let’s make the
                <br />
                <em>next move useful.</em>
              </h2>
              <p>
                Open to product leadership, technology strategy, AI systems, and ambitious
                collaborations.
              </p>
              <Link className="studio-button studio-button-light" to="/contact">
                Start a conversation <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter variant="dark" />
    </div>
  );
}
