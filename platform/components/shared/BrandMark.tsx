import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { logo: 32, title: 'text-base' },
  md: { logo: 40, title: 'text-lg' },
  lg: { logo: 48, title: 'text-xl' },
};

export function BrandMark({ subtitle, size = 'md', className }: BrandMarkProps) {
  const { logo, title } = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/luminolearn-logo.png"
        alt=""
        width={logo}
        height={logo}
        className="rounded-full shrink-0"
        priority
      />
      <div className="min-w-0">
        <div className={cn('brand-wordmark leading-tight', title)}>Luminolearn Inc.</div>
        {subtitle && <div className="text-xs text-muted-foreground truncate">{subtitle}</div>}
      </div>
    </div>
  );
}
