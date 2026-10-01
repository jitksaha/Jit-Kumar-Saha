import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqCategories } from "../../../data/faq";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
  meta?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  index,
  meta,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  const renderTitle = (t: string, acc?: string) => {
    if (!acc) return t;
    const idx = t.indexOf(acc);
    if (idx === -1) return t;
    return (
      <>
        {t.slice(0, idx)}
        <span className="rounded-sm bg-[#d0d1ff] px-1.5 box-decoration-clone text-foreground">
          {acc}
        </span>
        {t.slice(idx + acc.length)}
      </>
    );
  };

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`flex items-center gap-2 ${isCenter ? "justify-center" : ""}`}
      >
        {index && (
          <span className="text-[10px] font-bold tracking-tight text-brand font-mono">
            {index}
          </span>
        )}
        <span className="h-px w-6 bg-brand/40" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand font-mono">
          {eyebrow}
        </span>
        {meta && (
          <>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
              {meta}
            </span>
          </>
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-5 text-3xl font-black leading-[1.35] tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[44px]"
      >
        {renderTitle(title, accent)}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export function FAQSection() {
  const [activeCategoryKey, setActiveCategoryKey] = useState(
    faqCategories[0].key
  );
  const [openItemKey, setOpenItemKey] = useState<string | null>(
    `${faqCategories[0].key}-0`
  );

  const activeCategory =
    faqCategories.find((cat) => cat.key === activeCategoryKey) ||
    faqCategories[0];

  return (
    <section id="faq" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions founders actually ask."
          accent="founders actually ask."
          description="A short read on how I think about leadership, AI and the work itself."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Tab List */}
          <div
            role="tablist"
            aria-orientation="vertical"
            className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {faqCategories.map((cat) => {
              const isSelected = cat.key === activeCategoryKey;
              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategoryKey(cat.key);
                    setOpenItemKey(`${cat.key}-0`);
                  }}
                  className={`group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    isSelected
                      ? "border-foreground/10 bg-foreground text-background shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]"
                      : "border-foreground/8 bg-white/40 text-foreground hover:bg-white"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isSelected ? "bg-[#9FE870]" : "bg-black/20"
                    }`}
                  />
                  <span className="text-sm font-semibold tracking-tight">
                    {cat.label}
                  </span>
                  <span
                    className={`ml-auto font-mono text-[10px] ${
                      isSelected
                        ? "text-background/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Accordion Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {activeCategory.items.map((item, idx) => {
                const itemKey = `${activeCategory.key}-${idx}`;
                const isOpen = openItemKey === itemKey;

                return (
                  <div
                    key={itemKey}
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isOpen
                        ? "border-foreground/15 bg-white"
                        : "border-foreground/8 bg-white/50 hover:bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenItemKey(isOpen ? null : itemKey)}
                      className="flex w-full items-start gap-4 px-5 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                        Q{String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-base font-semibold tracking-tight">
                        {item.q}
                      </span>
                      <Plus
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed text-muted-foreground">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
