'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  ClipboardList,
  HelpCircle,
  Home,
  LogOut,
  MessageSquare,
  Users,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { BrandMark } from '@/components/shared/BrandMark';
import { SidebarNavLink } from '@/components/shared/SidebarNavLink';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

const LINKS = [
  { href: '/educator', label: 'Dashboard', icon: Home },
  { href: '/educator/students', label: 'Students', icon: Users },
  { href: '/educator/assign', label: 'Assign practice', icon: ClipboardList },
  { href: '/educator/curriculum', label: 'Curriculum', icon: BookOpen },
  { href: '/educator/schedule', label: 'Schedule', icon: Calendar },
  { href: '/educator/messages', label: 'Messages', icon: MessageSquare },
  { href: '/educator/help', label: 'Help', icon: HelpCircle },
];

interface EducatorShellProps {
  userName: string;
  children: React.ReactNode;
}

/** Dense sidebar + main — CRM-style educator workspace */
export function EducatorShell({ userName, children }: EducatorShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch('/api/auth/signout', { method: 'POST' });
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex">
      <aside className="platform-sidebar w-56 shrink-0 border-r border-black/[0.06]">
        <div className="p-5">
          <BrandMark subtitle={`Educator · ${userName}`} />
        </div>
        <nav className="space-y-0.5 px-2">
          {LINKS.map(({ href, label, icon }) => (
            <SidebarNavLink
              key={href}
              href={href}
              active={pathname === href || (href !== '/educator' && pathname.startsWith(href))}
              icon={icon}
            >
              {label}
            </SidebarNavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={signOut}
          className="flex items-center gap-2.5 px-3 py-2 mx-2 mt-6 rounded-lg text-sm text-muted-foreground hover:bg-white/60"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 py-3 border-b border-black/[0.06] bg-white/80">
          <h1 className="text-sm font-semibold text-brand-navy">Educator workspace</h1>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{getInitials(userName)}</AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 overflow-auto bg-brand-bg/50">{children}</main>
      </div>
    </div>
  );
}
