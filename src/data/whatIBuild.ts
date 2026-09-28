export interface WhatIBuildItem {
  id: string;
  tag: string;
  iconName: string;
  title: string;
  description: string;
  stats: string;
  ctaText: string;
  link: string;
  highlights: string[];
  gradient: string;
  badgeColor: string;
}

export const whatIBuildItems: WhatIBuildItem[] = [
  {
    id: 'business',
    tag: 'BUSINESS & VENTURES',
    iconName: 'Building2',
    title: 'Business',
    description:
      'Building technology-enabled businesses around real market opportunities, sustainable products and scalable operations.',
    stats: 'Sustainable & Scalable',
    ctaText: 'Explore Business',
    link: '/about',
    highlights: [
      'Market opportunity discovery',
      'Sustainable product models',
      'Scalable operations',
    ],
    gradient: 'from-purple-500/15 via-indigo-500/10 to-transparent',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    id: 'product',
    tag: 'PRODUCT DEVELOPMENT',
    iconName: 'Zap',
    title: 'Product',
    description:
      'From product strategy and discovery to development, launch and continuous improvement, I focus on creating products that solve meaningful problems.',
    stats: '0→1 to Continuous Growth',
    ctaText: 'Explore Product',
    link: '/expertise',
    highlights: [
      'Product strategy & discovery',
      'User-centered design',
      'Continuous improvement',
    ],
    gradient: 'from-blue-500/15 via-cyan-500/10 to-transparent',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    id: 'technology',
    tag: 'TECHNOLOGY & SAAS',
    iconName: 'Database',
    title: 'Technology',
    description:
      'Using software, SaaS, automation and emerging technologies to turn product ideas into scalable digital solutions.',
    stats: 'Software, SaaS & AI',
    ctaText: 'Inspect Technology',
    link: '/ai',
    highlights: [
      'Scalable software & SaaS',
      'Business automation systems',
      'Emerging AI architectures',
    ],
    gradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
];
