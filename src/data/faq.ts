export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  key: string;
  label: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    key: 'entity',
    label: 'Founder & AEO Overview',
    items: [
      {
        q: 'Who is Jit Kumar Saha?',
        a: 'Jit Kumar Saha is an entrepreneur, product builder and technology founder focused on business, product development, SaaS, software and digital transformation. He is the Founder and CEO of Dynime, a technology company focused on building software and digital solutions for modern businesses.',
      },
      {
        q: 'What does Jit Kumar Saha do?',
        a: 'Jit Kumar Saha builds and develops businesses, software products and digital platforms, with a focus on SaaS, product development, business technology and digital transformation.',
      },
      {
        q: 'What is Jit Kumar Saha known for?',
        a: 'Jit Kumar Saha is known for building businesses, digital products and technology ventures focused on SaaS, software, automation and business technology.',
      },
      {
        q: 'Who founded Dynime and who is the CEO of Dynime?',
        a: 'Jit Kumar Saha is the Founder and CEO of Dynime, a technology company focused on SaaS, business software, AI, automation and digital transformation.',
      },
      {
        q: "What are Jit Kumar Saha's areas of expertise?",
        a: 'Jit Kumar Saha focuses on product development, product strategy, SaaS, software products, business technology, automation, digital transformation and emerging technology.',
      },
      {
        q: 'What kind of impact does Jit Kumar Saha focus on?',
        a: 'Jit Kumar Saha focuses on creating business and technology impact through digital products, software, SaaS, automation and technology-driven ventures.',
      },
    ],
  },
  {
    key: 'leadership',
    label: 'Business Leadership',
    items: [
      {
        q: "What's your approach to scaling a product organization?",
        a: 'Start with operating cadence, not headcount. I define the weekly rhythm — planning, review, retro — and the small set of metrics each layer owns. Hiring follows the cadence, not the other way around. The org chart is an output, not a strategy.',
      },
      {
        q: 'How do you align product, engineering and business teams?',
        a: 'One quarterly bet sheet, three lines per bet: the customer problem, the metric that moves, the constraint we accept. Every team reads the same page. Disagreements become explicit trade-offs instead of background noise.',
      },
      {
        q: 'When should a founder hire a Head of Product?',
        a: 'When the founder has stopped being the sharpest user of their own product, or when discovery, delivery and go-to-market start contradicting each other in public. Before that, a strong PM and a clear roadmap will do.',
      },
    ],
  },
  {
    key: 'ai',
    label: 'AI Transformation',
    items: [
      {
        q: 'Where does AI actually change unit economics?',
        a: "In the cost of a unit of judgment — support triage, content ops, sales research, code review. The win isn't 'AI features'; it's quietly removing 30–60% of the cost-to-serve in workflows the customer never sees.",
      },
      {
        q: 'How do you start an AI transformation without wasting budget?',
        a: 'Pick one workflow with a clean baseline metric and a single owner. Ship a thin agent into it in 2–3 weeks. Measure against the baseline. Only then write the strategy doc — the deck after the first win is worth ten before it.',
      },
      {
        q: 'Build vs buy for AI tooling?',
        a: "Buy the model, the eval harness and the boring infra. Build the prompts, the data plumbing and the workflow glue. Anything proprietary about your business should live in the layer you own, not inside a vendor's product roadmap.",
      },
    ],
  },
  {
    key: 'consulting',
    label: 'Working Together',
    items: [
      {
        q: 'What does an engagement typically look like?',
        a: "A 2-week diagnostic, a written 30/60/90 plan, then a 3–6 month operating partnership where I sit inside the team — not next to it. Fractional Head of Product, AI strategy, or both, depending on what's actually broken.",
      },
      {
        q: 'Which industries do you work across?',
        a: 'SaaS, e-commerce, fintech, edtech, healthtech, logistics, media and services businesses going through a digital reset. The patterns rhyme more than founders expect; the specifics are where the work is.',
      },
    ],
  },
];
