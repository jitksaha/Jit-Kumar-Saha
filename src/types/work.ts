export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  accent: 'coral' | 'lime' | 'violet';
  headline: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: [string, string][];
}
