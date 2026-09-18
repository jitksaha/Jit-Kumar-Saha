import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["About", "/about"],
  ["Work", "/work"],
  ["Capabilities", "/expertise"],
] as const;

export function SiteHeader({
  variant = "light",
  active,
}: {
  variant?: "light" | "dark";
  active?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className={`site-header site-header-${variant}`}>
      <Link className="site-brand" to="/" aria-label="Jit Kumar Saha home">
        <span className="site-brand-mark">✳</span> JIT<span className="site-brand-dot">.</span>
      </Link>
      <span className="site-descriptor">TECHNOLOGY / PRODUCT / BUSINESS</span>
      <nav className={open ? "site-links is-open" : "site-links"} aria-label="Main navigation">
        {links.map(([label, to]) => (
          <Link
            key={to}
            to={to}
            className={active === label.toLowerCase() ? "active" : ""}
            onClick={close}
          >
            {label}
          </Link>
        ))}
        <Link to="/contact" className="site-contact" onClick={close}>
          Let’s talk <ArrowUpRight size={14} />
        </Link>
      </nav>
      <button
        className="site-menu"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export function SiteFooter({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <footer className={`site-footer site-footer-${variant}`}>
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <Link className="site-brand" to="/">
            <span className="site-brand-mark">✳</span> JIT<span className="site-brand-dot">.</span>
          </Link>
          <span>Technology × Product × Business</span>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="site-footer-word">JIT.</div>
        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} Jit Kumar Saha</span>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/work">Work</Link>
            <Link to="/expertise">Capabilities</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
