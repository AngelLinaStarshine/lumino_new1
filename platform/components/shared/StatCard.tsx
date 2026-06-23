import { BookOpen, Clock, Flame, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = {
  books: BookOpen,
  clock: Clock,
  target: Target,
  flame: Flame,
} as const;

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: keyof typeof ICONS;
}

export function StatCard({ label, value, sub, icon }: StatCardProps) {
  const Icon = ICONS[icon];
  return (
    <div className="platform-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className="w-4 h-4 text-brand-teal/70" />
      </div>
      <div className="text-xl font-display">{value}</div>
      {sub && <div className={cn('text-xs text-muted-foreground mt-1')}>{sub}</div>}
    </div>
  );
}
