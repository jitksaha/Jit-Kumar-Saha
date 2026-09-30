import React from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { easeCustom } from "../../utils/motion";

interface SubrouteLayoutProps {
  children: React.ReactNode;
  page: string;
  hideFooterCta?: boolean;
}

export function SubrouteLayout({ children, page, hideFooterCta = false }: SubrouteLayoutProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  return (
    <div className="studio-page" id="top">
      <motion.div className="studio-progress" style={{ scaleX }} />
      <Header active={page} />
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easeCustom }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer hideCtaCard={hideFooterCta} />
    </div>
  );
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: easeCustom }}
    >
      {children}
    </motion.div>
  );
}
