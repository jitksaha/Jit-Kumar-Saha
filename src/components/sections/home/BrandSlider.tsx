import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../ui/Button';
import {
  siPerplexity,
  siMiro,
  siDoordash,
  siLinear,
  siSupabase,
  siStripe,
  siVercel,
  siGoogle,
  siMeta,
  siShopify,
  siWordpress,
  siElementor,
  siWoocommerce,
  siHostinger,
  siTechcrunch,
} from 'simple-icons';

interface BrandLogoItem {
  id: string;
  name: string;
  render: () => React.ReactNode;
}

// Row 1: Balanced optical sizing across all brands (height ~18-20px)
const row1Logos: BrandLogoItem[] = [
  {
    id: 'dribbble',
    name: 'Dribbble',
    render: () => (
      <img
        src="/customers/dribbble.svg"
        alt="Dribbble"
        style={{ filter: 'brightness(0)', WebkitFilter: 'brightness(0)' }}
        className="h-4.5 sm:h-5 max-h-[20px] w-auto object-contain"
      />
    ),
  },
  {
    id: 'forbes',
    name: 'Forbes',
    render: () => (
      <img
        src="/customers/forbes.svg"
        alt="Forbes"
        style={{ filter: 'brightness(0)', WebkitFilter: 'brightness(0)' }}
        className="h-4 sm:h-4.5 max-h-[18px] w-auto object-contain"
      />
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siMeta.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          Meta
        </span>
      </div>
    ),
  },
  {
    id: 'legora',
    name: 'LEGORA',
    render: () => (
      <span className="font-sans font-black text-[15px] sm:text-base tracking-[0.16em] leading-none uppercase">
        LEGORA
      </span>
    ),
  },
  {
    id: 'zapier',
    name: '_zapier',
    render: () => (
      <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none inline-flex items-center">
        <span className="font-black mr-0.5 tracking-tighter">_</span>zapier
      </span>
    ),
  },
  {
    id: 'google',
    name: 'Google',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siGoogle.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          Google
        </span>
      </div>
    ),
  },
  {
    id: 'perplexity',
    name: 'perplexity',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siPerplexity.path} />
        </svg>
        <span className="font-sans font-semibold text-[15px] sm:text-base tracking-tight leading-none">
          perplexity
        </span>
      </div>
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siShopify.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          Shopify
        </span>
      </div>
    ),
  },
  {
    id: 'linear',
    name: 'Linear',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siLinear.path} />
        </svg>
        <span className="font-sans font-semibold text-[15px] sm:text-base tracking-tight leading-none">
          Linear
        </span>
      </div>
    ),
  },
  {
    id: 'hostinger',
    name: 'Hostinger',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siHostinger.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          Hostinger
        </span>
      </div>
    ),
  },
  {
    id: 'stripe',
    name: 'stripe',
    render: () => (
      <svg
        viewBox="0 0 24 24"
        className="h-4.5 sm:h-5 w-auto max-h-[19px] fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={siStripe.path} />
      </svg>
    ),
  },
  {
    id: 'elementor',
    name: 'Elementor',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siElementor.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          elementor
        </span>
      </div>
    ),
  },
  {
    id: 'dynime',
    name: 'Dynime',
    render: () => (
      <img
        src="/customers/dynime.webp"
        alt="Dynime"
        style={{ filter: 'brightness(0)', WebkitFilter: 'brightness(0)' }}
        className="h-4.5 sm:h-5 max-h-[20px] w-auto object-contain"
      />
    ),
  },
];

// Row 2: Balanced optical sizing across all brands (height ~18-20px)
const row2Logos: BrandLogoItem[] = [
  {
    id: 'calcom',
    name: 'Cal.com',
    render: () => (
      <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
        Cal.com
      </span>
    ),
  },
  {
    id: 'business-standard',
    name: 'Business Standard',
    render: () => (
      <span className="font-serif font-bold text-[15px] sm:text-base tracking-tight leading-none whitespace-nowrap">
        Business Standard
      </span>
    ),
  },
  {
    id: 'mixpanel',
    name: 'mixpanel',
    render: () => (
      <span className="font-sans font-extrabold text-[15px] sm:text-base tracking-tight leading-none lowercase">
        mixpanel
      </span>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siWordpress.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          WordPress
        </span>
      </div>
    ),
  },
  {
    id: 'miro',
    name: 'miro',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siMiro.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none lowercase">
          miro
        </span>
      </div>
    ),
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg',
    render: () => (
      <img
        src="/customers/bloomberg.svg"
        alt="Bloomberg"
        style={{ filter: 'brightness(0)', WebkitFilter: 'brightness(0)' }}
        className="h-4 sm:h-4.5 max-h-[18px] w-auto object-contain"
      />
    ),
  },
  {
    id: 'doordash',
    name: 'DOORDASH',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-3.5 sm:w-5.5 sm:h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siDoordash.path} />
        </svg>
        <span className="font-sans font-black text-[13px] sm:text-sm tracking-[0.14em] uppercase leading-none">
          DOORDASH
        </span>
      </div>
    ),
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-4 sm:w-5.5 sm:h-4.5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siWoocommerce.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          woocommerce
        </span>
      </div>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siSupabase.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          Supabase
        </span>
      </div>
    ),
  },
  {
    id: 'lovable',
    name: 'Lovable',
    render: () => (
      <img
        src="/customers/lovable.png"
        alt="Lovable"
        style={{ filter: 'brightness(0)', WebkitFilter: 'brightness(0)' }}
        className="h-4.5 sm:h-5 max-h-[20px] w-auto object-contain"
      />
    ),
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siTechcrunch.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          TechCrunch
        </span>
      </div>
    ),
  },
  {
    id: 'vercel',
    name: 'Vercel',
    render: () => (
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={siVercel.path} />
        </svg>
        <span className="font-sans font-bold text-[15px] sm:text-base tracking-tight leading-none">
          Vercel
        </span>
      </div>
    ),
  },
  {
    id: 'business-insider',
    name: 'Business Insider',
    render: () => (
      <span className="font-sans font-black text-[13px] sm:text-sm tracking-tight uppercase leading-none whitespace-nowrap">
        BUSINESS INSIDER
      </span>
    ),
  },
];

