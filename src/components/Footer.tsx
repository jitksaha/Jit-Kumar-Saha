import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Phone,
  Sparkles,
  ArrowUp,
} from 'lucide-react';
import { BrandStar } from './ui/BrandStar';
import { Button, RollingText } from './ui/Button';
import { CopyButton } from './ui/CopyButton';

export function Footer() {
  const exploreLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Work & Case Studies', to: '/work' },
    { label: 'Capabilities', to: '/expertise' },
    { label: 'Experience', to: '/experience' },
    { label: 'Ventures', to: '/venture' },
    { label: 'AI & Code', to: '/ai' },
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
      className="relative bg-[#0c1407] text-white mt-24 sm:mt-28 md:mt-32 pt-0 pb-12 border-t border-[#163300]/40"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Call to Action Floating Card */}
        <motion.div
          className="relative -mt-16 sm:-mt-20 md:-mt-22 mb-12 sm:mb-16 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#163300] via-[#1a3d02] to-[#163300] border border-[#9FE870]/35 p-6 sm:p-8 md:py-7 md:px-10 overflow-hidden shadow-2xl z-20 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#DCFF85]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-[#DCFF85]/15 text-[#DCFF85] border border-[#DCFF85]/30 mb-2.5">
                <Sparkles size={12} /> READY FOR THE NEXT MOVE?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Let’s build products that{' '}
                <span className="font-serif italic font-normal text-[#DCFF85]">
                  earn their place.
                </span>
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
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
                className="px-6 py-3 text-xs sm:text-sm font-bold btn-shine btn-lime-glow"
              />
              <Button
                href="mailto:mail@jitksaha.com"
                variant="glass-dark"
                text="Email directly"
                icon={<Mail size={14} />}
                className="px-5 py-3 text-xs sm:text-sm font-semibold btn-shine"
              />
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
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
            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="https://www.linkedin.com/in/jitksha"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
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
