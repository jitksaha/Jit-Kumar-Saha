import type { ExperienceItem } from '../types/experience';
export type { ExperienceItem };

export const experienceItems: ExperienceItem[] = [
  {
    role: 'Head of Product',
    company: 'Dynime Inc.',
    period: 'Present',
    summary: 'Leading product strategy, roadmap, and execution across a multi-team organization.',
    responsibilities: [
      'Set product vision and quarterly roadmap',
      'Lead product, design and engineering cadence',
      'Own discovery, prioritization and delivery',
      'Embed AI capabilities into the product surface',
    ],
    achievements: [
      'Restructured discovery → delivery into a single operating system',
      'Shipped AI-assisted workflows used daily by core users',
      'Aligned GTM, success and engineering on a unified roadmap',
    ],
    impact: 'Faster shipping, sharper bets, and a product team that compounds.',
  },
  {
    role: 'Business Management Executive',
    company: 'Pixel Digi Solution Inc.',
    period: '2023 — 2024',
    summary: 'P&L responsibility across operations, delivery and growth.',
    responsibilities: [
      'Operations, delivery and revenue accountability',
      'Hiring, performance and team development',
      'Client strategy and account expansion',
    ],
    achievements: [
      'Improved on-time delivery and account retention',
      'Standardized operating processes across functions',
    ],
    impact: 'Predictable delivery and healthier accounts.',
  },
  {
    role: 'Project Manager',
    company: 'Webleez Limited',
    period: '2022 — 2023',
    summary: 'Multi-team delivery across web, commerce and product engagements.',
    responsibilities: [
      'Scope, timeline, quality and stakeholder comms',
      'Cross-functional coordination',
      'Risk and dependency management',
    ],
    achievements: [
      'Delivered concurrent projects across industries',
      'Introduced clearer reporting and delivery rituals',
    ],
    impact: 'Clearer trade-offs, fewer surprises, happier clients.',
  },
  {
    role: 'Sales & Support Specialist',
    company: 'Bluesky Communication Ltd.',
    period: '2021 — 2022',
    summary: 'Customer-facing role spanning sales and post-sale success.',
    responsibilities: [
      'Customer acquisition and onboarding',
      'Account management and renewals',
      'Front-line problem solving',
    ],
    achievements: ['Built customer relationships that turned into long-term accounts'],
    impact: 'Foundation for thinking in customer outcomes, not features.',
  },
  {
    role: 'WordPress & Shopify Developer',
    company: 'Vision Ads 360',
    period: '2020 — 2021',
    summary: 'Commerce and CMS builds for brands and agencies.',
    responsibilities: [
      'Theme & store builds',
      'Integrations, performance, conversion',
      'Client communication & QA',
    ],
    achievements: ['Delivered stores and sites for diverse client portfolios'],
    impact: "A practitioner's view of how online businesses actually run.",
  },
  {
    role: 'Freelance Developer',
    company: 'Upwork',
    period: '2019 — 2020',
    summary: 'Independent client work across the web stack.',
    responsibilities: ['Direct client discovery and scoping', 'End-to-end build and ship'],
    achievements: ['Maintained top-rated standing with global clients'],
    impact: 'Learned to sell, scope, build and deliver — solo.',
  },
];