export interface BrandSliderProps {
  kicker?: string;
  buttonText?: string;
  reviewsAnchorId?: string;
  className?: string;
}

export function BrandSlider({
  kicker = 'PLATFORMS & ECOSYSTEMS I BUILD AND WORKED WITH',
  buttonText = 'Read Founder Reviews',
  reviewsAnchorId = 'reviews',
  className = '',
}: BrandSliderProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Quadruple items to make the marquee loop infinitely without any visible gap
  const row1 = [...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos];
  const row2 = [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos];

  const handleScrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const reviewsEl = document.getElementById(reviewsAnchorId);
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto pt-6 pb-2 ${className}`}>
      {/* Header kicker */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="h-px w-8 sm:w-16 bg-[#163300]/15" />
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] font-semibold text-[#163300]/60 flex items-center gap-1.5 text-center">
          <Sparkles size={12} className="text-[#84cc16] shrink-0" /> {kicker}
        </span>
        <span className="h-px w-8 sm:w-16 bg-[#163300]/15" />
      </div>

      {/* Marquee viewport with hover interactive overlay and gradient edge fade masks */}
      <div
        className="brand-slider-viewport relative w-full overflow-hidden select-none py-2.5 sm:py-3.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left & Right gradient edge fade masks - extra wide multi-stop foggy cloud fade */}
        <div className="absolute top-0 bottom-0 left-0 w-28 sm:w-48 md:w-64 lg:w-80 bg-gradient-to-r from-[#fafaf8] via-[#fafaf8]/95 via-35% via-[#fafaf8]/60 via-70% to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-28 sm:w-48 md:w-64 lg:w-80 bg-gradient-to-l from-[#fafaf8] via-[#fafaf8]/95 via-35% via-[#fafaf8]/60 via-70% to-transparent z-10 pointer-events-none" />

        {/* Hover Center Callout: Website-style primary button */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <Button
            href={`#${reviewsAnchorId}`}
            onClick={handleScrollToReviews}
            text={buttonText}
            icon={<ArrowRight size={15} />}
            variant="primary"
            className="pointer-events-auto px-6 py-2.5 sm:px-6.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-tight shadow-[0_10px_32px_rgba(22,51,0,0.32)] btn-shine cursor-pointer"
          />
        </div>

        {/* Brand Rows Container with moderate 3px blur & dimming on hover */}
        <div
          className={`brand-slider-track ${isHovered ? 'is-blurred' : ''}`}
          style={{
            filter: isHovered ? 'blur(3px)' : 'blur(0px)',
            WebkitFilter: isHovered ? 'blur(3px)' : 'blur(0px)',
            opacity: isHovered ? 0.35 : 1,
            transition: 'filter 0.35s ease, opacity 0.35s ease',
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 6%, rgba(0,0,0,0.7) 14%, black 24%, black 76%, rgba(0,0,0,0.7) 86%, rgba(0,0,0,0.2) 94%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 6%, rgba(0,0,0,0.7) 14%, black 24%, black 76%, rgba(0,0,0,0.7) 86%, rgba(0,0,0,0.2) 94%, transparent 100%)',
          }}
        >
          {/* Row 1: Forward */}
          <div className="flex w-max items-center gap-10 sm:gap-14 md:gap-16 animate-brand-forward will-change-transform py-1.5">
            {row1.map((brand, idx) => (
              <div
                key={`r1-${brand.id}-${idx}`}
                className="brand-item-logo cursor-default shrink-0 flex items-center"
              >
                {brand.render()}
              </div>
            ))}
          </div>

          {/* Row 2: Reverse with reduced vertical gap */}
          <div className="flex w-max items-center gap-10 sm:gap-14 md:gap-16 animate-brand-reverse will-change-transform py-1.5 mt-2">
            {row2.map((brand, idx) => (
              <div
                key={`r2-${brand.id}-${idx}`}
                className="brand-item-logo cursor-default shrink-0 flex items-center"
              >
                {brand.render()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
