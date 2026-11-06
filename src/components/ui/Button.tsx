import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  download?: boolean | string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  external,
  download,
  icon,
  children,
  className = '',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden select-none cursor-pointer';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-brand-500 hover:bg-brand-400 text-dark-950 font-bold shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/35 border border-brand-400/30 hover:border-brand-300',
    secondary:
      'bg-dark-900 hover:bg-dark-850 text-slate-100 border border-dark-750 hover:border-sky-500/50 shadow-md shadow-black/40 hover:shadow-xl hover:shadow-sky-500/15',
    outline:
      'bg-transparent hover:bg-dark-900/90 text-slate-300 hover:text-white border border-dark-750 hover:border-brand-500/60 shadow-sm hover:shadow-lg hover:shadow-brand-500/15',
    ghost:
      'bg-transparent hover:bg-dark-850/80 text-slate-400 hover:text-slate-100 hover:shadow-sm',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.025, y: -2 },
        whileTap: { scale: 0.96, y: 0 },
        transition: { type: 'spring' as const, stiffness: 420, damping: 24, mass: 0.4 },
      };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download}
        className={combinedClasses}
        data-interactive="true"
        {...motionProps}
      >
        {icon && (
          <span className="transition-transform group-hover:scale-110 group-hover:-translate-y-0.5 duration-200">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {/* Subtle shine glint overlay */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClasses}
      data-interactive="true"
      {...motionProps}
      {...(props as any)}
    >
      {icon && (
        <span className="transition-transform group-hover:scale-110 group-hover:-translate-y-0.5 duration-200">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {/* Subtle shine glint overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </motion.button>
  );
};

export default Button;
