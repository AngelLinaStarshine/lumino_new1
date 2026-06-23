import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variant === 'default' && 'border-transparent bg-primary text-primary-foreground',
        variant === 'secondary' && 'border-transparent bg-secondary text-secondary-foreground',
        variant === 'outline' && 'text-foreground',
        variant === 'success' && 'border-transparent bg-lumino-teal-50 text-lumino-teal-800',
        variant === 'warning' && 'border-transparent bg-lumino-amber-50 text-lumino-amber-900',
        variant === 'destructive' && 'border-transparent bg-destructive/10 text-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Badge };
