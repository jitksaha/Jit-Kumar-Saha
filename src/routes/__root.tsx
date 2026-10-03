import { useEffect } from 'react';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  Link,
  useRouter,
} from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { SmoothScroll } from '../components/SmoothScroll';
import { CustomCursor } from '../components/CustomCursor';

export interface RouterContext {
  queryClient: QueryClient;
}

export function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ErrorComponent({
  error,
  reset,
}: {
  error: any;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <CustomCursor />
      <Outlet />
    </QueryClientProvider>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        title: 'Jit Kumar Saha — Entrepreneur, Product Builder & Technology Founder',
      },
      {
        name: 'description',
        content:
          'Jit Kumar Saha is an entrepreneur and technology founder building SaaS, software and digital products that connect business, product development and technology. Founder & CEO of Dynime.',
      },
      {
        name: 'keywords',
        content:
          'Jit Kumar Saha, Entrepreneur, Product Builder, Technology Founder, SaaS, Software Products, Digital Products, Product Development, Product Strategy, Business Technology, Technology Ventures, Dynime',
      },
      {
        property: 'og:title',
        content: 'Jit Kumar Saha — Entrepreneur, Product Builder & Technology Founder',
      },
      {
        property: 'og:description',
        content:
          'Jit Kumar Saha is an entrepreneur and technology founder building SaaS, software and digital products that connect business, product development and technology. Founder & CEO of Dynime.',
      },
      {
        property: 'og:url',
        content: 'https://jitksaha.com',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'Jit Kumar Saha',
      },
      {
        property: 'og:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '675',
      },
      {
        property: 'og:image:alt',
        content: 'Jit Kumar Saha — Entrepreneur, Product Builder & Technology Founder',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@jitksahabd',
      },
      {
        name: 'twitter:creator',
        content: '@jitksahabd',
      },
      {
        name: 'twitter:title',
        content: 'Jit Kumar Saha — Entrepreneur, Product Builder & Technology Founder',
      },
      {
        name: 'twitter:description',
        content:
          'Jit Kumar Saha is an entrepreneur and technology founder building SaaS, software and digital products that connect business, product development and technology. Founder & CEO of Dynime.',
      },
      {
        name: 'twitter:image',
        content: 'https://jitksaha.com/og-image.jpg',
      },
      {
        name: 'twitter:image:alt',
        content: 'Jit Kumar Saha — Entrepreneur, Product Builder & Technology Founder',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://jitksaha.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': 'https://jitksaha.com/#person',
              name: 'Jit Kumar Saha',
              alternateName: ['Jit Saha', 'Jit K. Saha'],
              jobTitle: 'Entrepreneur & Technology Founder',
              description:
                'Jit Kumar Saha is an entrepreneur, technology founder and product builder focused on building businesses, digital products, SaaS platforms and software solutions.',
              url: 'https://jitksaha.com',
              image: 'https://jitksaha.com/assets/portraits/jitksaha_hero.png',
              sameAs: [
                'https://www.linkedin.com/in/jitksahabd/',
                'https://x.com/jitksahabd',
                'https://www.facebook.com/jitksahabd/',
                'https://www.facebook.com/jitksaha',
                'https://www.instagram.com/jitksahabd/',
                'https://github.com/jitksaha',
              ],
              worksFor: {
                '@type': 'Organization',
                '@id': 'https://jitksaha.com/#dynime',
                name: 'Dynime',
                url: 'https://dynime.com',
              },
              knowsAbout: [
                'Entrepreneurship',
                'Product Development',
                'Product Strategy',
                'Digital Product Development',
                'SaaS Product Development',
                'Software Products',
                'Business Technology',
                'Technology Ventures',
                'Digital Transformation',
                'Business Automation',
                'Artificial Intelligence',
              ],
            },
            {
              '@type': 'Organization',
              '@id': 'https://jitksaha.com/#dynime',
              name: 'Dynime',
              url: 'https://dynime.com',
              founder: {
                '@id': 'https://jitksaha.com/#person',
              },
              description:
                'Dynime is a technology company focused on SaaS, business software, AI, automation and digital transformation.',
            },
            {
              '@type': 'WebSite',
              '@id': 'https://jitksaha.com/#website',
              url: 'https://jitksaha.com',
              name: 'Jit Kumar Saha',
              description:
                'Official personal website and portfolio of Jit Kumar Saha — Entrepreneur, Product Builder & Technology Founder.',
              publisher: {
                '@id': 'https://jitksaha.com/#person',
              },
            },
          ],
        }),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
