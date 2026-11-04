import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'blue' | 'zinc' | 'amber' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'zinc',
  size = 'sm',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-mono font-medium rounded border transition-colors';
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  const variantClasses = {
    brand: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    zinc: 'bg-dark-800 text-slate-300 border-dark-700',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    outline: 'bg-transparent text-slate-400 border-dark-700',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

