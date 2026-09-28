import { useState } from 'react';
import { portraitItems, portraitStaggers, type PortraitItem } from '../../../data/portraits';
import {
  Building2,
  Zap,
  Terminal,
  ShieldCheck,
  Sparkles,
  Database,
  Globe,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Zap,
  Terminal,
  ShieldCheck,
  Sparkles,
  Database,
  Globe,
};

export function DisciplinesCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const repeatedItems = [...portraitItems, ...portraitItems, ...portraitItems];

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-12 sm:py-20 my-2 select-none">
      <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAFAF8] via-[#FAFAF8]/60 to-transparent z-20 pointer-events-none" />

      <div
        className="w-full py-10 sm:py-14 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="flex items-center gap-6 animate-portrait-marquee w-max"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            animationDuration: '25s',
          }}
        >
          {repeatedItems.map((item: PortraitItem, idx: number) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            const staggerClass = portraitStaggers[idx % portraitStaggers.length];

            return (
              <div
                key={`${item.label}-${idx}`}
                className="w-[270px] sm:w-[300px] md:w-[320px] h-auto flex-shrink-0 cursor-pointer"
              >
                <div
                  className={`relative w-full h-[390px] sm:h-[430px] md:h-[450px] rounded-3xl overflow-hidden border border-[#163300]/12 bg-white/70 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-[#163300]/40 group/card ${staggerClass}`}
                >
                  <img
                    src={item.src}
                    alt={`Jit Kumar Saha — ${item.label}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-105 pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none transition-opacity duration-300 group-hover/card:from-black/90" />

                  {/* Top tags */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#163300] text-[10px] font-mono font-bold shadow-sm border border-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#163300] animate-pulse" />
                      {item.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[#DCFF85] text-[9px] font-mono font-bold uppercase tracking-wider border border-white/20">
                      <IconComponent size={11} className="text-[#DCFF85]" />
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom title card */}
                  <div className="absolute bottom-3.5 inset-x-3.5 z-10 pointer-events-none">
                    <div className="bg-[#163300]/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-lg flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold tracking-tight text-white leading-tight">
                          {item.label}
                        </h4>
                        <p className="text-[11px] text-white/70 font-mono mt-0.5">
                          Jit Kumar Saha
                        </p>
                      </div>
                      <span className="text-sm font-mono text-[#DCFF85] group-hover/card:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
