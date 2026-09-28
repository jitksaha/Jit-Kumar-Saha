export interface EngagementModel {
  name: string;
  tagline: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export const engagementModels: EngagementModel[] = [
  {
    name: 'Clarity Sprint',
    tagline: 'For founders with a high-stakes decision or stuck roadmap',
    period: '2 WEEKS INTENSIVE',
    description:
      'Deep dive into your customer data, tech architecture, and roadmap to eliminate bloat and lock in the 3 highest-ROI bets.',
    features: [
      'Customer & codebase discovery',
      'Roadmap audit & scope reduction',
      'AI feasibility & tool architecture',
      'Executive 30/60/90 execution blueprint',
      'Async Loom reviews + 2 strategy calls',
    ],
    cta: 'Book a Clarity Sprint',
    popular: false,
  },
  {
    name: 'Build Partnership',
    tagline: 'From concept to shipped product in record time',
    period: '6 – 8 WEEKS DELIVERY',
    description:
      'Hands-on product development and engineering. I design, build, and deploy the working system until real customers use it.',
    features: [
      'End-to-end full stack development',
      'Clean TypeScript, React/Next.js & APIs',
      'Custom AI agent / MCP integration',
      'Performance optimization & SEO setup',
      'Post-launch handover & team onboarding',
      'Dedicated Slack channel access',
    ],
    cta: 'Start Your Build',
    popular: true,
  },
  {
    name: 'Embedded Leadership',
    tagline: 'Fractional Head of Product & AI Strategist',
    period: 'MONTHLY ENGAGEMENT',
    description:
      'Sitting inside your team to lead discovery, set engineering rhythm, manage sprints, and deploy AI across your business workflows.',
    features: [
      'Weekly sprint cadence & backlog ownership',
      'Cross-functional team leadership (Dev, Design, GTM)',
      'Continuous AI automation deployment',
      'P&L and unit economics alignment',
      'Hiring support & engineer mentorship',
      'Direct asynchronous & meeting availability',
    ],
    cta: 'Discuss Embedded Role',
    popular: false,
  },
];

export const engagementTiers = engagementModels;
