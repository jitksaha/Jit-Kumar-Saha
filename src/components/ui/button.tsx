import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

export interface RollingTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function RollingText({ text, className = '' }: RollingTextProps) {
  return <span className={`inline-block text-inherit select-none ${className}`}>{text}</span>;
}

export interface RollingIconProps {
  icon: React.ReactNode | React.ElementType;
  size?: number;
  className?: string;
  delay?: number;
}

export function RollingIcon({ icon, size = 15, className = '' }: RollingIconProps) {
  if (React.isValidElement(icon)) {
    return <span className={`inline-flex items-center justify-center shrink-0 text-inherit ${className}`}>{icon}</span>;
  }
  if (typeof icon === 'function' || typeof icon === 'object') {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 text-inherit ${className}`}>
        {React.createElement(icon as React.ElementType, { size, className: 'text-inherit' })}
      </span>
    );
  }
  return <span className={`inline-flex items-center justify-center shrink-0 text-inherit ${className}`}>{icon}</span>;
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
      'bg-[#163300] text-[#DCFF85] hover:bg-[#214702] hover:text-[#DCFF85] border border-[#DCFF85]/30 shadow-md shadow-[#163300]/15 transition-all duration-200',
    dark: 'bg-[#163300] text-[#DCFF85] hover:bg-[#214702] hover:text-[#DCFF85] border border-[#DCFF85]/30 shadow-md shadow-[#163300]/15 transition-all duration-200',
    secondary:
      'bg-[#F0F2ED] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] hover:border-[#163300] border border-[#DCE0D5] shadow-xs transition-all duration-200',
    light:
      'bg-[#F0F2ED] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] hover:border-[#163300] border border-[#DCE0D5] shadow-xs transition-all duration-200',
    glass:
      'bg-white/90 backdrop-blur-md text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] hover:border-[#163300] border border-[#163300]/20 shadow-sm transition-all duration-200',
    'glass-dark':
      'bg-white/10 backdrop-blur-md text-white hover:bg-[#DCFF85] hover:text-[#163300] hover:border-[#DCFF85] border border-white/20 shadow-sm transition-all duration-200',
    lime: 'bg-[#9FE870] text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] hover:border-[#163300] border border-[#9FE870] shadow-md shadow-[#9FE870]/20 transition-all duration-200',
    outline:
      'bg-transparent text-[#163300] hover:bg-[#163300] hover:text-[#DCFF85] hover:border-[#163300] border border-[#163300]/30 transition-all duration-200',
  };

  const currentVariant = variantStyles[variant] || variantStyles.dark;

  const renderedIcon = icon ? (
    <span className="inline-flex items-center justify-center shrink-0 text-inherit transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      {React.isValidElement(icon)
        ? icon
        : typeof icon === 'function' || typeof icon === 'object'
          ? React.createElement(icon as React.ElementType, {
              size: 15,
              className: 'text-inherit',
            })
          : icon}
    </span>
  ) : null;

  const content = (
    <span className="relative z-10 inline-flex items-center justify-center gap-2 text-inherit leading-none">
      {text ? <span className="text-inherit">{text}</span> : children}
      {renderedIcon}
    </span>
  );

  const baseClasses = `group relative inline-flex items-center justify-center rounded-full font-semibold select-none cursor-pointer ${currentVariant} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  }`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -1, transition: { duration: 0.18, ease: 'easeOut' as const } },
    whileTap: { scale: 0.96, transition: { duration: 0.1, ease: 'easeOut' as const } },
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

  const renderedIcon = icon ? (
    <span className="inline-flex items-center justify-center shrink-0 text-inherit transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      {React.isValidElement(icon)
        ? icon
        : typeof icon === 'function' || typeof icon === 'object'
          ? React.createElement(icon as React.ElementType, {
              size: 15,
              className: 'text-inherit',
            })
          : icon}
    </span>
  ) : null;

  const content = (
    <span className="inline-flex items-center gap-1.5 text-inherit leading-none">
      <span className="text-inherit">{text}</span>
      {renderedIcon}
    </span>
  );

  const motionProps = {
    whileHover: { y: -1, transition: { duration: 0.18, ease: 'easeOut' as const } },
    whileTap: { scale: 0.97 },
  };

  if (to) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        to={to}
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
      href={href}
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
