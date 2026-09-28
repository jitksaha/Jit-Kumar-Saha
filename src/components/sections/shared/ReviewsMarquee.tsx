import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import {
  testimonialsRow1,
  testimonialsRow2,
  type Testimonial,
} from '../../../data/testimonials';

function ReviewCard({ review }: { review: Testimonial }) {
  const initials = review.name
    .replace(/^Mr\s+/i, '')
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  return (
    <article className="flex flex-col justify-between rounded-3xl border border-[#163300]/10 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(22,51,0,0.03)] hover:shadow-xl hover:border-[#163300]/25 transition-all duration-300 group w-[380px] sm:w-[460px] md:w-[480px] min-h-[290px] select-none flex-shrink-0">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <div className="flex items-center gap-1 text-[#163300]">
            {[...Array(review.rating)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill="#9FE870"
                color="#163300"
                strokeWidth={1}
              />
            ))}
            <span className="ml-1.5 font-mono text-xs font-bold text-[#163300]">
              5.0
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#163300]/60 bg-[#163300]/5 px-2.5 py-0.5 rounded-full border border-[#163300]/10 font-bold">
              {review.badge}
            </span>
            <span className="text-[11px] text-[#163300]/40 font-mono">·</span>
            <span className="font-mono text-[10px] text-[#163300]/60 font-semibold">
              {review.country}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[#163300]/85 font-medium italic">
          "{review.quote}"
        </p>
      </div>

      <div className="pt-4 border-t border-[#163300]/10 flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#163300] text-[#DCFF85] flex items-center justify-center font-mono text-xs font-bold shrink-0">
            {initials}
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#163300] leading-tight">
              {review.name}
            </h4>
            <p className="text-[11px] text-[#163300]/60 font-medium">
              {review.position}, {review.company}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ReviewsMarquee() {
  const row1 = [
    ...testimonialsRow1,
    ...testimonialsRow1,
    ...testimonialsRow1,
    ...testimonialsRow1,
  ];
  const row2 = [
    ...testimonialsRow2,
    ...testimonialsRow2,
    ...testimonialsRow2,
    ...testimonialsRow2,
  ];

  return (
    <section
      className="relative py-28 md:py-36 bg-[#FAFAF8] border-t border-black/5 overflow-hidden"
      id="reviews"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#163300]/5 text-[#163300] border border-[#163300]/10 mb-4">
            <Sparkles size={13} className="text-[#9FE870]" /> CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#163300]">
            What founders say{' '}
            <span className="font-serif italic font-normal text-[#163300]/70">
              after we ship.
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#163300]/70 leading-relaxed">
            Direct feedback from founders, executives, and engineering leaders who
            have partnered with me across product, engineering, and AI systems worldwide.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full space-y-6 overflow-hidden group">
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFAF8] via-[#FAFAF8]/90 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-6 animate-reviews-forward group-hover:[animation-play-state:paused] will-change-transform">
          {row1.map((item, idx) => (
            <ReviewCard key={`row1-${item.company}-${idx}`} review={item} />
          ))}
        </div>

        <div className="flex w-max gap-6 animate-reviews-reverse group-hover:[animation-play-state:paused] will-change-transform">
          {row2.map((item, idx) => (
            <ReviewCard key={`row2-${item.company}-${idx}`} review={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
