import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarNavLinkProps {
  href: string;
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export function SidebarNavLink({ href, active, icon: Icon, children }: SidebarNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
        active ? 'nav-link-active' : 'text-muted-foreground hover:bg-white/60 hover:text-foreground'
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {children}
    </Link>
  );
}
