import React from 'react';
import { motion } from 'framer-motion';

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
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden select-none active:scale-[0.96]';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-brand-500 hover:bg-brand-400 text-dark-950 font-bold shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/35 border border-brand-400/30 hover:border-brand-300 transition-colors',
    secondary:
      'bg-dark-900 hover:bg-dark-850 text-slate-100 border border-dark-750 hover:border-sky-500/50 shadow-md shadow-black/40 hover:shadow-xl hover:shadow-sky-500/15 transition-all',
    outline:
      'bg-transparent hover:bg-dark-900/90 text-slate-300 hover:text-white border border-dark-750 hover:border-brand-500/60 shadow-sm hover:shadow-lg hover:shadow-brand-500/15 transition-all',
    ghost:
      'bg-transparent hover:bg-dark-850/80 text-slate-400 hover:text-slate-100 hover:shadow-sm transition-colors',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download}
        className={combinedClasses}
        whileHover={{ scale: 1.025, y: -1 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
        data-interactive="true"
      >
        {icon && (
          <span className="transition-transform group-hover:scale-115 group-hover:-translate-y-0.5 duration-200">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClasses}
      whileHover={{ scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      data-interactive="true"
      {...(props as any)}
    >
      {icon && (
        <span className="transition-transform group-hover:scale-115 group-hover:-translate-y-0.5 duration-200">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </motion.button>
  );
};
