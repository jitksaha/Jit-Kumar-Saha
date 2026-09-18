import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import "./studio.css";

export function PortfolioShell({ children, page }: { children: ReactNode; page?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="portfolio portfolio-page">
      <motion.div className="reading-progress" style={{ scaleX }} />
      <SiteHeader variant="light" active={page} />
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <SiteFooter variant="light" />
    </div>
  );
}

export function PageIntro({
  number,
  eyebrow,
  title,
  italic,
  copy,
}: {
  number: string;
  eyebrow: string;
  title: string;
  italic: string;
  copy: string;
}) {
  return (
    <section className="page-intro wrap">
      <div className="page-kicker">
        <span>{number}</span>
        <span>{eyebrow}</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
      <div className="page-intro-grid">
        <motion.h1
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
          <br />
          <em>{italic}</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          {copy}
        </motion.p>
      </div>
      <div className="intro-grid-art" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <b>+</b>
        <b>✳</b>
      </div>
    </section>
  );
}

export function RevealBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
