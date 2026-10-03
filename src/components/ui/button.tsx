import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

export interface RollingTextProps {
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
          className="relative inline-flex flex-col overflow-hidden h-[1.3em] leading-[1.3em] align-baseline text-inherit"
        >
          <span
            style={{
              transition: `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease`,
              transitionDelay: `${index * staggerDelay}s`,
            }}
            className="inline-block text-inherit transform group-hover:-translate-y-full"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
          <span
            style={{
              transition: `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease`,
              transitionDelay: `${index * staggerDelay}s`,
            }}
            className="inline-block text-inherit absolute top-full left-0 w-full text-center transform group-hover:-translate-y-full"
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export interface RollingIconProps {
  icon: React.ReactNode | React.ElementType;
  size?: number;
  className?: string;
  delay?: number;
}

export function RollingIcon({
  icon,
  size = 15,
  className = '',
  delay = 0.05,
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
      <span
        style={{
          transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease, color 0.25s ease',
          transitionDelay: `${delay}s`,
        }}
        className="inline-flex items-center justify-center text-inherit w-full h-full transform group-hover:-translate-y-full group-hover:opacity-0"
      >
        {renderedIcon}
      </span>
      <span
        style={{
          transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease, color 0.25s ease',
          transitionDelay: `${delay}s`,
        }}
        className="absolute top-full left-0 inline-flex items-center justify-center text-inherit w-full h-full transform group-hover:-translate-y-full group-hover:opacity-100 opacity-0"
        aria-hidden="true"
      >
        {renderedIcon}
      </span>
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
    | 'lime'
    | 'tertiary'
    | 'light'
    | 'neutral'
    | 'glass'
    | 'glass-dark'
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
  // 3 Primary Color Combinations with inverted high-contrast hover states
  const variantStyles: Record<string, string> = {
    // 1. Primary Button (Dark Forest Green background with Lime text, inverts to Lime on hover)
    primary:
      'bg-[#163300] text-[#DCFF85] hover:bg-[#9FE870] hover:text-[#163300] border border-[#163300] hover:border-[#9FE870] shadow-md shadow-[#163300]/15 transition-all duration-300',
    dark:
      'bg-[#163300] text-[#DCFF85] hover:bg-[#9FE870] hover:text-[#163300] border border-[#163300] hover:border-[#9FE870] shadow-md shadow-[#163300]/15 transition-all duration-300',

    // 2. Secondary / Lime Button (Bright Lime background with Dark Green text, inverts to Dark Green on hover)
    secondary:
      'bg-[#9FE870] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] border border-[#9FE870] hover:border-[#163300] shadow-md shadow-[#9FE870]/20 transition-all duration-300',
    lime:
      'bg-[#9FE870] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] border border-[#9FE870] hover:border-[#163300] shadow-md shadow-[#9FE870]/20 transition-all duration-300',

    // 3. Third / Neutral / Tertiary Button (Soft Neutral Grey background with Dark Green text, inverts to Dark Green on hover)
    tertiary:
      'bg-[#F0F2ED] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] border border-[#DCE0D5] hover:border-[#163300] shadow-xs transition-all duration-300',
    light:
      'bg-[#F0F2ED] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] border border-[#DCE0D5] hover:border-[#163300] shadow-xs transition-all duration-300',
    neutral:
      'bg-[#F0F2ED] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] border border-[#DCE0D5] hover:border-[#163300] shadow-xs transition-all duration-300',

    // Glass & Outline styles
    glass:
      'bg-white/90 backdrop-blur-md text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] border border-[#163300]/20 hover:border-[#163300] shadow-sm transition-all duration-300',
    'glass-dark':
      'bg-white/10 backdrop-blur-md text-white hover:bg-[#DCFF85] hover:text-[#163300] border border-white/20 hover:border-[#DCFF85] shadow-sm transition-all duration-300',
    outline:
      'bg-transparent text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] border border-[#163300]/30 hover:border-[#163300] transition-all duration-300',
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

  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold select-none cursor-pointer ${currentVariant} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  }`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -1, transition: { duration: 0.18, ease: 'easeOut' as const } },
    whileTap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeOut' as const } },
  };

  const isExternal =
    (to && (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:') || to.startsWith('#'))) ||
    Boolean(href);
  const resolvedHref = href || (isExternal && to ? to : undefined);
  const resolvedTo = !isExternal ? to : undefined;

  if (resolvedTo) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        to={resolvedTo}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || text}
        {...motionProps}
      >
        {content}
      </MotionLink>
    );
  }

  if (resolvedHref) {
    return (
      <motion.a
        href={resolvedHref}
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
    | 'lime'
    | 'tertiary'
    | 'light'
    | 'neutral'
    | 'glass'
    | 'glass-dark'
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
    whileHover: { y: -1, transition: { duration: 0.18, ease: 'easeOut' as const } },
    whileTap: { scale: 0.97 },
  };

  const isExternal =
    (to && (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:') || to.startsWith('#'))) ||
    Boolean(href);
  const resolvedHref = href || (isExternal && to ? to : undefined);
  const resolvedTo = !isExternal ? to : undefined;

  if (resolvedTo) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        to={resolvedTo}
        onClick={onClick}
        className={`group inline-flex items-center text-inherit cursor-pointer ${className}`}
        {...motionProps}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.a
      href={resolvedHref}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`group inline-flex items-center text-inherit cursor-pointer ${className}`}
      {...motionProps}
    >
      {content}
    </motion.a>
  );
}
