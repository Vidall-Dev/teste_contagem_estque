import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export default function Input({ label, icon, error, helperText, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            block w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-white dark:bg-[#2d1a1a]
            border-gray-200 dark:border-gray-800 rounded-xl shadow-sm
            focus:ring-4 focus:ring-primary/10 focus:border-primary/30 dark:focus:border-primary/50
            text-gray-900 dark:text-white placeholder:text-gray-400 transition-all
            ${error ? 'border-red-500 focus:ring-red-500/10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`mt-1.5 ml-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
