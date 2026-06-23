import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string | null;
  className?: string;
}

export function Avatar({ name, src, className }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className={cn('rounded-full object-cover', className)} />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-brand-mint/30 text-brand-teal flex items-center justify-center font-medium text-xs',
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
