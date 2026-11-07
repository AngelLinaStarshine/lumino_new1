import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold tracking-[0.02em] ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-brand-yellow to-brand-accent text-[#111] shadow-[0_10px_22px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.14)]',
        secondary:
          'bg-white/85 text-brand-navy border border-black/[0.08] shadow-soft hover:-translate-y-0.5 hover:bg-brand-navy hover:text-white hover:border-brand-navy',
        outline:
          'border border-black/10 bg-white/80 text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy',
        ghost: 'text-brand-navy hover:bg-brand-warm/60',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        teal: 'bg-brand-teal text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-teal/90',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-3.5',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
