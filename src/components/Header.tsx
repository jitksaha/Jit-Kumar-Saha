import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandStar } from './ui/BrandStar';
import { Button, RollingText } from './ui/Button';

export interface HeaderProps {
  variant?: 'light' | 'dark';
  active?: string;
}

export const navLinks = [
  ['About', '/about'],
  ['Experience', '/experience'],
  ['Expertise', '/expertise'],
  ['Impact', '/work'],
  ['Ventures', '/venture'],
  ['AI & Code', '/ai'],
  ['Pricing', '/pricing'],
];

export function Header({ variant = 'light', active }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const routerState = useRouterState();
  const isEnterprise = routerState?.location?.pathname?.startsWith('/enterprise') ?? false;

  useEffect(() => {
    let lastScroll = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const diff = currentScroll - lastScroll;

      if (currentScroll < 30) {
        setIsScrolled(false);
      } else if (diff > 4 && currentScroll > 60) {
        setIsScrolled(true);
      } else if (diff < -4) {
        setIsScrolled(false);
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      className={`site-header site-header-${variant} floating-header ${
        isScrolled ? 'is-scrolled' : ''
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') closeMenu();
      }}
    >
      <div className="site-brand-group flex items-center gap-3">
        <Link className="site-brand" to="/" aria-label="Jit Kumar Saha home">
          <motion.span
            className="inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="site-brand-mark">
              <BrandStar size={17} spin />
            </span>{' '}
            <span>Jit Kumar Saha</span>
          </motion.span>
        </Link>

        {/* Business vs Enterprise Pill Switcher */}
        <div className="flex items-center rounded-full bg-[#163300]/[0.04] p-0.5 sm:p-1 border border-[#163300]/[0.07] text-[11px] sm:text-xs font-semibold select-none shadow-2xs backdrop-blur-sm">
          <Link
            to="/"
            className={`relative rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 transition-colors duration-200 ${
              isEnterprise ? 'text-[#163300]/60 hover:text-[#163300]' : 'text-[#163300] font-bold'
            }`}
          >
            {!isEnterprise && (
              <motion.span
                layoutId="header-switcher-pill"
                className="absolute inset-0 rounded-full bg-[#DCFF85] shadow-xs"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">Business</span>
          </Link>

          <Link
            to="/enterprise"
            className={`relative rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 transition-colors duration-200 ${
              isEnterprise ? 'text-[#163300] font-bold' : 'text-[#163300]/60 hover:text-[#163300]'
            }`}
          >
            {isEnterprise && (
              <motion.span
                layoutId="header-switcher-pill"
                className="absolute inset-0 rounded-full bg-[#DCFF85] shadow-xs"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              Enterprise
              <span className="h-1.5 w-1.5 rounded-full bg-[#163300] animate-pulse" />
            </span>
          </Link>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav
        className={isOpen ? 'site-links is-open' : 'site-links'}
        aria-label="Main navigation"
      >
        <div className="md:hidden mb-2 pb-2.5 border-b border-[#163300]/10 flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-[#163300]/60 uppercase">
            Select Mode:
          </span>
          <div className="inline-flex items-center rounded-full bg-[#163300]/[0.05] p-1 border border-[#163300]/[0.08] text-xs font-semibold">
            <Link
              to="/"
              onClick={closeMenu}
              className={`px-3 py-1 rounded-full ${
                isEnterprise ? 'text-[#163300]/60' : 'bg-[#DCFF85] text-[#163300] font-bold'
              }`}
            >
              Business
            </Link>
            <Link
              to="/enterprise"
              onClick={closeMenu}
              className={`px-3 py-1 rounded-full ${
                isEnterprise ? 'bg-[#DCFF85] text-[#163300] font-bold' : 'text-[#163300]/60'
              }`}
            >
              Enterprise
            </Link>
          </div>
        </div>

        {navLinks.map(([label, path]) => {
          const isActive =
            active === label.toLowerCase() ||
            (label === 'AI & Code' && active === 'ai') ||
            (routerState?.location?.pathname === path);

          return (
            <Link
              key={label}
              to={path}
              className={`group inline-flex items-center ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <motion.span
                className="inline-block relative py-1"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <RollingText text={label} staggerDelay={0.012} />
              </motion.span>
            </Link>
          );
        })}

        <div className="md:hidden mt-3 pt-3 border-t border-[#163300]/10 flex flex-col">
          <Button
            to="/contact"
            variant="dark"
            text="Let’s talk"
            icon={<ArrowUpRight size={14} />}
            onClick={closeMenu}
            className="w-full justify-center px-4 py-2.5 text-xs btn-shine"
          />
        </div>
      </nav>

      {/* Header Actions */}
      <div className="site-header-actions flex items-center gap-2">
        <div className="hidden md:block">
          <Button
            to="/contact"
            variant="dark"
            text="Let’s talk"
            icon={<ArrowUpRight size={14} />}
            onClick={closeMenu}
            className="px-4 py-2 text-xs btn-shine"
          />
        </div>

        <motion.button
          className="site-menu"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>
    </motion.header>
  );
}
