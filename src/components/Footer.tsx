import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Phone,
  Sparkles,
  ArrowUp,
} from 'lucide-react';
import { BrandStar } from './ui/BrandStar';
import { Button, RollingText } from './ui/Button';
import { CopyButton } from './ui/CopyButton';

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface FooterProps {
  hideCtaCard?: boolean;
}

export function Footer({ hideCtaCard = false }: FooterProps = {}) {
  const exploreLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Work & Case Studies', to: '/work' },
    { label: 'Capabilities', to: '/expertise' },
    { label: 'Experience', to: '/experience' },
    { label: 'Ventures', to: '/venture' },
    { label: 'AI & Agentic AI', to: '/ai' },
    { label: 'Pricing & Models', to: '/pricing' },
    { label: 'Insights', to: '/insights' },
  ];

  const capabilityItems = [
    'Product Discovery & Strategy',
    '0→1 Full-Stack Engineering',
    'Autonomous AI & MCP Servers',
    'Fractional Head of Product',
    'Revenue Operations & P&L',
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative bg-[#0c1407] text-white pb-16 ${
        hideCtaCard ? 'pt-16 mt-0' : 'mt-28 sm:mt-32 md:mt-36 pt-0'
      }`}
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Call to Action Floating Card (50% floating overlap on footer top edge) */}
        {!hideCtaCard && (
          <motion.div
            className="relative -translate-y-1/2 mb-2 sm:mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#163300] via-[#1c3e03] to-[#163300] border border-[#DCFF85]/30 p-6 sm:p-8 md:py-10 md:px-12 overflow-hidden shadow-2xl z-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-[#DCFF85]/15 text-[#DCFF85] border border-[#DCFF85]/30 mb-3">
                  <Sparkles size={12} className="text-[#9FE870]" /> READY FOR THE NEXT MOVE?
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Let’s build products that{' '}
                  <span className="font-serif italic font-normal text-[#DCFF85]">
                    earn their place.
                  </span>
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                  2-week clarity diagnostics, hands-on 0→1 builds, or an embedded Head of Product & AI
                  Strategist.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Button
                  to="/contact"
                  variant="lime"
                  text="Start a conversation"
                  icon={<ArrowUpRight size={15} />}
                  className="px-6 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-[#9FE870]/20"
                />
                <Button
                  href="mailto:mail@jitksaha.com"
                  variant="glass-dark"
                  text="Email directly"
                  icon={<Mail size={14} />}
                  className="px-5 py-3.5 text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Links Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 ${!hideCtaCard ? 'pt-2 md:pt-4' : ''}`}>
          {/* Brand & About */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white mb-4"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCFF85] text-[#163300] shadow-sm">
                <BrandStar size={15} color="#163300" />
              </span>
              Jit Kumar Saha
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm mb-6">
              Product Leader, Web Developer, and AI Strategist helping ambitious founders turn rough
              ideas into resilient products and automated growth engines.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <motion.a
                href="https://www.linkedin.com/in/jitksahabd/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="https://x.com/jitksahabd"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="X (formerly Twitter)"
              >
                <XIcon size={16} />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/jitksahabd/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="Facebook Profile"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/jitksahabd/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="Instagram Profile"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="https://wa.me/8801601111994"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </motion.a>
              <CopyButton
                textToCopy="mail@jitksaha.com"
                label="mail@jitksaha.com"
                copiedLabel="Copied email!"
                variant="pill"
                className="!bg-[#163300] !text-[#DCFF85] hover:!bg-[#DCFF85] hover:!text-[#163300] border border-[#DCFF85]/30"
              />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#9FE870] mb-4 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/70 hover:text-[#DCFF85] transition-colors group inline-block"
                  >
                    <RollingText text={item.label} staggerDelay={0.012} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#9FE870] mb-4 font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {capabilityItems.map((item) => (
                <li key={item} className="group flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9FE870]/40 group-hover:bg-[#DCFF85] transition-colors" />
                  <Link to="/expertise" className="hover:text-[#DCFF85] transition-colors">
                    <RollingText text={item} staggerDelay={0.01} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#9FE870] mb-4 font-semibold">
              Get in Touch
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:mail@jitksaha.com"
                className="text-white font-mono block hover:text-[#DCFF85] transition-colors group"
              >
                <RollingText text="mail@jitksaha.com" staggerDelay={0.01} />
              </a>
              <a
                href="mailto:mail.jitsaha@gmail.com"
                className="text-xs text-white/70 font-mono block hover:text-[#DCFF85] transition-colors"
              >
                mail.jitsaha@gmail.com
              </a>
              <a
                href="https://wa.me/8801601111994"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#DCFF85] font-mono block hover:underline"
              >
                +880 1601 111994
              </a>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-[#9FE870]">
                  <span className="h-2 w-2 rounded-full bg-[#DCFF85] animate-pulse" />
                  Response within 24–48 hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>© {new Date().getFullYear()} Jit Kumar Saha. All rights reserved.</div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-[#DCFF85] transition-colors group cursor-pointer"
          >
            <RollingText text="Back to top" />
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
