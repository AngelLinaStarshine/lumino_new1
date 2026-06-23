import { Avatar } from '@/components/shared/Avatar';

interface TopbarProps {
  greeting: string;
  subtitle?: string;
  stagePill?: string;
  avatar?: string | null;
  name: string;
}

export function Topbar({ greeting, subtitle, stagePill, avatar, name }: TopbarProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-display">{greeting}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        {stagePill && <span className="stage-pill mt-2">{stagePill}</span>}
      </div>
      <Avatar name={name} src={avatar} className="w-10 h-10" />
    </header>
  );
}
