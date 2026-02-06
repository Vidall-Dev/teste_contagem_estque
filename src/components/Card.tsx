import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  active?: boolean;
}

export default function Card({
  children,
  title,
  subtitle,
  className = '',
  onClick,
  hoverable = false,
  active = false
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-[#2d1a1a] rounded-2xl border transition-all duration-300
        ${active ? 'border-primary ring-2 ring-primary/5 dark:ring-primary/10' : 'border-gray-100 dark:border-gray-800'}
        ${hoverable ? 'cursor-pointer hover:shadow-hover hover:border-primary/20' : 'shadow-soft'}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-50 dark:border-gray-800/50">
          {title && <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-text-muted dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
