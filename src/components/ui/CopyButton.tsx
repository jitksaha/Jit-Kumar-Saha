import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: 'pill' | 'compact' | 'badge' | 'card';
  showText?: boolean;
}

export function CopyButton({
  textToCopy,
  label = 'mail.jitsaha@gmail.com',
  copiedLabel = 'Copied to clipboard!',
  className = '',
  variant = 'pill',
  showText = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const variantStyles = {
    pill: 'inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-medium border border-white/15 bg-white/10 hover:bg-white/15 text-white backdrop-blur-md transition-colors shadow-sm',
    compact:
      'inline-flex items-center justify-center p-2 rounded-xl text-xs border border-white/15 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors',
    badge:
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-[#171717]/10 bg-[#171717]/5 hover:bg-[#171717]/10 text-[#171717] transition-colors',
    card: 'flex items-center justify-between w-full p-4 rounded-2xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.09] text-white backdrop-blur-lg transition-colors group',
  }[variant];

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      layout
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      className={`group relative select-none cursor-pointer overflow-hidden ${variantStyles} ${className}`}
      aria-label={copied ? 'Copied' : `Copy ${textToCopy}`}
      title="Click to copy to clipboard"
    >
      <span className="inline-flex items-center gap-2">
        {copied ? (
          <Check size={14} className="text-[#DCFF85] shrink-0" />
        ) : (
          <Copy size={14} className="opacity-75 group-hover:opacity-100 transition-opacity shrink-0" />
        )}
        {showText && <span>{copied ? copiedLabel : label}</span>}
      </span>
    </motion.button>
  );
}
