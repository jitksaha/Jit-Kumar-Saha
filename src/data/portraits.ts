import { assets } from './assets';

export interface PortraitItem {
  src: string;
  label: string;
  tag: string;
  category: string;
  iconName: string;
}

export const portraitItems: PortraitItem[] = [
  {
    src: assets.hero,
    label: 'Founder & Strategy',
    tag: 'Dhaka · Global',
    category: 'EXECUTIVE',
    iconName: 'Building2',
  },
  {
    src: assets.about,
    label: 'Product Leadership',
    tag: '0 → 1 Execution',
    category: 'PRODUCT',
    iconName: 'Zap',
  },
  {
    src: assets.experience,
    label: 'Enterprise Engineering',
    tag: '7+ Yrs Track Record',
    category: 'ENGINEERING',
    iconName: 'Terminal',
  },
  {
    src: assets.venture,
    label: 'Venture Architecture',
    tag: 'Dynime & AI Swarms',
    category: 'VENTURES',
    iconName: 'ShieldCheck',
  },
  {
    src: assets.ai,
    label: 'AI & Autonomous Systems',
    tag: 'LLMs & MCP Tooling',
    category: 'APPLIED AI',
    iconName: 'Sparkles',
  },
  {
    src: assets.expertise,
    label: 'SaaS & Modern Platforms',
    tag: 'Multi-Tenant Cloud',
    category: 'ARCHITECTURE',
    iconName: 'Database',
  },
  {
    src: assets.contact,
    label: 'Global Tech Advisory',
    tag: 'Strategic Partner',
    category: 'ADVISORY',
    iconName: 'Globe',
  },
];

export const portraitStaggers = [
  'translate-y-0',
  'translate-y-7 sm:translate-y-9',
  '-translate-y-2 sm:-translate-y-3',
  'translate-y-9 sm:translate-y-11',
  'translate-y-1 sm:translate-y-2',
  'translate-y-8 sm:translate-y-10',
  '-translate-y-3 sm:-translate-y-4',
];
