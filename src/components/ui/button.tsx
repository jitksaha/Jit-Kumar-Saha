import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

interface RollingTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function RollingText({
  text,
  className = '',
  staggerDelay = 0.015,
  duration = 0.28,
}: RollingTextProps) {
  const characters = text.split('');
  return (
    <span className={`inline-flex items-center select-none text-inherit ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className="relative inline-flex flex-col overflow-hidden h-[1.3em] leading-[1.3em] align-baseline"
        >
          <motion.span
            variants={{
              initial: { y: '0%' },
              hover: { y: '-100%' },
              hovered: { y: '-100%' },
            }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: index * staggerDelay,
            }}
            className="inline-block text-inherit"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          <motion.span
            variants={{
              initial: { y: '0%' },
              hover: { y: '-100%' },
              hovered: { y: '-100%' },
            }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: index * staggerDelay,
            }}
            className="inline-block text-inherit absolute top-full left-0"
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface RollingIconProps {
  icon: React.ReactNode | React.ElementType;
  size?: number;
  className?: string;
  delay?: number;
}

export function RollingIcon({
  icon,
  size = 15,
  className = '',
  delay = 0.06,
}: RollingIconProps) {
  const renderedIcon = React.isValidElement(icon)
    ? icon
    : typeof icon === 'function' || typeof icon === 'object'
      ? React.createElement(icon as React.ElementType, {
          size,
          className: 'w-full h-full text-inherit',
        })
      : icon;

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden h-[1.15em] w-[1.15em] shrink-0 text-inherit ${className}`}
    >
      <motion.span
        className="inline-flex items-center justify-center text-inherit w-full h-full"
        variants={{
          initial: { y: '0%', opacity: 1 },
          hover: { y: '-100%', opacity: 0 },
          hovered: { y: '-100%', opacity: 0 },
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {renderedIcon}
      </motion.span>
      <motion.span
        className="absolute top-full left-0 inline-flex items-center justify-center text-inherit w-full h-full"
        aria-hidden="true"
        variants={{
          initial: { y: '0%', opacity: 0 },
          hover: { y: '-100%', opacity: 1 },
          hovered: { y: '-100%', opacity: 1 },
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {renderedIcon}
      </motion.span>
    </span>
  );
}

export interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  icon?: React.ReactNode | React.ElementType;
  to?: string;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  variant?:
    | 'primary'
    | 'dark'
    | 'secondary'
    | 'light'
    | 'glass'
    | 'glass-dark'
    | 'lime'
    | 'outline';
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export function Button({
  children,
  text,
  icon,
  to,
  href,
  onClick,
  className = '',
  variant = 'dark',
  target,
  rel,
  type = 'button',
  disabled,
  ariaLabel,
}: ButtonProps) {
  const variantStyles: Record<string, string> = {
    primary:
      'bg-[#163300] !text-[#DCFF85] hover:bg-[#DCFF85] hover:!text-[#163300] border border-[#DCFF85]/30 shadow-md shadow-[#163300]/15 transition-colors duration-300',
    dark: 'bg-[#163300] !text-[#DCFF85] hover:bg-[#DCFF85] hover:!text-[#163300] border border-[#DCFF85]/30 shadow-md shadow-[#163300]/15 transition-colors duration-300',
    secondary:
      'bg-white !text-[#163300] hover:bg-[#163300] hover:!text-[#DCFF85] hover:border-[#163300] border border-[#163300]/20 shadow-sm transition-colors duration-300',
    light:
      'bg-white !text-[#163300] hover:bg-[#163300] hover:!text-[#DCFF85] hover:border-[#163300] border border-[#163300]/20 shadow-sm transition-colors duration-300',
    glass:
      'bg-white/90 backdrop-blur-md !text-[#163300] hover:bg-[#163300] hover:!text-[#DCFF85] hover:border-[#163300] border border-[#163300]/20 shadow-sm transition-colors duration-300',
    'glass-dark':
      'bg-white/10 backdrop-blur-md !text-white hover:bg-[#DCFF85] hover:!text-[#163300] hover:border-[#DCFF85] border border-white/20 shadow-sm transition-colors duration-300',
    lime: 'bg-[#9FE870] !text-[#163300] hover:bg-[#163300] hover:!text-[#DCFF85] hover:border-[#163300] border border-[#9FE870] shadow-md shadow-[#9FE870]/20 transition-colors duration-300',
    outline:
      'bg-transparent !text-[#163300] hover:bg-[#163300] hover:!text-[#DCFF85] hover:border-[#163300] border border-[#163300]/30 transition-colors duration-300',
  };

  const currentVariant = variantStyles[variant] || variantStyles.dark;

  const content = (
    <span className="relative z-10 inline-flex items-center justify-center gap-2 text-inherit">
      {text ? <RollingText text={text} className="text-inherit" /> : children}
      {icon && (
        <RollingIcon
          icon={icon}
          className="text-inherit"
          delay={text ? text.length * 0.015 : 0.05}
        />
      )}
    </span>
  );

  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold select-none ${currentVariant} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  }`;

  const motionProps = {
    initial: 'initial',
    whileHover: 'hovered',
    whileTap: 'tap',
    variants: {
      initial: { scale: 1, y: 0 },
      hovered: { scale: 1.02, y: -1, transition: { duration: 0.18, ease: 'easeOut' as const } },
      tap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeOut' as const } },
    },
  };

  if (to) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        to={to}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || text}
        {...motionProps}
      >
        {content}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || text}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel || text}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

export interface ActionLinkProps {
  to?: string;
  href?: string;
  text: string;
  icon?: React.ReactNode | React.ElementType;
  className?: string;
  variant?:
    | 'primary'
    | 'dark'
    | 'secondary'
    | 'light'
    | 'glass'
    | 'glass-dark'
    | 'lime'
    | 'outline';
  onClick?: (event: React.MouseEvent) => void;
  target?: string;
  rel?: string;
}

export function ActionLink({
  to,
  href,
  text,
  icon,
  className = '',
  variant,
  onClick,
  target,
  rel,
}: ActionLinkProps) {
  // If a variant is explicitly requested, render as Button
  if (variant) {
    return (
      <Button
        to={to}
        href={href}
        text={text}
        icon={icon}
        variant={variant}
        className={className}
        onClick={onClick}
        target={target}
        rel={rel}
      />
    );
  }

  const content = (
    <span className="inline-flex items-center gap-1.5 text-inherit">
      <RollingText text={text} />
      {icon && <RollingIcon icon={icon} delay={text.length * 0.015} />}
    </span>
  );

  const motionProps = {
    initial: 'initial',
    whileHover: 'hovered',
    whileTap: 'tap',
    variants: {
      initial: { scale: 1, y: 0 },
      hovered: { y: -1, transition: { duration: 0.18, ease: 'easeOut' as const } },
      tap: { scale: 0.97 },
    },
  };

  if (to) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        to={to}
        onClick={onClick}
        className={`inline-flex items-center text-inherit ${className}`}
        {...motionProps}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`inline-flex items-center text-inherit ${className}`}
      {...motionProps}
    >
      {content}
    </motion.a>
  );
}
